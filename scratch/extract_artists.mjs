import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

const artists = [];
// Match any object block inside GLOBAL_ARTISTS
const blockRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?storefront:\s*['"]([^'"]+)['"]\s*\}/g;

let match;
while ((match = blockRegex.exec(content)) !== null) {
  const block = match[0];
  const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
  const regionMatch = block.match(/region:\s*['"]([^'"]+)['"]/);
  const genreMatch = block.match(/genreLabel:\s*['"]([^'"]+)['"]/);
  if (nameMatch && regionMatch) {
    artists.push({
      id: match[1],
      name: nameMatch[1],
      region: regionMatch[1],
      genre: genreMatch ? genreMatch[1] : ''
    });
  }
}

const thai = artists.filter(a => a.region === 'thai');
const inter = artists.filter(a => a.region === 'inter');

console.log('Total artists parsed:', artists.length);
console.log('Thai count:', thai.length);
console.log('Inter count:', inter.length);

fs.writeFileSync('scratch/existing_artists_summary.json', JSON.stringify({
  thaiNames: thai.map(a => a.name.toLowerCase()),
  interNames: inter.map(a => a.name.toLowerCase()),
  thaiList: thai.map(a => `${a.name} (${a.genre})`),
  interList: inter.map(a => `${a.name} (${a.genre})`)
}, null, 2));
