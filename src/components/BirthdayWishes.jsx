import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Heart, Sparkles, Sun } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

const ICON_MAP = {
  Smile,
  Heart,
  Sparkles,
  Sun
};

export const BirthdayWishes = () => {
  const wishes = BIRTHDAY_CONFIG.WISHES;

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 select-none">
      <div className="space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2"
        >
          <p className="font-doodle text-base text-[#789461] font-bold uppercase tracking-wider">
            Warm Wishes
          </p>
          <h2 className="font-handwriting text-4xl sm:text-6xl text-[#6B4E3D] font-bold">
            A Few Things I Wish For You ✨
          </h2>
        </motion.div>

        {/* 4 Handmade Paper Stationery Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {wishes.map((note, idx) => {
            const IconComp = ICON_MAP[note.icon] || Sparkles;

            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 1 : -1 }}
                className={`relative ${note.paperColor} p-6 sm:p-8 rounded-xl shadow-md border transition-all duration-300 overflow-hidden`}
              >
                {/* Washi Tape on top */}
                <div
                  className={`absolute -top-3 left-8 w-20 h-5 ${note.tapeColor} rounded-xs rotate-[-2deg] shadow-xs`}
                />

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white/60 border border-black/5 text-2xl shadow-xs">
                    <span>{note.emoji}</span>
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className={`font-handwriting text-3xl font-bold ${note.accentColor}`}>
                      {note.title}
                    </h3>
                    <p className="font-serif text-lg text-[#4A3E3D] font-normal leading-relaxed">
                      "{note.message}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
