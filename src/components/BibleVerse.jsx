import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const BibleVerse = () => {
  const { heading, lines, reference } = BIRTHDAY_CONFIG.BIBLE_VERSE;

  return (
    <section className="w-full max-w-3xl mx-auto py-10 px-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9 }}
        className="paper-card-sage p-8 sm:p-14 rounded-2xl relative shadow-xl border border-[#D1DFC8] space-y-6 text-center"
      >
        {/* Washi tape top corner */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-sage rounded-xs" />

        {/* Hand-drawn floral doodles in corners */}
        <div className="absolute top-4 left-4 font-doodle text-xl text-[#789461]/60">
          ✿ ❀
        </div>
        <div className="absolute bottom-4 right-4 font-doodle text-xl text-[#789461]/60">
          ❀ ✿
        </div>

        {/* Header Icon */}
        <div className="inline-flex p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] mb-2 shadow-xs">
          <BookOpen className="w-6 h-6" />
        </div>

        {/* Heading */}
        <h3 className="font-handwriting text-3xl sm:text-4xl text-[#789461] font-bold">
          {heading}
        </h3>

        {/* Verse Lines */}
        <div className="space-y-3 font-serif text-2xl sm:text-3xl text-[#4A3E3D] font-light leading-relaxed max-w-2xl mx-auto">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              "{line}"
            </motion.p>
          ))}
        </div>

        {/* Reference */}
        <p className="font-serif italic text-lg sm:text-xl text-[#789461] font-semibold pt-2">
          {reference}
        </p>

        {/* Bottom floral accent line */}
        <div className="pt-4 flex items-center justify-center gap-2 text-[#789461]/60 font-doodle text-sm">
          <span>─── ✿ ───</span>
        </div>
      </motion.div>
    </section>
  );
};
