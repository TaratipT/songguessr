import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

const blacklist = new Set();

// Extract id and name
const regex = /{\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = regex.exec(content)) !== null) {
  blacklist.add(m[1].toLowerCase().trim());
  blacklist.add(m[2].toLowerCase().trim());
}

// Extract aliases
const aliasRegex = /'([^']+)':\s*\[([^\]]+)\]/g;
while ((m = aliasRegex.exec(content)) !== null) {
  blacklist.add(m[1].toLowerCase().trim());
  const list = m[2].split(',').map(s => s.replace(/['"]/g, '').trim().toLowerCase());
  list.forEach(item => blacklist.add(item));
}

console.log('Total blacklisted names & aliases in DB:', blacklist.size);
fs.writeFileSync('scratch/updated_blacklist.json', JSON.stringify(Array.from(blacklist).sort(), null, 2));
