import Link from "next/link";
import BrandLogo from "@/components/ui/brand-logo";
import ContactDetails from "@/components/common/ContactDetails";
import { AGENCY, FOOTER_COMPANY_LINKS, FOOTER_SERVICE_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-brand-bg-2">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center sm:text-left">
        <div className="flex justify-center sm:justify-start">
          <BrandLogo size="sm" />
        </div>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mx-0">
            Intelligent AI solutions for forward-thinking international businesses.
          </p>
          <div className="mt-5 flex justify-center sm:justify-start">
            <a
              href={AGENCY.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={AGENCY.linkedin.label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0M3.33 8.94h3.22V21H3.33zM9.5 8.94h3.09v1.65h.04c.43-.82 1.48-1.68 3.05-1.68 3.26 0 3.86 2.15 3.86 4.94V21h-3.22v-6.06c0-1.44-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.19V21H9.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Services</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {FOOTER_SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ContactDetails variant="list" />
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {AGENCY.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
