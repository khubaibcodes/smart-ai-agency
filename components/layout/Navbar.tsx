"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/ui/brand-logo";
import { NAV_LINKS } from "@/lib/constants";
import { resolveActiveNavLink } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const activeSection = useScrollSpy(pathname === "/");

  useBodyScrollLock(open);

  const navLinkClass = (href: string) => {
    const isActive = resolveActiveNavLink(href, pathname, activeSection);
    return cn(
      "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
      isActive ? "text-brand-primary" : "text-brand-muted hover:text-[var(--brand-text)]",
    );
  };

  const mobileLinkClass = (href: string) => {
    const isActive = resolveActiveNavLink(href, pathname, activeSection);
    return cn(
      "w-full max-w-sm rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors",
      isActive
        ? "border border-brand-primary/25 bg-brand-primary/10 text-brand-primary"
        : "text-brand-muted hover:bg-secondary hover:text-[var(--brand-text)]",
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-brand-bg/95 backdrop-blur-xl shadow-sm"
          : "bg-brand-bg/80 backdrop-blur-md",
      )}
    >
      <div className="container-site grid h-[var(--navbar-h)] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="min-w-0 justify-self-start">
          <BrandLogo size="sm" />
        </div>

        <nav className="hidden items-center justify-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = resolveActiveNavLink(link.href, pathname, activeSection);
            return (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg border border-brand-primary/20 bg-brand-primary/10"
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-self-end md:flex">
          <Button asChild size="sm" className="min-w-[8.5rem]">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-brand-bg/98 backdrop-blur-xl md:hidden">
          <nav className="container-site flex flex-col items-center gap-1 py-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileLinkClass(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full max-w-sm">
              <Link href="/contact">Get Started</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
