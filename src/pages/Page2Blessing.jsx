import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page2Blessing = () => {
  const navigate = useNavigate();
  // Safe config extraction with fallbacks to guarantee zero runtime crashes
  const cfg = BIRTHDAY_CONFIG.PAGE_2_BLESSING || BIRTHDAY_CONFIG.PAGE_3_BLESSING || {};

  const heading = cfg.heading || "Before the birthday wishes... 🤍";
  const subheading = cfg.subheading || "A Little Blessing For You";
  const lines = cfg.lines || [
    "May the Lord bless you and keep you;",
    "the Lord make his face shine on you",
    "and be gracious to you;",
    "the Lord turn his face toward you",
    "and give you peace."
  ];
  const reference = cfg.reference || "— Numbers 6:24–26";
  const buttonText = cfg.buttonText || "Next →";

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
        className="max-w-2xl w-full text-center space-y-8 paper-card-sage p-8 sm:p-14 rounded-2xl relative shadow-xl border border-[#D1DFC8] z-10 opacity-100 visible"
      >
        {/* Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs pointer-events-none" />

        {/* Icon */}
        <div className="inline-flex p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] shadow-xs">
          <BookOpen className="w-6 h-6" />
        </div>

        {/* Headings */}
        <div className="space-y-1">
          <p className="font-doodle text-sm sm:text-base text-[#789461] font-bold uppercase tracking-widest">
            {heading}
          </p>
          <h1 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            {subheading}
          </h1>
        </div>

        {/* Numbers 6:24-26 Verse */}
        <div className="space-y-3 font-serif text-2xl sm:text-3xl text-[#4A3E3D] font-light leading-relaxed max-w-xl mx-auto py-2">
          {lines.map((line, idx) => (
            <p key={idx} className="text-[#4A3E3D]">
              "{line}"
            </p>
          ))}
        </div>

        <span className="font-serif italic text-lg sm:text-xl text-[#789461] font-bold block">
          {reference}
        </span>

        {/* Next Button */}
        <div className="pt-4 border-t border-[#D1DFC8]/60 flex justify-center relative z-20">
          <button
            onClick={handleNext}
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer z-30 pointer-events-auto"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.main>
    </div>
  );
};

export default Page2Blessing;
