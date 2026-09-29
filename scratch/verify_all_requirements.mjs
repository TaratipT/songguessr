// Comprehensive verification of Speed Scoring & Thai/English Song Matching
import { normalizeText, isSongMatch } from '../src/services/itunesApi.ts';
import { getThaiTitleTranslation, getSongTitleAliases } from '../src/data/thaiSongTitleAliases.ts';

console.log('=== 1. TESTING SPEED SCORING GAP ===');
function calcScore(timeSpent, roundPoints = 100) {
  const basePoints = Math.round(roundPoints * 0.2);
  const maxBonus = Math.max(10, roundPoints - basePoints);
  const decayTime = Math.max(0, timeSpent - 0.8);
  const speedBonus = Math.round(maxBonus * Math.exp(-0.115 * decayTime));
  return Math.min(roundPoints, Math.max(basePoints, basePoints + speedBonus));
}

const speedTests = [
  { t1: 1.5, t2: 7.0, desc: '1.5s vs 7.0s (5.5s diff)' },
  { t1: 2.0, t2: 7.5, desc: '2.0s vs 7.5s (5.5s diff)' },
  { t1: 2.0, t2: 8.0, desc: '2.0s vs 8.0s (6.0s diff)' },
  { t1: 1.0, t2: 6.5, desc: '1.0s vs 6.5s (5.5s diff)' },
  { t1: 3.0, t2: 9.0, desc: '3.0s vs 9.0s (6.0s diff)' }
];

let scoringPass = true;
for (const test of speedTests) {
  const s1 = calcScore(test.t1);
  const s2 = calcScore(test.t2);
  const diff = s1 - s2;
  console.log(`${test.desc}: ${s1} pts vs ${s2} pts -> Difference: ${diff} pts`);
  if (diff < 28 || diff > 45) {
    console.error(`FAIL: Score difference ${diff} is outside expected range 28-45 pts`);
    scoringPass = false;
  }
}
console.log('Scoring test pass:', scoringPass);

console.log('\n=== 2. TESTING THAI / ENGLISH DUAL RECOGNITION & PARENTHESES ===');
const songCases = [
  {
    desc: 'UrboyTJ - Do You Mind',
    itunesTitle: 'Do You Mind',
    expectedDisplay: 'รังเกียจกันไหม (Do You Mind)',
    thaiGuess: 'รังเกียจกันไหม',
    engGuess: 'Do You Mind',
    fullGuess: 'รังเกียจกันไหม (Do You Mind)'
  },
  {
    desc: 'Bowkylion - Recall',
    itunesTitle: 'Recall',
    expectedDisplay: 'วาดไว้ (Recall)',
    thaiGuess: 'วาดไว้',
    engGuess: 'Recall',
    fullGuess: 'วาดไว้ (Recall)'
  },
  {
    desc: 'Tilly Birds - Just Being Friendly',
    itunesTitle: 'Just Being Friendly (feat. MILLI)',
    expectedDisplay: 'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)',
    thaiGuess: 'เพื่อนเล่น ไม่เล่นเพื่อน',
    engGuess: 'Just Being Friendly',
    fullGuess: 'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)'
  },
  {
    desc: 'NONT TANONT - Melt',
    itunesTitle: 'Melt',
    expectedDisplay: 'โต๊ะริม (Melt)',
    thaiGuess: 'โต๊ะริม',
    engGuess: 'Melt',
    fullGuess: 'โต๊ะริม (Melt)'
  },
  {
    desc: 'Jeff Satur - Fade',
    itunesTitle: 'Fade',
    expectedDisplay: 'ลืมไปแล้วว่าลืมยังไง (Fade)',
    thaiGuess: 'ลืมไปแล้วว่าลืมยังไง',
    engGuess: 'Fade',
    fullGuess: 'ลืมไปแล้วว่าลืมยังไง (Fade)'
  },
  {
    desc: 'Paper Planes - Bad Boy',
    itunesTitle: 'Bad Boy',
    expectedDisplay: 'ทรงอย่างแบด (Bad Boy)',
    thaiGuess: 'ทรงอย่างแบด',
    engGuess: 'Bad Boy',
    fullGuess: 'ทรงอย่างแบด (Bad Boy)'
  },
  {
    desc: 'Fellow Fellow - Halley\'s Comet',
    itunesTitle: 'ดาวหางฮัลเลย์',
    expectedDisplay: 'ดาวหางฮัลเลย์ (Halley\'s Comet)',
    thaiGuess: 'ดาวหางฮัลเลย์',
    engGuess: "Halley's Comet",
    fullGuess: "ดาวหางฮัลเลย์ (Halley's Comet)"
  },
  {
    desc: 'Three Man Down - Rain',
    itunesTitle: 'ฝนตกไหม',
    expectedDisplay: 'ฝนตกไหม (Rain)',
    thaiGuess: 'ฝนตกไหม',
    engGuess: 'Rain',
    fullGuess: 'ฝนตกไหม (Rain)'
  }
];

let matchPass = true;
for (const sc of songCases) {
  const song = {
    id: 'test',
    title: sc.expectedDisplay,
    artist: 'Test Artist',
    album: 'Test',
    year: 2023,
    genre: 'Pop',
    previewUrl: 'https://test',
    lyricsHint: 'Hint',
    firstCharHint: 'T'
  };

  const thaiMatch = isSongMatch(sc.thaiGuess, song);
  const engMatch = isSongMatch(sc.engGuess, song);
  const fullMatch = isSongMatch(sc.fullGuess, song);

  // Also test if target was raw itunesTitle
  const rawSong = { ...song, title: sc.itunesTitle };
  const rawThaiMatch = isSongMatch(sc.thaiGuess, rawSong);
  const rawEngMatch = isSongMatch(sc.engGuess, rawSong);

  console.log(`[${sc.desc}] Display: "${sc.expectedDisplay}"`);
  console.log(`  - Thai guess "${sc.thaiGuess}": ${thaiMatch ? '✅ MATCH' : '❌ FAIL'}`);
  console.log(`  - Eng guess "${sc.engGuess}": ${engMatch ? '✅ MATCH' : '❌ FAIL'}`);
  console.log(`  - Full guess "${sc.fullGuess}": ${fullMatch ? '✅ MATCH' : '❌ FAIL'}`);
  console.log(`  - Raw title "${sc.itunesTitle}" + Thai guess: ${rawThaiMatch ? '✅ MATCH' : '❌ FAIL'}`);
  console.log(`  - Raw title "${sc.itunesTitle}" + Eng guess: ${rawEngMatch ? '✅ MATCH' : '❌ FAIL'}`);

  if (!thaiMatch || !engMatch || !fullMatch || !rawThaiMatch || !rawEngMatch) {
    matchPass = false;
  }
}

console.log('\nAll tests passed successfully:', scoringPass && matchPass);
