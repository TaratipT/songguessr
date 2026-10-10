import fs from 'fs';

// 1. Parse Thai artists
const artistsDataText = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const thaiArtists = new Set();

const blocks = artistsDataText.split(/\{\s*id:/);
for (const b of blocks) {
  if (b.includes("region: 'thai'")) {
    const nameMatch = b.match(/name:\s*'([^']+)'/);
    if (nameMatch) thaiArtists.add(nameMatch[1]);
  }
}

const thaiArtistsText = fs.readFileSync('src/data/thaiArtists.ts', 'utf8');
for (const m of thaiArtistsText.matchAll(/name:\s*'([^']+)'/g)) {
  thaiArtists.add(m[1]);
}

console.log(`Loaded ${thaiArtists.size} Thai artists.`);

// 2. Read existing rules in thaiSongTitleAliases.ts
const aliasesText = fs.readFileSync('src/data/thaiSongTitleAliases.ts', 'utf8');

// Helper to clean key
function cleanKey(str) {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035']/g, '')
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB"]/g, '')
    .replace(/[\s\-_.,!?'"()[\]{}【】:;+&~/\\#@*^|•…$?]/g, '')
    .trim();
}

async function searchArtistSongs(artist) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&country=th&media=music&entity=song&limit=50`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (e) {
    return [];
  }
}

const results = [];

for (const artist of Array.from(thaiArtists)) {
  const tracks = await searchArtistSongs(artist);
  for (const t of tracks) {
    // Only songs by the primary artist
    const trackArtist = (t.artistName || '').toLowerCase();
    if (!trackArtist.includes(artist.toLowerCase())) continue;

    const trackName = t.trackName || '';
    const hasThai = /[\u0E00-\u0E7F]/.test(trackName);

    // If track name has NO Thai characters:
    if (!hasThai) {
      const key = cleanKey(trackName);
      // Check if already in aliases file
      const inAliases = aliasesText.toLowerCase().includes(`'${trackName.toLowerCase()}'`) ||
                        aliasesText.toLowerCase().includes(`"${trackName.toLowerCase()}"`) ||
                        aliasesText.toLowerCase().includes(key);

      results.push({
        artist,
        trackName,
        collectionName: t.collectionName || '',
        inAliases,
        previewUrl: t.previewUrl
      });
    }
  }
  // tiny delay to avoid rate limiting
  await new Promise(r => setTimeout(r, 100));
}

// Deduplicate
const unique = [];
const seen = new Set();
for (const r of results) {
  const k = `${r.artist.toLowerCase()}:::${r.trackName.toLowerCase()}`;
  if (!seen.has(k)) {
    seen.add(k);
    unique.push(r);
  }
}

console.log(`Found ${unique.length} English-titled songs among Thai artists.`);
fs.writeFileSync('scratch/english_titled_songs.json', JSON.stringify(unique, null, 2), 'utf8');

const missing = unique.filter(u => !u.inAliases);
console.log(`Missing from aliases: ${missing.length}`);
fs.writeFileSync('scratch/missing_from_aliases.json', JSON.stringify(missing, null, 2), 'utf8');
