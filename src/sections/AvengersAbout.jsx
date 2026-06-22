import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import myPic from '../assets/me/hero-cinematic.webp';

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

        {/* Flying Iron Man */}
        <motion.img 
          src="/ironman.png" 
          alt="Iron Man Flying"
          className="ironman-flying"
          initial={{ x: 1000, y: 500, scale: 0.5, opacity: 0 }}
          animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.5 
          }}
        />

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
            className="avengers-dossier-panel dossier-file-panel"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="dossier-spine">
              <span className="spine-text">TOP SECRET // OMEGA ONLY</span>
              <div className="spine-barcode"></div>
            </div>
            
            <div className="dossier-content-wrapper">
              <div className="dossier-header-top">
                S.H.I.E.L.D. INTELLIGENCE DOSSIER
                <div className="header-line"></div>
              </div>
              
              <div className="dossier-meta">
                <div className="meta-line"><span>FILE NO. :</span> MY-1999-IND</div>
                <div className="meta-line"><span>CLEARANCE LEVEL :</span> <span className="text-red">OMEGA</span></div>
                <div className="meta-line"><span>STATUS :</span> <span className="text-red">ACTIVE</span></div>
                <div className="meta-line"><span>DATE :</span> 23 MAY 2025</div>
              </div>
              
              <div className="dossier-classified-stamp-box">
                <div className="stamp-border">
                  <span>CLASSIFIED</span>
                </div>
              </div>
              
              <div className="dossier-main-body">
                 <div className="dossier-left-col">
                    <div className="dossier-subject-header">
                       <h3>SUBJECT:</h3>
                       <h1>MANISH YADAV</h1>
                       <div className="barcode-horizontal"></div>
                    </div>
                    
                    <div className="dossier-section">
                      <h4>OVERVIEW</h4>
                      <p>A highly capable 3rd-year Computer Science operative. Specilization in Fullstack web development and Cyber Security. Known for blending technical precision with aggressive, highly-performant interface design.</p>
                    </div>
                    
                    <div className="dossier-section">
                      <h4>OPERATIONAL SUMMARY</h4>
                      <p>Current operational status: <span className="text-red">LEARNING AND ADAPTING</span>. Threat level assessment suggests subject is rapidly expanding capabilities in React, Python, and advanced 3D web rendering.</p>
                    </div>
                    
                    <div className="dossier-section">
                      <h4>KEY SPECIALIZATIONS</h4>
                      <ul className="dossier-list">
                        <li><span>&gt;</span>FullStack Operations</li>
                        <li><span>&gt;</span> Cyber Security</li>
                        <li><span>&gt;</span> UI/UX Architecture</li>
                        <li><span>&gt;</span> 3D Web Development</li>
                        <li><span>&gt;</span> Problem Solving</li>
                      </ul>
                    </div>
                 </div>
                 
                 <div className="dossier-right-col">
                    <div className="dossier-photo-container">
                      <img src={myPic} alt="Subject Manish Yadav" className="dossier-photo" loading="lazy" />
                      <div className="dossier-shield-watermark-overlay"></div>
                    </div>
                 </div>
              </div>
              
              <div className="dossier-footer">
                 <div className="dossier-stats-box">
                   <div className="stat-block">
                     <span className="stat-num">11+</span>
                     <span className="stat-label">SUCCESSFUL MISSIONS</span>
                   </div>
                   <div className="stat-divider"></div>
                   <div className="stat-block">
                     <span className="stat-num">15+</span>
                     <span className="stat-label">WEAPONIZED TECH</span>
                   </div>
                 </div>
                 
                 <div className="dossier-auth">
                   <div className="auth-signature">Nick Fury</div>
                   <div className="auth-text">
                     AUTHORIZED BY : <br/>
                     NICK FURY <br/>
                     DIRECTOR, S.H.I.E.L.D.
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AvengersAbout;
