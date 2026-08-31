import React from 'react';

export const PhotoCard = ({ photoUrl, caption, label, rotationClass = '', className = '' }) => {
  return (
    <div
      className={`group relative bg-slate-50 p-3 sm:p-4 pb-5 sm:pb-6 rounded-md shadow-2xl border border-slate-200/80 transition-all duration-300 ${rotationClass} ${className}`}
      style={{
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(245, 158, 11, 0.15)'
      }}
    >
      {/* Decorative Washi Tape / Pin on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-amber-200/50 backdrop-blur-xs border border-amber-300/60 rotate-[-1deg] z-20 shadow-xs rounded-xs pointer-events-none" />

      {/* Floating Badge/Label if provided */}
      {label && (
        <div className="absolute -top-4 -right-3 z-30 px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs rounded-full shadow-lg border border-amber-200 flex items-center gap-1 animate-bounce">
          <span>{label}</span>
        </div>
      )}

      {/* Photo Frame Container */}
      <div className="relative aspect-4/5 w-44 sm:w-56 md:w-64 bg-slate-900 overflow-hidden rounded-xs border border-slate-300/40">
        <img
          src={photoUrl}
          alt={caption || 'Polaroid Memory'}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle photo gloss sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Handwritten Polaroid Caption */}
      {caption && (
        <div className="pt-3 text-center">
          <p className="font-handwriting text-xl sm:text-2xl text-slate-800 font-bold leading-tight">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};
