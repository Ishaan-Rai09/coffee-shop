# Coffee Shop API

Backend API for the Ruhani Coffee Shop application.

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_string
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment on Render

### Setup Instructions

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service with these settings:
   - **Name**: ruhani-coffee-api (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm start`
   - **Plan**: Choose an appropriate plan (Free tier works for testing)

4. Add the following environment variables:
   - `PORT`: 5000 (Note: Render may override this)
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secure JWT secret
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL

5. Deploy the service

### Important Notes

- The free tier on Render will spin down after periods of inactivity
- Your service will be available at `https://your-service-name.onrender.com`
- Make sure to update your frontend's API URL to point to your Render deployment 