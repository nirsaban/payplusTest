# 🛠️ User & Customer Management API

A **Node.js + TypeScript + Express + Sequelize** backend with:

- 🔐 JWT Authentication
- 📦 PostgreSQL (via Sequelize migrations)
- 📑 Joi validation
- 🏗️ Awilix for dependency injection
- 🛠️ Nodemon + ts-node for development

---

## 📂 Project Structure
src/
├── app.ts # Express app setup
├── server.ts # Server entrypoint
├── config/ # Environment configs
├── core/ # Middlewares, errors, logger
├── db/ # Sequelize initialization
├── modules/
│ ├── auth/ # JWT service & middleware
│ ├── user/ # User module (controller, service, DTOs, validation)
│ └── customer/ # Customer module
├── @types/ # Express type augmentations
migrations/ # Sequelize migrations
seeders/ # Optional DB seeders

## ⚙️ Requirements

- **Node.js** v18+
- **PostgreSQL** v14+
- **npm** (or pnpm / yarn)

---

## 🚀 Setup & Run

### 1. Clone & install dependencies

```bash
git clone <your-repo-url>
cd <project-folder>
pnpm install
```

**2.Environment variables

Create .env.development in project root:

DATABASE_URL=postgresql://nir.saban@127.0.0.1:5432/mydb

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
PORT=3000

2. Environment variables

Create .env.development in project root:

DATABASE_URL=postgresql://nir.saban@127.0.0.1:5432/mydb

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
PORT=3000

3. Database setup

Create database:
psql -U nir.saban -h 127.0.0.1 -d postgres -c "CREATE DATABASE mydb;"
Run migrations:
npx sequelize-cli db:migrate --env development

(Optional) run seeders:

npx sequelize-cli db:seed:all --env development


# 🛠️ API Endpoints
🔑 Auth
Register
POST /users/register
Content-Type: application/json


Request:

{
  "idNumber": "123456789",
  "email": "test@example.com",
  "password": "123456",
  "confirmPassword": "123456",
  "fullName": "John Doe",
  "birthDay": "1990-01-01",
  "phoneNumber": "0501234567"
}

Response:

{
"user": { "id": "...", "email": "test@example.com" },
"token": "eyJhbGciOiJIUzI1NiIsInR...",
"customers": []
}

POST /users/login
Content-Type: application/json

Request:

{
"idNumber": "123456789",
"password": "123456"
}


Response:

{
"user": { "id": "...", "email": "test@example.com" },
"token": "eyJhbGciOiJIUzI1NiIsInR..."
}

POST /customers
Authorization: Bearer <token>
Content-Type: application/json
Request:
{
"fullName": "Alice Smith",
"phoneNumber": "0521112233",
"birthDay": "2000-05-01"
}
List All Customers (requires token)
http
GET /customers
Authorization: Bearer <token>
Response:
json
[
{
"id": "...",
"fullName": "Alice Smith",
"phoneNumber": "0521112233",
"birthDay": "2000-05-01"
}
]
📜 Scripts
bash
Copy code
npm run dev        # start dev server with nodemon
npm run build      # compile TypeScript into dist/
npm start          # run compiled dist/server.js
npx sequelize-cli db:migrate   # apply migrations
npx sequelize-cli db:seed:all  # run seeders
🔄 Reset Database (dev only)
bash
Copy code
npx sequelize-cli db:migrate:undo:all --env development
npx sequelize-cli db:migrate --env development
npx sequelize-cli db:seed:all --env development
✅ Checklist
PostgreSQL running (brew services start postgresql@14 on Mac)

Database mydb exists

.env.development configured

Run npm run dev → see App listening on port 3000
**