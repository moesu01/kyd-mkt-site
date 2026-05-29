import { links, stats } from "../content/site-content"
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
              You built the audience. KYD makes sure you keep it. A full-stack
              ticketing and marketing platform for independent artists, touring
              acts, and venues who are done letting middlemen own their data,
              their resale, and their revenue.
            </p>
            <Button href={links.bookCall}>Book a Call →</Button>
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
                <div className="mt-2 text-[13px] text-fg-subtle">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
