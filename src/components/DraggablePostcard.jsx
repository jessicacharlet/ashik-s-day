import React from 'react';
import { motion } from 'framer-motion';

export const DraggablePostcard = ({
  photoUrl,
  caption,
  tapeColor = 'washi-tape-sage',
  tapeAngle = '-rotate-3',
  stampLabel = 'Postage',
  className = '',
  isDragging = false
}) => {
  return (
    <div
      className={`group relative bg-[#FFFDF9] p-3 sm:p-4 pb-6 sm:pb-8 rounded-sm paper-lifted border border-[#EAE3D2] transition-shadow duration-300 select-none ${
        isDragging ? 'dragging-shadow scale-[1.03]' : ''
      } ${className}`}
      style={{
        boxShadow: isDragging
          ? '0 25px 50px rgba(107, 78, 61, 0.22), 0 10px 20px rgba(0, 0, 0, 0.08)'
          : '0 12px 30px rgba(107, 78, 61, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Washi Tape on top corner */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 ${tapeColor} ${tapeAngle} rounded-xs z-20 shadow-xs pointer-events-none`}
      />

      {/* Decorative Stamp on top right */}
      <div className="absolute top-2 right-2 w-7 h-9 postage-stamp flex items-center justify-center pointer-events-none opacity-80 rotate-3">
        <span className="font-doodle text-[9px] font-bold text-[#6B4E3D] uppercase tracking-tighter">
          {stampLabel}
        </span>
      </div>

      {/* Photo Frame Container */}
      <div className="relative aspect-4/5 w-40 sm:w-52 md:w-60 bg-[#2D2424] overflow-hidden rounded-xs border border-[#E0D8C3]">
        <img
          src={photoUrl}
          alt={caption || 'Handmade memory'}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Soft paper sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Handwritten Caption */}
      {caption && (
        <div className="pt-3 text-center">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#6B4E3D] font-bold leading-tight">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};
