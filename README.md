This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Authentication Setup (Google, Apple, Email/password)

This project uses Auth.js / NextAuth for authentication with the App Router.

Required environment variables (add to `.env` locally):

- `MONGODB_URI` — MongoDB connection string (must include database name in the path)
- `NEXTAUTH_SECRET` — a secure random string (used to sign cookies)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` — OAuth credentials from Google Cloud Console
- `APPLE_ID` (Service ID), `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY` — Sign in with Apple credentials (Apple private key must be provided with newlines encoded as `\n` if set in `.env`)

Quick steps:

1. Copy `.env.example` to `.env` and fill in values.
2. Install new dependencies: `npm install` (this will install `next-auth`, `@next-auth/mongodb-adapter`, `mongodb`, `bcryptjs`).
3. Build & run: `npm run dev`.

Notes:
- All auth flows set HTTP-only cookies via Auth.js; do not rely on `localStorage` for authentication.
- OAuth callback redirect URL(s) must be configured in provider consoles (e.g., `https://your-domain.com/api/auth/callback/google`).
- For Apple, ensure you configure the Service ID and redirect URLs in your Apple Developer account.

Important product note:
- Admin login is internal-only and intentionally not shown to public visitors. There are no header/footer login links; access the admin panel via the direct URL `/admin` (unauthenticated requests are redirected to `/login`).
