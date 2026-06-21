import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const AvengersProjects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React', 'Python', 'AI', 'Full Stack'];

  // Stark Industries / SHIELD modified data
  const projects = [
    {
      title: 'ClassTrack — Smart Schedule Analyzer',
      status: 'CLEARANCE: LEVEL 4',
      description: 'An intelligent schedule analyzer built with Claude AI that detects study blocks, highlights schedule conflicts, and calculates workload scores. Features a clean UI with cross-device responsiveness.',
      technologies: ['React', 'Vite', 'CSS', 'JavaScript', 'AI'],
      link: 'https://class-track-seven.vercel.app/',
      github: 'https://github.com/Mydvthukran/ClassTrack',
    },
    {
      title: 'Byte Forge Club Website',
      status: 'CLEARANCE: LEVEL 2',
      description: 'A responsive coding club website featuring interactive 3D elements that react to cursor movement. Built with modern web technologies and Three.js for an immersive experience.',
      technologies: ['React', 'CSS', 'JavaScript', 'Three.js'],
      link: 'https://byteforgefinal.vercel.app/',
      github: 'https://github.com/Mydvthukran/byteforgefinal',
    },
    {
      title: 'Weather Forecasting Dashboard',
      status: 'CLEARANCE: LEVEL 3',
      description: 'A responsive weather dashboard with real-time data visualization, interactive maps, and a clean UI that adapts seamlessly to all screen sizes.',
      technologies: ['React', 'CSS', 'JavaScript', 'Weather API'],
      link: 'https://weather-app-xi-two-78.vercel.app/',
      github: 'https://github.com/Mydvthukran/weather-app',
    },
    {
      title: 'Lost & Found Platform',
      status: 'CLASSIFIED',
      description: 'A full-stack lost and found platform built with Python, enabling users to report and search for lost items with an intuitive interface. Features search, filtering, and real-time updates.',
      technologies: ['Python', 'Full Stack', 'Database'],
      github: 'https://github.com/Mydvthukran/lostandfound',
    },
    {
      title: 'EduSync AI — Hackathon Project',
      status: 'CLEARANCE: LEVEL 5',
      description: 'An AI-powered educational platform built during a hackathon, featuring a doubt solver with advanced keyword matching, quizzes for all courses, and an offline-first architecture.',
      technologies: ['TypeScript', 'React', 'AI', 'Vite'],
      github: 'https://github.com/Mydvthukran/hackthon.3',
    },
    {
      title: 'Instant BI Assistant',
      status: 'CLEARANCE: LEVEL 5',
      description: 'A Conversational AI for Instant Business Intelligence Dashboards. Uses natural language processing with Google Gemini API to generate dynamic, interactive data visualizations.',
      technologies: ['React', 'FastAPI', 'Python', 'Gemini AI'],
      github: 'https://github.com/Mydvthukran/hackthon.3',
    },
    {
      title: 'Portfolio Website',
      status: 'CLEARANCE: OMEGA',
      description: 'A cinematic personal portfolio showcasing technical skills, projects, and professional journey. Features atmospherics, parallax scrolling, film grain texture, and editorial design.',
      technologies: ['React', 'CSS', 'JavaScript', 'GSAP', 'Framer Motion'],
      link: 'https://my-pod-foliyo.vercel.app',
      github: 'https://github.com/Mydvthukran/My_PodFoliyo',
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

  return (
    <section className="section avengers-projects-section" id="projects" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle label="S.H.I.E.L.D. Database" title="Classified" titleAccent="Files" />

        <motion.div 
          className="avengers-project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              className={`avengers-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              [ {f.toUpperCase()} ]
            </button>
          ))}
        </motion.div>

        <div className="avengers-projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className="avengers-project-card"
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: i * 0.1 }}
              >
                <div className="hologram-scanline"></div>
                <div className="avengers-project-header">
                  <span className="avengers-project-status">{project.status}</span>
                  <div className="avengers-project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="avengers-link">ACCESS_REPO</a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="avengers-link">LIVE_FEED</a>
                    )}
                  </div>
                </div>

                <h3 className="avengers-project-title">{project.title.toUpperCase()}</h3>
                <p className="avengers-project-description">{project.description}</p>

                <div className="avengers-tech-stack">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="avengers-tech-tag">{tech.toUpperCase()}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AvengersProjects;
