import { links } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function FanSection() {
  return (
    <section className="border-t border-border bg-surface px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <SectionHeading
          label="For Fans"
          headline="Need ticket help?"
          className="mb-5"
        />
        <p className="max-w-[540px] text-[1.05rem] leading-relaxed text-fg-muted">
          Locate your tickets, join a waitlist, or request a refund. You&apos;re in
          the right place.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={links.tickets} variant="dark">
            Find My Tickets →
          </Button>
          <Button href={links.waitlist} variant="outline-dark">
            Join a Waitlist
          </Button>
          <Button href={links.refund} variant="outline-dark">
            Request a Refund
          </Button>
        </div>
      </Container>
    </section>
  )
}
