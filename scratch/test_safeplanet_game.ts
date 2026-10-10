import { getSongsForCustomArtist, isSongMatch } from '../src/services/itunesApi';

async function test() {
  const songs = await getSongsForCustomArtist('Safeplanet', 20);
  console.log('Fetched Safeplanet songs:');
  for (const s of songs) {
    console.log(`- title: "${s.title}", artist: "${s.artist}"`);
    if (s.title.toLowerCase().includes('wind')) {
      console.log('  Testing isSongMatch for this song:');
      console.log('    guess "พริบตา":', isSongMatch('พริบตา', s));
      console.log('    guess "the wind":', isSongMatch('the wind', s));
      console.log('    guess "พริบตา (the wind)":', isSongMatch('พริบตา (the wind)', s));
    }
  }
}

test();
