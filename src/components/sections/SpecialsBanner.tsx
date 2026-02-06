"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";

const ENABLE_SPECIAL = true;
const FLYER_URL = "/docs/valentines-brochure.pdf";

export default function SpecialsBanner() {
  const [showPreview, setShowPreview] = useState(false);

  if (!ENABLE_SPECIAL) return null;

  return (
    <section className="py-6">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-brand-50 p-5 shadow-sm">
          {/* Background image */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/valentine-roses-2.jpg"
              alt="Valentine's Day special banner of roses"
              fill
              priority={false}
              className="object-cover opacity-99"
              sizes="(max-width: 640px) 100vw, 1000px"
            />
            {/* Soft overlay for readability */}
            <div className="absolute inset-0 bg-white/40" />
            {/* Optional: gentle vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-white/60" />
          </div>

          {/* Content layer */}
          <div className="relative">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-brand-700/40 transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md hover:ring-brand-800/60"
                >
                  Claim this special
                </a>

                <div className="flex gap-2">
                  <a
                    href={FLYER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-white"
                  >
                    View flyer (PDF)
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowPreview((v) => !v)}
                    className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-white"
                  >
                    {showPreview ? "Hide preview" : "Preview"}
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
        </div>
      </Container>
    </section>
  );
}
