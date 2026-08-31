import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const BibleVerseSection = ({ onContinue }) => {
  const { lines, reference, subtext } = BIRTHDAY_CONFIG.BIBLE_VERSE;

  // Staggered line animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.3
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden z-10 select-none">
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full text-center space-y-8 glass-card p-8 md:p-14 rounded-3xl relative border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Decorative Top Icon */}
        <motion.div variants={lineVariants} className="flex justify-center">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <BookOpen className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Bible Verse Lines */}
        <div className="space-y-3 font-serif text-2xl sm:text-3xl md:text-4xl text-slate-100 font-light leading-relaxed tracking-wide">
          {lines.map((line, idx) => (
            <motion.p key={idx} variants={lineVariants} className="text-glow-white">
              "{line}"
            </motion.p>
          ))}
        </div>

        {/* Reference */}
        <motion.p
          variants={lineVariants}
          className="text-amber-400 font-serif italic text-lg sm:text-xl font-medium tracking-wider text-glow-amber pt-2"
        >
          {reference}
        </motion.p>

        {/* Divider */}
        <motion.div variants={lineVariants} className="flex items-center justify-center gap-3 opacity-60">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </motion.div>

        {/* Subtext Blessing */}
        <motion.p
          variants={lineVariants}
          className="text-slate-300/90 text-sm sm:text-base md:text-lg font-sans font-light max-w-xl mx-auto leading-relaxed"
        >
          {subtext}
        </motion.p>

        {/* Continue Button */}
        <motion.div variants={lineVariants} className="pt-4">
          <button
            onClick={onContinue}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full glass-button text-amber-200 font-medium text-base tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 hover:text-white"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-amber-400" />
            <span className="absolute -inset-0.5 rounded-full bg-amber-400/20 blur opacity-0 group-hover:opacity-100 transition duration-500" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
