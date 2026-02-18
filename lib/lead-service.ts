import type { WithId } from "mongodb";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { getDb } from "@/lib/mongodb";
import type {
  LeadCategory,
  LeadInstallationTimeline,
  LeadPropertyType,
  LeadStatus,
} from "@/models/Lead";

type ProjectionInput = {
  systemSizeKW: number;
  estimatedSystemCost: number;
  subsidyAmount: number;
  effectiveCost: number;
  totalSavings: number;
  netProfit: number;
  paybackYears: number;
};

export type SaveQualifiedLeadInput = {
  name: string;
  phone: string;
  city?: string;
  monthlyBill?: number;
  propertyType?: LeadPropertyType;
  installationTimeline?: LeadInstallationTimeline;
  projection?: ProjectionInput;
  conversationSummary?: string;
};

export type SavedLead = {
  id: string;
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
};

type LeadRecord = Omit<SavedLead, "id">;
type LeadDoc = WithId<LeadRecord>;

const LEADS_COLLECTION = "leads";

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return digits;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  throw new Error("invalid_phone");
}

function mapDocToSavedLead(doc: LeadDoc): SavedLead {
  return {
    id: String(doc._id),
    name: doc.name,
    phone: doc.phone,
    city: doc.city,
    monthlyBill: doc.monthlyBill,
    propertyType: doc.propertyType,
    installationTimeline: doc.installationTimeline,
    systemSizeKW: doc.systemSizeKW,
    estimatedSystemCost: doc.estimatedSystemCost,
    subsidyAmount: doc.subsidyAmount,
    effectiveCost: doc.effectiveCost,
    totalSavings: doc.totalSavings,
    netProfit: doc.netProfit,
    paybackYears: doc.paybackYears,
    score: doc.score,
    category: doc.category,
    conversationSummary: doc.conversationSummary,
    source: doc.source,
    status: doc.status,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function saveQualifiedLead(input: SaveQualifiedLeadInput): Promise<SavedLead> {
  const name = input.name.trim();
  const normalizedPhone = normalizePhone(input.phone);
  const monthlyBill = input.monthlyBill;

  if (!name) {
    throw new Error("invalid_name");
  }

  const db = await getDb();
  const collection = db.collection<LeadRecord>(LEADS_COLLECTION);

  const existing = await collection.findOne({ phone: normalizedPhone });
  if (existing) {
    return mapDocToSavedLead(existing);
  }

  const scoringMonthlyBill = typeof monthlyBill === "number" && monthlyBill > 0 ? monthlyBill : 0;
  const scoreResult = calculateLeadScore({
    monthlyBill: scoringMonthlyBill,
    propertyType: input.propertyType ?? "rented",
    timeline: input.installationTimeline,
  });

  const now = new Date();
  const leadDoc: LeadRecord = {
    name,
    phone: normalizedPhone,
    city: input.city,
    monthlyBill,
    propertyType: input.propertyType,
    installationTimeline: input.installationTimeline,
    systemSizeKW: input.projection?.systemSizeKW,
    estimatedSystemCost: input.projection?.estimatedSystemCost,
    subsidyAmount: input.projection?.subsidyAmount,
    effectiveCost: input.projection?.effectiveCost,
    totalSavings: input.projection?.totalSavings,
    netProfit: input.projection?.netProfit,
    paybackYears: input.projection?.paybackYears,
    score: scoreResult.score,
    category: scoreResult.category,
    conversationSummary: input.conversationSummary,
    source: "ai_assistant",
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  const insertResult = await collection.insertOne(leadDoc);
  return {
    id: String(insertResult.insertedId),
    ...leadDoc,
  };
}
