import Section from "@/components/ui/Section";

const faqs = [
  {
    q: "How long does a typical clean take?",
    a: "Most standard cleans take 2–4 hours depending on home size, condition, and add-ons. Deep cleans typically take longer.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Many clients provide a door code or key. If you prefer to be home for the first visit, that’s perfectly fine.",
  },
  {
    q: "What should I do before you arrive?",
    a: "A quick tidy is helpful—clearing counters and floors allows for the most thorough clean possible.",
  },
  {
    q: "What areas do you service?",
    a: "We serve Yamhill County and surrounding areas. If you’re nearby, send a message and we’ll confirm availability.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Quick answers" className="bg-transparent">
      <div className="grid gap-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm border-purple-soft ring-purple"
          >
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-900">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="text-xs text-zinc-500 transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <p className="mt-3 text-sm text-zinc-700">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
