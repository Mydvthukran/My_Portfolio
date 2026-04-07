import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/* Interactive typing terminal component */
const TerminalAbout = ({ isInView }) => {
  const [lines, setLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const hasStarted = useRef(false);

  const terminalLines = [
    { type: 'command', text: 'whoami' },
    { type: 'output', text: 'Manish Yadav — A curious person' },
    { type: 'blank' },
    { type: 'command', text: 'cat about.json' },
    { type: 'json', key: 'location', value: '"Rewari, Haryana, India"' },
    { type: 'json', key: 'education', value: '"2nd Year CSE — SIET Panchkula"' },
    { type: 'json', key: 'specialization', value: '"Cyber Security"' },
    { type: 'json', key: 'passion', value: '"Where code meets cinema"' },
    { type: 'json', key: 'status', value: '"Learning"' },
    { type: 'blank' },
    { type: 'command', text: 'ls skills/' },
    { type: 'output', text: 'React · JavaScript · CSS · Git · Python · C++ · curiosity' },
    { type: 'blank' },
    { type: 'command', text: 'echo $MOTTO' },
    { type: 'output', text: '"Learn something new every single day."' },
    { type: 'cursor' },
  ];

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    let idx = 0;
    const total = terminalLines.length;
    const linesRef = [...terminalLines]; // snapshot

    const addLine = () => {
      if (idx >= total) return;
      const currentLine = linesRef[idx];
      setLines((prev) => [...prev, currentLine]);
      idx++;
      if (idx >= total) return;
      const delay = currentLine.type === 'command' ? 600 : currentLine.type === 'blank' ? 200 : 120;
      setTimeout(addLine, delay);
    };
    setTimeout(addLine, 500);
  }, [isInView]);

  return (
    <motion.div
      className="terminal-card"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="terminal-title">manish@portfolio:~</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => {
          if (line.type === 'blank') return <div key={i} style={{ height: '8px' }} />;
          if (line.type === 'command') {
            return (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">❯</span>
                <span className="terminal-command">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'output') {
            return (
              <div key={i} className="terminal-output">{line.text}</div>
            );
          }
          if (line.type === 'json') {
            return (
              <div key={i} className="terminal-output">
                <span className="terminal-key">{line.key}</span>: <span className="terminal-value">{line.value}</span>
              </div>
            );
          }
          if (line.type === 'cursor') {
            return (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">❯</span>
                <span className="terminal-cursor-blink" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Manish_Yadav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { value: '11+', label: 'Projects' },
    { value: '15+', label: 'Technologies' },
    { value: '2nd', label: 'Year CSE' },
  ];

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="about-grid">
          {/* Interactive terminal instead of static photo */}
          <TerminalAbout isInView={isInView} />

          {/* Content */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">
              <span />
              About
            </div>

            <h2>
              Building the future, <em>one pixel at a time</em>
            </h2>

            <p>
              I'm a second-year Computer Science student at SIET Panchkula with a minor in{' '}
              <strong>Cyber Security</strong>. I believe in the intersection of code and design — 
              where technical precision meets visual storytelling.
            </p>

            <p>
              My journey is driven by an obsession with <strong>learning something new every day</strong>.
              From crafting pixel-perfect user interfaces with React to exploring the depths of 
              network security, I thrive on challenges that push boundaries.
            </p>

            <p>
              When I'm not deep in code, you'll find me participating in hackathons,
              experimenting, and collaborating with developers who share
              the same passion for building remarkable digital experiences.
            </p>

            {/* Stats */}
            <div className="about-stats">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.12 }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="resume-btn"
              onClick={handleDownloadResume}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
