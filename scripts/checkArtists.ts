import { GLOBAL_ARTISTS } from '../src/data/artistsData';
import { THAI_ARTISTS } from '../src/data/thaiArtists';
import { CATEGORIES } from '../src/data/categories';

console.log('GLOBAL_ARTISTS count:', GLOBAL_ARTISTS.length);
console.log('THAI_ARTISTS count:', THAI_ARTISTS.length);
console.log('CATEGORIES count:', CATEGORIES.length);

const globalNames = new Set(GLOBAL_ARTISTS.map(a => a.name.toLowerCase().trim()));
const missingFromThai = THAI_ARTISTS.filter(a => !globalNames.has(a.name.toLowerCase().trim()));
console.log('Missing from GLOBAL_ARTISTS that are in THAI_ARTISTS:', missingFromThai.length);
if (missingFromThai.length > 0) {
  console.log('Sample missing:', missingFromThai.slice(0, 10).map(a => a.name));
}

// Check search queries in categories
const catArtists = new Set<string>();
CATEGORIES.forEach(c => {
  if (c.selectedArtists) c.selectedArtists.forEach(a => catArtists.add(a));
  if (c.searchQueries) c.searchQueries.forEach(q => catArtists.add(q));
});
const missingCatArtists = Array.from(catArtists).filter(a => !globalNames.has(a.toLowerCase().trim()));
console.log('Missing category artists in GLOBAL_ARTISTS:', missingCatArtists.length);
if (missingCatArtists.length > 0) {
  console.log('Sample missing category artists:', missingCatArtists.slice(0, 15));
}
