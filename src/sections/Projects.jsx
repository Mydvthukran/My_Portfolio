import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const projects = [
    {
      title: 'ClassTrack — Smart Schedule Analyzer',
      status: 'Completed',
      description: 'An intelligent schedule analyzer built with Claude AI that detects study blocks, highlights schedule conflicts, and calculates workload scores. Features a clean UI with cross-device responsiveness.',
      technologies: ['React', 'Vite', 'CSS', 'JavaScript', 'AI'],
      link: 'https://class-track-seven.vercel.app/',
      github: 'https://github.com/Mydvthukran/ClassTrack',
    },
    {
      title: 'Byte Forge Club Website',
      status: 'Completed',
      description: 'A responsive coding club website featuring interactive 3D elements that react to cursor movement. Built with modern web technologies and Three.js for an immersive experience.',
      technologies: ['React', 'CSS', 'JavaScript', 'Three.js'],
      link: 'https://byteforgefinal.vercel.app/',
      github: 'https://github.com/Mydvthukran/byteforgefinal',
    },
    {
      title: 'Weather Forecasting Dashboard',
      status: 'Completed',
      description: 'A responsive weather dashboard with real-time data visualization, interactive maps, and a clean UI that adapts seamlessly to all screen sizes.',
      technologies: ['React', 'CSS', 'JavaScript', 'Weather API'],
      link: 'https://weather-app-xi-two-78.vercel.app/',
      github: 'https://github.com/Mydvthukran/weather-app',
    },
    {
      title: 'Lost & Found Platform',
      status: 'Completed',
      description: 'A full-stack lost and found platform built with Python, enabling users to report and search for lost items with an intuitive interface. Features search, filtering, and real-time updates.',
      technologies: ['Python', 'Full Stack', 'Database'],
      github: 'https://github.com/Mydvthukran/lostandfound',
    },
    {
      title: 'EduSync AI — Hackathon Project',
      status: 'Completed',
      description: 'An AI-powered educational platform built during a hackathon, featuring a doubt solver with advanced keyword matching, quizzes for all courses, and an offline-first architecture.',
      technologies: ['TypeScript', 'React', 'AI', 'Vite'],
      github: 'https://github.com/Mydvthukran/hackthon.3',
    },
    {
      title: 'Instant BI Assistant',
      status: 'Completed',
      description: 'A Conversational AI for Instant Business Intelligence Dashboards. Uses natural language processing with Google Gemini API to generate dynamic, interactive data visualizations.',
      technologies: ['React', 'FastAPI', 'Python', 'Gemini AI'],
      github: 'https://github.com/Mydvthukran/hackthon.3',
    },
    {
      title: 'Portfolio Website',
      status: 'Completed',
      description: 'A cinematic personal portfolio showcasing technical skills, projects, and professional journey. Features atmospherics, parallax scrolling, film grain texture, and editorial design.',
      technologies: ['React', 'CSS', 'JavaScript', 'GSAP', 'Framer Motion'],
      link: 'https://my-pod-foliyo.vercel.app',
      github: 'https://github.com/Mydvthukran/My_PodFoliyo',
    },
  ];

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle label="Portfolio" title="Featured" titleAccent="Work" />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.07 }}
            >
              <div className="project-header">
                <div className="project-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label="GitHub">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label="Live Demo">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <span className="project-status">{project.status}</span>
              <p className="project-description">{project.description}</p>

              <div className="project-tech-stack">
                {project.technologies.map((tech, j) => (
                  <span key={j} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="github-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a href="https://github.com/Mydvthukran" target="_blank" rel="noopener noreferrer" className="github-cta-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
