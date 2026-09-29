const guess = "we don't talk anymore";
const target = "We Don\u2019t Talk Anymore"; // iTunes trackName

const oldNorm = (str) =>
  str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\s\-_.,!?'"()[\]{}【】]/g, '')
    .trim();

console.log('oldNorm guess :', oldNorm(guess));
console.log('oldNorm target:', oldNorm(target));
console.log('Old match?    :', oldNorm(guess) === oldNorm(target));

// Comprehensive normalizer handling ALL unicode apostrophes, quotes, and punctuation
const newNorm = (str) =>
  str
    .toLowerCase()
    .replace(/มั้ย|มั๊ย/g, 'ไหม')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035']/g, '') // all apostrophes
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB"]/g, '') // all quotation marks
    .replace(/[\s\-_.,!?'"()[\]{}【】:;+&~/\\#@*^|]/g, '') // all punctuation & symbols
    .trim();

console.log('newNorm guess :', newNorm(guess));
console.log('newNorm target:', newNorm(target));
console.log('New match?    :', newNorm(guess) === newNorm(target));
