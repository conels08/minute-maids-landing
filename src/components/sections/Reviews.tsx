"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { reviews } from "@/lib/reviews";

const REVIEW_PREVIEW_LENGTH = 180;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < count ? "rating-star" : "text-zinc-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <Section
      id="reviews"
      eyebrow="Reviews"
      title="Trusted locally"
      className="bg-transparent"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 sm:p-6 card-gold text-on-gold">
          <p className="text-sm font-semibold text-zinc-900">
            Real words from real clients
          </p>
          <p className="mt-2 text-sm text-zinc-700">
            Owner-operated, licensed & insured, and focused on the details that
            make your home feel truly reset.
          </p>

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-900">Tip</p>
            <p className="mt-1 text-sm text-zinc-700">
              To see more reviews or leave one of your own, click below!
            </p>
            <a
              href="https://share.google/qmwyhOB1SbcHUKO8Q"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read Minute Maids reviews on Google (opens in a new tab)"
              className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Read more on Google
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 card-premium"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{r.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {r.source ?? "Review"}
                  </p>
                </div>
                <Stars count={r.rating} />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-700">
                {(() => {
                  const shouldTruncate = r.text.length > REVIEW_PREVIEW_LENGTH;
                  const isExpanded = expanded[idx] ?? false;
                  const displayText =
                    shouldTruncate && !isExpanded
                      ? `${r.text.slice(0, REVIEW_PREVIEW_LENGTH).trimEnd()}...`
                      : r.text;

                  return <>“{displayText}”</>;
                })()}
              </p>

              {r.text.length > REVIEW_PREVIEW_LENGTH && (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [idx]: !(prev[idx] ?? false) }))
                  }
                  className="mt-2 text-xs font-semibold text-accent-bronze hover:underline focus-ring rounded"
                >
                  {expanded[idx] ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
