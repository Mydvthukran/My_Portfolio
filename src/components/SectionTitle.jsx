import { useEffect, useRef } from 'react';

const SectionTitle = ({ label, title, titleAccent }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-title-wrapper reveal" ref={ref}>
      <p className="section-label">
        {label}
      </p>
      <h2 className="section-title">
        {title} {titleAccent && <em>{titleAccent}</em>}
      </h2>
    </div>
  );
};

export default SectionTitle;
