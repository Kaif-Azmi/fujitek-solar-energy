// Generate a secure NEXTAUTH_SECRET and print a one-liner suitable for .env.local
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('base64');
console.log(`NEXTAUTH_SECRET=${secret}`);
