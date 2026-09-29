import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

// Extract all artist objects
const artistBlockRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*region:\s*['"]([^'"]+)['"]/g;
let m;
const existingArtists = [];
const existingNamesSet = new Set();

while ((m = artistBlockRegex.exec(content)) !== null) {
  existingArtists.push({ id: m[1], name: m[2], region: m[3] });
  existingNamesSet.add(m[2].toLowerCase().trim());
  existingNamesSet.add(m[1].toLowerCase().trim());
}

// Also parse aliases
const aliasRegex = /'([^']+)':\s*\[([^\]]+)\]/g;
while ((m = aliasRegex.exec(content)) !== null) {
  existingNamesSet.add(m[1].toLowerCase().trim());
  const aliases = m[2].split(',').map(s => s.replace(/['"]/g, '').trim().toLowerCase());
  aliases.forEach(a => existingNamesSet.add(a));
}

console.log('Total unique DB names & aliases in blacklist:', existingNamesSet.size);

fs.writeFileSync('scratch/existing_names.json', JSON.stringify(Array.from(existingNamesSet).sort(), null, 2));
