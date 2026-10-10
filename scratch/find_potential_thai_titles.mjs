import fs from 'fs';

const songs = JSON.parse(fs.readFileSync('scratch/missing_from_aliases.json', 'utf8'));

console.log('Total missing songs:', songs.length);

// Let's filter out known foreign or pure-English songs:
// For example, Patrickananda songs (Lavender, Oasis, 12th, etc.) are English lyrics/titles.
// Violette Wautier's English album (Glitter and Smoke) songs are pure English.
// 4EVE and PiXXiE pure English singles (hot2hot, DEJAYOU, etc.) are pure English titles.
// Let's print candidate artists where tracks might have Thai names:
const candidates = [];

for (const s of songs) {
  // Check if track name looks like Romanized Thai, or is a common Thai band English single title
  candidates.push({
    artist: s.artist,
    track: s.trackName,
    album: s.collectionName
  });
}

console.log(JSON.stringify(candidates.slice(0, 50), null, 2));
