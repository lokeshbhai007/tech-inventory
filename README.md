# Tech Inventory Manager

A simple MERN CRUD app for storing and searching product purchase & selling prices.

## Structure

```
tech-inventory-manager/
├── server/   → Node.js + Express + MongoDB (Mongoose) API
└── client/   → React + Vite + Tailwind CSS, using the native fetch API
```

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env   # fill in your MongoDB Atlas URI
npm install
npm run dev
```

Runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd client
cp .env.example .env   # set VITE_API_URL to your backend URL
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## API

| Method | Endpoint            | Description       |
|--------|----------------------|--------------------|
| GET    | /api/products         | List all products  |
| GET    | /api/products/:id     | Get one product    |
| POST   | /api/products          | Create a product   |
| PUT    | /api/products/:id     | Update a product   |
| DELETE | /api/products/:id     | Delete a product   |

## Notes

- Frontend talks to the backend using the native `fetch` API (see `client/src/services/api.js`) — no Axios dependency.
- v1 scope: Add / View / Search / Edit / Delete products only. No auth, image upload, or sales tracking yet.
