import type { ObjectId } from "mongodb";

export const ADMINS_COLLECTION = "admins";

export type AdminRole = "super_admin" | "admin";

export interface AdminDoc {
  _id?: ObjectId;
  email: string;
  name?: string;
  passwordHash: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
