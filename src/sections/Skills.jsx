import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import SectionTitle from '../components/SectionTitle';


const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '✨',
    skills: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Three.js']
  },
  {
    id: 'backend',
    label: 'Backend & Database',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'REST API Design']
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: '💻',
    skills: ['JavaScript', 'TypeScript', 'C++', 'Python']
  },
  {
    id: 'cloud',
    label: 'Cloud & Deployment',
    icon: '☁️',
    skills: ['Vercel', 'Netlify', 'Render', 'Google Cloud', 'AWS (basics)']
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'VS Code', 'n8n', 'Ollama']
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const currentCategory = skillCategories.find(c => c.id === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Make the display glass float slightly slower than the tabs
      gsap.to('.skills-display-glass', {
        y: -40,
        scrollTrigger: {
          trigger: '.skills-interactive-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
      gsap.to('.skills-tabs', {
        y: 40,
        scrollTrigger: {
          trigger: '.skills-interactive-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>

      <div className="section-container">
        <SectionTitle label="Expertise" title="Technical" titleAccent="Arsenal" />

        <div className="skills-interactive-container">
          {/* Left Side: Tabs */}
          <motion.div 
            className="skills-tabs"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`skill-tab-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-label">{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Right Side: Skill Display */}
          <motion.div 
            className="skills-display-area"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="skills-display-glass">
              <h3 className="active-category-title">
                {currentCategory.icon} {currentCategory.label}
              </h3>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="skills-grid-modern"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentCategory.skills.map((skill, index) => (
                    <motion.div 
                      key={skill} 
                      className="skill-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04, duration: 0.3, type: "spring", bounce: 0.4 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(200, 169, 125, 0.15)' }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
