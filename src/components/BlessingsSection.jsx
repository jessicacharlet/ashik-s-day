import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Rocket, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

const ICON_MAP = {
  Heart: Heart,
  Leaf: Leaf,
  Rocket: Rocket,
  Sparkles: Sparkles
};

export const BlessingsSection = () => {
  const blessings = BIRTHDAY_CONFIG.BLESSINGS;

  return (
    <section className="py-24 px-6 relative z-10 select-none">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <p className="text-amber-400 font-medium text-sm uppercase tracking-widest">
            Spiritual Wishes & Hope
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-slate-100 font-bold tracking-tight text-glow-white">
            Birthday Prayers 🙏
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* 4 Blessing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {blessings.map((card, idx) => {
            const IconComponent = ICON_MAP[card.icon] || Sparkles;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative glass-card p-8 rounded-3xl border border-white/10 ${card.borderColor} transition-all duration-500 overflow-hidden cursor-default shadow-lg hover:shadow-2xl`}
              >
                {/* Background soft gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${card.textColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner`}
                  >
                    <span className="text-2xl mr-1">{card.emoji}</span>
                    <IconComponent className="w-6 h-6 inline-block" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className={`text-2xl font-serif font-bold ${card.textColor} tracking-wide`}>
                      {card.title}
                    </h3>
                    <p className="text-slate-300 font-sans text-base leading-relaxed font-light">
                      "{card.blessing}"
                    </p>
                  </div>
                </div>

                {/* Subtle bottom light line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-amber-400/50 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
