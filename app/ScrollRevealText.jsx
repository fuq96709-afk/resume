export default function ScrollRevealText({ children, className = "" }) {
  return (
    <div className={`site-scroll-reveal ${className}`.trim()}>
      <p className="site-scroll-reveal-text">{children}</p>
    </div>
  );
}

