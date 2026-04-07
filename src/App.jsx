import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

/* Scroll Progress Bar */
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      barRef.current.style.height = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="scroll-progress-track">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
};

/* Loading screen — clean, English only */
const LoadingScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        onComplete();
      },
    });

    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .to(textRef.current, { opacity: 0, y: -20, duration: 0.4, delay: 0.6 })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
    });
  }, []);

  if (!show) return null;

  return (
    <div className="loader-screen" ref={loaderRef}>
      <div ref={textRef} className="loader-text">
        <span className="loader-greeting">Welcome</span>
        <span className="loader-name">Manish Yadav</span>
      </div>
    </div>
  );
};

const App = () => {
  const appRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ============================
       SCROLL ANIMATIONS (lightweight)
       ============================ */

    // 1. Hero parallax — image moves slower (keeps hero text ALWAYS visible)
    const heroImg = document.querySelector('.hero-image-bg img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 15,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // NOTE: No hero content fade — so text stays visible when scrolling back up

    // 2. Sections fade in (one-time, not scrub — lighter on GPU)
    const sections = gsap.utils.toArray('.section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 3. Stagger children in each section (one-time trigger)
    sections.forEach((section) => {
      const children = section.querySelectorAll('.skill-card, .project-card, .learning-card, .contact-item, .stat-card');
      if (children.length > 0) {
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="app-wrapper" ref={appRef}>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
