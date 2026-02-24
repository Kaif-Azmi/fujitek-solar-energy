import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import type { ConversationStage } from "@/lib/chat-funnel";

export type LeadPropertyType = "owned" | "rented";
export type LeadInstallationTimeline = "immediate" | "3months" | "exploring";
export type LeadCategory = "high" | "medium" | "low";
export type LeadStatus = "new" | "contacted" | "converted" | "lost";
export type LeadSource = "ai_assistant" | "contact_form";

export interface Lead {
  name: string;
  phone: string;
  state?: string;
  city?: string;
  email?: string;
  monthlyBill?: number;
  segment?: "residential" | "commercial";
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
  stage?: ConversationStage;
  source: LeadSource;
  status: LeadStatus;
  interactionCount: number;
  lastInteractionAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type LeadDocument = HydratedDocument<Lead>;
type LeadModelType = Model<Lead>;

const leadSchema = new Schema<Lead, LeadModelType>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: false },
    city: { type: String, required: false },
    email: { type: String, required: false },
    monthlyBill: { type: Number, required: false, min: 0 },
    segment: {
      type: String,
      required: false,
      enum: ["residential", "commercial"],
    },
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
    stage: { type: String, required: false },
    source: {
      type: String,
      required: true,
      enum: ["ai_assistant", "contact_form"],
      default: "ai_assistant",
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "contacted", "converted", "lost"],
      default: "new",
    },
    interactionCount: { type: Number, required: true, min: 1, default: 1 },
    lastInteractionAt: { type: Date, required: true, default: () => new Date() },
  },
  {
    timestamps: true,
  },
);

const LeadModel =
  (mongoose.models.Lead as LeadModelType | undefined) || mongoose.model<Lead, LeadModelType>("Lead", leadSchema);

export default LeadModel;

