import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

// Match each artist block
const regex = /id:\s*'([^']+)',\s*name:\s*['"]([^'"]+)['"],\s*region:\s*'([^']+)'/g;
let m;
const list = [];
while ((m = regex.exec(content)) !== null) {
  list.push({ id: m[1], name: m[2], region: m[3] });
}

console.log('Total artists found:', list.length);
const byRegion = {};
list.forEach(a => {
  byRegion[a.region] = byRegion[a.region] || [];
  byRegion[a.region].push(a.name);
});

console.log('\n=== Inter Artists (' + (byRegion['inter']?.length || 0) + ') ===');
console.log(byRegion['inter']?.sort().join(', '));

console.log('\n=== Thai Artists (' + (byRegion['thai']?.length || 0) + ') ===');
console.log(byRegion['thai']?.sort().join(', '));

