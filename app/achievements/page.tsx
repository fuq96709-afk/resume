import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "成就 | 付沣 AIGC 视频作品集",
  description: "付沣在 AIGC 视频制作与短视频内容实践中的阶段成果。",
};

const achievements = [
  { value: "0 到 1", label: "TikTok AI 制作端实践" },
  { value: "数千条", label: "短视频素材制作" },
  { value: "20 万+", label: "多条作品播放表现" },
];

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
        </nav>
      </header>

      <section className="achievements-shell">
        <Link className="achievements-back" href="/#about">← 返回关于我</Link>
        <div className="achievements-heading">
          <p>ACHIEVEMENTS</p>
          <h1>成就</h1>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <article key={achievement.value}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{achievement.value}</strong>
              <p>{achievement.label}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

