import { cleanSongTitle } from '../src/services/itunesApi';

async function main() {
  const res = await fetch('https://itunes.apple.com/search?term=Safeplanet&country=TH&entity=song&limit=200');
  const data = await res.json();
  for (const item of data.results) {
    if (item.artistName && item.artistName.toLowerCase().includes('safeplanet')) {
      const cleaned = cleanSongTitle(item.trackName, item.artistName);
      console.log(`[RAW] "${item.trackName}" -> [CLEAN] "${cleaned}"`);
    }
  }
}

main();
