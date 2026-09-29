import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/existing_artists_summary.json', 'utf8'));
const thaiSet = new Set(data.thaiNames);
const interSet = new Set(data.interNames);

const moreInter = [
  // Pop / Viral
  'Benson Boone', 'Teddy Swims', 'Hozier', 'Chappell Roan', 'Charli xcx', 'Rihanna', 
  'Lorde', 'Carly Rae Jepsen', 'Meghan Trainor', 'Sia', 'Kesha', 'Ava Max', 'Ellie Goulding',
  'Bebe Rexha', 'Anne-Marie', 'Conan Gray', 'Troye Sivan', 'Lauv', 'LANY', 'Jeremy Zucker', 
  'keshi', 'Cigarettes After Sex', 'Stephen Sanchez', 'Lewis Capaldi', 'James Arthur',
  'Joji', 'The Kid LAROI', 'Lil Nas X', 'Jack Harlow', 'Niall Horan', 'ZAYN', 'One Direction',

  // Hip Hop / R&B
  'Kanye West', 'Snoop Dogg', '50 Cent', 'Juice WRLD', 'Mac Miller', 'XXXTENTACION', 
  '21 Savage', 'Cardi B', 'Megan Thee Stallion', 'Nicki Minaj', 'Doja Cat', 'Kali Uchis',
  'Frank Ocean', 'Daniel Caesar', 'Giveon', 'Steve Lacy',

  // Rock / Alt / Legends
  'Green Day', 'Nirvana', 'Radiohead', 'The 1975', 'Red Hot Chili Peppers', 'Guns N\' Roses',
  'Queen', 'The Beatles', 'Michael Jackson', 'Madonna', 'Backstreet Boys', 'Britney Spears',
  'Linkin Park', 'Fall Out Boy', 'My Chemical Romance', 'Panic! At The Disco', 'Paramore',
  'The Killers', 'Gorillaz', 'Daft Punk', 'Bon Jovi', 'AC/DC', 'Metallica', 'Fleetwood Mac',

  // EDM / DJs
  'Calvin Harris', 'Martin Garrix', 'DJ Snake', 'Kygo', 'The Chainsmokers', 'Marshmello',
  'Avicii', 'Alan Walker', 'Zedd', 'Skrillex', 'David Guetta'
];

const moreThai = [
  // T-POP / Girl Groups / Boy Groups / Idols
  'BNK48', 'CGM48', 'ALALA', 'VIIS', 'MXFRUIT', 'Pretzelle', 'QRRA', 'LYKN', 'PERSES', 'ATLAS', 'DICE', 'bamm',
  
  // Indie / Synth / Dreampop / Folk
  'Whal & Dolph', 'YENTED', 'LANDOKMAI', 'Television off', 'Moving and Cut', 'loserpop', 'Blackbeans',
  'Desktop Error', 'Plastic Plastic', 'เขียนไขและวานิช', 'ไววิทย์', 'คณะขวัญใจ', 'เรืองฤทธิ์', 'Uncle Tree',
  'มนัสวีร์', 'ดวงดาวเดียวดาย', 'จุลโหฬาร', 'Safeplanet', 'Dept', 'Anatomy Rabbit', 'Purpeech',

  // Hip Hop / R&B / Trap
  'SARAN', '1MILL', 'DIAMOND MQT', 'MILLI', 'SPRITE', 'OG-ANIC', 'LAZYLOXY', 'MAIYARAP', 'TWOPEE SOUTHSIDE',
  'YOUNGOHM', 'YOUNGGU', 'F.HERO', 'D GERRARD', 'Pun', 'URBOYTJ', 'CDGUNTEE', 'JAYLERR', 'Ice Paris',
  'Gawin Caskey', 'NONT TANONT', 'Jeff Satur',

  // Rock / Modern Rock / Metal
  'Modern Dog', 'Silly Fools', 'Loso', 'Blackhead', 'Zeal', 'Klear', 'Paradox', 'Slot Machine',
  'Sweet Mullet', 'Retrospect', 'Ebola', 'Flure', 'No More Tear', 'Kala', 'Hangman', 'The Yers',
  'Cocktail', 'Bodyslam', 'Big Ass', 'Clash', 'Potato', 'Lomosonic',

  // Pop Superstars / Diva / 90s-2000s
  'เบิร์ด ธงไชย', 'บี้ สุกฤษฎิ์', 'เจ เจตริน', 'คริสติน่า อากีล่าร์', 'ทาทา ยัง', 'นิโคล เทริโอ',
  'โบ สุนิตา', 'ปาน ธนพร', 'ดา เอ็นโดรฟิน', 'Lula (ลุลา)', 'Singular', 'ETC.', 'Crescendo',
  'เต๋า สมชาย', 'มอส ปฏิภาณ', 'โดม ปกรณ์ ลัม', 'ลิฟท์-ออย', 'แร็พเตอร์ (Raptor)', 'แดน-บีม (D2B)',
  'Golf-Mike', 'K-OTIC', 'Kamikaze', 'หวาย (Waii)', 'Four-Mod', 'Faye Fang Kaew', '3.2.1',

  // Country / ลูกทุ่ง / เพื่อชีวิต
  'ก้อง ห้วยไร่', 'มนต์แคน แก่นคูน', 'ลำไย ไหทองคำ', 'จ๊ะ นงผณี', 'พงษ์สิทธิ์ คำภีร์', 'มาลีฮวนน่า',
  'คาราบาว', 'ไผ่ พงศธร', 'ต่าย อรทัย', 'ไหมไทย หัวใจศิลป์', 'เบิ้ล ปทุมราช', 'ลำเพลิน วงศกร',
  'เต๋า ภูศิลป์', 'เน็ค นฤพล', 'วงกางเกง', 'วงพัทลุง', 'มหาหิงค์', 'วง L.ก.ฮ.'
];

const interMissing = moreInter.filter(name => !interSet.has(name.toLowerCase()));
const thaiMissing = moreThai.filter(name => !thaiSet.has(name.toLowerCase()));

console.log('Inter missing count:', interMissing.length);
console.log(interMissing);
console.log('\nThai missing count:', thaiMissing.length);
console.log(thaiMissing);
