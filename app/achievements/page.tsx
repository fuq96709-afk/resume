import type { Metadata } from "next";
import Link from "next/link";
import ScrollRevealText from "../ScrollRevealText";
import SiteHeader from "../SiteHeader";
import AchievementsCarousel from "./AchievementsCarousel";
import AchievementsHashScroll from "./AchievementsHashScroll";
import AchievementsPortfolio from "./AchievementsPortfolio";

export const metadata: Metadata = {
  title: "成就 | 付沣 AIGC 视频作品集",
  description: "付沣在 AIGC 视频制作与短视频内容实践中的阶段成果。",
};

export default function AchievementsPage() {
  return (
    <main className="achievements-page">
      <AchievementsHashScroll />
      <SiteHeader />

      <section className="achievements-shell" id="achievements" data-motion-group>
        <Link className="achievements-back" href="/#about">← 返回关于我</Link>
        <div className="achievements-heading">
          <div className="achievements-title-row" data-motion-heading>
            <p>ACHIEVEMENTS</p>
            <h1>成就</h1>
          </div>
        </div>

        <ScrollRevealText className="achievements-intro-reveal">
          记录TikTok AI视频制作过程中的真实数据表现与作品成果
        </ScrollRevealText>

        <AchievementsCarousel />
      </section>

      <section className="project-collection-section" id="projects" aria-labelledby="portfolio-title">
        <header className="project-collection-heading" data-motion-group>
          <div className="project-collection-title-row" data-motion-heading>
            <p>PORTFOLIO</p>
            <h2 id="portfolio-title">作品集</h2>
          </div>
        </header>

        <AchievementsPortfolio />
      </section>
    </main>
  );
}