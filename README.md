# Ruhani Coffee Shop

A full-stack e-commerce application for a coffee shop, featuring a React frontend and Node.js backend.

## Project Structure

This repository contains both the frontend and backend code:

- `/client` - React frontend built with Vite, React Router, Redux Toolkit, and Tailwind CSS
- `/server` - Node.js backend with Express, MongoDB, and JWT authentication

## Quick Start

### Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file with your configuration (see .env.example)

# Run the development server
npm run dev

# Seed the database with initial data (optional)
npm run data:import
```

### Frontend Setup

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Deployment

### Backend (Render)

The backend is configured for deployment on Render. See `/server/README.md` for detailed instructions.

### Frontend (Vercel)

The frontend is configured for deployment on Vercel. See `/client/README.md` for detailed instructions.

## Features

- User authentication and authorization
- Product browsing and search
- Shopping cart functionality
- Checkout process
- Order history
- Blog with articles about coffee
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- JWT for authentication
- Mongoose for data modeling

## Screenshots

![Homepage](https://example.com/homepage.png)
![Product Page](https://example.com/product.png)
![Cart](https://example.com/cart.png)

## License

MIT 