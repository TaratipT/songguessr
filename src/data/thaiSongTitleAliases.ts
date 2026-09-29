/**
 * Verified mapping of Thai songs that have English or alternate titles on streaming platforms (iTunes, Apple Music, Spotify, YouTube).
 *
 * This resolves the issue where a Thai song (like fellow fellow's "Halley's Comet" or UrboyTJ's "Do You Mind")
 * is published on iTunes with an English title, preventing players from guessing the Thai title or seeing
 * the proper Thai title in results.
 *
 * NOTE: Songs that were originally released solely under English titles (such as Blackbeans tracks,
 * WONDERFRAME's "Undo", Patrickananda's "Lavender"/"Oasis", D GERRARD's "Luxury", etc.) are strictly
 * PRESERVED in their original titles and NEVER given invented Thai translations.
 */

export interface ThaiSongTranslationRule {
  canonical: string; // The canonical "ชื่อไทย (English)" title
  artists?: string[]; // If set, only applies if artist matches (case-insensitive substring)
}

export const THAI_SONG_TRANSLATION_RULES: Record<string, ThaiSongTranslationRule> = {
  // CYANIDE
  'letyougo': { canonical: 'ยอม..ปล่อย (Let You Go)' },
  'let you go': { canonical: 'ยอม..ปล่อย (Let You Go)' },

  // fellow fellow
  'halleys comet': { canonical: "ดาวหางฮัลเลย์ (Halley's Comet)" },
  'halley comet': { canonical: "ดาวหางฮัลเลย์ (Halley's Comet)" },
  "halley's comet": { canonical: "ดาวหางฮัลเลย์ (Halley's Comet)" },
  'not my fault': { canonical: 'ไม่เป็นรอง (Not My Fault)' },
  'notmyfault': { canonical: 'ไม่เป็นรอง (Not My Fault)' },

  // Anatomy Rabbit
  'extraordinary': { canonical: 'ธรรมดาแสนพิเศษ (Extraordinary)' },

  // YENTED
  'adore': { canonical: 'หินหยดลงน้ำ (Adore)' },

  // PURPEECH
  "i'm here": { canonical: "หนึ่งคนตรงนี้ (I'm here)" },
  'im here': { canonical: "หนึ่งคนตรงนี้ (I'm here)" },
  'imhere': { canonical: "หนึ่งคนตรงนี้ (I'm here)" },

  // UrboyTJ
  'do you mind': { canonical: 'รังเกียจกันไหม (Do You Mind)' },
  'do you mind?': { canonical: 'รังเกียจกันไหม (Do You Mind)' },
  'doyoumind': { canonical: 'รังเกียจกันไหม (Do You Mind)' },
  'villain': { canonical: 'วายร้าย (Villain)', artists: ['urboytj', 'urboy'] },
  'rebound': { canonical: 'เค้าก่อน (Rebound)', artists: ['urboytj', 'urboy'] },
  'cant help it': { canonical: "ช่วยไม่ได้ (Can't Help It)", artists: ['urboytj', 'urboy'] },
  "can't help it": { canonical: "ช่วยไม่ได้ (Can't Help It)", artists: ['urboytj', 'urboy'] },
  'help me please': { canonical: "ช่วยไม่ได้ (Can't Help It)", artists: ['urboytj', 'urboy'] },

  // Tilly Birds
  'same page': { canonical: 'คิด(แต่ไม่)ถึง (Same Page?)' },
  'same page?': { canonical: 'คิด(แต่ไม่)ถึง (Same Page?)' },
  'samepage': { canonical: 'คิด(แต่ไม่)ถึง (Same Page?)' },
  'just being friendly': { canonical: 'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)' },
  'justbeingfriendly': { canonical: 'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)' },
  'until then': { canonical: 'ถ้าเราเจอกันอีก (Until Then)' },
  'untilthen': { canonical: 'ถ้าเราเจอกันอีก (Until Then)' },
  'cant keep up': { canonical: "ลู่วิ่ง (Can't Keep Up)" },
  "can't keep up": { canonical: "ลู่วิ่ง (Can't Keep Up)" },
  'slipped your mind': { canonical: 'จำเก่ง (Slipped Your Mind)' },
  'worth the wait': { canonical: 'แค่เธอเข้ามา (Worth The Wait)' },
  'only you can': { canonical: 'ล้มแชมป์ (Only You Can)' },
  'ordinary': { canonical: 'จากกันด้วยดี (Ordinary)', artists: ['tilly birds'] },
  'status': { canonical: 'เบื่อคนขี้เบื่อ (Status)', artists: ['tilly birds'] },

  // Three Man Down
  'city': { canonical: 'ข้างกัน (City)', artists: ['three man down', 'telex telexs'] },
  'time zone': { canonical: 'เวลาเธอยิ้ม (Time Zone)', artists: ['three man down'] },
  'timezone': { canonical: 'เวลาเธอยิ้ม (Time Zone)', artists: ['three man down'] },
  'is this love': { canonical: 'เปิดตัวเขา (Is This Love)', artists: ['three man down'] },
  'passing by': { canonical: 'ผ่านตา (Passing By)', artists: ['three man down'] },
  'friend zone': { canonical: 'เพื่อนชุบแป้งทอด (Friend Zone)', artists: ['three man down'] },
  'where are you': { canonical: 'ไปเถอะเธอ (Where Are You)', artists: ['three man down'] },
  'choose me': { canonical: 'เลือกคนที่เขารักเรา (Choose Me)', artists: ['three man down'] },
  'if you really love me': { canonical: 'ถ้าเธอรักฉันจริง (If You Really Love Me)' },

  // NONT TANONT
  'melt': { canonical: 'โต๊ะริม (Melt)', artists: ['nont tanont', 'นนท์ ธนนท์', 'nont'] },
  'first love': { canonical: 'รักแรก (First Love)' },
  'firstlove': { canonical: 'รักแรก (First Love)' },
  'not romantic': { canonical: 'ทุกนาทีที่สวยงาม (Not Romantic)' },
  'back to you': { canonical: 'แน่ใจไหม (Back To You)', artists: ['nont tanont', 'นนท์ ธนนท์', 'nont'] },
  'white flag': { canonical: 'จำนน (White Flag)', artists: ['nont tanont', 'นนท์ ธนนท์', 'nont'] },

  // Bowkylion
  'recall': { canonical: 'วาดไว้ (Recall)', artists: ['bowkylion', 'โบกี้ไลออน'] },
  'best wishes': { canonical: 'บานปลาย (Best Wishes)' },
  'untold': { canonical: 'บานปลาย (Best Wishes)' },
  'do it without me': { canonical: 'ส่วนต่าง (Do It Without Me)' },
  'know know': { canonical: 'ทราบแล้วเปลี่ยน (Know Know)' },
  'knowknow': { canonical: 'ทราบแล้วเปลี่ยน (Know Know)' },

  // Paper Planes
  'bad boy': { canonical: 'ทรงอย่างแบด (Bad Boy)', artists: ['paper planes'] },
  'badboy': { canonical: 'ทรงอย่างแบด (Bad Boy)', artists: ['paper planes'] },
  'pretend': { canonical: 'เสแสร้ง (Pretend)', artists: ['paper planes'] },

  // PROXIE
  'silent mode': { canonical: 'คนไม่คุย (Silent Mode)' },
  'silentmode': { canonical: 'คนไม่คุย (Silent Mode)' },

  // Only Monday
  'thinking of you': { canonical: 'ได้แต่นึกถึง (Thinking of You)', artists: ['only monday'] },

  // 4EVE
  'test me': { canonical: 'วัดปะหล่ะ? (TEST ME)' },
  'testme': { canonical: 'วัดปะหล่ะ? (TEST ME)' },

  // Billkin
  'skyline': { canonical: 'กีดกัน (Skyline)', artists: ['billkin', 'บิวกิ้น'] },
  'mr everything': { canonical: 'Mr. Everything (มิสเตอร์เอฟวรี่ติง)' },
  'mr. everything': { canonical: 'Mr. Everything (มิสเตอร์เอฟวรี่ติง)' },
  'mreverything': { canonical: 'Mr. Everything (มิสเตอร์เอฟวรี่ติง)' },

  // Jeff Satur
  'fade': { canonical: 'ลืมไปแล้วว่าลืมยังไง (Fade)', artists: ['jeff satur', 'เจฟ ซาเตอร์'] },
  'why dont you stay': { canonical: "แค่เธอ (Why Don't You Stay)" },
  "why don't you stay": { canonical: "แค่เธอ (Why Don't You Stay)" },
  'lost and found': { canonical: 'ฉันก่อนเจอเธอ (Lost and Found)', artists: ['jeff satur', 'เจฟ ซาเตอร์'] },
  'rain wedding': { canonical: 'เหมือนวิวาห์ (Rain Wedding)' },

  // BUS
  'no matter what': { canonical: 'แค่ไหนแค่นั้น (NO MATTER WHAT)' },
  'because of you i shine': { canonical: 'เพราะเธอคือเพลงโปรด (Because of You, I Shine)' },
  'because of you, i shine': { canonical: 'เพราะเธอคือเพลงโปรด (Because of You, I Shine)' },

  // LAZYLOXY / OG-ANIC
  'morning': { canonical: 'เป็นไรไหม (Morning)', artists: ['lazyloxy'] },
  'know me': { canonical: 'รู้ทั้งรู้ (Know Me)', artists: ['og-anic', 'oganic'] },

  // MAIYARAP
  'storage': { canonical: 'เก็บไว้ในใจไม่พอ (Storage)', artists: ['maiyarap'] },

  // Cocktail
  'pull my heart': { canonical: 'ดึงดัน (Pull My Heart)' },
  'pullmyheart': { canonical: 'ดึงดัน (Pull My Heart)' },

  // PiXXiE
  'too cute': { canonical: 'เกินต้าน (Too Cute)', artists: ['pixxie'] },
  'toocute': { canonical: 'เกินต้าน (Too Cute)', artists: ['pixxie'] },
  'not ok': { canonical: 'ไม่ได้ก็ไม่เอา (NOT OK)', artists: ['pixxie'] },
  'notok': { canonical: 'ไม่ได้ก็ไม่เอา (NOT OK)', artists: ['pixxie'] },

  // bamm
  'just curious': { canonical: 'ชอบใส่ใจ (Just Curious)', artists: ['bamm'] },
  'sad move': { canonical: 'ปล่อยจอย (Sad Move)', artists: ['bamm'] },

  // Serious Bacon
  'my crush': { canonical: 'พี่ๆ ตัดแว่นให้หน่อย (My Crush)' },
  'mycrush': { canonical: 'พี่ๆ ตัดแว่นให้หน่อย (My Crush)' },
  'will you': { canonical: 'จะรักฉันอยู่ไหม (Will You?)' },
  'will you?': { canonical: 'จะรักฉันอยู่ไหม (Will You?)' },

  // NuNew
  'true love': { canonical: 'รักแท้ (True Love)', artists: ['nunew', 'นุนิว'] },
  'anything': { canonical: 'หมอนอิง (Anything)', artists: ['nunew', 'นุนิว'] },

  // The Parkinson
  'tell her that i love': { canonical: 'จะบอกเธอว่ารัก (Tell Her That I Love)' },
  'dear friend': { canonical: 'เพื่อนรัก (Dear Friend)', artists: ['the parkinson', 'parkinson'] }
};

