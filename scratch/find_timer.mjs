import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('playing')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
