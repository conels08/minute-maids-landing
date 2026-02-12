"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/Section";

const GUIDE_URL = "/docs/Minute-Maids-residential-service-guide.pdf";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function PricingGuide() {
  const [showPreview, setShowPreview] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const previewPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPreview) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = previewTriggerRef.current;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPreview(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusables = previewPanelRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [showPreview]);

  return (
    <Section
      id="pricing-guide"
      eyebrow="Service Guide"
      title="Pricing & Service Guide"
      className="bg-white"
    >
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm accent-purple-border accent-purple-surface sm:p-6">
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
            ref={previewTriggerRef}
            type="button"
            onClick={() => setShowPreview(true)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 accent-purple-hover-outline"
          >
            Preview
          </button>
          <a
            href={GUIDE_URL}
            download
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 accent-purple-hover-outline"
          >
            Download PDF
          </a>
        </div>
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pricing guide PDF preview"
          onClick={() => setShowPreview(false)}
        >
          <div
            ref={previewPanelRef}
            className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
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
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-zinc-100 p-2 sm:p-3">
              <iframe
                title="Minute Maids service guide PDF"
                src={GUIDE_URL}
                className="h-full w-full rounded-2xl border border-zinc-200 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
