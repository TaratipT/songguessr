const fs = require('fs');
const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

// Parse GLOBAL_ARTISTS
const artists = [];
const artistRegex = /{\s*id:\s*'([^']+)',\s*name:\s*(['"][^'"]+['"]),\s*region:\s*'([^']+)',\s*regionLabel:\s*'([^']+)',\s*genreLabel:\s*(['"][^'"]+['"])/g;

let match;
while ((match = artistRegex.exec(content)) !== null) {
  const name = match[2].slice(1, -1);
  const region = match[3];
  const genre = match[5].slice(1, -1);
  artists.push({ id: match[1], name, region, genre });
}

const thai = artists.filter(a => a.region === 'thai');
const inter = artists.filter(a => a.region === 'inter');

console.log('Parsed Thai artists:', thai.length);
console.log('Parsed Inter artists:', inter.length);

fs.writeFileSync('scratch/existing_artists_summary.json', JSON.stringify({
  thai: thai.map(a => `${a.name} (${a.genre})`),
  inter: inter.map(a => `${a.name} (${a.genre})`)
}, null, 2));
