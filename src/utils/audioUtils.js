/** Play a cinematic sub-bass boom to underpin the snap */
export const playSubBassBoom = (audioCtx) => {
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
export const playArcReactorSound = (audioCtx) => {
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
export const speakWithMetallicEffect = (text, voices, onEnd) => {
  let audioCtx;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    // Fallback: plain speech if Web Audio not available
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    utterance.onend = onEnd;
    speechSynthesis.speak(utterance);
    return;
  }

  // Play arc reactor power-up sound first
  playArcReactorSound(audioCtx);

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
