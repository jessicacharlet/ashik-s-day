import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Laugh, ArrowRight, FileCheck } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page6Funny = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_6_FUNNY;
  const friendPhoto = BIRTHDAY_CONFIG.FRIEND_PHOTO;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Decorative Doodles */}
      <div className="absolute top-6 left-6 font-doodle text-2xl text-[#F88379]/40">😂 ✦</div>
      <div className="absolute bottom-6 right-6 font-doodle text-2xl text-[#789461]/40">🍰 🎉</div>

      <div className="max-w-3xl w-full text-center space-y-6 z-10 relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] text-xs font-doodle font-bold uppercase tracking-wider mb-1">
            <Laugh className="w-3.5 h-3.5" />
            <span>Playful Interlude</span>
          </div>
          <h2 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            {cfg.heading}
          </h2>
        </motion.div>

        {/* BIRTHDAY BOY REPORT CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="paper-card p-6 sm:p-10 rounded-2xl relative shadow-xl border border-[#EAE3D2] space-y-6 max-w-2xl mx-auto"
        >
          {/* Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

          {/* Report Header */}
          <div className="flex items-center justify-between border-b border-[#EAE3D2] pb-4">
            <div className="flex items-center gap-2 text-[#789461]">
              <FileCheck className="w-6 h-6" />
              <span className="font-doodle text-xl font-bold tracking-wide">
                {cfg.reportTitle}
              </span>
            </div>
            <span className="font-handwriting text-xl text-[#F88379] font-bold">
              VERIFIED ✅
            </span>
          </div>

          {/* Report Body (Photo + Stats Grid) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
            
            {/* Ashik's Photo Card */}
            <div className="bg-[#FFFDF9] p-3 rounded-sm paper-lifted border border-[#EAE3D2] rotate-[-2deg] shrink-0">
              <div className="w-36 h-44 bg-[#2D2424] rounded-xs overflow-hidden">
                <img src={friendPhoto} alt="Birthday Boy" className="w-full h-full object-cover" />
              </div>
              <p className="font-handwriting text-center text-lg text-[#6B4E3D] font-bold pt-1">
                Subject: Ashik 🎂
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {cfg.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EAE3D2] shadow-xs"
                >
                  <p className="font-doodle text-xs text-[#789461] font-bold">
                    {stat.label}
                  </p>
                  <p className="font-handwriting text-2xl text-[#6B4E3D] font-bold">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Overall Result */}
          <div className="pt-4 border-t border-[#EAE3D2] text-center bg-[#FCE8DE]/40 p-4 rounded-xl border border-[#F6D7C8]">
            <p className="font-handwriting text-3xl sm:text-4xl text-[#F88379] font-bold whitespace-pre-line leading-snug">
              {cfg.overallResult}
            </p>
          </div>

          {/* Navigation Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigate('/final')}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{cfg.buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
