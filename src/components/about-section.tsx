import { backers } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function AboutSection() {
  return (
    <section className="border-t border-border px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 min-[901px]:grid-cols-2 min-[901px]:gap-24">
          <SectionHeading
            label="About KYD"
            headline={
              <>
                Built for the people who actually{" "}
                <span className="text-accent">create value.</span>
              </>
            }
          />

          <div>
            <p className="mb-8 text-[1.05rem] leading-relaxed text-fg-muted">
              Live events are the beating heart of culture. For too long, venues
              and artists have been cut off from the fans and revenue they
              generate. KYD is the infrastructure to change that.
            </p>
            <p className="mb-12 text-[clamp(1.5rem,2.5vw,2rem)] font-black uppercase leading-[1.05] tracking-tight">
              Control your data.
              <br />
              Keep your fans.
              <br />
              <span className="text-accent">Maximize your profit.</span>
            </p>
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-fg-subtle">
              Backed by
            </p>
            <div className="flex flex-wrap gap-3">
              {backers.map((backer) => (
                <div
                  key={backer}
                  className="rounded border border-border px-4 py-1.5 text-base font-bold uppercase tracking-wider text-fg-ghost"
                >
                  {backer}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
