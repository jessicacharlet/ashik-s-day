import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page2Blessing = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_2_BLESSING || BIRTHDAY_CONFIG.PAGE_3_BLESSING || {};

  const handleNext = () => {
    navigate('/birthday');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Decorative Floral Doodles */}
      <div className="absolute top-6 left-6 font-doodle text-xl text-[#789461]/50 pointer-events-none">✿ ❀</div>
      <div className="absolute bottom-6 right-6 font-doodle text-xl text-[#789461]/50 pointer-events-none">❀ ✿</div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-6 paper-card-sage p-8 sm:p-12 rounded-2xl relative shadow-xl border border-[#D1DFC8] z-10"
      >
        {/* Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs pointer-events-none" />

        {/* Icon */}
        <div className="inline-flex p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] shadow-xs">
          <BookOpen className="w-6 h-6" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            {cfg.heading}
          </h1>
        </div>

        {/* Psalm 20:4 Verse */}
        <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#EAE3D2] space-y-2 shadow-xs max-w-xl mx-auto">
          <p className="font-serif italic text-2xl sm:text-3xl text-[#789461] font-semibold leading-relaxed">
            {cfg.verseText}
          </p>
          <span className="font-serif text-lg sm:text-xl text-[#6B4E3D] font-bold block">
            {cfg.reference}
          </span>
        </div>

        {/* Meaningful blessing text */}
        <div className="space-y-3 font-serif text-lg sm:text-xl text-[#4A3E3D] font-light leading-relaxed max-w-xl mx-auto pt-2">
          {cfg.blessingParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Bottom Funny Note */}
        <p className="font-handwriting text-xl text-[#F88379] font-bold">
          {cfg.bottomNote}
        </p>

        {/* Next Button */}
        <div className="pt-4 border-t border-[#D1DFC8]/60 flex justify-center relative z-20">
          <button
            onClick={handleNext}
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer z-30 pointer-events-auto"
          >
            <span>{cfg.buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.main>
    </div>
  );
};

export default Page2Blessing;
