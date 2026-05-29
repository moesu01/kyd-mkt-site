import { features } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function FeaturesSection() {
  return (
    <section className="border-t border-border px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <div className="mb-12">
          <SectionHeading
            label="Platform"
            headline={
              <>
                Modern ticketing infrastructure.
                <br />
                <span className="text-accent">Built for control.</span>
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border min-[901px]:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="bg-bg p-8 min-[901px]:px-8 min-[901px]:py-10">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-lg text-accent">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-[1.4rem] font-bold uppercase tracking-tight text-fg">
                {feature.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-fg-subtle">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
