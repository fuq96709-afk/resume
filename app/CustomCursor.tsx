"use client";

import { useEffect, useRef } from "react";

const CURSOR_OFFSET = 20;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!cursor || !finePointer.matches) return;

    const label = cursor.querySelector<HTMLElement>(".cursor-label");
    const icon = cursor.querySelector<HTMLElement>(".cursor-icon");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = -160;
    let targetY = -160;
    let currentX = targetX;
    let currentY = targetY;
    let activeTarget: HTMLElement | null = null;
    let frame = 0;

    const hide = () => {
      cursor.classList.remove("is-visible", "is-expanded");
      document.body.classList.remove("has-custom-cursor");
      activeTarget = null;
    };

    const showFor = (target: HTMLElement) => {
      activeTarget = target;
      if (label) label.textContent = target.dataset.cursor || "View";
      if (icon) icon.textContent = target.dataset.cursorIcon || "↗";
      cursor.dataset.variant = target.dataset.cursorVariant || "default";
      cursor.classList.toggle("is-expanded", target.dataset.cursorExpand === "true");
      cursor.classList.add("is-visible");
      document.body.classList.add("has-custom-cursor");
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX + CURSOR_OFFSET;
      targetY = event.clientY + CURSOR_OFFSET;
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-cursor]");
      if (target && target !== activeTarget) showFor(target);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!activeTarget) return;
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && activeTarget.contains(nextTarget)) return;
      hide();
    };

    const followPointer = () => {
      const response = reducedMotion ? 1 : 0.18;
      currentX += (targetX - currentX) * response;
      currentY += (targetY - currentY) * response;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(followPointer);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);
    frame = window.requestAnimationFrame(followPointer);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="cursor-label">View</span>
      <i className="cursor-icon">↗</i>
    </div>
  );
}
