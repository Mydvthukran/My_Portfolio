import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const shieldLogs = [
  { type: 'system', text: 'INITIATING OVERRIDE PROTOCOL...' },
  { type: 'system', text: 'DECRYPTING S.H.I.E.L.D. MAINFRAME...' },
  { type: 'success', text: 'ACCESS GRANTED: CLEARANCE LEVEL OMEGA' },
  { type: 'blank' },
  { type: 'command', text: 'query_target --id="MANISH_YADAV"' },
  { type: 'data', key: 'DESIGNATION', value: 'Developer / Specialist' },
  { type: 'data', key: 'LOCATION', value: 'Haryana, Sector-R (India)' },
  { type: 'data', key: 'EXPERTISE', value: 'Cyber Security, Frontend Ops' },
  { type: 'data', key: 'THREAT_LEVEL', value: 'Maximum (Highly Skilled)' },
  { type: 'blank' },
  { type: 'command', text: 'extract_directive' },
  { type: 'success', text: 'DIRECTIVE: "Learn something new every single day."' },
  { type: 'cursor' },
];

const ShieldTerminal = ({ isInView }) => {
  const [lines, setLines] = useState([]);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;
    let isActive = true;
    let idx = 0;
    const total = shieldLogs.length;

    const addLine = () => {
      if (!isActive) return;
      const currentIdx = idx; // Capture current index
      if (currentIdx >= total) return;

      const currentLine = shieldLogs[currentIdx];
      if (!currentLine) return; // Extra safety check

      setLines((prev) => [...prev, currentLine]);
      idx++;

      if (idx >= total) return; // Stop if we just added the last line
      
      const delay = currentLine.type === 'command' ? 800 : currentLine.type === 'blank' ? 200 : 150;
      setTimeout(addLine, delay);
    };
    setTimeout(() => { if (isActive) addLine(); }, 500);
    return () => { isActive = false; };
  }, [isInView]);

  return (
    <div className="avengers-terminal">
      <div className="avengers-terminal-header">
        <span>JARVIS // OVERRIDE // CLASSIFIED</span>
        <div className="scanline"></div>
      </div>
      <div className="avengers-terminal-body">
        {lines.map((line, i) => {
          if (line.type === 'blank') return <div key={i} style={{ height: '10px' }} />;
          if (line.type === 'system') return <div key={i} className="log-system">[{new Date().toLocaleTimeString()}] {line.text}</div>;
          if (line.type === 'success') return <div key={i} className="log-success">{line.text}</div>;
          if (line.type === 'command') return <div key={i} className="log-command"><span>C:\&gt;</span> {line.text}</div>;
          if (line.type === 'data') return (
            <div key={i} className="log-data">
              <span className="log-key">{line.key}:</span> <span className="log-value">{line.value}</span>
            </div>
          );
          if (line.type === 'cursor') return <div key={i} className="log-cursor">_</div>;
          return null;
        })}
      </div>
    </div>
  );
};

const AvengersAbout = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="section avengers-about-section" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="avengers-section-label">
          <span className="pulsing-dot" />
          TARGET PROFILE
        </div>

        <div className="avengers-dossier-grid">
          
          <motion.div 
            className="avengers-dossier-panel terminal-panel jarvis-monitor-container"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="jarvis-monitor-frame">
              <div className="jarvis-monitor-screen">
                <ShieldTerminal isInView={isInView} />
              </div>
              <div className="jarvis-monitor-stand"></div>
              <div className="jarvis-monitor-base"></div>
            </div>
          </motion.div>

          <motion.div 
            className="avengers-dossier-panel info-panel"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="dossier-watermark">CLASSIFIED</div>
            <h2 className="dossier-heading">Subject: Manish Yadav</h2>
            <p className="dossier-text">
              A highly capable 3rd-year Computer Science operative. Specializing in UI/UX architecture and Cyber Security. Known for blending technical precision with aggressive, highly-performant interface design.
            </p>
            <p className="dossier-text">
              Current operational status: <strong>LEARNING AND ADAPTING</strong>. Threat level assessment suggests subject is rapidly expanding capabilities in React, Python, and advanced 3D web rendering.
            </p>
            
            <div className="dossier-stats">
              <div className="dossier-stat">
                <span className="stat-num">11+</span>
                <span className="stat-desc">SUCCESSFUL MISSIONS</span>
              </div>
              <div className="dossier-stat">
                <span className="stat-num">15+</span>
                <span className="stat-desc">WEAPONIZED TECH</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AvengersAbout;
