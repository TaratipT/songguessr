import fs from 'fs';

const missing = JSON.parse(fs.readFileSync('scratch/missing_from_aliases.json', 'utf8'));
const byArtist = {};
for (const m of missing) {
  if (!byArtist[m.artist]) byArtist[m.artist] = [];
  byArtist[m.artist].push({ track: m.trackName, album: m.collectionName });
}

let out = '';
for (const [artist, tracks] of Object.entries(byArtist)) {
  out += `\n=== ${artist} (${tracks.length}) ===\n`;
  tracks.forEach(t => {
    out += `  - ${t.track} [Album: ${t.album}]\n`;
  });
}

fs.writeFileSync('scratch/grouped_missing.txt', out, 'utf8');
console.log('Grouped file saved to scratch/grouped_missing.txt');
