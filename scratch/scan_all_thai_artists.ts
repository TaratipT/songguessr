import { GLOBAL_ARTISTS } from '../src/data/artistsData';
import { THAI_ARTISTS } from '../src/data/thaiArtists';
import fs from 'fs';

const allThaiNames = new Set<string>();
for (const a of GLOBAL_ARTISTS) {
  if (a.region === 'thai') allThaiNames.add(a.name);
}
for (const a of THAI_ARTISTS) {
  allThaiNames.add(a.name);
}

console.log(`Total Thai Artists: ${allThaiNames.size}`);
fs.writeFileSync('scratch/all_thai_artists.json', JSON.stringify(Array.from(allThaiNames), null, 2));
