import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';


const terminalLines = [
  { type: 'command', text: 'whoami' },
    { type: 'output', text: 'Manish Yadav — A curious person' },
    { type: 'blank' },
    { type: 'command', text: 'cat about.json' },
    { type: 'json', key: 'location', value: '"Rewari, Haryana, India"' },
    { type: 'json', key: 'education', value: '"3rd Year CSE — SIET Panchkula"' },
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

/* Interactive typing terminal component */
const TerminalAbout = ({ isInView }) => {
  const [lines, setLines] = useState([]);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    let isActive = true;

    let idx = 0;
    const total = terminalLines.length;
    const linesRef = [...terminalLines]; // snapshot

    const addLine = () => {
      if (!isActive || idx >= total) return;
      const currentLine = linesRef[idx];
      setLines((prev) => [...prev, currentLine]);
      idx++;
      if (idx >= total) return;
      const delay = currentLine.type === 'command' ? 600 : currentLine.type === 'blank' ? 200 : 120;
      setTimeout(addLine, delay);
    };
    setTimeout(() => { if (isActive) addLine(); }, 500);

    return () => { isActive = false; };
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
    { value: '3rd', label: 'Year CSE' },
  ];

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="section-label">
          <span />
          About Me
        </div>

        <div className="bento-grid">
          
          {/* Bento Card 1: The Terminal */}
          <motion.div 
            className="bento-card bento-terminal"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TerminalAbout isInView={isInView} />
          </motion.div>

          {/* Bento Card 2: The Bio */}
          <motion.div 
            className="bento-card bento-bio"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>
              Building the future, <br/><em>one pixel at a time</em>
            </h2>
            <p>
              I'm a third-year Computer Science student at SIET Panchkula with a minor in{' '}
              <strong>Cyber Security</strong>. I believe in the intersection of code and design — 
              where technical precision meets visual storytelling.
            </p>
            <p>
              My journey is driven by an obsession with <strong>learning something new every day</strong>.
              From crafting pixel-perfect user interfaces with React to exploring the depths of 
              network security, I thrive on challenges that push boundaries.
            </p>
          </motion.div>

          {/* Bento Card 3: The Stats */}
          <motion.div 
            className="bento-card bento-stats"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="bento-stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Bento Card 4: Resume Download */}
          <motion.div 
            className="bento-card bento-resume"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleDownloadResume}
          >
            <div className="resume-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div className="resume-text">
              <span>Grab a copy</span>
              <strong>Download Resume</strong>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
