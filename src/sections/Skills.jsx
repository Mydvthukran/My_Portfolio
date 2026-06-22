import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { useEasterEgg } from '../context/EasterEggContext';
import AvengersSkills from './AvengersSkills';

// ============================================================================
// THE DEFAULT THEME: DYNAMIC SPINNING ORBIT
// ============================================================================
const orbitRings = [
  { radius: 140, duration: 35, reverse: false, skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'Three.js'] },
  { radius: 260, duration: 50, reverse: true, skills: ['JavaScript', 'MongoDB', 'Tailwind', 'C++', 'Git', 'HTML5', 'CSS3', 'Express.js'] },
  { radius: 380, duration: 65, reverse: false, skills: ['Firebase', 'REST API', 'Vercel', 'Netlify', 'Render', 'Google Cloud', 'AWS', 'GitHub', 'VS Code', 'n8n', 'Ollama'] }
];

// Flat list for the mobile grid
const allSkills = orbitRings.flatMap(r => r.skills);

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const { themeState } = useEasterEgg();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isMobile) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Subtle magnetic tilt
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 150, damping: 30 });

  // Add subtle parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // If the Avengers theme is active, delegate entirely to the separate component!
  if (themeState === 'snapped') {
    return <AvengersSkills />;
  }

  // ─── Mobile Layout: Clean skill tag grid ───────────────────────────
  if (isMobile) {
    return (
      <section className="section" id="skills" ref={sectionRef}>
        <div className="section-container">
          <SectionTitle label="Expertise" title="Technical" titleAccent="Arsenal" />
          
          <motion.div 
            className="avengers-skills-mobile-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03 } }
            }}
          >
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill}
                className="avengers-skill-tag"
                variants={{
                  hidden: { opacity: 0, y: 15, scale: 0.9 },
                  visible: { 
                    opacity: 1, y: 0, scale: 1,
                    transition: { type: 'spring', stiffness: 250, damping: 18 }
                  }
                }}
              >
                <span className="avengers-skill-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="avengers-skill-name">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── Desktop Layout: Original spinning orbit ────────────────────────
  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle label="Expertise" title="Technical" titleAccent="Arsenal" />

        <div 
          className="skills-orbit-viewport"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="skills-orbit-system"
            style={{ rotateX, rotateY, y: yParallax }}
          >
            <div className="orbit-core">
              <div className="core-glow"></div>
              <span>Skills</span>
            </div>
            {orbitRings.map((ring, ringIdx) => (
              <div 
                key={ringIdx}
                className="orbit-ring-track"
                style={{
                  width: ring.radius * 2,
                  height: ring.radius * 2,
                  animation: `spin-ring ${ring.duration}s linear infinite ${ring.reverse ? 'reverse' : 'normal'}`
                }}
              >
                {ring.skills.map((skill, i) => {
                  const angle = (i / ring.skills.length) * Math.PI * 2;
                  const x = Math.cos(angle) * ring.radius;
                  const y = Math.sin(angle) * ring.radius;

                  return (
                    <div 
                      key={skill}
                      className="orbit-node-wrapper"
                      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    >
                      <div 
                        className="orbit-node-inner"
                        style={{ animation: `spin-ring-counter ${ring.duration}s linear infinite ${ring.reverse ? 'reverse' : 'normal'}` }}
                      >
                        {skill}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
