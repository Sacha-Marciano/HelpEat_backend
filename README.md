# HelpEat Backend

HelpEat Backend is a Node.js/Express REST API that powers the HelpEat application, providing endpoints for user management, recipe management, authentication, scheduling, and favorites. It uses MongoDB for data storage and includes robust validation, error handling, security, and logging features.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Endpoints](#user-endpoints)
  - [Recipe Endpoints](#recipe-endpoints)
  - [Image Upload](#image-upload)
- [Error Handling](#error-handling)
- [Rate Limiting & Security](#rate-limiting--security)
- [Logging](#logging)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features
- User registration and login with JWT authentication
- Recipe CRUD (create, read, delete)
- Image upload for recipes
- User favorites and weekly meal scheduling
- Input validation with Celebrate/Joi
- Custom error handling and logging
- Rate limiting and security headers

## Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- JWT for authentication
- Multer for file uploads
- Celebrate/Joi for validation
- Winston for logging
- Helmet & CORS for security

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd HelpEat_backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).
4. **Start the server:**
   ```bash
   npm run start
   # or for development with hot reload
   npm run dev
   ```

The server will run on `http://localhost:3001` by default.

## Environment Variables
Create a `.env` file with the following (example values):
```
PORT=3001
JWT_SECRET=your_jwt_secret
DATABASE_ADRESS=mongodb://127.0.0.1:27017/HelpEat_db
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /signin` — Login with email and password. Returns JWT token.
- `POST /signup` — Register a new user.

### User Endpoints
- `GET /users/me` — Get current user info (auth required)
- `GET /users/:userId/name` — Get username by user ID
- `POST /users/favorite` — Add a recipe to favorites (auth required)
- `DELETE /users/favorite` — Remove a recipe from favorites (auth required)
- `POST /users/schedule` — Add a recipe to the user's weekly schedule (auth required)
- `DELETE /users/schedule` — Remove a recipe from the user's schedule (auth required)

### Recipe Endpoints
- `GET /recipes` — Get all recipes
- `POST /recipes` — Create a new recipe (auth required)
- `DELETE /recipes` — Delete a recipe by ID (auth required, only owner)

### Image Upload
- `POST /api/upload` — Upload an image file (multipart/form-data, field: `image`). Returns `{ imageUrl }`.
- `GET /uploads/:filename` — Access uploaded images

## Error Handling
- Custom error classes for 400, 401, 403, 404, 409, and 500 errors
- All errors return JSON with a `message` field
- Unknown routes return 404

## Rate Limiting & Security
- 100 requests per 15 minutes per IP (configurable)
- Helmet for HTTP headers
- CORS enabled (all origins allowed by default)

## Logging
- All requests and errors are logged to `request.log` and `error.log` using Winston

## Project Structure
```
HelpEat_backend/
├── app.js                # Main application entry point
├── controllers/          # Route handlers for users and recipes
├── middlewares/          # Auth, validation, error handling, logging
├── models/               # Mongoose schemas for users and recipes
├── routes/               # Express route definitions
├── uploads/              # Uploaded images
├── utils/                # Config, rate limiter, custom errors
├── package.json
└── README.md
```

## License
[ISC](./LICENSE)

---

**Deployed API:** https://api.helpeat.jumpingcrab.com  
**Frontend:** https://helpeat.jumpingcrab.com
