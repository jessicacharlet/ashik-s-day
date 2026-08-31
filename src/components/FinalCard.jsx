import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const FinalCard = () => {
  const { heading, blessing, footer } = BIRTHDAY_CONFIG.FINAL_CARD;
  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;

  return (
    <footer className="w-full py-20 px-4 text-center select-none relative overflow-hidden border-t border-[#EAE3D2]">
      {/* Floating Paper Petals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.7, 0], y: -100 }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.8 }}
            className="absolute font-doodle text-lg text-[#789461]"
            style={{
              left: `${15 + i * 15}%`,
              bottom: '10%'
            }}
          >
            {i % 2 === 0 ? '✿' : '♡'}
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="paper-card p-8 sm:p-14 rounded-2xl border border-[#EAE3D2] shadow-xl space-y-6"
        >
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

          <div className="p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] inline-block">
            <Flower2 className="w-6 h-6 animate-pulse-soft" />
          </div>

          {/* Heading */}
          <h2 className="font-handwriting text-5xl sm:text-7xl text-[#6B4E3D] font-bold">
            {heading} <br />
            <span className="text-[#789461]">{friendName} 🎂</span>
          </h2>

          {/* Blessing */}
          <p className="font-serif italic text-xl sm:text-2xl text-[#4A3E3D] max-w-lg mx-auto font-light leading-relaxed">
            "{blessing}"
          </p>

          {/* Footer Note */}
          <div className="pt-8 border-t border-[#EAE3D2] flex flex-col items-center gap-2">
            <p className="font-handwriting text-3xl text-[#F88379] font-bold">
              {footer}
            </p>
            <p className="font-sans text-xs text-[#8B7E74]">
              © {BIRTHDAY_CONFIG.BIRTHDAY_YEAR} • Handmade Digital Postcard
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
