import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

const badges = [
  {
    src: "/badges/minute-maids-first-clean-badge-starburst.svg",
    alt: "20% off first clean",
    width: 136,
    mobileWidthClassName: "w-[88px] sm:w-[100px]",
    desktopWidthClassName: "lg:w-[122px] xl:w-[134px]",
  },
  {
    src: "/badges/minute-maids-senior-discount-badge-starburst.svg",
    alt: "Senior discount 10 percent off every time",
    width: 138,
    mobileWidthClassName: "w-[90px] sm:w-[102px]",
    desktopWidthClassName: "lg:w-[124px] xl:w-[136px]",
  },
];

function PromoBadge({
  src,
  alt,
  width,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={width}
      loading="eager"
      decoding="async"
      className={`h-auto ${className}`}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden surface-purple texture-overlay hero-glow"
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative min-h-[148px] xl:min-h-[164px]">
              <div className="absolute left-6 top-2 xl:left-4 xl:top-0">
                <PromoBadge
                  {...badges[0]}
                  className={badges[0].desktopWidthClassName}
                />
              </div>
              <div className="absolute right-5 -top-0.5 xl:right-3 xl:-top-0.5">
                <PromoBadge
                  {...badges[1]}
                  className={badges[1].desktopWidthClassName}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-2xl text-center lg:pt-16 xl:pt-20">
            {/* Trust pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm border-purple-soft sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              Licensed & Insured • Owner-Operated
            </div>

            <div
              className="mt-5 flex items-end justify-center gap-4 sm:gap-5 lg:hidden"
              aria-label="Current promotions"
            >
              <PromoBadge
                {...badges[0]}
                className={badges[0].mobileWidthClassName}
              />
              <PromoBadge
                {...badges[1]}
                className={badges[1].mobileWidthClassName}
              />
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
        </div>
      </Container>
    </section>
  );
}
