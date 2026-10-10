import * as fs from 'fs';

const rulesCode = fs.readFileSync('scratch/rules_code.ts', 'utf8');

// Build the complete file content
const header = `/**
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

${rulesCode}
// Backwards-compatible simple map (keys -> canonical names)
export const THAI_SONG_TRANSLATION_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(THAI_SONG_TRANSLATION_RULES).map(([k, rule]) => [
    k,
    Array.isArray(rule) ? rule[0].canonical : rule.canonical
  ])
);
`;

// Read the rest of the original file (from THAI_SONG_BIDIRECTIONAL_ALIASES to end)
const orig = fs.readFileSync('src/data/thaiSongTitleAliases.ts', 'utf8');
const biIdx = orig.indexOf('export const THAI_SONG_BIDIRECTIONAL_ALIASES: Record<string, string[]> = {');
if (biIdx === -1) {
  throw new Error('Could not find THAI_SONG_BIDIRECTIONAL_ALIASES');
}

// Additional bidirectional aliases to inject into THAI_SONG_BIDIRECTIONAL_ALIASES
const additionalBi = `  // 4EVE
  'วัดปะหล่ะ': ['วัดปะหล่ะ', 'วัดป่ะหล่ะ', 'test me', 'testme', 'วัดปะหล่ะ? (TEST ME)'],
  'วัดป่ะหล่ะ': ['วัดปะหล่ะ', 'วัดป่ะหล่ะ', 'test me', 'testme', 'วัดปะหล่ะ? (TEST ME)'],
  'testme': ['วัดปะหล่ะ', 'วัดป่ะหล่ะ', 'test me', 'testme', 'วัดปะหล่ะ? (TEST ME)'],
  'ข้อยกเว้น': ['ข้อยกเว้น', 'exceptional'],
  'สิ่งเล็กน้อย': ['สิ่งเล็กน้อย', 'less is more'],
  'หยดน้ำตา': ['หยดน้ำตา', 'tears'],

  // PiXXiE
  'เกินต้าน': ['เกินต้าน', 'too cute'],
  'toocute': ['เกินต้าน', 'too cute'],
  'มูเตลู': ['มูเตลู', 'mutelu'],
  'เด็ด': ['เด็ด', 'ded'],
  'งอนละ': ['งอนละ', 'boo'],
  'รักกันตอนเลิกกัน': ['รักกันตอนเลิกกัน', 'too late'],

  // bamm
  'โดนเทแต่เท่อยู่': ['โดนเทแต่เท่อยู่', '2cool2care'],
  'เอ๋ง': ['เอ๋ง', 'woof'],
  'ใครเพื่อนแก': ['ใครเพื่อนแก', 'unfriend zone'],
  'เพื่อนกันไม่เลิกกัน': ['เพื่อนกันไม่เลิกกัน', 'close friend'],
  'เกือบเป็นแฟน': ['เกือบเป็นแฟน', 'close enough'],

  // PROXIE
  'ที่ไม่รัก': ['ที่ไม่รัก', 'unnoticed'],
  'สถานะเบลอ': ['สถานะเบลอ', 'blurrr', 'blur'],
  'เจ็บอยู่': ['เจ็บอยู่', 'hurting'],
  'เหงาอย่างนี้สินะ': ['เหงาอย่างนี้สินะ', 'lonely boy'],

  // BUS
  'แค่ไหนแค่นั้น': ['แค่ไหนแค่นั้น', 'no matter what'],
  'แค่น้องชาย': ['แค่น้องชาย', 'brother zone'],
  'สุขสันต์วันคิดถึง': ['สุขสันต์วันคิดถึง', 'happily missing you'],

  // Billkin & PP Krit
  'กีดกัน': ['กีดกัน', 'skyline'],
  'แปลไม่ออก': ['แปลไม่ออก', 'cant translate', "can't translate"],
  'โคตรพิเศษ': ['โคตรพิเศษ', 'special one'],
  'รู้งี้เป็นแฟนกันตั้งนานแล้ว': ['รู้งี้เป็นแฟนกันตั้งนานแล้ว', 'safe zone'],
  'ไม่ปล่อยมือ': ['ไม่ปล่อยมือ', 'coming of age'],
  'ชอบตัวเองตอนอยู่กับเธอ': ['ชอบตัวเองตอนอยู่กับเธอ', 'i like us'],
  'กลับมาคบกันเถอะ': ['กลับมาคบกันเถอะ', 'please please'],
  'เสนอตัว': ['เสนอตัว', 'ooh', 'ooh!'],

  // Ink Waruntorn
  'เหงาเหงา': ['เหงาเหงา', 'เหงา เหงา', 'insomnia'],
  'เหงา เหงา': ['เหงาเหงา', 'เหงา เหงา', 'insomnia'],
  'ดีใจด้วยนะ': ['ดีใจด้วยนะ', 'glad'],
  'สายตาหลอกกันไม่ได้': ['สายตาหลอกกันไม่ได้', 'eyes dont lie', "eyes don't lie"],
  'อยากเริ่มต้นใหม่กับคนเดิม': ['อยากเริ่มต้นใหม่กับคนเดิม', 'repeat'],
  'ชอบอยู่คนเดียว': ['ชอบอยู่คนเดียว', 'i like myself the most'],

  // POLYCAT
  'เพื่อนไม่จริง': ['เพื่อนไม่จริง', 'forever mate'],
  'เวลาเธอยิ้ม': ['เวลาเธอยิ้ม', 'you had me at hello'],
  'มันเป็นใคร': ['มันเป็นใคร', 'alright'],
  'พบกันใหม่': ['พบกันใหม่', 'so long'],
  'เป็นเพราะฝน': ['เป็นเพราะฝน', 'teardrops'],

  // BOWKYLION
  'บานปลาย': ['บานปลาย', 'best wishes'],
  'bestwishes': ['บานปลาย', 'best wishes'],

  // NONT TANONT
  'วันครบเลิก': ['วันครบเลิก', 'unniversary'],
  'โต๊ะริม': ['โต๊ะริม', 'melt'],
  'พิง': ['พิง', 'lean on'],
  'แน่ใจไหม': ['แน่ใจไหม', 'are you sure', 'are you sure?'],
  'จำนน': ['จำนน', 'white flag'],
  'คลั่งรัก': ['คลั่งรัก', 'crazy'],

  // YOUNGOHM
  'ไฟเย็น': ['ไฟเย็น', 'cold fire'],
  'coldfire': ['ไฟเย็น', 'cold fire'],
  'อุ่นแกง': ['อุ่นแกง', 'warm up a curry'],
  'เรื่องราวความรักในตำนาน': ['เรื่องราวความรักในตำนาน', 'legends of a love story'],
  'จูบลา': ['จูบลา', 'the last kiss'],

  // Anatomy Rabbit
  'ขับรถเล่น': ['ขับรถเล่น', 'kab rod len'],
  'kabrodlen': ['ขับรถเล่น', 'kab rod len'],
  'สภาวะเดียวดายบนดาวอังคาร': ['สภาวะเดียวดายบนดาวอังคาร', 'mars loner'],
  'marsloner': ['สภาวะเดียวดายบนดาวอังคาร', 'mars loner'],
  'อุดรทาวน์': ['อุดรทาวน์', 'udon town'],

  // Moderndog
  'วันนี้เมื่อปีก่อน': ['วันนี้เมื่อปีก่อน', 'today last year', 'today, last year'],

  // Labanoon
  'เดลิเวอรี่': ['เดลิเวอรี่', 'delivery'],
`;

