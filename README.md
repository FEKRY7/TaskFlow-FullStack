# 🚀 TaskFlow Full Stack

TaskFlow is a Full Stack Task Management System built to help teams organize projects, manage tasks, assign members, and track progress efficiently.

The project consists of:

- **Backend:** NestJS + PostgreSQL + TypeORM
- **Frontend:** React + Vite

This project was developed as part of a **Full Stack Node.js Technical Assessment**.

---

# 📌 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization (Admin / Member)

## Project Management

- Create Projects
- Update Projects
- Delete Projects
- View User Projects
- Add Members
- Remove Members

## Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Tasks
- Filter Tasks
- Track Task Status
- Priority Management

## Security

- Password Hashing (bcrypt)
- JWT Authentication
- Role-Based Authorization
- Resource-Based Authorization
- Request Validation

---

# 🛠 Tech Stack

## Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- Swagger
- class-validator
- bcrypt

## Frontend

- React
- Vite
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Bootstrap

---

# 📂 Project Structure

```
TaskFlow-FullStack
│
├── taskflow-BackEnd
│   ├── src
│   ├── README.md
│   └── ...
│
├── taskflow-FrontEnd
│   ├── src
│   ├── README.md
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/FEKRY7/TaskFlow-FullStack.git
```

Move to the project folder

```bash
cd TaskFlow-FullStack
```

---

# 🚀 Backend Setup

Navigate to the backend

```bash
cd taskflow-BackEnd
```

Install dependencies

```bash
npm install
```

Create a `.env` file using the provided `.env.example`.

Run the backend

```bash
npm run start:dev
```

Backend URL

```
http://localhost:3000
```

Swagger Documentation

```
http://localhost:3000/api/docs
```

---

# 💻 Frontend Setup

Open another terminal

```bash
cd TaskFlow-FullStack/taskflow-FrontEnd
```

Install dependencies

```bash
npm install
```

Create a `.env` file using the provided `.env.example`.

Run the frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Both Backend and Frontend include a `.env.example` file.

Create a `.env` file for each project using the provided examples.

**Do not commit your real `.env` file to GitHub.**

---

# 📚 API Documentation

Interactive Swagger documentation is available after starting the backend:

```
http://localhost:3000/api/docs
```

---

# 🧪 Testing the Application

1. Start the Backend.
2. Start the Frontend.
3. Register a new account.
4. Login.
5. Create a Project.
6. Add Members.
7. Create Tasks.
8. Update Task Status.
9. Filter Tasks by Status, Priority, or Assigned User.

---

# 📖 Documentation

Each application contains its own documentation:

- **taskflow-BackEnd/README.md**
- **taskflow-FrontEnd/README.md**

These files include detailed setup instructions and project-specific information.

---

# 👨‍💻 Author

## Fekry Bahaa

Full Stack Node.js Developer

### Technologies

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- React
- Vite
- REST APIs
- JWT Authentication

---

# ⭐ Thank You

Thank you for reviewing this project.

If you have any questions or need additional information, please feel free to contact me.
