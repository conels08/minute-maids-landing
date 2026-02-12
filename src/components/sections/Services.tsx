import Section from "@/components/ui/Section";
import {
  getBaseRange,
  pricingConfig,
  roundToNearestFive,
} from "@/lib/pricing";

const specials = [
  "Move out / Move in cleaning",
  "New baby sanitize package",
  "Carpet cleaning",
  "Washing walls",
  "Single-level gutter cleaning",
  "Exterior single-level windows",
];

export default function Services() {
  const standardExamples = pricingConfig.exampleSqft.map((sqft) => {
    const range = getBaseRange("standard", sqft);
    return {
      sqft,
      low: roundToNearestFive(range.low),
      high: roundToNearestFive(range.high),
    };
  });

  const deepExamples = pricingConfig.exampleSqft.map((sqft) => {
    const range = getBaseRange("deep", sqft);
    return {
      sqft,
      low: roundToNearestFive(range.low),
      high: roundToNearestFive(range.high),
    };
  });

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Simple options. Clear pricing."
      className="bg-transparent"
    >
      <p className="max-w-3xl text-on-purple-muted">
        Rates are based on square footage and service level. Pets + home
        condition affect where your final price lands within the range.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 sm:p-6 card-gold text-on-gold">
          <h3 className="text-lg font-semibold text-zinc-900">Standard Clean</h3>
          <p className="mt-1 text-sm font-semibold text-zinc-900">
            ${pricingConfig.rates.standard.low.toFixed(2)}-
            {pricingConfig.rates.standard.high.toFixed(2)} / sq ft
          </p>
          <p className="mt-3 text-sm text-zinc-700">
            Great for upkeep and recurring maintenance cleans.
          </p>

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 card-neutral">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Example ranges
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-800">
              {standardExamples.map((row) => (
                <li key={`std-${row.sqft}`}>
                  {row.sqft.toLocaleString()} sq ft: ${row.low.toLocaleString()}-
                  {row.high.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 sm:p-6 card-gold text-on-gold">
          <h3 className="text-lg font-semibold text-zinc-900">Deep Clean</h3>
          <p className="mt-1 text-sm font-semibold text-zinc-900">
            ${pricingConfig.rates.deep.low.toFixed(2)}-
            {pricingConfig.rates.deep.high.toFixed(2)} / sq ft
          </p>
          <p className="mt-3 text-sm text-zinc-700">
            Best for first-time resets, seasonal deep cleaning, or high-detail
            needs.
          </p>

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 card-neutral">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Example ranges
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-800">
              {deepExamples.map((row) => (
                <li key={`deep-${row.sqft}`}>
                  {row.sqft.toLocaleString()} sq ft: ${row.low.toLocaleString()}-
                  {row.high.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 sm:p-6 card-gold text-on-gold">
          <h3 className="text-lg font-semibold text-zinc-900">A la carte & specialty</h3>
          <p className="mt-1 text-sm font-semibold text-zinc-900">
            ${pricingConfig.hourlyRate} / hour (1 hour minimum)
          </p>
          <p className="mt-3 text-sm text-zinc-700">
            Add-ons are billed hourly (minimum 1 hour). Specialty services are
            priced as request-a-quote.
          </p>

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 card-neutral">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Specialty services (request a quote)
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-800">
              {specials.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-5 sm:p-6 card-gold-soft text-on-gold">
        <p className="text-sm text-zinc-700">
          Final pricing is confirmed after a quick walkthrough or a few photos.
          Estimates are designed to be transparent and realistic.
        </p>
      </div>
    </Section>
  );
}
