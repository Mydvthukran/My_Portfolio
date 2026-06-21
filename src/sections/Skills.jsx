import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { useEasterEgg } from '../context/EasterEggContext';

const rings = [
  {
    radius: 140,
    duration: 35,
    reverse: false,
    skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'Three.js']
  },
  {
    radius: 260,
    duration: 50,
    reverse: true,
    skills: ['JavaScript', 'MongoDB', 'Tailwind', 'C++', 'Git', 'HTML5', 'CSS3', 'Express.js']
  },
  {
    radius: 380,
    duration: 65,
    reverse: false,
    skills: ['Firebase', 'REST API', 'Vercel', 'Netlify', 'Render', 'Google Cloud', 'AWS', 'GitHub', 'VS Code', 'n8n', 'Ollama']
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const { themeState } = useEasterEgg();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
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

  // Smooth springs for magnetic tilt
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 150, damping: 30 });

  // Add subtle parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
            style={{ 
              rotateX, 
              rotateY,
              y: yParallax
            }}
          >
            {/* Spiderman Web Overlay (Stretchable & Less Dense) */}
            {themeState === 'snapped' && (
              <div className="spider-web-overlay">
                <svg viewBox="0 0 100 100" className="spider-web-svg" preserveAspectRatio="none">
                  {/* Outer structural threads */}
                  <path d="M50,50 L5,5 M50,50 L95,5 M50,50 L95,95 M50,50 L5,95 M50,50 L50,0 M50,50 L100,50 M50,50 L50,100 M50,50 L0,50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
                  {/* Stretchy inward curves */}
                  <path d="M20,20 Q50,30 80,20 Q70,50 80,80 Q50,70 20,80 Q30,50 20,20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" fill="none" />
                  <path d="M5,50 Q25,35 50,5 Q75,35 95,50 Q75,65 50,95 Q25,65 5,50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" fill="none" />
                  <path d="M35,35 Q50,42 65,35 Q58,50 65,65 Q50,58 35,65 Q42,50 35,35" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" />
                </svg>
              </div>
            )}

            {/* The Central Core */}
            <div className="orbit-core">
              <div className="core-glow"></div>
              <span>Skills</span>
            </div>

            {/* Orbit Rings */}
            {rings.map((ring, ringIdx) => (
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
                  const isStuck = themeState === 'snapped';
                  // Predictable pseudo-random delay based on index so it doesn't cause hydration mismatch
                  const delay = isStuck ? (0.2 + (i % 5) * 0.1) : 0;

                  return (
                    <div 
                      key={skill}
                      className={`orbit-node-wrapper ${isStuck ? 'web-stuck' : ''}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animationDelay: `${delay}s`
                      }}
                    >
                      <div 
                        className="orbit-node-inner"
                        style={{
                          animation: `spin-ring-counter ${ring.duration}s linear infinite ${ring.reverse ? 'reverse' : 'normal'}`
                        }}
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
