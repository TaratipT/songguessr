import { getThaiTitleTranslation } from '../src/data/thaiSongTitleAliases.ts';
import { isSongMatch } from '../src/services/itunesApi.ts';

const cases = [
  {
    target: "Halley's Comet",
    guesses: ["ดาวหางฮัลเลย์", "halley's comet", "halleys comet", "ดาวหางฮัลเลย์ (Halley's Comet)"]
  },
  {
    target: "I'm here",
    guesses: ["หนึ่งคนตรงนี้", "i'm here", "im here", "หนึ่งคนตรงนี้ (I'm here)"]
  },
  {
    target: "Extraordinary",
    guesses: ["ธรรมดาแสนพิเศษ", "extraordinary", "ขอให้โลกนี้ใจดีกับเธอ", "ธรรมดา แสนพิเศษ", "ธรรมดาแสนพิเศษ (Extraordinary)"]
  }
];

let allPass = true;
for (const c of cases) {
  const song = {
    id: 'test',
    title: c.target,
    artist: 'Artist',
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
    const matchTranslated = isSongMatch(g, { ...song, title: getThaiTitleTranslation(c.target) });
    console.log(`  Guess "${g}": raw=${matchRaw}, translated=${matchTranslated}`);
    if (!matchRaw || !matchTranslated) allPass = false;
  }
}
console.log('All guesses matched successfully:', allPass);
