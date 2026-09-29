import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const idMatches = content.match(/id:\s*'[^']+'/g) || [];
console.log('Total artist entries in artistsData.ts:', idMatches.length);

const ids = idMatches.map(m => m.replace(/id:\s*'/, '').replace(/'/, ''));
const uniqueIds = new Set(ids);
console.log('Unique IDs:', uniqueIds.size);
if (ids.length !== uniqueIds.size) {
  console.log('DUPLICATE IDS FOUND!');
  const counts = {};
  ids.forEach(id => counts[id] = (counts[id] || 0) + 1);
  Object.entries(counts).filter(([_, c]) => c > 1).forEach(([id, c]) => console.log(`Duplicate: ${id} (${c} times)`));
} else {
  console.log('NO DUPLICATE IDs - Database integrity verified!');
}
