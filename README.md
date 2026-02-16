# Fujitek Solar Energy

Next.js App Router project for a solar business website with an admin dashboard and secure admin-only authentication.

## Run Locally

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:

```env
MONGODB_URI=...
ADMIN_SESSION_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=... # optional
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=... # optional
```

## Admin Auth

- Login page: `/admin/login`
- Login API: `POST /api/admin/login`
- Logout API: `POST /api/admin/logout`
- CSRF token API: `GET /api/admin/csrf`
- Session: signed HMAC token in HTTP-only cookie
- Cookie flags: `httpOnly`, `sameSite=lax`, `secure` in production
- Session expiry: 24 hours
- Password verification: `bcrypt.compare` against hashed password stored in `admins` collection
- Middleware protection: all `/admin/*` routes except login redirect unauthenticated users to `/admin/login`

## Admin Seed (Dev)

`GET /api/dev/seed-admin` (disabled in production) creates/updates an admin user in MongoDB with hashed password.

## Notes

- User auth (NextAuth, signup, Google, Apple) has been removed.
- Admin credentials are database-backed (no plain admin password in env).
