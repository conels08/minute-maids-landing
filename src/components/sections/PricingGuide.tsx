"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/Section";

const GUIDE_URL = "/docs/Minute-Maids-residential-service-guide.pdf";

export default function PricingGuide() {
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPreview) return;
    requestAnimationFrame(() => {
      const previewEl = previewRef.current;
      if (!previewEl) return;

      const header = document.querySelector("header");
      const headerH =
        header instanceof HTMLElement
          ? header.getBoundingClientRect().height
          : 64;
      const rect = previewEl.getBoundingClientRect();
      const y = window.scrollY + rect.top;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: Math.max(0, y - headerH - 12),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }, [showPreview]);

  return (
    <Section
      id="pricing-guide"
      eyebrow="Service Guide"
      title="Pricing & Service Guide"
      className="bg-transparent"
    >
      <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 card-gold text-on-gold">
        <p className="max-w-2xl text-sm text-zinc-700 sm:text-base">
          View our Standard Clean / Deep Clean checklist and service details.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href={GUIDE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            View pricing guide (PDF)
          </a>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 ring-purple"
          >
            {showPreview ? "Hide preview" : "Preview"}
          </button>
          <a
            href={GUIDE_URL}
            download
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 ring-purple"
          >
            Download PDF
          </a>
        </div>
      </div>

      {showPreview && (
        <div
          ref={previewRef}
          className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white"
        >
          <div
            className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4"
          >
            <p className="text-sm font-semibold text-zinc-900">
              Minute Maids Service Guide (PDF)
            </p>
            <div className="flex items-center gap-2">
              <a
                href={GUIDE_URL}
                download
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Download PDF
              </a>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Hide preview
              </button>
            </div>
          </div>
          <div className="bg-zinc-100 p-2 sm:p-3">
            <iframe
              title="Minute Maids service guide PDF"
              src={GUIDE_URL}
              className="h-[70vh] w-full rounded-2xl border border-zinc-200 bg-white"
            />
          </div>
        </div>
      )}
    </Section>
  );
}
