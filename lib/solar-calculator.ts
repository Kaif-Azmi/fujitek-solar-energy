import { getActiveSchemesByState } from "@/lib/scheme-engine";
import type { SolarScheme } from "@/models/SolarScheme";

export type SolarProjectionInput = {
  monthlyBill: number;
  state?: string;
  years?: number;
  inflationRate?: number;
};

export type SolarProjectionResult = {
  systemSizeKW: number;
  estimatedSystemCost: number;
  subsidyAmount: number;
  effectiveCost: number;
  totalSavings: number;
  netProfit: number;
  paybackYears: number;
};

const BILL_TO_KW_RATIO = 1000;
const COST_PER_KW = 55_000;
const DEFAULT_YEARS = 10;
const DEFAULT_INFLATION_RATE = 0.05;

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function calculateSchemeSubsidy(scheme: SolarScheme, systemSizeKW: number): number {
  const eligibleKW = Math.min(systemSizeKW, scheme.maxEligibleKW);
  const computed = scheme.subsidyPerKW * eligibleKW;
  return Math.min(computed, scheme.maxSubsidy);
}

export async function calculateSolarProjection(input: SolarProjectionInput): Promise<SolarProjectionResult> {
  if (!Number.isFinite(input.monthlyBill) || input.monthlyBill <= 0) {
    throw new Error("monthlyBill must be greater than 0");
  }

  const yearsInput = input.years;
  const inflationRateInput = input.inflationRate;

  const years = Number.isFinite(yearsInput) && yearsInput !== undefined && yearsInput > 0 ? Math.floor(yearsInput) : DEFAULT_YEARS;
  const inflationRate = Number.isFinite(inflationRateInput) && inflationRateInput !== undefined ? inflationRateInput : DEFAULT_INFLATION_RATE;

  const rawSystemSizeKW = input.monthlyBill / BILL_TO_KW_RATIO;
  const systemSizeKW = roundTo(rawSystemSizeKW, 1);

  const estimatedSystemCost = roundTo(systemSizeKW * COST_PER_KW, 2);

  let schemes: SolarScheme[] = [];
  try {
    schemes = await getActiveSchemesByState(input.state);
  } catch (error) {
    // Keep calculator available even if scheme data source is unavailable.
    console.error("[solar-calculator] Scheme lookup failed, continuing without subsidy.", error);
  }
  let highestSubsidy = 0;

  for (const schemeDoc of schemes) {
    const subsidy = calculateSchemeSubsidy(schemeDoc, systemSizeKW);
    if (subsidy > highestSubsidy) {
      highestSubsidy = subsidy;
    }
  }

  const subsidyAmount = roundTo(highestSubsidy, 2);
  const effectiveCost = roundTo(Math.max(estimatedSystemCost - subsidyAmount, 0), 2);

  const annualBill = input.monthlyBill * 12;
  let totalSavingsRaw = 0;
  for (let year = 0; year < years; year += 1) {
    totalSavingsRaw += annualBill * (1 + inflationRate) ** year;
  }

  const totalSavings = roundTo(totalSavingsRaw, 2);
  const netProfit = roundTo(totalSavings - effectiveCost, 2);
  const paybackYears = roundTo(effectiveCost / annualBill, 1);

  return {
    systemSizeKW,
    estimatedSystemCost,
    subsidyAmount,
    effectiveCost,
    totalSavings,
    netProfit,
    paybackYears,
  };
}
