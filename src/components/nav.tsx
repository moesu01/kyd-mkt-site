import { links } from "../content/site-content"
import { Button } from "./ui/button"

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between bg-gradient-to-b from-bg/92 to-transparent px-6 py-7 min-[901px]:px-12">
      <a
        href="#"
        className="text-[1.75rem] font-black uppercase tracking-tight text-fg no-underline"
      >
        KYD.
      </a>
      <ul className="flex list-none items-center gap-6">
        <li>
          <Button
            href={links.tickets}
            variant="outline"
            className="!px-[22px] !py-[9px] !text-sm"
          >
            Find My Tickets
          </Button>
        </li>
        <li>
          <Button
            href={links.getInTouch}
            variant="primary"
            className="!px-[22px] !py-[9px] !text-sm"
          >
            Get in touch
          </Button>
        </li>
      </ul>
    </nav>
  )
}
