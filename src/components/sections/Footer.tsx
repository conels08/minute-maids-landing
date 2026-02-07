import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <section
      id="footer"
      className="border-t border-zinc-200 bg-white py-10 pb-24 md:pb-10"
    >
      <Container className="grid gap-6 text-sm text-zinc-700 sm:grid-cols-2">
        <div>
          <p className="text-base font-semibold text-zinc-900">
            {site.businessName}
          </p>
          <p className="mt-1">{site.serviceArea}</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">
            Licensed & insured
          </p>
        </div>

        <div className="sm:text-right">
          <div className="space-y-2">
            <a
              href={`tel:${site.phoneTel}`}
              className="block font-medium text-zinc-900 hover:text-zinc-700"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block font-medium text-zinc-900 hover:text-zinc-700"
            >
              {site.email}
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            © {new Date().getFullYear()} {site.businessName}. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-zinc-500">Site by Colby Nelsen</p>
        </div>
      </Container>
    </section>
  );
}
