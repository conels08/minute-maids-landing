import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />

      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Licensed & Insured • Owner-Operated
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            A spotless home, without the stress.
          </h1>

          <p className="mt-5 text-lg text-zinc-700">
            Professional home cleaning in {site.serviceArea}. Standard & deep
            cleans, plus add-ons like fridge, oven, and organization.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#estimate"
              className="rounded-2xl bg-zinc-900 px-6 py-3 text-base font-semibold text-white shadow hover:bg-zinc-800"
            >
              Get an instant estimate
            </a>
            <a
              href="#contact"
              className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Request a quote
            </a>
          </div>

          {/* Feature chips */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              "Background-checked",
              "Detailed checklists",
              "Respectful in your home",
              "Flexible add-ons",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm"
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
