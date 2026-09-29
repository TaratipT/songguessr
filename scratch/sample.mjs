import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/existing_artists_summary.json', 'utf8'));
const thaiSet = new Set(data.thaiNames);
const interSet = new Set(data.interNames);

console.log('Thai sample:', data.thaiList.slice(0, 30));
console.log('Inter sample:', data.interList.slice(0, 30));
