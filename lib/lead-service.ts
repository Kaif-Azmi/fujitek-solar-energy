import type { Document, WithId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { ensureMongoIndexes } from "@/lib/mongodb-indexes";
import type { ConversationStage } from "@/lib/chat-funnel";
import type {
  LeadCategory,
  LeadInstallationTimeline,
  LeadPropertyType,
  LeadSource,
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
  state?: string;
  city?: string;
  monthlyBill?: number;
  segment?: "residential" | "commercial";
  propertyType?: LeadPropertyType;
  installationTimeline?: LeadInstallationTimeline;
  projection?: ProjectionInput;
  conversationSummary?: string;
  stage?: ConversationStage;
};

export type SavedLead = {
  id: string;
  name: string;
  phone: string;
  state?: string;
  city?: string;
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
  source: LeadSource;
  stage?: ConversationStage;
  status: LeadStatus;
  interactionCount: number;
  lastInteractionAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

type LeadRecord = Omit<SavedLead, "id">;
type LeadDoc = WithId<LeadRecord>;

const LEADS_COLLECTION = "leads";
const AI_SOURCE: LeadSource = "ai_assistant";
const NEW_STATUS: LeadStatus = "new";

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

function optionalTrimmed(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function optionalNumber(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }
  return value;
}

function mapDocToSavedLead(doc: LeadDoc): SavedLead {
  return {
    id: String(doc._id),
    name: doc.name,
    phone: doc.phone,
    state: doc.state,
    city: doc.city,
    monthlyBill: doc.monthlyBill,
    segment: doc.segment,
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
    stage: doc.stage,
    status: doc.status,
    interactionCount: doc.interactionCount,
    lastInteractionAt: doc.lastInteractionAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function buildScoreExpression(
  monthlyBillExpression: unknown,
  propertyExpression: unknown,
  segmentExpression: unknown,
  timelineExpression: unknown,
): Document {
  return {
    $let: {
      vars: {
        monthly: monthlyBillExpression,
        propertyType: propertyExpression,
        segment: segmentExpression,
        timeline: timelineExpression,
      },
      in: {
        $add: [
          {
            $cond: [
              { $gt: ["$$monthly", 4000] },
              5,
              {
                $cond: [{ $gt: ["$$monthly", 2000] }, 3, 0],
              },
            ],
          },
          {
            $cond: [{ $eq: ["$$propertyType", "owned"] }, 4, 0],
          },
          {
            $cond: [{ $eq: ["$$segment", "commercial"] }, 6, 0],
          },
          {
            $cond: [
              { $eq: ["$$timeline", "immediate"] },
              5,
              {
                $cond: [{ $eq: ["$$timeline", "exploring"] }, 1, 0],
              },
            ],
          },
        ],
      },
    },
  };
}

function buildCategoryExpression(scoreExpression: unknown): Document {
  return {
    $cond: [
      { $gte: [scoreExpression, 12] },
      "high",
      {
        $cond: [{ $gte: [scoreExpression, 6] }, "medium", "low"],
      },
    ],
  };
}

export async function saveQualifiedLead(input: SaveQualifiedLeadInput): Promise<SavedLead> {
  const name = optionalTrimmed(input.name);
  const normalizedPhone = normalizePhone(input.phone);
  const monthlyBill = optionalNumber(input.monthlyBill);
  const stage = input.stage;
  const state = optionalTrimmed(input.state ?? input.city);
  const city = optionalTrimmed(input.city ?? input.state);
  const conversationSummary = optionalTrimmed(input.conversationSummary);
  const segment = input.segment;
  const propertyType = input.propertyType;
  const installationTimeline = input.installationTimeline;

  if (!name) {
    throw new Error("invalid_name");
  }

  const hasMonthlyBill = monthlyBill !== undefined;
  const hasState = state !== undefined;
  const hasCity = city !== undefined;
  const hasSegment = segment !== undefined;
  const hasPropertyType = propertyType !== undefined;
  const hasTimeline = installationTimeline !== undefined;
  const hasProjection = Boolean(input.projection);
  const hasSummary = conversationSummary !== undefined;
  const hasStage = stage !== undefined;

  const monthlyForScoring = hasMonthlyBill ? monthlyBill! : { $ifNull: ["$monthlyBill", 0] };
  const propertyForScoring = hasPropertyType ? propertyType! : { $ifNull: ["$propertyType", "rented"] };
  const segmentForScoring = hasSegment ? segment! : "$segment";
  const timelineForScoring = hasTimeline ? installationTimeline! : "$installationTimeline";

  const scoringChangedExpression: Document = {
    $or: [
      hasMonthlyBill ? { $ne: ["$monthlyBill", monthlyBill!] } : false,
      hasPropertyType ? { $ne: ["$propertyType", propertyType!] } : false,
      hasSegment ? { $ne: ["$segment", segment!] } : false,
      hasTimeline ? { $ne: ["$installationTimeline", installationTimeline!] } : false,
    ],
  };

  const computedScoreExpression = buildScoreExpression(
    monthlyForScoring,
    propertyForScoring,
    segmentForScoring,
    timelineForScoring,
  );

  const scoreNeededExpression: Document = {
    $or: [
      "$__scoreInputsChanged",
      { $in: [{ $type: "$score" }, ["missing", "null"]] },
      { $in: [{ $type: "$category" }, ["missing", "null"]] },
    ],
  };

  const effectiveScoreExpression: Document = {
    $cond: [scoreNeededExpression, "$__computedScore", "$score"],
  };

  const now = new Date();
  await ensureMongoIndexes();
  const db = await getDb();
  const collection = db.collection<LeadRecord>(LEADS_COLLECTION);

  const updatePipeline: Document[] = [
    {
      $set: {
        name,
        phone: normalizedPhone,
        state: hasState ? state : "$state",
        city: hasCity ? city : "$city",
        monthlyBill: hasMonthlyBill ? monthlyBill : "$monthlyBill",
        segment: hasSegment ? segment : "$segment",
        propertyType: hasPropertyType ? propertyType : "$propertyType",
        installationTimeline: hasTimeline ? installationTimeline : "$installationTimeline",
        systemSizeKW: hasProjection ? input.projection!.systemSizeKW : "$systemSizeKW",
        estimatedSystemCost: hasProjection ? input.projection!.estimatedSystemCost : "$estimatedSystemCost",
        subsidyAmount: hasProjection ? input.projection!.subsidyAmount : "$subsidyAmount",
        effectiveCost: hasProjection ? input.projection!.effectiveCost : "$effectiveCost",
        totalSavings: hasProjection ? input.projection!.totalSavings : "$totalSavings",
        netProfit: hasProjection ? input.projection!.netProfit : "$netProfit",
        paybackYears: hasProjection ? input.projection!.paybackYears : "$paybackYears",
        conversationSummary: hasSummary ? conversationSummary : "$conversationSummary",
        stage: hasStage ? stage : "$stage",
        source: { $ifNull: ["$source", AI_SOURCE] },
        status: { $ifNull: ["$status", NEW_STATUS] },
        interactionCount: { $add: [{ $ifNull: ["$interactionCount", 0] }, 1] },
        lastInteractionAt: now,
        updatedAt: now,
        createdAt: { $ifNull: ["$createdAt", now] },
        __scoreInputsChanged: scoringChangedExpression,
        __computedScore: computedScoreExpression,
      },
    },
    {
      $set: {
        score: effectiveScoreExpression,
        category: buildCategoryExpression(effectiveScoreExpression),
      },
    },
    {
      $unset: ["__scoreInputsChanged", "__computedScore"],
    },
  ];

  const result = await collection.findOneAndUpdate(
    { phone: normalizedPhone },
    updatePipeline,
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  const updated = result.value;
  if (!updated) {
    throw new Error("lead_upsert_failed");
  }

  return mapDocToSavedLead(updated);
}
