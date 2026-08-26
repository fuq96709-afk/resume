"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import type { TweenVars } from "gsap";

const HEADING_SELECTOR = "[data-motion-heading]";
const TEXT_SELECTOR = "[data-motion-text]";
const VISUAL_SELECTOR = "[data-motion-image], [data-motion-clip-only]";

export default function SiteScrollMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let cancelled = false;
    let frame = 0;
    let cleanupMotion = () => {};

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      frame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const headings = gsap.utils.toArray<HTMLElement>(HEADING_SELECTOR);
        const textBlocks = gsap.utils.toArray<HTMLElement>(TEXT_SELECTOR);
        const visuals = gsap.utils.toArray<HTMLElement>(VISUAL_SELECTOR);
        const allTargets = [...headings, ...textBlocks, ...visuals];
        const animations: Array<{ kill: () => void }> = [];
        const triggers: Array<{ kill: () => void }> = [];

        const resetElement = (element: HTMLElement) => {
          element.style.removeProperty("will-change");
          element.style.removeProperty("clip-path");
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
          element.style.removeProperty("transform-origin");
          element.style.removeProperty("--motion-reveal-y");
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          allTargets.forEach(resetElement);
          return;
        }

        const revealOnEnter = (
          element: HTMLElement,
          from: TweenVars,
          to: TweenVars,
          start: string,
        ) => {
          const trigger = ScrollTrigger.create({
            trigger: element,
            start,
            once: true,
            onEnter: () => {
              const tween = gsap.fromTo(element, from, {
                ...to,
                immediateRender: false,
                onStart: () => {
                  element.style.willChange = "transform, clip-path, opacity";
                },
                onComplete: () => {
                  resetElement(element);
                },
              });
              animations.push(tween);
            },
          });
          triggers.push(trigger);
        };

        headings.forEach((heading) => {
          revealOnEnter(
            heading,
            {
              yPercent: 58,
              scaleY: 0.8,
              opacity: 0.2,
              clipPath: "inset(0 0 38% 0)",
              transformOrigin: "50% 100%",
            },
            {
              yPercent: 0,
              scaleY: 1,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.08,
              ease: "power4.out",
            },
            "top 86%",
          );
        });

        textBlocks.forEach((textBlock) => {
          revealOnEnter(
            textBlock,
            {
              y: 30,
              scaleY: 0.94,
              opacity: 0.28,
              clipPath: "inset(0 0 16% 0)",
              transformOrigin: "50% 100%",
            },
            {
              y: 0,
              scaleY: 1,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.96,
              ease: "power4.out",
            },
            "top 88%",
          );
        });

        visuals.forEach((visual) => {
          revealOnEnter(
            visual,
            {
              "--motion-reveal-y": "34px",
              opacity: 0.34,
              clipPath: "inset(0 0 16% 0 round 20px)",
            },
            {
              "--motion-reveal-y": "0px",
              opacity: 1,
              clipPath: "inset(0 0 0% 0 round 20px)",
              duration: 1.04,
              ease: "power4.out",
            },
            "top 88%",
          );
        });

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        document.fonts?.ready.then(() => {
          if (!cancelled) refresh();
        });
        refresh();

        cleanupMotion = () => {
          window.removeEventListener("load", refresh);
          triggers.forEach((trigger) => trigger.kill());
          animations.forEach((animation) => animation.kill());
          allTargets.forEach(resetElement);
        };
      });
    };

    setup();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      cleanupMotion();
    };
  }, [pathname]);

  return null;
}

