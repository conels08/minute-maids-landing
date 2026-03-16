"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

const faqs = [
  {
    q: "How long does a typical clean take?",
    a: "Most standard cleans take 2 to 4 hours depending on home size, condition, and add-ons. Deep cleans typically take longer.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Many clients provide a door code or key. If you prefer to be home for the first visit, that is perfectly fine.",
  },
  {
    q: "What should I do before you arrive?",
    a: "A quick tidy is helpful. Clearing counters and floors allows for the most thorough clean possible.",
  },
  {
    q: "What areas do you service?",
    a: "We serve Yamhill County and surrounding areas. If you are nearby, send a message and we will confirm availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Quick answers"
      className="bg-transparent"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="flex w-full flex-col gap-3 sm:gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.q}
                className="w-full"
              >
                <div
                  className={[
                    "w-full overflow-hidden rounded-[1.4rem] border bg-white/95 text-on-gold transition-all duration-200 ease-out",
                    "card-gold-soft",
                    isOpen
                      ? "border-[hsl(34_26%_52%_/_0.42)] shadow-[0_14px_34px_-24px_rgba(26,18,46,0.45)]"
                      : "border-[hsl(34_26%_52%_/_0.24)] shadow-[0_10px_24px_-26px_rgba(26,18,46,0.32)] hover:border-[hsl(34_26%_52%_/_0.34)] hover:-translate-y-[1px]",
                  ].join(" ")}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() =>
                        setOpenIndex((current) =>
                          current === index ? null : index
                        )
                      }
                      className={[
                        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px]",
                        "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(272_68%_66%_/_0.28)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                        isOpen ? "text-zinc-950" : "text-zinc-900 hover:text-zinc-950",
                      ].join(" ")}
                    >
                      <span className="pr-2 text-[15px] font-semibold leading-6 sm:text-base">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={[
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                          isOpen
                            ? "border-[hsl(34_26%_52%_/_0.34)] bg-[hsl(40_40%_92%)] text-[hsl(31_50%_32%)]"
                            : "border-[hsl(34_26%_52%_/_0.2)] bg-white/75 text-zinc-600",
                        ].join(" ")}
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className={`h-[18px] w-[18px] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m5.5 7.5 4.5 5 4.5-5" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[hsl(34_26%_52%_/_0.18)] px-5 pb-5 pt-4 sm:px-6">
                        <p className="max-w-[62ch] text-sm leading-7 text-zinc-700 sm:text-[15px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
