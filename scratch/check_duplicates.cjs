const fs = require('fs');
const content = fs.readFileSync('./src/data/thaiSongTitleAliases.ts', 'utf8');

const mapMatch = content.match(/export const THAI_SONG_TRANSLATION_RULES: Record<string, ThaiSongTranslationRule> = {([\s\S]*?)};\r?\n/);
if (mapMatch) {
  const lines = mapMatch[1].split('\n');
  const seen = new Map();
  lines.forEach((line, idx) => {
    const m = line.match(/^\s*['"]([^'"]+)['"]\s*:/);
    if (m) {
      const k = m[1].toLowerCase();
      if (seen.has(k)) {
        console.log('Duplicate in TRANSLATION_RULES:', k, 'at line', idx + 1, 'earlier line:', seen.get(k));
      } else {
        seen.set(k, idx + 1);
      }
    }
  });
}

const aliasMatch = content.match(/export const THAI_SONG_BIDIRECTIONAL_ALIASES: Record<string, string\[\]> = {([\s\S]*?)};\r?\n/);
if (aliasMatch) {
  const lines = aliasMatch[1].split('\n');
  const seen = new Map();
  lines.forEach((line, idx) => {
    const m = line.match(/^\s*['"]([^'"]+)['"]\s*:/);
    if (m) {
      const k = m[1].toLowerCase();
      if (seen.has(k)) {
        console.log('Duplicate in BIDIRECTIONAL_ALIASES:', k, 'at line', idx + 1, 'earlier line:', seen.get(k));
      } else {
        seen.set(k, idx + 1);
      }
    }
  });
}

console.log('Duplicates check completed!');
