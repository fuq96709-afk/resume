"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./achievements-portfolio.css";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "tk" | "temu" | "demo";

type PortfolioItem = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

type PortfolioOrientation = "portrait" | "landscape";

const tabs: Array<{ value: Category; label: string }> = [
  { value: "all", label: "全部" },
  { value: "tk", label: "TK视频" },
  { value: "temu", label: "TEMU视频" },
  { value: "demo", label: "AI短片残缺部分" },
];

const items: PortfolioItem[] = [
  { id: "tk-01", category: "tk", title: "TK 产品实拍风格", thumbnail: "/portfolio/tk/covers/tk-product-live.png", videoUrl: "/portfolio/tk/videos/tk-product-live.mp4" },
  { id: "tk-02", category: "tk", title: "TK 产品视频", thumbnail: "/portfolio/tk/covers/tk-product-video.png", videoUrl: "/portfolio/tk/videos/tk-product-video.mp4" },
  { id: "tk-03", category: "tk", title: "TK 产品展示效果", thumbnail: "/portfolio/tk/covers/tk-product-showcase.png", videoUrl: "/portfolio/tk/videos/tk-product-showcase.mp4" },
  { id: "tk-04", category: "tk", title: "TK 抽象剧情", thumbnail: "/portfolio/tk/covers/tk-abstract-story.png", videoUrl: "/portfolio/tk/videos/tk-abstract-story.mp4" },
  { id: "tk-05", category: "tk", title: "TK 抽象视频", thumbnail: "/portfolio/tk/covers/tk-abstract.png", videoUrl: "/portfolio/tk/videos/tk-abstract.mp4" },
  { id: "tk-06", category: "tk", title: "TK 第一人称", thumbnail: "/portfolio/tk/covers/tk-pov.png", videoUrl: "/portfolio/tk/videos/tk-pov.mp4" },
  { id: "tk-07", category: "tk", title: "TK 第一人称视角", thumbnail: "/portfolio/tk/covers/tk-pov-view.png", videoUrl: "/portfolio/tk/videos/tk-pov-view.mp4" },
  { id: "tk-08", category: "tk", title: "TK 搞笑视频", thumbnail: "/portfolio/tk/covers/tk-comedy.png", videoUrl: "/portfolio/tk/videos/tk-comedy.mp4" },
  { id: "tk-09", category: "tk", title: "TK 剧情产品视频", thumbnail: "/portfolio/tk/covers/tk-product-story.png", videoUrl: "/portfolio/tk/videos/tk-product-story.mp4" },
  { id: "tk-10", category: "tk", title: "TK 剧情风格", thumbnail: "/portfolio/tk/covers/tk-story-style.png", videoUrl: "/portfolio/tk/videos/tk-story-style.mp4" },
  { id: "tk-11", category: "tk", title: "TK 剧情风格视频", thumbnail: "/portfolio/tk/covers/tk-story-video.png", videoUrl: "/portfolio/tk/videos/tk-story-video.mp4" },
  { id: "tk-12", category: "tk", title: "TK 真实第一视角", thumbnail: "/portfolio/tk/covers/tk-real-pov.png", videoUrl: "/portfolio/tk/videos/tk-real-pov.mp4" },
  { id: "tk-13", category: "tk", title: "TK UGC 风格", thumbnail: "/portfolio/tk/covers/tk-ugc.png", videoUrl: "/portfolio/tk/videos/tk-ugc.mp4" },
  { id: "tk-14", category: "tk", title: "TK Vlog 风格视频", thumbnail: "/portfolio/tk/covers/tk-vlog.png", videoUrl: "/portfolio/tk/videos/tk-vlog.mp4" },
  { id: "tk-15", category: "tk", title: "TK AI 产品替换", thumbnail: "/portfolio/tk/covers/tk-ai-product-replacement.png", videoUrl: "/portfolio/tk/videos/tk-ai-product-replacement.mp4" },
  { id: "temu-01", category: "temu", title: "TEMU 产品视频 01", thumbnail: "/portfolio/temu/covers/temu-product-01.png", videoUrl: "/portfolio/temu/videos/temu-product-01.mp4" },
  { id: "temu-02", category: "temu", title: "TEMU 产品视频 02", thumbnail: "/portfolio/temu/covers/temu-product-02.png", videoUrl: "/portfolio/temu/videos/temu-product-02.mp4" },
  { id: "temu-03", category: "temu", title: "TEMU 产品视频 03", thumbnail: "/portfolio/temu/covers/temu-product-03.png", videoUrl: "/portfolio/temu/videos/temu-product-03.mp4" },
  { id: "temu-04", category: "temu", title: "TEMU 产品视频 04", thumbnail: "/portfolio/temu/covers/temu-product-04.png", videoUrl: "/portfolio/temu/videos/temu-product-04.mp4" },
  { id: "temu-05", category: "temu", title: "TEMU 产品视频 05", thumbnail: "/portfolio/temu/covers/temu-product-05.png", videoUrl: "/portfolio/temu/videos/temu-product-05.mp4" },
  { id: "temu-06", category: "temu", title: "TEMU 产品视频 06", thumbnail: "/portfolio/temu/covers/temu-product-06.png", videoUrl: "/portfolio/temu/videos/temu-product-06.mp4" },
  { id: "temu-07", category: "temu", title: "TEMU 产品视频 07", thumbnail: "/portfolio/temu/covers/temu-product-07.png", videoUrl: "/portfolio/temu/videos/temu-product-07.mp4" },
  { id: "demo-01", category: "demo", title: "AI 电影风格", thumbnail: "/portfolio/demo/covers/ai-film-style.png", videoUrl: "/portfolio/demo/videos/ai-film-style.mp4" },
  { id: "demo-02", category: "demo", title: "AI 剧情恐怖短片", thumbnail: "/portfolio/demo/covers/ai-horror-story.png", videoUrl: "/portfolio/demo/videos/ai-horror-story.mp4" },
];

