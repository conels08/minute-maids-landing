"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type CombinedItem = {
  id: string;
  kind: "combined";
  title: string;
  src: string;
  alt: string;
};

type SplitItem = {
  id: string;
  kind: "split";
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

type Item = CombinedItem | SplitItem;

type OpenImage = {
  src: string;
  alt: string;
  title: string;
  label?: "Before" | "After";
};

const items: Item[] = [
  {
    id: "fridge",
    kind: "combined",
    title: "Fridge clean-out (before & after)",
    src: "/images/fridge-before-after.png",
    alt: "Fridge before and after cleaning collage",
  },
  {
    id: "stove",
    kind: "combined",
    title: "Stovetop detail (before & after)",
    src: "/images/stove-before-after.png",
    alt: "Stovetop before and after cleaning collage",
  },
  {
    id: "closet",
    kind: "combined",
    title: "Organization refresh (before & after)",
    src: "/images/closet-before-after.png",
    alt: "Closet organization before and after collage",
  },
  {
    id: "bathroom-sink",
    kind: "split",
    title: "Bathroom sink",
    before: {
      src: "/images/bathroom-sink-before.jpg",
      alt: "Bathroom sink before cleaning",
    },
    after: {
      src: "/images/bathroom-sink-after.jpeg",
      alt: "Bathroom sink after cleaning",
    },
  },
  {
    id: "shower-head",
    kind: "split",
    title: "Shower head",
    before: {
      src: "/images/shower-head-before.jpg",
      alt: "Shower head before cleaning",
    },
    after: {
      src: "/images/shower-head-after.jpeg",
      alt: "Shower head after cleaning",
    },
  },
];

export default function Gallery() {
  const [openImage, setOpenImage] = useState<OpenImage | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  function openFromEvent(
    e: React.MouseEvent<HTMLElement>,
    nextImage: OpenImage
  ) {
    triggerRef.current = e.currentTarget;
    setOpenImage(nextImage);
  }

  useEffect(() => {
    if (!openImage) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenImage(null);
        return;
      }

      if (event.key !== "Tab") return;
      const focusables = modalPanelRef.current?.querySelectorAll<HTMLElement>(
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
      modalCloseRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [openImage]);

  return (
    <Section
      id="gallery"
      eyebrow="Results"
      title="Before & after you can feel"
      className="bg-transparent"
    >
      <p className="max-w-2xl text-on-purple-muted">
        Clean isn’t just &quot;tidy.&quot; It’s the reset you notice the moment you walk
        in. Tap any photo to zoom.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          if (item.kind === "combined") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) =>
                  openFromEvent(e, {
                    src: item.src,
                    alt: item.alt,
                    title: item.title,
                  })
                }
                aria-label={`Open ${item.title}`}
                className="group overflow-hidden rounded-3xl bg-white text-left shadow-sm transition hover:shadow-md card-gold text-on-gold ring-purple"
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
            );
          }

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl bg-white text-left shadow-sm card-gold text-on-gold"
            >
              <div className="grid gap-2 p-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={(e) =>
                    openFromEvent(e, {
                      src: item.before.src,
                      alt: item.before.alt,
                      title: item.title,
                      label: "Before",
                    })
                  }
                  aria-label={`Open ${item.title} before image`}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.before.src}
                      alt={item.before.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
                      Before
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    openFromEvent(e, {
                      src: item.after.src,
                      alt: item.after.alt,
                      title: item.title,
                      label: "After",
                    })
                  }
                  aria-label={`Open ${item.title} after image`}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.after.src}
                      alt={item.after.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute left-2 top-2 rounded-full px-2 py-1 text-[11px] font-semibold badge-copper-solid">
                      After
                    </span>
                  </div>
                </button>
              </div>

              <div className="px-5 py-4">
                <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-600">Tap to view larger</p>
              </div>
            </div>
          );
        })}
      </div>

      {openImage && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={() => setOpenImage(null)}
        >
          <div
            ref={modalPanelRef}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
              <p className="text-sm font-semibold text-zinc-900">
                {openImage.title}
                {openImage.label ? ` (${openImage.label})` : ""}
              </p>
              <button
                ref={modalCloseRef}
                type="button"
                onClick={() => setOpenImage(null)}
                aria-label="Close gallery preview"
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-zinc-100">
              <Image
                src={openImage.src}
                alt={openImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
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
