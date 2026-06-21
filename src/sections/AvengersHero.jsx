import { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import HeroScene from '../components/HeroScene';
import MagneticButton from '../components/MagneticButton';
import heroImg from '../assets/me/hero-cinematic.png';

const AvengersHero = () => {
  const [flash, setFlash] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    let isActive = true;
    
    // Intense, frequent lightning for Avengers theme
    const triggerLightning = () => {
      if (!isActive) return;
      const nextFlash = 1000 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        if (!isActive) return;
        setFlash(true);
        setTimeout(() => isActive && setFlash(false), 80);
        if (Math.random() > 0.3) {
          setTimeout(() => isActive && setFlash(true), 150);
          setTimeout(() => isActive && setFlash(false), 200);
        }
        if (Math.random() > 0.7) {
          setTimeout(() => isActive && setFlash(true), 350);
          setTimeout(() => isActive && setFlash(false), 450);
        }
        triggerLightning();
      }, nextFlash);
    };

    triggerLightning();

    const ctx = gsap.context(() => {
      gsap.to('.hero-heading-line1', {
        yPercent: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
      gsap.to('.name-line', {
        yPercent: -200,
        scale: 0.9,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      gsap.to('.hero-subtitle', {
        yPercent: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        }
      });
    }, heroRef);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Aggressive ash/dust particles
  const dustParticles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 15,
      size: 2 + Math.random() * 4,
    }));
  }, []);

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

  const fadeRight = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      <div className="hero-image-bg">
        <motion.img
          src={heroImg}
          alt="Manish Yadav"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
        />
      </div>

      <div className="hero-overlay-top" />
      <div className="hero-overlay-bottom" />
      <div className="hero-overlay-vignette" />
      <div className={`lightning-flash ${flash ? 'active' : ''}`} style={{ background: 'rgba(255,0,0,0.2)' }} />

      <div className="hero-particles">
        {dustParticles.map((p) => (
          <div
            key={p.id}
            className="hero-dust"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              background: 'rgba(200, 50, 50, 0.8)',
            }}
          />
        ))}
      </div>

      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-eyebrow" variants={fadeRight} style={{ color: '#ff4d4d', fontFamily: 'monospace' }}>
          <span className="hero-eyebrow-line" style={{ background: '#ff4d4d' }} />
          <span className="hero-eyebrow-dot" style={{ background: '#ff4d4d' }} />
          PROTOCOL: ENDGAME
        </motion.div>

        <motion.h1 className="hero-heading" variants={item}>
          <span className="hero-heading-line1" style={{ color: '#aaa', textTransform: 'uppercase' }}>I am</span>
          <span className="name-line" style={{ color: '#ff4d4d', textTransform: 'uppercase', textShadow: '0 0 20px rgba(229,9,20,0.8)' }}>Inevitable.</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={item} style={{ fontFamily: 'monospace', color: '#ff4d4d' }}>
          Manish Yadav — Threat Level: MAXIMUM.<br/>
          Securing the perimeter.
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <MagneticButton
            className="magnetic-btn-primary"
            onClick={() => scrollTo('about')}
            style={{ background: '#ff4d4d', color: '#000', borderColor: '#ff4d4d' }}
          >
            Acknowledge
          </MagneticButton>
          <MagneticButton
            className="magnetic-btn-secondary"
            onClick={() => scrollTo('projects')}
            style={{ color: '#ff4d4d', borderColor: '#ff4d4d' }}
          >
            View Arsenal
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-socials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <a href="https://github.com/Mydvthukran" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: '#ff4d4d' }}>
          <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="scroll-line" style={{ background: '#ff4d4d' }} />
        <span className="scroll-text" style={{ color: '#ff4d4d' }}>Scroll</span>
      </motion.div>

      <div className="hero-marquee">
        <div className="hero-marquee-inner">
          <span className="hero-marquee-text" style={{ color: 'rgba(255,77,77,0.1)' }}>S.H.I.E.L.D. MAINFRAME // CLASSIFIED ACCESS // OMEGA LEVEL CLEARANCE </span>
          <span className="hero-marquee-text" style={{ color: 'rgba(255,77,77,0.1)' }}>S.H.I.E.L.D. MAINFRAME // CLASSIFIED ACCESS // OMEGA LEVEL CLEARANCE </span>
        </div>
      </div>
    </section>
  );
};

export default AvengersHero;