// Backwards-compatible simple map (keys -> canonical names)
export const THAI_SONG_TRANSLATION_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(THAI_SONG_TRANSLATION_RULES).map(([k, rule]) => [k, rule.canonical])
);

// Bidirectional Aliases mapping (Key can be Thai OR English, values are all acceptable guesses)
export const THAI_SONG_BIDIRECTIONAL_ALIASES: Record<string, string[]> = {
  // UrboyTJ
  'doyoumind': ['รังเกียจกันไหม', 'รังเกียจกันมั้ย', 'do you mind', 'doyoumind', 'do you mind?'],
  'รังเกียจกันไหม': ['do you mind', 'doyoumind', 'do you mind?', 'รังเกียจกันไหม', 'รังเกียจกันมั้ย'],
  'รังเกียจกันมั้ย': ['do you mind', 'doyoumind', 'do you mind?', 'รังเกียจกันไหม', 'รังเกียจกันมั้ย'],
  'villain': ['วายร้าย', 'villain'],
  'วายร้าย': ['villain', 'วายร้าย'],
  'rebound': ['เค้าก่อน', 'rebound'],
  'เค้าก่อน': ['rebound', 'เค้าก่อน'],
  'ช่วยไม่ได้': ['cant help it', "can't help it", 'help me please', 'ช่วยไม่ได้'],

  // Tilly Birds
  'คิดแต่ไม่ถึง': ['คิด(แต่ไม่)ถึง', 'คิดแต่ไม่ถึง', 'คิดแต่ไม่ถึ่ง', 'same page', 'same page?'],
  'คิด(แต่ไม่)ถึง': ['คิด(แต่ไม่)ถึง', 'คิดแต่ไม่ถึง', 'same page', 'same page?'],
  'samepage': ['คิด(แต่ไม่)ถึง', 'คิดแต่ไม่ถึง', 'same page', 'same page?'],
  'ถ้าเราเจอกันอีก': ['ถ้าเราเจอกันอีก', 'until then'],
  'untilthen': ['ถ้าเราเจอกันอีก', 'until then'],
  'เพื่อนเล่นไม่เล่นเพื่อน': ['เพื่อนเล่น ไม่เล่นเพื่อน', 'เพื่อนเล่นไม่เล่นเพื่อน', 'just being friendly'],
  'เพื่อนเล่น ไม่เล่นเพื่อน': ['เพื่อนเล่น ไม่เล่นเพื่อน', 'เพื่อนเล่นไม่เล่นเพื่อน', 'just being friendly'],
  'justbeingfriendly': ['เพื่อนเล่น ไม่เล่นเพื่อน', 'เพื่อนเล่นไม่เล่นเพื่อน', 'just being friendly'],
  'ลู่วิ่ง': ['ลู่วิ่ง', 'cant keep up', "can't keep up"],
  'จำเก่ง': ['จำเก่ง', 'slipped your mind'],

  // Three Man Down
  'ข้างกัน': ['ข้างกัน', 'city', 'ข้างกัน (city)'],
  'city': ['ข้างกัน', 'city', 'ข้างกัน (city)'],
  'ฝนตกไหม': ['ฝนตกไหม', 'ฝนตกมั้ย', 'fon tok mai'],
  'ฝนตกมั้ย': ['ฝนตกไหม', 'ฝนตกมั้ย', 'fon tok mai'],
  'ถ้าเธอรักฉันจริง': ['ถ้าเธอรักฉันจริง', 'tha thoe rak chan ching'],
  'เวลาเธอยิ้ม': ['เวลาเธอยิ้ม', 'time zone'],
  'เปิดตัวเขา': ['เปิดตัวเขา', 'is this love'],

  // Jeff Satur
  'ลืมไปแล้วว่าลืมยังไง': ['ลืมไปแล้วว่าลืมยังไง', 'fade'],
  'fade': ['ลืมไปแล้วว่าลืมยังไง', 'fade'],
  'แค่เธอ': ['แค่เธอ', 'why dont you stay', "why don't you stay"],
  'ฉันก่อนเจอเธอ': ['ฉันก่อนเจอเธอ', 'lost and found'],

  // Bowkylion
  'วาดไว้': ['วาดไว้', 'recall', 'วาดไว้ (recall)'],
  'recall': ['วาดไว้', 'recall', 'วาดไว้ (recall)'],
  'บานปลาย': ['บานปลาย', 'best wishes', 'untold', 'บานปลาย (untold)'],
  'bestwishes': ['บานปลาย', 'best wishes'],
  'untold': ['บานปลาย', 'untold'],
  'ทราบแล้วเปลี่ยน': ['ทราบแล้วเปลี่ยน', 'know know', 'knowknow'],

  // NONT TANONT
  'โต๊ะริม': ['โต๊ะริม', 'melt', 'โต๊ะริม (melt)'],
  'melt': ['โต๊ะริม', 'melt', 'โต๊ะริม (melt)'],
  'รักแรก': ['รักแรก', 'first love', 'รักแรก (first love)'],
  'firstlove': ['รักแรก', 'first love', 'รักแรก (first love)'],
  'ทุกนาทีที่สวยงาม': ['ทุกนาทีที่สวยงาม', 'not romantic'],
  'มีผลต่อหัวใจ': ['มีผลต่อหัวใจ', 'mi phon tor hua jai'],
  'ฝืนตัวเองไม่เป็น': ['ฝืนตัวเองไม่เป็น', 'feun tua ayng mai pen'],

  // Paper Planes
  'ทรงอย่างแบด': ['ทรงอย่างแบด', 'bad boy', 'song yang bad', 'ทรงอย่างแบด (bad boy)'],
  'badboy': ['ทรงอย่างแบด', 'bad boy', 'ทรงอย่างแบด (bad boy)'],
  'เสแสร้ง': ['เสแสร้ง', 'pretend'],
  'pretend': ['เสแสร้ง', 'pretend'],

  // fellow fellow
  'ดาวหางฮัลเลย์': ['ดาวหางฮัลเลย์', 'halleys comet', 'halley comet', "halley's comet", "ดาวหางฮัลเลย์ (halley's comet)"],
  'halleyscomet': ['ดาวหางฮัลเลย์', 'halleys comet', 'halley comet', "halley's comet", "ดาวหางฮัลเลย์ (halley's comet)"],
  'ไม่เป็นรอง': ['ไม่เป็นรอง', 'not my fault', 'notmyfault', 'ไม่เป็นรอง (not my fault)'],
  'notmyfault': ['ไม่เป็นรอง', 'not my fault', 'notmyfault'],

  // Anatomy Rabbit
  'extraordinary': ['ธรรมดาแสนพิเศษ', 'extraordinary', 'ขอให้โลกนี้ใจดีกับเธอ', 'ธรรมดา แสนพิเศษ', 'ธรรมดาแสนพิเศษ (extraordinary)'],
  'ธรรมดาแสนพิเศษ': ['ธรรมดาแสนพิเศษ', 'extraordinary', 'ขอให้โลกนี้ใจดีกับเธอ', 'ธรรมดา แสนพิเศษ', 'ธรรมดาแสนพิเศษ (extraordinary)'],
  'ขอให้โลกนี้ใจดีกับเธอ': ['ขอให้โลกนี้ใจดีกับเธอ', 'extraordinary', 'ธรรมดาแสนพิเศษ'],
  'ขับรถเล่น': ['ขับรถเล่น', 'kab rod len', 'kabrodlen'],
  'kabrodlen': ['ขับรถเล่น', 'kab rod len', 'kabrodlen'],

  // Purpeech
  'imhere': ['หนึ่งคนตรงนี้', "i'm here", 'im here', "หนึ่งคนตรงนี้ (i'm here)"],
  'หนึ่งคนตรงนี้': ['หนึ่งคนตรงนี้', "i'm here", 'im here', "หนึ่งคนตรงนี้ (i'm here)"],

  // YENTED
  'adore': ['หินหยดลงน้ำ', 'adore', 'หินหยดลงน้ำ (adore)', 'hin yod long nam', 'หินหยดลงน้ำ (Adore)'],
  'หินหยดลงน้ำ': ['หินหยดลงน้ำ', 'adore', 'หินหยดลงน้ำ (adore)', 'hin yod long nam', 'หินหยดลงน้ำ (Adore)'],
  'hin yod long nam': ['หินหยดลงน้ำ', 'adore', 'หินหยดลงน้ำ (adore)'],
  'hnyodlongnam': ['หินหยดลงน้ำ', 'adore', 'หินหยดลงน้ำ (adore)'],

  // CYANIDE
  'letyougo': ['ยอม..ปล่อย', 'ยอมปล่อย', 'let you go', 'letyougo', 'ยอม..ปล่อย (let you go)', 'ยอมปล่อย (let you go)'],
  'ยอมปล่อย': ['ยอม..ปล่อย', 'ยอมปล่อย', 'let you go', 'letyougo', 'ยอม..ปล่อย (let you go)', 'ยอมปล่อย (let you go)'],
  'ยอม..ปล่อย': ['ยอม..ปล่อย', 'ยอมปล่อย', 'let you go', 'letyougo', 'ยอม..ปล่อย (let you go)', 'ยอมปล่อย (let you go)'],

  // Lipta
  'ทักครับ': ['ทักครับ', 'tuk krub', 'tukkrub', 'ทักครับ (tuk krub)'],
  'tkkrub': ['ทักครับ', 'tuk krub', 'tukkrub', 'ทักครับ (tuk krub)'],

  // PiXXiE
  'toocute': ['เกินต้าน', 'too cute', 'toocute', 'เกินต้าน (too cute)'],
  'เกินต้าน': ['เกินต้าน', 'too cute', 'toocute', 'เกินต้าน (too cute)'],
  'notok': ['ไม่ได้ก็ไม่เอา', 'not ok', 'notok', 'ไม่ได้ก็ไม่เอา (not ok)'],
  'ไม่ได้ก็ไม่เอา': ['ไม่ได้ก็ไม่เอา', 'not ok', 'notok', 'ไม่ได้ก็ไม่เอา (not ok)'],

  // bamm
  'ชอบใส่ใจ': ['ชอบใส่ใจ', 'just curious', 'curious', 'ชอบใส่ใจ (just curious)'],
  'ปล่อยจอย': ['ปล่อยจอย', 'sad move', 'ปล่อยจอย (sad move)'],

  // Serious Bacon
  'mycrush': ['พี่ๆ ตัดแว่นให้หน่อย', 'my crush', 'mycrush'],
  'พี่ๆตัดแว่นให้หน่อย': ['พี่ๆ ตัดแว่นให้หน่อย', 'my crush', 'mycrush'],
  'พี่ๆ ตัดแว่นให้หน่อย': ['พี่ๆ ตัดแว่นให้หน่อย', 'my crush', 'mycrush'],

  // PROXIE
  'คนไม่คุย': ['คนไม่คุย', 'silent mode', 'คนไม่คุย (silent mode)'],
  'silentmode': ['คนไม่คุย', 'silent mode', 'คนไม่คุย (silent mode)'],

  // Only Monday
  'ได้แต่นึกถึง': ['ได้แต่นึกถึง', 'thinking of you', 'ได้แต่นึกถึง (thinking of you)'],
  'thinkingofyou': ['ได้แต่นึกถึง', 'thinking of you'],

  // 4EVE
  'วัดปะหล่ะ': ['วัดปะหล่ะ', 'วัดปะหล่ะ?', 'test me', 'testme', 'วัดปะหล่ะ? (test me)'],
  'วัดปะหล่ะ?': ['วัดปะหล่ะ', 'วัดปะหล่ะ?', 'test me', 'testme', 'วัดปะหล่ะ? (test me)'],
  'testme': ['วัดปะหล่ะ', 'วัดปะหล่ะ?', 'test me', 'testme', 'วัดปะหล่ะ? (test me)'],

  // Billkin
  'กีดกัน': ['กีดกัน', 'skyline', 'i told sunset about you', 'กีดกัน (skyline)'],
  'skyline': ['กีดกัน', 'skyline', 'กีดกัน (skyline)'],
  'mreverything': ['mr everything', 'mr. everything', 'มิสเตอร์เอฟวรี่ติง'],
  'มิสเตอร์เอฟวรี่ติง': ['mr everything', 'mr. everything', 'มิสเตอร์เอฟวรี่ติง'],

  // Cocktail
  'ดึงดัน': ['ดึงดัน', 'pull my heart', 'dung dun', 'ดึงดัน (pull my heart)'],
  'pullmyheart': ['ดึงดัน', 'pull my heart', 'ดึงดัน (pull my heart)']
};

