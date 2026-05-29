import { links, stats, venueAudiences } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function VenuesSection() {
  return (
    <section className="border-t border-border px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 min-[901px]:grid-cols-2 min-[901px]:gap-24">
          <div>
            <SectionHeading
              label="For Venues & Artists"
              headline={
                <>
                  Your tickets.
                  <br />
                  Your fans.
                  <br />
                  <span className="text-accent">Your money.</span>
                </>
              }
              className="mb-6"
            />
            <p className="mb-10 max-w-[540px] text-[1.05rem] leading-relaxed text-fg-muted">
              A next-gen, whitelabel ticketing and marketing platform for
              independent artists, touring acts, and venues. Own your ticketing.
              Keep your fan data. Automate your marketing. Deliver 10x results
              &mdash; and never rent your audience again.
            </p>
            <Button href={links.getInTouch}>Get in touch →</Button>
          </div>

          <div className="grid grid-cols-2 border border-border">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`border-border p-8 min-[901px]:px-8 min-[901px]:py-9 ${
                  index % 2 === 0 ? "border-r" : ""
                } ${index < 2 ? "border-b" : ""}`}
              >
                <div className="tabular-nums text-[3.75rem] font-black leading-none tracking-tight text-accent">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[13px] text-fg-subtle">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 min-[901px]:mt-24">
          <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-fg-subtle">
            Who it&apos;s for
          </p>
          <div className="grid grid-cols-1 gap-px border border-border bg-border min-[901px]:grid-cols-3">
            {venueAudiences.map((audience) => (
              <article key={audience.title} className="bg-bg p-8">
                <h3 className="mb-3 text-[1.4rem] font-bold uppercase tracking-tight text-fg">
                  {audience.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-fg-muted">
                  {audience.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
