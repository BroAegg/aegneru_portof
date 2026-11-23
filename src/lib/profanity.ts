/* ============================================
   Profanity & Inappropriate Language Filter
   Basic dictionary of offensive words (ID & EN)
   ============================================ */

const PROFANITY_LIST = [
  // Indonesian
  "anjing", "babi", "bangsat", "kontol", "memek", "pantek", "ngentot", "itil",
  "perek", "jembut", "bajingan", "asu", "tai", "kampret", "lonte", "tolol",
  "goblok", "bego", "idiot", "pekok", "silit", "peler", "pecun", "bencong",
  // English
  "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "bastard",
  "nigger", "faggot", "motherfucker", "whore", "slut"
];

export function containsProfanity(text: string): boolean {
  if (!text) return false;
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");

  const words = normalized.split(" ");
  return words.some((word) => PROFANITY_LIST.includes(word));
}
