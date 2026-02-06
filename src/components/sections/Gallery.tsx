"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";

type Item = {
  id: string;
  title: string;
  src: string;
  alt: string;
};

const items: Item[] = [
  {
    id: "fridge",
    title: "Fridge clean-out (before & after)",
    src: "/images/fridge-before-after.png",
    alt: "Fridge before and after cleaning collage",
  },
  {
    id: "stove",
    title: "Stovetop detail (before & after)",
    src: "/images/stove-before-after.png",
    alt: "Stovetop before and after cleaning collage",
  },
  {
    id: "closet",
    title: "Organization refresh (before & after)",
    src: "/images/closet-before-after.png",
    alt: "Closet organization before and after collage",
  },
];

export default function Gallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openItem = items.find((i) => i.id === openId) ?? null;

  return (
    <Section
      id="gallery"
      eyebrow="Results"
      title="Before & after you can feel"
      className="bg-white"
    >
      <p className="max-w-2xl text-zinc-700">
        Clean isn’t just “tidy.” It’s the reset you notice the moment you walk
        in. Tap any photo to zoom.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenId(item.id)}
            aria-label={`Open ${item.title}`}
            className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white text-left shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full bg-zinc-100">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-1 text-xs text-zinc-600">Tap to view larger</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openItem && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
              <p className="text-sm font-semibold text-zinc-900">
                {openItem.title}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close gallery preview"
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-zinc-100">
              <Image
                src={openItem.src}
                alt={openItem.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="px-5 py-4 text-xs text-zinc-600">
              Tip: pinch-to-zoom on mobile.
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
