"use client";

import { useEffect } from "react";

const VALID_TARGETS = new Set(["achievements", "projects"]);

export default function AchievementsHashScroll() {
  useEffect(() => {
    let frameOne = 0;
    let frameTwo = 0;
    let timer = 0;

    const scrollToHashTarget = () => {
      const targetId = window.location.hash.slice(1);
      if (!VALID_TARGETS.has(targetId)) return;

      document.getElementById(targetId)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    };

    const scheduleScroll = () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);

      frameOne = window.requestAnimationFrame(() => {
        frameTwo = window.requestAnimationFrame(scrollToHashTarget);
      });
      timer = window.setTimeout(scrollToHashTarget, 180);
    };

    scheduleScroll();
    window.addEventListener("hashchange", scheduleScroll);
    window.addEventListener("load", scheduleScroll, { once: true });

    return () => {
      window.removeEventListener("hashchange", scheduleScroll);
      window.removeEventListener("load", scheduleScroll);
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, []);

  return null;
}
