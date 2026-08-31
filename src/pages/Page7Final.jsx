import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Flower2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page7Final = () => {
  const cfg = BIRTHDAY_CONFIG.PAGE_7_FINAL;
  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Floating Paper Petals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.7, 0], y: -120 }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.7 }}
            className="absolute font-doodle text-xl text-[#789461]"
            style={{ left: `${10 + i * 12}%`, bottom: '10%' }}
          >
            {i % 2 === 0 ? '✿' : '♡'}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 z-10 relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] text-xs font-doodle font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Final Gift</span>
          </div>
          <h2 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            {cfg.heading}
          </h2>
        </motion.div>

        {/* Envelope Interaction */}
        <div className="relative py-4 flex flex-col items-center">
          {!isOpen ? (
            /* CLOSED WAX SEALED ENVELOPE */
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setIsOpen(true)}
              className="relative cursor-pointer"
            >
              <div className="w-72 sm:w-88 h-48 sm:h-56 bg-[#F6D7C8] rounded-md border border-[#E8C1B0] shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
                {/* Flap */}
                <div className="absolute top-0 inset-x-0 h-24 bg-[#FAD6C5] clip-polygon border-b border-[#E8C1B0]" />

                {/* Wax Seal */}
                <div className="p-4 rounded-full bg-[#F88379] border-2 border-white text-white shadow-md z-10 animate-bounce">
                  <Heart className="w-8 h-8 fill-white" />
                </div>

                <div className="mt-4 z-10">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#FFFDF9] border border-[#F6D7C8] font-handwriting text-2xl text-[#6B4E3D] font-bold shadow-sm hover:bg-[#F88379] hover:text-white transition-all duration-300"
                  >
                    {cfg.openButtonText}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* REVEALED HANDWRITTEN LETTER */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full paper-card p-8 sm:p-14 rounded-2xl border border-[#EAE3D2] shadow-2xl relative space-y-6 text-center"
              >
                {/* Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

                <div className="p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] inline-block shadow-xs">
                  <Flower2 className="w-6 h-6 animate-pulse-soft" />
                </div>

                <div className="space-y-4 text-[#4A3E3D] font-serif text-xl sm:text-2xl leading-relaxed font-light max-w-lg mx-auto">
                  {cfg.letterParagraphs.map((para, idx) => (
                    <p key={idx}>"{para}"</p>
                  ))}
                </div>

                <div className="py-2">
                  <span className="font-handwriting text-5xl sm:text-7xl text-[#789461] font-bold block">
                    {friendName}
                  </span>
                </div>

                <div className="pt-6 border-t border-[#EAE3D2] flex flex-col items-center gap-2">
                  <p className="font-handwriting text-3xl text-[#F88379] font-bold">
                    {cfg.footer}
                  </p>
                  <p className="font-sans text-xs text-[#8B7E74]">
                    © {BIRTHDAY_CONFIG.BIRTHDAY_YEAR} • Handmade Digital Card
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
};
