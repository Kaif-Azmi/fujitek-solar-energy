import crypto from "node:crypto";

const secret = crypto.randomBytes(32).toString("base64");
console.log(`ADMIN_SESSION_SECRET=${secret}`);
