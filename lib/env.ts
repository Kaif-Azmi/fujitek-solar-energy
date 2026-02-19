type RequiredEnvKey =
  | "NODE_ENV"
  | "MONGODB_URI"
  | "GEMINI_API_KEY"
  | "ADMIN_SESSION_SECRET"
  | "CLOUDINARY_CLOUD_NAME"
  | "CLOUDINARY_API_KEY"
  | "CLOUDINARY_API_SECRET";

const REQUIRED_ENV: RequiredEnvKey[] = [
  "NODE_ENV",
  "MONGODB_URI",
  "GEMINI_API_KEY",
  "ADMIN_SESSION_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const validatedKeys = new Set<RequiredEnvKey>();

export function validateRequiredEnv(requiredKeys: RequiredEnvKey[] = REQUIRED_ENV) {
  const pendingKeys = requiredKeys.filter((key) => !validatedKeys.has(key));
  if (!pendingKeys.length) return;

  const missing = pendingKeys.filter((key) => {
    const value = process.env[key];
    return !value || !value.trim();
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  pendingKeys.forEach((key) => validatedKeys.add(key));
}
