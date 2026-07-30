# 🚀 TaskFlow Frontend

TaskFlow Frontend is a modern and responsive Task Management application built with **React** and **Vite**.

The application allows authenticated users to manage projects and tasks through a clean, user-friendly interface. It communicates with the TaskFlow Backend API using RESTful services and JWT authentication.

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Automatic Token Storage
- Protected Routes
- Logout Functionality

## Dashboard

- User Dashboard
- Project Overview
- Quick Navigation

## Project Management

- Create Projects
- Edit Projects
- Delete Projects
- View Project Details
- Add Project Members
- Remove Project Members

## Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- View All Tasks
- Assign Tasks to Members
- Update Task Status
- Filter Tasks
  - By Status
  - By Priority
  - By Assigned User

## User Experience

- Responsive Design
- Client-side Form Validation
- Loading Indicators
- Error Handling
- Success Notifications
- Clean UI using Bootstrap

---

# 🛠 Tech Stack

- React 19
- Vite
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Bootstrap 5
- Context API

---

# 📂 Project Structure

```
src/
│
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/FEKRY7/TaskFlow-FullStack.git
```

Navigate to the frontend folder

```bash
cd TaskFlow-FullStack/taskflow-FrontEnd
```

Install dependencies

```bash
npm install
```

---

# 🔐 Environment

Create a `.env` file using the provided `.env.example`.

Example:

```env
VITE_API_URL=http://localhost:3000
```

---

# ▶️ Running the Application

Development

```bash
npm run dev
```

Build for Production

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

---

# 🌐 Backend Configuration

Before running the frontend, make sure the backend server is running.

Default Backend URL

```
http://localhost:3000
```

Default Frontend URL

```
http://localhost:5173
```

---

# 🔄 API Communication

The frontend communicates with the backend through **Axios** using REST APIs.

Main Features include:

- Authentication
- Project Management
- Task Management
- Member Management
- Task Filtering

---

# 🎨 UI Features

- Responsive Layout
- Bootstrap Components
- Form Validation
- Toast Notifications
- Protected Navigation
- Clean Dashboard
- Mobile Friendly Design

---

# 📱 Responsive Design

The application is optimized for:

- Desktop
- Tablet
- Mobile Devices

---

# 👨‍💻 Author

## Fekry Bahaa

Frontend & Backend Developer

### Technologies

- React
- JavaScript
- Vite
- Bootstrap
- Axios
- Node.js
- NestJS
- PostgreSQL
