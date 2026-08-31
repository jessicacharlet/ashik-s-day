/**
 * ====================================================================
 * MULTI-PAGE BIRTHDAY CARD CONFIGURATION
 * ====================================================================
 * Single configuration file for all pages & components!
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
  PAGE_2_BLESSING: {
    heading: "A little blessing before we begin 🤍",
    subheading: "A Blessing For You",
    verseText: "“May he give you the desire of your heart and make all your plans succeed.”",
    reference: "— Psalm 20:4",
    blessingParagraphs: [
      "For this year ahead, I hope the things you're working toward come together at the right time.",
      "May you have the wisdom to know what to pursue, the patience to wait when you need to, and the courage to keep going when things don't go as planned.",
      "May God guide you, protect you, and bless whatever comes next."
    ],
    bottomNote: "Now... enough wisdom for one page. 😂",
    buttonText: "Let’s continue →"
  },
  PAGE_3_BLESSING: {
    heading: "A little blessing before we begin 🤍",
    subheading: "A Blessing For You",
    verseText: "“May he give you the desire of your heart and make all your plans succeed.”",
    reference: "— Psalm 20:4",
    blessingParagraphs: [
      "For this year ahead, I hope the things you're working toward come together at the right time.",
      "May you have the wisdom to know what to pursue, the patience to wait when you need to, and the courage to keep going when things don't go as planned.",
      "May God guide you, protect you, and bless whatever comes next."
    ],
    bottomNote: "Now... enough wisdom for one page. 😂",
    buttonText: "Let’s continue →"
  },

  // PAGE 4: Birthday Reveal
  PAGE_4_BIRTHDAY: {
    sequence: [
      "Wait...",
      "Another year older.",
      "Still figuring things out.",
      "Still somehow surviving. 😂"
    ],
    revealBig: "HAPPY BIRTHDAY, ASHIK! 🎉",
    heading: "HAPPY BIRTHDAY",
    paragraphs: [
      "Hope this year brings you good opportunities, good people, good memories, and enough unexpected moments to keep life interesting.",
      "May your plans work out, your problems stay manageable, and your bank balance occasionally surprise you. 😂"
    ],
    buttonText: "Next →"
  },

  // PAGE 5: Blow the Candles
  PAGE_5_CAKE: {
    heading: "One important thing...",
    ruleText: "Before we continue, there's a birthday rule we cannot ignore.",
    makeWishBig: "MAKE A WISH. 🎂",
    secretText: "No, you can't tell me what it is. That's literally against the rules. 😂",
    micButtonText: "Blow the candles 💨",
    tapButtonText: "Tap to Blow 💨",
    successHeading: "Wish sent. ✨",
    successSubtext: "Let's see what happens.",
    buttonText: "Next →"
  },

  // PAGE 6: Funny Birthday Report
  PAGE_6_FUNNY: {
    heading: "BIRTHDAY PERFORMANCE REVIEW 😂",
    reportTitle: "BIRTHDAY PERFORMANCE REVIEW",
    stats: [
      { label: "Age", value: "+1" },
      { label: "Wisdom", value: "Updating..." },
      { label: "Maturity", value: "Still under review" },
      { label: "Common Sense", value: "Occasionally available" },
      { label: "Money", value: "Confidential information" },
      { label: "Sleep Schedule", value: "404 Not Found" },
      { label: "Questionable Decisions", value: "Excellent performance" }
    ],
    overallTitle: "OVERALL RATING",
    overallResult: "Still doing surprisingly well. 😂",
    buttonText: "One Last Thing →"
  },

  // PAGE 7: Final Wish (Happy Birthday Chips Vaaya ❤️)
  PAGE_7_FINAL: {
    heading: "Happy Birthday",
    nameTitle: "Chips Vaaya ❤️",
    wishParagraphs: [
      "I hope this year is good to you.",
      "More opportunities, more good memories, fewer unnecessary problems, and plenty of reasons to laugh.",
      "May God guide you, protect you, and bless whatever comes next.",
      "Keep being you. Just maybe make slightly better decisions. 😂"
    ],
    footer: "— From someone who took way too much time making this website for you. ❤️"
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
