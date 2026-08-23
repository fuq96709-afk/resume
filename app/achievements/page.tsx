import type { Metadata } from "next";
import Link from "next/link";
import ScrollRevealText from "../ScrollRevealText";
import SiteHeader from "../SiteHeader";
import AchievementsCarousel from "./AchievementsCarousel";

export const metadata: Metadata = {
  title: "成就 | 付沣 AIGC 视频作品集",
  description: "付沣在 AIGC 视频制作与短视频内容实践中的阶段成果。",
};

export default function AchievementsPage() {
  return (
    <main className="achievements-page">
      <SiteHeader />

      <section className="achievements-shell">
        <Link className="achievements-back" href="/#about">← 返回关于我</Link>
        <div className="achievements-heading">
          <div className="achievements-title-row">
            <p>ACHIEVEMENTS</p>
            <h1>成就</h1>
          </div>
        </div>

        <ScrollRevealText className="achievements-intro-reveal">
          从真实数据出发， 记录每一次创作、 验证与成长。
        </ScrollRevealText>

        <AchievementsCarousel />
      </section>

      <section className="project-collection-section" id="projects" aria-labelledby="project-collection-title">
        <div className="project-collection-heading">
          <div className="project-collection-title-row">
            <p>PORTFOLIO</p>
            <h2 id="project-collection-title">作品集</h2>
          </div>
        </div>
      </section>
    </main>
  );
}

