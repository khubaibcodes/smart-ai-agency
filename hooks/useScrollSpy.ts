"use client";

import { useEffect, useState } from "react";
import { HOME_SCROLL_SECTIONS, type HomeScrollSection } from "@/lib/constants/agency";

export function useScrollSpy(enabled: boolean) {
  const [activeSection, setActiveSection] = useState<HomeScrollSection>("home");

  useEffect(() => {
    if (!enabled) return;

    const observers: IntersectionObserver[] = [];

    HOME_SCROLL_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-42% 0px -48% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [enabled]);

  return activeSection;
}
