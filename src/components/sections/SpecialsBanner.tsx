import Container from "@/components/ui/Container";

export default function SpecialsBanner() {
  return (
    <section className="py-6">
      <Container>
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-800">
                Valentine’s Special
              </p>
              <p className="mt-1 text-base font-medium text-zinc-900">
                Book a deep clean and get a{" "}
                <span className="font-semibold">free oven cleaning</span> + a{" "}
                <span className="font-semibold">dozen roses</span>.
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                Limited time • While availability lasts
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Claim this special
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
