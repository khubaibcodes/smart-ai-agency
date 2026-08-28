import Link from "next/link";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/social-icons";
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
          <div className="mt-5 flex justify-center gap-2.5 sm:justify-start">
            <a
              href={AGENCY.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={AGENCY.linkedin.label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={AGENCY.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={AGENCY.instagram.label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={AGENCY.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={AGENCY.github.label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
            >
              <GitHubIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Services</h4>
          <ul className="text-sm text-muted-foreground">
            {FOOTER_SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-brand-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h4>
          <ul className="text-sm text-muted-foreground">
            {FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-brand-primary"
                >
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
