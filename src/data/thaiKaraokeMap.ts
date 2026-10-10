/**
 * Map of known romanized / karaoke Thai song titles (as uploaded by certain labels on iTunes)
 * to their proper Thai script song titles.
 */
export const THAI_KARAOKE_TITLE_MAP: Record<string, string> = {
  // Season Five
  'mua kuen': 'เมื่อคืน',
  'yang ngai kor dai pai': 'ยังไงก็ได้ไป',
  'gub kon gao tur tum bab nee rue plao': 'กับคนเก่าเธอทำแบบนี้หรือเปล่า',
  'jai tem': 'ใจเต็ม',

  // The Parkinson
  'pood la sak kum': 'พูดลาสักคำ',

  // Silly Fools
  'jong reak tur wa nang pha ya': 'จงเรียกเธอว่านางพญา',
  'thep lee la': 'เทพลีลา',

  // NONT TANONT
  'mai sa nit': 'ไม่สนิท',
  'feun tua ayng mai pen': 'ฝืนตัวเองไม่เป็น',
  'feun tua eng mai pen': 'ฝืนตัวเองไม่เป็น',
  'mi phon tor hua jai': 'มีผลต่อหัวใจ',
  'mee phon tor hua jai': 'มีผลต่อหัวใจ',
  'kwam rak kum lung kor tua': 'ความรักกำลังก่อตัว',
  'meun kam la': 'หมื่นคำลา',
  'kam tam jak khon kao': 'คำถามจากคนเก่า',
  'kam tam jak khon kao shouldnt ask': 'คำถามจากคนเก่า',

  // เขียนไขและวานิช
  'kaem nong nang': 'แก้มน้องนางนั้นแดงกว่าใคร',
  'kaem nong nang nan daeng kwa khrai': 'แก้มน้องนางนั้นแดงกว่าใคร',

  // themoonwillalwaysbewithme
  'zulu paka tapahey': 'ซูลูปาก้า ตาปาเฮ้',
  'zulupakatapahey': 'ซูลูปาก้า ตาปาเฮ้',

  // Anatomy Rabbit
  'tapha': 'ตาฟา',
  'young yaow': 'ยังเยาว์',
  'nittayasan': 'นิตยสาร',

  // YOUNGOHM
  'thararat': 'ธารารัตน์',
  'sai nam peung': 'สายน้ำผึ้ง',
  'me tung': 'มีตังค์',

  // MILLI
  'saa tuu': 'สาธุ',
  'saa-tuu': 'สาธุ',
  'sood gon': 'สุดก่อน',

  // Getsunova
  'eek krang': 'อีกครั้ง',

  // ก้อง ห้วยไร่
  'ba ra mee hang wang nam yen': 'บารมีแห่งวังน้ำเย็น',

  // Lipta
  'tuk krub': 'ทักครับ',

  // Txrbo
  'kem dai ngai': 'เข้มได้ไง',
  'kem dai ngai game': 'เข้มได้ไง',

  // Bell Warisara
  'haam jai mai yoo': 'ห้ามใจไม่อยู่',
  'me jai gor pai gun': 'มีใจก็ไปกัน',

  // D2B
  'cia khon chai': 'C.I.A. (ค้นใจ)',
  'cia': 'C.I.A. (ค้นใจ)',

  // K-OTIC & Faye Fang Kaew
  'faen khon nueng your girl': 'แฟนคนนึง (Your Girl)',
  'faen khon nueng': 'แฟนคนนึง',
  'dai tung nun everything for you': 'ได้ทั้งนั้น',
  'dai tung nun': 'ได้ทั้งนั้น',

  // 3.2.1
  'job t ter': 'จบมั้ย (ไปถามเขาก่อน)',

  // Carabao / Pongsit Kampee / Pause
  'duen pen': 'เดือนเพ็ญ',
  'kor thod': 'ขอโทษ',
  'na tee kong kwam rak': 'หน้าที่ของความรัก',
  'na tee kong kwam rak mission': 'หน้าที่ของความรัก',

  // Other classic hits on iTunes
  'ting wai klang thang': 'ทิ้งไว้กลางทาง',
  'ting wai klaang thang': 'ทิ้งไว้กลางทาง',
  'som sarn': 'ซมซาน',
  'jai sung ma': 'ใจสั่งมา',
  'kham yin dee': 'คำยินดี',
  'khao gun dee': 'เข้ากันดี',
  'krai jeb kwa': 'ใครเจ็บกว่า',
  'plae pen': 'แผลเป็น',
  'aow hai tai': 'เอาให้ตาย',
  'doo ngoh ngoh': 'ดูโง่ๆ',
  'bork sak kum': 'บอกสักคำ',
  'bok sak kum': 'บอกสักคำ',
  'mai tong roo wa rao kob gun bab nai': 'ไม่ต้องรู้ว่าเราคบกันแบบไหน',
  'mai tong roo wa rao kob gun baeb nai': 'ไม่ต้องรู้ว่าเราคบกันแบบไหน',
  'pah jed nah': 'ผ้าเช็ดหน้า',
  'rak tid siren': 'รักติดไซเรน',
  'ruk tid siren': 'รักติดไซเรน',
  'kid mak': 'คิดมาก',
  'yak rong hai tae mai mee nam tah': 'อยากร้องไห้แต่ไม่มีน้ำตา',
  'khon mai mee hua jai': 'คนไม่มีหัวใจ',
  'kon mai mee hua jai': 'คนไม่มีหัวใจ'
};

