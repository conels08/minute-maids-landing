import Section from "@/components/ui/Section";
import { reviews } from "@/lib/reviews";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < count ? "text-amber-500" : "text-zinc-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <Section
      id="reviews"
      eyebrow="Reviews"
      title="Trusted locally"
      className="bg-white"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
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
              See more public feedback on Google while we finalize the direct
              profile link.
            </p>
            <a
              href="https://www.google.com/search?q=Minute+Maids+reviews"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Read more on Google
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
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
                “{r.text}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
