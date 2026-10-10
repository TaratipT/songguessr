import fs from 'fs';

const songs = JSON.parse(fs.readFileSync('scratch/english_titled_songs.json', 'utf8'));

// Filter out songs that are already in aliases
const filtered = songs.filter(s => !s.inAliases);

console.log('Total non-aliased English-titled songs:', filtered.length);

// Print by artist
const byArtist = {};
for (const s of filtered) {
  byArtist[s.artist] = byArtist[s.artist] || [];
  byArtist[s.artist].push(s);
}

for (const [artist, list] of Object.entries(byArtist)) {
  console.log(`\n=== ${artist} (${list.length}) ===`);
  for (const item of list) {
    console.log(`  - "${item.trackName}" [Album: "${item.collectionName}"]`);
  }
}
