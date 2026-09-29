import fs from 'fs';

const dbBlacklist = new Set(JSON.parse(fs.readFileSync('scratch/existing_names.json', 'utf8')));

// Load previous proposed list names
const prevText = fs.readFileSync('scratch/previous_proposed_list.txt', 'utf8');
const prevNamesRegex = /\d+\.\s+\*\*([^*]+)\*\*/g;
let pm;
const prevProposedSet = new Set();
while ((pm = prevNamesRegex.exec(prevText)) !== null) {
  const raw = pm[1].trim();
  prevProposedSet.add(raw.toLowerCase());
  // Also clean parentheses if any e.g. "Lula (ลุลา)" -> "lula", "ลุลา"
  const cleanParts = raw.split(/[\(\)\/]/).map(s => s.trim().toLowerCase()).filter(Boolean);
  cleanParts.forEach(p => prevProposedSet.add(p));
}

console.log('Total previous proposed names:', prevProposedSet.size);

// Candidate pool
const candidates = [
  // 🇹🇭 ศิลปินไทย
  {
    num: 1,
    name: 'HYBS',
    region: 'thai',
    category: 'อินดี้ป็อป / สากลไทยโกอินเตอร์',
    hits: 'Ride, Dancing with my phone, Tip Toe, Killer'
  },
  {
    num: 2,
    name: 'Phum Viphurit (ภูมิ วิภูริศ)',
    checkNames: ['Phum Viphurit', 'ภูมิ วิภูริศ'],
    region: 'thai',
    category: 'นีโอโซล / อินดี้ป็อปขวัญใจโลก',
    hits: 'Lover Boy, Hello Anxiety, Long Gone, Strangers In A Dream'
  },
  {
    num: 3,
    name: 'Zweed n\' Roll',
    region: 'thai',
    category: 'อัลเทอร์เนทีฟร็อก / อินดี้เศร้าดำดิ่ง',
    hits: 'ช่วงเวลา, อยู่คนเดียว, อาจเป็นเพราะฉัน, Diary'
  },
  {
    num: 4,
    name: 'ส้ม มารี (Zom Marie)',
    checkNames: ['Zom Marie', 'ส้ม มารี'],
    region: 'thai',
    category: 'ป็อปใสซึ้งกินใจ',
    hits: 'หรือฉันคิดไปเอง, รางวัลปลอบใจ, กอดในใจ, วันที่เธอไม่อยู่'
  },
  {
    num: 5,
    name: 'นิว จิ๋ว (New Jiew)',
    checkNames: ['New Jiew', 'นิว จิ๋ว'],
    region: 'thai',
    category: 'ดีว่าดูโอ้พลังเสียงทรงพลัง',
    hits: 'คนเจ้าน้ำตา, ไม่รักไม่ต้อง, รอแล้วได้อะไร, ทำไมต้องเธอ'
  },
  {
    num: 6,
    name: 'ตู่ ภพธร (Two Popetorn)',
    checkNames: ['Two Popetorn', 'ตู่ ภพธร'],
    region: 'thai',
    category: 'R&B / เพลงรักโรแมนติก',
    hits: 'โปรดอย่ามาสงสาร, พูดทำไม, ถ้าเธอไป, แต่ยังคิดถึง'
  },
  {
    num: 7,
    name: 'บอย โกสิยพงษ์ (Boyd Kosiyabong)',
    checkNames: ['Boyd Kosiyabong', 'บอย โกสิยพงษ์'],
    region: 'thai',
    category: 'ตำนานเพลงรัก & เบเกอรี่มิวสิค',
    hits: 'ฤดูที่แตกต่าง, ช่วงที่ดีที่สุด, ใคร, ลมหายใจ'
  },
  {
    num: 8,
    name: 'พลพล พลกองเส็ง',
    checkNames: ['พลพล', 'พลพล พลกองเส็ง'],
    region: 'thai',
    category: 'ป็อปอบอุ่นขวัญใจมหาชน',
    hits: 'คนไม่สำคัญ, ตาแดงแดง, คนเดินถนน, ชั่วฟ้าดินสลาย'
  },
  {
    num: 9,
    name: 'กัน นภัทร (Gun Napat)',
    checkNames: ['Gun Napat', 'กัน นภัทร'],
    region: 'thai',
    category: 'ป็อปบัลลาดสุดไพเราะ',
    hits: 'ระยะทำใจ, ข้างๆ หัวใจ, หนึ่งในพันล้าน, หวังดีประสงค์รัก'
  },
  {
    num: 10,
    name: 'แก้ม วิชญาณี (Gam Wichayanee)',
    checkNames: ['Gam Wichayanee', 'แก้ม วิชญาณี'],
    region: 'thai',
    category: 'ดีว่าสาวพลังเสียงอันดับหนึ่ง',
    hits: 'ความผูกพัน (ซื้อความรักไม่ได้), มหันตภัย, ถ้าลืมเธอจะเป็นไร'
  },
  {
    num: 11,
    name: 'โรส ศิรินทิพย์',
    checkNames: ['โรส ศิรินทิพย์'],
    region: 'thai',
    category: 'เสียงร้องซึ้งอบอุ่นหัวใจ',
    hits: 'มากกว่ารัก, ก้อนหินก้อนนั้น, ปีใหม่ใหม่, เธอทำให้ฉันคิดถึงแต่เธอ'
  },
  {
    num: 12,
    name: 'ALLY (แอลลี่)',
    checkNames: ['ALLY', 'แอลลี่'],
    region: 'thai',
    category: 'T-POP ไอดอลสาวคลื่นลูกใหม่',
    hits: 'How To Love, Boys Like You, Passcode, Make It Hot'
  },
  {
    num: 13,
    name: 'มิว ศุภศิษฏ์ (Mew Suppasit)',
    checkNames: ['Mew Suppasit', 'มิว ศุภศิษฏ์'],
    region: 'thai',
    category: 'ป็อป & T-POP ศิลปินขวัญใจอินเตอร์',
    hits: 'Season of You, Nan Na, Good Day, Forever Love'
  },
  {
    num: 14,
    name: 'พลอยชมพู (Jannine Weigel)',
    checkNames: ['Jannine Weigel', 'พลอยชมพู'],
    region: 'thai',
    category: 'ทีนป็อปใสซึ้ง',
    hits: 'ชักดิ้นชักงอ, ปลิว (Away), เธอเดินเข้ามา, อาจเป็นเพราะ'
  },
  {
    num: 15,
    name: 'Instinct (อินสติงต์)',
    checkNames: ['Instinct', 'อินสติงต์'],
    region: 'thai',
    category: 'ป็อปร็อกฮิตติดหูตลอดกาล',
    hits: 'โปรดส่งใครมารักฉันที, เกิดมาแค่รักกัน, นับถอยหลัง, ขอคู่ล่วงหน้า'
  },
  {
    num: 16,
    name: 'Pancake (แพนเค้ก)',
    checkNames: ['Pancake', 'แพนเค้ก'],
    region: 'thai',
    category: 'ป็อปร็อกขวัญใจวัยรุ่น 2000s',
    hits: 'ก๋วยเตี๋ยวหน้าใสกับนายหน้าซื่อ, ใจเย็น, ขาดใจ, จริงใจไม่จริงจัง'
  },
  {
    num: 17,
    name: 'Black Vanilla',
    region: 'thai',
    category: 'ป็อปร็อก & ทีนไอดอล RS ยุค 2000s',
    hits: 'จีบฉันที, เธอยัง, เจ้าชู้, Re-start, ปฏิเสธไม่เป็น'
  },
  {
    num: 18,
    name: 'เล้าโลม (Lao Lom)',
    checkNames: ['เล้าโลม', 'Lao Lom'],
    region: 'thai',
    category: 'ป็อปร็อกวัยรุ่นสุดเจ็บปวด',
    hits: 'หยุดได้ไหม, เพื่อนกับแฟนแทนกันไม่ได้, รักแท้แพ้ไม่รัก, โจ๊ะ'
  },
  {
    num: 19,
    name: 'The Richman Toy',
    region: 'thai',
    category: 'โมเดิร์นวินเทจ & ร็อกสุดกวน',
    hits: 'อ๊อด อ๊อด, แต่งงานกันเด้อ, ม้าป่า, ทุ่งดอกไม้บาน, ธิดาประจำอำเภอ'
  },
  {
    num: 20,
    name: 'Slur (สเลอ)',
    checkNames: ['Slur', 'สเลอ'],
    region: 'thai',
    category: 'อินดี้ร็อก / โพสต์พังก์สุดแนว',
    hits: 'หรือ, ไม่แน่นอน, โรคจิต, เซอ, เธอทั้งนั้น'
  },
  {
    num: 21,
    name: 'Gym and Swim',
    region: 'thai',
    category: 'ทรอปิคอลอินดี้ป็อปโกอินเตอร์',
    hits: 'Octopussy, Sunrise, Yuuwahuu, Surfing Baby'
  },
  {
    num: 22,
    name: 'H 3 F',
    region: 'thai',
    category: 'ไซเคเดลิกโซล / ฟังค์สุดเท่',
    hits: 'How Can I, It\'s OK, Just Sayin\', City Lights'
  },
  {
    num: 23,
    name: 'Thaitanium (ไทยเทเนี่ยม)',
    checkNames: ['Thaitanium', 'ไทยเทเนี่ยม'],
    region: 'thai',
    category: 'ตำนานฮิปฮอปแถวหน้าของเมืองไทย',
    hits: 'ทะลึ่ง, ยักไหล่, สุดขอบฟ้า, หลุดพ้น, ไม่ไหวแล้ว'
  },
  {
    num: 24,
    name: 'GAVIN:D (กวินท์ ดูวาล)',
    checkNames: ['GAVIN:D', 'Gavin D', 'กวินท์'],
    region: 'thai',
    category: 'ป็อปฮิปฮอป & R&B ยอดวิวร้อยล้าน',
    hits: 'A rocket to the moon, รักได้ป่าว, เกาะสวาทหาดสวรรค์, โคตรบ่อย'
  },
  {
    num: 25,
    name: 'FIIXD',
    region: 'thai',
    category: 'แทร็ปฮิปฮอปเพลงรักโดนใจวัยรุ่น',
    hits: 'แฟนใหม่หน้าคุ้น, ยิ้ม, แลก, แฟนพันธุ์แท้'
  },
  {
    num: 26,
    name: 'AUTTA (อัตตา)',
    checkNames: ['AUTTA', 'อัตตา'],
    region: 'thai',
    category: 'แร็ปเปอร์อัจฉริยะ & ไรห์มลึกซึ้ง',
    hits: 'ชายหน้าม้า, 안녕, ว่างยัง, เวนิส, เป็นเธอได้ไหม'
  },
  {
    num: 27,
    name: 'ก๊อท จักรพันธ์',
    checkNames: ['ก๊อท จักรพันธ์', 'Got Jakraphun'],
    region: 'thai',
    category: 'เจ้าชายลูกทุ่งตลอดกาล',
    hits: 'สมหวังนะครับ, ต้องมีสักวัน, ใจสารภาพ, สามสิบยังแจ๋ว'
  },
  {
    num: 28,
    name: 'ฮาย อาภาพร นครสวรรค์',
    checkNames: ['ฮาย อาภาพร', 'อาภาพร นครสวรรค์'],
    region: 'thai',
    category: 'ตัวแม่ลูกทุ่งสายแดนซ์ & สนุกสนาน',
    hits: 'เชพบ๊ะ, อารมณ์เสีย, น้องนอนไม่หลับ, เลิกแล้วค่ะ'
  },
  {
    num: 29,
    name: 'ไมค์ ภิรมย์พร',
    checkNames: ['ไมค์ ภิรมย์พร', 'Mike Piromporn'],
    region: 'thai',
    category: 'ขวัญใจคนใช้แรงงาน & บทเพลงสะท้อนชีวิต',
    hits: 'ยาใจคนจน, ละครชีวิต, เหนื่อยไหมคนดี, กลับคำสาหล่า'
  },
  {
    num: 30,
    name: 'ฝน ธนสุนทร',
    checkNames: ['ฝน ธนสุนทร', 'Fon Tanasoontorn'],
    region: 'thai',
    category: 'เจ้าหญิงลูกทุ่งเสียงหวานหยดย้อย',
    hits: 'ใจอ่อน, เรารอเขาลืม, ค่อยๆ ปล่อยมือ, แผลเป็นวันวาเลนไทน์'
  },

  // 🌎 ศิลปินสากล
  {
    num: 31,
    name: 'Whitney Houston',
    region: 'inter',
    category: 'The Voice ดีว่าพลังเสียงอมตะตลอดกาล',
    hits: 'I Will Always Love You, I Wanna Dance with Somebody, I Have Nothing, Greatest Love of All'
  },
  {
    num: 32,
    name: 'Mariah Carey',
    region: 'inter',
    category: 'Songbird Supreme ดีว่าเสียงหวีด 5 อ็อกเทฟ',
    hits: 'All I Want for Christmas Is You, Hero, We Belong Together, Without You, Emotions'
  },
  {
    num: 33,
    name: 'Celine Dion',
    region: 'inter',
    category: 'ตำนานเสียงทองแห่ง Titanic & ดีว่าระดับโลก',
    hits: 'My Heart Will Go On, Because You Loved Me, The Power of Love, All By Myself'
  },
  {
    num: 34,
    name: 'Elton John',
    region: 'inter',
    category: 'Rocket Man ตำนานเปียโนป็อปร็อกระดับโลก',
    hits: 'Rocket Man, Your Song, Can You Feel the Love Tonight, Cold Heart, Tiny Dancer'
  },
  {
    num: 35,
    name: 'ABBA',
    region: 'inter',
    category: 'วงป็อประดับตำนาน ผู้ให้กำเนิดบทเพลงอมตะ',
    hits: 'Dancing Queen, Mamma Mia, Gimme! Gimme! Gimme!, Waterloo, The Winner Takes It All'
  },
  {
    num: 36,
    name: 'Alicia Keys',
    region: 'inter',
    category: 'ราชินี R&B / Soul & เสียงเปียโนสะกดใจ',
    hits: 'If I Ain\'t Got You, Empire State of Mind, No One, Fallin\', Girl on Fire'
  },
  {
    num: 37,
    name: 'John Legend',
    region: 'inter',
    category: 'เจ้าพ่อเพลงรัก R&B & อะคูสติกสุดอบอุ่น',
    hits: 'All of Me, Ordinary People, Tonight (Best You Ever Had), Green Light'
  },
  {
    num: 38,
    name: 'Jason Mraz',
    region: 'inter',
    category: 'เจ้าพ่ออะคูสติกป็อปฟีลกู๊ดขวัญใจคนไทย',
    hits: 'I\'m Yours, Lucky, I Won\'t Give Up, Geek in the Pink, You and I Both'
  },
  {
    num: 39,
    name: 'Jack Johnson',
    region: 'inter',
    category: 'โฟล์กร็อก & อะคูสติกริมทะเลชิลล์สบาย',
    hits: 'Better Together, Banana Pancakes, Sitting Waiting Wishing, Upside Down'
  },
  {
    num: 40,
    name: 'Passenger',
    region: 'inter',
    category: 'โฟล์กป็อปเจ้าของเพลงรักยอดวิว 3.5 พันล้าน',
    hits: 'Let Her Go, Holes, The Wrong Direction, Simple Song'
  },
  {
    num: 41,
    name: 'James Blunt',
    region: 'inter',
    category: 'ป็อปบัลลาดสะเทือนอารมณ์',
    hits: 'You\'re Beautiful, Goodbye My Lover, 1973, Bonfire Heart'
  },
  {
    num: 42,
    name: 'Jessie J',
    region: 'inter',
    category: 'ดีว่าสาวเปี่ยมพลัง & เมโลดี้ติดหูมหาชน',
    hits: 'Price Tag, Flashlight, Domino, Bang Bang, Who You Are'
  },
  {
    num: 43,
    name: 'Kelly Clarkson',
    region: 'inter',
    category: 'แชมป์ American Idol & ป็อปร็อกพลังเสียงสะใจ',
    hits: 'Because of You, Stronger (What Doesn\'t Kill You), Since U Been Gone, Breakaway'
  },
  {
    num: 44,
    name: 'P!nk (Pink)',
    checkNames: ['P!nk', 'Pink'],
    region: 'inter',
    category: 'ป็อปร็อกสุดเท่ ตัวแม่สายเพอร์ฟอร์แมนซ์',
    hits: 'Just Give Me a Reason, What About Us, So What, Try, Raise Your Glass'
  },
  {
    num: 45,
    name: 'Westlife',
    region: 'inter',
    category: 'บอยแบนด์บัลลาดระดับตำนานขวัญใจคนไทย',
    hits: 'My Love, Fool Again, You Raise Me Up, Seasons in the Sun, If I Let You Go'
  },
  {
    num: 46,
    name: 'Boyz II Men',
    region: 'inter',
    category: 'ราชาประสานเสียง R&B ยุค 90s',
    hits: 'End of the Road, I\'ll Make Love to You, One Sweet Day, On Bended Knee'
  },
  {
    num: 47,
    name: '*NSYNC (NSYNC)',
    checkNames: ['*NSYNC', 'NSYNC'],
    region: 'inter',
    category: 'บอยแบนด์แดนซ์ป็อป 2000s ระดับตำนาน',
    hits: 'Bye Bye Bye, It\'s Gonna Be Me, This I Promise You, Tearin\' Up My Heart'
  },
  {
    num: 48,
    name: 'Spice Girls',
    region: 'inter',
    category: 'เกิร์ลกรุ๊ปอันดับ 1 ของโลก Girl Power ยุค 90s',
    hits: 'Wannabe, 2 Become 1, Stop, Say You\'ll Be There, Spice Up Your Life'
  },
  {
    num: 49,
    name: 'TLC',
    region: 'inter',
    category: 'เกิร์ลกรุ๊ป R&B ยอดขายสูงสุดตลอดกาล',
    hits: 'No Scrubs, Waterfalls, Creep, Unpretty'
  },
  {
    num: 50,
    name: 'Destiny\'s Child',
    region: 'inter',
    category: 'ทรีโอ้ R&B ตัวแม่ผู้ให้กำเนิด Beyoncé',
    hits: 'Say My Name, Survivor, Bootylicious, Bills Bills Bills'
  },
  {
    num: 51,
    name: 'The Goo Goo Dolls',
    region: 'inter',
    category: 'อัลเทอร์เนทีฟร็อกเจ้าของเพลงรักอันดับ 1 "Iris"',
    hits: 'Iris, Slide, Black Balloon, Name'
  },
  {
    num: 52,
    name: 'Simple Plan',
    region: 'inter',
    category: 'ป็อปพังก์ 2000s ขวัญใจวัยรุ่น',
    hits: 'Perfect, Welcome to My Life, I\'m Just a Kid, Summer Paradise'
  },
  {
    num: 53,
    name: 'The Fray',
    region: 'inter',
    category: 'เปียโนร็อกบัลลาดสุดลึกซึ้ง',
    hits: 'How to Save a Life, You Found Me, Over My Head (Cable Car), Never Say Never'
  },
  {
    num: 54,
    name: 'Glass Animals',
    region: 'inter',
    category: 'ไซเคเดลิกป็อปเจ้าของเพลงหมื่นล้านสตรีม',
    hits: 'Heat Waves, Gooey, Youth, Creatures in Heaven'
  },
  {
    num: 55,
    name: 'Foster the People',
    region: 'inter',
    category: 'อินดี้ป็อปเจ้าของเมโลดี้ผิวปากในตำนาน',
    hits: 'Pumped Up Kicks, Sit Next to Me, Houdini, Helena Beat'
  },
  {
    num: 56,
    name: 'Walk the Moon',
    region: 'inter',
    category: 'แดนซ์ร็อก & อินดี้ป็อปพลังบวก',
    hits: 'Shut Up and Dance, One Foot, Anna Sun'
  },
  {
    num: 57,
    name: 'DNCE',
    region: 'inter',
    category: 'ฟังก์ป็อปแดนซ์สุดมันส์โดย Joe Jonas',
    hits: 'Cake by the Ocean, Toothbrush, Body Moves, Kissing Strangers'
  },
  {
    num: 58,
    name: 'Tyla',
    region: 'inter',
    category: 'ป็อปแอฟโรบีทส์เจ้าของปรากฏการณ์โลก',
    hits: 'Water, Jump, Truth or Dare, ART'
  },
  {
    num: 59,
    name: 'Central Cee',
    region: 'inter',
    category: 'แร็ปเปอร์เบอร์ 1 สหราชอาณาจักรยุคใหม่',
    hits: 'Doja, Sprinter, Let Go, BAND4BAND'
  },
  {
    num: 60,
    name: 'Swedish House Mafia',
    region: 'inter',
    category: 'ทรีโอ้ EDM สวีดิชระดับตำนานเฟสติวัล',
    hits: 'Don\'t You Worry Child, Save the World, Moth to a Flame, Greyhound'
  }
];

let hasCollision = false;

candidates.forEach(c => {
  const namesToCheck = c.checkNames || [c.name];
  for (const name of namesToCheck) {
    const norm = name.toLowerCase().trim();
    if (dbBlacklist.has(norm)) {
      console.log(`[DB DUPLICATE] Candidate #${c.num} "${c.name}" matched DB: "${norm}"`);
      hasCollision = true;
    }
    if (prevProposedSet.has(norm)) {
      console.log(`[PREV PROPOSED DUPLICATE] Candidate #${c.num} "${c.name}" matched Prev Proposal: "${norm}"`);
      hasCollision = true;
    }
  }
});

if (!hasCollision) {
  console.log(`\n🎉 PERFECT! All ${candidates.length} candidates are 100% brand new, 0 duplicates with DB, and 0 duplicates with previous proposal!`);
}
