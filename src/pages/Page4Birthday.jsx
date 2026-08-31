import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { triggerBirthdayConfetti } from '../components/ConfettiEffect';

export const Page4Birthday = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_4_BIRTHDAY;
  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;

  // Reveal sequence states: 'wait' | 'forget' | 'revealed'
  const [stage, setStage] = useState('wait');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('forget'), 1200);
    const t2 = setTimeout(() => {
      setStage('revealed');
      triggerBirthdayConfetti();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Floating Stardust when revealed */}
      {stage === 'revealed' && (
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

        {/* Stage 1: Wait & Forget prompts */}
        {stage !== 'revealed' ? (
          <div className="paper-card p-10 sm:p-16 rounded-2xl border border-[#EAE3D2] shadow-xl min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {stage === 'wait' ? (
                <motion.h2
                  key="wait"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-handwriting text-5xl sm:text-7xl text-[#6B4E3D] font-bold"
                >
                  {cfg.waitText}
                </motion.h2>
              ) : (
                <motion.h2
                  key="forget"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-handwriting text-4xl sm:text-6xl text-[#789461] font-bold"
                >
                  {cfg.forgetText}
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Stage 2: IT'S YOUR BIRTHDAY + ASHIK Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 18 }}
            className="paper-card-peach p-8 sm:p-14 rounded-2xl relative shadow-2xl border border-[#F6D7C8] space-y-6"
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape-coral rounded-xs" />

            <div className="inline-flex p-3 rounded-full bg-[#FFFDF9] border border-[#F6D7C8] text-[#F88379] shadow-xs">
              <PartyPopper className="w-8 h-8" />
            </div>

            <h3 className="font-doodle text-2xl sm:text-4xl text-[#F88379] font-bold tracking-wide">
              {cfg.revealBig}
            </h3>

            <div className="space-y-1">
              <p className="font-sans text-lg sm:text-2xl text-[#6B4E3D] uppercase tracking-widest font-extrabold">
                {cfg.heading}
              </p>
              <h1 className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-[#789461] font-bold tracking-wide leading-tight drop-shadow-sm">
                {friendName}
              </h1>
            </div>

            <p className="font-serif italic text-lg sm:text-2xl text-[#4A3E3D] max-w-xl mx-auto font-light leading-relaxed">
              "{cfg.wishesText}"
            </p>

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
