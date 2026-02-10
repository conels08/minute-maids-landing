"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";

const ENABLE_SPECIAL = true;

export default function SpecialsBanner() {
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
          <div className="flex flex-col gap-5 sm:gap-6">
            <div>
              <p className="text-sm font-semibold text-brand-800">
                Valentine’s Deep-Clean Bundles
              </p>
              <p className="mt-1 text-base font-medium text-zinc-900">
                Limited-time deep-clean bundle pricing. Tap the flyer to zoom
                and see bundle details.
              </p>
              <p className="mt-2 text-sm text-zinc-700">
                Questions? Text or call (971) 220-4371.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-[420px]">
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
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 420px"
                    />
                  </div>
                  <div className="border-t border-zinc-200 px-4 py-3 text-xs font-semibold text-zinc-700">
                    Tap to zoom
                  </div>
                </button>
              </div>
            </div>
          </div>

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
