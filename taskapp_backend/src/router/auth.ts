import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";
import { db } from "../db";
import { NewUser, users } from "../db/schema";
const authRouter = Router();

interface SignUpBody {
  name: string;
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

authRouter.get("/", (req, res) => {
  res.send("hei there i am from auth");
});

export default authRouter;
