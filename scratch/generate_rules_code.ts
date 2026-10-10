import * as fs from 'fs';

const mergedRules = JSON.parse(fs.readFileSync('scratch/merged_rules.json', 'utf8'));

// Format mergedRules into typescript code
let rulesCode = 'export const THAI_SONG_TRANSLATION_RULES: Record<string, ThaiSongTranslationRule | ThaiSongTranslationRule[]> = {\n';

const keys = Object.keys(mergedRules).sort();
for (const k of keys) {
  const val = mergedRules[k];
  const keyStr = JSON.stringify(k);
  if (Array.isArray(val)) {
    const itemsStr = val.map(v => {
      let s = `{ canonical: ${JSON.stringify(v.canonical)}`;
      if (v.artists && v.artists.length > 0) {
        s += `, artists: ${JSON.stringify(v.artists)}`;
      }
      s += ` }`;
      return s;
    }).join(', ');
    rulesCode += `  ${keyStr}: [${itemsStr}],\n`;
  } else {
    let s = `{ canonical: ${JSON.stringify(val.canonical)}`;
    if (val.artists && val.artists.length > 0) {
      s += `, artists: ${JSON.stringify(val.artists)}`;
    }
    s += ` }`;
    rulesCode += `  ${keyStr}: ${s},\n`;
  }
}
rulesCode += '};\n';

fs.writeFileSync('scratch/rules_code.ts', rulesCode, 'utf8');
console.log('Formatted rules code written.');
