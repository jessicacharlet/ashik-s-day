import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, Wind, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { triggerWishFireworks } from '../components/ConfettiEffect';

export const Page5Cake = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_5_CAKE;

  // Candles lit state: 3 candles
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micError, setMicError] = useState(false);
  const [wishStage, setWishStage] = useState('initial'); // 'initial' | 'blowing' | 'done'

  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);

  const allBlownOut = candlesLit.every((lit) => !lit);

  // Trigger candle blowout sequence
  const executeBlowout = () => {
    if (wishStage === 'done') return;

    setWishStage('blowing');
    setCandlesLit([false, false, false]);

    // Stop mic stream if active
    stopMicListening();

    setTimeout(() => {
      setWishStage('done');
      triggerWishFireworks();
    }, 2400);
  };

  // Microphone Volume Listener via Web Audio API
  const startMicListening = async () => {
    try {
      setMicError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsListeningMic(true);

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;

        // If user blows into microphone (volume threshold > 45)
        if (average > 45) {
          executeBlowout();
        } else {
          animFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access unavailable:", err);
      setMicError(true);
      setIsListeningMic(false);
    }
  };

  const stopMicListening = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsListeningMic(false);
  };

  useEffect(() => {
    return () => stopMicListening();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Background paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Dark overlay when blown out */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs pointer-events-none transition-opacity duration-1000 z-10 ${
          allBlownOut ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="max-w-3xl w-full text-center space-y-8 z-20 relative">

        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] text-xs font-doodle font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Wish</span>
          </div>
          <h2 className="font-handwriting text-4xl sm:text-6xl text-[#6B4E3D] font-bold">
            {cfg.heading}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#4A3E3D]">
            {cfg.subheading}
          </p>
        </motion.div>

        {/* Cake Container */}
        <div className="relative py-8 flex justify-center items-end min-h-[300px]">
          {/* Cake Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FAD6C5]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Illustrated Birthday Cake */}
          <div className="relative flex flex-col items-center">
            
            {/* Candle Row */}
            <div className="flex gap-10 sm:gap-14 mb-2 z-10">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <AnimatePresence>
                    {candlesLit[idx] ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        className="relative w-5 h-8 mb-1"
                      >
                        <div className="w-full h-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flame shadow-[0_0_15px_#f59e0b]" />
                      </motion.div>
                    ) : (
                      /* Smoke wisps */
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -25 }}
                        transition={{ duration: 1.5 }}
                        className="w-2 h-6 bg-slate-400/50 rounded-full blur-xs mb-1"
                      />
                    )}
                  </AnimatePresence>

                  <div className="w-1 h-3 bg-[#4A3E3D]" />
                  <div className="w-3.5 h-16 bg-gradient-to-b from-[#F88379] via-[#FAD6C5] to-[#789461] rounded-t-xs border-x border-white/40 shadow-sm" />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="w-48 sm:w-64 h-16 bg-gradient-to-r from-[#FFFDF9] via-[#FCE8DE] to-[#FFFDF9] rounded-t-2xl shadow-md border-t-4 border-[#FAD6C5] relative flex items-center justify-center">
              <span className="font-handwriting text-2xl text-[#6B4E3D] font-bold">
                Happy Birthday
              </span>
            </div>

            {/* Cake Bottom Tier */}
            <div className="w-64 sm:w-80 h-20 bg-gradient-to-r from-[#789461] via-[#87A96B] to-[#789461] rounded-t-xl border-t-4 border-[#D1DFC8] shadow-lg relative flex items-center justify-center">
              <div className="flex gap-4 text-white">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <Sparkles className="w-4 h-4 animate-pulse" />
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Stand */}
            <div className="w-72 sm:w-96 h-4 bg-[#EAE3D2] rounded-full shadow-md border-t border-white" />
          </div>
        </div>

        {/* Subtext */}
        {!allBlownOut && (
          <p className="font-serif italic text-base sm:text-lg text-[#4A3E3D]">
            {cfg.instruction}
          </p>
        )}

        {/* Interactive Blow Controls */}
        {!allBlownOut && (
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            {/* Mic blow button */}
            <button
              onClick={startMicListening}
              className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-handwriting text-xl font-bold shadow-md transition-all ${
                isListeningMic
                  ? 'bg-[#F88379] text-white animate-pulse'
                  : 'bg-[#789461] text-white hover:bg-[#688252]'
              } cursor-pointer`}
            >
              <Mic className="w-5 h-5" />
              <span>{isListeningMic ? 'Listening to your blow... 🎤' : cfg.micButtonText}</span>
            </button>

            {/* Tap fallback button */}
            <button
              onClick={executeBlowout}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] border border-[#EAE3D2] text-[#6B4E3D] font-handwriting text-xl font-bold shadow-xs hover:bg-[#FCE8DE] transition-all cursor-pointer"
            >
              <Wind className="w-5 h-5 text-[#F88379]" />
              <span>{cfg.tapButtonText}</span>
            </button>
          </div>
        )}

        {/* Success Wish Reveal */}
        <AnimatePresence>
          {wishStage === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="paper-card-peach p-6 sm:p-10 rounded-2xl border border-[#F6D7C8] shadow-2xl space-y-4 max-w-xl mx-auto"
            >
              <h3 className="font-doodle text-2xl sm:text-4xl text-[#F88379] font-bold">
                {cfg.successHeading}
              </h3>
              <p className="font-handwriting text-3xl text-[#789461] font-bold">
                {cfg.wishMadeText} {cfg.wishTurnText}
              </p>

              {/* NEXT BUTTON */}
              <div className="pt-4 border-t border-[#F6D7C8] flex justify-center">
                <button
                  onClick={() => navigate('/funny')}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{cfg.buttonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
