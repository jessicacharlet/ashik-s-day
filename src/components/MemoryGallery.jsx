import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Maximize2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const MemoryGallery = () => {
  const memories = BIRTHDAY_CONFIG.MEMORIES;
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <section className="py-24 px-6 relative z-10 select-none overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs uppercase tracking-widest font-medium mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Photo Album</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-slate-100 font-bold tracking-tight text-glow-white">
            Some Moments Worth Remembering 📸
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-lg mx-auto">
            Click on any Polaroid memory to view it in full view
          </p>
        </motion.div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4">
          {memories.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              onClick={() => setSelectedMemory(photo)}
              className={`group cursor-pointer bg-slate-100 p-4 pb-6 rounded-sm shadow-2xl ${photo.rotation} transition-all duration-300 relative border border-slate-300/40`}
            >
              {/* Decorative Washi Tape effect on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/40 backdrop-blur-xs border border-amber-300/50 rotate-[-2deg] z-10 shadow-xs" />

              {/* Photo Frame Container */}
              <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden rounded-xs">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Handwritten Polaroid Caption */}
              <div className="pt-4 text-center">
                <p className="font-handwriting text-2xl text-slate-800 font-bold leading-tight">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-slate-100 p-6 sm:p-8 rounded-sm shadow-2xl"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] overflow-hidden rounded-xs mb-4">
                <img
                  src={selectedMemory.url}
                  alt={selectedMemory.caption}
                  className="w-full h-full object-contain max-h-[65vh] mx-auto"
                />
              </div>

              <div className="text-center pt-2">
                <p className="font-handwriting text-3xl sm:text-4xl text-slate-900 font-bold">
                  {selectedMemory.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
