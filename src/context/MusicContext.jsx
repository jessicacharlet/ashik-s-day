import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../config';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Web Audio API synth fallback refs
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  const audioPath = BIRTHDAY_CONFIG.AUDIO.customUrl || '/music/slipping-through-my-fingers.mp3';

  // Initialize single persistent Audio instance once on mount
  useEffect(() => {
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.05; // Initial low volume for smooth fade-in
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      stopSynthFallback();
    };
  }, [audioPath]);

  // Smooth Volume Fade-In Helper (Fades up to 0.30 over 1.5 seconds)
  const fadeInAudio = (targetVolume = 0.30) => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.05;

    let currentVol = 0.05;
    const fadeInterval = setInterval(() => {
      if (audioRef.current && currentVol < targetVolume) {
        currentVol = Math.min(targetVolume, currentVol + 0.03);
        audioRef.current.volume = currentVol;
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  };

  // Web Audio API Soft Ambient Synth Melody (Fallback when MP3 file is absent)
  const startSynthFallback = () => {
    try {
      if (synthCtxRef.current) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const chords = [
        [261.63, 329.63, 392.00], // C major
        [196.00, 246.94, 293.66], // G major
        [220.00, 261.63, 329.63], // A minor
        [174.61, 220.00, 261.63]  // F major
      ];
      let idx = 0;

      const playChord = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') return;
        const now = ctx.currentTime;
        const notes = chords[idx];
        idx = (idx + 1) % chords.length;

        notes.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.04, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 4.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 4.5);
        });
      };

      playChord();
      synthTimerRef.current = setInterval(playChord, 4400);
    } catch (e) {
      console.warn("Synth fallback error:", e);
    }
  };

  const stopSynthFallback = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthCtxRef.current) {
      synthCtxRef.current.close();
      synthCtxRef.current = null;
    }
  };

  // Play Music Function
  const playMusic = () => {
    if (audioRef.current) {
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            fadeInAudio(0.30);
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Audio file play prevented/absent, triggering synth fallback:", err);
            startSynthFallback();
            setIsPlaying(true);
          });
      }
    } else {
      startSynthFallback();
      setIsPlaying(true);
    }
  };

  // Pause Music Function
  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthFallback();
    setIsPlaying(false);
  };

  // Toggle Play / Pause
  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, playMusic, pauseMusic, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
