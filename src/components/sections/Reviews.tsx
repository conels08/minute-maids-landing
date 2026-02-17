"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
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

function EmptyStars() {
  return (
    <div className="flex items-center gap-1" aria-label="No rating yet">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-zinc-300">
          ☆
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [lightbox, setLightbox] = useState<{
    reviewIndex: number;
    imageIndex: number;
  } | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
        return;
      }

      const images = reviews[lightbox.reviewIndex]?.images;
      if (!images || images.length < 2) return;

      if (event.key === "ArrowRight") {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                imageIndex: (prev.imageIndex + 1) % images.length,
              }
            : prev
        );
      } else if (event.key === "ArrowLeft") {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                imageIndex: (prev.imageIndex - 1 + images.length) % images.length,
              }
            : prev
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [lightbox]);

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
              Want to learn more about what people are saying? Click below!
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
          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 card-premium">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Your feedback</p>
                <p className="mt-1 text-xs text-zinc-500">Google</p>
              </div>
              <EmptyStars />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-700">
              Help future clients by sharing your experience with Minute Maids.
            </p>

            <a
              href="https://g.page/r/CaILO7OEJQRLEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Write a Google review"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-accent-bronze-light bg-white px-4 py-2 text-sm font-semibold text-ink-dark transition-colors duration-200 ease-in-out hover:border-[var(--accent-bronze)] hover:text-accent-bronze focus-ring"
            >
              Review Minute Maids
            </a>
          </div>

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

              {r.images?.length ? (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-zinc-600">Photos</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.images.map((image, imageIdx) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={(event) => {
                          lastTriggerRef.current = event.currentTarget;
                          setLightbox({ reviewIndex: idx, imageIndex: imageIdx });
                        }}
                        className="group relative h-16 w-16 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm focus-ring sm:h-20 sm:w-20"
                        aria-label={`Open review photo: ${image.alt}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {typeof document !== "undefined" &&
      lightbox &&
      reviews[lightbox.reviewIndex]?.images
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] bg-black/60 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Review photo preview"
              onClick={() => setLightbox(null)}
            >
              <div
                className="mx-auto flex h-full max-h-[85vh] w-full max-w-[92vw] flex-col overflow-hidden rounded-2xl bg-white"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-zinc-200 p-3">
                  <p className="text-sm font-semibold text-zinc-900">Review photo</p>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 focus-ring"
                  >
                    Close
                  </button>
                </div>

                <div className="relative min-h-0 flex-1 bg-zinc-100">
                  <Image
                    src={reviews[lightbox.reviewIndex].images![lightbox.imageIndex].src}
                    alt={reviews[lightbox.reviewIndex].images![lightbox.imageIndex].alt}
                    fill
                    className="object-contain"
                    sizes="92vw"
                  />
                </div>

                {reviews[lightbox.reviewIndex].images!.length > 1 ? (
                  <div className="flex items-center justify-between border-t border-zinc-200 p-3">
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) =>
                          prev
                            ? {
                                ...prev,
                                imageIndex:
                                  (prev.imageIndex -
                                    1 +
                                    reviews[prev.reviewIndex].images!.length) %
                                  reviews[prev.reviewIndex].images!.length,
                              }
                            : prev
                        )
                      }
                      className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 focus-ring"
                    >
                      Previous
                    </button>
                    <p className="text-xs text-zinc-600">
                      {lightbox.imageIndex + 1} /{" "}
                      {reviews[lightbox.reviewIndex].images!.length}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) =>
                          prev
                            ? {
                                ...prev,
                                imageIndex:
                                  (prev.imageIndex + 1) %
                                  reviews[prev.reviewIndex].images!.length,
                              }
                            : prev
                        )
                      }
                      className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 focus-ring"
                    >
                      Next
                    </button>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </Section>
  );
}
