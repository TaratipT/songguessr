import type { Song } from '../types';
import { CURATED_SONGS } from '../data/curatedSongs';
import { GLOBAL_ARTISTS, type ArtistRegion, getArtistStorefront } from '../data/artistsData';
import { cleanSongTitle, normalizeText } from './itunesApi';

export type SongRegion = 'thai' | 'inter' | 'kpop' | 'anime_jpop';

export const CATEGORY_FALLBACK_TITLES: Record<string, string[]> = {
  thai_hits: [
    'ความรัก',
    'คุกเข่า',
    'ไกลแค่ไหน คือ ใกล้',
    'เชือกวิเศษ',
    'เล่นของสูง',
    'แพ้ทาง',
    'คู่ชีวิต',
    'ทิ้งไว้กลางทาง',
    'แสงสุดท้าย',
    'ฤดูร้อน',
    'ยาพิษ',
    'ข่มใจ',
    'น้ำหอม',
    'เธอคือของขวัญ',
    'คิดถึง',
    'คนที่ถูกรัก',
    'ขอบคุณที่รักกัน',
    'ชั่วฟ้าดินสลาย',
    'วณิพก',
    'บัวลอย',
    'สัญญาหน้าฝน',
    'ทะเลใจ',
    'เมด อิน ไทยแลนด์'
  ],
  tpop_indie: [
    'โต๊ะริม (Melt)',
    'พิง',
    'นะหน้าทอง',
    'คิดแต่ไม่ถึง',
    'ถ้าเราเจอกันอีก',
    'วัดปะหล่ะ?',
    'เลือดกรุ๊ปบี',
    'ทรงอย่างแบด (Bad Boy)',
    'ดวงเดือน',
    'วาดไว้',
    'ซ่อนกลิ่น',
    'สองใจ',
    'รักแรก (First Love)',
    'เพื่อนเล่น ไม่เล่นเพื่อน',
    'ลบไม่ได้ช่วยให้ลืม',
    'สายตาหลอกกันไม่ได้',
    'ดาวหางฮัลเลย์',
    'คนไม่คุย'
  ],
  inter_pop: [
    'Cruel Summer',
    'Blinding Lights',
    'As It Was',
    'Levitating',
    'Shape of You',
    'Save Your Tears',
    'Flowers',
    'Stay',
    'Bad Guy',
    'Watermelon Sugar',
    'Anti-Hero',
    'Starboy',
    'vampire',
    'Greedy',
    'Viva La Vida',
    'Just the Way You Are',
    '7 rings',
    'Espresso',
    'Good Luck, Babe!',
    'Birds of a Feather',
    'Beautiful Things',
    'Please Please Please',
    'Houdini'
  ],
  kpop: [
    'Ditto',
    'Super Shy',
    'Dynamite',
    'Cupid',
    'Pink Venom',
    'Hype Boy',
    'Seven',
    'Queencard',
    'Love Scenario',
    'OMG',
    'Butter',
    'How You Like That',
    'Next Level',
    'Magnetic',
    'Supernova',
    'What is Love?',
    'LOVE DIVE',
    'Perfect Night',
    'Antifragile',
    'Smart',
    'Drunk-Dazed',
    'Bite Me'
  ],
  y2k_90s: [
    'ใจนักเลง',
    'ซมซาน',
    'ชาวนากับงูเห่า',
    'ยิ่งใกล้ยิ่งเจ็บ',
    'ปราสาททราย',
    'ไม่อาจเปลี่ยนใจ',
    'แววตา',
    'เจ้าช่อมาลี',
    '18 ฝน',
    'รักแท้แพ้ใกล้ชิด',
    'บอดี้การ์ด',
    'คนใจอ่อน',
    'ขี้หึง',
    'ใจสั่งมา',
    'หายใจเป็นเธอ',
    'เล่าสู่กันฟัง',
    'รักไม่ได้หรือไม่ได้รัก'
  ],
  lukthung_indie: [
    'ไหง่ง่อง',
    'ผู้สาวขาเลาะ',
    'คำแพง',
    'สเตตัสบ่เคยเปลี่ยน',
    'จี่หอย',
    'เต่างอย',
    'ขอใจเธอแลกเบอร์โทร',
    'สาวเลยยังรอ',
    'รักควรมีสองคน',
    'ห่อหมกฮวกไปฝากป้า',
    'คำว่าฮักกัน มันเหี่ยถิ่มไส',
    'คนบ้านเดียวกัน',
    'สิมาฮักหยังตอนนี้',
    'กอดเสาเถียง',
    'วณิพก',
    'บัวลอย',
    'สัญญาหน้าฝน',
    'ทะเลใจ',
    'เมด อิน ไทยแลนด์',
    'คนจนผู้ยิ่งใหญ่',
    'มหาลัยวัวชน',
    'เสร็จแล้ว'
  ],
  anime_jpop: [
    'アイドル (Idol)',
    '紅蓮華 (Gurenge)',
    '死ぬのがいいわ (Shinunoga E-Wa)',
    'Lemon',
    'Pretender',
    '怪物 (Monster)',
    'KICK BACK',
    'Blue Bird',
    'Silhouette',
    'Sparkle',
    '新時代 (New Genesis)',
    '残酷な天使のテーゼ',
    'Bling-Bang-Bang-Born',
    'ドライフラワー (Dry Flower)',
    '夜に駆ける (Racing into the Night)',
    'Unravel',
    '廻廻奇譚 (Kaikai Kitan)',
    '前前前世 (Zenzenzense)'
  ],
  all_stars: [
    'ความรัก',
    'Cruel Summer',
    'Ditto',
    'โต๊ะริม (Melt)',
    'ผู้สาวขาเลาะ',
    'アイドル (Idol)',
    'Blinding Lights',
    'คิดแต่ไม่ถึง',
    'คุกเข่า',
    'Lemon'
  ]
};