function categoryLabel(category: PortfolioItem["category"]) {
  if (category === "tk") return "TK视频";
  if (category === "temu") return "TEMU视频";
  return "AI短片残缺部分";
}

function itemOrientation(item: PortfolioItem): PortfolioOrientation {
  return item.category === "temu" ? "landscape" : "portrait";
}

function PortfolioGrid({ visibleItems, orientation, onOpen }: { visibleItems: PortfolioItem[]; orientation: PortfolioOrientation; onOpen: (item: PortfolioItem) => void }) {
  return (
    <div className={`achievement-card-grid is-${orientation}`} aria-live="polite">
      {visibleItems.map((item, index) => (
        <button className="achievement-card" type="button" key={item.id} onClick={() => onOpen(item)} aria-label={`播放 ${item.title}`}>
          <span className={`achievement-card-cover is-${orientation} ${item.thumbnail ? "has-image" : "is-placeholder"}`}>
            {item.thumbnail ? <img src={item.thumbnail} alt="" loading="lazy" /> : <span className="achievement-placeholder-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
            <span className="achievement-play-mark" aria-hidden="true">▶</span>
          </span>
          <span className="achievement-card-copy">
            <strong>{item.title}</strong>
          </span>
        </button>
      ))}
    </div>
  );
}

function PortfolioGroup({ title, items: groupItems, orientation, onOpen, showHeading }: { title: string; items: PortfolioItem[]; orientation: PortfolioOrientation; onOpen: (item: PortfolioItem) => void; showHeading: boolean }) {
  if (groupItems.length === 0) return null;

  return (
    <section className={`achievement-format-group is-${orientation}`} aria-label={title}>
      {showHeading && (
        <header className="achievement-format-heading">
          <span>{orientation === "portrait" ? "PORTRAIT" : "LANDSCAPE"}</span>
        </header>
      )}
      <PortfolioGrid visibleItems={groupItems} orientation={orientation} onOpen={onOpen} />
    </section>
  );
}

export default function AchievementsPortfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const initialRender = useRef(true);
  const filteredItems = useMemo(() => (activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory)), [activeCategory]);
  const portraitItems = useMemo(() => filteredItems.filter((item) => itemOrientation(item) === "portrait"), [filteredItems]);
  const landscapeItems = useMemo(() => filteredItems.filter((item) => itemOrientation(item) === "landscape"), [filteredItems]);

  useLayoutEffect(() => {
    const root = portfolioRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".achievement-card"));
    const context = gsap.context(() => {
      gsap.set(cards, { clipPath: "inset(6% 0 12% 0 round 18px)", y: 24, scaleY: 0.96, transformOrigin: "50% 100%" });
      const animateCards = () => gsap.to(cards, {
        clipPath: "inset(0% 0 0% 0 round 0px)",
        y: 0,
        scaleY: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
        clearProps: "clipPath,transform,transformOrigin",
      });

      if (initialRender.current) {
        initialRender.current = false;
        ScrollTrigger.create({
          trigger: root,
          start: "top 86%",
          once: true,
          onEnter: animateCards,
        });
      } else {
        animateCards();
      }
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [activeCategory]);

  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <div className="achievement-portfolio-content" ref={portfolioRef}>
      <div className="achievement-filter-tabs" role="tablist" aria-label="作品分类" data-motion-group>
        {tabs.map((tab) => (
          <button type="button" role="tab" aria-selected={activeCategory === tab.value} className={activeCategory === tab.value ? "is-active" : ""} key={tab.value} onClick={() => setActiveCategory(tab.value)} data-motion-card>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="achievement-portfolio-groups">
        <PortfolioGroup title="竖屏作品" items={portraitItems} orientation="portrait" onOpen={setActiveItem} showHeading={activeCategory === "all"} />
        <PortfolioGroup title="横屏作品" items={landscapeItems} orientation="landscape" onOpen={setActiveItem} showHeading={activeCategory === "all"} />
      </div>

      {activeItem && (
        <div className="achievement-modal-backdrop" role="presentation" onMouseDown={() => setActiveItem(null)}>
          <div className="achievement-modal" role="dialog" aria-modal="true" aria-labelledby="achievement-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="achievement-modal-head">
              <div>
                <span>{categoryLabel(activeItem.category)}</span>
                <h3 id="achievement-modal-title">{activeItem.title}</h3>
              </div>
              <button type="button" onClick={() => setActiveItem(null)} aria-label="关闭视频">×</button>
            </div>
            {activeItem.videoUrl ? (
              <video className="achievement-modal-video" src={activeItem.videoUrl} poster={activeItem.thumbnail || undefined} controls autoPlay playsInline />
            ) : (
              <div className="achievement-modal-empty">视频素材待加入</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
