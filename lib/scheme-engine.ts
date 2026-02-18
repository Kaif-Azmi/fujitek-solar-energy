import type { FilterQuery } from "mongoose";
import SolarSchemeModel, { type SolarScheme, type SolarSchemeDocument } from "@/models/SolarScheme";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getActiveSchemesByState(state?: string): Promise<SolarSchemeDocument[]> {
  const query: FilterQuery<SolarScheme> = {
    isActive: true,
  };

  const normalizedState = state?.trim();

  if (normalizedState) {
    query.$or = [
      {
        applicableStates: {
          $elemMatch: {
            $regex: /^all$/i,
          },
        },
      },
      {
        applicableStates: {
          $elemMatch: {
            $regex: new RegExp(`^${escapeRegex(normalizedState)}$`, "i"),
          },
        },
      },
    ];
  }

  return SolarSchemeModel.find(query).sort({ updatedAt: -1 }).exec();
}

export function formatSchemeInfo(schemes: SolarScheme[]): string {
  return schemes
    .map((scheme) => {
      return [
        scheme.name,
        scheme.description,
        `Subsidy per kW: ₹${scheme.subsidyPerKW}`,
        `Maximum subsidy: ₹${scheme.maxSubsidy}`,
        `Maximum eligible system size: ${scheme.maxEligibleKW}kW`,
        `Eligibility: ${scheme.eligibility}`,
      ].join("\n");
    })
    .join("\n\n");
}
