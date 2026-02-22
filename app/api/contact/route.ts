import { NextResponse, type NextRequest } from "next/server";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { getDb } from "@/lib/mongodb";
import { checkPublicRateLimit } from "@/lib/public-rate-limit";

export const runtime = "nodejs";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  propertyType?: unknown;
  service?: unknown;
  contactTime?: unknown;
  message?: unknown;
};

type LeadCategory = "high" | "medium" | "low";
type LeadStatus = "new" | "contacted" | "closed";

type ContactLeadDoc = {
  name: string;
  phone: string;
  city?: string;
  email?: string;
  propertyTypeSelection?: string;
  serviceInterested?: string;
  preferredContactTime?: string;
  requirement?: string;
  score: number;
  category: LeadCategory;
  status: LeadStatus;
  source: string;
  createdAt: Date;
  updatedAt: Date;
};

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const requestWithOptionalIp = request as NextRequest & { ip?: string };
  if (requestWithOptionalIp.ip) {
    return requestWithOptionalIp.ip;
  }

  return "unknown";
}

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return digits;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return null;
}

function looksLikeEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mapPropertyTypeToLeadType(
  propertyType: string
): "residential" | "commercial" | undefined {
  const normalized = propertyType.toLowerCase();
  if (normalized === "residential") {
    return "residential";
  }
  if (normalized === "commercial" || normalized === "industrial") {
    return "commercial";
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const isRateAllowed = await checkPublicRateLimit(ip);
    if (!isRateAllowed) {
      return NextResponse.json(
        { message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: ContactRequestBody;
    try {
      body = (await request.json()) as ContactRequestBody;
    } catch {
      return NextResponse.json(
        { message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const name = toTrimmedString(body.name);
    const email = toTrimmedString(body.email);
    const rawPhone = toTrimmedString(body.phone);
    const location = toTrimmedString(body.location);
    const propertyType = toTrimmedString(body.propertyType);
    const service = toTrimmedString(body.service);
    const contactTime = toTrimmedString(body.contactTime);
    const message = toTrimmedString(body.message);

    if (!name || !email || !rawPhone || !location || !message) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (!looksLikeEmail(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(rawPhone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { message: "Please enter a valid Indian phone number." },
        { status: 400 }
      );
    }

    const scoreResult = calculateLeadScore({
      monthlyBill: 0,
      propertyType: "rented",
      type: mapPropertyTypeToLeadType(propertyType),
    });

    const db = await getDb();
    const collection = db.collection<ContactLeadDoc>("leads");
    const now = new Date();

    const updateResult = await collection.findOneAndUpdate(
      { phone: normalizedPhone },
      {
        $set: {
          name,
          phone: normalizedPhone,
          city: location,
          email,
          propertyTypeSelection: propertyType || undefined,
          serviceInterested: service || undefined,
          preferredContactTime: contactTime || undefined,
          requirement: message,
          source: "contact_form",
          updatedAt: now,
        },
        $setOnInsert: {
          score: scoreResult.score,
          category: scoreResult.category,
          status: "new",
          createdAt: now,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    return NextResponse.json({
      message: "Thank you for your message. We'll contact you shortly.",
      leadId: updateResult.value?._id?.toString(),
    });
  } catch (error) {
    console.error("[contact] failed to save lead", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
