import confetti from 'canvas-confetti';

export const triggerBirthdayConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f59e0b', '#fbbf24', '#fef3c7']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ec4899', '#8b5cf6', '#3b82f6']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffffff', '#fef3c7', '#f59e0b']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#e0e7ff', '#c084fc']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#f59e0b', '#10b981']
  });
};

export const triggerWishFireworks = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Starlight bursts from left and right sides
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff', '#a855f7'],
      shapes: ['star', 'circle']
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff', '#a855f7'],
      shapes: ['star', 'circle']
    });
  }, 250);
};
