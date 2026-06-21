import { useState, useEffect, useCallback } from 'react';

const BatIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 100 50" fill="currentColor">
    <path d="M50 48s-15-20-30-25c-8-3-20 2-20 2s5-15 20-20c10-3 15 5 15 5s2-5 6-8l3 5 6-5 3 8s5-8 15-5c15 5 20 20 20 20s-12-5-20-2c-15 5-30 25-30 25z"/>
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          const sections = ['home', 'about', 'skills', 'projects', 'contact'];
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`navbar navbar-batman ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <a className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} href="#home">
          <BatIcon className="w-8 h-4" style={{ width: '40px', height: '20px' }} />
          Manish
        </a>

        <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <a
              key={link.id}
              className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              href={`#${link.id}`}
            >
              {link.label}
              {activeSection === link.id && (
                <div className="nav-active-bat">
                  <BatIcon style={{ width: '100%', height: '100%' }} />
                </div>
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
