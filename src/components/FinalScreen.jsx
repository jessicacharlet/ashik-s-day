import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Stars, Sun } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const FinalScreen = () => {
  const { heading, blessing, pills, footer } = BIRTHDAY_CONFIG.FINAL_SCREEN;
  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;

  return (
    <footer className="py-28 px-6 relative z-10 text-center select-none overflow-hidden border-t border-white/5">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[400px] bg-gradient-to-t from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 p-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-2">
            <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '15s' }} />
          </div>

          <h2 className="text-4xl sm:text-7xl font-serif text-slate-100 font-extrabold tracking-tight text-glow-amber">
            {heading} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
              {friendName} 🎉
            </span>
          </h2>

          <p className="text-lg sm:text-2xl font-serif text-slate-300 font-light italic max-w-2xl mx-auto pt-2">
            "{blessing}"
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4 space-y-3"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">
            Here's to another year of
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-lg mx-auto">
            {pills.map((pill, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full glass-card text-amber-200 text-sm font-medium tracking-wide border border-amber-500/20 shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Footer Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-12 flex flex-col items-center justify-center gap-2 text-slate-400 font-sans text-sm"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <span>{footer}</span>
          </div>
          <p className="text-xs text-slate-500">
            © {BIRTHDAY_CONFIG.BIRTHDAY_YEAR} • All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
