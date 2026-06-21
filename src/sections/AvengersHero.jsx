import { useRef } from 'react';
import { motion } from 'framer-motion';
import '../batman.css';

const BatIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 100 50" fill="currentColor">
    <path d="M50 48s-15-20-30-25c-8-3-20 2-20 2s5-15 20-20c10-3 15 5 15 5s2-5 6-8l3 5 6-5 3 8s5-8 15-5c15 5 20 20 20 20s-12-5-20-2c-15 5-30 25-30 25z"/>
  </svg>
);

const AvengersHero = () => {
  const heroRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.5 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="batman-hero-section" id="home" ref={heroRef}>
      <div className="batman-bg-image"></div>
      
      <div className="batman-container">
        
        {/* Left Side Content */}
        <motion.div 
          className="batman-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="batman-protocol" variants={item}>
            <span className="batman-protocol-dot"></span>
            PROTOCOL: ENDGAME
          </motion.div>

          <motion.h2 className="batman-title-small" variants={item}>
            I AM
          </motion.h2>

          <motion.h1 className="batman-title-large" variants={item}>
            INEVITABLE.
          </motion.h1>

          <motion.div className="batman-divider" variants={item}>
            <BatIcon className="batman-divider-icon" />
            <div className="batman-divider-line"></div>
          </motion.div>

          <motion.p className="batman-subtitle" variants={item}>
            I build digital experiences that are powerful, intuitive and leave a lasting impact.
          </motion.p>

          <motion.div className="batman-actions" variants={item}>
            <button className="batman-btn batman-btn-primary" onClick={() => scrollTo('about')}>
              ACKNOWLEDGE
            </button>
            <button className="batman-btn batman-btn-secondary" onClick={() => scrollTo('projects')}>
              VIEW ARSENAL
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side HUD */}
        <motion.div 
          className="batman-hud"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        >
          <div className="batman-hud-ring hud-ring-1"></div>
          <div className="batman-hud-ring hud-ring-2"></div>
          <div className="batman-hud-ring hud-ring-3"></div>
          
          <div className="hud-ticks t1"></div>
          <div className="hud-ticks t2"></div>

          <div className="batman-hud-logo">
            <BatIcon style={{ width: '100%', height: '100%' }} />
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Bar & Utilities */}
      <div className="batman-bottom-bar">
        <motion.div 
          className="batman-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>SCROLL</span>
          <BatIcon className="batman-scroll-icon" />
          <div className="batman-scroll-line"></div>
        </motion.div>

        <motion.div 
          className="batman-sound-toggle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <BatIcon style={{ width: '20px', height: '20px' }} />
        </motion.div>
      </div>

    </section>
  );
};

export default AvengersHero;
