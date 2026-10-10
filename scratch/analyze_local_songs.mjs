import fs from 'fs';

const songs = JSON.parse(fs.readFileSync('scratch/english_titled_songs.json', 'utf8'));

const byArtist = {};
for (const s of songs) {
  if (!byArtist[s.artist]) byArtist[s.artist] = [];
  byArtist[s.artist].push(s);
}

let out = '';
for (const [artist, list] of Object.entries(byArtist)) {
  out += `\n========================================\n`;
  out += `ARTIST: ${artist} (${list.length} tracks)\n`;
  out += `========================================\n`;
  for (const item of list) {
    out += `  "${item.trackName}" (Album: "${item.collectionName}") [inAliases: ${item.inAliases}]\n`;
  }
}

fs.writeFileSync('scratch/all_english_songs.txt', out, 'utf8');
console.log('Done UTF-8 write, total lines:', out.split('\n').length);
