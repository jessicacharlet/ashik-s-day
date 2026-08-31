import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page1Loading = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_1_LOADING;

  const [stepIndex, setStepIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < cfg.sequence.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsReady(true);
          return prev;
        }
      });
    }, 1100);

    return () => clearInterval(timer);
  }, [cfg.sequence.length]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Decorative Corner Doodles */}
      <div className="absolute top-8 left-8 text-[#789461]/40 font-doodle text-2xl">✿ ❀ ❁</div>
      <div className="absolute bottom-8 right-8 text-[#F88379]/40 font-doodle text-2xl">♡ ✧ ♡</div>

      <div className="max-w-md w-full text-center space-y-8 paper-card p-8 sm:p-12 rounded-2xl relative shadow-xl border border-[#EAE3D2] z-10">
        {/* Washi tape decor */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-sage rounded-xs" />

        {/* Center Paper Envelope & Spinner */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#789461]"
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="p-4 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] shadow-sm"
          >
            <Heart className="w-10 h-10 fill-[#F88379]" />
          </motion.div>
        </div>

        {/* Handwritten Status Transitions */}
        <div className="min-h-[90px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isReady ? (
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-1"
              >
                <h2 className="font-handwriting text-3xl sm:text-4xl text-[#6B4E3D] font-bold">
                  {cfg.sequence[stepIndex]}
                </h2>
                <p className="font-doodle text-sm text-[#789461] font-medium">
                  {cfg.subtext}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-1"
              >
                <h2 className="font-handwriting text-4xl text-[#789461] font-bold">
                  {cfg.readyText}
                </h2>
                <p className="font-serif italic text-base text-[#4A3E3D]">
                  Your handmade birthday card is ready to open.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Open Card Button (Shown after loading finishes) */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-2"
          >
            <button
              onClick={() => navigate('/blessing')}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F88379] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#e76e64] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{cfg.buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
