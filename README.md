# 🛡️ MERN Secure Authentication System

A robust, production-ready authentication and authorization system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project implements secure JWT-based authentication, role-based access control (RBAC), and follows modern backend security practices to prevent common web vulnerabilities.

## ✨ Features

- **User Authentication:** Secure Registration and Login functionality.
- **JWT Sessions:** Stateless, token-based authentication using JSON Web Tokens stored in HTTP headers.
- **Password Security:** Passwords are cryptographically hashed using `bcryptjs` before database insertion.
- **Role-Based Access Control:** Distinct privileges and protected routes for `user` and `admin` roles.
- **Frontend Protection:** React Router DOM integration to restrict unauthorized access to dashboards.
- **Strict Input Validation:** Data validation and sanitization via `express-validator` to ensure data integrity.
- **Security Hardening:** - Protection against Cross-Site Scripting (XSS) using `helmet`.
  - Protection against Brute Force attacks using `express-rate-limit`.
- **State Management:** React Context API configured for seamless global authentication state across the app.
- **Modern UI:** Clean, responsive, and user-friendly interfaces designed with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, React Router, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ORM), MongoDB Atlas.
- **Deployment:** Vercel (Frontend & Serverless Backend).

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables.

**Backend (`backend/.env`)**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key