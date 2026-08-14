import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "付沣 | AIGC 视频作品集",
  description: "付沣的 AIGC 视频制作、短视频创意与 AI 工作流实践。",
};

const projects = [
  {
    title: "TikTok AIGC 视频",
    subtitle: "从 0 到 1 参与制作端落地",
    description: "产品创意、脚本设计、AI 画面生成与剪辑成片。",
    tone: "coral",
    label: "主案例",
  },
  {
    title: "Temu 产品视频",
    subtitle: "产品实拍与内容表达",
    description: "围绕产品卖点完成素材拍摄、画面组织与短视频制作。",
    tone: "blue",
    label: "内容实践",
  },
  {
    title: "AI 内容工作流",
    subtitle: "让工具进入真实工作",
    description: "将 ChatGPT、Claude、Codex 与 Hermes 用于创作、配置和任务执行。",
    tone: "lime",
    label: "工具实践",
  },
];

const tools = [
  {
    title: "AI 视频制作",
    body: "即梦 AI、Grok、ChatGPT Images，熟悉国内外主流 AI 图像与视频生成工具。",
    tone: "violet",
  },
  {
    title: "内容创作",
    body: "AI 视频脚本设计、产品视频创意、TikTok 短视频创意策划。",
    tone: "orange",
  },
  {
    title: "视频制作",
    body: "使用剪映完成素材整理、节奏控制、字幕与成片交付。",
    tone: "sky",
  },
  {
    title: "AI 工作工具",
    body: "ChatGPT、Claude、Codex、Hermes，用于内容生成、工具安装、任务执行与效率提升。",
    tone: "yellow",
  },
  {
    title: "Agent 实践",
    body: "具备 Hermes Agent 配置、API 接入及工作流实践，能够借助 Codex 完成环境与工具配置。",
    tone: "green",
  },
];

const career = [
  {
    date: "2021.06 - 2023.09",
    title: "工程现场实践",
    role: "施工员",
    body: "在惠州佳兆业与安徽三建参与维保、验收、现场管理和施工协调。",
  },
  {
    date: "2023.04 - 2024.09",
    title: "服务与销售",
    role: "销售员",
    body: "在真实服务与销售环境中负责客户接待、需求沟通与销售服务。",
  },
  {
    date: "2025.11 - 至今",
    title: "深圳市耶尼德科技有限公司",
    role: "视频专员（本科实习）",
    body: "从 Temu 产品实拍转向 AIGC 视频制作，参与 TikTok AI 视频制作端从 0 到 1 落地。",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <nav className="nav" aria-label="主导航">
          <div className="nav-links">
            <a className="is-active" href="#home">首页</a>
            <a href="#about">关于</a>
            <a href="#skills">技能</a>
            <a href="#work">作品</a>
            <a href="#career">经历</a>
            <a href="#contact">联系</a>
          </div>
        </nav>
      </header>

      <section className="hero shell" id="home">
        <div className="hero-center">
          <h1>你好，我是付沣！</h1>
          <p className="hero-role">AIGC 视频创作者</p>

          <div className="hero-media" aria-label="AIGC 视频作品主视觉">
            <div className="media-glow" aria-hidden="true" />
            <span>AIGC</span>
            <strong>VIDEO</strong>
            <i className="play-mark" aria-hidden="true" />
          </div>

          <a className="primary-action" href="#contact">联系我</a>
        </div>

        <div className="hero-object object-pyramid" aria-hidden="true"><i /><b /><span /></div>
        <div className="hero-object object-star" aria-hidden="true" />
        <div className="hero-object object-orb" aria-hidden="true" />
        <div className="hero-object object-capsule" aria-hidden="true" />
        <div className="hero-object object-softcube" aria-hidden="true" />
        <div className="hero-object object-cube" aria-hidden="true"><i /><b /><span /></div>
      </section>

      <section className="signal" aria-label="实践成果">
        <div className="signal-track">
          <span>数千条短视频素材制作</span>
          <span>多条作品播放量 20 万+</span>
          <span>TikTok AI 视频制作端 0 到 1 实践</span>
          <span aria-hidden="true">数千条短视频素材制作</span>
          <span aria-hidden="true">多条作品播放量 20 万+</span>
          <span aria-hidden="true">TikTok AI 视频制作端 0 到 1 实践</span>
        </div>
      </section>

      <section className="work shell section-space" id="work">
        <div className="section-heading">
          <h2>精选作品</h2>
          <p>先确定作品结构，视频和封面将在筛选完成后逐项加入。</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project project-${project.tone}`} key={project.title}>
              <div className="project-media">
                <span className="project-label">{project.label}</span>
                <div className="media-type" aria-hidden="true">
                  {index === 0 ? "AI" : index === 1 ? "TV" : "AG"}
                </div>
                <p>作品封面待加入</p>
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <strong>{project.subtitle}</strong>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="shell section-space">
          <div className="section-heading compact-heading">
            <h2>工具进入工作，能力落到结果</h2>
          </div>
          <div className="tool-grid">
            {tools.map((tool) => (
              <article className={`tool-card tool-${tool.tone}`} key={tool.title}>
                <div className="tool-shape" aria-hidden="true" />
                <h3>{tool.title}</h3>
                <p>{tool.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="career shell section-space" id="career">
        <div className="career-heading">
          <h2>工作经历</h2>
          <p>不同工作环境，让我更快理解真实业务与团队协作。</p>
        </div>
        <div className="career-grid">
          {career.map((item) => (
            <article key={item.date}>
              <p className="career-date">{item.date}</p>
              <h3>{item.title}</h3>
              <strong>{item.role}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="shell about-grid section-space">
          <div className="about-title">
            <span>F</span>
            <h2>关于我</h2>
          </div>
          <div className="about-copy">
            <p>
              作为 2026 届应届本科毕业生，我具备多段真实职场经历，对工作节奏、团队协作和实际业务环境有直接理解。
            </p>
            <p>
              进入现公司后，我从 Temu 产品实拍逐步转向 AIGC 视频制作，并参与 TikTok AI 视频制作端从 0 到 1 落地。目前持续学习 Codex、Hermes 与 Agent，希望进一步提升 AI 在实际工作中的应用能力。
            </p>
            <div className="education">
              <p>广州应用科技学院｜市场营销（本科）｜2024.09 - 2026.06</p>
              <p>广东技师学院｜工程管理（大专）｜2017.09 - 2021.06</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer shell" id="contact">
        <div>
          <p>求职与内容合作</p>
          <h2>联系我</h2>
        </div>
        <a href="mailto:fuq97609@gmail.com">fuq97609@gmail.com</a>
      </footer>
    </main>
  );
}
