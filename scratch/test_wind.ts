import { cleanSongTitle, isSongMatch } from '../src/services/itunesApi';
import { getThaiTitleTranslation } from '../src/data/thaiSongTitleAliases';

const title = cleanSongTitle('The Wind', 'Safeplanet');
console.log('Cleaned title:', title);

const song = {
  id: 'test',
  title,
  artist: 'Safeplanet',
  album: '',
  year: 2020,
  genre: 'Indie',
  previewUrl: '',
  lyricsHint: '',
  firstCharHint: ''
};

console.log('Match พริบตา:', isSongMatch('พริบตา', song));
console.log('Match The Wind:', isSongMatch('The Wind', song));
console.log('Match the wind:', isSongMatch('the wind', song));
