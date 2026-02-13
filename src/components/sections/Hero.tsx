import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden surface-purple texture-overlay hero-glow"
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm border-purple-soft sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Licensed & Insured • Owner-Operated
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-on-purple sm:text-4xl lg:text-5xl">
            A spotless home, without the stress.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-on-purple-muted sm:text-lg">
            Professional home cleaning in {site.serviceArea}. Standard & deep
            cleans, plus add-ons like fridge, oven, and organization.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#estimate"
              className="min-h-[44px] w-full rounded-2xl bg-zinc-900 px-6 py-3 text-base font-semibold text-white shadow hover:bg-zinc-800 sm:w-auto"
            >
              Get an instant estimate
            </a>
            <a
              href="#contact"
              className="min-h-[44px] w-full rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50 ring-purple sm:w-auto"
            >
              Request a quote
            </a>
          </div>

          {/* Feature chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Detailed checklists",
              "Respectful in your home",
              "Flexible add-ons",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm border-purple-soft ring-purple"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