/**
 * Normalizes text for alias key lookup (lowercase, stripped of punctuation and whitespace).
 */
export function cleanKey(str: string): string {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035']/g, '') // all apostrophes
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB"]/g, '') // all quotes
    .replace(/[\s\-_.,!?'"()[\]{}【】:;+&~/\\#@*^|•…$?]/g, '') // all punctuation & symbols
    .trim();
}

/**
 * If an iTunes track has an English title that maps to a known Thai title,
 * return the localized title (e.g. "รังเกียจกันไหม (Do You Mind)").
 * Works BIDIRECTIONALLY (English -> Thai (English), or Thai -> Thai (English), or English (Thai) -> Thai (English)).
 * If artistName is provided, validates that songs with artist restrictions match the artist.
 */
export function getThaiTitleTranslation(cleanTitle: string, artistName?: string): string | undefined {
  if (!cleanTitle) return undefined;
  const key = cleanKey(cleanTitle);
  if (!key) return undefined;

  const isArtistMatch = (rule: ThaiSongTranslationRule): boolean => {
    if (!rule.artists || rule.artists.length === 0) return true;
    if (!artistName) return false;
    const artLower = artistName.toLowerCase();
    return rule.artists.some((a) => artLower.includes(a.toLowerCase()));
  };

  // 1. Direct key match in rules
  const directRule = THAI_SONG_TRANSLATION_RULES[key];
  if (directRule && isArtistMatch(directRule)) {
    return directRule.canonical;
  }

  // 2. Search all rules: matches key, Thai part, English part, or combined title
  for (const [k, r] of Object.entries(THAI_SONG_TRANSLATION_RULES)) {
    if (!isArtistMatch(r)) continue;

    if (cleanKey(k) === key) return r.canonical;

    const thaiPart = r.canonical.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
    if (cleanKey(thaiPart) === key) return r.canonical;

    const parenMatches = r.canonical.match(/\((.*?)\)/g);
    if (parenMatches) {
      for (const pm of parenMatches) {
        const inner = pm.replace(/[()]/g, '').trim();
        if (cleanKey(inner) === key) return r.canonical;
      }
    }

    if (cleanKey(r.canonical) === key) return r.canonical;
  }

  // 3. If input is formatted as "English (Thai)" e.g. "Just Being Friendly (เพื่อนเล่น ไม่เล่นเพื่อน)",
  // detect and standardize to "ชื่อไทย (English)"!
  const hasParen = cleanTitle.match(/^(.*?)\((.*?)\)$/);
  if (hasParen) {
    const outer = hasParen[1].trim();
    const inner = hasParen[2].trim();
    const isOuterThai = /[\u0E00-\u0E7F]/.test(outer);
    const isInnerThai = /[\u0E00-\u0E7F]/.test(inner);
    if (!isOuterThai && isInnerThai) {
      return `${inner} (${outer})`;
    }
  }

  return undefined;
}

/**
 * Returns all recognized aliases (Thai & English) for a given song title.
 */
export function getSongTitleAliases(title: string, artistName?: string): string[] {
  if (!title) return [];
  const aliases = new Set<string>();
  const key = cleanKey(title);

  // 1. Check if canonical translation exists
  const canonical = getThaiTitleTranslation(title, artistName);
  if (canonical) {
    aliases.add(canonical);
    const thaiPart = canonical.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
    if (thaiPart) aliases.add(thaiPart);

    const parenMatches = canonical.match(/\((.*?)\)/g);
    if (parenMatches) {
      for (const pm of parenMatches) {
        const inner = pm.replace(/[()]/g, '').trim();
        if (inner) aliases.add(inner);
      }
    }
  }

  // 2. Extract parts from title itself if it already has parentheses
  const selfThaiPart = title.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
  if (selfThaiPart) aliases.add(selfThaiPart);
  const selfParenMatches = title.match(/\((.*?)\)/g);
  if (selfParenMatches) {
    for (const pm of selfParenMatches) {
      const inner = pm.replace(/[()]/g, '').trim();
      if (inner) aliases.add(inner);
    }
  }

  // 3. Bidirectional aliases lookup
  if (THAI_SONG_BIDIRECTIONAL_ALIASES[key]) {
    for (const a of THAI_SONG_BIDIRECTIONAL_ALIASES[key]) {
      aliases.add(a);
    }
  }
  const selfThaiKey = cleanKey(selfThaiPart);
  if (selfThaiKey !== key && THAI_SONG_BIDIRECTIONAL_ALIASES[selfThaiKey]) {
    for (const a of THAI_SONG_BIDIRECTIONAL_ALIASES[selfThaiKey]) {
      aliases.add(a);
    }
  }

  return Array.from(aliases);
}
