import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flower2, Camera, CameraOff, CheckCircle2, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export const Page7Final = () => {
  const cfg = BIRTHDAY_CONFIG.PAGE_7_FINAL;
  const camCfg = BIRTHDAY_CONFIG.WEBCAM_SECTION;

  // Envelope state: false = sealed, true = letter opened
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Webcam States: 'idle' | 'requesting' | 'live' | 'captured' | 'denied'
  const [cameraState, setCameraState] = useState('idle');
  const [capturedImage, setCapturedImage] = useState(null);
  const [showFlash, setShowFlash] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera stream safely
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopWebcam();
  }, []);

  // Request Webcam Access on explicit user click
  const handleOpenCam = async () => {
    setCameraState('requesting');
    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      } catch (err1) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      streamRef.current = stream;
      setCameraState('live');

      // Attach stream to video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.warn("Webcam permission denied or unavailable:", err);
      setCameraState('denied');
    }
  };

  // Capture Photo Frame to Canvas
  const handleCapture = () => {
    if (!videoRef.current) return;

    // Camera Shutter Flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');

    // Flip canvas horizontally for front camera mirror effect
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);

    stopWebcam();
    setCameraState('captured');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative select-none overflow-hidden bg-[#FAF7F2]">
      {/* Paper texture grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D7_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-60 pointer-events-none z-0" />

      {/* Shutter Flash Animation */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Paper Petals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.7, 0], y: -120 }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.7 }}
            className="absolute font-doodle text-xl text-[#789461]"
            style={{ left: `${10 + i * 12}%`, bottom: '10%' }}
          >
            {i % 2 === 0 ? '✿' : '♡'}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 z-10 relative my-8">

        {/* -------------------------------------------------- */}
        {/* ENVELOPE INTERACTION */}
        {/* -------------------------------------------------- */}
        <div className="relative py-2 flex flex-col items-center">
          {!isEnvelopeOpen ? (
            /* CLOSED WAX SEALED ENVELOPE */
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setIsEnvelopeOpen(true)}
              className="relative cursor-pointer"
            >
              <div className="w-72 sm:w-88 h-48 sm:h-56 bg-[#F6D7C8] rounded-md border border-[#E8C1B0] shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
                {/* Flap */}
                <div className="absolute top-0 inset-x-0 h-24 bg-[#FAD6C5] clip-polygon border-b border-[#E8C1B0]" />

                {/* Wax Seal */}
                <div className="p-4 rounded-full bg-[#F88379] border-2 border-white text-white shadow-md z-10 animate-bounce">
                  <Heart className="w-8 h-8 fill-white" />
                </div>

                <div className="mt-4 z-10">
                  <button
                    onClick={() => setIsEnvelopeOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#FFFDF9] border border-[#F6D7C8] font-handwriting text-2xl text-[#6B4E3D] font-bold shadow-sm hover:bg-[#F88379] hover:text-white transition-all duration-300"
                  >
                    Open it 💌
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* REVEALED LETTER */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full paper-card p-8 sm:p-12 rounded-2xl border border-[#EAE3D2] shadow-2xl relative space-y-6 text-center"
              >
                {/* Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-sage rounded-xs" />

                <div className="p-3 rounded-full bg-[#EBF1E8] border border-[#D1DFC8] text-[#789461] inline-block shadow-xs">
                  <Flower2 className="w-6 h-6 animate-pulse-soft" />
                </div>

                {/* Title: HAPPY BIRTHDAY CHIPS VAAYA ❤️ */}
                <div className="py-2 space-y-1">
                  <h3 className="font-sans text-xl sm:text-2xl text-[#6B4E3D] uppercase tracking-widest font-extrabold">
                    {cfg.heading}
                  </h3>
                  <h1 className="font-handwriting text-5xl sm:text-7xl text-[#F88379] font-bold tracking-wide leading-tight drop-shadow-sm">
                    {cfg.nameTitle}
                  </h1>
                </div>

                {/* Blessing Lines */}
                <div className="space-y-2 text-[#4A3E3D] font-serif text-xl sm:text-2xl leading-relaxed font-light max-w-lg mx-auto">
                  {cfg.blessingLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EAE3D2]">
                  <p className="font-handwriting text-3xl text-[#F88379] font-bold">
                    {cfg.footer}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* -------------------------------------------------- */}
        {/* WEBCAM SURPRISE SECTION (After letter is opened) */}
        {/* -------------------------------------------------- */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 space-y-6"
          >
            {/* 1. IDLE STATE: PROMPT & OPEN CAMERA BUTTON */}
            {cameraState === 'idle' && (
              <div className="paper-card-peach p-6 sm:p-8 rounded-2xl border border-[#F6D7C8] shadow-lg space-y-4 max-w-md mx-auto">
                <div className="p-3 rounded-full bg-white text-[#F88379] inline-block shadow-xs">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-handwriting text-3xl text-[#6B4E3D] font-bold">
                    {camCfg.prompt}
                  </h3>
                  <p className="font-serif italic text-lg text-[#4A3E3D]">
                    {camCfg.subprompt}
                  </p>
                </div>

                <button
                  onClick={handleOpenCam}
                  className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#F88379] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#e76e64] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>{camCfg.openCameraButton}</span>
                </button>
              </div>
            )}

            {/* 2. REQUESTING STATE */}
            {cameraState === 'requesting' && (
              <div className="paper-card p-6 rounded-2xl max-w-md mx-auto animate-pulse">
                <p className="font-handwriting text-2xl text-[#6B4E3D] font-bold">
                  Requesting camera permission... 📷
                </p>
              </div>
            )}

            {/* 3. LIVE WEBCAM PREVIEW IN POLAROID FRAME */}
            {cameraState === 'live' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="paper-card p-4 sm:p-6 rounded-sm border border-[#EAE3D2] shadow-2xl max-w-sm sm:max-w-md mx-auto space-y-4 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-sage rounded-xs" />

                <h3 className="font-handwriting text-3xl text-[#789461] font-bold">
                  {camCfg.smileText}
                </h3>

                {/* Video Element */}
                <div className="relative aspect-4/3 w-full bg-[#111] rounded-xs overflow-hidden border border-[#EAE3D2]">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]" // Mirror preview
                  />
                </div>

                {/* Capture Button */}
                <button
                  onClick={handleCapture}
                  className="w-full py-3.5 rounded-full bg-[#789461] text-white font-handwriting text-2xl font-bold shadow-md hover:bg-[#688252] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Camera className="w-6 h-6" />
                  <span>{camCfg.captureButton}</span>
                </button>
              </motion.div>
            )}

            {/* 4. CAPTURED POLAROID FRAME */}
            {cameraState === 'captured' && capturedImage && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="paper-card p-4 sm:p-6 rounded-sm border border-[#EAE3D2] shadow-2xl max-w-sm sm:max-w-md mx-auto space-y-4 relative rotate-[-1deg]"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-peach rounded-xs" />

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1E8] text-[#789461] font-handwriting text-lg font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{camCfg.gotItText}</span>
                </div>

                {/* Captured Image */}
                <div className="relative aspect-4/3 w-full bg-[#111] rounded-xs overflow-hidden border border-[#EAE3D2]">
                  <img src={capturedImage} alt="Captured Birthday Memory" className="w-full h-full object-cover" />
                </div>

                <div className="pt-2 text-center space-y-1">
                  <p className="font-handwriting text-2xl text-[#6B4E3D] font-bold">
                    {camCfg.capturedNotice}
                  </p>
                  <p className="font-handwriting text-3xl text-[#F88379] font-bold">
                    Happy Birthday Chips Vaaya ❤️
                  </p>
                </div>
              </motion.div>
            )}

            {/* 5. PERMISSION DENIED FALLBACK STATE */}
            {cameraState === 'denied' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="paper-card-peach p-6 sm:p-8 rounded-2xl border border-[#F6D7C8] shadow-md max-w-md mx-auto space-y-4"
              >
                <div className="p-3 rounded-full bg-white text-[#F88379] inline-block shadow-xs">
                  <CameraOff className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-handwriting text-3xl text-[#6B4E3D] font-bold">
                    {camCfg.deniedText}
                  </h4>
                  <p className="font-serif italic text-base text-[#4A3E3D]">
                    {camCfg.deniedSubtext}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={handleOpenCam}
                    className="px-6 py-2.5 rounded-full bg-[#FFFDF9] border border-[#F6D7C8] font-handwriting text-xl text-[#6B4E3D] font-bold hover:bg-[#FCE8DE] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{camCfg.tryAgainButton}</span>
                  </button>
                  <button
                    onClick={() => setCameraState('idle')}
                    className="px-6 py-2.5 rounded-full bg-[#789461] text-white font-handwriting text-xl font-bold hover:bg-[#688252] transition-all cursor-pointer"
                  >
                    <span>{camCfg.finishButton}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
};
