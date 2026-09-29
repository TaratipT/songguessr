import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

const blacklist = new Set();
const regex = /{\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = regex.exec(content)) !== null) {
  blacklist.add(m[1].toLowerCase().trim());
  blacklist.add(m[2].toLowerCase().trim());
}

const aliasRegex = /'([^']+)':\s*\[([^\]]+)\]/g;
while ((m = aliasRegex.exec(content)) !== null) {
  blacklist.add(m[1].toLowerCase().trim());
  const list = m[2].split(',').map(s => s.replace(/['"]/g, '').trim().toLowerCase());
  list.forEach(item => blacklist.add(item));
}

console.log('Total blacklisted names & aliases in DB:', blacklist.size);

const thaiCandidates = [
  // T-POP / ไอดอล & วงยุคใหม่
  { name: 'NuNew (นุนิว)', check: ['nunew', 'นุนิว'], hits: 'รักแท้ (True Love), หมอนอิง (Tie Me Up), ขึ้นใจ (Unforgettable), เอ๊ะ! (Eh!)', genre: 'T-POP / ป็อปบัลลาด' },
  { name: 'ALALA', check: ['alala', 'อาลาล่า'], hits: 'ร้องไห้ดังๆ (Not A Chance), ซึ้งอยู่, บังเอิญตั้งใจ, เสียใจไม่เสียดาย', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'MXFRUIT', check: ['mxfruit', 'มิกซ์ฟรุต'], hits: 'strawberry ice cream, ทำไมไม่ตอบ, มีใจก็ทัก, ทักครับ', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'VIIS', check: ['viis', 'วิส'], hits: 'Barbie (Oops! Oops!), Mirage, Don\'t Mind', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'QRRA', check: ['qrra', 'คิวร่า'], hits: 'Miracle, ไม่ง้อ', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'FLI:P', check: ['fli:p', 'flip'], hits: 'มองนานๆ (Look at me), สลัดสะบัด', genre: 'T-POP ไวรัลแดนซ์' },
  { name: 'DIDIxDADA', check: ['didixdada', 'didi x dada'], hits: 'เฟรนด์ขับ, จ้องตา', genre: 'T-POP ฝาแฝด' },
  { name: 'Wizzle', check: ['wizzle'], hits: 'อัศจรรย์, โชคดีที่มีเธอ', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'EMPRESS', check: ['empress'], hits: 'Bling Bling, ไฮโซ', genre: 'T-POP แดนซ์' },
  { name: 'ALLY (แอลลี่)', check: ['ally', 'แอลลี่'], hits: 'How To Love, Boys Like You, Passcode, Make It Hot', genre: 'T-POP ไอดอลเดี่ยว' },
  { name: 'มิว ศุภศิษฏ์ (Mew Suppasit)', check: ['mew suppasit', 'มิว ศุภศิษฏ์'], hits: 'Season of You, Nan Na, Good Day, Forever Love', genre: 'T-POP / ป็อป' },

  // วงอินดี้ / ป็อปร็อก / เบดรูมป็อปยุคใหม่
  { name: 'Clockwork Motionless', check: ['clockwork motionless'], hits: 'ถ้าวันนั้นฉันกอดเธอไว้, ปล่อยให้เวลา, ยิ้ม, ปล่อย', genre: 'อินดี้ร็อก / บัลลาด' },
  { name: 'Chilax', check: ['chilax'], hits: 'ฉันนี่แหละ...คนรักของเธอ, ขอแค่ยิ้ม, ผิดที่ฉัน, คุ้มมั้ย', genre: 'ป็อปร็อก' },
  { name: 'Earth Patravee (เอิ๊ต ภัทรวี)', check: ['earth patravee', 'เอิ๊ต ภัทรวี'], hits: 'หวง, ท้องฟ้า, มีไว้แค่เป็นของเธอเท่านั้น, SKY & SEA', genre: 'อินดี้ป็อป' },
  { name: 'mints', check: ['mints'], hits: 'ไม่ง่าย, ลืมไปแล้วหรือยัง, ตอนนี้เธออยู่ไหน, เก็บไว้ก่อน', genre: 'อินดี้ป็อป' },
  { name: 'Monica (โมนิก้า)', check: ['monica', 'โมนิก้า'], hits: 'อยากจะรู้, ฉันคือใคร, จินตนาการ, รักแท้', genre: 'อัลเทอร์เนทีฟป็อป' },
  { name: 'KIKI', check: ['kiki'], hits: 'Get Up, Back in the Game, Inside Out', genre: 'ซินธ์ป็อป / อินดี้อิเล็กทรอนิก' },
  { name: 'PanPan Yeeyee', check: ['panpan yeeyee', 'ปันปัน ยีย์ยีย์'], hits: 'สวัสดีค่ะ, น้องหมา, หมา, ถอดรหัส', genre: 'เบดรูมป็อป' },
  { name: 'Gym and Swim', check: ['gym and swim'], hits: 'Octopussy, Sunrise, Yuuwahuu, Surfing Baby', genre: 'ทรอปิคอลอินดี้ป็อป' },
  { name: 'H 3 F', check: ['h 3 f', 'h3f'], hits: 'How Can I, It\'s OK, Just Sayin\', City Lights', genre: 'ไซเคเดลิกโซล / ฟังค์' },

  // โฟล์ก / อะคูสติกฟีลกู๊ด
  { name: 't_047', check: ['t_047', 't047'], hits: 'รอสายรุ้ง, เพียงฤดู, หลังคา, กลับบ้าน', genre: 'โฟล์ก / เบดรูมป็อป' },
  { name: 'เขียนไขและวานิช', check: ['เขียนไขและวานิช', 'kienkai'], hits: 'แก้มน้องนางนั้นแดงกว่าใคร, หนีห่าง, ภาพถ่าย', genre: 'โฟล์กเพื่อชีวิตมินิมอล' },
  { name: 'คณะขวัญใจ', check: ['คณะขวัญใจ'], hits: 'ย้ายป่า, ฉันรักเธอ, ฟ้าครึ้ม', genre: 'โฟล์กเพื่อชีวิต' },
  { name: 'ไววิทย์', check: ['ไววิทย์'], hits: 'ศิลปินไส้แห้ง, กวีร้องไห้, ลืม', genre: 'เพื่อชีวิตร่วมสมัย' },

  // แร็ป / ฮิปฮอป / แทร็ป
  { name: 'JARVIS', check: ['jarvis', 'แจ๊ jarvis'], hits: 'ผมอะ... (Fuk U), น้ำแข็ง, เอารึยัง, ปิ้ว ปิ้ว', genre: 'ไวรัลฮิปฮอป' },
  { name: 'GUYGEEGEE', check: ['guygeegee', 'กายจีจี'], hits: 'ทน (feat. SPRITE), ปิ้งย่าง, G-Class, สัญญาณ', genre: 'ฮิปฮอป / แร็ป' },
  { name: 'CDGUNTEE', check: ['cdguntee', 'cd guntee', 'ซีดี กันต์ธีร์'], hits: 'Microphone, ดึกแล้ว, เธอคนเดียว, โชคดี', genre: 'R&B / แร็ป' },
  { name: 'LIL X', check: ['lil x', 'ลิลเอ็กซ์'], hits: '1 ในล้าน, ยิ้ม, แด่เธอ, สลบ', genre: 'เมโลดิกแทร็ป' },
  { name: 'FIIXD', check: ['fiixd', 'ฟิก'], hits: 'แฟนใหม่หน้าคุ้น, ยิ้ม, แลก, แฟนพันธุ์แท้', genre: 'แทร็ปฮิปฮอป' },
  { name: 'Thaitanium (ไทยเทเนี่ยม)', check: ['thaitanium', 'ไทยเทเนี่ยม'], hits: 'ทะลึ่ง, ยักไหล่, สุดขอบฟ้า, หลุดพ้น, ไม่ไหวแล้ว', genre: 'ฮิปฮอประดับตำนาน' },

  // วงร็อก & ป็อปร็อกฮิตในตำนาน
  { name: 'Instinct (อินสติงต์)', check: ['instinct', 'อินสติงต์'], hits: 'โปรดส่งใครมารักฉันที, เกิดมาแค่รักกัน, นับถอยหลัง, ขอคู่ล่วงหน้า', genre: 'ป็อปร็อก' },
  { name: 'Pancake (แพนเค้ก)', check: ['pancake', 'แพนเค้ก'], hits: 'ก๋วยเตี๋ยวหน้าใสกับนายหน้าซื่อ, ใจเย็น, ขาดใจ, จริงใจไม่จริงจัง', genre: 'ป็อปร็อก 2000s' },
  { name: 'Black Vanilla', check: ['black vanilla'], hits: 'จีบฉันที, เธอยัง, เจ้าชู้, Re-start, ปฏิเสธไม่เป็น', genre: 'ป็อปร็อกวัยรุ่น RS' },
  { name: 'เล้าโลม (Lao Lom)', check: ['เล้าโลม', 'lao lom'], hits: 'หยุดได้ไหม, เพื่อนกับแฟนแทนกันไม่ได้, รักแท้แพ้ไม่รัก, โจ๊ะ', genre: 'ป็อปร็อก 2000s' },
  { name: 'Slur (สเลอ)', check: ['slur', 'สเลอ'], hits: 'หรือ, ไม่แน่นอน, โรคจิต, เซอ, เธอทั้งนั้น', genre: 'อินดี้ร็อก / โพสต์พังก์' },
  { name: 'P.O.P (Period of Party)', check: ['p.o.p', 'period of party'], hits: 'แค่ได้พบเธอ, วันใหม่, เวลาสำหรับเรา, รักของเธอมีจริงหรือเปล่า', genre: 'ป็อปโซล เบเกอรี่มิวสิค' },

  // ดีว่า & นักร้องเพลงรักคุณภาพ
  { name: 'โอ๊ต ปราโมทย์ (Oat Pramote)', check: ['oat pramote', 'โอ๊ต ปราโมทย์', 'โอ๊ต'], hits: 'ติดตลก, มีแฟนแล้ว, ที่รัก, ยิ้ม, แพ้เธอ', genre: 'ป็อปเพลงรักอารมณ์ดี' },
  { name: 'บอย โกสิยพงษ์ (Boyd Kosiyabong)', check: ['boyd kosiyabong', 'บอย โกสิยพงษ์'], hits: 'ฤดูที่แตกต่าง, ช่วงที่ดีที่สุด, ใคร, ลมหายใจ', genre: 'ตำนานเพลงรัก Bakery' },
  { name: 'พลพล พลกองเส็ง', check: ['พลพล', 'พลพล พลกองเส็ง'], hits: 'คนไม่สำคัญ, ตาแดงแดง, คนเดินถนน, ชั่วฟ้าดินสลาย', genre: 'ป็อปอบอุ่น' },
  { name: 'กัน นภัทร (Gun Napat)', check: ['gun napat', 'กัน นภัทร'], hits: 'ระยะทำใจ, ข้างๆ หัวใจ, หนึ่งในพันล้าน, หวังดีประสงค์รัก', genre: 'ป็อปบัลลาด' },
  { name: 'แก้ม วิชญาณี (Gam Wichayanee)', check: ['gam wichayanee', 'แก้ม วิชญาณี'], hits: 'ความผูกพัน (ซื้อความรักไม่ได้), มหันตภัย, ถ้าลืมเธอจะเป็นไร', genre: 'ดีว่าพลังเสียง' },
  { name: 'โรส ศิรินทิพย์', check: ['โรส ศิรินทิพย์'], hits: 'มากกว่ารัก, ก้อนหินก้อนนั้น, ปีใหม่ใหม่, เธอทำให้ฉันคิดถึงแต่เธอ', genre: 'ป็อปอบอุ่น' }
];

let coll = 0;
thaiCandidates.forEach((item, idx) => {
  for (const c of item.check) {
    if (blacklist.has(c.toLowerCase().trim())) {
      console.log(`[COLLISION] #${idx+1} ${item.name} matched: "${c}"`);
      coll++;
    }
  }
});

if (coll === 0) {
  console.log(`\n🎉 PERFECT! All ${thaiCandidates.length} Thai artists/bands have ZERO collision with database!`);
}
