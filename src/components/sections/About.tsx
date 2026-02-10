import Image from "next/image";
import Section from "@/components/ui/Section";
import { site } from "@/lib/site";

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Owner-operated, done right"
      className="bg-zinc-50"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* Copy */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-zinc-900">
            Hi, I’m {site.ownerName}.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-zinc-700">
            I started {site.businessName} to make home cleaning feel simple,
            reliable, and genuinely worth it. I’m meticulous by nature — the
            goal is always the same: a home that feels calm, reset, and easy to
            live in.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-zinc-700">
            I’m <span className="font-semibold">licensed & insured</span>, and
            I treat every home with care and respect. Whether you need a
            standard clean, a deep clean, or help with add-ons like ovens,
            fridges, or organization — I’ll talk through what you want and
            deliver a clear plan.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">
                Licensed & insured
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                Professional service you can trust.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">
                Owner-operated
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                You book with Lacee — Lacee cleans.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">
                Detailed checklists
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                Consistent, thorough results.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">
                Flexible add-ons
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                Fridge, oven, organization, and more.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href="#contact"
              className="min-h-[44px] rounded-2xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Request a quote
            </a>
            <a
              href="#estimate"
              className="min-h-[44px] rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Get an estimate
            </a>
          </div>
        </div>

        {/* Photo / brand image */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl">
              <Image
                src="/images/minute-maids-logo-transparent.png"
                alt="Minute Maids logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {site.businessName}
              </p>
              <p className="text-xs text-zinc-600">{site.serviceArea}</p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
              <Image
                src="/images/Lacee-Richter-Head-Shot.jpg"
                alt="Lacee Richter, owner of Minute Maids"
                fill
                className="object-cover object-[50%_38%]"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-zinc-700">
            Serving <span className="font-semibold">{site.serviceArea}</span>.{" "}
            For fastest scheduling, text or call{" "}
            <span className="font-semibold">{site.phoneDisplay}</span>.
          </p>
        </div>
      </div>
    </Section>
  );
}
