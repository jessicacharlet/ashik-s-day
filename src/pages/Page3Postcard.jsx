import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page3Postcard = () => {
  const navigate = useNavigate();
  // Animation states: 'init' | 'dragging' | 'delivered'
  const [stage, setStage] = useState('init');

  const myPhoto = BIRTHDAY_CONFIG.MY_PHOTO;
  const friendPhoto = BIRTHDAY_CONFIG.FRIEND_PHOTO;

  useEffect(() => {
    // 1. Wait 1 second after page opens, then start dragging MY PHOTO from LEFT to RIGHT
    const t1 = setTimeout(() => setStage('dragging'), 1000);

    // 2. Arrives at destination after 3.8 seconds
    const t2 = setTimeout(() => setStage('delivered'), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const isDragging = stage === 'dragging';
  const isDelivered = stage === 'delivered';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Paper texture grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-5xl w-full flex flex-col items-center space-y-8 z-10 relative">

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] text-xs font-doodle font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Postcard Journey</span>
          </div>
          <h2 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            Sending a little birthday surprise... 💌
          </h2>
        </motion.div>

        {/* ================================================== */}
        {/* HORIZONTAL TRACK & POSTCARD CANVAS */}
        {/* ================================================== */}
        <div className="w-full relative py-12 px-2 sm:px-8 flex flex-col items-center justify-center">

          {/* Hand-Drawn Track Line Connecting Left to Right */}
          <div className="absolute top-1/2 left-4 right-4 sm:left-12 sm:right-12 -translate-y-1/2 flex items-center justify-between pointer-events-none z-0">
            {/* Start Node */}
            <div className="w-4 h-4 rounded-full bg-[#789461] border-2 border-white shadow-xs" />

            {/* Track Line with Decorative Symbols */}
            <div className="flex-1 mx-2 h-[2px] bg-dashed border-b-2 border-dashed border-[#D5CBB5] relative flex items-center justify-around">
              <span className="font-doodle text-xs text-[#F88379] opacity-70">♡</span>
              <span className="font-doodle text-xs text-[#789461] opacity-70">✿</span>
              <span className="font-doodle text-xs text-[#8B5CF6] opacity-70">✨</span>
              <span className="font-doodle text-xs text-[#F88379] opacity-70">♡</span>
            </div>

            {/* Destination Node */}
            <div className="w-4 h-4 rounded-full bg-[#F88379] border-2 border-white shadow-xs" />
          </div>

          {/* POSTCARD CARDS CONTAINER */}
          <div className="w-full max-w-4xl relative flex items-center justify-between min-h-[300px] sm:min-h-[360px]">

            {/* 1. MY POSTCARD (Starts LEFT -> Moves RIGHT along line) */}
            <div className="relative z-20">
              <motion.div
                initial={{ x: 0, y: 0, rotate: -4 }}
                animate={
                  isDelivered
                    ? {
                        // Positioned right next to Ashik's photo on desktop/mobile
                        x: typeof window !== 'undefined' && window.innerWidth < 640 ? 110 : 380,
                        y: 0,
                        rotate: -3
                      }
                    : isDragging
                    ? {
                        x: typeof window !== 'undefined' && window.innerWidth < 640 ? [0, 60, 110] : [0, 190, 380],
                        y: [-12, -18, 0],
                        rotate: [-4, 5, -2, -3]
                      }
                    : { x: 0, y: 0, rotate: -4 }
                }
                transition={{
                  duration: isDragging ? 3.5 : 0.8,
                  ease: [0.34, 1.56, 0.64, 1] // Spring bounce overshoot physics!
                }}
                className="relative cursor-default"
              >
                {/* Motion Trail Particles while dragging */}
                {isDragging && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 0.4, x: -30 - i * 15 }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="absolute top-1/2 left-0 font-doodle text-[#F88379] text-base"
                      >
                        ♡
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Polaroid Postcard */}
                <div
                  className={`bg-[#FFFDF9] p-3 sm:p-4 pb-5 sm:pb-6 rounded-sm border border-[#EAE3D2] transition-shadow duration-300 ${
                    isDragging ? 'dragging-shadow' : 'paper-lifted'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape-sage rounded-xs -rotate-2" />
                  <div className="w-32 sm:w-48 aspect-4/5 bg-[#2D2424] overflow-hidden rounded-xs border border-[#E0D8C3]">
                    <img src={myPhoto} alt="From me" className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-2 text-center">
                    <p className="font-handwriting text-xl sm:text-2xl text-[#6B4E3D] font-bold">
                      From me 💌
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* HEART BADGE ON DELIVERED ARRIVAL */}
            <AnimatePresence>
              {isDelivered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0.6, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] shadow-md animate-pulse-soft"
                >
                  <Heart className="w-6 h-6 fill-[#F88379]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. ASHIK'S POSTCARD (STAYS STATIONARY AT FAR RIGHT!) */}
            <div className="relative z-10">
              <div className="bg-[#FFFDF9] p-3 sm:p-4 pb-5 sm:pb-6 rounded-sm paper-lifted border border-[#EAE3D2] rotate-3">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape-peach rounded-xs rotate-2" />
                <div className="w-32 sm:w-48 aspect-4/5 bg-[#2D2424] overflow-hidden rounded-xs border border-[#E0D8C3]">
                  <img src={friendPhoto} alt="Ashik" className="w-full h-full object-cover" />
                </div>
                <div className="pt-2 text-center">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#6B4E3D] font-bold">
                    Ashik 🎂
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================================================== */}
        {/* DESTINATION MESSAGES & NEXT BUTTON */}
        {/* ================================================== */}
        <AnimatePresence>
          {isDelivered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 pt-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] text-sm font-handwriting font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Delivered! 💌</span>
              </div>

              <p className="font-serif italic text-xl sm:text-2xl text-[#4A3E3D]">
                "Your birthday surprise has arrived."
              </p>

              {/* NEXT BUTTON (Only appears AFTER dragging finishes!) */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/birthday')}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
