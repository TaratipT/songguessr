import fs from 'fs';

const blacklist = new Set(JSON.parse(fs.readFileSync('scratch/updated_blacklist.json', 'utf8')));

const modernThai = [
  { name: 'Only Monday', check: ['only monday', 'โอนลี่ มันเดย์'], hits: 'ได้แต่นึกถึง, บรรยากาศ, ไม่เป็นไรหรอกมั้ง, ทิ้งไป', genre: 'ป็อปร็อก' },
  { name: 'ALALA', check: ['alala', 'อาลาล่า'], hits: 'ร้องไห้ดังๆ, ซึ้งอยู่, บังเอิญตั้งใจ, เสียใจไม่เสียดาย', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'MXFRUIT', check: ['mxfruit', 'มิกซ์ฟรุต'], hits: 'strawberry ice cream, ทำไมไม่ตอบ, มีใจก็ทัก, ทักครับ', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'VIIS', check: ['viis', 'วิส'], hits: 'Barbie (Oops! Oops!), Mirage, Don\'t Mind', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'QRRA', check: ['qrra', 'คิวร่า'], hits: 'Miracle, ไม่ง้อ', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'FLI:P', check: ['fli:p', 'flip'], hits: 'มองนานๆ (Look at me), สลัดสะบัด', genre: 'T-POP ไวรัลแดนซ์' },
  { name: 'DIDIxDADA', check: ['didixdada', 'didi x dada'], hits: 'เฟรนด์ขับ, จ้องตา', genre: 'T-POP ฝาแฝด' },
  { name: 'Clockwork Motionless', check: ['clockwork motionless'], hits: 'ปล่อยให้เวลา, ถ้าวันนั้น, ยิ้ม, ปล่อย', genre: 'อินดี้ร็อก / บัลลาด' },
  { name: 'Earth Patravee (เอิ๊ต ภัทรวี)', check: ['earth patravee', 'เอิ๊ต ภัทรวี'], hits: 'หวง, ท้องฟ้า, มีไว้แค่เป็นของเธอเท่านั้น, ห้ามใจไม่ไหว', genre: 'อินดี้ป็อป' },
  { name: 'mints', check: ['mints'], hits: 'ไม่ง่าย, ลืมไปแล้วหรือยัง, ตอนนี้เธออยู่ไหน, เก็บไว้ก่อน', genre: 'อินดี้ป็อป' },
  { name: 't_047', check: ['t_047', 't047'], hits: 'รอสายรุ้ง, เพียงฤดู, หลังคา, กลับบ้าน', genre: 'โฟล์ก / เบดรูมป็อป' },
  { name: 'เขียนไขและวานิช', check: ['เขียนไขและวานิช', 'kienkai'], hits: 'แก้มน้องนางนั้นแดงกว่าใคร, หนีห่าง, ภาพถ่าย', genre: 'โฟล์ก / เพื่อชีวิตมินิมอล' },
  { name: 'คณะขวัญใจ', check: ['คณะขวัญใจ'], hits: 'ย้ายป่า, ฉันรักเธอ, ฟ้าครึ้ม', genre: 'โฟล์กเพื่อชีวิต' },
  { name: 'ROOFTOP', check: ['rooftop'], hits: 'คนเราจะแอบรักใครสักคนได้นานแค่ไหน, กลัวเธอเหงา, เคยคิดถึงฉันไหม', genre: 'ป็อปดูโอ้' },
  { name: 'Monica (โมนิก้า)', check: ['monica', 'โมนิก้า'], hits: 'อยากจะรู้, ฉันคือใคร, จินตนาการ, รักแท้', genre: 'อัลเทอร์เนทีฟป็อป' },
  { name: 'Chilax', check: ['chilax'], hits: 'ฉันนี่แหละ...คนรักของเธอ, ขอแค่ยิ้ม, ผิดที่ฉัน, คุ้มมั้ย', genre: 'ป็อปร็อก' },
  { name: 'JARVIS', check: ['jarvis', 'แจ๊ jarvis'], hits: 'ผมอะ... (Fuk U), น้ำแข็ง, เอารึยัง, ปิ้ว ปิ้ว', genre: 'ไวรัลฮิปฮอป' },
  { name: 'GUYGEEGEE', check: ['guygeegee', 'กายจีจี'], hits: 'ทน (feat. SPRITE), ปิ้งย่าง, G-Class, สัญญาณ', genre: 'ฮิปฮอป / แร็ป' },
  { name: 'CDGUNTEE', check: ['cdguntee', 'cd guntee', 'ซีดี กันต์ธีร์'], hits: 'Microphone, ดึกแล้ว, เธอคนเดียว, โชคดี', genre: 'R&B / แร็ป' },
  { name: 'LIL X', check: ['lil x', 'ลิลเอ็กซ์'], hits: '1 ในล้าน, ยิ้ม, แด่เธอ, สลบ', genre: 'เมโลดิกแทร็ป' },
  { name: 'PanPan Yeeyee', check: ['panpan yeeyee', 'ปันปัน ยีย์ยีย์'], hits: 'สวัสดีค่ะ, น้องหมา, หมา, ถอดรหัส', genre: 'เบดรูมป็อป' },
  { name: 'KIKI', check: ['kiki'], hits: 'Get Up, Back in the Game, Inside Out', genre: 'ซินธ์ป็อป / อินดี้อิเล็กทรอนิก' },
  { name: 'Wizzle', check: ['wizzle'], hits: 'อัศจรรย์, โชคดีที่มีเธอ', genre: 'T-POP เกิร์ลกรุ๊ป' },
  { name: 'EMPRESS', check: ['empress'], hits: 'Bling Bling, ไฮโซ', genre: 'T-POP แดนซ์' },
  { name: 'KOB FLAT BOY', check: ['kob flat boy', 'กบ flat boy'], hits: 'แค่เพื่อนมั้ง, สับสน, ความสุข', genre: 'ฮิปฮอป / อะคูสติก' }
];

