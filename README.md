# E-Library

E-Library is a full-stack digital library web application where users can browse books, search and filter the catalog, borrow and return books, and manage their profile.

## Live URL

[https://e-library-blond.vercel.app/](https://e-library-blond.vercel.app/)

## Features

- User registration and login with email and password
- Google authentication
- Browse all books
- Search books by title
- Filter books by category
- View individual book details
- Borrow books
- Return borrowed books
- Protected profile page
- Update profile information
- Responsive design for mobile, tablet, and desktop

## Technologies Used

- Next.js
- React
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB Atlas
- Swiper
- Sonner
- Lucide React

## Environment Variables

Create a `.env.local` file in the root of the project and add:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_DB_URI=
MONGODB_DB_NAME=e-library
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true
```

## Installation and Setup
```
git clone <your-repository-url>
cd e-library
npm install
npm run seed:books
npm run dev
```

## Open in browser:

http://localhost:3000

## Available Scripts
```
npm run dev
npm run build
npm run start
npm run lint
npm run seed:books
```
## MongoDB Setup
Create a MongoDB Atlas project
Create a cluster
Create a database user
Add your IP address in Network Access
Copy the MongoDB connection string into MONGODB_URI
Google OAuth Setup
In Google Cloud Console, create an OAuth Client ID and use the following settings.

Authorized JavaScript origins:

http://localhost:3000
https://e-library-blond.vercel.app
Authorized redirect URIs:

http://localhost:3000/api/auth/callback/google
https://e-library-blond.vercel.app/api/auth/callback/google
Deployment
This project is deployed on Vercel.

For deployment:

Add all environment variables in Vercel
Set BETTER_AUTH_URL to the live site URL
Set NEXT_PUBLIC_APP_URL to the live site URL
Allow MongoDB Atlas network access for Vercel
Project Goal
The goal of this project is to build a simple and user-friendly online library system where users can discover books, borrow them, return them, and manage their account information.