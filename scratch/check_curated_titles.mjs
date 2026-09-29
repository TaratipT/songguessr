import { CURATED_SONGS } from '../src/data/curatedSongs.ts';

const allSongs = Object.values(CURATED_SONGS).flat();
const englishCurated = allSongs.filter(s => !/[\u0e00-\u0e7f]/.test(s.title) && (s.genre.includes('Thai') || s.genre.includes('Rock') || s.genre.includes('Pop')));
console.log('Curated songs with English title in Thai lists:', englishCurated.map(s => `${s.artist} - ${s.title}`));
