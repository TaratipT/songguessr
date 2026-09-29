import { getThaiTitleTranslation, cleanKey } from '../src/data/thaiSongTitleAliases.ts';
import { isSongMatch, normalizeText } from '../src/services/itunesApi.ts';

console.log('=== TEST 1: We Don\'t Talk Anymore (Apostrophe Agnostic Matching) ===');
const charlieSong = {
  id: 'charlie_1',
  title: 'We Don\u2019t Talk Anymore', // iTunes title with curly \u2019
  artist: 'Charlie Puth',
  album: 'Nine Track Mind',
  year: 2016,
  genre: 'Pop',
  previewUrl: 'http://test',
  lyricsHint: '',
  firstCharHint: ''
};

const charlieGuesses = [
  "we don't talk anymore",
  "We Don't Talk Anymore",
  "we dont talk anymore",
  "WE DON'T TALK ANYMORE",
  "We Don`t Talk Anymore"
];

for (const g of charlieGuesses) {
  const match = isSongMatch(g, charlieSong);
  console.log(`Guess: "${g}" -> ${match ? '✅ MATCH' : '❌ FAIL'}`);
  if (!match) throw new Error(`Failed to match "${g}" with target "${charlieSong.title}"`);
}

console.log('\n=== TEST 2: CYANIDE - Let You Go (ยอม..ปล่อย) ===');
const cyanideSong = {
  id: 'cyanide_1',
  title: 'Let You Go',
  artist: 'CYANIDE',
  album: 'Single',
  year: 2018,
  genre: 'Hip-Hop/Rap',
  previewUrl: 'http://test',
  lyricsHint: '',
  firstCharHint: ''
};

const cyanideTranslated = getThaiTitleTranslation(cyanideSong.title);
console.log('CYANIDE Translation:', cyanideTranslated);
if (cyanideTranslated !== 'ยอม..ปล่อย (Let You Go)') {
  throw new Error(`Unexpected translation: ${cyanideTranslated}`);
}

const cyanideGuesses = [
  "ยอม..ปล่อย",
  "ยอมปล่อย",
  "ยอม ปล่อย",
  "let you go",
  "Let You Go",
  "LET YOU GO",
  "ยอม..ปล่อย (Let You Go)",
  "ยอมปล่อย (Let You Go)"
];

for (const g of cyanideGuesses) {
  const matchRaw = isSongMatch(g, cyanideSong);
  const matchTrans = isSongMatch(g, { ...cyanideSong, title: cyanideTranslated });
  console.log(`Guess: "${g}" -> Raw=${matchRaw ? '✅' : '❌'}, Trans=${matchTrans ? '✅' : '❌'}`);
  if (!matchRaw || !matchTrans) throw new Error(`Failed on CYANIDE guess "${g}"`);
}

console.log('\n=== TEST 3: More Thai Songs With English Titles ===');
const thaiCases = [
  { raw: 'Morning', exp: 'เป็นไรไหม (Morning)', guesses: ['เป็นไรไหม', 'morning'] },
  { raw: 'Galaxy', exp: 'กาแลคซี่ (Galaxy)', guesses: ['กาแลคซี่', 'galaxy'] },
  { raw: 'Lavender', exp: 'ลาเวนเดอร์ (Lavender)', guesses: ['ลาเวนเดอร์', 'lavender'] },
  { raw: 'TUK KRUB', exp: 'ทักครับ (TUK KRUB)', guesses: ['ทักครับ', 'tuk krub', 'TUK KRUB'] },
  { raw: 'Undo', exp: 'ย้อนเวลา (Undo)', guesses: ['ย้อนเวลา', 'undo'] },
  { raw: 'On the Train', exp: 'บนรถไฟ (On the Train)', guesses: ['บนรถไฟ', 'on the train'] },
  { raw: 'MUTELU', exp: 'มูเตลู (MUTELU)', guesses: ['มูเตลู', 'mutelu'] },
  { raw: 'Too Cute', exp: 'เกินต้าน (Too Cute)', guesses: ['เกินต้าน', 'too cute'] }
];

for (const tc of thaiCases) {
  const tr = getThaiTitleTranslation(tc.raw);
  console.log(`[${tc.raw}] -> "${tr}"`);
  if (!tr) throw new Error(`Missing translation for ${tc.raw}`);
  const s = { id: 'x', title: tc.raw, artist: 'A', album: '', year: 2020, genre: 'Pop', previewUrl: '', lyricsHint: '', firstCharHint: '' };
  for (const g of tc.guesses) {
    const ok = isSongMatch(g, s) && isSongMatch(g, { ...s, title: tr });
    console.log(`   "${g}": ${ok ? '✅' : '❌'}`);
    if (!ok) throw new Error(`Failed to match "${g}" for ${tc.raw}`);
  }
}

console.log('\nAll tests passed with 100% success!');
