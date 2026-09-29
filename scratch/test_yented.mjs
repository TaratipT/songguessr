import { getThaiTitleTranslation } from '../src/data/thaiSongTitleAliases.ts';
import { isSongMatch } from '../src/services/itunesApi.ts';

const cases = [
  {
    target: "Adore",
    guesses: ["หินหยดลงน้ำ", "adore", "หินหยดลงน้ำ (Adore)", "หินหยดลงน้ำ (adore)"]
  }
];

let allPass = true;
for (const c of cases) {
  const song = {
    id: 'test',
    title: c.target,
    artist: 'Yented',
    album: 'Album',
    year: 2023,
    genre: 'Pop',
    previewUrl: 'http://test',
    lyricsHint: '',
    firstCharHint: ''
  };
  console.log('Testing target:', c.target, '-> translated to:', getThaiTitleTranslation(c.target));
  for (const g of c.guesses) {
    const matchRaw = isSongMatch(g, song);
    const matchTranslated = isSongMatch(g, { ...song, title: getThaiTitleTranslation(c.target) || song.title });
    console.log(`  Guess "${g}": raw=${matchRaw}, translated=${matchTranslated}`);
    if (!matchRaw || !matchTranslated) allPass = false;
  }
}
console.log('All guesses matched successfully:', allPass);
