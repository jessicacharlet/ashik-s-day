import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const PersonalMessage = () => {
  const { title, paragraphs } = BIRTHDAY_CONFIG.PERSONAL_MESSAGE;

  return (
    <section className="py-20 px-6 relative z-10 select-none">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="glass-card-amber p-8 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle Ambient Light Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-8 border-b border-amber-500/20 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                <Heart className="w-5 h-5 fill-amber-400/20 text-amber-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 font-bold tracking-wide">
                {title}
              </h2>
            </div>
            <Feather className="w-6 h-6 text-amber-400/50 hidden sm:block" />
          </div>

          {/* Paragraphs with handwritten touch font */}
          <div className="space-y-6 text-slate-200 font-sans text-base sm:text-lg leading-relaxed font-light">
            {paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`${
                  idx === paragraphs.length - 1
                    ? 'text-amber-200 font-normal italic pt-2 border-t border-amber-500/10'
                    : ''
                }`}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signature / Bottom ornament */}
          <div className="pt-8 flex items-center justify-between opacity-80 text-amber-300/80">
            <div className="flex items-center gap-2 font-handwriting text-2xl text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>With heartfelt prayers & warmth</span>
            </div>
            <div className="font-serif italic text-sm text-slate-400">
              Forever grateful
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
