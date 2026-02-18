import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

export interface SolarScheme {
  name: string;
  description: string;
  subsidyPerKW: number;
  maxSubsidy: number;
  maxEligibleKW: number;
  eligibility: string;
  applicableStates: string[];
  isActive: boolean;
  sourceUrl?: string;
  lastVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type SolarSchemeDocument = HydratedDocument<SolarScheme>;

type SolarSchemeModelType = Model<SolarScheme>;

const solarSchemeSchema = new Schema<SolarScheme, SolarSchemeModelType>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    subsidyPerKW: { type: Number, required: true, min: 0 },
    maxSubsidy: { type: Number, required: true, min: 0 },
    maxEligibleKW: { type: Number, required: true, min: 0 },
    eligibility: { type: String, required: true },
    applicableStates: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
    sourceUrl: { type: String, required: false },
    lastVerifiedAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const SolarSchemeModel =
  (mongoose.models.SolarScheme as SolarSchemeModelType | undefined) ||
  mongoose.model<SolarScheme, SolarSchemeModelType>("SolarScheme", solarSchemeSchema);

export default SolarSchemeModel;
