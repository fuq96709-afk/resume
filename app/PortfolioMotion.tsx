"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PREMIUM_EASE = "power4.out";
const MOTION_TARGET_SELECTOR = "[data-motion-heading], [data-motion-card], [data-motion-image]";

function clearMotionStyles(root: ParentNode = document) {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(MOTION_TARGET_SELECTOR));
  if (targets.length === 0) return;

  gsap.set(targets, {
    clearProps: "opacity,visibility,clipPath,transform,transformOrigin",
  });
}

function revealGroup(group: HTMLElement) {
  const heading = Array.from(group.querySelectorAll<HTMLElement>("[data-motion-heading]"))
    .find((item) => item.closest("[data-motion-group]") === group);
  const cards = Array.from(group.querySelectorAll<HTMLElement>("[data-motion-card]"))
    .filter((item) => item.closest("[data-motion-group]") === group);
  const trigger = heading ?? cards[0] ?? group;
  const isAchievementsGroup = Boolean(group.closest(".achievements-page"));

  if (!heading && cards.length === 0) return;

  const timeline = gsap.timeline({
    defaults: { force3D: true },
    scrollTrigger: {
      trigger,
      start: "top 84%",
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    },
  });

  if (heading) {
    gsap.set(
      heading,
      isAchievementsGroup
        ? { clipPath: "inset(0 100% 0 0)", xPercent: -16, scaleX: 0.88, transformOrigin: "0% 50%" }
        : { clipPath: "inset(0 0 100% 0)", yPercent: 72, scaleY: 0.76, transformOrigin: "50% 100%" },
    );

    timeline.to(heading, {
        clipPath: "inset(0 0 0% 0)",
        xPercent: 0,
        yPercent: 0,
        scaleX: 1,
        scaleY: 1,
        immediateRender: false,
        duration: 1.18,
        ease: PREMIUM_EASE,
        clearProps: "clipPath,transform,transformOrigin",
      });
  }

  if (cards.length > 0) {
    const startAt = heading ? "-=0.52" : 0;

    cards.forEach((card, index) => {
      const clipOnly = card.hasAttribute("data-motion-clip-only");
      gsap.set(
        card,
        clipOnly
          ? { clipPath: "inset(7% 0 13% 0 round 18px)", scaleY: 0.96, transformOrigin: "50% 100%" }
          : { clipPath: "inset(7% 0 13% 0 round 18px)", y: 38, scaleY: 0.96, transformOrigin: "50% 100%" },
      );
      timeline.to(
        card,
        {
          clipPath: "inset(0% 0 0% 0 round 0px)",
          y: clipOnly ? undefined : 0,
          scaleY: 1,
          duration: 0.92,
          ease: PREMIUM_EASE,
          clearProps: "clipPath,transform,transformOrigin",
        },
        index === 0 ? startAt : "-=0.835",
      );
    });
  }
}

function revealImages() {
  const imageFrames = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-image]"));

  imageFrames.forEach((frame) => {
    gsap.set(frame, { clipPath: "inset(0 0 100% 0 round 24px)" });
    gsap.to(frame, {
        clipPath: "inset(0 0 0% 0 round 24px)",
        duration: 1.08,
        ease: PREMIUM_EASE,
        clearProps: "clipPath",
        scrollTrigger: {
          trigger: frame,
          start: "top 88%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });

    const image = frame.querySelector<HTMLElement>("img");
    if (!image) return;

    gsap.fromTo(
      image,
      { "--motion-parallax-y": "-2.5%" },
      {
        "--motion-parallax-y": "2.5%",
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.35,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

export default function PortfolioMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const refreshTimers: Array<ReturnType<typeof setTimeout>> = [];
    let refreshFrame: number | undefined;
    let disposed = false;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      document.documentElement.classList.add("gsap-motion-active");
      clearMotionStyles();

      const context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-motion-group]").forEach(revealGroup);
        revealImages();
      }, document.body);

      const refresh = () => {
        if (disposed) return;
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      };

      const refreshAfterNavigation = () => {
        if (disposed) return;
        if (refreshFrame !== undefined) window.cancelAnimationFrame(refreshFrame);
        refreshFrame = window.requestAnimationFrame(refresh);
      };

      document.fonts?.ready.then(refreshAfterNavigation).catch(() => undefined);
      refreshTimers.push(setTimeout(refreshAfterNavigation, 360));

      return () => {
        disposed = true;
        refreshTimers.forEach(clearTimeout);
        if (refreshFrame !== undefined) window.cancelAnimationFrame(refreshFrame);
        context.revert();
        clearMotionStyles();
        document.documentElement.classList.remove("gsap-motion-active");
      };
    });

    return () => media.revert();
  }, [pathname]);

  return null;
}
