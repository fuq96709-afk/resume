import type { Metadata } from "next";
import ScrollRevealText from "../ScrollRevealText";
import SiteHeader from "../SiteHeader";
import WorkShowcase from "../WorkShowcase";

export const metadata: Metadata = {
  title: "作品集 | 付沣 AIGC 视频作品集",
  description: "付沣的 AIGC 视频创作、短视频内容与 AI 工作流作品集。",
};

export default function WorksPage() {
  return (
    <main className="works-page">
      <SiteHeader activeItem="works" />
      <section className="project-collection-section works-route-hero" aria-labelledby="works-title">
        <div className="project-collection-heading">
          <span>CURATED AIGC WORKS · 2026</span>
          <div className="project-collection-title-row">
            <p>PORTFOLIO</p>
            <h1 id="works-title">作品集</h1>
          </div>
          <ScrollRevealText className="works-intro-reveal">
            用 AI 放大创意， 用作品呈现真实的思考、 执行与结果。
          </ScrollRevealText>
        </div>
      </section>
      <WorkShowcase />
    </main>
  );
}

