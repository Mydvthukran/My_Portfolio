import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

import HtmlLogo from '../assets/logos/html.svg';
import CssLogo from '../assets/logos/css.svg';
import JavascriptLogo from '../assets/logos/javascript.svg';
import ReactLogo from '../assets/logos/react.png';
import GitLogo from '../assets/logos/git.svg';
import GithubLogo from '../assets/logos/github.png';
import PythonLogo from '../assets/logos/python.svg';
import CLogo from '../assets/logos/c.png';
import CppLogo from '../assets/logos/c++.png';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setBarsAnimated(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const skills = [
    { name: 'HTML', logo: HtmlLogo, level: 90 },
    { name: 'CSS', logo: CssLogo, level: 85 },
    { name: 'JavaScript', logo: JavascriptLogo, level: 80 },
    { name: 'React', logo: ReactLogo, level: 75 },
    { name: 'Git', logo: GitLogo, level: 70 },
    { name: 'GitHub', logo: GithubLogo, level: 70 },
    { name: 'Python', logo: PythonLogo, level: 65 },
    { name: 'C', logo: CLogo, level: 60 },
    { name: 'C++', logo: CppLogo, level: 55 },
  ];

  const currentlyLearning = [
    { name: 'Next.js', icon: '⚡' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Three.js', icon: '🎮' },
  ];

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle label="Expertise" title="Technical" titleAccent="Arsenal" />

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div className="skill-header">
                <div className="skill-info">
                  <div className="skill-icon">
                    <img src={skill.logo} alt={skill.name} />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-level-text">{skill.level}%</span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{ width: barsAnimated ? `${skill.level}%` : '0%' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="learning-subtitle">
          <SectionTitle label="Growing" title="Currently" titleAccent="Exploring" />
        </div>

        <div className="learning-grid">
          {currentlyLearning.map((item, i) => (
            <motion.div
              key={item.name}
              className="learning-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="learning-card-inner">
                <div className="learning-icon">{item.icon}</div>
                <div className="learning-name">{item.name}</div>
                <div className="learning-status">In Progress</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
