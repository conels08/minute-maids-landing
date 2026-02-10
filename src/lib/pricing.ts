export type CleanType = "standard" | "deep";
export type Condition = "normal" | "messy" | "heavy";
export type Pets = "none" | "some" | "many";

export const pricingConfig = {
  rates: {
    standard: { low: 0.15, high: 0.22 },
    deep: { low: 0.25, high: 0.35 },
  },
  hourlyRate: 55,
  addOnMinimumHours: 1,
  exampleSqft: [1200, 1500, 2000, 2500],
  conditionBias: {
    normal: 0.35,
    messy: 0.65,
    heavy: 0.9,
  },
  petBiasDelta: {
    none: 0,
    some: 0.08,
    many: 0.15,
  },
} as const;

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function roundToNearestFive(value: number) {
  return Math.round(value / 5) * 5;
}

// Temporary approximation until owner provides per-task timing ranges.
export function getAddOnHours(selectedCount: number) {
  if (selectedCount <= 0) return 0;
  if (selectedCount <= 2) return pricingConfig.addOnMinimumHours;
  return pricingConfig.addOnMinimumHours + 0.5 * (selectedCount - 2);
}

export function getRateRange(cleanType: CleanType) {
  return pricingConfig.rates[cleanType];
}

export function getBaseRange(cleanType: CleanType, sqft: number) {
  const rate = getRateRange(cleanType);
  return {
    low: sqft * rate.low,
    high: sqft * rate.high,
  };
}

export function getRecommendedEstimate(
  cleanType: CleanType,
  sqft: number,
  condition: Condition,
  pets: Pets
) {
  const rate = getRateRange(cleanType);
  const rateBias = clamp(
    pricingConfig.conditionBias[condition] + pricingConfig.petBiasDelta[pets]
  );
  const recommendedRate = rate.low + (rate.high - rate.low) * rateBias;
  return sqft * recommendedRate;
}
