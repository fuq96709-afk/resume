"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  activeItem?: "home" | "works";
};

export default function SiteHeader({ activeItem }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const frame = useRef<number | null>(null);
  const smartHideEnabled = pathname !== "/works";

  useEffect(() => {
    setIsHidden(false);
    lastScrollY.current = window.scrollY;

    if (!smartHideEnabled) return;

    const updateFromScroll = () => {
      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY <= 72) {
          setIsHidden(false);
        } else if (delta > 5) {
          setIsHidden(true);
        }

        lastScrollY.current = currentY;
        frame.current = null;
      });
    };

    const revealAtTopEdge = (event: PointerEvent) => {
      if (event.clientY <= 10) setIsHidden(false);
    };

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("pointermove", revealAtTopEdge, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("pointermove", revealAtTopEdge);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [smartHideEnabled]);

  return (
    <header className={`site-header${smartHideEnabled ? " is-smart" : ""}${isHidden ? " is-hidden" : ""}`}>
      <nav className="nav" aria-label="主导航">
        <div className="nav-links">
          <Link className={activeItem === "home" ? "is-active" : undefined} href="/#home">首页</Link>
          <Link href="/#about">关于我</Link>
          <Link href="/#career">工作经历</Link>
          <div className="nav-work-menu">
            <Link className={`nav-work-trigger${activeItem === "works" ? " is-active" : ""}`} href="/#work">作品</Link>
            <div className="nav-work-dropdown" aria-label="作品子菜单">
              <Link href="/achievements#achievements">成就</Link>
              <Link href="/achievements#projects">更多作品</Link>
            </div>
          </div>
        </div>
        <div className="nav-actions" aria-label="快捷操作">
          <Link className="nav-action nav-action-contact" href="/#contact">联系</Link>
          <a className="nav-action nav-action-resume" href="/resume.pdf" target="_blank" rel="noreferrer">简历</a>
        </div>
      </nav>
    </header>
  );
}

