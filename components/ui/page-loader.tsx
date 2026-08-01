"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/ui/brand-logo";

function normalizePath(path: string) {
  const base = path.split("#")[0].split("?")[0];
  if (base === "/") return "/";
  return base.replace(/\/$/, "");
}

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const [fading, setFading] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const savedScrollY = useRef(0);
  const scrollLocked = useRef(false);
  const pathname = usePathname();

  const lockBodyScroll = () => {
    if (scrollLocked.current) return;

    savedScrollY.current = window.scrollY;
    const y = savedScrollY.current;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    scrollLocked.current = true;
  };

  const unlockBodyScroll = (scrollToTop = false) => {
    if (!scrollLocked.current) return;

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    scrollLocked.current = false;

    window.scrollTo(0, scrollToTop ? 0 : savedScrollY.current);
  };

  useEffect(() => {
    if (!loading || !targetPath) return;

    const targetPathWithoutHash = normalizePath(targetPath);
    const currentPathWithoutHash = normalizePath(pathname);
    const isAnchorNavigation = targetPath.includes("#");
    const closeDelay = isAnchorNavigation ? 200 : 400;

    if (currentPathWithoutHash !== targetPathWithoutHash) return;

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        unlockBodyScroll(true);
        setLoading(false);
        setFading(false);
        setTargetPath(null);
      }, 200);
    }, closeDelay);

    return () => clearTimeout(timer);
  }, [pathname, loading, targetPath]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const linkElement = target?.closest("a[href]");
      if (!linkElement) return;

      const href = linkElement.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        normalizePath(href) !== normalizePath(pathname)
      ) {
        lockBodyScroll();
        setLoading(true);
        setFading(false);
        setTargetPath(href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  useEffect(() => {
    return () => {
      unlockBodyScroll(false);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-brand-bg px-4 ${
        fading ? "page-loader-fade-out" : ""
      }`}
      style={{ touchAction: "none" }}
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,161,91,0.12),transparent_55%)] opacity-40" />

      <div className="relative flex max-w-full flex-col items-center gap-8 sm:gap-10">
        <div className="origin-center">
          <BrandLogo size="lg" asLink={false} />
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="page-loader-dot"
              style={{
                animationDelay: `${i * 0.12}s`,
                backgroundColor: i === 1 ? "var(--brand-primary)" : "var(--brand-primary-dark)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
