import { useRef, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

// ─── Contact items data ──────────────────────────────────────────────────────
const contactItems = [
  {
    id: 'email',
    label: 'EMAIL',
    href: 'mailto:my3596418@gmail.com',
    detail: 'Drop me an email anytime.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GITHUB',
    href: 'https://github.com/Mydvthukran',
    detail: 'Check out my code and projects.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/manish-yadav-483613323/',
    detail: "Let's connect and grow together.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'PHONE',
    href: 'tel:+919461429507',
    detail: 'Call or message me directly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'LOCATION',
    href: null,
    detail: 'Based in India, open to global work.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

// ─── Staggered positions for the hanging orbs ──────────
const hangPositions = [
  { leftPct: 15, threadLen: 220, swayDelay: 0.1 },    // Email — high left
  { leftPct: 32, threadLen: 380, swayDelay: 0.6 },    // GitHub — low mid-left
  { leftPct: 50, threadLen: 280, swayDelay: 0.2 },    // LinkedIn — center middle
  { leftPct: 68, threadLen: 420, swayDelay: 0.8 },    // Phone — low mid-right
  { leftPct: 85, threadLen: 240, swayDelay: 0.3 },    // Location — high right
];

// ─── Magnetic hanging orb ──────────────────────────────────────────────────
const HangingOrb = ({ item, position, index, isInView }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 15, mass: 0.3 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    mouseX.set(middleX * 0.2);
    mouseY.set(middleY * 0.1);
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
        duration: 1, 
        delay: 0.2 + index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {/* Thread */}
      <svg 
        className="web-thread-svg" 
        width="40" 
        height={position.threadLen}
        viewBox={`0 0 40 ${position.threadLen}`}
      >
        <path 
          d={`M 20 0 Q 22 ${position.threadLen * 0.2} 20 ${position.threadLen * 0.4} Q 18 ${position.threadLen * 0.6} 20 ${position.threadLen * 0.8} Q 22 ${position.threadLen} 20 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray="2 1"
        />
        <path 
          d={`M 20 0 Q 18 ${position.threadLen * 0.3} 20 ${position.threadLen * 0.5} Q 22 ${position.threadLen * 0.7} 20 ${position.threadLen}`}
          stroke="rgba(255, 255, 255, 0.4)" 
          strokeWidth="1" 
          fill="none"
        />
        
        {/* Attachment cap to the orb */}
        <path d={`M 10 ${position.threadLen} Q 20 ${position.threadLen - 10} 30 ${position.threadLen}`} stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
        <path d={`M 15 ${position.threadLen} L 20 ${position.threadLen - 15} L 25 ${position.threadLen}`} stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
      </svg>

      {/* The hanging glass orb */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ x, y }}
        className="web-orb-wrapper"
        animate={{ 
          rotate: [0, 1.5, 0, -1.5, 0],
          x: [0, 5, 0, -5, 0],
        }}
        transition={{ 
          duration: 6 + index * 0.8, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: position.swayDelay,
        }}
      >
        <Tag
          href={item.href}
          target={item.href?.startsWith('http') ? '_blank' : undefined}
          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="web-orb-inner"
        >
          <div className="web-orb-icon">{item.icon}</div>
          <span className="web-orb-label">{item.label}</span>
          <span className="web-orb-detail">{item.detail}</span>
          
          <div className="web-orb-reflection" />
        </Tag>
      </motion.div>
    </motion.div>
  );
};

// ─── Hanging Spiderman ────────────────────────────────────────────────────────
const HangingSpiderman = ({ isInView }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 15, mass: 0.3 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    mouseX.set(middleX * 0.2);
    mouseY.set(middleY * 0.1);
  };

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="web-hang-column"
      style={{ left: '92%', zIndex: 20 }}
      initial={{ opacity: 0, y: -300 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        type: 'spring',
        stiffness: 40,
        damping: 10,
        delay: 1.5 
      }}
    >
      {/* Thread */}
      <svg 
        className="web-thread-svg" 
        width="40" 
        height="180"
        viewBox="0 0 40 180"
      >
        <path 
          d="M 20 0 L 20 180"
          stroke="rgba(255, 255, 255, 0.8)" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray="4 2"
        />
        <path d="M 10 180 Q 20 170 30 180" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
      </svg>

      {/* Spiderman */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ x, y, cursor: 'grab', marginTop: '-5px' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ cursor: 'grabbing', scale: 0.95 }}
        animate={{ 
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: 'easeInOut',
        }}
      >
        <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 10px 15px rgba(229,9,20,0.6))' }}>
          {/* Head (Upside down: chin at y=15, top of head at y=80) */}
          <path d="M 30 10 C 15 15 5 40 10 65 C 15 90 45 90 50 65 C 55 40 45 15 30 10 Z" fill="#E23636" stroke="#000" strokeWidth="2" />
          
          {/* Web pattern on face */}
          <path d="M 30 10 L 30 90 M 15 25 L 45 25 M 8 45 L 52 45 M 8 65 L 52 65 M 30 45 L 10 15 M 30 45 L 50 15 M 30 45 L 5 80 M 30 45 L 55 80" stroke="#000" strokeWidth="1" opacity="0.6" />
          
          {/* Left Eye (near chin at top) */}
          <path d="M 27 28 C 27 28 15 22 10 40 C 10 40 20 35 27 28 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
          
          {/* Right Eye */}
          <path d="M 33 28 C 33 28 45 22 50 40 C 50 40 40 35 33 28 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
        </svg>
      </motion.div>
    </motion.div>
  );
};


// ─── Main Component ──────────────────────────────────────────────────────────
const AvengersContact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Web background lines generator
  const bgLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 40; i++) {
      lines.push({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        opacity: Math.random() * 0.15 + 0.05
      });
    }
    return lines;
  }, []);

  return (
    <section className="section" id="contact" ref={sectionRef} style={{ background: '#020000' }}>
      {/* Spider web background texture */}
      <div className="spiderweb-bg">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          {bgLines.map((line, i) => (
            <path key={i} d={`M ${line.x1}% ${line.y1}% Q ${line.x2}% ${line.y2}% ${line.x2}% ${line.y2}%`} stroke="rgba(255,0,0,0.15)" strokeWidth="0.5" fill="none" />
          ))}
          {/* Main web arcs */}
          <circle cx="0%" cy="0%" r="30%" stroke="rgba(255,0,0,0.15)" strokeWidth="1" fill="none" />
          <circle cx="0%" cy="0%" r="60%" stroke="rgba(255,0,0,0.1)" strokeWidth="1" fill="none" />
          <circle cx="0%" cy="0%" r="90%" stroke="rgba(255,0,0,0.05)" strokeWidth="1" fill="none" />
          
          <circle cx="100%" cy="50%" r="40%" stroke="rgba(255,0,0,0.15)" strokeWidth="1" fill="none" />
          <circle cx="100%" cy="50%" r="80%" stroke="rgba(255,0,0,0.08)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="section-container avengers-contact-container">

        {/* Top Header matching the image */}
        <motion.div
          className="avengers-contact-header"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="avengers-contact-subtitle">L E T ' S</div>
          <h2 className="avengers-contact-title-huge">
            C<span style={{position: 'relative'}}>
              O
              <div className="spider-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10.9 2 10 2.9 10 4V6.5C8 7.3 6.4 8.7 5.5 10.5L3 9L2.5 10L4.7 11.5C4.2 13 4.2 14.7 4.8 16.1L2 17.5L2.5 18.4L5.5 16.9C6.5 18.5 8.2 19.6 10 20V22H14V20C15.8 19.6 17.5 18.5 18.5 16.9L21.5 18.4L22 17.5L19.2 16.1C19.8 14.7 19.8 13 19.3 11.5L21.5 10L21 9L18.5 10.5C17.6 8.7 16 7.3 14 6.5V4C14 2.9 13.1 2 12 2ZM12 8C13.7 8 15.2 8.9 16.1 10.4L13.8 11.5L14.7 13.3L16.8 12.3C16.9 12.9 16.9 13.5 16.8 14L14.7 13.1L13.8 14.9L16.2 16C15.2 17.2 13.7 18 12 18C10.3 18 8.8 17.2 7.8 16L10.2 14.9L9.3 13.1L7.2 14C7.1 13.5 7.1 12.9 7.2 12.3L9.3 13.3L10.2 11.5L7.9 10.4C8.8 8.9 10.3 8 12 8Z" />
                </svg>
              </div>
            </span>NNECT
            <div className="hanging-spider">
              <div className="spider-thread" />
              <svg viewBox="0 0 24 24" fill="#ff0000" width="16" height="16">
                <path d="M12 2C10.9 2 10 2.9 10 4V6.5C8 7.3 6.4 8.7 5.5 10.5L3 9L2.5 10L4.7 11.5C4.2 13 4.2 14.7 4.8 16.1L2 17.5L2.5 18.4L5.5 16.9C6.5 18.5 8.2 19.6 10 20V22H14V20C15.8 19.6 17.5 18.5 18.5 16.9L21.5 18.4L22 17.5L19.2 16.1C19.8 14.7 19.8 13 19.3 11.5L21.5 10L21 9L18.5 10.5C17.6 8.7 16 7.3 14 6.5V4C14 2.9 13.1 2 12 2ZM12 8C13.7 8 15.2 8.9 16.1 10.4L13.8 11.5L14.7 13.3L16.8 12.3C16.9 12.9 16.9 13.5 16.8 14L14.7 13.1L13.8 14.9L16.2 16C15.2 17.2 13.7 18 12 18C10.3 18 8.8 17.2 7.8 16L10.2 14.9L9.3 13.1L7.2 14C7.1 13.5 7.1 12.9 7.2 12.3L9.3 13.3L10.2 11.5L7.9 10.4C8.8 8.9 10.3 8 12 8Z" />
              </svg>
            </div>
          </h2>
          <div className="avengers-contact-desc">
            <p>Have a project in mind or want to work together?</p>
            <p>Feel free to reach out through any of the following.</p>
          </div>
        </motion.div>

        {/* The spider web hanging area */}
        <div className="web-hang-zone">
          {/* Top dark invisible beam for layout */}
          <div className="web-top-beam" style={{ background: 'transparent' }} />

          {/* Hanging contact glass orbs */}
          {contactItems.map((item, index) => (
            <HangingOrb
              key={item.id}
              item={item}
              position={hangPositions[index]}
              index={index}
              isInView={isInView}
            />
          ))}

          {/* Upside Down Spiderman */}
          <HangingSpiderman isInView={isInView} />
        </div>
      </div>
      
      {/* City Skyline Silhouette */}
      <div className="city-skyline-bg" />
    </section>
  );
};

export default AvengersContact;
