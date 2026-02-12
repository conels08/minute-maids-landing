"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import {
  getAddOnHours,
  getBaseRange,
  getRecommendedEstimate,
  pricingConfig,
  roundToNearestFive,
  type CleanType,
  type Condition,
  type Pets,
} from "@/lib/pricing";

type AddOn = {
  key: "fridge" | "oven" | "cabinets" | "organize";
  label: string;
};

const addOns: AddOn[] = [
  { key: "fridge", label: "Fridge interior" },
  { key: "oven", label: "Oven interior" },
  { key: "cabinets", label: "Inside cabinets" },
  { key: "organize", label: "Organization reset" },
];

function formatHourValue(hours: number) {
  return Number.isInteger(hours) ? `${hours}` : `${hours.toFixed(1)}`;
}

export default function Estimator() {
  const [sqft, setSqft] = useState<number>(1500);
  const [cleanType, setCleanType] = useState<CleanType>("standard");
  const [condition, setCondition] = useState<Condition>("normal");
  const [pets, setPets] = useState<Pets>("none");
  const [selected, setSelected] = useState<Record<AddOn["key"], boolean>>({
    fridge: false,
    oven: false,
    cabinets: false,
    organize: false,
  });
  const [showAddOnInfo, setShowAddOnInfo] = useState(false);
  const addOnInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAddOnInfo) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const node = addOnInfoRef.current;
      if (!node) return;
      if (event.target instanceof Node && !node.contains(event.target)) {
        setShowAddOnInfo(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAddOnInfo(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [showAddOnInfo]);

  const selectedAddOns = useMemo(
    () => addOns.filter((a) => selected[a.key]),
    [selected]
  );

  const estimate = useMemo(() => {
    const base = getBaseRange(cleanType, sqft);
    const recommended = getRecommendedEstimate(cleanType, sqft, condition, pets);

    const selectedCount = selectedAddOns.length;
    const addOnHours = getAddOnHours(selectedCount);
    const addOnCost = addOnHours * pricingConfig.hourlyRate;

    return {
      totalLow: roundToNearestFive(base.low + addOnCost),
      totalHigh: roundToNearestFive(base.high + addOnCost),
      recommendedTotal: roundToNearestFive(recommended + addOnCost),
      selectedCount,
      addOnHours,
      addOnCostRounded: roundToNearestFive(addOnCost),
      addOnCostRaw: addOnCost,
    };
  }, [cleanType, sqft, condition, pets, selectedAddOns]);

  const summary = useMemo(() => {
    return selectedAddOns.length
      ? selectedAddOns.map((a) => a.label).join(", ")
      : "No add-ons selected";
  }, [selectedAddOns]);

  return (
    <Section
      id="estimate"
      eyebrow="Estimator"
      title="Get a quick estimate in seconds"
      className="bg-transparent"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 card-gold text-on-gold">
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="estimate-sqft-number"
                className="text-sm font-semibold text-zinc-900"
              >
                Approximate square footage
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  id="estimate-sqft-number"
                  type="number"
                  min={300}
                  max={8000}
                  inputMode="numeric"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value || 0))}
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-purple sm:w-40"
                />
                <input
                  type="range"
                  min={300}
                  max={6000}
                  step={50}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  aria-label="Approximate square footage slider"
                  className="w-full"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-600">
                Don&apos;t know? That&apos;s okay - this is a ballpark estimate.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p id="estimate-clean-type-label" className="text-sm font-semibold text-zinc-900">
                  Clean type
                </p>
                <div
                  className="mt-2 grid grid-cols-2 gap-2"
                  role="group"
                  aria-labelledby="estimate-clean-type-label"
                >
                  <button
                    type="button"
                    onClick={() => setCleanType("standard")}
                    aria-pressed={cleanType === "standard"}
                    className={`min-h-[44px] rounded-2xl border px-4 py-3 text-sm font-semibold ${
                      cleanType === "standard"
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setCleanType("deep")}
                    aria-pressed={cleanType === "deep"}
                    className={`min-h-[44px] rounded-2xl border px-4 py-3 text-sm font-semibold ${
                      cleanType === "deep"
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    Deep
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="estimate-condition"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Home condition
                </label>
                <select
                  id="estimate-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as Condition)}
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-purple"
                >
                  <option value="normal">Normal</option>
                  <option value="messy">Messy</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
            </div>

            <div>
              <p id="estimate-pets-label" className="text-sm font-semibold text-zinc-900">
                Pets
              </p>
              <div
                className="mt-2 grid grid-cols-3 gap-2"
                role="group"
                aria-labelledby="estimate-pets-label"
              >
                {[
                  { key: "none", label: "None" },
                  { key: "some", label: "1-2" },
                  { key: "many", label: "3+" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPets(item.key as Pets)}
                    aria-pressed={pets === item.key}
                    className={`min-h-[44px] rounded-2xl border px-4 py-3 text-sm font-semibold ${
                      pets === item.key
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div
                className="relative flex items-center gap-2"
                ref={addOnInfoRef}
                onMouseLeave={() => setShowAddOnInfo(false)}
              >
                <p className="text-sm font-semibold text-zinc-900">
                  Optional add-ons (hourly)
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddOnInfo((v) => !v)}
                  onMouseEnter={() => setShowAddOnInfo(true)}
                  onMouseLeave={() => setShowAddOnInfo(false)}
                  aria-label="How add-on pricing works"
                  aria-describedby="addon-tooltip"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-white text-[11px] font-semibold text-zinc-600"
                >
                  ⓘ
                </button>
                {showAddOnInfo && (
                  <div
                    id="addon-tooltip"
                    role="tooltip"
                    className="absolute left-0 top-7 z-10 max-w-xs rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-700 shadow-lg"
                  >
                    Add-ons are billed hourly because time varies by home.
                    <br />
                    This estimate uses a simple time guideline to stay accurate
                    without over-promising.
                  </div>
                )}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {addOns.map((addOn) => (
                  <label
                    key={addOn.key}
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900"
                  >
                    <span className="font-medium">{addOn.label}</span>
                    <input
                      type="checkbox"
                      checked={selected[addOn.key]}
                      onChange={(e) =>
                        setSelected((state) => ({
                          ...state,
                          [addOn.key]: e.target.checked,
                        }))
                      }
                      className="h-4 w-4"
                    />
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-600">{summary}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 lg:self-start card-gold text-on-gold">
          <p className="text-sm font-semibold text-zinc-900">Estimated range</p>

          <div
            className="mt-3 rounded-3xl border border-brand-200 bg-brand-50 p-5 sm:p-6"
            aria-live="polite"
          >
            <div className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              ${estimate.totalLow.toLocaleString()} - ${estimate.totalHigh.toLocaleString()}
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-600">
              Estimated total with selected add-ons
            </p>
            <p className="mt-2 text-sm text-zinc-700">
              <span className="font-semibold uppercase tracking-wide accent-copper-text">
                Recommended
              </span>{" "}
              estimate:{" "}
              <span className="font-bold text-brand-600">
                ~${estimate.recommendedTotal.toLocaleString()}
              </span>{" "}
              (based on pets + home condition)
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 card-gold-soft">
            <p className="font-semibold text-zinc-900">
              Add-on breakdown: ${pricingConfig.hourlyRate}/hr (1-hour minimum)
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>Selected add-ons: {estimate.selectedCount}</li>
              <li>Estimated add-on time: {formatHourValue(estimate.addOnHours)} hrs</li>
              <li>
                Estimated add-on cost (already included above): ${estimate.addOnCostRounded.toLocaleString()}
                {estimate.addOnCostRaw !== estimate.addOnCostRounded
                  ? ` (raw: $${estimate.addOnCostRaw.toFixed(2)})`
                  : ""}
              </li>
            </ul>
          </div>

          <div className="mt-6 space-y-3 text-sm text-zinc-700">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 card-gold-soft">
              <p className="font-semibold text-zinc-900">What&apos;s included?</p>
              <p className="mt-1">
                Standard and deep cleans follow a clear checklist for kitchens,
                bathrooms, and main living areas.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 card-gold-soft">
              <p className="font-semibold text-zinc-900">Want an exact quote?</p>
              <p className="mt-1">
                Send a message with your square footage and what you need - Lacee
                will reply with availability and a confirmed quote.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <a
              href="#contact"
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Request a confirmed quote
            </a>
            <a
              href="#services"
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50 ring-purple"
            >
              Review services
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Service level + square footage set the base range. Pets and condition
            influence the recommended point estimate, and selected add-ons are
            included in the total range above.
          </p>
        </div>
      </div>
    </Section>
  );
}
