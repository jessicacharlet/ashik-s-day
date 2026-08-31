/**
 * ====================================================================
 * MULTI-PAGE BIRTHDAY CARD CONFIGURATION
 * ====================================================================
 * Single configuration file for all 7 pages!
 */

export const BIRTHDAY_CONFIG = {
  // Primary Friend & Photo Details
  FRIEND_NAME: "Ashik",
  FINAL_NAME: "Chips Vaaya",
  BIRTHDAY_YEAR: "2026",

  MY_PHOTO: "/me.jpg",
  FRIEND_PHOTO: "/friend.jpg",

  MY_CAPTION: "From me 💌",
  FRIEND_CAPTION: "Ashik 🎂",

  // PAGE 1: Loading
  PAGE_1_LOADING: {
    heading: "Preparing something special... 💌",
    subtext: "Just for you",
    sequence: [
      "Preparing something special... 💌",
      "Finding the perfect memory... 📸",
      "Adding a little love... 💕",
      "Almost ready... ✨"
    ]
  },

  // PAGE 2: Photo Dragging Postcard
  PAGE_2_POSTCARD: {
    heading: "Sending a little birthday surprise... 💌",
    deliveredText: "Delivered! 💌",
    subtext: "Now let's begin..."
  },

  // PAGE 3: Bible Blessing
  PAGE_3_BLESSING: {
    heading: "Before the birthday wishes... 🤍",
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

  // PAGE 4: Birthday Reveal
  PAGE_4_BIRTHDAY: {
    waitText: "Wait...",
    forgetText: "I almost forgot something...",
    revealBig: "IT'S YOUR BIRTHDAY!!! 🎉",
    heading: "HAPPY BIRTHDAY",
    wishesText: "May this year bring you happiness, success, laughter and amazing memories.",
    buttonText: "Next →"
  },

  // PAGE 5: Blow the Candles
  PAGE_5_CAKE: {
    heading: "Make a Wish 🎂",
    instruction: "Close your eyes... Make a wish... Now blow the candles! 💨",
    micButtonText: "Blow the Candles 💨",
    tapButtonText: "Tap to Blow 💨",
    successHeading: "YOU DID IT! 🎉",
    successSubtext: "May God make your wish come true. ✨",
    buttonText: "Next →"
  },

  // PAGE 6: Funny Surprise Report
  PAGE_6_FUNNY: {
    heading: "Okay... serious wishes are over 😂",
    reportTitle: "BIRTHDAY BOY REPORT",
    stats: [
      { label: "AGE", value: "+1" },
      { label: "WISDOM", value: "Loading..." },
      { label: "MONEY", value: "Error 404" },
      { label: "MATURITY", value: "Not Found" },
      { label: "CAKE", value: "100%" },
      { label: "ENERGY", value: "Depends on WiFi 😂" }
    ],
    overallResult: "Still the same guy ❤️",
    buttonText: "One Last Thing →"
  },

  // PAGE 7: Final Wish (HAPPY BIRTHDAY CHIPS VAAYA ❤️)
  PAGE_7_FINAL: {
    heading: "HAPPY BIRTHDAY",
    nameTitle: "CHIPS VAAYA ❤️",
    blessingLines: [
      "May God bless you always,",
      "guide you in every step,",
      "and make this year",
      "one of your best yet. ✨"
    ],
    footer: "Made with love, just for you ♡"
  },

  // WEBCAM SURPRISE SECTION (Page 7 Final Page)
  WEBCAM_SECTION: {
    prompt: "Wait... one last surprise 👀",
    subprompt: "Let's capture this moment 📸",
    openCameraButton: "Open Camera 📷",
    smileText: "Smile, Chips Vaaya! 😄📸",
    captureButton: "Capture! 📸",
    gotItText: "Got it! 😂❤️",
    capturedNotice: "Birthday memory captured 📸❤️",
    deniedText: "Looks like the camera is shy 😂",
    deniedSubtext: "No worries, the birthday wishes still count! ❤️",
    tryAgainButton: "Try Again 📷",
    finishButton: "Finish →"
  },

  // Audio settings
  AUDIO: {
    customUrl: null,
    useSynthFallback: true
  }
};
