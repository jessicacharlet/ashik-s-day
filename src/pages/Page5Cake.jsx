import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, Wind, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { triggerCakeFireworks } from '../components/ConfettiEffect';

export const Page5Cake = () => {
  const navigate = useNavigate();
  const cfg = BIRTHDAY_CONFIG.PAGE_5_CAKE;

  const [isBlown, setIsBlown] = useState(false);
  const [isMicListening, setIsMicListening] = useState(false);
  const [micDenied, setMicDenied] = useState(false);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);

  // Clean up Web Audio resources
  const stopAudioListening = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
    }
  };

  useEffect(() => {
    return () => stopAudioListening();
  }, []);

  // Trigger Candle Blow Out sequence
  const executeBlowout = () => {
    if (isBlown) return;
    setIsBlown(true);
    setIsMicListening(false);
    stopAudioListening();
    triggerCakeFireworks();
  };

  // Request Microphone and detect blowing sound volume
  const handleStartMic = async () => {
    if (isBlown) return;
    setIsMicListening(true);
    setMicDenied(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Threshold for wind/blow volume detection
        if (average > 45) {
          executeBlowout();
        } else {
          animFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      console.warn('Microphone permission denied or unsupported:', err);
      setIsMicListening(false);
      setMicDenied(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      <div className="max-w-2xl w-full text-center space-y-6 z-10 relative">

        {/* Heading & Rule Text */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] text-xs font-doodle font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Birthday Tradition</span>
          </div>
          <h2 className="font-handwriting text-3xl sm:text-5xl text-[#6B4E3D] font-bold">
            {cfg.heading}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#4A3E3D] max-w-lg mx-auto">
            {cfg.ruleText}
          </p>
        </motion.div>

        {/* Cake Container Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="paper-card p-8 sm:p-12 rounded-2xl relative shadow-xl border border-[#EAE3D2] space-y-6"
        >
          {/* Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

          {/* MAKE A WISH BIG TEXT */}
          <div className="space-y-1">
            <h1 className="font-handwriting text-5xl sm:text-7xl text-[#F88379] font-bold tracking-wide">
              {cfg.makeWishBig}
            </h1>
            <p className="font-serif text-base sm:text-lg text-[#6B4E3D] italic">
              "{cfg.secretText}"
            </p>
          </div>

          {/* -------------------------------------------------- */}
          {/* ILLUSTRATED CAKE & 3 CANDLES */}
          {/* -------------------------------------------------- */}
          <div className="relative w-64 sm:w-80 h-52 sm:h-60 mx-auto flex flex-col items-center justify-end py-4">

            {/* Candle Flames Layer */}
            <div className="absolute top-4 sm:top-6 flex items-center justify-center gap-10 sm:gap-14 z-20">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  {!isBlown ? (
                    <motion.div
                      animate={{
                        scale: isMicListening ? [1, 1.25, 0.9, 1.3] : [1, 1.12, 1],
                        opacity: [0.85, 1, 0.9]
                      }}
                      transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-4 sm:w-5 h-7 sm:h-8 rounded-full bg-gradient-to-t from-[#FF4500] via-[#FFA500] to-[#FFFF00] shadow-[0_0_15px_#FFA500] cursor-pointer"
                      onClick={executeBlowout}
                    />
                  ) : (
                    /* Smoke rising when candle is blown */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -45, scale: 1.8 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                      className="w-3 h-3 rounded-full bg-[#B0A8A0] filter blur-xs"
                    />
                  )}
                  {/* Candle Wick & Body */}
                  <div className="w-1 h-2 bg-[#4A3E3D]" />
                  <div className="w-3.5 sm:w-4 h-12 sm:h-14 bg-gradient-to-b from-[#FCE8DE] to-[#F6D7C8] rounded-t-sm border border-[#E8C1B0]" />
                </div>
              ))}
            </div>

            {/* Cake Layers */}
            <div className="w-full space-y-1 relative z-10 pt-8">
              {/* Top Icing */}
              <div className="w-48 sm:w-60 h-10 sm:h-12 mx-auto bg-[#FFFDF9] rounded-t-2xl border-2 border-[#EAE3D2] shadow-xs flex items-center justify-around px-4">
                <span className="text-[#F88379] font-doodle text-xs">✿</span>
                <span className="text-[#789461] font-doodle text-xs">✿</span>
                <span className="text-[#F88379] font-doodle text-xs">✿</span>
              </div>
              {/* Cake Base */}
              <div className="w-56 sm:w-72 h-20 sm:h-24 mx-auto bg-gradient-to-b from-[#FCE8DE] to-[#EBF1E8] rounded-b-xl border-2 border-[#EAE3D2] shadow-md flex items-center justify-center">
                <span className="font-handwriting text-2xl text-[#6B4E3D] font-bold opacity-40">
                  Happy Birthday
                </span>
              </div>
            </div>

          </div>

          {/* -------------------------------------------------- */}
          {/* INTERACTION CONTROLS & SUCCESS STATE */}
          {/* -------------------------------------------------- */}
          {!isBlown ? (
            <div className="space-y-3 pt-2">
              {!isMicListening ? (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleStartMic}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F88379] text-white font-handwriting text-xl sm:text-2xl font-bold shadow-md hover:bg-[#e76e64] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Mic className="w-5 h-5" />
                    <span>{cfg.micButtonText}</span>
                  </button>

                  <button
                    onClick={executeBlowout}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#789461] text-white font-handwriting text-xl sm:text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Wind className="w-5 h-5" />
                    <span>{cfg.tapButtonText}</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-full bg-[#FCE8DE] border border-[#F6D7C8] text-[#F88379] inline-flex items-center gap-2 font-handwriting text-xl font-bold animate-pulse">
                  <Mic className="w-5 h-5 animate-bounce" />
                  <span>Listening... Blow into your microphone! 💨</span>
                </div>
              )}

              {micDenied && (
                <p className="font-sans text-xs text-[#8B7E74]">
                  Microphone disabled — Click "Tap to Blow 💨" to blow out the candles!
                </p>
              )}
            </div>
          ) : (
            /* WISH SENT SUCCESS STATE */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 pt-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] text-lg font-handwriting font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{cfg.successHeading}</span>
                </div>

                <p className="font-serif italic text-xl sm:text-2xl text-[#4A3E3D]">
                  "{cfg.successSubtext}"
                </p>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => navigate('/funny')}
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{cfg.buttonText}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

        </motion.div>

      </div>
    </div>
  );
};
