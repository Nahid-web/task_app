import { match } from "assert";
import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { NewUser, users } from "../db/schema";
import { auth, AuthRequest } from "../middleware/auth";

const authRouter = Router();

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

interface LogInBody {
  email: string;
  password: string;
}
authRouter.post(
  "/signup",
  async (req: Request<{}, {}, SignUpBody>, res: Response) => {
    try {
      //get req body
      const { name, email, password } = req.body;
      //check if the user already exits
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length) {
        res
          .status(400)
          .json({ error: "User with the same email already exists" });
        return;
      }
      //hashed pw
      const hashedPassword = await bcryptjs.hash(password, 8);
      //create a new user and store in db
      const newUser: NewUser = {
        name,
        email,
        password: hashedPassword,
      };
      const [user] = await db.insert(users).values(newUser).returning();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

authRouter.post(
  "/login",
  async (req: Request<{}, {}, LogInBody>, res: Response) => {
    //get req body
    const { email, password } = req.body;

    //check if the user doesn't exits
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!existingUser) {
      res
        .status(400)
        .json({ error: "Users with this email address does not exit" });
      return;
    }
    // check password is similar
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!match) {
      res.status(400).json({ error: "Incorrect password!" });
      return;
    }

    //generate token
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: existingUser.id }, jwtSecret!);

    //get the user
    res.json({ token, ...existingUser });
  }
);

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    //get the token
    const token = req.header("x-auth-token");

    if (!token) {
      res.json(false);
      return;
    }

    //verify if the token is valid
    const jwtSecret = process.env.JWT_SECRET;
    const verified = jwt.verify(token, jwtSecret!);

    if (!verified) {
      res.json(false);
      return;
    }
    // get the user data if the token is valid
    const verifiedToken = verified as { id: string };
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, verifiedToken.id));

    if (!user) {
      res.json(false);
      return;
    }

    res.json(true);
  } catch (e) {
    res.status(500).json(false);
  }
});

authRouter.get("/", auth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "user not found" });
      return;
    }

    const [user] = await db.select().from(users).where(eq(users.id, req.user));
    res.json({ ...user, token: req.token });
  } catch (e) {
    res.status(500).json(false);
  }
});

export default authRouter;
