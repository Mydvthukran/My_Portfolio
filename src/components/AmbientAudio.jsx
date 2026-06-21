import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element - Soft, high quality rain on roof
    const audio = new Audio('https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg');
    audio.loop = true;
    audio.volume = 0.3; // Gentle ambient level
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      className={`ambient-audio-btn ${isPlaying ? 'playing' : ''}`}
      onClick={togglePlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      aria-label="Toggle Ambient Sound"
    >
      <div className="audio-bars">
        <span className="bar b1"></span>
        <span className="bar b2"></span>
        <span className="bar b3"></span>
      </div>
      <span className="audio-label">Sound</span>
    </motion.button>
  );
};

export default AmbientAudio;
