import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const PreludeScreen = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#030712]/95 backdrop-blur-md text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="max-w-md space-y-6"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-amber-200/80 font-medium tracking-widest text-sm uppercase"
        >
          {BIRTHDAY_CONFIG.HEADER_PRELUDE}
        </motion.p>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-4xl md:text-5xl font-serif text-slate-100 font-light italic tracking-wide text-glow-amber"
        >
          {BIRTHDAY_CONFIG.PRELUDE_SUBTITLE}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="pt-6"
        >
          <button
            onClick={onComplete}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-button text-amber-100 font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Begin the Blessing</span>
            <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