// ---------------------------------------------------------------------------
// Pre-indexed Artist Hits & Regional Pools for O(1) Instant Decoy Lookup
// ---------------------------------------------------------------------------
interface ArtistHitData {
  artistName: string;
  region: ArtistRegion;
  genreLabel: string;
  hits: string[];
}

const ARTIST_HIT_MAP = new Map<string, ArtistHitData>();
const REGION_ARTISTS: Record<ArtistRegion, ArtistHitData[]> = {
  thai: [],
  inter: [],
  kpop: [],
  anime_jpop: []
};
const REGION_SONG_POOL: Record<ArtistRegion, string[]> = {
  thai: [],
  inter: [],
  kpop: [],
  anime_jpop: []
};

// Build indexes once at module load
for (const artist of GLOBAL_ARTISTS) {
  const rawHits = artist.hitsHint
    ? artist.hitsHint.split(',').map((s) => cleanSongTitle(s)).filter(Boolean)
    : [];
  const hitData: ArtistHitData = {
    artistName: artist.name,
    region: artist.region,
    genreLabel: artist.genreLabel || '',
    hits: rawHits
  };
  ARTIST_HIT_MAP.set(artist.name.toLowerCase().trim(), hitData);
  if (artist.id) {
    ARTIST_HIT_MAP.set(artist.id.toLowerCase().trim(), hitData);
  }
  REGION_ARTISTS[artist.region].push(hitData);
  REGION_SONG_POOL[artist.region].push(...rawHits);
}

// Add curated songs into regional pools
for (const [catKey, songs] of Object.entries(CURATED_SONGS)) {
  let targetRegion: ArtistRegion = 'thai';
  if (catKey === 'inter_pop') targetRegion = 'inter';
  else if (catKey === 'kpop') targetRegion = 'kpop';
  else if (catKey === 'anime_jpop') targetRegion = 'anime_jpop';

  for (const s of songs) {
    const cleaned = cleanSongTitle(s.title);
    if (cleaned) {
      REGION_SONG_POOL[targetRegion].push(cleaned);
    }
  }
}

// Add fallback titles into regional pools
for (const [catKey, titles] of Object.entries(CATEGORY_FALLBACK_TITLES)) {
  if (catKey === 'all_stars') continue;
  let targetRegion: ArtistRegion = 'thai';
  if (catKey === 'inter_pop') targetRegion = 'inter';
  else if (catKey === 'kpop') targetRegion = 'kpop';
  else if (catKey === 'anime_jpop') targetRegion = 'anime_jpop';

  for (const t of titles) {
    REGION_SONG_POOL[targetRegion].push(cleanSongTitle(t));
  }
}

// ---------------------------------------------------------------------------
// Accurate Region & Language Detector
// ---------------------------------------------------------------------------
export function detectSongRegion(targetSong: Song, explicitCategoryId?: string): ArtistRegion {
  const artistLower = targetSong.artist.toLowerCase().trim();
  const known = ARTIST_HIT_MAP.get(artistLower);
  if (known) {
    return known.region;
  }

  // Check Japanese characters (Hiragana, Katakana, Kanji)
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(targetSong.title + targetSong.artist)) {
    return 'anime_jpop';
  }

  // Check Korean characters (Hangul)
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(targetSong.title + targetSong.artist)) {
    return 'kpop';
  }

  // Check Thai characters
  if (/[\u0E00-\u0E7F]/.test(targetSong.title + targetSong.artist)) {
    return 'thai';
  }

  // Storefront check
  const storefront = getArtistStorefront(targetSong.artist);
  if (storefront === 'TH') return 'thai';
  if (storefront === 'JP') return 'anime_jpop';
  if (storefront === 'KR') return 'kpop';
  if (storefront === 'US') return 'inter';

  // Explicit category check if not all_stars
  if (explicitCategoryId && explicitCategoryId !== 'all_stars') {
    if (explicitCategoryId === 'inter_pop') return 'inter';
    if (explicitCategoryId === 'kpop') return 'kpop';
    if (explicitCategoryId === 'anime_jpop') return 'anime_jpop';
    if (['thai_hits', 'tpop_indie', 'y2k_90s', 'lukthung_indie'].includes(explicitCategoryId)) return 'thai';
  }

  // Check Pure Latin / English
  const isPureLatin =
    /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(targetSong.title) &&
    /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(targetSong.artist);
  if (isPureLatin) {
    return 'inter';
  }

  return 'thai';
}

