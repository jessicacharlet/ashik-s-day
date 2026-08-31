import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const YOUTUBE_VIDEO_ID = 'hRr7qRb-7k4'; // "Slipping Through My Fingers"
const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Load YouTube IFrame API dynamically
  useEffect(() => {
    // 1. Function to create player once API is ready
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('youtube-player-container', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID, // Required for loop in YT API
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              setIsPlayerReady(true);
              event.target.setVolume(30); // 30% background volume
              // Attempt immediate autoplay
              try {
                event.target.playVideo();
              } catch (e) {
                console.log("Initial autoplay prevented by browser policy:", e);
              }
            },
            onStateChange: (event) => {
              // event.data === 1 is YT.PlayerState.PLAYING
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                // YT.PlayerState.PAUSED or ENDED
                setIsPlaying(false);
              }
            }
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Global First User Interaction Listener to unlock audio if autoplay was blocked
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
          console.warn("Error playing YouTube video on user interaction:", e);
        }
      }

      // Remove listeners once interacted
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Play Music Function
  const playMusic = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.setVolume(30);
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn("Error calling playVideo:", e);
      }
    }
  };

  // Pause Music Function
  const pauseMusic = () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (e) {
        console.warn("Error calling pauseVideo:", e);
      }
    }
  };

  // Toggle Play / Pause
  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isPlayerReady, playMusic, pauseMusic, toggleMusic }}>
      {/* Hidden YouTube Container */}
      <div className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-0">
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
