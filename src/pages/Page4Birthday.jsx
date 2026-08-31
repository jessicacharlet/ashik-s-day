import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { triggerBirthdayConfetti } from '../components/ConfettiEffect';

export const Page4Birthday = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_4_BIRTHDAY;

  // Sequence index: 0, 1, 2, 3 -> then 4 (revealed)
  const [seqIndex, setSeqIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeqIndex((prev) => {
        if (prev < cfg.sequence.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setIsRevealed(true);
            triggerBirthdayConfetti();
          }, 800);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cfg.sequence.length]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Floating Stardust when revealed */}
      {isRevealed && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: [0, 0.8, 0], y: -100 }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              className="absolute font-doodle text-xl text-[#F88379]"
              style={{ left: `${12 + i * 11}%`, top: `${40 + (i % 3) * 15}%` }}
            >
              {i % 2 === 0 ? '🎉' : '✨'}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-3xl w-full text-center space-y-8 z-10 relative">

        {/* Stage 1: Playful sequence transitions */}
        {!isRevealed ? (
          <div className="paper-card p-10 sm:p-16 rounded-2xl border border-[#EAE3D2] shadow-xl min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={seqIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="font-handwriting text-4xl sm:text-6xl text-[#6B4E3D] font-bold"
              >
                {cfg.sequence[seqIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
        ) : (
          /* Stage 2: HAPPY BIRTHDAY, ASHIK! 🎉 Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 18 }}
            className="paper-card-peach p-8 sm:p-14 rounded-2xl relative shadow-2xl border border-[#F6D7C8] space-y-6"
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape-coral rounded-xs" />

            <div className="inline-flex p-3 rounded-full bg-[#FFFDF9] border border-[#F6D7C8] text-[#F88379] shadow-xs">
              <PartyPopper className="w-8 h-8" />
            </div>

            <h1 className="font-handwriting text-5xl sm:text-7xl md:text-8xl text-[#F88379] font-bold tracking-wide leading-tight drop-shadow-xs">
              {cfg.revealBig}
            </h1>

            <div className="space-y-3 font-serif text-lg sm:text-2xl text-[#4A3E3D] max-w-xl mx-auto font-light leading-relaxed pt-2">
              {cfg.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#F6D7C8] flex justify-center">
              <button
                onClick={() => navigate('/cake')}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F88379] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#e76e64] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{cfg.buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
