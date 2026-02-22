import { NextResponse, type NextRequest } from "next/server";
import { ObjectId, type Filter } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { withNoStore } from "@/lib/security";

export const runtime = "nodejs";

type LeadCategory = "high" | "medium" | "low";
type LeadStatus = "new" | "contacted" | "closed";
type LeadSource = "ai_assistant" | "contact_form";

type LeadDoc = {
  _id: ObjectId;
  name: string;
  phone: string;
  city?: string;
  email?: string;
  monthlyBill?: number;
  propertyTypeSelection?: string;
  serviceInterested?: string;
  preferredContactTime?: string;
  requirement?: string;
  score: number;
  category: LeadCategory;
  status: LeadStatus;
  source?: LeadSource;
  netProfit?: number;
  createdAt: Date;
  updatedAt: Date;
};

type PatchBody = {
  leadId?: unknown;
  status?: unknown;
};

const VALID_CATEGORIES: ReadonlyArray<LeadCategory> = ["high", "medium", "low"];
const VALID_STATUSES: ReadonlyArray<LeadStatus> = ["new", "contacted", "closed"];

function isLeadCategory(value: string): value is LeadCategory {
  return VALID_CATEGORIES.includes(value as LeadCategory);
}

function isLeadStatus(value: string): value is LeadStatus {
  return VALID_STATUSES.includes(value as LeadStatus);
}

export async function GET(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    const categoryParam = request.nextUrl.searchParams.get("category")?.trim().toLowerCase();
    const statusParam = request.nextUrl.searchParams.get("status")?.trim().toLowerCase();

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

    const db = await getDb();
    const leads = await db
      .collection<LeadDoc>("leads")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return withNoStore(
      NextResponse.json(
        leads.map((lead) => ({
          id: lead._id.toString(),
          name: lead.name,
          phone: lead.phone,
          city: lead.city,
          email: lead.email,
          monthlyBill: lead.monthlyBill,
          propertyTypeSelection: lead.propertyTypeSelection,
          serviceInterested: lead.serviceInterested,
          preferredContactTime: lead.preferredContactTime,
          requirement: lead.requirement,
          score: lead.score,
          category: lead.category,
          status: lead.status,
          source: lead.source ?? "ai_assistant",
          netProfit: lead.netProfit,
          createdAt: lead.createdAt,
          updatedAt: lead.updatedAt,
        }))
      )
    );
  } catch {
    return withNoStore(NextResponse.json({ message: "Failed to load leads." }, { status: 500 }));
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

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
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(leadId) },
      { $set: { status: nextStatus, updatedAt: new Date() } }
    );

    if (updateResult.matchedCount === 0) {
      return withNoStore(NextResponse.json({ message: "Lead not found." }, { status: 404 }));
    }

    const updatedLead = await collection.findOne({ _id: new ObjectId(leadId) });
    if (!updatedLead) {
      return withNoStore(NextResponse.json({ message: "Lead not found." }, { status: 404 }));
    }

    return withNoStore(
      NextResponse.json({
        id: updatedLead._id.toString(),
        status: updatedLead.status,
        updatedAt: updatedLead.updatedAt,
      })
    );
  } catch {
    return withNoStore(NextResponse.json({ message: "Failed to update lead status." }, { status: 500 }));
  }
}
