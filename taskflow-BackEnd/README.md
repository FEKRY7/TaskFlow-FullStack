# 🚀 Task Management System API

A RESTful Task Management API built with **NestJS**, **TypeORM**, and **PostgreSQL**.

This project provides authentication, role-based authorization, project management, task management, and interactive API documentation using Swagger.

---

# 📌 Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Current Logged-in User

## Authorization
- Role-Based Access Control (Admin / Member)
- Resource-Based Authorization
- Only project owners can update/delete their projects
- Only task creators can update/delete their tasks
- Admin can manage all resources

## Project Management
- Create Project
- Update Project
- Delete Project
- Get My Projects
- Get Project By Id
- Add Members to Project
- Remove Members from Project

## Task Management
- Create Task
- Update Task
- Delete Task
- Get All Tasks
- Get Task By Id
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
- JWT Authorization inside Swagger

---

# 🛠 Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- Bcrypt
- Class Validator
- Class Transformer
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

Move to project

```bash
cd TaskFlow-FullStack/taskflow-BackEnd
```

Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=task_management

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

# ▶️ Run Project

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

# 📚 Swagger Documentation

After starting the project open

```
http://localhost:3000/api/docs
```

Swagger supports JWT Authorization.

Click **Authorize**

```
Bearer YOUR_ACCESS_TOKEN
```

---

# 🔑 Authentication Endpoints

## Register

```
POST /api/users/auth/signUp
```

## Login

```
POST /api/users/auth/login
```

## Current User

```
GET /api/users/current-user
```

---

# 📁 Project Endpoints

## Create Project

```
POST /api/projects
```

## Get My Projects

```
GET /api/projects
```

## Get Project By Id

```
GET /api/projects/:id
```

## Update Project

```
PATCH /api/projects/:id
```

## Delete Project

```
DELETE /api/projects/:id
```

## Add Member

```
POST /api/projects/:id/members
```

Request Body

```json
{
    "memberId": 2
}
```

## Remove Member

```
DELETE /api/projects/:id/members/:memberId
```

---

# ✅ Task Endpoints

## Create Task

```
POST /api/tasks
```

## Get All Tasks

```
GET /api/tasks
```

## Filter Tasks

```
GET /api/tasks/filter
```

Example

```
GET /api/tasks/filter?status=TODO

GET /api/tasks/filter?priority=HIGH

GET /api/tasks/filter?assigneeId=3

GET /api/tasks/filter?status=IN_PROGRESS&priority=HIGH
```

## Get Task By Id

```
GET /api/tasks/:id
```

## Update Task

```
PATCH /api/tasks/:id
```

## Delete Task

```
DELETE /api/tasks/:id
```

---

# 🔒 Authorization Rules

## Admin

- Create Projects
- Update Any Project
- Delete Any Project
- Add Members
- Remove Members
- Manage All Tasks

## Member

- Create Projects
- View Only Projects They Belong To
- Update/Delete Only Their Own Projects
- Create Tasks
- Update/Delete Only Tasks They Created

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

The project uses

- ValidationPipe
- class-validator
- class-transformer

to validate incoming requests.

---

# 🛡 Security

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Resource-Based Authorization
- Protected Routes
- Global Validation

---

# 📖 Swagger Features

- Interactive API Documentation
- JWT Authentication
- Request Examples
- Response Documentation

---

# 🚀 Future Improvements

- Unit Testing
- Docker Support
- Pagination
- Search
- Email Verification
- Refresh Tokens
- Logging
- Rate Limiting

---

# 👨‍💻 Author

## Fekry Bahaa

Backend Developer

### Tech Stack

- NestJS
- TypeScript
- Node.js
- PostgreSQL
- TypeORM
- JWT
- REST APIs

---

# ⭐ Thank You
