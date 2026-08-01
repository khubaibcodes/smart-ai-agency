import type { HomeScrollSection } from "@/lib/constants/agency";

const ROUTE_TO_HOME_SECTION: Partial<Record<string, HomeScrollSection>> = {
  "/": "home",
  "/services": "services",
  "/pricing": "pricing",
  "/contact": "contact",
};

export function resolveActiveNavLink(
  href: string,
  pathname: string,
  activeSection: HomeScrollSection,
): boolean {
  if (pathname === "/") {
    const section = ROUTE_TO_HOME_SECTION[href];
    return section ? activeSection === section : false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
