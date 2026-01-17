
# 🧾Role-Based User Management System (MERN + MySQL)

A **full-stack user registration and management system** built using **React, Node.js, Express, and MySQL**, featuring **role-based access control**, **JWT authentication**, **image upload**, and **admin/user dashboards**.

This project was developed as part of an **internship assignment** and demonstrates **real-world authentication, authorization, and CRUD practices**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration with profile image upload
* Secure Login using **JWT**
* Password hashing using **bcrypt**
* Role-based access control (**ADMIN / USER**)
* Protected routes (frontend & backend)

### 👤 User Features

* User dashboard
* View own profile
* Update profile details
* Update profile image
* Data fetched securely using JWT (no ID exposed)

### 👮 Admin Features

* Admin dashboard
* View all registered users
* View user profile image
* Edit user details
* Delete users
* Admin routes protected by role

### 🖼 Image Handling

* Profile image upload using **Multer**
* Images stored as **BLOB** in MySQL
* Images served as **Base64** for frontend rendering

### 🧠 Best Practices Followed

* Backend validation + frontend validation
* Email format validation
* 10-digit phone number validation
* No sensitive data in JWT payload
* Clean project structure
* RESTful API design

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* React Toastify
* CSS (external styles)

### Backend

* Node.js
* Express.js
* MySQL (mysql2)
* JWT (jsonwebtoken)
* bcrypt
* Multer

---

## 📁 Project Structure

### Backend (`form-backend`)

```
form-backend/
│
├── controllers/
│   ├── authController.js
│   ├── adminController.js
│   └── userController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   └── userRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── config/
│   └── db.js
│
├── utils/
│   ├── result.js
│   └── config.js
│
├── .env
└── server.js
```

### Frontend (`form-frontend`)

```
src/
│
├── pages/
│   ├── auth/
│   ├── admin/
│   └── user/
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   |── userService.js
│   └── adminService.js
|   └── authService.js 
|
├── styles/
│   ├── Login.css
│   └── Register.css
│
├── App.jsx
└── main.jsx
```

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file in the backend root:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=registration_db
JWT_SECRET=your_secret_key
```

---

## 🗄 Database Schema (MySQL)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(10),
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'USER',
  image LONGBLOB
);
```

---

## ▶️ How to Run the Project

### 1️⃣ Backend Setup

```bash
cd form-backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:4000
```

---

### 2️⃣ Frontend Setup

```bash
cd form-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### 🔐 Auth APIs

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register user with image |
| POST   | `/api/auth/login`    | Login user               |

### 👤 User APIs

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | `/api/user/me` | Get logged-in user profile    |
| PUT    | `/api/user/me` | Update logged-in user profile |

### 👮 Admin APIs

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| GET    | `/api/admin/users`    | Get all users  |
| GET    | `/api/admin/user/:id` | Get user by ID |
| PUT    | `/api/admin/user/:id` | Update user    |
| DELETE | `/api/admin/user/:id` | Delete user    |

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 Security Design Decisions

* Passwords are **hashed using bcrypt**
* JWT payload contains **only userId & role**
* No sensitive data exposed in frontend
* Role-based routing implemented using a single guard
* Backend validation always enforced

---

## 🧠 Key Learning Outcomes

* JWT authentication & role-based authorization
* Secure user data handling
* REST API design
* Image upload & rendering
* React Router protected routes
* Backend error handling
* MySQL integration with Node.js

---

## 🎤 Interview Explanation (Short)

> This project implements a secure user registration and management system with role-based access. Authentication is handled using JWT, passwords are hashed, and both frontend and backend validations are applied. Admin and user dashboards are separated using protected routes, and profile images are stored securely in the database.

---

## 📌 Future Enhancements

* Password reset via email
* Refresh tokens
* Pagination for admin users list
* Cloud storage for images
* Audit logs for admin actions

---

## 👨‍💻 Author

**Gaurav Ingle**
Intern @ GenkaiX
Full Stack Developer (Java / MERN)


