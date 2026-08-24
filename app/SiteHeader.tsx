import Link from "next/link";

type SiteHeaderProps = {
  activeItem?: "home" | "works";
};

export default function SiteHeader({ activeItem }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="主导航">
        <div className="nav-links">
          <Link className={activeItem === "home" ? "is-active" : undefined} href="/#home">首页</Link>
          <Link href="/#about">关于我</Link>
          <Link href="/#career">工作经历</Link>
          <div className="nav-work-menu">
            <Link className={`nav-work-trigger${activeItem === "works" ? " is-active" : ""}`} href="/works">作品</Link>
            <div className="nav-work-dropdown" aria-label="作品子菜单">
              <Link href="/achievements">成就</Link>
              <Link href="/achievements#projects">更多作品</Link>
            </div>
          </div>
        </div>
        <div className="nav-actions" aria-label="快捷操作">
          <Link className="nav-action nav-action-contact" href="/#contact">联系</Link>
          <a className="nav-action nav-action-resume" href="/resume.pdf" target="_blank" rel="noreferrer">简历</a>
        </div>
      </nav>
    </header>
  );
}

