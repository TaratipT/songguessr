import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');

// Parse all existing names and ids
const existingNames = [];
const nameMatches = content.matchAll(/name:\s*['"]([^'"]+)['"]/g);
for (const m of nameMatches) {
  existingNames.push(m[1].toLowerCase());
}

const existingIds = [];
const idMatches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
for (const m of idMatches) {
  existingIds.push(m[1].toLowerCase());
}

// Check all 100
const candidates = [
  { no: 1, name: 'เบิร์ด ธงไชย', query: ['bird', 'thongchai', 'ธงไชย', 'เบิร์ด'] },
  { no: 2, name: 'บี้ สุกฤษฎิ์', query: ['bie', 'sukrit', 'สุกฤษฎิ์', 'บี้'] },
  { no: 3, name: 'ดา เอ็นโดรฟิน', query: ['da', 'endorphine', 'เอ็นโดรฟิน'] },
  { no: 4, name: 'โบ สุนิตา', query: ['beau', 'sunita', 'สุนิตา', 'โบ สุนิตา'] },
  { no: 5, name: 'ปาน ธนพร', query: ['parn', 'thanaporn', 'ปาน ธนพร', 'ธนพร'] },
  { no: 6, name: 'Lula (ลุลา)', query: ['lula', 'ลุลา'] },
  { no: 7, name: 'เจ เจตริน', query: ['j jetrin', 'jetrin', 'เจตริน'] },
  { no: 8, name: 'คริสติน่า อากีล่าร์', query: ['christina', 'aguilar', 'คริสติน่า'] },
  { no: 9, name: 'ทาทา ยัง', query: ['tata', 'tata young', 'ทาทา'] },
  { no: 10, name: 'มอส ปฏิภาณ', query: ['mos', 'patiparn', 'ปฏิภาณ'] },
  { no: 11, name: 'เต๋า สมชาย', query: ['tao', 'somchai', 'เต๋า สมชาย', 'สมชาย'] },
  { no: 12, name: 'นิโคล เทริโอ', query: ['nicole', 'therio', 'นิโคล'] },
  { no: 13, name: 'แดน-บีม (D2B)', query: ['d2b', 'dan-beam', 'dan & beam'] },
  { no: 14, name: 'แร็พเตอร์ (Raptor)', query: ['raptor', 'แร็พเตอร์'] },
  { no: 15, name: 'ลิฟท์-ออย', query: ['lift-oil', 'lift & oil', 'ลิฟท์'] },
  { no: 16, name: 'Four-Mod', query: ['four mod', 'four-mod', 'โฟร์มด'] },
  { no: 17, name: 'หวาย (Waii)', query: ['waii', 'หวาย'] },
  { no: 18, name: 'Golf-Mike', query: ['golf mike', 'golf-mike', 'กอล์ฟ ไมค์'] },
  { no: 19, name: 'โดม ปกรณ์ ลัม', query: ['dome', 'pakorn', 'ปกรณ์ ลัม'] },
  { no: 20, name: 'BNK48', query: ['bnk48', 'bnk'] },
  { no: 21, name: 'CGM48', query: ['cgm48', 'cgm'] },
  { no: 22, name: 'ALALA', query: ['alala'] },
  { no: 23, name: 'MXFRUIT', query: ['mxfruit'] },
  { no: 24, name: 'Pretzelle', query: ['pretzelle'] },
  { no: 25, name: 'VIIS', query: ['viis'] },
  { no: 26, name: 'QRRA', query: ['qrra'] },
  { no: 27, name: 'Ice Paris', query: ['ice paris', 'ไอซ์ พาริส'] },
  { no: 28, name: 'JAYLERR', query: ['jaylerr', 'เจเลอร์'] },
  { no: 29, name: 'Whal & Dolph', query: ['whal & dolph', 'whal', 'dolph'] },
  { no: 30, name: 'YENTED', query: ['yented'] },
  { no: 31, name: 'เขียนไขและวานิช', query: ['เขียนไข', 'วานิช'] },
  { no: 32, name: 'ไววิทย์', query: ['ไววิทย์'] },
  { no: 33, name: 'คณะขวัญใจ', query: ['ขวัญใจ'] },
  { no: 34, name: 'เรืองฤทธิ์', query: ['เรืองฤทธิ์'] },
  { no: 35, name: 'Singular', query: ['singular'] },
  { no: 36, name: 'ETC.', query: ['etc.', 'etc'] },
  { no: 37, name: 'Plastic Plastic', query: ['plastic plastic'] },
  { no: 38, name: 'Uncle Tree', query: ['uncle tree'] },
  { no: 39, name: 'Modern Dog', query: ['modern dog', 'moderndog'] },
  { no: 40, name: 'Hangman', query: ['hangman'] },
  { no: 41, name: 'No More Tear', query: ['no more tear'] },
  { no: 42, name: 'DIAMOND MQT', query: ['diamond mqt'] },
  { no: 43, name: 'YOUNGGU', query: ['younggu'] },
  { no: 44, name: 'CDGUNTEE', query: ['cdguntee', 'cd guntee'] },
  { no: 45, name: 'วงกางเกง', query: ['กางเกง'] },
  { no: 46, name: 'วงพัทลุง', query: ['พัทลุง'] },
  { no: 47, name: 'มหาหิงค์', query: ['มหาหิงค์'] },
  { no: 48, name: 'วง L.ก.ฮ.', query: ['l.ก.ฮ.', 'ลกฮ'] },
  { no: 49, name: 'เต๋า ภูศิลป์', query: ['ภูศิลป์'] },
  { no: 50, name: 'เน็ค นฤพล', query: ['นฤพล'] },

  { no: 51, name: 'Rihanna', query: ['rihanna'] },
  { no: 52, name: 'Chappell Roan', query: ['chappell', 'roan'] },
  { no: 53, name: 'Charli xcx', query: ['charli xcx', 'charli'] },
  { no: 54, name: 'Benson Boone', query: ['benson boone', 'benson'] },
  { no: 55, name: 'Lorde', query: ['lorde'] },
  { no: 56, name: 'Carly Rae Jepsen', query: ['carly rae jepsen', 'jepsen'] },
  { no: 57, name: 'Meghan Trainor', query: ['meghan trainor', 'trainor'] },
  { no: 58, name: 'Ava Max', query: ['ava max'] },
  { no: 59, name: 'Ellie Goulding', query: ['ellie goulding', 'goulding'] },
  { no: 60, name: 'Bebe Rexha', query: ['bebe rexha', 'rexha'] },
  { no: 61, name: 'LANY', query: ['lany'] },
  { no: 62, name: 'keshi', query: ['keshi'] },
  { no: 63, name: 'Jeremy Zucker', query: ['jeremy zucker', 'zucker'] },
  { no: 64, name: 'Cigarettes After Sex', query: ['cigarettes after sex'] },
  { no: 65, name: 'Stephen Sanchez', query: ['stephen sanchez', 'sanchez'] },
  { no: 66, name: 'Hozier', query: ['hozier'] },
  { no: 67, name: 'Lewis Capaldi', query: ['lewis capaldi', 'capaldi'] },
  { no: 68, name: 'James Arthur', query: ['james arthur'] },
  { no: 69, name: 'ZAYN', query: ['zayn'] },
  { no: 70, name: 'Niall Horan', query: ['niall horan', 'horan'] },
  { no: 71, name: 'Frank Ocean', query: ['frank ocean'] },
  { no: 72, name: 'Giveon', query: ['giveon'] },
  { no: 73, name: 'Steve Lacy', query: ['steve lacy'] },
  { no: 74, name: 'Kali Uchis', query: ['kali uchis', 'uchis'] },
  { no: 75, name: 'Nirvana', query: ['nirvana'] },
  { no: 76, name: 'Radiohead', query: ['radiohead'] },
  { no: 77, name: 'Green Day', query: ['green day'] },
  { no: 78, name: 'The 1975', query: ['the 1975', '1975'] },
  { no: 79, name: 'Red Hot Chili Peppers', query: ['red hot chili peppers', 'chili peppers'] },
  { no: 80, name: 'Guns N\' Roses', query: ['guns n\' roses', 'guns n roses'] },
  { no: 81, name: 'AC/DC', query: ['ac/dc', 'acdc'] },
  { no: 82, name: 'Metallica', query: ['metallica'] },
  { no: 83, name: 'Paramore', query: ['paramore'] },
  { no: 84, name: 'Fall Out Boy', query: ['fall out boy'] },
  { no: 85, name: 'The Killers', query: ['the killers'] },
  { no: 86, name: 'Gorillaz', query: ['gorillaz'] },
  { no: 87, name: 'Fleetwood Mac', query: ['fleetwood mac'] },
  { no: 88, name: 'Kanye West', query: ['kanye west', 'kanye', 'ye'] },
  { no: 89, name: 'Snoop Dogg', query: ['snoop dogg', 'snoop'] },
  { no: 90, name: '50 Cent', query: ['50 cent'] },
  { no: 91, name: 'Mac Miller', query: ['mac miller'] },
  { no: 92, name: '21 Savage', query: ['21 savage'] },
  { no: 93, name: 'Calvin Harris', query: ['calvin harris'] },
  { no: 94, name: 'Martin Garrix', query: ['martin garrix', 'garrix'] },
  { no: 95, name: 'DJ Snake', query: ['dj snake'] },
  { no: 96, name: 'Kygo', query: ['kygo'] },
  { no: 97, name: 'Skrillex', query: ['skrillex'] },
  { no: 98, name: 'Daft Punk', query: ['daft punk'] },
  { no: 99, name: 'Backstreet Boys', query: ['backstreet boys'] },
  { no: 100, name: 'Avril Lavigne', query: ['avril lavigne', 'avril'] }
];

console.log('--- SCANNING RESULTS ---');
const alreadyIn = [];
const notIn = [];

for (const c of candidates) {
  let found = false;
  for (const q of c.query) {
    if (existingNames.some(n => n.includes(q)) || existingIds.some(id => id.includes(q.replace(/\s+/g, '_')))) {
      found = true;
      break;
    }
  }
  if (found) {
    alreadyIn.push(c);
  } else {
    notIn.push(c);
  }
}

console.log('Already in DB (' + alreadyIn.length + '):');
alreadyIn.forEach(a => console.log(`  #${a.no} ${a.name}`));

console.log('\nTruly NOT in DB (' + notIn.length + '):');
notIn.forEach(a => console.log(`  #${a.no} ${a.name}`));
