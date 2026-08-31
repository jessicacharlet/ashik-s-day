import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Sparkles, Wand2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { triggerWishFireworks } from './ConfettiEffect';

export const BirthdayCakeSection = () => {
  const { title, instruction, wishPrompt, wishFulfill } = BIRTHDAY_CONFIG.CAKE_SECTION;

  // 3 candles state
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [wishState, setWishState] = useState('initial'); // 'initial' | 'wishing' | 'fulfilled'

  const allBlownOut = candlesLit.every((lit) => !lit);

  const handleCandleClick = (index) => {
    if (wishState === 'fulfilled') return;

    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    // If all candles are now out:
    if (updated.every((lit) => !lit)) {
      triggerWishSequence();
    }
  };

  const handleBlowAll = () => {
    setCandlesLit([false, false, false]);
    triggerWishSequence();
  };

  const triggerWishSequence = () => {
    setWishState('wishing');
    setTimeout(() => {
      setWishState('fulfilled');
      triggerWishFireworks();
    }, 2800);
  };

  return (
    <section className="py-24 px-6 relative z-10 select-none">
      {/* Dark overlay when candles are blown out */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-none transition-opacity duration-1000 z-20 ${
          allBlownOut ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="max-w-3xl mx-auto text-center space-y-10 relative z-30">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-medium mb-2">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Interactive Ceremony</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-100 font-bold tracking-tight text-glow-amber">
            {title}
          </h2>
          <p className="text-slate-300 font-sans text-base sm:text-lg">
            {!allBlownOut ? instruction : 'Candles blown out! ✨'}
          </p>
        </motion.div>

        {/* Cake Container */}
        <div className="relative py-12 flex justify-center items-end min-h-[300px]">
          {/* Cake Glow Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          {/* SVG & CSS Interactive Birthday Cake */}
          <div className="relative flex flex-col items-center">
            {/* Candle Flames Row */}
            <div className="flex gap-10 sm:gap-14 mb-2 z-10">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => handleCandleClick(idx)}
                  className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
                  title="Click candle to blow out"
                >
                  {/* Flame */}
                  <AnimatePresence>
                    {candlesLit[idx] ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        className="relative w-5 h-8 mb-1"
                      >
                        <div className="w-full h-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flame shadow-[0_0_20px_#f59e0b]" />
                        <div className="absolute inset-0 bg-amber-400 rounded-full blur-xs animate-ping opacity-40" />
                      </motion.div>
                    ) : (
                      /* Smoke wisps when blown out */
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -25 }}
                        transition={{ duration: 1.5 }}
                        className="w-2 h-6 bg-slate-400/40 rounded-full blur-xs mb-1"
                      />
                    )}
                  </AnimatePresence>

                  {/* Candle Wick */}
                  <div className="w-1 h-3 bg-slate-700" />

                  {/* Candle Body */}
                  <div className="w-3.5 h-16 bg-gradient-to-b from-rose-400 via-pink-400 to-amber-300 rounded-t-xs shadow-md border-x border-white/20 relative overflow-hidden">
                    <div className="absolute inset-x-0 top-2 h-1 bg-white/40 rotate-12" />
                    <div className="absolute inset-x-0 top-6 h-1 bg-white/40 rotate-12" />
                    <div className="absolute inset-x-0 top-10 h-1 bg-white/40 rotate-12" />
                  </div>
                </button>
              ))}
            </div>

            {/* Top Cake Tier */}
            <div className="w-48 sm:w-64 h-16 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-t-2xl shadow-lg border-t-4 border-amber-300 relative flex items-center justify-center">
              {/* Frosting Drips */}
              <div className="absolute -bottom-2 inset-x-0 flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-4 bg-amber-100 rounded-b-full shadow-xs" />
                ))}
              </div>
              <span className="font-serif italic text-amber-800/80 text-sm font-semibold tracking-wider">
                Happy Birthday
              </span>
            </div>

            {/* Middle Cake Tier */}
            <div className="w-64 sm:w-80 h-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-t-xl border-t-4 border-purple-400/50 shadow-xl relative flex items-center justify-center">
              <div className="flex gap-3">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <Sparkles className="w-4 h-4 text-rose-300 animate-pulse" />
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
            </div>

            {/* Cake Plate Stand */}
            <div className="w-72 sm:w-96 h-4 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-full shadow-2xl border-t border-white" />
          </div>
        </div>

        {/* Quick Action Button */}
        {!allBlownOut && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2">
            <button
              onClick={handleBlowAll}
              className="px-6 py-2.5 rounded-full glass-button text-amber-200 text-sm font-medium tracking-wide uppercase hover:scale-105 active:scale-95 transition-transform"
            >
              Blow Out All Candles 🕯️
            </button>
          </motion.div>
        )}

        {/* Wish Messages Overlay */}
        <AnimatePresence>
          {wishState === 'wishing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="text-3xl sm:text-5xl font-serif text-amber-200 font-light italic text-glow-amber">
                {wishPrompt}
              </h3>
              <p className="text-slate-300 font-sans text-sm animate-pulse">
                Close your eyes and send a prayer...
              </p>
            </motion.div>
          )}

          {wishState === 'fulfilled' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 glass-card p-6 sm:p-8 rounded-2xl border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.3)] max-w-xl mx-auto"
            >
              <Sparkles className="w-8 h-8 text-amber-300 mx-auto animate-spin" style={{ animationDuration: '6s' }} />
              <h3 className="text-2xl sm:text-4xl font-serif text-amber-200 font-bold text-glow-amber">
                {wishFulfill}
              </h3>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                Amen. May your faith move mountains and your heart remain filled with joy.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
