import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const BirthdayReveal = () => {
  const { readyNotice, heading, subtext } = BIRTHDAY_CONFIG.BIRTHDAY_REVEAL;
  const friendName = BIRTHDAY_CONFIG.FRIEND_NAME;

  return (
    <section className="w-full max-w-3xl mx-auto text-center space-y-6 px-4 py-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="paper-card-peach p-8 sm:p-12 rounded-2xl relative shadow-lg border border-[#F6D7C8] space-y-6"
      >
        {/* Washi tape decor */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-coral rounded-xs" />

        {/* Ready Notice */}
        <p className="font-doodle text-base sm:text-lg text-[#F88379] font-bold tracking-wide">
          {readyNotice}
        </p>

        {/* Happy Birthday Heading */}
        <h2 className="font-sans text-3xl sm:text-5xl text-[#6B4E3D] font-extrabold tracking-tight">
          {heading}
        </h2>

        {/* FRIEND'S NAME - Elegant Handwritten Typography */}
        <div className="py-2">
          <span className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-[#789461] font-bold tracking-wide block drop-shadow-sm">
            {friendName}
          </span>
        </div>

        {/* Subtext */}
        <p className="font-serif italic text-lg sm:text-2xl text-[#4A3E3D] max-w-xl mx-auto leading-relaxed font-light">
          "{subtext}"
        </p>
      </motion.div>
    </section>
  );
};
