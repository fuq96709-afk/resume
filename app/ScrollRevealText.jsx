export default function ScrollRevealText({ children, className = "" }) {
  return (
    <div className={`site-scroll-reveal ${className}`.trim()} data-motion-text>
      <p className="site-scroll-reveal-text">{children}</p>
    </div>
  );
}


