export type LeadScoringInput = {
  monthlyBill: number;
  propertyType: "owned" | "rented";
  timeline?: "immediate" | "3months" | "exploring";
  type?: "residential" | "commercial";
};

export type LeadScoringResult = {
  score: number;
  category: "high" | "medium" | "low";
};

export function calculateLeadScore(input: LeadScoringInput): LeadScoringResult {
  let score = 0;

  if (input.monthlyBill > 4000) {
    score += 5;
  } else if (input.monthlyBill > 2000) {
    score += 3;
  }

  if (input.propertyType === "owned") {
    score += 4;
  }

  if (input.type === "commercial") {
    score += 6;
  }

  if (input.timeline === "immediate") {
    score += 5;
  } else if (input.timeline === "exploring") {
    score += 1;
  }

  const category: LeadScoringResult["category"] = score >= 12 ? "high" : score >= 6 ? "medium" : "low";

  return { score, category };
}
