"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";

const ENABLE_SPECIAL = true;
const FLYER_URL = "/docs/valentines-brochure.pdf";

export default function SpecialsBanner() {
  const [showPreview, setShowPreview] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const imageTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showImage) return;
    const trigger = imageTriggerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowImage(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => {
      const first = imagePanelRef.current?.querySelector<HTMLElement>(
        "button"
      );
      first?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [showImage]);

  if (!ENABLE_SPECIAL) return null;

  return (
    <section className="py-6">
      <Container>
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 shadow-sm sm:p-5">
          <div className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
            <div>
              <p className="text-sm font-semibold text-brand-800">
                Valentine’s Special
              </p>
              <p className="mt-1 text-base font-medium text-zinc-900">
                Book a deep clean and get a{" "}
                <span className="font-semibold">free oven cleaning</span> + a{" "}
                <span className="font-semibold">dozen roses</span>.
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                Limited time • While availability lasts
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-brand-700/40 transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md hover:ring-brand-800/60 sm:w-auto"
                >
                  Claim this special
                </a>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={FLYER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-zinc-300 bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-white sm:w-auto"
                  >
                    View flyer (PDF)
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowPreview((v) => !v)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-zinc-300 bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-white sm:w-auto"
                  >
                    {showPreview ? "Hide preview" : "Preview"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center sm:justify-end">
              <div className="w-full max-w-[320px]">
                <button
                  ref={imageTriggerRef}
                  type="button"
                  onClick={() => setShowImage(true)}
                  className="group w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
                  aria-label="Preview Valentine’s flyer image"
                >
                  <div className="relative aspect-[3/4] w-full bg-white">
                    <Image
                      src="/images/valentines-2026.jpg"
                      alt="Valentine’s special flyer"
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 90vw, 320px"
                    />
                  </div>
                  <div className="border-t border-zinc-200 px-4 py-3 text-xs font-semibold text-zinc-700">
                    Tap to zoom
                  </div>
                </button>
              </div>
            </div>
          </div>

          {showPreview && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-900">
                  Valentine’s Flyer Preview
                </p>
                <a
                  href={FLYER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                >
                  Open full PDF
                </a>
              </div>

              <object
                data={FLYER_URL}
                type="application/pdf"
                className="h-[70vh] w-full"
              >
                <div className="p-4 text-sm text-zinc-700">
                  PDF preview isn’t available in this browser.{" "}
                  <a
                    className="font-semibold text-brand-700 hover:text-brand-800"
                    href={FLYER_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here to open the flyer.
                  </a>
                </div>
              </object>
            </div>
          )}
        </div>
      </Container>

      {showImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Valentine’s flyer image preview"
          onClick={() => setShowImage(false)}
        >
          <div
            ref={imagePanelRef}
            className="mx-auto flex h-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
              <p className="text-sm font-semibold text-zinc-900">
                Valentine’s Flyer Image
              </p>
              <button
                type="button"
                onClick={() => setShowImage(false)}
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Close
              </button>
            </div>
            <div className="relative flex-1 bg-white">
              <div className="absolute inset-0 overflow-auto p-4">
                <div className="mx-auto w-full max-w-3xl">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/valentines-2026.jpg"
                      alt="Valentine’s special flyer"
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