export function detectSongCategory(targetSong: Song, explicitCategoryId?: string): string {
  const region = detectSongRegion(targetSong, explicitCategoryId);
  if (region === 'inter') return 'inter_pop';
  if (region === 'kpop') return 'kpop';
  if (region === 'anime_jpop') return 'anime_jpop';

  if (explicitCategoryId && ['thai_hits', 'tpop_indie', 'y2k_90s', 'lukthung_indie'].includes(explicitCategoryId)) {
    return explicitCategoryId;
  }
  if (/อีสาน|หมอลำ|ไหง่|ผู้สาว|ลูกทุ่ง|มนต์แคน|ไผ่|ต่าย|ก้อง|ห้วยไร่|สลักใจ|คาราบาว|carabao|เพื่อชีวิต|กางเกง|พัทลุง|มหาหิงค์/i.test(targetSong.genre + targetSong.artist)) {
    return 'lukthung_indie';
  }
  if (typeof targetSong.year === 'number' && targetSong.year >= 1990 && targetSong.year <= 2005) {
    return 'y2k_90s';
  }
  return 'thai_hits';
}

// ---------------------------------------------------------------------------
// Strict Language / Script Matcher (Prevents giving Thai choices for English songs & vice versa)
// ---------------------------------------------------------------------------
function isValidDecoyForRegion(title: string, region: ArtistRegion): boolean {
  if (!title || typeof title !== 'string') return false;
  const trimmed = title.trim();
  if (!trimmed || trimmed.length < 2) return false;

  if (region === 'inter') {
    // Strictly Latin / English only! Disallow any Thai, Korean, Japanese characters!
    if (/[\u0E00-\u0E7F\uac00-\ud7af\u3040-\u30ff\u4e00-\u9fff]/.test(trimmed)) {
      return false;
    }
    // Must be readable Latin
    return /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(trimmed);
  }

  if (region === 'thai') {
    // If it contains Thai script, valid!
    if (/[\u0E00-\u0E7F]/.test(trimmed)) {
      return true;
    }
    // If it is Latin without Thai characters, only allow if it is a known Thai title
    const normalized = normalizeText(trimmed);
    const isThaiLatin = REGION_SONG_POOL.thai.some((t) => normalizeText(t) === normalized);
    return isThaiLatin;
  }

  if (region === 'kpop') {
    if (/[\uac00-\ud7af\u1100-\u11ff]/.test(trimmed)) return true;
    const normalized = normalizeText(trimmed);
    return REGION_SONG_POOL.kpop.some((t) => normalizeText(t) === normalized);
  }

  if (region === 'anime_jpop') {
    if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(trimmed)) return true;
    const normalized = normalizeText(trimmed);
    return REGION_SONG_POOL.anime_jpop.some((t) => normalizeText(t) === normalized);
  }

  return true;
}

