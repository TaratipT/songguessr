import * as fs from 'fs';
import { getThaiTitleTranslation } from '../src/data/thaiSongTitleAliases';

const data = JSON.parse(fs.readFileSync('scratch/untranslated_english_tracks.json', 'utf8'));
const remaining: any[] = [];
for (const item of data) {
  const res = getThaiTitleTranslation(item.cleanedTitle, item.artist);
  if (!res) {
    remaining.push(item);
  }
}

let out = `Remaining untranslated: ${remaining.length}\n`;
const byArtist: Record<string, any[]> = {};
for (const r of remaining) {
  if (!byArtist[r.artist]) byArtist[r.artist] = [];
  byArtist[r.artist].push({ title: r.cleanedTitle, album: r.album });
}
for (const [art, tracks] of Object.entries(byArtist)) {
  out += `\n=== ${art} (${tracks.length}) ===\n`;
  for (const t of tracks) {
    out += `   - ${t.title} [${t.album}]\n`;
  }
}
fs.writeFileSync('scratch/remaining_untranslated.txt', out, 'utf8');
console.log('Saved to scratch/remaining_untranslated.txt');
