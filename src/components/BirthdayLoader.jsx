import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const BirthdayLoader = ({ onComplete }) => {
  const steps = BIRTHDAY_CONFIG.LOADING_SEQUENCE;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return prev;
        }
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#FAF7F2] text-[#4A3E3D] select-none overflow-hidden"
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Decorative floral doodle corner icons */}
      <div className="absolute top-8 left-8 text-[#789461]/40 font-doodle text-2xl">
        ✿ ❀ ❁
      </div>
      <div className="absolute bottom-8 right-8 text-[#F88379]/40 font-doodle text-2xl">
        ♡ ✧ ♡
      </div>

      <div className="max-w-md w-full text-center space-y-8 paper-card p-8 sm:p-12 rounded-2xl relative shadow-xl border border-[#EAE3D2]">
        {/* Washi tape at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-sage rounded-xs" />

        {/* Animated Hand-drawn Spinner */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#789461]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] shadow-sm"
          >
            <Heart className="w-8 h-8 fill-[#F88379]" />
          </motion.div>
        </div>

        {/* Step Message Transitions */}
        <div className="min-h-[90px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <h2 className="font-handwriting text-3xl sm:text-4xl text-[#6B4E3D] font-bold">
                {steps[currentStep].title}
              </h2>
              <p className="font-doodle text-sm sm:text-base text-[#789461] font-medium tracking-wide">
                {steps[currentStep].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EAE3D2] h-2 rounded-full overflow-hidden p-0.5 border border-[#D5CBB5]">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-[#789461] via-[#F88379] to-[#8B5CF6] rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
