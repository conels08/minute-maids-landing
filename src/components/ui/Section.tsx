import Container from "./Container";

export default function Section({
  id,
  title,
  eyebrow,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-12 sm:py-16 lg:py-20 ${className}`}
    >
      <Container>
        {(eyebrow || title) && (
          <div className="mb-8">
            {eyebrow && (
              <p className="text-sm font-medium tracking-wide text-zinc-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
