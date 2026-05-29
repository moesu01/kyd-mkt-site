import { pressCoverage } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function PressSection() {
  return (
    <section className="border-t border-border bg-surface px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <SectionHeading
          label="Press"
          headline={
            <>
              As seen in the <span className="text-accent">press.</span>
            </>
          }
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-6 min-[901px]:grid-cols-2">
          {pressCoverage.map((item) => (
            <article
              key={item.outlet}
              className={`group flex flex-col gap-4 rounded border p-8 transition-colors ${
                item.placeholder
                  ? "border-dashed border-border-strong"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p
                  className={`font-mono text-sm font-medium uppercase tracking-wider ${
                    item.placeholder ? "text-fg-faint" : "text-accent"
                  }`}
                >
                  {item.outlet}
                </p>
                <time
                  className={`shrink-0 font-mono text-xs uppercase tracking-wider ${
                    item.placeholder ? "text-fg-faint" : "text-fg-ghost"
                  }`}
                  dateTime={item.placeholder ? undefined : item.date}
                >
                  {item.date}
                </time>
              </div>

              <h3
                className={`text-lg font-semibold leading-snug ${
                  item.placeholder ? "italic text-fg-faint" : "text-fg"
                }`}
              >
                {item.headline}
              </h3>

              <a
                href={item.href}
                className={`mt-auto inline-flex min-h-10 items-center text-sm font-medium transition-colors ${
                  item.placeholder
                    ? "pointer-events-none text-fg-faint"
                    : "text-fg-muted hover:text-fg"
                }`}
                aria-label={
                  item.placeholder
                    ? `${item.outlet} article coming soon`
                    : `Read ${item.outlet} article`
                }
                tabIndex={item.placeholder ? -1 : undefined}
              >
                {item.placeholder ? "Article coming soon" : "Read article →"}
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
