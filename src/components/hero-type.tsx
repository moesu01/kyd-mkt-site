import { links } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"

export function HeroType() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-20 pt-32 min-[901px]:px-12 min-[901px]:pb-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 10% 90%, oklch(1 0 0 / 0.03) 0%, transparent 45%), radial-gradient(ellipse at 90% 10%, oklch(1 0 0 / 0.015) 0%, transparent 45%)",
        }}
        aria-hidden
      />
      <Container>
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
          KYD Labs
        </p>
        <h1 className="mb-10 text-[clamp(4rem,13vw,13rem)] font-black uppercase leading-[0.88] tracking-tight max-[900px]:text-[clamp(4rem,18vw,9rem)]">
          Live
          <br />
          events,
          <br />
          <span className="text-accent">reclaimed.</span>
        </h1>
        <p className="mb-10 max-w-[520px] text-[clamp(1rem,1.75vw,1.2rem)] leading-relaxed text-fg-muted">
          For fans who just want to get in. For artists who want to stay in
          control.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <Button href={links.tickets}>Find My Tickets →</Button>
          <Button href={links.useKyd} variant="outline">
            Use KYD
          </Button>
        </div>
      </Container>
    </section>
  )
}
