import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const artists = [];
const blockRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?region:\s*['"]([^'"]+)['"][\s\S]*?genreLabel:\s*['"]([^'"]+)['"][\s\S]*?hitsHint:\s*['"]([^'"]+)['"][\s\S]*?storefront:\s*['"]([^'"]+)['"]\s*\}/g;

let match;
while ((match = blockRegex.exec(content)) !== null) {
  artists.push({
    id: match[1],
    name: match[2],
    region: match[3],
    genreLabel: match[4],
    hitsHint: match[5],
    storefront: match[6]
  });
}

function cleanSongTitle(rawTitle) {
  return rawTitle
    .replace(/\s*\(feat\..*?\)/gi, '')
    .replace(/\s*\(ft\..*?\)/gi, '')
    .replace(/\s*\(with.*?\)/gi, '')
    .replace(/\s*\(Official.*?\)/gi, '')
    .replace(/\s*\(Music Video.*?\)/gi, '')
    .replace(/\s*\(MV.*?\)/gi, '')
    .replace(/\s*\(เพลงประกอบ.*?\)/gi, '')
    .replace(/\s*\(Ost\..*?\)/gi, '')
    .replace(/\s*\(OST.*?\)/gi, '')
    .replace(/\s*\(Remastered.*?\)/gi, '')
    .replace(/\s*-\s*Remastered.*$/gi, '')
    .replace(/\s*\(Live.*?\)/gi, '')
    .replace(/\s*\(Acoustic.*?\)/gi, '')
    .replace(/\s*-\s*Single$/gi, '')
    .replace(/\s*\[.*?\]/g, '')
    .replace(/\s*【.*?】/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeText(str) {
  return str.toLowerCase().replace(/[\s\-_.,!?'"()[\]{}【】]/g, '');
}

const ARTIST_HIT_MAP = new Map();
const REGION_ARTISTS = { thai: [], inter: [], kpop: [], anime_jpop: [] };
const REGION_SONG_POOL = { thai: [], inter: [], kpop: [], anime_jpop: [] };

for (const artist of artists) {
  const rawHits = artist.hitsHint ? artist.hitsHint.split(',').map((s) => cleanSongTitle(s)).filter(Boolean) : [];
  const hitData = {
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

function detectSongRegion(targetSong, explicitCategoryId) {
  const artistLower = targetSong.artist.toLowerCase().trim();
  const known = ARTIST_HIT_MAP.get(artistLower);
  if (known) return known.region;

  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(targetSong.title + targetSong.artist)) return 'anime_jpop';
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(targetSong.title + targetSong.artist)) return 'kpop';
  if (/[\u0E00-\u0E7F]/.test(targetSong.title + targetSong.artist)) return 'thai';

  const isPureLatin = /^[A-Za-z0-9\s.,!?'"()\-:&$/]+$/.test(targetSong.title) &&
                      /^[A-Za-z0-9\s.,!?'"()\-:&$/]+$/.test(targetSong.artist);
  if (isPureLatin) return 'inter';
  return 'thai';
}

function isValidDecoyForRegion(title, region) {
  if (!title || typeof title !== 'string') return false;
  const trimmed = title.trim();
  if (!trimmed || trimmed.length < 2) return false;

  if (region === 'inter') {
    if (/[\u0E00-\u0E7F\uac00-\ud7af\u3040-\u30ff\u4e00-\u9fff]/.test(trimmed)) {
      return false;
    }
    return /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(trimmed);
  }

  if (region === 'thai') {
    if (/[\u0E00-\u0E7F]/.test(trimmed)) return true;
    const normalized = normalizeText(trimmed);
    return REGION_SONG_POOL.thai.some((t) => normalizeText(t) === normalized);
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

function generateChoicesForSong(targetSong, songPool = [], categoryId) {
  const targetCleanTitle = cleanSongTitle(targetSong.title) || targetSong.title;
  const normalizedTarget = normalizeText(targetCleanTitle);

  const choices = new Set();
  const normalizedChoices = new Set();

  choices.add(targetCleanTitle);
  normalizedChoices.add(normalizedTarget);

  const forbiddenTitles = new Set();
  for (const s of songPool) {
    const norm = normalizeText(cleanSongTitle(s.title) || s.title);
    if (norm !== normalizedTarget) {
      forbiddenTitles.add(norm);
    }
  }

  const region = detectSongRegion(targetSong, categoryId);

  const canAdd = (candidate) => {
    if (!candidate || typeof candidate !== 'string') return false;
    const cleaned = cleanSongTitle(candidate);
    if (!cleaned) return false;
    const norm = normalizeText(cleaned);

    if (normalizedChoices.has(norm) || forbiddenTitles.has(norm)) {
      return false;
    }

    if (!isValidDecoyForRegion(cleaned, region)) {
      return false;
    }

    return true;
  };

  const tryAdd = (candidate) => {
    if (canAdd(candidate)) {
      const cleaned = cleanSongTitle(candidate);
      choices.add(cleaned);
      normalizedChoices.add(normalizeText(cleaned));
      return true;
    }
    return false;
  };

  // Tier 1: Same artist hits
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

  // Tier 2: Similar artists in same region
  if (choices.size < 4) {
    const regionArtists = [...REGION_ARTISTS[region]].sort(() => Math.random() - 0.5);
    for (const otherArtist of regionArtists) {
      if (otherArtist.artistName.toLowerCase() === artistLower) continue;
      const shuffledHits = [...otherArtist.hits].sort(() => Math.random() - 0.5);
      for (const h of shuffledHits) {
        if (tryAdd(h)) {
          break;
        }
      }
      if (choices.size >= 4) break;
    }
  }

  // Tier 3: Emergency regional pool
  if (choices.size < 4) {
    const emergencyPool = REGION_SONG_POOL[region] || [];
    const shuffledEmergency = [...emergencyPool].sort(() => Math.random() - 0.5);
    for (const t of shuffledEmergency) {
      tryAdd(t);
      if (choices.size >= 4) break;
    }
  }

  return Array.from(choices).slice(0, 4).sort(() => Math.random() - 0.5);
}

// SIMULATE A 10-ROUND MIXED MATCH
const testMatch = [
  { title: 'Cruel Summer', artist: 'Taylor Swift' },
  { title: 'เชือกวิเศษ', artist: 'Labanoon' },
  { title: 'Ditto', artist: 'NewJeans' },
  { title: 'アイドル (Idol)', artist: 'YOASOBI' },
  { title: 'เสแสร้ง', artist: 'Paper Planes' },
  { title: 'vampire', artist: 'Olivia Rodrigo' },
  { title: 'วัดปะหล่ะ?', artist: '4EVE' },
  { title: 'Seven', artist: 'Jung Kook' },
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'แสงสุดท้าย', artist: 'Bodyslam' }
];

console.log('=== RUNNING 10 ROUNDS TEST ===');
let pass = true;
testMatch.forEach((song, i) => {
  const choices = generateChoicesForSong(song, testMatch, 'all_stars');
  console.log(`\nRound ${i + 1} [${song.artist}] -> "${song.title}"`);
  console.log('  Choices:', choices);

  // Assert 1: Exactly 4 choices
  if (choices.length !== 4) {
    console.error('  FAIL: Choices count is not 4!');
    pass = false;
  }
  // Assert 2: Target title is in choices
  if (!choices.includes(song.title)) {
    console.error('  FAIL: Target song not in choices!');
    pass = false;
  }
  // Assert 3: No other songs from match appear
  const otherMatchTitles = testMatch.filter(m => m.title !== song.title).map(m => m.title);
  for (const o of otherMatchTitles) {
    if (choices.includes(o)) {
      console.error(`  FAIL: Leaked match song "${o}" in choices!`);
      pass = false;
    }
  }
  // Assert 4: If inter, no Thai characters
  const region = detectSongRegion(song);
  if (region === 'inter') {
    const hasThai = choices.some(c => /[\u0E00-\u0E7F]/.test(c));
    if (hasThai) {
      console.error('  FAIL: Inter song has Thai choices!');
      pass = false;
    }
  }
  // Assert 5: If thai, no Western billboard choices
  if (region === 'thai') {
    const hasWesternBillboard = choices.some(c => ['Cruel Summer', 'Blinding Lights', 'vampire', 'Shape of You', 'Espresso'].includes(c));
    if (hasWesternBillboard) {
      console.error('  FAIL: Thai song has Western billboard choices!');
      pass = false;
    }
  }
});

console.log('\n==============================');
console.log(pass ? '✅ ALL 10 ROUNDS PASSED 100% PERFECTLY!' : '❌ Some assertions failed');
