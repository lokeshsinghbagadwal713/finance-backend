# 💰 Finance Dashboard Backend

A backend system for managing financial records with role-based access control, authentication, and analytics.

---

## 🚀 Tech Stack

* Node.js (Express.js)
* MySQL Database
* JWT Authentication

---

## 📦 Features

* 🔐 Authentication (Login with JWT)
* 👥 User Management (Admin, Analyst, Viewer roles)
* 💸 Financial Records CRUD
* 📊 Dashboard Summary APIs

---

## 📁 Folder Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── services/
 ├── config/
 
⚙️ Setup Instructions
```

### 1. Clone the repository

```
git clone https://github.com/lokeshsinghbagadwal713/finance-backend.git
cd finance-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create `.env` file:

```
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/finance_db"
JWT_SECRET=your_secret_key
```

### 4. Run database migrations

```
npx prisma migrate dev
```

### 5. Start server

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🔐 Authentication

### Login API

```
POST /auth/login
```

#### Request:

```
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

#### Response:

```
{
  "token": "JWT_TOKEN"
}
```

---

## 👥 User APIs

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| POST   | /users   | Create user   |
| GET    | /users   | Get all users |
| PATCH  | /users/  | Update user   |

---

## 💸 Financial Records APIs

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /records  | Create record |
| GET    | /records  | Get records   |
| PATCH  | /records/ | Update record |
| DELETE | /records/ | Delete record |

---

## 📊 Dashboard APIs

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /dashboard/summary | Financial summary |

---

## 🔑 Roles & Permissions

| Role    | Access Level  |
| ------- | ------------- |
| ADMIN   | Full access   |
| ANALYST | Create & view |
| VIEWER  | Read-only     |

---

## 🧪 API Testing

* use Postman


---

## 👨‍💻 Author

**Lokesh Singh Bagadwal**

---
