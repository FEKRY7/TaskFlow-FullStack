# 🚀 TaskFlow Backend API

A production-ready RESTful Task Management API built with **NestJS**, **TypeORM**, and **PostgreSQL**.

This backend provides secure authentication, role-based authorization, project management, task management, request validation, and interactive API documentation using Swagger.

---

# 📌 Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Get Current Authenticated User

## Authorization
- Role-Based Access Control (Admin / Member)
- Resource-Based Authorization
- Only project owners can update or delete their projects
- Only task creators can update or delete their tasks
- Admins can manage all resources

## Project Management
- Create Project
- Update Project
- Delete Project
- Get My Projects
- Get Project By ID
- Add Members to Project
- Remove Members from Project

## Task Management
- Create Task
- Update Task
- Delete Task
- Get All Tasks
- Get Task By ID
- Filter Tasks
  - By Status
  - By Priority
  - By Assigned User

## Validation
- Global Validation Pipe
- DTO Validation
- Request Sanitization

## API Documentation
- Swagger UI
- JWT Authorization Support

---

# 🛠 Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- Bcrypt
- class-validator
- class-transformer
- Swagger

---

# 📂 Project Structure

```
src
│
├── Users
├── Project
├── Task
├── Guards
├── Decorators
├── Config
├── Database
├── Utils
└── main.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/FEKRY7/TaskFlow-FullStack.git
```

Navigate to the backend folder

```bash
cd TaskFlow-FullStack/taskflow-BackEnd
```

Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file using the provided `.env.example`.

Example:

```env
# Database
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432
DB_DATABASE=your_database_name

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=2h
JWT_EXPIRES_IN2=15d

# Server
PORT=3000
```

---

# ▶️ Running the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

---

# 📚 API Documentation

After starting the server, open:

```
http://localhost:3000/api/docs
```

Swagger supports JWT authentication.

Click **Authorize** and enter:

```
Bearer YOUR_ACCESS_TOKEN
```

---

# 🔑 Authentication Endpoints

### Register

```
POST /api/users/auth/signUp
```

### Login

```
POST /api/users/auth/login
```

### Current User

```
GET /api/users/current-user
```

---

# 📁 Project Endpoints

### Create Project

```
POST /api/projects
```

### Get My Projects

```
GET /api/projects
```

### Get Project By ID

```
GET /api/projects/:id
```

### Update Project

```
PATCH /api/projects/:id
```

### Delete Project

```
DELETE /api/projects/:id
```

### Add Member

```
POST /api/projects/:id/members
```

Request Body

```json
{
  "memberId": 2
}
```

### Remove Member

```
DELETE /api/projects/:id/members/:memberId
```

---

# ✅ Task Endpoints

### Create Task

```
POST /api/tasks
```

### Get All Tasks

```
GET /api/tasks
```

### Filter Tasks

```
GET /api/tasks/filter
```

Examples

```
GET /api/tasks/filter?status=TODO
GET /api/tasks/filter?priority=HIGH
GET /api/tasks/filter?assigneeId=3
GET /api/tasks/filter?status=IN_PROGRESS&priority=HIGH
```

### Get Task By ID

```
GET /api/tasks/:id
```

### Update Task

```
PATCH /api/tasks/:id
```

### Delete Task

```
DELETE /api/tasks/:id
```

---

# 🔒 Authorization Rules

## Admin

- Manage all projects
- Manage all tasks
- Add and remove project members

## Member

- Create projects
- View only accessible projects
- Update/Delete only owned projects
- Create tasks
- Update/Delete only created tasks

---

# 📌 Task Status

```
TODO
IN_PROGRESS
DONE
```

---

# 📌 Task Priority

```
LOW
MEDIUM
HIGH
```

---

# ✅ Validation

The application uses:

- ValidationPipe
- class-validator
- class-transformer

to validate and sanitize incoming requests.

---

# 🛡 Security

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Resource-Based Authorization
- Protected Routes
- Global Validation

---

# 🧪 Testing

Create users through the Register endpoint.

To test role-based authorization, update the user's role in the database to:

- `ADMIN`
- `MEMBER`

---

# 📖 Swagger Features

- Interactive API Documentation
- JWT Authentication
- Request Examples
- Response Documentation

---

# 👨‍💻 Author

## Fekry Bahaa

Backend Developer

- NestJS
- TypeScript
- Node.js
- PostgreSQL
- TypeORM
- REST APIs
