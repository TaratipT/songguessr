import { cleanSongTitle, isSongMatch } from '../src/services/itunesApi';
import { getSongTitleAliases, getThaiTitleTranslation } from '../src/data/thaiSongTitleAliases';

interface TestCase {
  artist: string;
  rawItunesTitle: string;
  expectedCanonical: string;
  guesses: string[];
}

const testCases: TestCase[] = [
  {
    artist: 'Safeplanet',
    rawItunesTitle: 'The Wind',
    expectedCanonical: 'พริบตา (The Wind)',
    guesses: ['พริบตา', 'the wind', 'The Wind', 'พริบตา (The Wind)']
  },
  {
    artist: 'Safeplanet',
    rawItunesTitle: 'The End',
    expectedCanonical: 'ปล่อยมือ (The End)',
    guesses: ['ปล่อยมือ', 'the end', 'The End']
  },
  {
    artist: 'Jeff Satur',
    rawItunesTitle: 'Fade',
    expectedCanonical: 'ลืมไปแล้วว่าลืมยังไง (Fade)',
    guesses: ['fade', 'Fade', 'ลืมไปแล้วว่าลืมยังไง', 'ลืมไปแล้วหรือยัง']
  },
  {
    artist: 'Jeff Satur',
    rawItunesTitle: 'Hide',
    expectedCanonical: 'แค่เงา (Hide)',
    guesses: ['hide', 'Hide', 'แค่เงา']
  },
  {
    artist: 'Jeff Satur',
    rawItunesTitle: "Why Don't You Stay",
    expectedCanonical: "แค่เธอ (Why Don't You Stay)",
    guesses: ["why don't you stay", 'why dont you stay', 'แค่เธอ']
  },
  {
    artist: 'PROXIE',
    rawItunesTitle: 'Silent Mode',
    expectedCanonical: 'คนไม่คุย (Silent Mode)',
    guesses: ['คนไม่คุย', 'silent mode', 'Silent Mode']
  },
  {
    artist: 'PROXIE',
    rawItunesTitle: 'Crazy Love',
    expectedCanonical: 'รักบ้าบอ (Crazy Love)',
    guesses: ['รักบ้าบอ', 'crazy love', 'Crazy Love']
  },
  {
    artist: 'PROXIE',
    rawItunesTitle: 'STOP!',
    expectedCanonical: 'ตบปาก (STOP!)',
    guesses: ['ตบปาก', 'stop', 'STOP!']
  },
  {
    artist: 'PROXIE',
    rawItunesTitle: 'TRAFFIC',
    expectedCanonical: 'ใจกระตุก (TRAFFIC)',
    guesses: ['ใจกระตุก', 'traffic', 'TRAFFIC']
  },
  {
    artist: 'PiXXiE',
    rawItunesTitle: 'Whatever',
    expectedCanonical: 'ไม่ได้ก็ไม่เอา (Whatever)',
    guesses: ['ไม่ได้ก็ไม่เอา', 'whatever', 'Whatever']
  },
  {
    artist: 'bamm',
    rawItunesTitle: 'Curse',
    expectedCanonical: 'ฉันจะฉาปเธอ (Curse)',
    guesses: ['ฉันจะฉาปเธอ', 'ฉันจะสาปเธอ', 'curse', 'Curse']
  },
  {
    artist: 'bamm',
    rawItunesTitle: "Sad O'Clock",
    expectedCanonical: "ปล่อยจอย (Sad O'Clock)",
    guesses: ['ปล่อยจอย', "sad o'clock", 'sad oclock']
  },
  {
    artist: 'loserpop',
    rawItunesTitle: 'Once',
    expectedCanonical: 'อีกครั้ง (once)',
    guesses: ['อีกครั้ง', 'once', 'Once']
  },
  {
    artist: 'loserpop',
    rawItunesTitle: 'Good Old Days',
    expectedCanonical: 'วันเก่า (good old days)',
    guesses: ['วันเก่า', 'good old days', 'Good Old Days']
  },
  {
    artist: 'loserpop',
    rawItunesTitle: 'Still',
    expectedCanonical: 'ยังรอ (still)',
    guesses: ['ยังรอ', 'still', 'Still']
  },
  {
    artist: 'Scrubb',
    rawItunesTitle: 'Inchan Tree',
    expectedCanonical: 'ต้นไม้ (Inchan Tree)',
    guesses: ['ต้นไม้', 'inchan tree']
  },
  {
    artist: 'Scrubb',
    rawItunesTitle: 'Surfing',
    expectedCanonical: 'รอยยิ้ม (Surfing)',
    guesses: ['รอยยิ้ม', 'surfing']
  },
  {
    artist: 'Scrubb',
    rawItunesTitle: 'Everyday',
    expectedCanonical: 'ทุกวัน (Everyday)',
    guesses: ['ทุกวัน', 'everyday']
  },
  {
    artist: 'Bodyslam',
    rawItunesTitle: 'Sticker',
    expectedCanonical: 'สติ๊กเกอร์ (Sticker)',
    guesses: ['สติ๊กเกอร์', 'sticker']
  },
  {
    artist: 'Palmy',
    rawItunesTitle: 'Tick Tock',
    expectedCanonical: 'ติ๊กต๊อก (Tick Tock)',
    guesses: ['ติ๊กต๊อก', 'tick tock']
  },
  {
    artist: 'Billkin',
    rawItunesTitle: 'A Beautiful Ride',
    expectedCanonical: 'การเดินทางที่สวยงาม (A Beautiful Ride)',
    guesses: ['การเดินทางที่สวยงาม', 'a beautiful ride']
  },
  {
    artist: 'PP Krit',
    rawItunesTitle: 'Hesitate',
    expectedCanonical: 'ลังเล (Hesitate)',
    guesses: ['ลังเล', 'hesitate']
  },
  {
    artist: 'Zom Marie',
    rawItunesTitle: 'Bubble',
    expectedCanonical: 'โลกอีกใบ (Bubble)',
    guesses: ['โลกอีกใบ', 'bubble']
  },
  {
    artist: 'Silly Fools',
    rawItunesTitle: 'Fung Jum Jom',
    expectedCanonical: 'ฝัง จำ จม (Fung Jum Jom)',
    guesses: ['ฝัง จำ จม', 'ฝังจำจม', 'fung jum jom']
  },
  {
    artist: 'D2B',
    rawItunesTitle: 'C.I.A. (Khon Chai)',
    expectedCanonical: 'C.I.A. (ค้นใจ)',
    guesses: ['ค้นใจ', 'c.i.a.', 'cia khon chai']
  }
];

