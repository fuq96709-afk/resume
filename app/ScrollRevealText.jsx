"use client";

import ScrollReveal from "../components/ScrollReveal/ScrollReveal";

export default function ScrollRevealText({ children, className = "" }) {
  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={4}
      blurStrength={5}
      containerClassName={`site-scroll-reveal ${className}`.trim()}
      textClassName="site-scroll-reveal-text"
      rotationEnd="bottom bottom-=8%"
      wordAnimationEnd="bottom bottom-=8%"
    >
      {children}
    </ScrollReveal>
  );
}

