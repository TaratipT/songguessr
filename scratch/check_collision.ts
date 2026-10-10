import { THAI_SONG_TRANSLATION_RULES } from '../src/data/thaiSongTitleAliases';
import { NEW_RULES } from './prepare_new_rules';

const existingKeys = new Set(Object.keys(THAI_SONG_TRANSLATION_RULES));
for (const [key, rule] of Object.entries(NEW_RULES)) {
  if (existingKeys.has(key)) {
    console.log(`COLLISION key="${key}": Existing:`, THAI_SONG_TRANSLATION_RULES[key], `New:`, rule);
  }
}
console.log('Collision check finished.');
