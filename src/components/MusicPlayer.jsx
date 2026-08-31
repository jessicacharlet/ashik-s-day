import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  const customUrl = BIRTHDAY_CONFIG.AUDIO?.customUrl;

  useEffect(() => {
    if (customUrl) {
      audioRef.current = new Audio(customUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynth();
    };
  }, [customUrl]);

  // Web Audio API Ambient Sound Synthesizer (Fallback when no MP3 URL is provided)
  const startSynth = () => {
    try {
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

      let chordIdx = 0;

      const playChord = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') return;

        const now = ctx.currentTime;
        const currentNotes = chords[chordIdx];
        chordIdx = (chordIdx + 1) % chords.length;

        currentNotes.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.05, now + 1.5);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 4.8);
        });
      };

      playChord();
      synthTimerRef.current = setInterval(playChord, 4500);
    } catch (e) {
      console.warn("Synth audio context error:", e);
    }
  };

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthCtxRef.current) {
      synthCtxRef.current.close();
      synthCtxRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      } else {
        stopSynth();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Fallback to synth if custom MP3 fails
          startSynth();
        });
      } else {
        startSynth();
      }
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-full glass-button border transition-all duration-300 shadow-2xl ${
          isPlaying
            ? 'border-amber-400/60 bg-amber-500/20 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
            : 'border-white/15 text-slate-300 hover:text-white'
        }`}
        title={isPlaying ? 'Mute background music' : 'Play peaceful background melody 🎵'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline font-sans text-xs font-medium tracking-wide uppercase">
              Music Playing
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 text-slate-400" />
            <span className="hidden sm:inline font-sans text-xs font-medium tracking-wide uppercase opacity-80">
              Music Off 🎵
            </span>
          </>
        )}

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full border border-amber-400/50 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
