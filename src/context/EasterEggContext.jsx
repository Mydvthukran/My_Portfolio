/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const EasterEggContext = createContext();

export const useEasterEgg = () => useContext(EasterEggContext);

import { playSubBassBoom, speakWithMetallicEffect } from '../utils/audioUtils';

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
