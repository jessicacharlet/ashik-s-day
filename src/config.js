/**
 * ====================================================================
 * WARM HANDMADE DIGITAL POSTCARD CONFIGURATION
 * ====================================================================
 * All text, name, photos, captions, and wishes can be customized here!
 */

export const BIRTHDAY_CONFIG = {
  // 1. Friend & Primary Photos
  FRIEND_NAME: "Ashik",
  BIRTHDAY_YEAR: "2026",

  // Photo Cards (Both sit side-by-side on the postcard table!)
  MY_PHOTO: "/me.jpg",
  FRIEND_PHOTO: "/friend.jpg",

  MY_CAPTION: "Me ✨",
  FRIEND_CAPTION: "Birthday Boy 🎂",

  // 2. Loading Experience Steps (1-second intervals)
  LOADING_SEQUENCE: [
    { title: "Preparing something special...", subtitle: "Please wait ✨" },
    { title: "Finding the perfect memory...", subtitle: "Hold on tight 📸" },
    { title: "Adding a little love...", subtitle: "Sprinkling stardust 💕" },
    { title: "Almost ready...", subtitle: "Here comes the postcard! 💌" }
  ],

  // 3. Postcard Connector Text
  POSTCARD_CONNECTOR: "Two people.\nOne beautiful friendship.",

  // 4. Birthday Reveal
  BIRTHDAY_REVEAL: {
    readyNotice: "Okay... the postcard is ready 💌",
    heading: "Happy Birthday!",
    subtext: "May this year bring you more laughter, more adventures, and more beautiful memories."
  },

  // 5. Bible Blessing Card
  BIBLE_VERSE: {
    heading: "A little blessing for your new year 🤍",
    lines: [
      "May the Lord bless you and keep you;",
      "the Lord make his face shine on you",
      "and be gracious to you;",
      "the Lord turn his face toward you",
      "and give you peace."
    ],
    reference: "— Numbers 6:24–26"
  },

  // 6. 4 Handmade Wish Stationery Notes
  WISHES: [
    {
      id: "happiness",
      icon: "Smile",
      emoji: "🌿",
      title: "Happiness",
      message: "May you always have reasons to smile, laughter in your heart, and light in every room you enter.",
      paperColor: "paper-card-sage",
      accentColor: "text-[#789461]",
      tapeColor: "washi-tape-sage"
    },
    {
      id: "peace",
      icon: "Heart",
      emoji: "🕊️",
      title: "Peace",
      message: "May your heart always find peace, stillness, and comfort even during challenging seasons.",
      paperColor: "paper-card-peach",
      accentColor: "text-[#F88379]",
      tapeColor: "washi-tape-peach"
    },
    {
      id: "success",
      icon: "Sparkles",
      emoji: "🚀",
      title: "Success",
      message: "May you achieve everything you're working for, and may every dream yield beautiful fruit.",
      paperColor: "paper-card-lavender",
      accentColor: "text-[#8B5CF6]",
      tapeColor: "washi-tape-coral"
    },
    {
      id: "blessings",
      icon: "Sun",
      emoji: "✨",
      title: "Blessings",
      message: "May God guide and protect you wherever you go, illuminating your path with wisdom and grace.",
      paperColor: "paper-card",
      accentColor: "text-[#6B4E3D]",
      tapeColor: "washi-tape-sage"
    }
  ],

  // 7. Surprise Envelope Interaction
  SURPRISE_ENVELOPE: {
    prompt: "There's one more thing...",
    buttonText: "Open it 💌",
    letterMessage: "Whatever happens in the coming years, I hope we keep making memories worth remembering.\n\nHappy Birthday once again ❤️"
  },

  // 8. Final Scrapbook Card
  FINAL_CARD: {
    heading: "Happy Birthday,",
    blessing: "May God bless your journey, your dreams, and everything that's ahead.",
    footer: "Made with love, just for you ♡"
  },

  // 9. Audio Settings
  AUDIO: {
    customUrl: null,
    useSynthFallback: true
  }
};
