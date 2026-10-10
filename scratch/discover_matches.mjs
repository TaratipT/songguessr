import fs from 'fs';

// Load Thai artists from artistsData and thaiArtists
const artistsDataText = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const thaiArtists = new Map();

// Parse storefronts and artist ids if present
const blocks = artistsDataText.split(/\{\s*id:/);
for (const b of blocks) {
  if (b.includes("region: 'thai'")) {
    const nameMatch = b.match(/name:\s*'([^']+)'/);
    if (nameMatch) {
      thaiArtists.set(nameMatch[1], null);
    }
  }
}

const thaiArtistsText = fs.readFileSync('src/data/thaiArtists.ts', 'utf8');
for (const m of thaiArtistsText.matchAll(/name:\s*'([^']+)'/g)) {
  if (!thaiArtists.has(m[1])) {
    thaiArtists.set(m[1], null);
  }
}

console.log(`Analyzing ${thaiArtists.size} Thai artists for English <-> Thai song matches...`);

const matches = [];

for (const [artistName] of thaiArtists.entries()) {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&country=th&media=music&entity=song&limit=100`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) continue;
    const data = await res.json();
    const tracks = (data.results || []).filter(x => {
      const art = (x.artistName || '').toLowerCase();
      return art.includes(artistName.toLowerCase());
    });

    for (let i = 0; i < tracks.length; i++) {
      for (let j = i + 1; j < tracks.length; j++) {
        const t1 = tracks[i];
        const t2 = tracks[j];

        // One has Thai characters, the other DOES NOT have Thai characters:
        const t1HasThai = /[\u0E00-\u0E7F]/.test(t1.trackName);
        const t2HasThai = /[\u0E00-\u0E7F]/.test(t2.trackName);

        if (t1HasThai !== t2HasThai) {
          const thaiTrack = t1HasThai ? t1 : t2;
          const engTrack = t1HasThai ? t2 : t1;

          // If track duration is within 1.5 seconds:
          if (Math.abs(thaiTrack.trackTimeMillis - engTrack.trackTimeMillis) <= 1500) {
            matches.push({
              artist: artistName,
              engTitle: engTrack.trackName,
              thaiTitle: thaiTrack.trackName,
              engAlbum: engTrack.collectionName,
              thaiAlbum: thaiTrack.collectionName,
              diffMs: Math.abs(thaiTrack.trackTimeMillis - engTrack.trackTimeMillis)
            });
          }
        }
      }
    }
  } catch (e) {
    // ignore network errors
  }
  await new Promise(r => setTimeout(r, 80));
}

// Deduplicate
const uniqueMatches = [];
const seen = new Set();
for (const m of matches) {
  const k = `${m.artist.toLowerCase()}:::${m.engTitle.toLowerCase()}:::${m.thaiTitle.toLowerCase()}`;
  if (!seen.has(k)) {
    seen.add(k);
    uniqueMatches.push(m);
  }
}

console.log(`Discovered ${uniqueMatches.length} cross-release Thai <-> English song matches!`);
fs.writeFileSync('scratch/discovered_matches.json', JSON.stringify(uniqueMatches, null, 2), 'utf8');

for (const m of uniqueMatches) {
  console.log(`[${m.artist}] "${m.engTitle}" <===> "${m.thaiTitle}"`);
}
