import Section from "@/components/ui/Section";

const serviceCards = [
  {
    title: "Standard Cleaning Services",
    description:
      "For clients looking for routine or recurring cleaning help.",
    checklistUrl: "/docs/STANDARD-CLEAN-CHECKLIST.pdf",
    checklistLabel: "View standard checklist",
    features: [
      "Sanitize countertops and sinks",
      "Wipe surfaces and shine glass",
      "Vacuum and mop floors",
    ],
  },
  {
    title: "Deep Home Cleaning",
    description:
      "For homes that need a more detailed top-to-bottom reset.",
    checklistUrl: "/docs/DEEP-CLEAN-CHECKLIST.pdf",
    checklistLabel: "View deep-clean checklist",
    features: [
      "Degrease kitchen surfaces and stovetop",
      "Scrub shower or tub and sanitize bathroom surfaces",
      "High dusting, vents, baseboards, and detail work",
    ],
  },
  {
    title: "Move-in / Move-out Cleaning",
    description:
      "For homes being prepared before move-in or after move-out.",
    checklistUrl: "/docs/Move In- Out Cleaning Checklist.pdf",
    checklistLabel: "View move-in / move-out checklist",
    features: [
      "Clean light fixtures and interior windows plus tracks",
      "Interior and whole perimeter stove and fridge",
      "Exterior and interior cabinet wash",
    ],
  },
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-zinc-800 sm:text-[15px]">
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(40_42%_84%)] text-[hsl(31_50%_32%)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 10.5 8.2 13.5 15 6.8" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Choose the right level of clean."
      className="bg-transparent"
    >
      <p className="max-w-3xl text-on-purple-muted">
        Every service is designed to be easy to scan, easy to compare, and easy
        to book. Choose the level of detail that fits your home, then request
        the option that feels right for your space.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {serviceCards.map((card) => (
          <article
            key={card.title}
            className="flex h-full flex-col rounded-[1.65rem] p-5 sm:p-6 card-gold-soft text-on-gold"
          >
            <div className="flex h-full flex-col">
              <div className="text-center">
                <h3 className="text-[1.45rem] font-semibold leading-[1.15] tracking-tight text-zinc-900 xl:text-[1.58rem]">
                  {card.title}
                </h3>
                <p className="mx-auto mt-2.5 max-w-[31ch] text-sm leading-6 text-zinc-700">
                  {card.description}
                </p>
              </div>

              <div className="mt-7">
                <p className="text-center text-[1rem] font-semibold text-zinc-900 sm:text-[1.05rem]">
                  Features Include:
                </p>
                <ul className="mt-4 space-y-3.5" role="list">
                  {card.features.map((feature) => (
                    <CheckItem key={feature}>{feature}</CheckItem>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-1 flex-col justify-end">
                {card.checklistUrl ? (
                  <a
                    href={card.checklistUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 inline-flex items-center justify-center gap-2 self-center rounded-full border border-[hsl(34_26%_52%_/_0.35)] bg-white/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[hsl(31_50%_32%)] transition-colors hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 3v9" />
                      <path d="m6.5 8.5 3.5 3.5 3.5-3.5" />
                      <path d="M4 15.5h12" />
                    </svg>
                    {card.checklistLabel}
                  </a>
                ) : null}
                <a
                  href="#contact"
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[1.35rem] bg-zinc-900 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Book now
                </a>
                <a
                  href="#pricing-guide"
                  className="mt-4 text-center text-sm font-medium text-zinc-700 underline decoration-[hsl(31_50%_38%_/_0.4)] underline-offset-4 transition-colors hover:text-zinc-900"
                >
                  Compare packages
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] p-5 sm:p-6 card-gold text-on-gold">
        <p className="max-w-3xl text-sm leading-6 text-zinc-800 sm:text-[15px]">
          Final pricing is confirmed after a quick walkthrough or a few photos.
          If you want help deciding between service levels, the estimator and
          service guide below make comparison straightforward.
        </p>
      </div>
    </Section>
  );
}
