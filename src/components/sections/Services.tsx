import Section from "@/components/ui/Section";

type Tier = {
  name: string;
  priceLine: string;
  note: string;
  highlights: string[];
  details: { title: string; bullets: string[] }[];
};

const tiers: Tier[] = [
  {
    name: "Standard Clean",
    priceLine: "$0.15–$0.22 / sq ft",
    note: "Great for upkeep and maintaining a consistently clean home.",
    highlights: [
      "Kitchen + bathrooms refreshed",
      "Dusting, floors, and surfaces",
      "Perfect for recurring service",
    ],
    details: [
      {
        title: "Typical focus areas",
        bullets: [
          "Kitchen surfaces, sink, and exterior appliance wipe-down",
          "Bathrooms: sink, toilet, shower/tub surfaces",
          "Floors vacuumed + mopped where applicable",
          "Dusting + tidying main living areas",
        ],
      },
      {
        title: "Factors that affect price",
        bullets: ["Home condition", "Number of pets", "Requested add-ons"],
      },
    ],
  },
  {
    name: "Deep Clean",
    priceLine: "$0.25–$0.35 / sq ft",
    note: "Best for first-time clients, seasonal resets, or extra-detail homes.",
    highlights: [
      "More detailed, edge-to-edge cleaning",
      "Baseboards, buildup, and extra attention",
      "Ideal before/after events or move prep",
    ],
    details: [
      {
        title: "Typical focus areas",
        bullets: [
          "Deeper attention to buildup and high-touch areas",
          "More thorough kitchen + bathroom detail work",
          "Extra dusting and detail around corners/edges",
          "Floors: deeper vacuum/mop attention",
        ],
      },
      {
        title: "Factors that affect price",
        bullets: ["Home condition", "Number of pets", "Requested add-ons"],
      },
    ],
  },
  {
    name: "À la Carte / Add-Ons",
    priceLine: "$55 / hour",
    note: "You choose the time and the task. Perfect for targeted projects.",
    highlights: [
      "Fridge or oven interior",
      "Inside cabinets",
      "Organization reset",
      "Laundry/dishes (ground level)",
    ],
    details: [
      {
        title: "Popular add-ons",
        bullets: [
          "Interior fridge cleaning",
          "Interior oven cleaning",
          "Inside cabinets",
          "Organize a space / closet",
          "Laundry and dishes (ground level)",
        ],
      },
      {
        title: "Special services (request a quote)",
        bullets: [
          "Move out / Move in cleaning",
          "New baby sanitize package",
          "Carpet cleaning",
          "Washing walls",
          "Single-level gutter cleaning",
          "Exterior single-level windows",
        ],
      },
    ],
  },
];

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-2xl border border-zinc-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-semibold text-zinc-900">
        {title}
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-700 group-open:hidden">
          View
        </span>
        <span className="hidden rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-700 group-open:inline">
          Close
        </span>
      </summary>
      <div className="px-4 pb-4 text-sm text-zinc-700">{children}</div>
    </details>
  );
}

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Simple options. Meticulous results."
      className="bg-white"
    >
      <p className="max-w-2xl text-zinc-700">
        Choose the level that fits your home right now. If you’re not sure,
        start with a deep clean — then maintain with standard service.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-800">
                  {tier.priceLine}
                </p>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2 text-xs font-medium text-zinc-700 border border-zinc-200">
                Licensed & insured
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-700">{tier.note}</p>

            <ul className="mt-5 space-y-2 text-sm text-zinc-800">
              {tier.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              {tier.details.map((d) => (
                <Accordion key={d.title} title={d.title}>
                  <ul className="space-y-2">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-brand-700">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href="#estimate"
                className="rounded-2xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Get an estimate
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Ask a question
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-brand-200 bg-brand-50 p-6">
        <h4 className="text-base font-semibold text-zinc-900">
          Discounts available
        </h4>
        <p className="mt-2 text-sm text-zinc-700">
          20% off your first clean • 10% off every time • Senior discount
        </p>
      </div>
    </Section>
  );
}
