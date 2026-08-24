"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ScrollRevealText from "./ScrollRevealText";

const videos = [
  { src: "/works/tarot-jewelry.mp4", title: "塔罗珠宝品牌氛围", tag: "AI BRAND FILM" },
  { src: "/works/ugc-product.mp4", title: "UGC 产品展示", tag: "UGC STYLE" },
  { src: "/works/rust-removal.mp4", title: "除锈效果展示", tag: "PRODUCT DEMO" },
  { src: "/works/tiktok-case.mp4", title: "TikTok 短视频案例", tag: "TIKTOK VIDEO" },
];

const sopSteps = [
  {
    title: "市场洞察与数据分析",
    summary: "筛选近 7-14 天异常高播放的同类视频，判断爆点与 AI 可还原度。",
  },
  {
    title: "爆款拆解，提取可用逻辑",
    summary: "拆解前 3 秒钩子、产品逻辑和信任镜头，提取可以复用的内容结构。",
  },
  {
    title: "脚本、提示词与合规",
    summary: "聚焦一个核心卖点，写成 15 秒画面脚本，并确保表达与真实产品一致。",
  },
  {
    title: "AI 生成与视频品控",
    summary: "逐帧检查产品、人物和物理效果，排除变形、穿模与明显的 AI 假感。",
  },
  {
    title: "发布、风控与数据复盘",
    summary: "核对音乐、标题和商品链接，再根据播放、互动与转化决定淘汰或放大。",
  },
];

function carouselOffset(index: number, activeIndex: number) {
  let offset = (index - activeIndex + videos.length) % videos.length;
  if (offset > videos.length / 2) offset -= videos.length;
  return offset;
}

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstPlayRef = useRef(true);
  const reduceMotionRef = useRef(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    holdTimerRef.current = null;
    playTimerRef.current = null;
  }, []);

  const selectVideo = useCallback((index: number) => {
    clearTimers();
    setActiveVideo((index + videos.length) % videos.length);
  }, [clearTimers]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => video?.pause());
    if (!isVisible) return;

    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = firstPlayRef.current || reduceMotionRef.current ? 120 : 920;
    firstPlayRef.current = false;
    const current = videoRefs.current[activeVideo];
    if (!current) return;

    current.currentTime = 0;
    playTimerRef.current = setTimeout(() => {
      current.play().catch(() => undefined);
    }, delay);

    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [activeVideo, isVisible]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleEnded = (index: number) => {
    if (index !== activeVideo) return;
    if (reduceMotionRef.current) return;
    holdTimerRef.current = setTimeout(() => {
      setActiveVideo((current) => (current + 1) % videos.length);
    }, 1000);
  };

  return (
    <section className="work-sop" id="work" ref={sectionRef}>
      <div className="work-sop-shell">
        <div className="work-sop-copy">
          <header className="work-sop-heading">
            <h2>SELECTED<br />WORKS</h2>
            <p className="work-sop-label">TikTok AI 视频制作 SOP</p>
            <ScrollRevealText className="work-scroll-reveal">
              从产品分析、创意策划到 AI 生成与视频优化，建立完整的 AI 短视频生产流程，提高内容生产效率。
            </ScrollRevealText>
          </header>

          <div className="sop-steps" aria-label="AI 短视频制作流程">
            {sopSteps.map((step, index) => (
              <article className="sop-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="video-gallery-wrap">
          <div className="video-gallery" aria-label="四支短视频作品轮播">
            <div className="video-gallery-stage">
              {videos.map((video, index) => {
                const offset = carouselOffset(index, activeVideo);
                return (
                  <article
                    className={`video-card${offset === 0 ? " is-active" : ""}`}
                    data-position={offset}
                    key={video.src}
                    aria-hidden={offset !== 0}
                  >
                    <video
                      ref={(element) => { videoRefs.current[index] = element; }}
                      src={video.src}
                      muted
                      playsInline
                      preload={offset === 0 ? "auto" : "metadata"}
                      onEnded={() => handleEnded(index)}
                    />
                    <div className="video-card-caption">
                      <span>{video.tag}</span>
                      <strong>{video.title}</strong>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="video-gallery-controls">
              <button type="button" onClick={() => selectVideo(activeVideo - 1)} aria-label="上一支视频">←</button>
              <div aria-live="polite">
                <span>{String(activeVideo + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}</span>
                <strong>{videos[activeVideo].title}</strong>
              </div>
              <a className="video-more-link" href="/achievements">更多作品</a>
              <button type="button" onClick={() => selectVideo(activeVideo + 1)} aria-label="下一支视频">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

