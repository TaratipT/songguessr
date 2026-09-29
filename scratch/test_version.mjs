export function stripVersionSuffix(title) {
  if (!title) return '';
  let s = title;
  s = s
    .replace(/\s*\([^)]*?(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live|Session|Edit|Demo|Instrumental|Sped Up|Slowed)[^)]*?\)/gi, '')
    .replace(/\s*\[[^\]]*?(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live|Session|Edit|Demo|Instrumental|Sped Up|Slowed)[^\]]*?\]/gi, '');
  s = s.replace(/\s*[-–—/]\s*.*?(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live|Session|Edit|Demo|Instrumental|Sped Up|Slowed).*$/gi, '');
  s = s.replace(/\s+(?:[A-Za-z0-9'\s\u0E00-\u0E7F]+)?\s*(?:Version|Ver\.|เวอร์ชั่น|เวอร์ชัน|Remix|Mix|Acoustic|Live)$/gi, '');
  const trimmed = s.trim();
  return trimmed.length > 0 ? trimmed : title.trim();
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

const target1 = 'รักติดไซเรน Midnight Version';
const guess1 = 'รักติดไซเรน';
const strippedTarget = stripVersionSuffix(target1);
const cleanGuess = normalizeText(stripVersionSuffix(guess1));
const cleanStrippedTarget = normalizeText(strippedTarget);

console.log('Match?', cleanGuess === cleanStrippedTarget);
console.log('Stripped Target:', strippedTarget);
console.log('Clean Guess:', cleanGuess);
console.log('Clean Stripped Target:', cleanStrippedTarget);
