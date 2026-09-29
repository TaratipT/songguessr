import fs from 'fs';

// Load artists
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

// Artist hits map
const artistHits = new Map();
artists.forEach(a => {
  const songs = a.hitsHint.split(',').map(s => s.trim()).filter(Boolean);
  artistHits.set(a.name.toLowerCase(), { artist: a, songs });
});

// Group artists by region and genre
const regionArtists = {
  thai: artists.filter(a => a.region === 'thai'),
  inter: artists.filter(a => a.region === 'inter'),
  kpop: artists.filter(a => a.region === 'kpop'),
  anime_jpop: artists.filter(a => a.region === 'anime_jpop')
};

console.log('Thai artists:', regionArtists.thai.length);
console.log('Inter artists:', regionArtists.inter.length);
console.log('Kpop artists:', regionArtists.kpop.length);
console.log('Anime artists:', regionArtists.anime_jpop.length);

function detectRegion(song) {
  const found = artistHits.get(song.artist.toLowerCase());
  if (found) return found.artist.region;
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(song.title + song.artist)) return 'anime_jpop';
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(song.title + song.artist)) return 'kpop';
  if (/[\u0E00-\u0E7F]/.test(song.title + song.artist)) return 'thai';
  return 'inter';
}

function generateSmartChoices(targetSong, matchSongs = []) {
  const forbidden = new Set(
    matchSongs
      .filter(s => s.title.toLowerCase().trim() !== targetSong.title.toLowerCase().trim())
      .map(s => s.title.toLowerCase().trim())
  );

  const region = detectRegion(targetSong);
  const choices = new Set();
  choices.add(targetSong.title);

  // 1. Same artist hits
  const artistEntry = artistHits.get(targetSong.artist.toLowerCase());
  if (artistEntry) {
    const shuffledHits = [...artistEntry.songs].sort(() => Math.random() - 0.5);
    for (const h of shuffledHits) {
      const norm = h.toLowerCase().trim();
      if (!forbidden.has(norm) && norm !== targetSong.title.toLowerCase().trim()) {
        choices.add(h);
        if (choices.size >= 2) break; // max 1 extra from same artist
      }
    }
  }

  // 2. Similar artists in the same region
  const poolArtists = regionArtists[region] || regionArtists.thai;
  const shuffledArtists = [...poolArtists].sort(() => Math.random() - 0.5);
  for (const a of shuffledArtists) {
    if (a.name.toLowerCase() === targetSong.artist.toLowerCase()) continue;
    const hits = a.hitsHint.split(',').map(s => s.trim()).filter(Boolean);
    const hit = hits[Math.floor(Math.random() * hits.length)];
    if (hit) {
      const norm = hit.toLowerCase().trim();
      if (!forbidden.has(norm) && norm !== targetSong.title.toLowerCase().trim()) {
        choices.add(hit);
        if (choices.size >= 4) break;
      }
    }
  }

  return Array.from(choices).slice(0, 4).sort(() => Math.random() - 0.5);
}

// Test scenario with mixed playlist:
const playlist = [
  { title: 'Cruel Summer', artist: 'Taylor Swift' },
  { title: 'แสงสุดท้าย', artist: 'Bodyslam' },
  { title: 'Ditto', artist: 'NewJeans' },
  { title: 'ลืมไปแล้วว่าลืมยังไง', artist: 'Jeff Satur' },
  { title: 'vampire', artist: 'Olivia Rodrigo' }
];

playlist.forEach((song, idx) => {
  const choices = generateSmartChoices(song, playlist);
  console.log(`\nRound ${idx + 1}: ${song.title} (${song.artist})`);
  console.log('Choices:', choices);
  // Check: does choices contain any other song from playlist?
  const otherPlaylistSongs = playlist.filter(p => p.title !== song.title).map(p => p.title);
  const leaked = choices.filter(c => otherPlaylistSongs.includes(c));
  if (leaked.length > 0) {
    console.error('ERROR: Leaked playlist songs:', leaked);
  } else {
    console.log('✓ No leaked playlist songs!');
  }
});
