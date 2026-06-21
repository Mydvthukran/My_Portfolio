import { useRef, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

// ─── Contact items data ──────────────────────────────────────────────────────
const contactItems = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:my3596418@gmail.com',
    detail: 'my3596418@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Mydvthukran',
    detail: '@Mydvthukran',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manish-yadav-483613323/',
    detail: 'Manish Yadav',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    href: 'tel:+919461429507',
    detail: '+91 94614 29507',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Location',
    href: null,
    detail: 'Haryana, India',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

// ─── Positions for the hanging bubbles (% from left, thread length) ──────────
const hangPositions = [
  { leftPct: 8,  threadLen: 140, swayDelay: 0 },     // Email — far left
  { leftPct: 28, threadLen: 220, swayDelay: 0.5 },    // GitHub — left-center
  { leftPct: 50, threadLen: 180, swayDelay: 1.0 },    // LinkedIn — center
  { leftPct: 72, threadLen: 260, swayDelay: 1.5 },    // Phone — right-center
  { leftPct: 92, threadLen: 160, swayDelay: 2.0 },    // Location — far right
];

// ─── Magnetic hanging bubble ──────────────────────────────────────────────────
const HangingBubble = ({ item, position, index, isInView }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 12, mass: 0.2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    mouseX.set(middleX * 0.25);
    mouseY.set(middleY * 0.15);
  };

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Tag = item.href ? 'a' : 'div';

  return (
    <motion.div
      className="web-hang-column"
      style={{ left: `${position.leftPct}%` }}
      initial={{ opacity: 0, y: -100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.3 + index * 0.15, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {/* Redesigned Multi-Strand Spiderman Web SVG */}
      <svg 
        className="web-thread-svg" 
        width="80" 
        height={position.threadLen}
        viewBox={`0 0 80 ${position.threadLen}`}
      >
        {/* Web strand 1 (Far Left) */}
        <path 
          d={`M 10 0 Q 25 ${position.threadLen * 0.4} 40 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 0.8)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Web strand 2 (Mid Left) */}
        <path 
          d={`M 25 0 Q 32 ${position.threadLen * 0.6} 40 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 0.9)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Web strand 3 (Center Main) */}
        <path 
          d={`M 40 0 L 40 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 1)" 
          strokeWidth="3.5" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Web strand 4 (Mid Right) */}
        <path 
          d={`M 55 0 Q 48 ${position.threadLen * 0.6} 40 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 0.9)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Web strand 5 (Far Right) */}
        <path 
          d={`M 70 0 Q 55 ${position.threadLen * 0.4} 40 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 0.8)" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Cross webbing to tie the strands together (like spider web rungs) */}
        <path 
          d={`M 13 ${position.threadLen * 0.15} Q 40 ${position.threadLen * 0.25} 67 ${position.threadLen * 0.15}`}
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d={`M 18 ${position.threadLen * 0.35} Q 40 ${position.threadLen * 0.45} 62 ${position.threadLen * 0.35}`}
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d={`M 24 ${position.threadLen * 0.6} Q 40 ${position.threadLen * 0.65} 56 ${position.threadLen * 0.6}`}
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d={`M 30 ${position.threadLen * 0.8} Q 40 ${position.threadLen * 0.85} 50 ${position.threadLen * 0.8}`}
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="1.5" 
          fill="none"
        />

        {/* Attachment knot at the bottom */}
        <circle cx="40" cy={position.threadLen - 3} r="6" fill="rgba(255, 255, 255, 1)" />
      </svg>

      {/* The hanging bubble */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ x, y }}
        className="web-bubble-wrapper"
        animate={{ 
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{ 
          duration: 4 + index * 0.5, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: position.swayDelay,
        }}
      >
        <Tag
          href={item.href}
          target={item.href?.startsWith('http') ? '_blank' : undefined}
          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="web-bubble-inner"
        >
          <div className="web-bubble-icon">{item.icon}</div>
          <span className="web-bubble-label">{item.label}</span>
          <span className="web-bubble-detail">{item.detail}</span>
          <div className="web-bubble-glow" />
        </Tag>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const AvengersContact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Generate random web strands for the background SVG
  const bgStrands = useMemo(() => {
    const strands = [];
    for (let i = 0; i < 12; i++) {
      const x1 = Math.random() * 100;
      const y1 = 0;
      const cx = x1 + (Math.random() - 0.5) * 30;
      const cy = 20 + Math.random() * 30;
      const x2 = x1 + (Math.random() - 0.5) * 40;
      const y2 = 40 + Math.random() * 60;
      strands.push({ x1, y1, cx, cy, x2, y2, opacity: 0.03 + Math.random() * 0.06 });
    }
    return strands;
  }, []);

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="section-container avengers-contact-container">

        {/* Section label */}
        <motion.div
          className="avengers-contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="avengers-section-label" style={{ justifyContent: 'center' }}>
            <span className="pulsing-dot" />
            COMMUNICATION UPLINK
          </div>
          <h2 className="avengers-contact-title">
            <span className="avengers-contact-title-main">ESTABLISH</span>
            <span className="avengers-contact-title-accent">CONTACT</span>
          </h2>
        </motion.div>

        {/* The spider web hanging area */}
        <div className="web-hang-zone">
          
          {/* Top bar — the "beam" everything hangs from */}
          <motion.div 
            className="web-top-beam"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="web-beam-inner" />
            <div className="web-beam-glow" />
          </motion.div>

          {/* Background web strands SVG */}
          <svg className="web-bg-strands" viewBox="0 0 100 100" preserveAspectRatio="none">
            {bgStrands.map((s, i) => (
              <path
                key={i}
                d={`M ${s.x1} ${s.y1} Q ${s.cx} ${s.cy} ${s.x2} ${s.y2}`}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="0.15"
                fill="none"
                opacity={s.opacity}
              />
            ))}
          </svg>

          {/* Hanging contact bubbles */}
          {contactItems.map((item, index) => (
            <HangingBubble
              key={item.id}
              item={item}
              position={hangPositions[index]}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Social buttons row at bottom */}
        <motion.div 
          className="web-social-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <span className="web-social-label">SOCIAL_LINKS //</span>
          <div className="web-social-links">
            <a href="https://github.com/Mydvthukran" target="_blank" rel="noopener noreferrer" className="web-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/manish-yadav-483613323/" target="_blank" rel="noopener noreferrer" className="web-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://instagram.com/manishyadavthukran" target="_blank" rel="noopener noreferrer" className="web-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AvengersContact;
