import fs from 'fs';

function cleanKey(str) {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035']/g, '')
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB"]/g, '')
    .replace(/[\s\-_.,!?'"()[\]{}【】:;+&~/\\#@*^|•…$?]/g, '')
    .trim();
}

function normalizeText(str) {
  return str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035']/g, '')
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB"]/g, '')
    .replace(/[\s\-_.,!?'"()[\]{}【】:;+&~/\\#@*^|•…$]/g, '')
    .trim();
}

function testMatch(userGuess, targetSong) {
  const strippedGuess = userGuess
    .replace(/\s*\(feat\..*?\)/gi, '')
    .replace(/\s*\(ft\..*?\)/gi, '')
    .replace(/\s*\(with.*?\)/gi, '');

  const cleanGuess = normalizeText(strippedGuess);
  const cleanTarget = normalizeText(targetSong.title);

  console.log('cleanGuess:', cleanGuess);
  console.log('cleanTarget:', cleanTarget);

  if (!cleanGuess) return false;
  if (cleanGuess === cleanTarget) {
    console.log('Matched: direct equal');
    return true;
  }

  // 4. Check main part before any parentheses
  const mainPart = targetSong.title.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
  const cleanMainPart = normalizeText(mainPart);
  if (cleanGuess === cleanMainPart) {
    console.log('Matched: step 4 mainPart');
    return true;
  }

  // 8. Check if title has alternative in brackets
  const words = targetSong.title.split(/[\s(/)【】]+/).map(normalizeText).filter((w) => w.length >= 3);
  if (words.includes(cleanGuess)) {
    console.log('Matched: step 8 words');
    return true;
  }

  // 9. Fuzzy check: target contains guess or vice versa if sufficiently long
  if (cleanGuess.length >= 4 && (cleanTarget.includes(cleanGuess) || cleanGuess.includes(cleanTarget))) {
    console.log('Matched: step 9 cleanGuess.length >= 4');
    return true;
  }
  if (cleanMainPart.length >= 4 && (cleanMainPart.includes(cleanGuess) || cleanGuess.includes(cleanMainPart))) {
    console.log('Matched: step 9 cleanMainPart.length >= 4');
    return true;
  }

  return false;
}

console.log('Testing "I" vs "I Want It That Way":', testMatch('I', { title: 'I Want It That Way', artist: 'Backstreet Boys' }));
