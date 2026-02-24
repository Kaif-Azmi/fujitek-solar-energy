import { NextResponse, type NextRequest } from "next/server";
import { ObjectId, type Filter } from "mongodb";
import type { ConversationStage } from "@/lib/chat-funnel";
import { getDb } from "@/lib/mongodb";
import { ensureMongoIndexes } from "@/lib/mongodb-indexes";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { withNoStore } from "@/lib/security";

export const runtime = "nodejs";

type LeadCategory = "high" | "medium" | "low";
type LeadStatus = "new" | "contacted" | "converted" | "lost";
type LeadSource = "ai_assistant" | "contact_form";

type LeadDoc = {
  _id: ObjectId;
  name: string;
  phone: string;
  state?: string;
  city?: string;
  email?: string;
  monthlyBill?: number;
  segment?: "residential" | "commercial";
  propertyType?: string;
  propertyTypeSelection?: string;
  installationTimeline?: string;
  serviceInterested?: string;
  preferredContactTime?: string;
  requirement?: string;
  score: number;
  category: LeadCategory;
  stage?: ConversationStage;
  status: LeadStatus;
  source?: LeadSource;
  interactionCount?: number;
  lastInteractionAt?: Date;
  netProfit?: number;
  createdAt: Date;
  updatedAt: Date;
};

type PatchBody = {
  leadId?: unknown;
  status?: unknown;
};

const VALID_CATEGORIES: ReadonlyArray<LeadCategory> = ["high", "medium", "low"];
const VALID_STATUSES: ReadonlyArray<LeadStatus> = ["new", "contacted", "converted", "lost"];
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;

function isLeadCategory(value: string): value is LeadCategory {
  return VALID_CATEGORIES.includes(value as LeadCategory);
}

function isLeadStatus(value: string): value is LeadStatus {
  return VALID_STATUSES.includes(value as LeadStatus);
}

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

export async function GET(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    await ensureMongoIndexes();

    const categoryParam = request.nextUrl.searchParams.get("category")?.trim().toLowerCase();
    const statusParam = request.nextUrl.searchParams.get("status")?.trim().toLowerCase();
    const fromParam = request.nextUrl.searchParams.get("from");
    const toParam = request.nextUrl.searchParams.get("to");
    const page = parsePositiveInt(request.nextUrl.searchParams.get("page"), 1);
    const pageSize = Math.min(parsePositiveInt(request.nextUrl.searchParams.get("pageSize"), DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
    const skip = (page - 1) * pageSize;

    const query: Filter<LeadDoc> = {};

    if (categoryParam) {
      if (!isLeadCategory(categoryParam)) {
        return withNoStore(NextResponse.json({ message: "Invalid category filter." }, { status: 400 }));
      }
      query.category = categoryParam;
    }

    if (statusParam) {
      if (!isLeadStatus(statusParam)) {
        return withNoStore(NextResponse.json({ message: "Invalid status filter." }, { status: 400 }));
      }
      query.status = statusParam;
    }

    const from = parseDate(fromParam);
    const to = parseDate(toParam);
    if (from || to) {
      query.createdAt = {};
      if (from) {
        query.createdAt.$gte = from;
      }
      if (to) {
        query.createdAt.$lte = to;
      }
    }

    const db = await getDb();
    const collection = db.collection<LeadDoc>("leads");

    const [items, total] = await Promise.all([
      collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      collection.countDocuments(query),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return withNoStore(
      NextResponse.json({
        items: items.map((lead) => ({
          id: lead._id.toString(),
          name: lead.name,
          phone: lead.phone,
          state: lead.state,
          city: lead.city,
          email: lead.email,
          monthlyBill: lead.monthlyBill,
          segment: lead.segment,
          propertyType: lead.propertyType,
          propertyTypeSelection: lead.propertyTypeSelection,
          installationTimeline: lead.installationTimeline,
          serviceInterested: lead.serviceInterested,
          preferredContactTime: lead.preferredContactTime,
          requirement: lead.requirement,
          score: lead.score,
          category: lead.category,
          stage: lead.stage,
          status: lead.status,
          source: lead.source ?? "ai_assistant",
          interactionCount: lead.interactionCount ?? 0,
          lastInteractionAt: lead.lastInteractionAt,
          netProfit: lead.netProfit,
          createdAt: lead.createdAt,
          updatedAt: lead.updatedAt,
        })),
        pagination: {
          page,
          pageSize,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      }),
    );
  } catch {
    return withNoStore(NextResponse.json({ message: "Failed to load leads." }, { status: 500 }));
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    await ensureMongoIndexes();

    let body: PatchBody;
    try {
      body = (await request.json()) as PatchBody;
    } catch {
      return withNoStore(NextResponse.json({ message: "Invalid request body." }, { status: 400 }));
    }

    const leadId = typeof body.leadId === "string" ? body.leadId.trim() : "";
    const nextStatus = typeof body.status === "string" ? body.status.trim().toLowerCase() : "";

    if (!leadId || !ObjectId.isValid(leadId)) {
      return withNoStore(NextResponse.json({ message: "Invalid leadId." }, { status: 400 }));
    }

    if (!isLeadStatus(nextStatus)) {
      return withNoStore(NextResponse.json({ message: "Invalid lead status." }, { status: 400 }));
    }

    const db = await getDb();
    const collection = db.collection<LeadDoc>("leads");
    const updateResult = await collection.findOneAndUpdate(
      { _id: new ObjectId(leadId) },
      { $set: { status: nextStatus, updatedAt: new Date() } },
      { returnDocument: "after" },
    );

    if (!updateResult.value) {
      return withNoStore(NextResponse.json({ message: "Lead not found." }, { status: 404 }));
    }

    return withNoStore(
      NextResponse.json({
        id: updateResult.value._id.toString(),
        status: updateResult.value.status,
        updatedAt: updateResult.value.updatedAt,
      }),
    );
  } catch {
    return withNoStore(NextResponse.json({ message: "Failed to update lead status." }, { status: 500 }));
  }
}

