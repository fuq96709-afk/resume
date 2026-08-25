import type { Metadata } from "next";
import Image from "next/image";
import CareerExperience from "./CareerExperience";
import HomeEntry from "./HomeEntry";
import HeroTiltedPortrait from "./HeroTiltedPortrait";
import SiteHeader from "./SiteHeader";
import WorkShowcase from "./WorkShowcase";

export const metadata: Metadata = {
  title: "付沣 | AIGC 视频作品集",
  description: "付沣的 AIGC 视频制作、短视频创意与 AI 工作流实践。",
};

export default function Home() {
  return (
    <main>
      <HomeEntry />
      <SiteHeader activeItem="home" />

      <section className="hero" id="home" data-motion-hero>
        <div className="hero-stage">
          <div className="hero-marquee" aria-hidden="true">
            <div className="hero-marquee-track">
              <span>WECLOME&nbsp;WECLOME&nbsp;</span>
              <span>WECLOME&nbsp;WECLOME&nbsp;</span>
            </div>
          </div>

          <div className="hero-copy">
            <h1>你好，我是付沣！</h1>
            <p>AIGC 视频创作者</p>
          </div>
          <a
            className="hero-profile-card"
            href="#about"
            aria-label="前往关于我"
            data-cursor="About Me"
            data-cursor-icon="↗"
          >
            <HeroTiltedPortrait />
          </a>
          <p className="hero-profile-meta">AI 视频创作 / AI 工作流实践</p>
          <a className="hero-cta" href="#contact" data-cursor="Contact" data-cursor-icon="↓">
            <span className="hero-cta-label">Let&apos;s Work Together!</span>
            <span className="hero-cta-arrow" aria-hidden="true">↓</span>
          </a>
          <Image className="hero-shape hero-shape-pyramid" src="/hero-shape-pyramid.png" alt="" width={280} height={280} aria-hidden="true" />
          <span className="hero-shape hero-shape-orb" aria-hidden="true" />
          <Image className="hero-shape hero-shape-cylinder" src="/hero-shape-cylinder.png" alt="" width={280} height={280} aria-hidden="true" />
          <Image className="hero-shape hero-shape-star" src="/hero-shape-star.png" alt="" width={280} height={280} aria-hidden="true" />
          <Image className="hero-shape hero-shape-green" src="/hero-shape-green.png" alt="" width={280} height={280} aria-hidden="true" />
          <Image className="hero-shape hero-shape-cube" src="/hero-shape-cube.png" alt="" width={280} height={280} aria-hidden="true" />
        </div>
      </section>

      <CareerExperience />

      <WorkShowcase />

      <footer className="portfolio-footer" id="contact" data-motion-group>
        <div className="portfolio-footer-inner">
          <p className="footer-eyebrow">LET&apos;S CREATE SOMETHING MEANINGFUL</p>
          <h2 className="footer-title" data-motion-heading>
            <span>让我们给这个世界</span>
            <span className="footer-title-outline">带点不一样的吧。</span>
          </h2>

          <div className="footer-contacts" aria-label="联系方式" data-motion-card>
            <a className="footer-contact" href="tel:18129917940" data-cursor="Call" data-cursor-icon="↗">
              <span className="footer-contact-label">Phone / WeChat</span>
              <span className="footer-contact-value">18129917940</span>
            </a>
            <a className="footer-contact" href="mailto:fuq97609@gmail.com" data-cursor="Email" data-cursor-icon="↗">
              <span className="footer-contact-label">Email</span>
              <span className="footer-contact-value">fuq97609@gmail.com</span>
            </a>
          </div>

          <div className="footer-bottom" data-motion-card>
            <p>© 2026 FU FENG</p>
            <a href="#home">返回顶部 ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

