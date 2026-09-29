import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/existing_artists_summary.json', 'utf8'));
const thaiSet = new Set(data.thaiNames);
const interSet = new Set(data.interNames);

const thaiList = [
  'เบิร์ด ธงไชย', 'บี้ สุกฤษฎิ์', 'ดา เอ็นโดรฟิน', 'โบ สุนิตา', 'ปาน ธนพร',
  'Lula (ลุลา)', 'เจ เจตริน', 'คริสติน่า อากีล่าร์', 'ทาทา ยัง', 'มอส ปฏิภาณ',
  'เต๋า สมชาย', 'นิโคล เทริโอ', 'แดน-บีม (D2B)', 'แร็พเตอร์ (Raptor)', 'ลิฟท์-ออย',
  'Four-Mod', 'หวาย (Waii)', 'Golf-Mike', 'โดม ปกรณ์ ลัม', 'BNK48',
  'CGM48', 'ALALA', 'MXFRUIT', 'Pretzelle', 'VIIS',
  'QRRA', 'Ice Paris', 'JAYLERR', 'Whal & Dolph', 'YENTED',
  'เขียนไขและวานิช', 'ไววิทย์', 'คณะขวัญใจ', 'เรืองฤทธิ์', 'Singular',
  'ETC.', 'Plastic Plastic', 'Uncle Tree', 'Modern Dog', 'Hangman',
  'No More Tear', 'DIAMOND MQT', 'YOUNGGU', 'CDGUNTEE', 'วงกางเกง',
  'วงพัทลุง', 'มหาหิงค์', 'วง L.ก.ฮ.', 'เต๋า ภูศิลป์', 'เน็ค นฤพล'
];

const interList = [
  'Rihanna', 'Chappell Roan', 'Charli xcx', 'Benson Boone', 'Lorde',
  'Carly Rae Jepsen', 'Meghan Trainor', 'Ava Max', 'Ellie Goulding', 'Bebe Rexha',
  'LANY', 'keshi', 'Jeremy Zucker', 'Cigarettes After Sex', 'Stephen Sanchez',
  'Hozier', 'Lewis Capaldi', 'James Arthur', 'ZAYN', 'Niall Horan',
  'Frank Ocean', 'Giveon', 'Steve Lacy', 'Kali Uchis', 'Nirvana',
  'Radiohead', 'Green Day', 'The 1975', 'Red Hot Chili Peppers', 'Guns N\' Roses',
  'AC/DC', 'Metallica', 'Paramore', 'Fall Out Boy', 'The Killers',
  'Gorillaz', 'Fleetwood Mac', 'Kanye West', 'Snoop Dogg', '50 Cent',
  'Mac Miller', '21 Savage', 'Calvin Harris', 'Martin Garrix', 'DJ Snake',
  'Kygo', 'Skrillex', 'Daft Punk', 'Backstreet Boys', 'Avril Lavigne'
];

const duplicatesThai = thaiList.filter(name => thaiSet.has(name.toLowerCase()));
const duplicatesInter = interList.filter(name => interSet.has(name.toLowerCase()));

console.log('Duplicate Thai count:', duplicatesThai.length, duplicatesThai);
console.log('Duplicate Inter count:', duplicatesInter.length, duplicatesInter);
