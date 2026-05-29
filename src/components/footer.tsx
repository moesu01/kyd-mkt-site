import { footerLinks } from "../content/site-content"
import { Container } from "./ui/container"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 min-[901px]:px-12">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-col flex-wrap items-start justify-between gap-4 min-[901px]:flex-row min-[901px]:items-center">
          <a
            href="#"
            className="text-xl font-black uppercase tracking-tight text-fg-ghost no-underline"
          >
            KYD Labs.
          </a>
          <ul className="flex list-none flex-wrap gap-7">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] text-fg-ghost transition-colors hover:text-fg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-fg-faint">
          © 2025 KYD Labs. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
