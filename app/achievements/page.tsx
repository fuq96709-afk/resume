import type { Metadata } from "next";
import Link from "next/link";
import AchievementsCarousel from "./AchievementsCarousel";

export const metadata: Metadata = {
  title: "成就 | 付沣 AIGC 视频作品集",
  description: "付沣在 AIGC 视频制作与短视频内容实践中的阶段成果。",
};

export default function AchievementsPage() {
  return (
    <main className="achievements-page">
      <header className="site-header">
        <nav className="nav" aria-label="主导航">
          <div className="nav-links">
            <Link href="/#home">首页</Link>
            <Link href="/#about">关于我</Link>
            <Link href="/#career">工作经历</Link>
            <Link href="/#work">作品</Link>
          </div>
          <div className="nav-actions" aria-label="快捷操作">
            <Link className="nav-action nav-action-contact" href="/#contact">联系</Link>
            <a className="nav-action nav-action-resume" href="/resume.pdf" target="_blank" rel="noreferrer">简历</a>
          </div>
        </nav>
      </header>

      <section className="achievements-shell">
        <Link className="achievements-back" href="/#about">← 返回关于我</Link>
        <div className="achievements-heading">
          <p>ACHIEVEMENTS</p>
          <h1>成就</h1>
          <span className="achievements-tagline">让结果说话，让成长有迹可循</span>
        </div>

        <AchievementsCarousel />
      </section>
    </main>
  );
}

