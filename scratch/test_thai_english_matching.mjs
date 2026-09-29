function cleanKey(str) {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\s\-_.,!?'"()[\]{}【】?]/g, '')
    .trim();
}

function normalizeText(str) {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\s\-_.,!?'"()[\]{}【】]/g, '')
    .trim();
}

const MAP = {
  'just being friendly': 'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)',
  'city': 'ข้างกัน (City)',
  'recall': 'วาดไว้ (Recall)',
  'melt': 'โต๊ะริม (Melt)',
  'bad boy': 'ทรงอย่างแบด (Bad Boy)',
  'ghost': 'ซ่อน(ไม่)หา (Ghost)',
  'silent mode': 'คนไม่คุย (Silent Mode)',
  'cinderella': 'ขาหมู (Cinderella)',
  'hide and seek': 'ซ่อนหา (Hide and Seek)',
  'eyes on me': 'สายตาหลอกกันไม่ได้ (Eyes On Me)',
  'glad': 'ดีใจด้วยนะ (Glad)',
  'halleys comet': 'ดาวหางฮัลเลย์ (Halley\'s Comet)',
  'unreachable': 'คู่ชีวิต (Unreachable)',
  'dumb': 'คนที่ถูกรัก (Dumb)'
};

function getThaiTitleTranslation(cleanTitle) {
  if (!cleanTitle) return undefined;
  const key = cleanKey(cleanTitle);
  if (!key) return undefined;

  for (const [k, v] of Object.entries(MAP)) {
    const kKey = cleanKey(k);
    if (kKey === key) return v;

    const thaiPart = v.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
    if (cleanKey(thaiPart) === key) return v;

    const parenMatches = v.match(/\((.*?)\)/g);
    if (parenMatches) {
      for (const pm of parenMatches) {
        const inner = pm.replace(/[()]/g, '').trim();
        if (cleanKey(inner) === key) return v;
      }
    }

    if (cleanKey(v) === key) return v;
  }

  const hasParen = cleanTitle.match(/^(.*?)\((.*?)\)$/);
  if (hasParen) {
    const outer = hasParen[1].trim();
    const inner = hasParen[2].trim();
    const isOuterThai = /[\u0E00-\u0E7F]/.test(outer);
    const isInnerThai = /[\u0E00-\u0E7F]/.test(inner);
    if (!isOuterThai && isInnerThai) {
      return `${inner} (${outer})`;
    }
  }

  return undefined;
}

function getSongTitleAliases(title) {
  const aliases = new Set();
  const canonical = getThaiTitleTranslation(title);
  if (canonical) {
    aliases.add(canonical);
    const thaiPart = canonical.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
    if (thaiPart) aliases.add(thaiPart);
    const parenMatches = canonical.match(/\((.*?)\)/g);
    if (parenMatches) {
      for (const pm of parenMatches) {
        const inner = pm.replace(/[()]/g, '').trim();
        if (inner) aliases.add(inner);
      }
    }
  }

  const selfThaiPart = title.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
  if (selfThaiPart) aliases.add(selfThaiPart);
  const selfParenMatches = title.match(/\((.*?)\)/g);
  if (selfParenMatches) {
    for (const pm of selfParenMatches) {
      const inner = pm.replace(/[()]/g, '').trim();
      if (inner) aliases.add(inner);
    }
  }

  return Array.from(aliases);
}

function isSongMatch(userGuess, targetTitle) {
  const cleanGuess = normalizeText(userGuess);
  const cleanTarget = normalizeText(targetTitle);

  if (!cleanGuess) return false;
  if (cleanGuess === cleanTarget) return true;

  const targetAliases = getSongTitleAliases(targetTitle);
  for (const a of targetAliases) {
    if (cleanGuess === normalizeText(a)) return true;
  }

  const guessAliases = getSongTitleAliases(userGuess);
  for (const a of guessAliases) {
    if (normalizeText(a) === cleanTarget) return true;
  }

  const mainPart = targetTitle.replace(/\(.*?\)/g, '').trim();
  if (cleanGuess === normalizeText(mainPart)) return true;

  const parenMatches = targetTitle.match(/\((.*?)\)/g);
  if (parenMatches) {
    for (const pm of parenMatches) {
      const inner = pm.replace(/[()]/g, '').trim();
      if (cleanGuess === normalizeText(inner)) return true;
    }
  }

  return false;
}

// Tests:
console.log('--- Test Canonical Translations ---');
console.log('From English "Just Being Friendly" ->', getThaiTitleTranslation('Just Being Friendly'));
console.log('From Thai "เพื่อนเล่น ไม่เล่นเพื่อน" ->', getThaiTitleTranslation('เพื่อนเล่น ไม่เล่นเพื่อน'));
console.log('From English "Bad Boy" ->', getThaiTitleTranslation('Bad Boy'));
console.log('From Thai "ทรงอย่างแบด" ->', getThaiTitleTranslation('ทรงอย่างแบด'));
console.log('From English outer "Ghost (ซ่อน(ไม่)หา)" ->', getThaiTitleTranslation('Ghost (ซ่อน(ไม่)หา)'));

console.log('\n--- Test Match Cases ---');
const target = 'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)';

const testGuesses = [
  'เพื่อนเล่น ไม่เล่นเพื่อน',
  'เพื่อนเล่นไม่เล่นเพื่อน',
  'Just Being Friendly',
  'just being friendly',
  'justbeingfriendly',
  'เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)',
  'เพื่อนเล่น ไม่เล่นเพื่อน (feat. MILLI)',
  'เพลงอื่นที่ไม่ใช่'
];

for (const g of testGuesses) {
  console.log(`Guess: "${g}" -> Match? ${isSongMatch(g, target)}`);
}

console.log('\n--- Test Target in pure English ("Bad Boy") ---');
console.log('Guess "ทรงอย่างแบด" on "Bad Boy":', isSongMatch('ทรงอย่างแบด', 'Bad Boy'));
console.log('Guess "Bad Boy" on "Bad Boy":', isSongMatch('Bad Boy', 'Bad Boy'));

console.log('\n--- Test Target in pure Thai ("วาดไว้") ---');
console.log('Guess "Recall" on "วาดไว้":', isSongMatch('Recall', 'วาดไว้'));
console.log('Guess "วาดไว้" on "วาดไว้":', isSongMatch('วาดไว้', 'วาดไว้'));
