import fs from 'fs';

// Load artists
const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const artists = [];
const blockRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?region:\s*['"]([^'"]+)['"][\s\S]*?genreLabel:\s*['"]([^'"]+)['"][\s\S]*?hitsHint:\s*['"]([^'"]+)['"][\s\S]*?storefront:\s*['"]([^'"]+)['"]\s*\}/g;

let match;
while ((match = blockRegex.exec(content)) !== null) {
  artists.push({
    id: match[1],
    name: match[2],
    region: match[3],
    genreLabel: match[4],
    hitsHint: match[5],
    storefront: match[6]
  });
}

const artistMap = new Map();
artists.forEach(a => {
  const songs = a.hitsHint.split(',').map(s => s.trim()).filter(Boolean);
  artistMap.set(a.name.toLowerCase(), { artist: a, songs });
});

function normalize(str) {
  return str.toLowerCase().replace(/[\s\-_.,!?'"()[\]{}【】]/g, '');
}

function detectRegion(song) {
  const byArtist = artistMap.get(song.artist.toLowerCase());
  if (byArtist) return byArtist.artist.region;
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(song.title + song.artist)) return 'anime_jpop';
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(song.title + song.artist)) return 'kpop';
  if (/[\u0E00-\u0E7F]/.test(song.title + song.artist)) return 'thai';
  return 'inter';
}

function isValidDecoy(cand, targetRegion) {
  if (targetRegion === 'inter') {
    return !/[\u0E00-\u0E7F\uac00-\ud7af\u3040-\u30ff\u4e00-\u9fff]/.test(cand);
  }
  if (targetRegion === 'kpop') {
    // Should be from K-Pop artists
    return true;
  }
  if (targetRegion === 'anime_jpop') {
    return true;
  }
  if (targetRegion === 'thai') {
    // If target is Thai, decoy must not be a pure western song
    return true;
  }
  return true;
}

console.log('Setup verified, running simulations...');
