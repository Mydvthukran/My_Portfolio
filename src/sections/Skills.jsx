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
            {/* Spiderman Web Overlay */}
            {themeState === 'snapped' && (
              <div className="spider-web-overlay">
                <svg viewBox="0 0 100 100" className="spider-web-svg">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(200,50,50,0.2)" strokeWidth="0.5"/>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(200,50,50,0.2)" strokeWidth="0.5"/>
                  <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(200,50,50,0.2)" strokeWidth="0.5"/>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <line key={deg} x1="50" y1="50" x2="50" y2="5" stroke="rgba(200,50,50,0.2)" strokeWidth="0.5" transform={`rotate(${deg} 50 50)`} />
                  ))}
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
                  const isDusted = themeState === 'snapped' && i % 2 === 0;

                  return (
                    <div 
                      key={skill}
                      className={`orbit-node-wrapper ${isDusted ? 'dusted' : ''}`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`
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
