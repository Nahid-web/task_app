# Task Manager App (Online First)

A task manager application that allows users to create, manage, and sync tasks seamlessly, both online and offline. Built using Flutter for the frontend and Node.js with PostgreSQL for the backend using Docker.

---

## ✨ Features

- **Authentication**:

  - Users can sign up and log in to the app.
  - Their logged-in state is persistently saved, even after closing the app.

- **Offline First Functionality**:

  - The app allows users to create and manage tasks offline.
  - Once the app detects that the device is back online, it automatically syncs the local data with the remote database.

- **Task Management**:

  - Users can create tasks, view them organized by date, edit, and delete tasks.
  - Tasks are stored in the local SQLite database for offline access and synced to the remote database when online.

- **Data Synchronization**:

  - Efficient sync between the local SQLite database and the remote PostgreSQL database when the device is back online.

- **State Management**:

  - Uses **Bloc (Cubit)** for managing states and ensuring a smooth user experience.

- **Responsive UI**:
  - Designed to work across all screen sizes and devices.

---

## 🛠️ Tech Stack

### **Frontend**:

- **Flutter**: A framework for building cross-platform mobile applications.
- **Bloc (Cubit)**: State management solution for Flutter.
- **SQLite**: Local database for offline-first functionality.

### **Backend**:

- **Node.js**: JavaScript runtime environment for the backend.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: For better code scalability and type safety.
- **PostgreSQL**: Relational database for storing tasks.
- **Docker**: For containerizing the backend services, making deployment and development environments easier to manage.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Nahid-web/task_app.git
cd task_app
```

### 2. Create and Configure .env Files

#### 2.1 Backend Setup

1.  Navigate to the backend directory:

    ```bash
    cd taskapp_backend
    ```

2.  Create the .env file:

    In the taskapp_backend directory, create a file named .env and add the necessary environment variables.

    Example .env for the backend:

    ```bash
    #  Server
    PORT=
    JWT_SECRET=

    # Backend
    DATABASE_URL=your_postgres_url

    # PostgresSQL
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    DB_PORT=
    DB_HOST=
    ```

3.  Install dependencies and run the backend:

    ```bash
    npm install
    docker-compose up --build # Or npm run dev if you prefer
    ```

#### 2.2 Frontend Setup

1.  Navigate to the Flutter project directory:

    ```bash
    cd taskapp_frontend
    ```

2.  Create the .env file: In the client directory, create a file named .env and add the necessary environment variables.

    Example .env for the frontend:

    ```bash
    BACKEND_URL=yourip_address:8000
    ```

    - API_URL: Set this to the URL where your backend is running. If you are using Docker, this will be http://localhost:8000 by default.

3.  Install Flutter dependencies:

    ```bash
    flutter pub get
    ```

4.  Run the app:

    ```bash
    flutter run
    ```

### 3. 🐳 Backend Setup with Docker

1. Install Docker (if you haven't already):

   - For installation instructions, visit the Docker website.

2. Build Docker containers: Ensure Docker is installed and running on your system. Then, in the server folder, build containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Verify the services:

   - The backend server should now be running in a Docker container, and PostgreSQL will be available.
   - You can access the API at http://localhost:8000 by default, or as specified in the docker-compose.yml file.

### 4 ⚙️ Frontend Setup

1. Navigate to the Flutter project directory:

   ```bash
   cd client
   ```

2. Install Flutter dependencies:

   ```bash
   flutter pub get
   ```

3. Run the app:

   ```bash
    flutter run
   ```

### 5. 🐋 Docker Compose

The backend uses Docker Compose to manage containers for both the backend application and PostgreSQL database.

_Docker Commands_

- To build and start all services:

  ```bash
  docker-compose up --build
  ```

- To start the services without rebuilding the images:

  ```bash
  docker-compose up
  ```

- To stop the services:

  ```bash
  docker-compose down
  ```

- To view running containers:

  ```bash
  docker ps
  ```

- To remove unused containers and networks:

  ```bash
  docker system prune
  ```

  ***

📸 Screenshots

<div align="center"> 
<img src="" alt="Home Screen" width="30%" /> 
<img src="" alt="Task List Screen" width="30%" /> 
<img src="" alt="Task Detail Screen" width="30%" /> 
</div>

---

## 💡 Future Enhancements

- Add push notifications for task reminders.
- User profile management.
- Advanced task filtering and sorting options.

---

## 📬 Feedback

If you have any feedback or suggestions, feel free to reach out to me at nahidamin266@gmail.com.
