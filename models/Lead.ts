import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

export type LeadPropertyType = "owned" | "rented";
export type LeadInstallationTimeline = "immediate" | "3months" | "exploring";
export type LeadCategory = "high" | "medium" | "low";
export type LeadStatus = "new" | "contacted" | "closed";

export interface Lead {
  name: string;
  phone: string;
  city?: string;
  monthlyBill?: number;
  propertyType?: LeadPropertyType;
  installationTimeline?: LeadInstallationTimeline;
  systemSizeKW?: number;
  estimatedSystemCost?: number;
  subsidyAmount?: number;
  effectiveCost?: number;
  totalSavings?: number;
  netProfit?: number;
  paybackYears?: number;
  score: number;
  category: LeadCategory;
  conversationSummary?: string;
  source: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type LeadDocument = HydratedDocument<Lead>;
type LeadModelType = Model<Lead>;

const leadSchema = new Schema<Lead, LeadModelType>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: false },
    monthlyBill: { type: Number, required: false, min: 0 },
    propertyType: {
      type: String,
      required: false,
      enum: ["owned", "rented"],
    },
    installationTimeline: {
      type: String,
      required: false,
      enum: ["immediate", "3months", "exploring"],
    },
    systemSizeKW: { type: Number, required: false, min: 0 },
    estimatedSystemCost: { type: Number, required: false, min: 0 },
    subsidyAmount: { type: Number, required: false, min: 0 },
    effectiveCost: { type: Number, required: false, min: 0 },
    totalSavings: { type: Number, required: false, min: 0 },
    netProfit: { type: Number, required: false },
    paybackYears: { type: Number, required: false, min: 0 },
    score: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["high", "medium", "low"],
    },
    conversationSummary: { type: String, required: false },
    source: { type: String, required: true, default: "ai_assistant" },
    status: {
      type: String,
      required: true,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const LeadModel =
  (mongoose.models.Lead as LeadModelType | undefined) || mongoose.model<Lead, LeadModelType>("Lead", leadSchema);

export default LeadModel;