const restOfOrig = orig.slice(biIdx);

// Insert additionalBi right after "export const THAI_SONG_BIDIRECTIONAL_ALIASES: Record<string, string[]> = {\n"
const insertBiMarker = 'export const THAI_SONG_BIDIRECTIONAL_ALIASES: Record<string, string[]> = {\n';
const biReplaced = restOfOrig.replace(insertBiMarker, insertBiMarker + additionalBi);

// Now update helper functions section
const helperMarker = 'function checkArtistMatch(rule: ThaiSongTranslationRule, artistName?: string): boolean {';
const helperIdx = biReplaced.indexOf(helperMarker);
if (helperIdx === -1) {
  throw new Error('Could not find checkArtistMatch in biReplaced');
}

const beforeHelper = biReplaced.slice(0, helperIdx);

const newHelpers = `function checkArtistMatch(rule: ThaiSongTranslationRule, artistName?: string): boolean {
  if (!rule.artists || rule.artists.length === 0) return true;
  if (!artistName) return true; // Permissive when artist is omitted, preventing false negatives
  const artLower = artistName.toLowerCase().replace(/\\s+/g, '');
  return rule.artists.some((a) => artLower.includes(a.toLowerCase().replace(/\\s+/g, '')));
}

function resolveRule(
  rule: ThaiSongTranslationRule | ThaiSongTranslationRule[],
  artistName?: string
): ThaiSongTranslationRule | undefined {
  if (Array.isArray(rule)) {
    if (!artistName) return rule[0];
    const match = rule.find((r) => {
      if (!r.artists || r.artists.length === 0) return false;
      const artLower = artistName.toLowerCase().replace(/\\s+/g, '');
      return r.artists.some((a) => artLower.includes(a.toLowerCase().replace(/\\s+/g, '')));
    });
    return match || rule[0];
  }
  return checkArtistMatch(rule, artistName) ? rule : undefined;
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

  // 1. Direct key match in rules
  const direct = THAI_SONG_TRANSLATION_RULES[key];
  if (direct) {
    const resolved = resolveRule(direct, artistName);
    if (resolved) return resolved.canonical;
  }

  // 2. Search all rules: matches key, Thai part, English part, or combined title
  for (const [k, r] of Object.entries(THAI_SONG_TRANSLATION_RULES)) {
    const resolved = resolveRule(r, artistName);
    if (!resolved) continue;

    if (cleanKey(k) === key) return resolved.canonical;

    const thaiPart = resolved.canonical.replace(/\\(.*?\\)/g, '').replace(/【.*?】/g, '').trim();
    if (cleanKey(thaiPart) === key) return resolved.canonical;

    const parenMatches = resolved.canonical.match(/\\((.*?)\\)/g);
    if (parenMatches) {
      for (const pm of parenMatches) {
        const inner = pm.replace(/[()]/g, '').trim();
        if (cleanKey(inner) === key) return resolved.canonical;
      }
    }

    if (cleanKey(resolved.canonical) === key) return resolved.canonical;
  }

  // 3. If input is formatted as "English (Thai)" e.g. "Just Being Friendly (เพื่อนเล่น ไม่เล่นเพื่อน)",
  // detect and standardize to "ชื่อไทย (English)"!
  const hasParen = cleanTitle.match(/^(.*?)\\((.*?)\\)$/);
  if (hasParen) {
    const outer = hasParen[1].trim();
    const inner = hasParen[2].trim();
    const isOuterThai = /[\\u0E00-\\u0E7F]/.test(outer);
    const isInnerThai = /[\\u0E00-\\u0E7F]/.test(inner);
    if (!isOuterThai && isInnerThai) {
      return \`\${inner} (\${outer})\`;
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
    const thaiPart = canonical.replace(/\\(.*?\\)/g, '').replace(/【.*?】/g, '').trim();
    if (thaiPart) aliases.add(thaiPart);

    const parenMatches = canonical.match(/\\((.*?)\\)/g);
    if (parenMatches) {
      for (const pm of parenMatches) {
        const inner = pm.replace(/[()]/g, '').trim();
        if (inner) aliases.add(inner);
      }
    }
  }

  // 2. Extract parts from title itself if it already has parentheses
  const selfThaiPart = title.replace(/\\(.*?\\)/g, '').replace(/【.*?】/g, '').trim();
  if (selfThaiPart) aliases.add(selfThaiPart);
  const selfParenMatches = title.match(/\\((.*?)\\)/g);
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

  // 4. Extract parts from title if separated by dash, hyphen, slash, or pipe
  const dashParts = title.split(/\\s*[-–—/|]\\s*/).map((p) => p.trim()).filter(Boolean);
  if (dashParts.length > 1) {
    for (const part of dashParts) {
      aliases.add(part);
      const cleanP = part.replace(/\\(.*?\\)/g, '').replace(/【.*?】/g, '').trim();
      if (cleanP) aliases.add(cleanP);
      const partKey = cleanKey(part);
      if (THAI_SONG_BIDIRECTIONAL_ALIASES[partKey]) {
        for (const a of THAI_SONG_BIDIRECTIONAL_ALIASES[partKey]) {
          aliases.add(a);
        }
      }
      const cleanPKey = cleanKey(cleanP);
      if (cleanPKey !== partKey && THAI_SONG_BIDIRECTIONAL_ALIASES[cleanPKey]) {
        for (const a of THAI_SONG_BIDIRECTIONAL_ALIASES[cleanPKey]) {
          aliases.add(a);
        }
      }
    }
  }

  return Array.from(aliases);
}
`;

const finalFileContent = header + '\n' + beforeHelper + newHelpers;
fs.writeFileSync('src/data/thaiSongTitleAliases.ts', finalFileContent, 'utf8');
console.log('Successfully updated src/data/thaiSongTitleAliases.ts');
