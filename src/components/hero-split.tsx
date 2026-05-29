import { links } from "../content/site-content"
import { Button } from "./ui/button"

export function HeroSplit() {
  return (
    <div className="relative flex min-h-[620px] h-screen flex-col overflow-hidden min-[901px]:flex-row">
      <div className="relative flex-1 bg-bg min-[901px]:flex-none min-[901px]:h-auto min-[901px]:basis-1/2 max-[900px]:h-[50vh]">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none px-10 text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[0.88] tracking-tight text-fg/[0.06]">
          YOUR
          <br />
          TICKETS
        </div>
        <div className="absolute bottom-10 left-10 text-[10px] uppercase tracking-[0.2em] text-fg/[0.1]">
          [ Fan crowd — photo ]
        </div>
      </div>

      <div className="relative flex-1 bg-bg min-[901px]:flex-none min-[901px]:h-auto min-[901px]:basis-1/2 max-[900px]:h-[50vh]">
        <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 select-none text-right text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[0.88] tracking-tight text-fg/[0.06]">
          YOUR
          <br />
          PLATFORM
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] uppercase tracking-[0.2em] text-fg/[0.1]">
          [ Side-of-stage — photo ]
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-bg/60 via-transparent to-bg/40" />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-bg/94 to-transparent max-[900px]:block min-[901px]:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-transparent via-bg/92 to-transparent min-[901px]:block"
        aria-hidden
      />

      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-7 px-8 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
          KYD Labs
        </p>
        <h1 className="max-w-[680px] text-[clamp(2rem,4vw,3.75rem)] font-black uppercase leading-[1.02] tracking-tight">
          For fans, it&apos;s simple.
          <br />
          <span className="text-accent">For artists, it&apos;s powerful.</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button href={links.tickets}>Find My Tickets →</Button>
          <Button href={links.useKyd} variant="outline">
            Use KYD
          </Button>
        </div>
      </div>
    </div>
  )
}
