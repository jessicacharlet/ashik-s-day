/**
 * ====================================================================
 * MULTI-PAGE BIRTHDAY CARD CONFIGURATION
 * ====================================================================
 * Single configuration file for all 7 pages!
 */

export const BIRTHDAY_CONFIG = {
  // Primary Friend & Photo Details
  FRIEND_NAME: "Ashik",
  BIRTHDAY_YEAR: "2026",

  MY_PHOTO: "/me.jpg",
  FRIEND_PHOTO: "/friend.jpg",

  MY_CAPTION: "Me ✨",
  FRIEND_CAPTION: "Birthday Boy 🎂",

  // PAGE 1: Loading
  PAGE_1_LOADING: {
    heading: "Preparing something special... 💌",
    subtext: "Just for you",
    readyText: "Ready? ✨",
    buttonText: "Open Your Birthday Card →",
    sequence: [
      "Preparing something special... 💌",
      "Finding the perfect memory... 📸",
      "Adding a little love... 💕",
      "Almost ready... ✨"
    ]
  },

  // PAGE 2: Bible Blessing
  PAGE_2_BLESSING: {
    heading: "Before the birthday wishes... 🤍",
    subheading: "A little blessing for you",
    lines: [
      "May the Lord bless you and keep you;",
      "the Lord make his face shine on you",
      "and be gracious to you;",
      "the Lord turn his face toward you",
      "and give you peace."
    ],
    reference: "— Numbers 6:24–26",
    buttonText: "Next →"
  },

  // PAGE 3: Postcard Photo Reveal
  PAGE_3_POSTCARD: {
    readyNote: "Okay... now we're ready 🎀",
    buttonText: "Next →"
  },

  // PAGE 4: Birthday Reveal
  PAGE_4_BIRTHDAY: {
    waitText: "Wait...",
    forgetText: "I almost forgot something...",
    revealBig: "IT'S YOUR BIRTHDAY!!! 🎉",
    heading: "HAPPY BIRTHDAY",
    wishesText: "May this year bring you lots of happiness, success, laughter and unforgettable memories.",
    buttonText: "There's More →"
  },

  // PAGE 5: Blow the Candles
  PAGE_5_CAKE: {
    heading: "Make a Wish 🎂",
    subheading: "Your birthday cake is ready...",
    instruction: "Close your eyes... Make a wish... and blow the candles! 🕯️",
    micButtonText: "Blow the Candles 🎤",
    tapButtonText: "Tap to Blow 💨",
    successHeading: "YOU DID IT! 🎉",
    successSubtext: "May God make your wishes come true. ✨",
    wishMadeText: "Wish made. ✨",
    wishTurnText: "May God turn it into reality.",
    buttonText: "Next →"
  },

  // PAGE 6: Funny Surprise Report
  PAGE_6_FUNNY: {
    heading: "Okay... enough emotional stuff 😂",
    reportTitle: "BIRTHDAY BOY REPORT",
    stats: [
      { label: "AGE", value: "+1" },
      { label: "WISDOM", value: "Loading..." },
      { label: "MONEY", value: "Error 404" },
      { label: "MATURITY", value: "Not Found" },
      { label: "CAKE", value: "100% 🍰" },
      { label: "ENERGY", value: "Depends on WiFi" }
    ],
    overallResult: "Overall Result:\nStill the same idiot ❤️😂",
    buttonText: "One Last Thing →"
  },

  // PAGE 7: Final Surprise Letter
  PAGE_7_FINAL: {
    heading: "One last thing... 💌",
    openButtonText: "Open it",
    letterParagraphs: [
      "Whatever this year brings, I hope you keep smiling, keep growing, keep dreaming, and keep trusting God.",
      "May this new chapter of your life be even better than the last.",
      "Happy Birthday ❤️"
    ],
    footer: "Made with love, just for you ♡"
  },

  // Audio settings
  AUDIO: {
    customUrl: null,
    useSynthFallback: true
  }
};
