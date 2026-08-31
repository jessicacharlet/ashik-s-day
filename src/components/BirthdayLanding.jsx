import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, MousePointerClick, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { PhotoCard } from './PhotoCard';

export const BirthdayLanding = ({ onEnterWebsite }) => {
  // Animation state phase: 'start' | 'friend_in' | 'my_in' | 'dragging' | 'united' | 'messages' | 'verse'
  const [animationPhase, setAnimationPhase] = useState('start');
  const [keyTrigger, setKeyTrigger] = useState(0); // For replay reset

  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;
  const friendPhoto = BIRTHDAY_CONFIG.FRIEND_PHOTO;
  const myPhoto = BIRTHDAY_CONFIG.MY_PHOTO;
  const friendCaption = BIRTHDAY_CONFIG.FRIEND_CAPTION;
  const myCaption = BIRTHDAY_CONFIG.MY_CAPTION;

  const centerMsg = BIRTHDAY_CONFIG.CENTER_MESSAGE;
  const bibleVerse = BIRTHDAY_CONFIG.BIBLE_VERSE;

  // Automated cinematic timeline controller
  useEffect(() => {
    setAnimationPhase('start');

    const timer1 = setTimeout(() => setAnimationPhase('friend_in'), 800);
    const timer2 = setTimeout(() => setAnimationPhase('my_in'), 2000);
    const timer3 = setTimeout(() => setAnimationPhase('dragging'), 3400);
    const timer4 = setTimeout(() => setAnimationPhase('united'), 5200);
    const timer5 = setTimeout(() => setAnimationPhase('messages'), 6800);
    const timer6 = setTimeout(() => setAnimationPhase('verse'), 10500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [keyTrigger]);

  const handleReplay = () => {
    setKeyTrigger((prev) => prev + 1);
  };

  const isUnited = ['united', 'messages', 'verse'].includes(animationPhase);
  const showMessages = ['messages', 'verse'].includes(animationPhase);
  const showVerse = animationPhase === 'verse';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden z-10 select-none pt-12 pb-16">
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-indigo-600/15 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      {/* Floating Stardust / Hearts when united */}
      {isUnited && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, x: (i % 2 === 0 ? 1 : -1) * (i * 30) }}
              animate={{ opacity: [0, 0.8, 0], y: -150 }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              className="absolute left-1/2 bottom-1/3 text-amber-300 text-lg"
            >
              {i % 2 === 0 ? '❤️' : '✨'}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-4xl w-full flex flex-col items-center space-y-10 z-20 relative">
        {/* Top Prelude Banner */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-2"
        >
          <p className="text-amber-400/90 font-medium text-xs sm:text-sm uppercase tracking-widest">
            {BIRTHDAY_CONFIG.LANDING_PRELUDE}
          </p>
          <h3 className="text-xl sm:text-2xl font-serif text-slate-200 italic font-light">
            {BIRTHDAY_CONFIG.LANDING_SUBTITLE}
          </h3>
        </motion.div>

        {/* -------------------------------------------------- */}
        {/* DUAL PHOTO DRAG ANIMATION STAGE */}
        {/* -------------------------------------------------- */}
        <div className="w-full relative min-h-[360px] sm:min-h-[400px] flex items-center justify-center">
          {/* Photos Container (Desktop: Horizontal, Mobile: Vertical/Diagonal) */}
          <div className="relative w-full max-w-2xl h-full flex flex-col md:flex-row items-center justify-between md:justify-center gap-8 md:gap-12">
            
            {/* FRIEND'S PHOTO (Left on Desktop / Top on Mobile) */}
            <AnimatePresence>
              {animationPhase !== 'start' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -60, y: -20, rotate: -12 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: isUnited ? 0 : -30,
                    y: 0,
                    rotate: isUnited ? -4 : -8
                  }}
                  transition={{ type: 'spring', damping: 20, stiffness: 90 }}
                  className="z-10 relative"
                >
                  <PhotoCard
                    photoUrl={friendPhoto}
                    caption={friendCaption}
                    label={BIRTHDAY_CONFIG.FRIEND_LABEL}
                    rotationClass=""
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* MY PHOTO (Right on Desktop / Bottom on Mobile -> Moves toward Friend's Photo) */}
            <AnimatePresence>
              {['my_in', 'dragging', 'united', 'messages', 'verse'].includes(animationPhase) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 120, y: 40, rotate: 14 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: isUnited ? 0 : animationPhase === 'dragging' ? 40 : 100,
                    y: isUnited ? 0 : animationPhase === 'dragging' ? 10 : 20,
                    rotate: isUnited ? 5 : 10
                  }}
                  transition={{
                    type: 'spring',
                    damping: animationPhase === 'dragging' ? 24 : 18,
                    stiffness: 70
                  }}
                  className="z-20 relative"
                >
                  {/* Glowing Animated Cursor Effect on Drag */}
                  {animationPhase === 'dragging' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, x: 60, y: 60 }}
                      animate={{ opacity: [0, 1, 1, 0], x: [-20, -70], y: [-10, -20] }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                      className="absolute -top-6 -right-6 z-40 p-2 rounded-full bg-amber-400 text-slate-950 shadow-[0_0_25px_#f59e0b] border border-white flex items-center justify-center pointer-events-none"
                    >
                      <MousePointerClick className="w-6 h-6 animate-pulse" />
                    </motion.div>
                  )}

                  <PhotoCard
                    photoUrl={myPhoto}
                    caption={myCaption}
                    rotationClass=""
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* CENTER MESSAGE REVEAL */}
        {/* -------------------------------------------------- */}
        <AnimatePresence>
          {showMessages && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6 max-w-2xl mx-auto glass-card p-6 sm:p-10 rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)]"
            >
              {/* Three Lines */}
              <div className="space-y-1 font-serif text-xl sm:text-3xl text-amber-100 italic">
                <p>{centerMsg.line1}</p>
                <p>{centerMsg.line2}</p>
                <p className="text-amber-300 font-bold not-italic pt-1">{centerMsg.line3}</p>
              </div>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

              {/* HAPPY BIRTHDAY Heading */}
              <div className="space-y-2">
                <h4 className="text-amber-400 font-semibold tracking-widest text-sm uppercase">
                  {centerMsg.birthdayHeading}
                </h4>

                {/* FRIEND'S NAME - LARGEST TEXT ON SCREEN */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wider text-glow-amber shimmer-text py-2">
                  {friendName}
                </h1>

                {/* Subtext blessing */}
                <p className="text-slate-300 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed pt-2 font-light">
                  {centerMsg.blessingText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------- */}
        {/* BIBLE VERSE SECTION */}
        {/* -------------------------------------------------- */}
        <AnimatePresence>
          {showVerse && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-2xl text-center space-y-6 glass-card-amber p-6 sm:p-10 rounded-3xl border border-amber-500/40 shadow-2xl relative"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              {/* Verse lines animated */}
              <div className="space-y-2 font-serif text-xl sm:text-3xl text-slate-100 font-light leading-relaxed">
                {bibleVerse.lines.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.3, duration: 0.8 }}
                    className="text-glow-white"
                  >
                    "{line}"
                  </motion.p>
                ))}
              </div>

              <p className="text-amber-400 font-serif italic text-base sm:text-lg font-medium">
                {bibleVerse.reference}
              </p>

              <div className="pt-6 border-t border-amber-500/20 flex flex-col items-center gap-4">
                <p className="text-amber-200 font-serif italic text-lg sm:text-xl">
                  {bibleVerse.continueText}
                </p>

                {/* Enter Website Button */}
                <button
                  onClick={onEnterWebsite}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-button text-amber-100 font-bold text-base tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
                >
                  <span>{bibleVerse.buttonText}</span>
                  <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -inset-0.5 rounded-full bg-amber-400/30 blur opacity-0 group-hover:opacity-100 transition duration-500" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------- */}
        {/* REPLAY BUTTON (Subtle Option) */}
        {/* -------------------------------------------------- */}
        {isUnited && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="pt-4">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans text-slate-400 hover:text-amber-300 bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay the moment ↻</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