// Thai romanization syllables / tokens
const THAI_PHONETIC_SYLLABLES = new Set([
  'mua', 'meua', 'kuen', 'yang', 'ngai', 'kor', 'gor', 'dai', 'pai', 'gub', 'kub',
  'kon', 'khon', 'gao', 'kao', 'tur', 'ter', 'tum', 'thum', 'bab', 'bap', 'baeb',
  'nee', 'rue', 'reu', 'plao', 'plaw', 'pood', 'sak', 'kum', 'kham', 'kam',
  'jong', 'reak', 'pha', 'ya', 'thep', 'lee', 'la', 'rak', 'ruk', 'charn',
  'mai', 'roo', 'hua', 'jai', 'cheewit', 'khwam', 'kwam', 'suk', 'rai',
  'krub', 'krap', 'thuk', 'took', 'wan', 'tee', 'kue', 'kid', 'thung', 'sing',
  'lao', 'prung', 'yoo', 'yuu', 'laew', 'krai', 'jeb', 'kwa', 'tah', 'tha',
  'jing', 'klang', 'klaang', 'thang', 'roop', 'sao', 'diao', 'nan', 'choom', 'saeng',
  'sut', 'thai', 'khob', 'khun', 'bork', 'bok', 'feun', 'ayng', 'eng',
  'tor', 'haam', 'som', 'sarn', 'sung', 'chan', 'chun', 'khao', 'gun',
  'aow', 'ngoh', 'kob', 'pah', 'jed', 'nah', 'tid', 'tam', 'rok', 'duen',
  'pen', 'thod', 'tae', 'nam'
]);

const ENGLISH_HOMOPHONES = new Set(['la', 'mai', 'lee', 'wan', 'nan', 'sing', 'pen']);

/**
 * Translate a romanized karaoke title to proper Thai script if it's in our mapping.
 */
export function translateKaraokeTitle(cleanTitle: string): string {
  // If already contains Thai characters, nothing to translate
  if (/[\u0E00-\u0E7F]/.test(cleanTitle)) {
    return cleanTitle;
  }

  const norm = cleanTitle.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (THAI_KARAOKE_TITLE_MAP[norm]) {
    return THAI_KARAOKE_TITLE_MAP[norm];
  }

  // Check without parenthesis/bracket notes e.g. "(feat. ...)", "[Game]"
  const noParen = cleanTitle
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (THAI_KARAOKE_TITLE_MAP[noParen]) {
    return THAI_KARAOKE_TITLE_MAP[noParen];
  }

  // Check matching prefix
  for (const [karaoke, thai] of Object.entries(THAI_KARAOKE_TITLE_MAP)) {
    if (norm === karaoke || norm.startsWith(karaoke + ' ') || noParen === karaoke) {
      return thai;
    }
  }

  return cleanTitle;
}

/**
 * Detect whether an ASCII/English title is actually Thai romanized karaoke.
 */
export function isRomanizedThaiKaraoke(title: string): boolean {
  // If title has Thai, Japanese, Korean characters, it's not Romanized Thai karaoke
  if (/[\u0E00-\u0E7F\u3040-\u30ff\uac00-\ud7af]/.test(title)) {
    return false;
  }

  const words = title
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  if (words.length === 0) return false;

  let matchCount = 0;
  for (const w of words) {
    if (THAI_PHONETIC_SYLLABLES.has(w)) {
      matchCount++;
    }
  }

  // 1-2 words: must have at least 1 non-English Thai phonetic match
  if (words.length <= 2 && matchCount >= 1) {
    const nonEnglishMatches = words.filter((w) => THAI_PHONETIC_SYLLABLES.has(w) && !ENGLISH_HOMOPHONES.has(w));
    if (nonEnglishMatches.length > 0) return true;
  }

  // 3+ words: must have at least 2 Thai phonetic syllables
  return matchCount >= 2;
}

/**
 * Get all possible romanized aliases for a Thai title (used for answer matching).
 */
export function getKaraokeAliases(thaiTitle: string): string[] {
  const normThai = thaiTitle.trim().toLowerCase();
  const aliases: string[] = [];

  for (const [karaoke, thai] of Object.entries(THAI_KARAOKE_TITLE_MAP)) {
    if (thai.toLowerCase() === normThai) {
      aliases.push(karaoke);
    }
  }

  return aliases;
}
