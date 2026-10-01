import type { Song, Category } from '../types';
import { CURATED_SONGS } from '../data/curatedSongs';
import { getArtistStorefront, getArtistAliases, getArtistItunesId } from '../data/artistsData';
import {
  translateKaraokeTitle,
  isRomanizedThaiKaraoke,
  getKaraokeAliases
} from '../data/thaiKaraokeMap';
import {
  getThaiTitleTranslation,
  getSongTitleAliases
} from '../data/thaiSongTitleAliases';
import { registerArtistTracks } from './choiceGenerator';

// Strip version / remix / edit / session / live suffixes so players don't have to guess or see "Midnight Version", "Acoustic Version", etc.
export function stripVersionSuffix(title: string): string {
  if (!title) return '';
  let s = title;

  // 1. Remove parenthesized or bracketed version / mix / live info
  // e.g. (Midnight Version), (Live Version), (Acoustic), (Remix), [Official Audio]
  s = s
    .replace(/\s*\([^)]*?(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live|Session|Edit|Demo|Instrumental|Sped Up|Slowed)[^)]*?\)/gi, '')
    .replace(/\s*\[[^\]]*?(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live|Session|Edit|Demo|Instrumental|Sped Up|Slowed)[^\]]*?\]/gi, '');

  // 2. Remove dash/hyphen version info
  // e.g. - Midnight Version, - Acoustic, - Live at Tokyo Dome, - Radio Edit
  s = s.replace(/\s*[-–—/]\s*.*?(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live|Session|Edit|Demo|Instrumental|Sped Up|Slowed).*$/gi, '');

  // 3. Remove trailing version/remix/live suffix without dash or parentheses
  // e.g. "รักติดไซเรน Midnight Version", "แสงสุดท้าย Acoustic Version", "Shape of You Remix"
  s = s.replace(/\s+(?:[A-Za-z0-9'\s\u0E00-\u0E7F]+)?\s*(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live)$/gi, '');

  const trimmed = s.trim();
  return trimmed.length > 0 ? trimmed : title.trim();
}

// Clean track title to make it pleasant for guessing
export function cleanSongTitle(rawTitle: string, artistName?: string): string {
  let cleaned = stripVersionSuffix(rawTitle)
    .replace(/\s*\(feat\..*?\)/gi, '')
    .replace(/\s*\(ft\..*?\)/gi, '')
    .replace(/\s*\(with.*?\)/gi, '')
    .replace(/\s*\(Official.*?\)/gi, '')
    .replace(/\s*\(Music Video.*?\)/gi, '')
    .replace(/\s*\(MV.*?\)/gi, '')
    .replace(/\s*\(เพลงประกอบ.*?\)/gi, '')
    .replace(/\s*\(Ost\..*?\)/gi, '')
    .replace(/\s*\(OST.*?\)/gi, '')
    .replace(/\s*\(Original Soundtrack.*?\)/gi, '')
    .replace(/\s*\(Remastered.*?\)/gi, '')
    .replace(/\s*-\s*Remastered.*$/gi, '')
    .replace(/\s*\(Live.*?\)/gi, '')
    .replace(/\s*\(Acoustic.*?\)/gi, '')
    .replace(/\s*\(from.*?\)/gi, '')
    .replace(/\s*\(Anime.*?\)/gi, '')
    .replace(/\s*\(TV.*?\)/gi, '')
    .replace(/\s*\(Instrumental.*?\)/gi, '')
    .replace(/\s*-\s*Single$/gi, '')
    .replace(/\s*\[.*?\]/g, '')
    .replace(/\s*【.*?】/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  cleaned = stripVersionSuffix(cleaned);

  // 1. If this title maps to a known Thai title (e.g. UrboyTJ "Do You Mind" -> "รังเกียจกันไหม (Do You Mind)")
  const thaiTitle = getThaiTitleTranslation(cleaned, artistName);
  if (thaiTitle) {
    return thaiTitle;
  }

  // 2. If this title is a known romanized karaoke title, translate to Thai script!
  return translateKaraokeTitle(cleaned);
}

// Normalize text for fuzzy matching (case-insensitive, unicode-apostrophe agnostic, punctuation agnostic)
export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width spaces
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035']/g, '') // all single quotes / apostrophes (straight & curly)
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB"]/g, '') // all double quotes (straight & curly)
    .replace(/[\s\-_.,!?'"()[\]{}【】:;+&~/\\#@*^|•…$]/g, '') // all symbols & punctuation
    .trim();
}

// Calculate Levenshtein edit distance between two strings
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  if (Math.abs(a.length - b.length) > 3) return 999;

  const matrix: number[] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = i;

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      let val: number;
      if (a[i - 1] === b[j - 1]) {
        val = matrix[j - 1];
      } else {
        val = Math.min(matrix[j - 1] + 1, prev + 1, matrix[j] + 1);
      }
      matrix[j - 1] = prev;
      prev = val;
    }
    matrix[b.length] = prev;
  }
  return matrix[b.length];
}

// Check if guess is a close typo of target (strictly prevents sub-word exploits like 'I' or 'want')
export function isCloseMatch(guess: string, target: string): boolean {
  if (!guess || !target) return false;
  if (guess === target) return true;

  // Short titles (<= 4 chars like 'I', 'Me', 'You', 'รัก') must be matched exactly!
  if (target.length <= 4 || guess.length <= 4) return false;

  const lenDiff = Math.abs(guess.length - target.length);
  // Max allowed typos: 1 for length 5-8, 2 for length 9+
  const maxAllowed = target.length >= 9 ? 2 : 1;
  if (lenDiff > maxAllowed) return false;
  // Guess must be at least 75% the length of the target to prevent matching arbitrary substrings
  if (guess.length / target.length < 0.75) return false;

  return levenshteinDistance(guess, target) <= maxAllowed;
}

// Check if user's guess matches the song title
export function isSongMatch(userGuess: string, targetSong: Song): boolean {
  if (!userGuess || !targetSong?.title) return false;

  const strippedGuess = stripVersionSuffix(userGuess)
    .replace(/\s*\(feat\..*?\)/gi, '')
    .replace(/\s*\(ft\..*?\)/gi, '')
    .replace(/\s*\(with.*?\)/gi, '');

  const strippedTarget = stripVersionSuffix(targetSong.title)
    .replace(/\s*\(feat\..*?\)/gi, '')
    .replace(/\s*\(ft\..*?\)/gi, '')
    .replace(/\s*\(with.*?\)/gi, '');

  const cleanGuess = normalizeText(strippedGuess);
  const cleanTarget = normalizeText(targetSong.title);
  const cleanStrippedTarget = normalizeText(strippedTarget);

  if (!cleanGuess) return false;
  if (cleanGuess === cleanTarget || cleanGuess === cleanStrippedTarget) return true;

  // 1. Direct canonical check (e.g. Thai <-> English (Thai))
  const targetCanonical = getThaiTitleTranslation(targetSong.title, targetSong.artist) || getThaiTitleTranslation(strippedTarget, targetSong.artist);
  if (targetCanonical) {
    if (cleanGuess === normalizeText(targetCanonical)) return true;
    const canMain = normalizeText(targetCanonical.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim());
    if (cleanGuess === canMain) return true;
  }

  const guessCanonical = getThaiTitleTranslation(strippedGuess, targetSong.artist);
  if (guessCanonical) {
    const normGC = normalizeText(guessCanonical);
    if (normGC === cleanTarget || normGC === cleanStrippedTarget) return true;
    const guessCanMain = normalizeText(guessCanonical.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim());
    if (guessCanMain === cleanTarget || guessCanMain === cleanStrippedTarget) return true;
  }

  // 2. Check title aliases (both Thai & English, e.g. "Do You Mind" <-> "รังเกียจกันไหม")
  const targetAliases = [
    ...getSongTitleAliases(targetSong.title, targetSong.artist),
    ...getSongTitleAliases(strippedTarget, targetSong.artist)
  ];
  for (const alias of targetAliases) {
    if (cleanGuess === normalizeText(alias)) return true;
    if (cleanGuess === normalizeText(stripVersionSuffix(alias))) return true;
  }

  const guessAliases = getSongTitleAliases(strippedGuess, targetSong.artist);
  for (const alias of guessAliases) {
    const normAlias = normalizeText(alias);
    if (normAlias === cleanTarget || normAlias === cleanStrippedTarget) return true;
  }

  // 3. Check aliases from karaoke map (e.g. user typed "mua kuen" when title is "เมื่อคืน", or vice versa)
  const karaokeAliases = [
    ...getKaraokeAliases(targetSong.title),
    ...getKaraokeAliases(strippedTarget)
  ];
  for (const alias of karaokeAliases) {
    if (cleanGuess === normalizeText(alias)) return true;
    if (cleanGuess === normalizeText(stripVersionSuffix(alias))) return true;
  }

  // Also check if targetSong.title itself translates to something matching the guess
  const translatedTarget = translateKaraokeTitle(strippedTarget);
  if (translatedTarget !== strippedTarget && cleanGuess === normalizeText(translatedTarget)) {
    return true;
  }

  // If user typed a karaoke romanization of something in the map
  const translatedGuess = translateKaraokeTitle(strippedGuess);
  if (translatedGuess !== strippedGuess && (normalizeText(translatedGuess) === cleanTarget || normalizeText(translatedGuess) === cleanStrippedTarget)) {
    return true;
  }

  // 4. Check main part before any parentheses (e.g. "รักแรก (First Love)" -> "รักแรก", "รังเกียจกันไหม (Do You Mind)" -> "รังเกียจกันไหม")
  const mainPart = strippedTarget.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
  const cleanMainPart = normalizeText(mainPart);
  if (cleanGuess === cleanMainPart) return true;

  // Also check if any target aliases match mainPart
  for (const alias of targetAliases) {
    if (cleanGuess === normalizeText(alias.replace(/\(.*?\)/g, ''))) return true;
  }

  // 5. Check inside parentheses (e.g. "รังเกียจกันไหม (Do You Mind)" -> "Do You Mind")
  const parenMatches = targetSong.title.match(/\((.*?)\)/g);
  if (parenMatches) {
    for (const pm of parenMatches) {
      const inner = stripVersionSuffix(pm.replace(/[()]/g, '').trim());
      if (cleanGuess === normalizeText(inner)) return true;
      for (const alias of getSongTitleAliases(inner)) {
        if (cleanGuess === normalizeText(alias)) return true;
      }
    }
  }

  // 6. Check if guess has parentheses and target matches either part
  const guessMainPart = normalizeText(strippedGuess.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim());
  if (guessMainPart && (guessMainPart === cleanTarget || guessMainPart === cleanStrippedTarget || guessMainPart === cleanMainPart)) {
    return true;
  }
  const guessParenMatches = strippedGuess.match(/\((.*?)\)/g);
  if (guessParenMatches) {
    for (const pm of guessParenMatches) {
      const inner = stripVersionSuffix(pm.replace(/[()]/g, '').trim());
      const normInner = normalizeText(inner);
      if (normInner === cleanTarget || normInner === cleanStrippedTarget || normInner === cleanMainPart) return true;
      for (const tAlias of targetAliases) {
        if (normInner === normalizeText(tAlias)) return true;
      }
    }
  }

  // 7. Cross-check guessAliases against mainPart or target aliases
  for (const alias of guessAliases) {
    const normAlias = normalizeText(alias);
    if (normAlias === cleanMainPart) return true;
    for (const tAlias of targetAliases) {
      if (normAlias === normalizeText(tAlias)) return true;
    }
  }

  // 8. Controlled typo tolerance: only allow near-full title matches with 1-2 minor typos
  if (isCloseMatch(cleanGuess, cleanTarget)) return true;
  if (isCloseMatch(cleanGuess, cleanStrippedTarget)) return true;
  if (isCloseMatch(cleanGuess, cleanMainPart)) return true;
  for (const alias of targetAliases) {
    if (isCloseMatch(cleanGuess, normalizeText(alias))) return true;
    if (isCloseMatch(cleanGuess, normalizeText(stripVersionSuffix(alias)))) return true;
  }

  return false;
}

// Shuffle helper
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Map category to best iTunes storefront country
export function getStorefrontForCategory(categoryId: string): string {
  switch (categoryId) {
    case 'anime_jpop':
    case 'anime_rock':
      return 'JP';
    case 'kpop':
    case 'kpop_queens':
    case 'kpop_kings':
    case 'mega_kpop_hits':
      return 'US';
    case 'inter_pop':
    case 'inter_queens':
    case 'inter_rock':
    case 'inter_edm':
    case 'mega_inter_hits':
      return 'US';
    case 'mega_all_stars':
    case 'all_stars':
    case 'mega_thai_hits':
    case 'thai_hits':
    case 'tpop_indie':
    case 'y2k_90s':
    case 'lukthung_indie':
    default:
      return 'TH';
  }
}

// Interleave songs across artists to guarantee high diversity (e.g. 1 song per artist)
function balanceSongsByArtist(songs: Song[], targetCount: number): Song[] {
  const byArtist = new Map<string, Song[]>();
  const seenTitles = new Set<string>();

  for (const s of songs) {
    const titleKey = normalizeText(cleanSongTitle(s.title, s.artist) || s.title);
    if (seenTitles.has(titleKey)) continue;
    seenTitles.add(titleKey);

    const artistKey = normalizeText(s.artist);
    if (!byArtist.has(artistKey)) {
      byArtist.set(artistKey, []);
    }
    byArtist.get(artistKey)!.push(s);
  }

  // Shuffle individual buckets
  for (const [key, bucket] of byArtist.entries()) {
    byArtist.set(key, shuffleArray(bucket));
  }

  const shuffledBuckets = shuffleArray(Array.from(byArtist.values()));
  const balancedResult: Song[] = [];
  const maxBucketSize = Math.max(...shuffledBuckets.map((b) => b.length), 0);

  const finalizeSongs = (songs: Song[]): Song[] => {
    return songs.map((s) => {
      const clean = cleanSongTitle(s.title, s.artist) || s.title;
      return {
        ...s,
        title: clean,
        firstCharHint: s.firstCharHint || clean.charAt(0) || '🎵'
      };
    });
  };

  // Round-robin interleaving: 1st song of each artist, then 2nd, etc.
  for (let round = 0; round < maxBucketSize; round++) {
    for (const bucket of shuffledBuckets) {
      if (round < bucket.length) {
        balancedResult.push(bucket[round]);
        if (balancedResult.length >= targetCount) {
          return finalizeSongs(balancedResult);
        }
      }
    }
  }

  return finalizeSongs(balancedResult);
}

// Strict artist cleaner: keeps dots and numbers, strips whitespace/hyphens
export function cleanArtist(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\s\-_]/g, '')
    .replace(/['"!?'"()[\]{}【】]/g, '')
    .trim();
}

// Strict matching helper: check if track's artistName matches target artist as primary artist
export function isMainArtistMatch(trackArtist: string, targetArtist: string): boolean {
  const normTrack = cleanArtist(trackArtist);
  const normTarget = cleanArtist(targetArtist);
  if (!normTrack || !normTarget) return false;
  if (normTrack === normTarget) return true;

  // Check alias dictionary (e.g. Carabao <-> คาราบาว, Monkan <-> มนต์แคน, etc.)
  const targetAliases = getArtistAliases(targetArtist).map(cleanArtist);
  if (targetAliases.includes(normTrack)) {
    return true;
  }

  const trackAliases = getArtistAliases(trackArtist).map(cleanArtist);
  if (trackAliases.includes(normTarget)) {
    return true;
  }

  // Split by common artist separators: &, ,, /, feat., ft., with, x, X
  const parts = trackArtist.split(/[,&/]|feat\.|ft\.|with\b|\s+x\s+|\s+X\s+/i).map(cleanArtist).filter(Boolean);
  // Target artist must be the primary (first) artist in the billing
  if (parts.length > 0) {
    const firstPart = parts[0];
    if (firstPart === normTarget) return true;
    if (targetAliases.includes(firstPart)) return true;
  }

  return false;
}

// Fetch songs from iTunes Search API with clean fallback
export async function getSongsForGame(category: Category, count: number = 10): Promise<Song[]> {
  // 🌟 Dedicated Mega Hits Handler (Fetches ONLY verified iconic mega hit songs)
  if (category.isMegaHits) {
    const pool = shuffleArray(category.searchQueries);
    const chosenQueries = pool.slice(0, Math.min(pool.length, count + 6));

    try {
      const fetchPromises = chosenQueries.map(async (query) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4800);

        let termStorefront = getStorefrontForCategory(category.id);
        if (/[\u0e00-\u0e7f]/.test(query)) {
          termStorefront = 'TH';
        } else if (category.region === 'kpop' || category.region === 'inter' || /[\uac00-\ud7af]/.test(query)) {
          termStorefront = 'US';
        }

        const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=${termStorefront}&entity=song&limit=4`;

        try {
          const res = await fetch(searchUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (!res.ok) return null;
          const data = await res.json();
          const results = data.results || [];

          // Find the best valid track (avoid karaoke, tribute, instrumental, or unmapped karaoke romanization in TH)
          const item = results.find((it: { previewUrl?: string; trackName?: string; artistName?: string }) => {
            if (!it.previewUrl || !it.trackName || !it.artistName) return false;
            const lowerArtist = it.artistName.toLowerCase();
            const lowerTitle = it.trackName.toLowerCase();
            if (lowerArtist.includes('karaoke') || lowerArtist.includes('tribute') || lowerArtist.includes('instrumental')) return false;
            if (lowerTitle.includes('karaoke') || lowerTitle.includes('backing track')) return false;
            if (termStorefront === 'TH' && isRomanizedThaiKaraoke(it.trackName)) return false;
            return true;
          });

          if (!item) return null;

          const cleanTitle = cleanSongTitle(item.trackName, item.artistName);
          const song: Song = {
            id: String(item.trackId),
            title: cleanTitle,
            artist: item.artistName,
            album: item.collectionName || 'Single',
            year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 'ไม่ระบุ',
            genre: item.primaryGenreName || 'Mega Hits',
            previewUrl: item.previewUrl.replace(/^http:/, 'https:'),
            artworkUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : '',
            lyricsHint: `ผลงานเพลงดังระดับปรากฏการณ์ของ ${item.artistName}`,
            firstCharHint: cleanTitle.charAt(0) || '🎵'
          };
          return song;
        } catch {
          return null;
        }
      });

      const fetched = await Promise.all(fetchPromises);
      const validSongs = fetched.filter((s): s is Song => s !== null && !!s.previewUrl && !!s.title);

      if (validSongs.length >= Math.min(3, count)) {
        return balanceSongsByArtist(validSongs, count);
      }
    } catch (err) {
      console.warn('Could not fetch mega hits from iTunes:', err);
    }

    // Emergency curated fallback
    const fallbackSongs = CURATED_SONGS[category.id] || (
      category.region === 'thai' ? CURATED_SONGS.thai_hits :
      category.region === 'inter' ? CURATED_SONGS.inter_pop :
      category.region === 'kpop' ? CURATED_SONGS.kpop :
      Object.values(CURATED_SONGS).flat()
    );
    return balanceSongsByArtist(fallbackSongs, count);
  }

  const hasSelectedArtists = Boolean(category.selectedArtists && category.selectedArtists.length > 0);

  // Determine queries
  const isMultiCategory = Boolean(category.id.startsWith('multi_') || (category.includedCategories && category.includedCategories.length > 1));

  let queriesToRun: string[];
  if (category.includedCategories && category.includedCategories.length > 1) {
    const cats = category.includedCategories;
    const perCat = Math.max(2, Math.floor(16 / cats.length));
    const picked: string[] = [];
    for (const c of cats) {
      picked.push(...shuffleArray(c.searchQueries).slice(0, perCat));
    }
    queriesToRun = shuffleArray(picked).slice(0, 16);
  } else {
    const queries = hasSelectedArtists && category.selectedArtists && category.selectedArtists.length > 0
      ? category.selectedArtists
      : category.searchQueries;
    queriesToRun = queries.length <= 15 ? queries : shuffleArray(queries).slice(0, 15);
  }

  // Proportional limit per artist so games with 1-3 artists get plenty of tracks
  const limitPerArtist = Math.max(10, Math.min(30, Math.ceil((count * 2.5) / queriesToRun.length)));

  try {
    const fetchPromises = queriesToRun.map(async (term) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4800);

      const termStorefront = (hasSelectedArtists || isMultiCategory || category.id === 'all_stars')
        ? getArtistStorefront(term)
        : getStorefrontForCategory(category.id);

      const artistId = getArtistItunesId(term);
      const searchUrl = artistId
        ? `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=${Math.max(35, limitPerArtist)}&country=${termStorefront}`
        : `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${termStorefront}&entity=song&limit=${limitPerArtist}`;

      try {
        const res = await fetch(searchUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.results || [])
          .filter((item: { previewUrl?: string; trackName?: string; artistName?: string; primaryGenreName?: string }) => {
            if (!item.previewUrl || !item.trackName || !item.artistName) return false;

            // Region protection: If category is Thai region or storefront is TH, strictly exclude K-Pop, J-Pop, and Korean/Japanese tracks
            if (category.region === 'thai' || termStorefront === 'TH') {
              if (/k-pop|kpop|j-pop|jpop|anime/i.test(item.primaryGenreName || '')) return false;
              if (/[\uac00-\ud7af\u3040-\u30ff]/.test(item.trackName) || /[\uac00-\ud7af\u3040-\u30ff]/.test(item.artistName)) return false;
            }

            // Strictly require artist match when specific artists are chosen or query is a known artist
            if (hasSelectedArtists || artistId) {
              return isMainArtistMatch(item.artistName, term);
            }
            return true;
          })
          .map((item: {
            trackId: number;
            trackName: string;
            artistName: string;
            collectionName: string;
            releaseDate: string;
            primaryGenreName: string;
            previewUrl: string;
            artworkUrl100?: string;
          }): Song => ({
            id: String(item.trackId),
            title: cleanSongTitle(item.trackName, item.artistName),
            artist: item.artistName,
            album: item.collectionName || 'Single',
            year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 'ไม่ระบุ',
            genre: item.primaryGenreName || 'เพลงฮิต',
            previewUrl: item.previewUrl.replace(/^http:/, 'https:'),
            artworkUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : '',
            lyricsHint: `ผลงานเพลงดังของ ${item.artistName}`,
            firstCharHint: cleanSongTitle(item.trackName, item.artistName).charAt(0) || '🎵'
          }))
          .filter((song: Song) => {
            // For Thai queries, filter out any unmapped romanized karaoke titles so players only get clean titles
            if (termStorefront === 'TH' && isRomanizedThaiKaraoke(song.title)) {
              return false;
            }
            return true;
          });
      } catch {
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const liveSongs = results.flat().filter((s) => s.previewUrl && s.title && s.artist);

    // Register live songs into artist discography cache for multiple-choice generation
    const liveByArtist = new Map<string, string[]>();
    for (const ls of liveSongs) {
      const list = liveByArtist.get(ls.artist) || [];
      list.push(ls.title);
      liveByArtist.set(ls.artist, list);
    }
    for (const [art, trackTitles] of liveByArtist.entries()) {
      registerArtistTracks(art, trackTitles);
    }

    // If we have enough live songs directly from iTunes, USE THEM EXCLUSIVELY!
    if (liveSongs.length >= Math.min(3, count)) {
      const balanced = balanceSongsByArtist(liveSongs, count);
      if (balanced.length >= Math.min(count, liveSongs.length)) {
        return balanced;
      }
    }

    // Only if live search had fewer than 3 songs, prepare emergency fallback:
    let fallbackSongs: Song[] = [];
    if (hasSelectedArtists && category.selectedArtists) {
      const allCurated = Object.values(CURATED_SONGS).flat();
      fallbackSongs = allCurated.filter((s) =>
        category.selectedArtists!.some((target) => isMainArtistMatch(s.artist, target))
      );

      // If we got ANY live songs, prefer them over unrelated fallbacks!
      if (fallbackSongs.length === 0 && liveSongs.length > 0) {
        return balanceSongsByArtist(liveSongs, count);
      }
    } else {
      fallbackSongs = CURATED_SONGS[category.id] || (category.id === 'all_stars' ? Object.values(CURATED_SONGS).flat() : []);
    }

    const combined = [...liveSongs, ...fallbackSongs];
    if (combined.length > 0) {
      return balanceSongsByArtist(combined, count);
    }
  } catch (err) {
    console.warn('Could not fetch from iTunes:', err);
  }

  // Safe emergency fallback with STRICT region/genre alignment (Never cross genres)
  if (hasSelectedArtists && category.selectedArtists && category.selectedArtists.length > 0) {
    const sampleArtist = category.selectedArtists[0];
    const storefront = getArtistStorefront(sampleArtist);
    if (storefront === 'JP' || /[\u3040-\u30ff]/.test(sampleArtist)) {
      return balanceSongsByArtist(CURATED_SONGS.anime_jpop || [], count);
    }
    if (storefront === 'KR' || /[\uac00-\ud7af]/.test(sampleArtist)) {
      return balanceSongsByArtist(CURATED_SONGS.kpop || [], count);
    }
    if (storefront === 'TH' || /[\u0e00-\u0e7f]/.test(sampleArtist)) {
      if (/คาราบาว|carabao|มนต์แคน|ไผ่|ต่าย|ก้อง|ลูกทุ่ง|เพื่อชีวิต/i.test(sampleArtist)) {
        return balanceSongsByArtist(CURATED_SONGS.lukthung_indie || CURATED_SONGS.thai_hits, count);
      }
      return balanceSongsByArtist(CURATED_SONGS.thai_hits || [], count);
    }
    return balanceSongsByArtist(CURATED_SONGS.inter_pop || [], count);
  }

  const catFallback = CURATED_SONGS[category.id] || CURATED_SONGS.thai_hits;
  return balanceSongsByArtist(catFallback, count);
}

// Fetch custom artist game with strict artist matching
export async function getSongsForCustomArtist(artistName: string, count: number = 10): Promise<Song[]> {
  const storefront = getArtistStorefront(artistName);
  const artistId = getArtistItunesId(artistName);
  const searchUrl = artistId
    ? `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=40&country=${storefront}`
    : `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&country=${storefront}&entity=song&limit=35`;

  try {
    const res = await fetch(searchUrl);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const seenTitles = new Set<string>();

    const songs: Song[] = (data.results || [])
      .filter((item: { previewUrl?: string; trackName?: string; artistName?: string }) => {
        if (!item.previewUrl || !item.trackName || !item.artistName) return false;
        // Strictly ensure artist is the main artist (or matching alias)
        return isMainArtistMatch(item.artistName, artistName);
      })
      .map((item: {
        trackId: number;
        trackName: string;
        artistName: string;
        collectionName: string;
        releaseDate: string;
        primaryGenreName: string;
        previewUrl: string;
        artworkUrl100?: string;
      }): Song => ({
        id: String(item.trackId),
        title: cleanSongTitle(item.trackName, item.artistName),
        artist: item.artistName,
        album: item.collectionName || 'Album',
        year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : '2023',
        genre: item.primaryGenreName || 'Pop',
        previewUrl: item.previewUrl.replace(/^http:/, 'https:'),
        artworkUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : '',
        lyricsHint: `เพลงของ ${item.artistName}`,
        firstCharHint: cleanSongTitle(item.trackName, item.artistName).charAt(0) || '🎵'
      }))
      .filter((song: Song) => {
        if (storefront === 'TH' && isRomanizedThaiKaraoke(song.title)) {
          return false;
        }
        const key = normalizeText(song.title);
        if (seenTitles.has(key)) return false;
        seenTitles.add(key);
        return true;
      });

    const finalize = (list: Song[]): Song[] =>
      list.map((s) => {
        const clean = cleanSongTitle(s.title, s.artist) || s.title;
        return { ...s, title: clean, firstCharHint: s.firstCharHint || clean.charAt(0) || '🎵' };
      });

    if (songs.length > 0) {
      registerArtistTracks(artistName, songs.map((s) => s.title));
      return finalize(shuffleArray(songs).slice(0, count));
    }
  } catch (err) {
    console.warn('Custom search failed:', err);
  }

  const finalize = (list: Song[]): Song[] =>
    list.map((s) => {
      const clean = cleanSongTitle(s.title, s.artist) || s.title;
      return { ...s, title: clean, firstCharHint: s.firstCharHint || clean.charAt(0) || '🎵' };
    });

  // Check curated matching this specific artist
  const allCurated = Object.values(CURATED_SONGS).flat();
  const matchedCurated = allCurated.filter((s) => isMainArtistMatch(s.artist, artistName));
  if (matchedCurated.length > 0) {
    return finalize(shuffleArray(matchedCurated).slice(0, count));
  }

  // Genre-aware safe fallback (Never give English pop to a Thai artist)
  if (/[\u0e00-\u0e7f]/.test(artistName) || storefront === 'TH') {
    if (/คาราบาว|carabao|มนต์แคน|ไผ่|ต่าย|ก้อง|ลูกทุ่ง|เพื่อชีวิต/i.test(artistName)) {
      return finalize(shuffleArray(CURATED_SONGS.lukthung_indie).slice(0, count));
    }
    return finalize(shuffleArray(CURATED_SONGS.thai_hits).slice(0, count));
  }
  if (storefront === 'JP' || /[\u3040-\u30ff]/.test(artistName)) {
    return finalize(shuffleArray(CURATED_SONGS.anime_jpop).slice(0, count));
  }
  if (storefront === 'KR' || /[\uac00-\ud7af]/.test(artistName)) {
    return finalize(shuffleArray(CURATED_SONGS.kpop).slice(0, count));
  }
  return finalize(shuffleArray(CURATED_SONGS.inter_pop).slice(0, count));
}
