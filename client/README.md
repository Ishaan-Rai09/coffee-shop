# Ruhani Coffee Shop Frontend

React-based frontend for the Ruhani Coffee Shop application.

## Environment Setup

Create a `.env` file in the root directory with the following variables if needed:

```
# Override the default API URL (optional)
VITE_API_URL=https://your-custom-api-url.com/api
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

# Preview production build locally
npm run preview
```

## Deployment on Vercel

### Setup Instructions

1. Connect your GitHub repository to Vercel
2. Configure the project with these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. Add the following environment variable if you need to override the default API URL:
   - `VITE_API_URL`: Your custom API URL (e.g., https://your-api-url.com/api)

4. Deploy the site

### Important Notes

- The frontend is configured to automatically use the production API URL when deployed
- The default production API URL is set to `https://ruhani-coffee-api.onrender.com/api`
- You only need to set `VITE_API_URL` if you want to use a different API URL than the default
- Make sure your API's CORS settings allow requests from your Vercel domain