let failed = 0;
for (const tc of testCases) {
  const cleaned = cleanSongTitle(tc.rawItunesTitle, tc.artist);
  const okClean = cleaned === tc.expectedCanonical;
  if (!okClean) {
    console.error(`❌ cleanSongTitle mismatch for ${tc.artist} - ${tc.rawItunesTitle}: expected "${tc.expectedCanonical}", got "${cleaned}"`);
    failed++;
  } else {
    console.log(`✅ cleanSongTitle "${tc.artist} - ${tc.rawItunesTitle}" -> "${cleaned}"`);
  }

  // Construct song target as it appears in game
  const song = {
    id: 'test',
    title: cleaned,
    artist: tc.artist,
    album: '',
    year: 2022,
    genre: 'Thai Pop',
    previewUrl: '',
    lyricsHint: '',
    firstCharHint: ''
  };

  for (const g of tc.guesses) {
    const matched = isSongMatch(g, song);
    if (!matched) {
      console.error(`   ❌ isSongMatch failed for guess "${g}" on song "${song.title}" (${song.artist})`);
      failed++;
    } else {
      console.log(`   ✅ guess "${g}" matched!`);
    }
  }
}

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100% MATCH!');
} else {
  console.error(`\n❌ Failed ${failed} test(s)!`);
  process.exit(1);
}
