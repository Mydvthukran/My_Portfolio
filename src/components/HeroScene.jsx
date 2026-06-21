import { useState, useCallback, useMemo, useRef } from 'react';

const createDrop = (id) => ({
  id,
  x: 10 + Math.random() * 85,
  yStart: -20 - Math.random() * 100, // Stagger initial Y
  length: 12 + Math.random() * 20,
  duration: 0.8 + Math.random() * 0.6, // Animation duration
  delay: Math.random() * 2, // Stagger animation start
  opacity: 0.05 + Math.random() * 0.15,
  width: 1 + Math.random() * 1.5,
});

const HeroScene = () => {
  const maxDrops = 100;
  
  // Memoize static drops so they don't trigger re-renders
  const staticDrops = useMemo(() => {
    const initial = [];
    for (let i = 0; i < maxDrops; i++) {
      initial.push(createDrop(i));
    }
    return initial;
  }, []);

  const [splashes, setSplashes] = useState([]);
  const nextSplashId = useRef(0);

  // Click to splash
  const splashDrop = useCallback((id, x) => {
    // We can't know the exact Y in CSS, so we just use bottom area
    const splashY = 85 + Math.random() * 10;
    
    // Create splash particles
    const splashId = nextSplashId.current++;
    setSplashes(prev => [...prev, { id: splashId, x, y: splashY }]);

    // Remove splash after animation
    setTimeout(() => {
      setSplashes(prev => prev.filter(s => s.id !== splashId));
    }, 600);
  }, []);

  return (
    <div className="hero-rain">
      {/* Raindrops */}
      {staticDrops.map(d => (
        <div
          key={d.id}
          className="raindrop css-anim-drop"
          onClick={(e) => {
            e.stopPropagation();
            splashDrop(d.id, d.x);
          }}
          style={{
            left: `${d.x}%`,
            top: `${d.yStart}%`, // Initial position above viewport
            height: `${d.length}px`,
            width: `${d.width}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`
          }}
        />
      ))}

      {/* Splash effects */}
      {splashes.map(s => (
        <div
          key={s.id}
          className="rain-splash"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
        >
          <span className="splash-ring" />
          <span className="splash-dot s1" />
          <span className="splash-dot s2" />
          <span className="splash-dot s3" />
          <span className="splash-dot s4" />
        </div>
      ))}
    </div>
  );
};

export default HeroScene;
