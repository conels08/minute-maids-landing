"use client";

import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";

type CleanType = "standard" | "deep";
type Condition = "light" | "normal" | "heavy";
type Pets = "none" | "some" | "many";

const rates = {
  standard: { min: 0.15, max: 0.22 },
  deep: { min: 0.25, max: 0.35 },
} as const;

const conditionMult: Record<Condition, number> = {
  light: 0.98,
  normal: 1.0,
  heavy: 1.1,
};

const petsMult: Record<Pets, number> = {
  none: 1.0,
  some: 1.03,
  many: 1.06,
};

const addOns = [
  { key: "fridge", label: "Fridge interior", price: 40 },
  { key: "oven", label: "Oven interior", price: 45 },
  { key: "cabinets", label: "Inside cabinets", price: 35 },
  { key: "organize", label: "Organization reset", price: 55 },
] as const;

type AddOnKey = (typeof addOns)[number]["key"];

export default function Estimator() {
  const [sqft, setSqft] = useState<number>(1500);
  const [cleanType, setCleanType] = useState<CleanType>("standard");
  const [condition, setCondition] = useState<Condition>("normal");
  const [pets, setPets] = useState<Pets>("none");
  const [selected, setSelected] = useState<Record<AddOnKey, boolean>>({
    fridge: false,
    oven: false,
    cabinets: false,
    organize: false,
  });

  const addOnTotal = useMemo(() => {
    return addOns.reduce((sum, a) => sum + (selected[a.key] ? a.price : 0), 0);
  }, [selected]);

  const estimate = useMemo(() => {
    const base = rates[cleanType];
    const mult = conditionMult[condition] * petsMult[pets];

    const min = Math.round(sqft * base.min * mult + addOnTotal);
    const max = Math.round(sqft * base.max * mult + addOnTotal);

    // Guardrails for super small inputs
    const safeMin = Math.max(min, 120);
    const safeMax = Math.max(max, safeMin + 40);

    return { min: safeMin, max: safeMax };
  }, [sqft, cleanType, condition, pets, addOnTotal]);

  const summary = useMemo(() => {
    const picked = addOns.filter((a) => selected[a.key]).map((a) => a.label);
    return picked.length ? picked.join(", ") : "No add-ons selected";
  }, [selected]);

  return (
    <Section
      id="estimate"
      eyebrow="Estimator"
      title="Get a quick estimate in seconds"
      className="bg-zinc-50"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            <div>
              <label className="text-sm font-semibold text-zinc-900">
                Approximate square footage
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  min={300}
                  max={8000}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value || 0))}
                  className="w-40 rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-brand-300"
                />
                <input
                  type="range"
                  min={300}
                  max={6000}
                  step={50}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-600">
                Don’t know? That’s okay — this is just to give a ballpark.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-zinc-900">
                  Clean type
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCleanType("standard")}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold border ${
                      cleanType === "standard"
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setCleanType("deep")}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold border ${
                      cleanType === "deep"
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    Deep
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-900">
                  Home condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as Condition)}
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-brand-300"
                >
                  <option value="light">Light (already pretty clean)</option>
                  <option value="normal">Normal</option>
                  <option value="heavy">Heavy (needs extra attention)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-zinc-900">Pets</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { k: "none", label: "None" },
                  { k: "some", label: "1–2" },
                  { k: "many", label: "3+" },
                ].map((p) => (
                  <button
                    key={p.k}
                    type="button"
                    onClick={() => setPets(p.k as Pets)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold border ${
                      pets === p.k
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">Add-ons</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {addOns.map((a) => (
                  <label
                    key={a.key}
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900"
                  >
                    <span className="font-medium">{a.label}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-xs text-zinc-600">${a.price}</span>
                      <input
                        type="checkbox"
                        checked={selected[a.key]}
                        onChange={(e) =>
                          setSelected((s) => ({
                            ...s,
                            [a.key]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4"
                      />
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-600">{summary}</p>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Estimated range</p>

          <div className="mt-3 rounded-3xl border border-brand-200 bg-brand-50 p-6">
            <div className="text-4xl font-semibold tracking-tight text-zinc-900">
              ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
            </div>
            <p className="mt-2 text-sm text-zinc-700">
              Final price is confirmed after a quick walkthrough or a few photos.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-zinc-700">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="font-semibold text-zinc-900">What’s included?</p>
              <p className="mt-1">
                Standard and deep cleans follow a clear checklist for kitchens,
                bathrooms, and main living areas.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="font-semibold text-zinc-900">
                Want an exact quote?
              </p>
              <p className="mt-1">
                Send a message with your square footage and what you need — Lacee
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
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Review services
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Note: estimates are a helpful starting point. Pets and home condition
            can affect time and total cost.
          </p>
        </div>
      </div>
    </Section>
  );
}
