import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const MusicButton = () => {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-[#FCE8DE] border-[#F6D7C8] text-[#F88379] shadow-[0_0_20px_rgba(248,131,121,0.3)]'
            : 'bg-[#FFFDF9] border-[#EAE3D2] text-[#6B4E3D] hover:bg-[#FCE8DE]'
        }`}
        title={isPlaying ? 'Pause background music' : 'Play "Slipping Through My Fingers" 🎵'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 text-[#F88379] animate-pulse" />
            <span className="hidden sm:inline font-handwriting text-base font-bold">
              Music Playing 🎵
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 text-[#6B4E3D]/70" />
            <span className="hidden sm:inline font-handwriting text-base font-bold opacity-80">
              Music Muted 🔇
            </span>
          </>
        )}

        {/* Pulse ring when music is playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full border border-[#F88379]/50 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
