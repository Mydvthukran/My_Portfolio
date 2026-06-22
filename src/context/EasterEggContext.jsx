import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const EasterEggContext = createContext();

export const useEasterEgg = () => useContext(EasterEggContext);

// ─── Web Audio API helpers ───────────────────────────────────────────────────

/** Play a cinematic sub-bass boom to underpin the snap */
const playSubBassBoom = (audioCtx) => {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(60, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.8);
  gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 1.2);
};

/** Play an arc-reactor power-up whine before the voice */
const playArcReactorSound = (audioCtx) => {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 0.4);
  osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.8);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
  filter.Q.setValueAtTime(5, audioCtx.currentTime);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.8);
};

/** Speak with metallic Iron Man suit-speaker effect */
const speakWithMetallicEffect = (text, voices, onEnd) => {
  let audioCtx;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    // Fallback: plain speech if Web Audio not available
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.7;
    utterance.rate = 0.85;
    utterance.onend = onEnd;
    speechSynthesis.speak(utterance);
    return;
  }

  // Play arc reactor power-up sound first
  playArcReactorSound(audioCtx);

  // Speak after power-up sound completes
  // Speak almost immediately, allowing slight overlap with arc reactor sound
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9; // Less robotic pitch
    utterance.rate = 1.0;  // Normal speaking rate
    utterance.volume = 1;

    // Try to find the best deep male voice available
    if (voices.length > 0) {
      const preferred = [
        'Google UK English Male',
        'Microsoft David',
        'David',
        'Google US English',
        'Alex',
        'Daniel',
      ];
      const deepVoice = voices.find(v =>
        preferred.some(name => v.name.includes(name))
      ) || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('male'));
      if (deepVoice) utterance.voice = deepVoice;
    }

    utterance.onend = () => {
      // Close the audio context after everything is done
      setTimeout(() => {
        audioCtx.close().catch(() => {});
        if (onEnd) onEnd();
      }, 200);
    };

    speechSynthesis.speak(utterance);
  }, 50); // Minimal delay instead of 900ms
};

// ─── Provider ────────────────────────────────────────────────────────────────

export const EasterEggProvider = ({ children }) => {
  const [themeState, setThemeState] = useState('default'); // 'default', 'snapped', 'resetting'
  const voicesRef = useRef([]);

  // Pre-load voices — getVoices() returns [] on first call in most browsers
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = speechSynthesis.getVoices();
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  useEffect(() => {
    if (themeState === 'snapped') {
      document.body.classList.add('theme-avengers');
    } else {
      document.body.classList.remove('theme-avengers');
    }
  }, [themeState]);

  const triggerSnap = useCallback(() => {
    // Create a shared AudioContext for layered effects
    let audioCtx;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      audioCtx = null;
    }

    // 1. Play the real snap sound (original OGG file)
    const snapAudio = new Audio('https://actions.google.com/sounds/v1/foley/finger_snap.ogg');
    snapAudio.volume = 0.9;
    snapAudio.play().catch(e => console.log('Snap audio play failed:', e));

    // 2. Layer the sub-bass boom for cinematic weight
    if (audioCtx) {
      playSubBassBoom(audioCtx);
      // Clean up audio context after boom
      setTimeout(() => audioCtx.close().catch(() => {}), 2000);
    }

    // 3. Flash effect
    const flash = document.createElement('div');
    flash.className = 'snap-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1500);

    setThemeState('snapped');
  }, []);

  const triggerRescue = useCallback(() => {
    if (themeState !== 'snapped') return;
    setThemeState('resetting'); // Prevent multiple clicks

    speakWithMetallicEffect(
      'And I... am Iron Man.',
      voicesRef.current,
      () => {
        // Iron Man repulsor flash effect (blue)
        const flash = document.createElement('div');
        flash.className = 'snap-flash iron-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1500);

        setThemeState('default');
      }
    );
  }, [themeState]);

  return (
    <EasterEggContext.Provider value={{ themeState, triggerSnap, triggerRescue }}>
      {children}
    </EasterEggContext.Provider>
  );
};
