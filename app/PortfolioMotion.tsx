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
  const heading = group.querySelector<HTMLElement>("[data-motion-heading]");
  const cards = Array.from(group.querySelectorAll<HTMLElement>("[data-motion-card]"));
  const trigger = heading ?? cards[0] ?? group;

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
    timeline.fromTo(
      heading,
      {
        clipPath: "inset(0 0 100% 0)",
        yPercent: 72,
        scaleY: 0.76,
        transformOrigin: "50% 100%",
      },
      {
        clipPath: "inset(0 0 0% 0)",
        yPercent: 0,
        scaleY: 1,
        immediateRender: false,
        duration: 1.18,
        ease: PREMIUM_EASE,
        clearProps: "clipPath,transform,transformOrigin",
      },
    );
  }

  if (cards.length > 0) {
    const startAt = heading ? "-=0.52" : 0;

    cards.forEach((card, index) => {
      const clipOnly = card.hasAttribute("data-motion-clip-only");
      timeline.fromTo(
        card,
        clipOnly
          ? { autoAlpha: 0, clipPath: "inset(7% 0 13% 0 round 18px)" }
          : { autoAlpha: 0, clipPath: "inset(7% 0 13% 0 round 18px)", y: 44, scale: 0.975 },
        clipOnly
          ? {
              autoAlpha: 1,
              clipPath: "inset(0% 0 0% 0 round 0px)",
              immediateRender: false,
              duration: 0.92,
              ease: PREMIUM_EASE,
              clearProps: "opacity,visibility,clipPath",
            }
          : {
              autoAlpha: 1,
              clipPath: "inset(0% 0 0% 0 round 0px)",
              y: 0,
              scale: 1,
              immediateRender: false,
              duration: 0.92,
              ease: PREMIUM_EASE,
              clearProps: "opacity,visibility,clipPath,transform",
            },
        index === 0 ? startAt : "-=0.835",
      );
    });
  }
}

function revealImages() {
  const imageFrames = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-image]"));

  imageFrames.forEach((frame) => {
    gsap.fromTo(
      frame,
      { clipPath: "inset(0 0 100% 0 round 24px)" },
      {
        clipPath: "inset(0 0 0% 0 round 24px)",
        immediateRender: false,
        duration: 1.08,
        ease: PREMIUM_EASE,
        clearProps: "clipPath",
        scrollTrigger: {
          trigger: frame,
          start: "top 88%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      },
    );

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

function playHomeIntro() {
  const hero = document.querySelector<HTMLElement>("[data-motion-hero]");
  if (!hero) return;

  const title = hero.querySelector<HTMLElement>(".hero-copy h1");
  const subtitle = hero.querySelector<HTMLElement>(".hero-copy p");
  const portrait = hero.querySelector<HTMLElement>(".hero-profile-card");
  const meta = hero.querySelector<HTMLElement>(".hero-profile-meta");
  const cta = hero.querySelector<HTMLElement>(".hero-cta");

  const timeline = gsap.timeline({ defaults: { force3D: true } });

  if (title) {
    timeline.fromTo(
      title,
      {
        clipPath: "inset(0 0 100% 0)",
        yPercent: 70,
        scaleX: 1.045,
        scaleY: 0.7,
        transformOrigin: "50% 100%",
      },
      {
        clipPath: "inset(0 0 0% 0)",
        yPercent: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 1.34,
        ease: PREMIUM_EASE,
        clearProps: "clipPath,transform,transformOrigin",
      },
      0.12,
    );
  }

  if (subtitle) {
    timeline.fromTo(
      subtitle,
      { autoAlpha: 0, clipPath: "inset(0 100% 0 0)", x: -28 },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        x: 0,
        duration: 0.88,
        ease: PREMIUM_EASE,
        clearProps: "opacity,visibility,clipPath,transform",
      },
      "-=0.72",
    );
  }

  if (portrait) {
    timeline.fromTo(
      portrait,
      {
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0 round 58px)",
        y: 42,
        scale: 0.93,
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0 0% 0 round 58px)",
        y: 0,
        scale: 1,
        duration: 1.18,
        ease: PREMIUM_EASE,
        clearProps: "opacity,visibility,clipPath,transform",
      },
      "-=0.58",
    );
  }

  const supporting = [meta, cta].filter((item): item is HTMLElement => Boolean(item));
  if (supporting.length > 0) {
    timeline.fromTo(
      supporting,
      { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.84,
        ease: PREMIUM_EASE,
        stagger: 0.11,
        clearProps: "opacity,visibility,clipPath",
      },
      "-=0.56",
    );
  }
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
        playHomeIntro();
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
