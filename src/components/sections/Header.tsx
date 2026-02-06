import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Estimate", href: "#estimate" },
  { label: "Results", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const telHref = `tel:${site.phoneTel}`;
  const smsHref = `sms:${site.phoneTel}`;
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            {/* Swap this to your logo later */}
            <div className="h-9 w-9 rounded-xl bg-zinc-900" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-zinc-900">
                {site.businessName}
              </p>
              <p className="text-xs text-zinc-600">{site.serviceArea}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#estimate"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Get Estimate
            </a>
          </nav>

          <a
            href="#estimate"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 md:hidden"
          >
            Estimate
          </a>
        </Container>
      </header>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-3 py-2">
          <a
            href={telHref}
            className="flex items-center justify-center rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white"
          >
            Call
          </a>
          <a
            href={smsHref}
            className="flex items-center justify-center rounded-xl border border-zinc-300 py-3 text-sm font-semibold text-zinc-900"
          >
            Text
          </a>
          <a
            href="#estimate"
            className="flex items-center justify-center rounded-xl border border-zinc-300 py-3 text-sm font-semibold text-zinc-900"
          >
            Quote
          </a>
        </div>
      </div>

      {/* Spacer so content isn’t hidden behind the mobile CTA bar */}
      <div className="h-14 md:hidden" />
    </>
  );
}
