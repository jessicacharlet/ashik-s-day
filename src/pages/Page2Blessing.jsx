import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page2Blessing = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_2_BLESSING;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Decorative Floral Doodles */}
      <div className="absolute top-6 left-6 font-doodle text-xl text-[#789461]/50">✿ ❀</div>
      <div className="absolute bottom-6 right-6 font-doodle text-xl text-[#789461]/50">❀ ✿</div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center space-y-8 paper-card-sage p-8 sm:p-14 rounded-2xl relative shadow-xl border border-[#D1DFC8] z-10"
      >
        {/* Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

        {/* Icon */}
        <div className="inline-flex p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] shadow-xs">
          <BookOpen className="w-6 h-6" />
        </div>

        {/* Headings */}
        <div className="space-y-1">
          <p className="font-doodle text-sm sm:text-base text-[#789461] font-bold uppercase tracking-widest">
            {cfg.heading}
          </p>
          <h2 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            {cfg.subheading}
          </h2>
        </div>

        {/* Numbers 6:24-26 Verse */}
        <div className="space-y-3 font-serif text-2xl sm:text-3xl text-[#4A3E3D] font-light leading-relaxed max-w-xl mx-auto py-2">
          {cfg.lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.2, duration: 0.8 }}
            >
              "{line}"
            </motion.p>
          ))}
        </div>

        <p className="font-serif italic text-lg sm:text-xl text-[#789461] font-bold">
          {cfg.reference}
        </p>

        {/* Next Button */}
        <div className="pt-4 border-t border-[#D1DFC8]/60 flex justify-center">
          <button
            onClick={() => navigate('/postcard')}
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{cfg.buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
