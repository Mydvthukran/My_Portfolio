import { useState, useCallback, useEffect, useRef } from 'react';

const createDrop = (id) => ({
  id,
  x: 10 + Math.random() * 85,
  y: -5 - Math.random() * 15,
  length: 12 + Math.random() * 20,
  speed: 1.5 + Math.random() * 2.5,
  opacity: 0.1 + Math.random() * 0.2,
  width: 1 + Math.random() * 1.5,
  splashing: false,
  splashX: 0,
  splashY: 0,
});

const HeroScene = () => {
  const [drops, setDrops] = useState([]);
  const [splashes, setSplashes] = useState([]);
  const nextId = useRef(0);
  const nextSplashId = useRef(0);
  const maxDrops = 18;

  // Initialize drops spread across screen
  useEffect(() => {
    const initial = [];
    for (let i = 0; i < maxDrops; i++) {
      const d = createDrop(nextId.current++);
      d.y = Math.random() * 100;
      initial.push(d);
    }
    setDrops(initial);
  }, []);

  // Rain animation loop
  useEffect(() => {
    let animId;
    const animate = () => {
      setDrops(prev => prev.map(d => {
        if (d.splashing) return d;
        let newY = d.y + d.speed * 0.2;
        if (newY > 105) {
          return createDrop(d.id);
        }
        return { ...d, y: newY };
      }));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Click to splash
  const splashDrop = useCallback((id, x, y) => {
    // Mark drop as splashing
    setDrops(prev => prev.map(d =>
      d.id === id ? { ...d, splashing: true } : d
    ));

    // Create splash particles
    const splashId = nextSplashId.current++;
    setSplashes(prev => [...prev, { id: splashId, x, y }]);

    // Remove splash after animation
    setTimeout(() => {
      setSplashes(prev => prev.filter(s => s.id !== splashId));
    }, 600);

    // Replace drop
    setTimeout(() => {
      setDrops(prev => prev.map(d =>
        d.id === id ? createDrop(nextId.current++) : d
      ));
    }, 100);
  }, []);

  return (
    <div className="hero-rain">
      {/* Raindrops */}
      {drops.map(d => (
        <div
          key={d.id}
          className={`raindrop ${d.splashing ? 'splash' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            splashDrop(d.id, d.x, d.y);
          }}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            height: `${d.length}px`,
            width: `${d.width}px`,
            opacity: d.splashing ? 0 : d.opacity,
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
