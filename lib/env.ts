type RequiredEnvKey =
  | "MONGODB_URI"
  | "ADMIN_SESSION_SECRET"
  | "CLOUDINARY_CLOUD_NAME"
  | "CLOUDINARY_API_KEY"
  | "CLOUDINARY_API_SECRET";

const REQUIRED_ENV: RequiredEnvKey[] = [
  "MONGODB_URI",
  "ADMIN_SESSION_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

let validated = false;

export function validateRequiredEnv() {
  if (validated) return;

  const missing = REQUIRED_ENV.filter((key) => {
    const value = process.env[key];
    return !value || !value.trim();
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  validated = true;
}

