"use client";

import { useState } from "react";

export default function HeroFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`hero-flip-card${isFlipped ? " is-flipped" : ""}`}
      onClick={() => setIsFlipped((current) => !current)}
      aria-label={isFlipped ? "返回卡片正面" : "翻转卡片查看创作方向"}
      aria-pressed={isFlipped}
    >
      <span className="hero-flip-inner">
        <span className="hero-card-face hero-card-front">
          <span className="media-glow" aria-hidden="true" />
          <span className="hero-card-kicker">AIGC</span>
          <strong>VIDEO</strong>
          <i className="play-mark" aria-hidden="true" />
          <span className="flip-hint">点击翻转</span>
        </span>

        <span className="hero-card-face hero-card-back">
          <span className="back-index">01</span>
          <span className="back-kicker">CREATIVE DIRECTION</span>
          <strong>让产品内容<br />更有观看感</strong>
          <span className="back-divider" aria-hidden="true" />
          <span className="back-copy">创意策划 · 脚本设计<br />AI 生成 · 剪映成片</span>
          <span className="flip-hint">再次点击返回</span>
        </span>
      </span>
    </button>
  );
}
