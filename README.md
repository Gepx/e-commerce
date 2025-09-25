# MERN E‑Commerce

Modern full‑stack e‑commerce app built with Node.js/Express, MongoDB, Redis cache, JWT auth, OAuth (Google/GitHub), Cloudinary uploads, and a Vite/React frontend.

### Tech stack
- Backend: Express 5, Mongoose, Redis, JWT, Midtrans
- Frontend: React + Vite
- Infra: Vercel (frontend + serverless API), MongoDB Atlas, Upstash Redis, Cloudinary

## Local development
1) Install dependencies
```bash
cd server && npm i
cd ../client && npm i
```

2) Environment variables
Create two files with the following keys.

`server/.env`
```env
NODE_ENV=development
PORT=3000
MONGO_URI=YOUR_MONGODB_ATLAS_URI
CLIENT_URL=http://localhost:5173
JWT_SECRET=change_me

# Redis (use Upstash in production)
REDIS_URL=redis://localhost:6379

# OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CLIENT_CALLBACK_URI=http://localhost:3000/api/auth/github/callback

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CLIENT_CALLBACK_URI=http://localhost:3000/api/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payments (Midtrans)
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
MAIL_FROM=your_email
```

`client/.env`
```env
VITE_API_URL=http://localhost:3000/api
VITE_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

3) Run locally
```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```
Backend dev server runs on `http://localhost:3000`, frontend on `http://localhost:5173`.