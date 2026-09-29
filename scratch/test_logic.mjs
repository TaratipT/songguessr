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

console.log('Loaded artists:', artists.length);

// Let's test a scenario:
// Game has 5 songs:
// 1. Taylor Swift - "Cruel Summer" (inter)
// 2. Bodyslam - "แสงสุดท้าย" (thai rock)
// 3. NewJeans - "Ditto" (kpop)
// 4. Jeff Satur - "ลืมไปแล้วว่าลืมยังไง" (thai pop)
// 5. Olivia Rodrigo - "vampire" (inter)
const matchPlaylist = [
  { title: 'Cruel Summer', artist: 'Taylor Swift' },
  { title: 'แสงสุดท้าย', artist: 'Bodyslam' },
  { title: 'Ditto', artist: 'NewJeans' },
  { title: 'ลืมไปแล้วว่าลืมยังไง', artist: 'Jeff Satur' },
  { title: 'vampire', artist: 'Olivia Rodrigo' }
];

console.log('Match playlist:', matchPlaylist.map(s => s.title));
