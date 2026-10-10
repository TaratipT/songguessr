import * as fs from 'fs';

const fileContent = fs.readFileSync('src/data/thaiSongTitleAliases.ts', 'utf8');

const startMarker = 'export const THAI_SONG_BIDIRECTIONAL_ALIASES: Record<string, string[]> = {';
const endMarker = '};\n\n/**\n * Normalizes text for alias key lookup';

const startIdx = fileContent.indexOf(startMarker);
const endIdx = fileContent.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  throw new Error(`Markers not found: start=${startIdx}, end=${endIdx}`);
}

const before = fileContent.slice(0, startIdx + startMarker.length);
const biContent = fileContent.slice(startIdx + startMarker.length, endIdx);
const after = fileContent.slice(endIdx);

// Parse the entries in biContent
// Each entry looks like: 'key': ['alias1', 'alias2'], or "key": ...
const lines = biContent.split('\n');
const map: Record<string, Set<string>> = {};

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('//')) continue;
  
  // match 'key': [...]
  const match = trimmed.match(/^['"]([^'"]+)['"]\s*:\s*\[(.*)\]/);
  if (match) {
    const key = match[1];
    const aliasesPart = match[2];
    const aliases = aliasesPart.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    
    if (!map[key]) {
      map[key] = new Set();
    }
    for (const a of aliases) {
      map[key].add(a);
    }
  }
}

// Format clean deduplicated biContent
let formatted = '\n';
for (const [key, aliasesSet] of Object.entries(map)) {
  const aliasesArr = Array.from(aliasesSet);
  formatted += `  ${JSON.stringify(key)}: ${JSON.stringify(aliasesArr)},\n`;
}

const newFileContent = before + formatted + after;
fs.writeFileSync('src/data/thaiSongTitleAliases.ts', newFileContent, 'utf8');
console.log('Deduplicated THAI_SONG_BIDIRECTIONAL_ALIASES successfully. Total keys:', Object.keys(map).length);
