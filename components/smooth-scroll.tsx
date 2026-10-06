"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 769px) and (hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const update = () => {
      if (desktop.matches && !reducedMotion.matches) {
        if (lenis) return;
        document.documentElement.classList.add("has-smooth-scroll");
        lenis = new Lenis({
          autoRaf: true,
          duration: 1.05,
          smoothWheel: true,
          anchors: true,
          stopInertiaOnNavigate: true,
          allowNestedScroll: true,
        });
      } else {
        lenis?.destroy();
        lenis = null;
        document.documentElement.classList.remove("has-smooth-scroll");
      }
    };

    update();
    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      lenis?.destroy();
      document.documentElement.classList.remove("has-smooth-scroll");
    };
  }, []);

  return null;
}