// ---------------------------------------------------------------------------
// Main Choice Generator
// ---------------------------------------------------------------------------
export function generateChoicesForSong(
  targetSong: Song,
  songPool: Song[] = [],
  categoryId?: string
): string[] {
  const targetCleanTitle = cleanSongTitle(targetSong.title, targetSong.artist) || targetSong.title;
  const normalizedTarget = normalizeText(targetCleanTitle);

  const choices = new Set<string>();
  const normalizedChoices = new Set<string>();

  choices.add(targetCleanTitle);
  normalizedChoices.add(normalizedTarget);

  // 1. FORBID OTHER SONGS FROM CURRENT MATCH PLAYLIST!
  // Any song in the current match (songPool) other than targetSong is FORBIDDEN as a decoy!
  // This completely eliminates the cheat of crossing off songs answered in earlier rounds.
  const forbiddenTitles = new Set<string>();
  for (const s of songPool) {
    const norm = normalizeText(cleanSongTitle(s.title, s.artist) || s.title);
    if (norm !== normalizedTarget) {
      forbiddenTitles.add(norm);
    }
  }

  // 2. Detect region & subcategory of target song
  const region = detectSongRegion(targetSong, categoryId);
  const subcategory = detectSongCategory(targetSong, categoryId);

  const canAdd = (candidate: string): boolean => {
    if (!candidate || typeof candidate !== 'string') return false;
    const cleaned = cleanSongTitle(candidate);
    if (!cleaned) return false;
    const norm = normalizeText(cleaned);

    // Cannot be target song, cannot be already in choices, cannot be from other match rounds
    if (normalizedChoices.has(norm) || forbiddenTitles.has(norm)) {
      return false;
    }

    // Must match language/region of target song (never mix Thai into Inter or vice versa!)
    if (!isValidDecoyForRegion(cleaned, region)) {
      return false;
    }

    return true;
  };

  const tryAdd = (candidate: string): boolean => {
    if (canAdd(candidate)) {
      const cleaned = cleanSongTitle(candidate);
      choices.add(cleaned);
      normalizedChoices.add(normalizeText(cleaned));
      return true;
    }
    return false;
  };

  // 3. TIER 1: Other hits by the SAME artist (creates a realistic, fun challenge!)
  const artistLower = targetSong.artist.toLowerCase().trim();
  const knownArtist = ARTIST_HIT_MAP.get(artistLower);
  if (knownArtist && knownArtist.hits.length > 0) {
    const shuffledArtistHits = [...knownArtist.hits].sort(() => Math.random() - 0.5);
    let sameArtistAdded = 0;
    for (const h of shuffledArtistHits) {
      if (tryAdd(h)) {
        sameArtistAdded++;
        if (sameArtistAdded >= 2 || choices.size >= 3) break;
      }
    }
  }

  // 4. TIER 2: Hits from similar artists in the SAME region & compatible genre
  if (choices.size < 4) {
    const regionArtists = [...REGION_ARTISTS[region]].sort(() => Math.random() - 0.5);

    // Prioritize artists with similar genre
    if (knownArtist && knownArtist.genreLabel) {
      const targetGenreLower = knownArtist.genreLabel.toLowerCase();
      regionArtists.sort((a, b) => {
        const aMatch =
          a.genreLabel.toLowerCase().includes(targetGenreLower) ||
          targetGenreLower.includes(a.genreLabel.toLowerCase());
        const bMatch =
          b.genreLabel.toLowerCase().includes(targetGenreLower) ||
          targetGenreLower.includes(b.genreLabel.toLowerCase());
        return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
      });
    }

    for (const otherArtist of regionArtists) {
      if (otherArtist.artistName.toLowerCase() === artistLower) continue;
      const shuffledHits = [...otherArtist.hits].sort(() => Math.random() - 0.5);
      for (const h of shuffledHits) {
        if (tryAdd(h)) {
          break; // Take 1 hit per artist for diversity
        }
      }
      if (choices.size >= 4) break;
    }
  }

  // 5. TIER 3: Curated songs in matching subcategory
  if (choices.size < 4) {
    const curatedList =
      CURATED_SONGS[subcategory] ||
      CURATED_SONGS[
        region === 'inter'
          ? 'inter_pop'
          : region === 'kpop'
          ? 'kpop'
          : region === 'anime_jpop'
          ? 'anime_jpop'
          : 'thai_hits'
      ] ||
      [];
    const shuffledCurated = [...curatedList].sort(() => Math.random() - 0.5);
    for (const s of shuffledCurated) {
      tryAdd(s.title);
      if (choices.size >= 4) break;
    }
  }

  // 6. TIER 4: Fallback titles strictly for this region
  if (choices.size < 4) {
    const fallbackList =
      CATEGORY_FALLBACK_TITLES[subcategory] ||
      CATEGORY_FALLBACK_TITLES[
        region === 'inter'
          ? 'inter_pop'
          : region === 'kpop'
          ? 'kpop'
          : region === 'anime_jpop'
          ? 'anime_jpop'
          : 'thai_hits'
      ] ||
      [];
    const shuffledFallback = [...fallbackList].sort(() => Math.random() - 0.5);
    for (const t of shuffledFallback) {
      tryAdd(t);
      if (choices.size >= 4) break;
    }
  }

  // 7. TIER 5: Emergency Regional Pool (Guaranteed 4 choices in matching language)
  if (choices.size < 4) {
    const emergencyPool = REGION_SONG_POOL[region] || [];
    const shuffledEmergency = [...emergencyPool].sort(() => Math.random() - 0.5);
    for (const t of shuffledEmergency) {
      tryAdd(t);
      if (choices.size >= 4) break;
    }
  }

  // Return exactly 4 choices, shuffled
  return Array.from(choices).slice(0, 4).sort(() => Math.random() - 0.5);
}
