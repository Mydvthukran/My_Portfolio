import { createContext, useContext, useState, useEffect } from 'react';

const EasterEggContext = createContext();

export const useEasterEgg = () => useContext(EasterEggContext);

export const EasterEggProvider = ({ children }) => {
  const [themeState, setThemeState] = useState('default'); // 'default', 'snapped', 'resetting'

  useEffect(() => {
    if (themeState === 'snapped') {
      document.body.classList.add('theme-avengers');
    } else {
      document.body.classList.remove('theme-avengers');
    }
  }, [themeState]);

  const triggerSnap = () => {
    // Play snap sound (free sound from Google Actions)
    const audio = new Audio('https://actions.google.com/sounds/v1/foley/finger_snap.ogg');
    audio.volume = 1;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Add a flash effect to the screen
    const flash = document.createElement('div');
    flash.className = 'snap-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1500);

    setThemeState('snapped');
  };

  const triggerRescue = () => {
    setThemeState('resetting'); // Prevent multiple clicks
    
    // Web Speech API for "I am Iron Man"
    const utterance = new SpeechSynthesisUtterance("And I... am Iron Man.");
    utterance.pitch = 0.5;
    utterance.rate = 0.85;
    
    // Try to find a deeper voice if available
    const voices = speechSynthesis.getVoices();
    const deepVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('David'));
    if (deepVoice) utterance.voice = deepVoice;

    // When he finishes speaking, reset the theme
    utterance.onend = () => {
      // Iron Man repulsor flash effect
      const flash = document.createElement('div');
      flash.className = 'snap-flash iron-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 1500);
      
      setThemeState('default');
    };
    
    speechSynthesis.speak(utterance);
  };

  return (
    <EasterEggContext.Provider value={{ themeState, triggerSnap, triggerRescue }}>
      {children}
    </EasterEggContext.Provider>
  );
};
