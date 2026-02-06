import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
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
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
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
                If you want, we can paste your Google review link here later and we’ll
                add a “Read more on Google” button.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
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
      </Container>
    </Section>
  );
}
