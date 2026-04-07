import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || 'ontouchstart' in window) return;

    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseDown = () => cursor.classList.add('clicking');
    const onMouseUp = () => cursor.classList.remove('clicking');

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      cursor.style.left = `${pos.current.x}px`;
      cursor.style.top = `${pos.current.y}px`;
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

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
