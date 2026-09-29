import fs from 'fs';

// Read src/data/curatedSongs.ts
const content = fs.readFileSync('src/data/curatedSongs.ts', 'utf-8');

// Parse songs using regex
const songRegex = /{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)',[\s\S]*?previewUrl:\s*'([^']+)'/g;

const urlMap = new Map();
let count = 0;
let match;

while ((match = songRegex.exec(content)) !== null) {
  count++;
  const [_, id, title, artist, previewUrl] = match;
  if (!urlMap.has(previewUrl)) {
    urlMap.set(previewUrl, []);
  }
  urlMap.get(previewUrl).push({ id, title, artist });
}

console.log('Total parsed songs:', count);
console.log('Unique preview URLs:', urlMap.size);

let dupes = 0;
for (const [url, list] of urlMap.entries()) {
  if (list.length > 1) {
    dupes++;
    console.log(`\nDUPLICATE [${list.length} songs] URL: ${url}`);
    for (const s of list) {
      console.log(`  - [${s.id}] ${s.artist} - ${s.title}`);
    }
  }
}

if (dupes === 0) {
  console.log('\nNo duplicate URLs found!');
}
