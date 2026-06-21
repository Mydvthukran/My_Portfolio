import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import '../classified.css';

// SVG Icons
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="classified-icon-moon">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"></path>
  </svg>
);

const SpiderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="classified-hero-icon">
    <path d="M12 4v4M12 16v4M8 8h8M6 12h12" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="4"/>
    <path d="M9 10L5 6M15 10l4-4M9 14l-4 4M15 14l4 4" strokeLinecap="round"/>
  </svg>
);

const ArcReactorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="classified-hero-icon">
    <circle cx="12" cy="12" r="8"/>
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 4v4M12 16v4M4 12h4M16 12h4"/>
    <path d="M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8"/>
  </svg>
);

const HammerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="classified-hero-icon">
    <path d="M10 12l-4 4 4 4 4-4M14 8l-4 4" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="13" y="3" width="8" height="10" rx="2" transform="rotate(45 17 8)"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="classified-hero-icon">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="7"/>
    <path d="M12 7l1.5 4.5H18l-3.5 2.5 1.5 4.5-4-3-4 3 1.5-4.5L6 11.5h4.5z" fill="currentColor"/>
  </svg>
);

const AvengersProjects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React', 'Python', 'AI', 'Full Stack'];

  const projects = [
    {
      title: 'ClassTrack — Smart Schedule Analyzer',
      status: 'CLEARANCE LEVEL 4',
      description: 'An intelligent schedule analyzer built with Claude AI that detects study blocks, highlights schedule conflicts, and calculates workload scores. Features a clean UI with cross-device responsiveness.',
      technologies: ['React', 'Vite', 'CSS'],
      link: 'https://class-track-seven.vercel.app/',
      github: 'https://github.com/Mydvthukran/ClassTrack',
      iconType: 'spider'
    },
    {
      title: 'Byte Forge Club Website',
      status: 'CLEARANCE LEVEL 2',
      description: 'A responsive coding club website featuring interactive 3D elements that react to cursor movement. Built with modern web technologies and Three.js for an immersive experience.',
      technologies: ['React', 'CSS', 'JavaScript'],
      link: 'https://byteforgefinal.vercel.app/',
      github: 'https://github.com/Mydvthukran/byteforgefinal',
      iconType: 'arc-reactor'
    },
    {
      title: 'Weather Forecasting Dashboard',
      status: 'CLEARANCE LEVEL 3',
      description: 'A responsive weather dashboard with real-time data visualization, interactive maps, and a clean UI that adapts seamlessly to all screen sizes.',
      technologies: ['React', 'CSS', 'JavaScript'],
      link: 'https://weather-app-xi-two-78.vercel.app/',
      github: 'https://github.com/Mydvthukran/weather-app',
      iconType: 'hammer'
    },
    {
      title: 'Lost & Found Platform',
      status: 'CLASSIFIED',
      description: 'A full-stack lost and found platform built with Python, enabling users to report and search for lost items with an intuitive interface. Features search, filtering, and real-time updates.',
      technologies: ['Python', 'Full Stack'],
      github: 'https://github.com/Mydvthukran/lostandfound',
      iconType: 'star'
    },
    {
      title: 'EduSync AI — Hackathon Project',
      status: 'CLEARANCE LEVEL 5',
      description: 'An AI-powered educational platform built during a hackathon, featuring a doubt solver with advanced keyword matching, quizzes for all courses, and an offline-first architecture.',
      technologies: ['TypeScript', 'React', 'AI', 'Vite'],
      github: 'https://github.com/Mydvthukran/hackthon.3',
      iconType: 'arc-reactor'
    },
    {
      title: 'Instant BI Assistant',
      status: 'CLEARANCE LEVEL 5',
      description: 'A Conversational AI for Instant Business Intelligence Dashboards. Uses natural language processing with Google Gemini API to generate dynamic, interactive data visualizations.',
      technologies: ['React', 'FastAPI', 'Python', 'Gemini AI'],
      github: 'https://github.com/Mydvthukran/hackthon.3',
      iconType: 'spider'
    },
    {
      title: 'Portfolio Website',
      status: 'CLEARANCE OMEGA',
      description: 'A cinematic personal portfolio showcasing technical skills, projects, and professional journey. Features atmospherics, parallax scrolling, film grain texture, and editorial design.',
      technologies: ['React', 'CSS', 'JavaScript', 'GSAP', 'Framer Motion'],
      link: 'https://my-pod-foliyo.vercel.app',
      github: 'https://github.com/Mydvthukran/My_PodFoliyo',
      iconType: 'star'
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'React') return project.technologies.includes('React');
    if (activeFilter === 'Python') return project.technologies.includes('Python');
    if (activeFilter === 'AI') return project.technologies.includes('AI') || project.technologies.includes('Gemini AI');
    if (activeFilter === 'Full Stack') return project.technologies.includes('Full Stack') || project.technologies.includes('FastAPI');
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'spider': return <SpiderIcon />;
      case 'arc-reactor': return <ArcReactorIcon />;
      case 'hammer': return <HammerIcon />;
      case 'star': return <StarIcon />;
      default: return <MoonIcon />;
    }
  };

  return (
    <section className="section classified-projects-section" id="projects" ref={sectionRef}>
      {/* Background layer for image */}
      <div className="classified-bg-image"></div>
      
      <div className="section-container classified-container">
        
        {/* Header matching screenshot */}
        <div className="classified-header">
          <p className="classified-subtitle">S.H.I.E.L.D. DATABASE</p>
          <h2 className="classified-title">CLASSIFIED FILES</h2>
          <div className="classified-moon-divider">
            <MoonIcon />
          </div>
        </div>

        <motion.div 
          className="classified-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              className={`classified-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {activeFilter === f && <span className="classified-filter-moon"><MoonIcon /></span>}
              {f.toUpperCase()}
            </button>
          ))}
        </motion.div>

        <div className="classified-projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className="classified-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Border Decorations */}
                <div className="classified-border-corner top-left"></div>
                <div className="classified-border-corner top-right"></div>
                <div className="classified-border-corner bottom-left"></div>
                <div className="classified-border-corner bottom-right"></div>
                
                {/* Card Inner Background Effect */}
                <div className={`classified-card-bg effect-${project.iconType}`}></div>

                {/* Card Content */}
                <div className="classified-card-inner">
                  
                  {/* Top Row: Clearance, Icon, Links */}
                  <div className="classified-card-top">
                    <div className="classified-clearance">
                      {project.status.split(' ').map((word, idx) => (
                        <div key={idx}>{word}</div>
                      ))}
                    </div>
                    
                    <div className="classified-center-icon">
                      {getIcon(project.iconType)}
                    </div>
                    
                    <div className="classified-links">
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">ACCESS_REPO</a>}
                      {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">LIVE_FEED</a>}
                    </div>
                  </div>

                  {/* Body: Title and Desc */}
                  <div className="classified-card-body">
                    <h3>{project.title.toUpperCase()}</h3>
                    <div className="classified-divider"></div>
                    <p>{project.description}</p>
                  </div>

                  {/* Footer: Tags */}
                  <div className="classified-tech-stack">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="classified-tech-tag">{tech.toUpperCase()}</span>
                    ))}
                  </div>

                  {/* Bottom decor moon on specific cards (e.g. index 1 and 3 in the screenshot have little moons) */}
                  {i % 2 !== 0 && (
                    <div className="classified-card-bottom-decor">
                      <MoonIcon />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Hieroglyphs */}
        <div className="classified-footer-decor">
          <div className="hieroglyph-line left"></div>
          <div className="hieroglyph-center">
            <MoonIcon />
          </div>
          <div className="hieroglyph-line right"></div>
        </div>

      </div>
    </section>
  );
};

export default AvengersProjects;
