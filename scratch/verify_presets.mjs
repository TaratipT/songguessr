import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const allNames = new Set();
const nameRegex = /name:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = nameRegex.exec(content)) !== null) {
  allNames.add(m[1].toLowerCase().trim());
}

console.log('Total artists in DB:', allNames.size);

const testPresets = [
  // Thai
  {
    title: 'ร็อกไทย 2000s มันส์หยุดไม่อยู่',
    artists: ['Bodyslam', 'Potato', 'Cocktail', 'Clash', 'Big Ass', 'Labanoon', 'Getsunova', 'Klear', 'Zeal', '25hours', 'So Cool', 'Kala']
  },
  {
    title: 'ร็อกไทยตำนาน & เพื่อชีวิตคลาสสิก',
    artists: ['Silly Fools', 'Loso', 'เสก โลโซ', 'ป้าง นครินทร์', 'หินเหล็กไฟ', 'วงฟลาย (Fly)', 'คาราบาว', 'พงษ์สิทธิ์ คำภีร์', 'Asanee Wasan', 'Micro', 'Nuvo', 'มาลีฮวนน่า']
  },
  {
    title: 'อินดี้ไทย คาเฟ่ & ซินธ์ไนท์',
    artists: ['Safeplanet', 'Dept', 'Anatomy Rabbit', 'Mirrr', 'Fellow Fellow', 'Polycat', 'Scrubb', 'Whal & Dolph', 'YENTED', 'The TOYS', 'PURPEECH', 'YourMOOD']
  },
  {
    title: 'T-POP & ฮิตติดชาร์ตคลื่นลูกใหม่',
    artists: ['Three Man Down', 'Tilly Birds', 'Jeff Satur', 'NONT TANONT', 'Bowkylion', 'Ink Waruntorn', '4EVE', 'PiXXiE', 'PROXIE', 'BUS', 'ATLAS', 'Billkin']
  },
  {
    title: 'วัยรุ่นกามิกาเซ่ & Y2K Pop Nostalgia',
    artists: ['Four Mod', 'K-OTIC', 'Waii', '3.2.1', 'Faye Fang Kaew', 'Knomjean', 'Timethai', 'Golf Mike', 'Dan & Beam', 'D2B', 'Girly Berry', 'Neko Jump', 'China Dolls', 'Katreeya English', 'Raptor']
  },
  {
    title: 'แร็ปเปอร์ & ฮิปฮอปไทยตัวท็อป',
    artists: ['YOUNGOHM', 'illslick', 'UrboyTJ', 'SPRITE', 'F.HERO', 'SARAN', 'D GERRARD', 'Twopee Southside', 'LAZYLOXY', 'MILLI', 'RachYO', 'TangBadVoice', '1MILL', 'MAIYARAP']
  },
  {
    title: 'ลูกทุ่งอินดี้ & อีสานพันล้านวิว',
    artists: ['โจอี้ ภูวศิษฐ์', 'มนต์แคน แก่นคูน', 'ลำไย ไหทองคำ', 'ก้อง ห้วยไร่', 'ไผ่ พงศธร', 'ต่าย อรทัย', 'ตั๊กแตน ชลดา', 'เบิ้ล ปทุมราช', 'แซ็ค ชุมแพ', 'กระแต อาร์สยาม', 'จ๊ะ นงผณี', 'เบลล์ นิภาดา']
  },
  {
    title: 'ป็อปฟีลกู๊ด & อคูสติกอบอุ่นหัวใจ',
    artists: ['แสตมป์ อภิวัชร์', 'สิงโต นำโชค', 'Lipta', 'No One Else', 'Sarah Salola', 'Patrickananda', 'First Anuwat', 'Bell Supol', 'Wan Thanakrit', 'Pop Pongkool', 'Boy Peacemaker', 'SERIOUS BACON']
  },
  {
    title: 'ป็อปดีว่า & ตัวพ่อตัวแม่ 90s-2000s',
    artists: ['Bird Thongchai', 'Christina Aguilar', 'Nicole Theriault', 'Mos Patiparn', 'Jay Jetrin', 'Peck Palitchoke', 'Bie Sukrit', 'Ice Saranyu', 'Aof Pongsak', 'Palmy', 'Endorphine', 'Tata Young']
  },
  {
    title: 'ซีรีส์วาย & T-POP บอยแบนด์สุดฮอต',
    artists: ['BUS', 'PROXIE', 'ATLAS', 'PERSES', 'DICE', 'LYKN', 'GEMINI & FOURTH', 'DAOU & OFFROAD', 'Billkin', 'PP Krit', 'Nanon Korapat', 'Bright Vachirawit']
  },

  // Inter
  {
    title: 'Top Billboard Pop Superstars',
    artists: ['Taylor Swift', 'Bruno Mars', 'The Weeknd', 'Billie Eilish', 'Sabrina Carpenter', 'Olivia Rodrigo', 'Dua Lipa', 'Ariana Grande', 'Post Malone', 'Ed Sheeran', 'Harry Styles', 'Justin Bieber']
  },
  {
    title: '2000s-2010s Global Pop Queens',
    artists: ['Lady Gaga', 'Katy Perry', 'Britney Spears', 'Miley Cyrus', 'Sia', 'Beyoncé', 'Adele', 'Kesha', 'Carly Rae Jepsen', 'Demi Lovato', 'Camila Cabello', 'Selena Gomez']
  },
  {
    title: 'Rock & Alternative Stadium Anthems',
    artists: ['Coldplay', 'Maroon 5', 'Imagine Dragons', 'Linkin Park', 'Queen', 'Guns N', 'Bon Jovi', 'Oasis', 'Arctic Monkeys', 'Twenty One Pilots', 'The Script', 'OneRepublic']
  },
  {
    title: 'Global Hip-Hop & Rap Titans',
    artists: ['Eminem', 'Drake', 'Kendrick Lamar', 'Travis Scott', 'Post Malone', 'Jack Harlow', 'Lil Nas X', 'Juice WRLD', 'XXXTENTACION', 'Nicki Minaj', 'Cardi B', 'Doja Cat']
  },
  {
    title: 'EDM Festival & Dance Party Hits',
    artists: ['Avicii', 'Alan Walker', 'The Chainsmokers', 'David Guetta', 'Marshmello', 'Zedd', 'Clean Bandit', 'Pitbull', 'Flo Rida', 'Black Eyed Peas']
  },
  {
    title: 'Indie Pop & Chill Late Night Vibes',
    artists: ['Joji', 'keshi', 'Jeremy Zucker', 'Daniel Caesar', 'Lauv', 'Troye Sivan', 'Conan Gray', 'Gracie Abrams', 'Lana Del Rey', 'SZA', 'Teddy Swims', 'Khalid']
  },
  {
    title: '2010s Boybands & Heartthrobs',
    artists: ['One Direction', 'Justin Bieber', 'Shawn Mendes', 'Charlie Puth', 'Harry Styles', 'Justin Timberlake', 'Usher', 'Bruno Mars', 'Maroon 5']
  }
];

let hasError = false;
testPresets.forEach(p => {
  p.artists.forEach(name => {
    if (!allNames.has(name.toLowerCase().trim())) {
      console.log(`[MISSING] Preset "${p.title}" has unknown artist: "${name}"`);
      hasError = true;
    }
  });
});

if (!hasError) {
  console.log('All artists in test presets match existing GLOBAL_ARTISTS perfectly! ✅');
}
