import * as fs from 'fs';
import { NEW_RULES } from './prepare_new_rules';
import { THAI_SONG_TRANSLATION_RULES } from '../src/data/thaiSongTitleAliases';

// Let's merge existing rules and new rules into a unified dictionary
// Supporting single rule or array of rules when artists differ.
const merged: Record<string, any> = {};

// 1. Add existing rules
for (const [key, rule] of Object.entries(THAI_SONG_TRANSLATION_RULES)) {
  merged[key] = rule;
}

// 2. Merge new rules
for (const [key, rule] of Object.entries(NEW_RULES)) {
  if (!merged[key]) {
    merged[key] = rule;
  } else {
    const existing = merged[key];
    const existingArr = Array.isArray(existing) ? existing : [existing];
    
    // Check if canonical is same
    const sameCanonicalIndex = existingArr.findIndex(
      (r: any) => r.canonical.toLowerCase() === rule.canonical.toLowerCase()
    );
    if (sameCanonicalIndex >= 0) {
      // Merge artists
      const existingArtists = existingArr[sameCanonicalIndex].artists || [];
      const newArtists = rule.artists || [];
      const combinedArtists = Array.from(new Set([...existingArtists, ...newArtists]));
      if (combinedArtists.length > 0) {
        existingArr[sameCanonicalIndex].artists = combinedArtists;
      }
      merged[key] = existingArr.length === 1 ? existingArr[0] : existingArr;
    } else {
      // Different canonical (different artist, same song title!)
      existingArr.push(rule);
      merged[key] = existingArr;
    }
  }
}

console.log('Total merged rule keys:', Object.keys(merged).length);
fs.writeFileSync('scratch/merged_rules.json', JSON.stringify(merged, null, 2), 'utf8');
console.log('Written to scratch/merged_rules.json');
