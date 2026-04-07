import { useRef, useCallback } from 'react';

const MagneticButton = ({ children, className = '', onClick, href, target, rel, as = 'button', ...props }) => {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px)';
  }, []);

  const handleClick = useCallback((e) => {
    // Ripple effect
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    if (onClick) onClick(e);
  }, [onClick]);

  const Tag = href ? 'a' : as;

  return (
    <Tag
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      href={href}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
