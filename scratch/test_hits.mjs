import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

// Parse artists
const blockRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?region:\s*['"]([^'"]+)['"][\s\S]*?hitsHint:\s*['"]([^'"]+)['"][\s\S]*?storefront:\s*['"]([^'"]+)['"]\s*\}/g;

let count = 0;
let totalHits = 0;
let match;
const artistSongsMap = {};

while ((match = blockRegex.exec(content)) !== null) {
  count++;
  const name = match[2];
  const region = match[3];
  const hits = match[4].split(',').map(s => s.trim()).filter(Boolean);
  totalHits += hits.length;
  artistSongsMap[name.toLowerCase()] = { name, region, hits };
}

console.log('Artists parsed:', count);
console.log('Total hit song titles in hitsHint:', totalHits);
console.log('Sample Bodyslam hits:', artistSongsMap['bodyslam']);
console.log('Sample Taylor Swift hits:', artistSongsMap['taylor swift']);
