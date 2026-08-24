"use client";

import { useMemo, useState } from "react";
import "./achievements-portfolio.css";

type Category = "all" | "tk" | "temu" | "demo";

type PortfolioItem = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  label: string;
  mediaSrc: string;
};

const tabs: Array<{ value: Category; label: string }> = [
  { value: "all", label: "全部" },
  { value: "tk", label: "TK视频" },
  { value: "temu", label: "TEMU视频" },
  { value: "demo", label: "AI短片残缺部分" },
];

// Template skeleton only. Replace mediaSrc and copy when real work is ready.
const items: PortfolioItem[] = [
  { id: "tk-01", category: "tk", title: "TK VIDEO 01", label: "TK视频", mediaSrc: "" },
  { id: "tk-02", category: "tk", title: "TK VIDEO 02", label: "TK视频", mediaSrc: "" },
  { id: "temu-01", category: "temu", title: "TEMU VIDEO 01", label: "TEMU视频", mediaSrc: "" },
  { id: "temu-02", category: "temu", title: "TEMU VIDEO 02", label: "TEMU视频", mediaSrc: "" },
  { id: "demo-01", category: "demo", title: "AI FILM 01", label: "AI短片残缺部分", mediaSrc: "" },
  { id: "demo-02", category: "demo", title: "AI FILM 02", label: "AI短片残缺部分", mediaSrc: "" },
];

function InfiniteMenu({ items: visibleItems }: { items: PortfolioItem[] }) {
  return (
    <div
      className="achievement-infinite-menu"
      style={{ height: 420 }}
      data-item-count={visibleItems.length}
      aria-label="作品展示区域"
    />
  );
}

export default function AchievementsPortfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const filteredItems = useMemo(
    () => (activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory)),
    [activeCategory],
  );

  return (
    <div className="achievement-portfolio-content">
      <div className="achievement-filter-tabs" role="tablist" aria-label="作品分类">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === tab.value}
            className={activeCategory === tab.value ? "is-active" : ""}
            key={tab.value}
            onClick={() => setActiveCategory(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <InfiniteMenu items={filteredItems} />
    </div>
  );
}

