"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Estimate", href: "#estimate" },
  { label: "Results", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const telHref = `tel:${site.phoneTel}`;
  const smsHref = `sms:${site.phoneTel}`;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a, button"
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
      const first = panelRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleNavClick() {
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur border-purple-soft">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
              <Image
                src="/images/minute-maids-logo-transparent.png"
                alt="Minute Maids logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-zinc-900">
                {site.businessName}
              </p>
              <p className="text-xs text-zinc-600">{site.serviceArea}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900 accent-copper-link"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#estimate"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Get Estimate
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#estimate"
              className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Estimate
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 ring-purple"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-5 rounded bg-zinc-900" />
                <span className="h-0.5 w-5 rounded bg-zinc-900" />
                <span className="h-0.5 w-5 rounded bg-zinc-900" />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Menu</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-900"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 ring-purple"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-6 grid gap-2">
              <a
                href="#estimate"
                onClick={handleNavClick}
                className="rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Get Estimate
              </a>
              <a
                href={telHref}
                onClick={handleNavClick}
                className="rounded-xl border border-zinc-200 px-4 py-3 text-center text-sm font-semibold text-zinc-900 ring-purple"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-3 py-2">
          <a
            href={telHref}
            className="flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white"
          >
            Call
          </a>
          <a
            href={smsHref}
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-900 ring-purple"
          >
            Text
          </a>
          <a
            href="#estimate"
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-900 ring-purple"
          >
            Quote
          </a>
        </div>
      </div>

      {/* Spacer so content isn’t hidden behind the mobile CTA bar */}
      <div className="h-16 md:hidden" />
    </>
  );
}
