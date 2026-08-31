import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { BirthdayLoader } from './components/BirthdayLoader';
import { PostcardReveal } from './components/PostcardReveal';
import { BirthdayReveal } from './components/BirthdayReveal';
import { BibleVerse } from './components/BibleVerse';
import { BirthdayWishes } from './components/BirthdayWishes';
import { SurpriseEnvelope } from './components/SurpriseEnvelope';
import { FinalCard } from './components/FinalCard';
import { MusicPlayer } from './components/MusicPlayer';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPostcardSettled, setIsPostcardSettled] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E3D] relative font-sans antialiased overflow-x-hidden selection:bg-[#FAD6C5] selection:text-[#6B4E3D]">
      {/* Paper texture dotted background grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* 1. LOADING EXPERIENCE */}
      <AnimatePresence>
        {isLoading && (
          <BirthdayLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. MAIN HANDMADE SCRAPBOOK EXPERIENCE */}
      {!isLoading && (
        <main className="relative z-10 space-y-12 sm:space-y-16 pb-12 pt-6">

          {/* DUAL-PHOTO DRAGGING POSTCARD REVEAL */}
          <PostcardReveal onSettled={() => setIsPostcardSettled(true)} />

          {/* SECTIONS REVEALED ONLY AFTER POSTCARDS SETTLE */}
          <AnimatePresence>
            {isPostcardSettled && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="space-y-12 sm:space-y-16"
              >
                {/* BIRTHDAY REVEAL */}
                <BirthdayReveal />

                {/* BIBLE VERSE BLESSING */}
                <BibleVerse />

                {/* 4 HANDMADE WISH STATIONERY NOTES */}
                <BirthdayWishes />

                {/* SURPRISE ENVELOPE INTERACTION */}
                <SurpriseEnvelope />

                {/* FINAL SCRAPBOOK CARD */}
                <FinalCard />
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      )}
    </div>
  );
}

export default App;
