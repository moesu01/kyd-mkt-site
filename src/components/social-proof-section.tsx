import { roster, testimonials } from "../content/site-content"
import { Container } from "./ui/container"

export function SocialProofSection() {
  return (
    <section className="border-t border-border px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-fg-subtle">
          Used by artists and venues across the country
        </p>

        <div className="-ml-px -mt-px mb-20 flex flex-wrap">
          {roster.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className={`border border-border px-6 py-3.5 text-[clamp(1.1rem,2vw,1.55rem)] font-black uppercase leading-none tracking-tight ${
                item.type === "artist" ? "text-accent" : "text-fg-muted"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>

        <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-fg-subtle">
          What people are saying
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 min-[901px]:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.attribution}
              className={`flex flex-col gap-4 rounded border p-8 ${
                testimonial.placeholder
                  ? "border-dashed border-border-strong"
                  : "border-border"
              }`}
            >
              <p
                className={`flex-1 text-base leading-relaxed ${
                  testimonial.placeholder
                    ? "italic text-fg-faint"
                    : "text-fg-muted"
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p
                className={`text-[13px] font-medium ${
                  testimonial.placeholder ? "text-fg-faint" : "text-accent"
                }`}
              >
                {testimonial.attribution}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
