import { CATEGORIES } from '../src/data/categories.ts';
import { getSongsForGame } from '../src/services/itunesApi.ts';

async function verify() {
  console.log('--- Testing mega_thai_hits ---');
  const thaiCat = CATEGORIES.find(c => c.id === 'mega_thai_hits');
  if (!thaiCat) throw new Error('thaiCat not found');
  const thaiSongs = await getSongsForGame(thaiCat, 5);
  console.log(`Got ${thaiSongs.length} Thai mega songs:`);
  thaiSongs.forEach((s, i) => console.log(`  ${i+1}. [${s.title}] - ${s.artist} (Preview: ${!!s.previewUrl})`));

  console.log('\n--- Testing mega_inter_hits ---');
  const interCat = CATEGORIES.find(c => c.id === 'mega_inter_hits');
  if (!interCat) throw new Error('interCat not found');
  const interSongs = await getSongsForGame(interCat, 5);
  console.log(`Got ${interSongs.length} Inter mega songs:`);
  interSongs.forEach((s, i) => console.log(`  ${i+1}. [${s.title}] - ${s.artist} (Preview: ${!!s.previewUrl})`));

  console.log('\n--- Testing mega_kpop_hits ---');
  const kpopCat = CATEGORIES.find(c => c.id === 'mega_kpop_hits');
  if (!kpopCat) throw new Error('kpopCat not found');
  const kpopSongs = await getSongsForGame(kpopCat, 5);
  console.log(`Got ${kpopSongs.length} K-Pop mega songs:`);
  kpopSongs.forEach((s, i) => console.log(`  ${i+1}. [${s.title}] - ${s.artist} (Preview: ${!!s.previewUrl})`));

  console.log('\n--- Testing mega_all_stars ---');
  const allCat = CATEGORIES.find(c => c.id === 'mega_all_stars');
  if (!allCat) throw new Error('allCat not found');
  const allSongs = await getSongsForGame(allCat, 5);
  console.log(`Got ${allSongs.length} All-Stars mega songs:`);
  allSongs.forEach((s, i) => console.log(`  ${i+1}. [${s.title}] - ${s.artist} (Preview: ${!!s.previewUrl})`));
}

verify().catch(console.error);
