import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const SurpriseEnvelope = () => {
  const { prompt, buttonText, letterMessage } = BIRTHDAY_CONFIG.SURPRISE_ENVELOPE;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full max-w-2xl mx-auto py-14 px-4 text-center select-none">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <p className="font-doodle text-sm text-[#789461] font-bold uppercase tracking-wider">
            Secret Note
          </p>
          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#6B4E3D]">
            "{prompt}"
          </h3>
        </motion.div>

        {/* Envelope Area */}
        <div className="relative py-6 flex flex-col items-center">
          {!isOpen ? (
            /* CLOSED ENVELOPE WITH WAX SEAL */
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="relative cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {/* Envelope Body */}
              <div className="w-72 sm:w-88 h-48 sm:h-56 bg-[#F6D7C8] rounded-md border border-[#E8C1B0] shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
                {/* Envelope Flap Creases */}
                <div className="absolute top-0 inset-x-0 h-24 bg-[#FAD6C5] clip-polygon border-b border-[#E8C1B0]" />
                
                {/* Heart Wax Seal */}
                <div className="p-4 rounded-full bg-[#F88379] border-2 border-white text-white shadow-md z-10 animate-bounce">
                  <Heart className="w-8 h-8 fill-white" />
                </div>

                {/* Button overlay prompt */}
                <div className="mt-4 z-10">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#FFFDF9] border border-[#F6D7C8] font-handwriting text-2xl text-[#6B4E3D] font-bold shadow-sm hover:bg-[#F88379] hover:text-white transition-all duration-300"
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* OPENED ENVELOPE & REVEALED LETTER */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full paper-card p-8 sm:p-12 rounded-2xl border border-[#EAE3D2] shadow-2xl relative space-y-6 text-center"
              >
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

                <div className="p-3 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] inline-block shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>

                <div className="space-y-4">
                  <p className="font-handwriting text-3xl sm:text-4xl text-[#6B4E3D] font-bold leading-relaxed whitespace-pre-line">
                    {letterMessage}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE3D2] flex justify-center">
                  <Sparkles className="w-5 h-5 text-[#789461] animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
