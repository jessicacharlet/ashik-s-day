import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const YOUTUBE_VIDEO_ID = 'hRr7qRb-7k4'; // "Slipping Through My Fingers"
const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Initialize YouTube IFrame Player API
  useEffect(() => {
    let checkTimer = null;

    const createPlayer = () => {
      const el = document.getElementById('youtube-player-container');
      if (!el) return false;

      if (window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player('youtube-player-container', {
            height: '200',
            width: '200',
            videoId: YOUTUBE_VIDEO_ID,
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              fs: 0,
              loop: 1,
              playlist: YOUTUBE_VIDEO_ID, // Required for looping in YouTube API
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              enablejsapi: 1,
              playsinline: 1
            },
            events: {
              onReady: (event) => {
                setIsPlayerReady(true);
                try {
                  event.target.setVolume(30); // 30% background volume
                  event.target.playVideo();
                } catch (e) {
                  console.log("Autoplay blocked by browser policy:", e);
                }
              },
              onStateChange: (event) => {
                // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
                if (event.data === 1) {
                  setIsPlaying(true);
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                }
              }
            }
          });
          return true;
        } catch (err) {
          console.warn("Failed to instantiate YT.Player:", err);
          return false;
        }
      }
      return false;
    };

    // Load API script if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    // Poll to ensure container is ready if API loaded before DOM mount
    checkTimer = setInterval(() => {
      if (!playerRef.current && window.YT && window.YT.Player) {
        if (createPlayer()) {
          clearInterval(checkTimer);
        }
      } else if (playerRef.current) {
        clearInterval(checkTimer);
      }
    }, 300);

    return () => {
      if (checkTimer) clearInterval(checkTimer);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Global First Interaction Listener to trigger play on first user click if autoplay was blocked
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasInteractedRef.current) return;

      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.setVolume(30);
          playerRef.current.playVideo();
          hasInteractedRef.current = true;
          setIsPlaying(true);
        } catch (e) {
          console.warn("Error playing video on user interaction:", e);
        }
      }

      // Cleanup event listeners
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('pointerdown', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Public Play Command
  const playMusic = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.setVolume(30);
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn("Error in playMusic:", e);
      }
    }
  };

  // Public Pause Command
  const pauseMusic = () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (e) {
        console.warn("Error in pauseMusic:", e);
      }
    }
  };

  // Toggle Command
  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isPlayerReady, playMusic, pauseMusic, toggleMusic }}>
      {/* Off-screen persistent YouTube container */}
      <div className="fixed -bottom-96 -right-96 w-48 h-48 opacity-0 pointer-events-none overflow-hidden z-0">
        <div id="youtube-player-container" />
      </div>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
