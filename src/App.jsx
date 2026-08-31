import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Page1Loading } from './pages/Page1Loading';
import { Page2Blessing } from './pages/Page2Blessing';
import { Page3Postcard } from './pages/Page3Postcard';
import { Page4Birthday } from './pages/Page4Birthday';
import { Page5Cake } from './pages/Page5Cake';
import { Page6Funny } from './pages/Page6Funny';
import { Page7Final } from './pages/Page7Final';
import { MusicProvider } from './context/MusicContext';
import { MusicButton } from './components/MusicButton';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-full min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Page1Loading />} />
          <Route path="/blessing" element={<Page2Blessing />} />
          <Route path="/postcard" element={<Page3Postcard />} />
          <Route path="/birthday" element={<Page4Birthday />} />
          <Route path="/cake" element={<Page5Cake />} />
          <Route path="/funny" element={<Page6Funny />} />
          <Route path="/final" element={<Page7Final />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FAF7F2] text-[#4A3E3D] relative font-sans antialiased overflow-x-hidden selection:bg-[#FAD6C5] selection:text-[#6B4E3D]">
          {/* Floating Global Audio Controller */}
          <MusicButton />

          {/* Animated Page Transitions */}
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
