import { cleanSongTitle, isSongMatch } from '../src/services/itunesApi';

const newTestCases = [
  {
    artist: '4EVE',
    rawTitle: 'TEST ME',
    expectedCanonical: 'วัดปะหล่ะ? (TEST ME)',
    guesses: ['วัดปะหล่ะ', 'วัดป่ะหล่ะ', 'test me', 'Test Me', 'วัดปะหล่ะ? (TEST ME)']
  },
  {
    artist: 'PiXXiE',
    rawTitle: 'Too Cute',
    expectedCanonical: 'เกินต้าน (Too Cute)',
    guesses: ['เกินต้าน', 'too cute', 'Too Cute']
  },
  {
    artist: 'Jeff Satur',
    rawTitle: 'Ghost',
    expectedCanonical: 'ซ่อน (ไม่) หา (Ghost)',
    guesses: ['ซ่อน (ไม่) หา', 'ซ่อนไม่หา', 'ghost', 'Ghost']
  },
  {
    artist: 'Anatomy Rabbit',
    rawTitle: 'Kab Rod Len',
    expectedCanonical: 'ขับรถเล่น (Kab Rod Len)',
    guesses: ['ขับรถเล่น', 'kab rod len', 'Kab Rod Len']
  },
  {
    artist: 'Anatomy Rabbit',
    rawTitle: 'Mars Loner',
    expectedCanonical: 'สภาวะเดียวดายบนดาวอังคาร (Mars Loner)',
    guesses: ['สภาวะเดียวดายบนดาวอังคาร', 'mars loner', 'Mars Loner']
  },
  {
    artist: 'YOUNGOHM',
    rawTitle: 'Cold Fire',
    expectedCanonical: 'ไฟเย็น (Cold Fire)',
    guesses: ['ไฟเย็น', 'cold fire', 'Cold Fire']
  },
  {
    artist: 'YOUNGOHM',
    rawTitle: 'Warm up a Curry',
    expectedCanonical: 'อุ่นแกง (Warm up a Curry)',
    guesses: ['อุ่นแกง', 'warm up a curry']
  },
  {
    artist: 'BUS',
    rawTitle: 'NO MATTER WHAT',
    expectedCanonical: 'แค่ไหนแค่นั้น (NO MATTER WHAT)',
    guesses: ['แค่ไหนแค่นั้น', 'no matter what']
  },
  {
    artist: 'Billkin',
    rawTitle: 'Skyline',
    expectedCanonical: 'กีดกัน (Skyline)',
    guesses: ['กีดกัน', 'skyline', 'Skyline']
  },
  {
    artist: 'Billkin',
    rawTitle: "Can't Translate",
    expectedCanonical: "แปลไม่ออก (Can't Translate)",
    guesses: ['แปลไม่ออก', "can't translate", 'cant translate']
  },
  {
    artist: 'PP Krit',
    rawTitle: 'Ooh!',
    expectedCanonical: 'เสนอตัว (Ooh!)',
    guesses: ['เสนอตัว', 'ooh', 'ooh!']
  },
  {
    artist: 'Ink Waruntorn',
    rawTitle: 'Insomnia',
    expectedCanonical: 'เหงา เหงา (Insomnia)',
    guesses: ['เหงา เหงา', 'เหงาเหงา', 'insomnia']
  },
  {
    artist: 'Ink Waruntorn',
    rawTitle: 'Glad',
    expectedCanonical: 'ดีใจด้วยนะ (Glad)',
    guesses: ['ดีใจด้วยนะ', 'glad']
  },
  {
    artist: 'Ink Waruntorn',
    rawTitle: "Eyes Don't Lie",
    expectedCanonical: "สายตาหลอกกันไม่ได้ (Eyes Don't Lie)",
    guesses: ['สายตาหลอกกันไม่ได้', "eyes don't lie", 'eyes dont lie']
  },
  {
    artist: 'POLYCAT',
    rawTitle: 'Forever Mate',
    expectedCanonical: 'เพื่อนไม่จริง (Forever Mate)',
    guesses: ['เพื่อนไม่จริง', 'forever mate']
  },
  {
    artist: 'POLYCAT',
    rawTitle: 'Alright',
    expectedCanonical: 'มันเป็นใคร (Alright)',
    guesses: ['มันเป็นใคร', 'alright']
  },
  {
    artist: 'PURPEECH',
    rawTitle: 'Alright',
    expectedCanonical: 'สบายดี (Alright)',
    guesses: ['สบายดี', 'alright']
  },
  {
    artist: 'BOWKYLION',
    rawTitle: 'Best Wishes',
    expectedCanonical: 'บานปลาย (best wishes)',
    guesses: ['บานปลาย', 'best wishes']
  },
  {
    artist: 'BOWKYLION',
    rawTitle: 'Recall',
    expectedCanonical: 'วาดไว้ (Recall)',
    guesses: ['วาดไว้', 'recall']
  },
  {
    artist: 'NONT TANONT',
    rawTitle: 'Melt',
    expectedCanonical: 'โต๊ะริม (Melt)',
    guesses: ['โต๊ะริม', 'melt']
  },
  {
    artist: 'NONT TANONT',
    rawTitle: 'Lean On',
    expectedCanonical: 'พิง (Lean On)',
    guesses: ['พิง', 'lean on']
  },
  {
    artist: 'NONT TANONT',
    rawTitle: 'White Flag',
    expectedCanonical: 'จำนน (White Flag)',
    guesses: ['จำนน', 'white flag']
  },
  {
    artist: 'Landokmai',
    rawTitle: 'White Flag',
    expectedCanonical: 'ยอม (White Flag)',
    guesses: ['ยอม', 'white flag']
  },
  {
    artist: 'Moderndog',
    rawTitle: 'Today, Last Year',
    expectedCanonical: 'วันนี้เมื่อปีก่อน (Today, Last Year)',
    guesses: ['วันนี้เมื่อปีก่อน', 'today last year']
  },
  {
    artist: 'Labanoon',
    rawTitle: 'Delivery',
    expectedCanonical: 'เดลิเวอรี่ (Delivery)',
    guesses: ['เดลิเวอรี่', 'delivery']
  }
];

let failed = 0;
for (const tc of newTestCases) {
  const cleaned = cleanSongTitle(tc.rawTitle, tc.artist);
  if (cleaned !== tc.expectedCanonical) {
    console.error(`❌ cleanSongTitle failed for ${tc.artist} - "${tc.rawTitle}". Got: "${cleaned}", Expected: "${tc.expectedCanonical}"`);
    failed++;
    continue;
  }
  console.log(`✅ cleanSongTitle "${tc.artist} - ${tc.rawTitle}" -> "${cleaned}"`);

  const songObj: any = {
    id: 'test_id',
    title: cleaned,
    artist: tc.artist
  };

  for (const g of tc.guesses) {
    const isOk = isSongMatch(g, songObj);
    if (!isOk) {
      console.error(`   ❌ guess "${g}" FAILED to match "${cleaned}" for artist "${tc.artist}"`);
      failed++;
    } else {
      console.log(`   ✅ guess "${g}" matched!`);
    }
  }
}

if (failed === 0) {
  console.log('\n🎉 ALL NEW EXPANDED TESTS PASSED PERFECTLY (100%)!');
} else {
  console.error(`\n❌ Total failures: ${failed}`);
  process.exit(1);
}
