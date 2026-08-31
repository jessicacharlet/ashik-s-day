import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Key } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const SurpriseSection = () => {
  const { buttonLabel, preClickText, hiddenMessage } = BIRTHDAY_CONFIG.SURPRISE_SECTION;
  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-6 relative z-10 select-none">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium">
            <Gift className="w-3.5 h-3.5" />
            <span>Hidden Note</span>
          </div>

          <p className="text-xl sm:text-2xl font-serif text-slate-300 italic">
            "{preClickText}"
          </p>
        </motion.div>

        {/* Surprise Button */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full glass-button bg-purple-900/30 border-purple-400/40 text-purple-100 font-bold text-lg tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:bg-purple-800/40 active:scale-95 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              <Key className="w-5 h-5 text-purple-300 group-hover:rotate-45 transition-transform" />
              <span>{buttonLabel}</span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -inset-1 rounded-full bg-purple-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500" />
            </button>
          </motion.div>
        ) : (
          /* Hidden Message Box */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="glass-card-amber p-8 sm:p-12 rounded-3xl border border-amber-500/40 space-y-6 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400" />

              <div className="p-3 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 mx-auto flex items-center justify-center">
                <Heart className="w-6 h-6 fill-amber-400/20 text-amber-300" />
              </div>

              <div className="space-y-4 text-slate-200 font-sans text-base sm:text-xl font-light leading-relaxed">
                {hiddenMessage.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className={idx === hiddenMessage.length - 1 ? 'text-amber-300 font-semibold text-xl pt-2' : ''}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <div className="pt-6 border-t border-amber-500/20">
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 text-glow-amber">
                  Happy Birthday, {friendName} ❤️
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
