import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

// Flattened skill list (24 total items)
const skillsData = [
  'React.js', 'Node.js', 'TypeScript', 'Python', 'Three.js', 
  'JavaScript', 'MongoDB', 'Tailwind', 'C++', 'Git', 
  'HTML5', 'CSS3', 'Express.js', 'Firebase', 'REST API', 
  'Vercel', 'Netlify', 'Render', 'Google Cloud', 'AWS', 
  'GitHub', 'VS Code', 'n8n', 'Ollama'
];

const N = 8; // Number of spokes
const M = 3; // Number of rings
const RING_RADII = [160, 280, 420]; // Pixel radii for the concentric rings
const SVG_SIZE = 1000;
const CENTER = SVG_SIZE / 2;

const AvengersSkills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

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

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 150, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const renderSpiderWeb = () => {
    let paths = [];
    for (let i = 0; i < N; i++) {
      const angle = (i * 360) / N;
      const rad = angle * Math.PI / 180;
      const x = CENTER + Math.cos(rad) * RING_RADII[M - 1];
      const y = CENTER + Math.sin(rad) * RING_RADII[M - 1];
      paths.push(<line key={`spoke-${i}`} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />);
    }

    for (let r = 0; r < M; r++) {
      const radius = RING_RADII[r];
      const sagRadius = radius * 0.85; 
      let d = "";
      for (let i = 0; i < N; i++) {
        const angle1 = (i * 360) / N;
        const angle2 = ((i + 1) * 360) / N;
        const rad1 = angle1 * Math.PI / 180;
        const rad2 = angle2 * Math.PI / 180;
        const midRad = ((angle1 + angle2) / 2) * Math.PI / 180;
        
        const x1 = CENTER + Math.cos(rad1) * radius;
        const y1 = CENTER + Math.sin(rad1) * radius;
        const x2 = CENTER + Math.cos(rad2) * radius;
        const y2 = CENTER + Math.sin(rad2) * radius;
        
        const cx = CENTER + Math.cos(midRad) * sagRadius;
        const cy = CENTER + Math.sin(midRad) * sagRadius;
        
        if (i === 0) d += `M ${x1} ${y1} `;
        d += `Q ${cx} ${cy} ${x2} ${y2} `;
      }
      paths.push(<path key={`ring-${r}`} d={d} stroke="rgba(200, 169, 125, 0.4)" strokeWidth="1.5" fill="none" />);
    }
    return paths;
  };

  const getWebSkillPosition = (index) => {
    const ringIndex = index % M;
    const spokeIndex = Math.floor(index / M);
    let angle = (spokeIndex * 360) / N;
    let radius = RING_RADII[ringIndex];
    
    if (angle === 45 && ringIndex === M - 1) {
      radius -= 60;
      angle += 15;
    }
    const rad = angle * Math.PI / 180;
    return { x: CENTER + Math.cos(rad) * radius, y: CENTER + Math.sin(rad) * radius };
  };

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle label="Expertise" title="Technical" titleAccent="Arsenal" />

        <div 
          className="orb-weaver-viewport"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="orb-weaver-system"
            style={{ rotateX, rotateY, y: yParallax }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <svg className="orb-weaver-svg" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} preserveAspectRatio="xMidYMid meet">
              {renderSpiderWeb()}
            </svg>
            <div className="orbit-core">
              <div className="core-glow"></div>
              <span>Skills</span>
            </div>
            {skillsData.map((skill, index) => {
              const { x, y } = getWebSkillPosition(index);
              const staticRotate = -6 + Math.random() * 12;
              const dropDelay = index * 0.05;
              
              return (
                <motion.div 
                  key={skill}
                  className="orb-node-wrapper"
                  style={{ left: `${(x / SVG_SIZE) * 100}%`, top: `${(y / SVG_SIZE) * 100}%` }}
                  variants={{
                    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -800, scale: 0.5 },
                    visible: prefersReducedMotion 
                      ? { opacity: 1, transition: { duration: 0.5 } }
                      : { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12, delay: dropDelay } }
                  }}
                >
                  <motion.div 
                    className="orbit-node-inner"
                    style={{ rotate: staticRotate }}
                    animate={prefersReducedMotion ? {} : { y: [0, -3, 0], rotate: [staticRotate, staticRotate + 1, staticRotate] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {skill}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AvengersSkills;
