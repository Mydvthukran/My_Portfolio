import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  // PERF: Skip entirely on touch devices — don't even mount the DOM element or RAF loop
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth <= 768);

  useEffect(() => {
    if (isTouchDevice) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseDown = () => cursor.classList.add('clicking');
    const onMouseUp = () => cursor.classList.remove('clicking');

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      const scale = cursor.classList.contains('clicking') ? 0.75 : 1;
      cursor.style.transform = `translate3d(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%), 0) scale(${scale})`;
      rafId.current = requestAnimationFrame(animate);
    };

    // Event delegation — lightweight
    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .magnetic-btn, .social-link, .navbar-link, .project-card, .skill-card, .contact-item, .contact-social-link, .footer-link, .menu-toggle, .resume-btn, .github-cta-btn, .project-external-link, .terminal-card')) {
        cursor.classList.add('hover');
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .magnetic-btn, .social-link, .navbar-link, .project-card, .skill-card, .contact-item, .contact-social-link, .footer-link, .menu-toggle, .resume-btn, .github-cta-btn, .project-external-link, .terminal-card')) {
        cursor.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // PERF: Don't render cursor element on touch devices
  if (isTouchDevice) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