const modernInter = [
  { name: 'Chappell Roan', check: ['chappell roan'], hits: 'Good Luck, Babe!, HOT TO GO!, Red Wine Supernova, Pink Pony Club', genre: 'Glam Pop / Synth-Pop' },
  { name: 'Charli xcx', check: ['charli xcx', 'charli'], hits: 'Apple, 360, Guess, Von dutch, Boom Clap', genre: 'Hyperpop / Brat Pop' },
  { name: 'Tate McRae', check: ['tate mcrae'], hits: 'greedy, exes, you broke me first, 2 hands', genre: 'Pop / Dance-Pop' },
  { name: 'Benson Boone', check: ['benson boone'], hits: 'Beautiful Things, In the Stars, Slow It Down, Ghost Town', genre: 'Pop-Rock / Ballad' },
  { name: 'Tommy Richman', check: ['tommy richman'], hits: 'MILLION DOLLAR BABY, DEVIL IS A LIE, THOUGHT YOU WERE THE ONE', genre: 'Alt-R&B / Funk' },
  { name: 'Laufey', check: ['laufey'], hits: 'From the Start, Falling Behind, Valentine, Promise', genre: 'Bossa / Jazz-Pop' },
  { name: 'd4vd', check: ['d4vd'], hits: 'Romantic Homicide, Here With Me, Sleep Well, Feel It', genre: 'Alt-Indie / Bedroom Pop' },
  { name: 'Stephen Sanchez', check: ['stephen sanchez'], hits: 'Until I Found You, High, Be More, Evangeline', genre: 'Retro-Pop / Doo-Wop' },
  { name: 'PinkPantheress', check: ['pinkpantheress'], hits: 'Boy\'s a liar Pt. 2, Nice to meet you, Pain, Mosquito', genre: 'UK Garage / Alt-Pop' },
  { name: 'Ice Spice', check: ['ice spice'], hits: 'Boy\'s a liar Pt. 2, Munch (Feelin\' U), Deli, Princess Diana', genre: 'Drill / Pop Rap' },
  { name: 'Dominic Fike', check: ['dominic fike'], hits: '3 Nights, Mona Lisa, Babydoll, Phone Numbers', genre: 'Alt-Pop / Indie Rock' },
  { name: 'Reneé Rapp', check: ['renee rapp', 'reneé rapp'], hits: 'Not My Fault, Too Well, Snow Angel, Tattoos', genre: 'Pop / R&B' },
  { name: 'Hozier', check: ['hozier'], hits: 'Too Sweet, Take Me to Church, Cherry Wine, Work Song', genre: 'Alt-Folk / Indie Rock' },
  { name: 'Lorde', check: ['lorde'], hits: 'Royals, Green Light, Solar Power, Ribs, Team', genre: 'Art Pop / Indie Pop' },
  { name: 'LANY', check: ['lany'], hits: 'ILYSB, Malibu Nights, Mean It, dna, ex i never had', genre: 'Indie Pop / Dream Pop' },
  { name: 'Cigarettes After Sex', check: ['cigarettes after sex'], hits: 'Apocalypse, K., Sweet, Sunsetz, Tejano Blue', genre: 'Dream Pop / Slowcore' },
  { name: 'Playboi Carti', check: ['playboi carti'], hits: 'Magnolia, Sky, FE!N, Shoota, wokeuplikethis*', genre: 'Rage / Trap' },
  { name: 'Yeat', check: ['yeat'], hits: 'IDGAF, Monëy so big, Breathe, Poppin, Out the way', genre: 'Rage Rap / Hip-Hop' },
  { name: 'Lil Uzi Vert', check: ['lil uzi vert', 'lil uzi'], hits: 'XO Tour Llif3, Just Wanna Rock, 20 Min, The Way Life Goes', genre: 'Emo Rap / Trap' },
  { name: 'Lil Yachty', check: ['lil yachty'], hits: 'Poland, One Night, A Cold Sunday, Minnesota', genre: 'Alt-Rap / Psychedelic' },
  { name: 'Ava Max', check: ['ava max'], hits: 'Sweet but Psycho, Kings & Queens, The Motto, My Head & My Heart', genre: 'Dance-Pop / Electro' },
  { name: 'Meghan Trainor', check: ['meghan trainor'], hits: 'Made You Look, All About That Bass, Like I\'m Gonna Lose You', genre: 'Doo-Wop / Pop' },
  { name: 'Sexyy Red', check: ['sexyy red'], hits: 'SkeeYee, Get It Sexyy, Pound Town, Rich Baby Daddy', genre: 'Trap / Hip-Hop' },
  { name: 'Tyla', check: ['tyla'], hits: 'Water, Jump, Truth or Dare, ART', genre: 'Afrobeats / Pop R&B' },
  { name: 'Fred again..', check: ['fred again..', 'fred again'], hits: 'Adore U, Delilah (pull me out of this), leavemealone, Jungle', genre: 'UK Dance / Electronic' }
];

let coll = 0;
[...modernThai, ...modernInter].forEach(item => {
  for (const c of item.check) {
    if (blacklist.has(c.toLowerCase().trim())) {
      console.log(`[COLLISION] ${item.name} matched blacklist: "${c}"`);
      coll++;
    }
  }
});

if (coll === 0) {
  console.log(`\n🎉 PERFECT! All ${modernThai.length + modernInter.length} candidates have ZERO collision with the database!`);
}
