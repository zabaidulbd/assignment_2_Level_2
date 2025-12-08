Project Name: Vehicle Rental System

Live URL: https://vehiclerentalsystem-drab.vercel.app/ 

## Features
- User registration & login with JWT authentication, 
- Admin has full system access to create, get, update and delete (vehicles, users and all bookings)
- Customer can register, view vehicles, create and manage their own bookings.
- Active booking checks before deleting vehicle or user.

## Technology Stack
- Node.js
- Express.js
- PostgreSQL
- Vercel for deployment
- TypeScript
- bcrypt (password hashing)
- jsonwebtoken (JWT authentication)

  ## Setup and usage Instructions
  - clone repository.
  - Install dependencies. (npm install)
  - Create .env file and add environment variables (PORT, DATABASE_URL and JWT_SECRET)
  - Run the server (npm run dev)
  - Access the API (for sign in: http://localhost:5000/api/v1/auth/signin)
  - token: Authorization: Bearer <token>
  - Use Postman or browser to test API endpoints
  - For deployed version, visit the Live URL
  

