import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { DraggablePostcard } from './DraggablePostcard';

export const PostcardReveal = ({ onSettled }) => {
  // Sequence state: 'init' | 'my_in' | 'friend_in' | 'dragging' | 'settled'
  const [phase, setPhase] = useState('init');

  const myPhoto = BIRTHDAY_CONFIG.MY_PHOTO;
  const friendPhoto = BIRTHDAY_CONFIG.FRIEND_PHOTO;
  const myCaption = BIRTHDAY_CONFIG.MY_CAPTION;
  const friendCaption = BIRTHDAY_CONFIG.FRIEND_CAPTION;
  const connectorText = BIRTHDAY_CONFIG.POSTCARD_CONNECTOR;

  useEffect(() => {
    // 1. My photo arrives
    const t1 = setTimeout(() => setPhase('my_in'), 500);

    // 2. Friend photo starts dragging across
    const t2 = setTimeout(() => setPhase('dragging'), 2000);

    // 3. Settles side by side
    const t3 = setTimeout(() => {
      setPhase('settled');
      if (onSettled) onSettled();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onSettled]);

  const isMyPhotoVisible = ['my_in', 'dragging', 'settled'].includes(phase);
  const isFriendPhotoVisible = ['dragging', 'settled'].includes(phase);
  const isSettled = phase === 'settled';

  return (
    <div className="w-full relative flex flex-col items-center justify-center py-10 select-none overflow-hidden">
      {/* Tabletop Paper Canvas Area */}
      <div className="relative w-full max-w-4xl min-h-[380px] sm:min-h-[440px] flex items-center justify-center">

        {/* Floating Paper Hearts & Doodles when settled */}
        <AnimatePresence>
          {isSettled && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], y: -80, scale: [0.5, 1.2, 0.8] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.6 }}
                  className="absolute text-[#F88379] font-doodle text-xl"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 3) * 15}%`
                  }}
                >
                  {i % 2 === 0 ? '♡' : '✨'}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------- */}
        {/* HORIZONTAL POSTCARD LAYOUT (SAME HORIZONTAL LINE!) */}
        {/* -------------------------------------------------- */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 z-20">

          {/* 1. MY PHOTO (Arrives Left) */}
          <AnimatePresence>
            {isMyPhotoVisible && (
              <motion.div
                initial={{ opacity: 0, x: -140, y: -20, rotate: -14 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: isSettled ? -4 : -8
                }}
                transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                className="z-10 relative"
              >
                <DraggablePostcard
                  photoUrl={myPhoto}
                  caption={myCaption}
                  tapeColor="washi-tape-sage"
                  tapeAngle="-rotate-4"
                  stampLabel="LOVE"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* HEART CONNECTOR & HANDWRITTEN NOTE BETWEEN CARDS */}
          <AnimatePresence>
            {isSettled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="z-30 text-center flex flex-col items-center space-y-1 my-2 md:my-0 max-w-[180px]"
              >
                {/* Heart Doodle Badge */}
                <div className="p-3 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] shadow-sm animate-pulse-soft">
                  <Heart className="w-6 h-6 fill-[#F88379]" />
                </div>

                {/* Handwritten Line */}
                <p className="font-handwriting text-2xl sm:text-3xl text-[#6B4E3D] font-bold leading-tight whitespace-pre-line pt-1">
                  {connectorText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. FRIEND'S PHOTO (Drags across from right with table physics!) */}
          <AnimatePresence>
            {isFriendPhotoVisible && (
              <motion.div
                initial={{ opacity: 0, x: 220, y: 30, rotate: 16 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: isSettled ? 5 : 12
                }}
                transition={{
                  type: 'spring',
                  stiffness: phase === 'dragging' ? 50 : 75,
                  damping: phase === 'dragging' ? 18 : 22
                }}
                className="z-20 relative"
              >
                {/* Hand-Drawn Arrow Indicator during drag */}
                {phase === 'dragging' && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: [0, 1, 1, 0], x: [-10, -50] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="absolute -top-10 left-0 z-40 flex items-center gap-1 font-doodle text-sm font-bold text-[#789461] pointer-events-none"
                  >
                    <span>Moving in... ──►</span>
                  </motion.div>
                )}

                <DraggablePostcard
                  photoUrl={friendPhoto}
                  caption={friendCaption}
                  tapeColor="washi-tape-peach"
                  tapeAngle="rotate-3"
                  stampLabel="ASHIK"
                  isDragging={phase === 'dragging'}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
