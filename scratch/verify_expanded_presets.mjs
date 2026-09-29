import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const allNames = new Set();
const nameRegex = /name:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = nameRegex.exec(content)) !== null) {
  allNames.add(m[1].toLowerCase().trim());
}

console.log('Total artists in DB:', allNames.size);

export const EXPANDED_PRESETS = [
  // ==========================================
  // 🇹🇭 1. เพลงไทย (THAI MUSIC) - 12 หมวด
  // ==========================================
  {
    id: 'preset_thai_rock_2000s',
    title: '🎸 ร็อกไทย 2000s มันส์หยุดไม่อยู่',
    region: 'thai',
    subtitle: 'Bodyslam, Potato, Cocktail, Clash, Big Ass, Labanoon, Klear, Zeal, So Cool, Kala',
    artists: ['Bodyslam', 'Potato', 'Cocktail', 'Clash', 'Big Ass', 'Labanoon', 'Getsunova', 'Klear', 'Zeal', '25hours', 'So Cool', 'Kala', 'Paradox', 'Slot Machine']
  },
  {
    id: 'preset_thai_rock_legends',
    title: '🤘 ร็อกไทยตำนาน & เพื่อชีวิตคลาสสิก',
    region: 'thai',
    subtitle: 'Silly Fools, Loso, เสก โลโซ, ป้าง นครินทร์, หินเหล็กไฟ, วงฟลาย, คาราบาว, พงษ์สิทธิ์',
    artists: ['Silly Fools', 'Loso', 'เสก โลโซ', 'ป้าง นครินทร์', 'หินเหล็กไฟ', 'วงฟลาย (Fly)', 'คาราบาว', 'พงษ์สิทธิ์ คำภีร์', 'Asanee Wasan', 'Micro', 'Nuvo', 'มาลีฮวนน่า', 'Blackhead', 'Y Not 7']
  },
  {
    id: 'preset_thai_indie_night',
    title: '🌙 อินดี้ไทย คาเฟ่ & ซินธ์ไนท์',
    region: 'thai',
    subtitle: 'Safeplanet, Dept, Anatomy Rabbit, Mirrr, Fellow Fellow, Polycat, Scrubb, Whal & Dolph',
    artists: ['Safeplanet', 'Dept', 'Anatomy Rabbit', 'Mirrr', 'Fellow Fellow', 'Polycat', 'Scrubb', 'Whal & Dolph', 'YENTED', 'The TOYS', 'PURPEECH', 'YourMOOD', 'Landokmai', 'Television Off']
  },
  {
    id: 'preset_thai_tpop_hits',
    title: '✨ T-POP & ฮิตติดชาร์ตคลื่นลูกใหม่',
    region: 'thai',
    subtitle: 'Three Man Down, Tilly Birds, Jeff Satur, NONT TANONT, Bowkylion, Ink, 4EVE, PiXXiE',
    artists: ['Three Man Down', 'Tilly Birds', 'Jeff Satur', 'NONT TANONT', 'Bowkylion', 'Ink Waruntorn', '4EVE', 'PiXXiE', 'PROXIE', 'BUS', 'ATLAS', 'Billkin', 'Violette Wautier', 'bamm']
  },
  {
    id: 'preset_kamikaze_nostalgia',
    title: '📼 วัยรุ่นกามิกาเซ่ & Y2K Pop Nostalgia',
    region: 'thai',
    subtitle: 'Four Mod, K-OTIC, Waii, 3.2.1, Faye Fang Kaew, Knomjean, Timethai, Golf Mike, D2B',
    artists: ['Four Mod', 'K-OTIC', 'Waii', '3.2.1', 'Faye Fang Kaew', 'Knomjean', 'Timethai', 'Golf Mike', 'Dan & Beam', 'D2B', 'Girly Berry', 'Neko Jump', 'China Dolls', 'Katreeya English', 'Raptor']
  },
  {
    id: 'preset_thai_hiphop',
    title: '🕶️ แร็ปเปอร์ & ฮิปฮอปไทยตัวท็อป',
    region: 'thai',
    subtitle: 'YOUNGOHM, illslick, UrboyTJ, SPRITE, F.HERO, SARAN, D GERRARD, Twopee, LAZYLOXY, MILLI',
    artists: ['YOUNGOHM', 'illslick', 'UrboyTJ', 'SPRITE', 'F.HERO', 'SARAN', 'D GERRARD', 'Twopee Southside', 'LAZYLOXY', 'MILLI', 'RachYO', 'TangBadVoice', '1MILL', 'MAIYARAP', 'DIAMOND MQT']
  },
  {
    id: 'preset_thai_lukthung_legend',
    title: '🌾 ลูกทุ่งอินดี้ & อีสานพันล้านวิว',
    region: 'thai',
    subtitle: 'โจอี้ ภูวศิษฐ์, มนต์แคน, ลำไย ไหทองคำ, ก้อง ห้วยไร่, ไผ่ พงศธร, ต่าย อรทัย, กระแต',
    artists: ['โจอี้ ภูวศิษฐ์', 'มนต์แคน แก่นคูน', 'ลำไย ไหทองคำ', 'ก้อง ห้วยไร่', 'ไผ่ พงศธร', 'ต่าย อรทัย', 'ตั๊กแตน ชลดา', 'เบิ้ล ปทุมราช', 'แซ็ค ชุมแพ', 'กระแต อาร์สยาม', 'จ๊ะ นงผณี', 'เบลล์ นิภาดา', 'ครูเต้ย อภิวัฒน์']
  },
  {
    id: 'preset_thai_lukthung_classics',
    title: '👑 ลูกทุ่งแท้ & มรดกลูกทุ่งไทย',
    region: 'thai',
    subtitle: 'พุ่มพวง ดวงจันทร์, สุนารี, ศิริพร อำไพพงษ์, จินตหรา, ไรอัล, มีนตรา, ยอดรัก สลักใจ',
    artists: ['พุ่มพวง ดวงจันทร์', 'สุนารี ราชสีมา', 'ศิริพร อำไพพงษ์', 'จินตหรา พูนลาภ', 'ไรอัล กาจบัณฑิต', 'มีนตรา อินทิรา', 'หญิงลี ศรีจุมพล', 'ไหมไทย หัวใจศิลป์', 'ลำเพลิน วงศกร']
  },
  {
    id: 'preset_thai_feelgood_pop',
    title: '☕ ป็อปฟีลกู๊ด & อคูสติกอบอุ่นหัวใจ',
    region: 'thai',
    subtitle: 'แสตมป์, สิงโต นำโชค, Lipta, No One Else, Sarah Salola, First Anuwat, SERIOUS BACON',
    artists: ['แสตมป์ อภิวัชร์', 'สิงโต นำโชค', 'Lipta', 'No One Else', 'Sarah Salola', 'Patrickananda', 'First Anuwat', 'Bell Supol', 'Wan Thanakrit', 'Pop Pongkool', 'Boy Peacemaker', 'SERIOUS BACON', 'Armchair', 'Superbaker']
  },
  {
    id: 'preset_thai_diva_legends',
    title: '👑 ป็อปดีว่า & ตัวพ่อตัวแม่ 90s-2000s',
    region: 'thai',
    subtitle: 'Bird Thongchai, Christina, Nicole, Mos, Jay Jetrin, Peck Palitchoke, Bie, Palmy, Tata Young',
    artists: ['Bird Thongchai', 'Christina Aguilar', 'Nicole Theriault', 'Mos Patiparn', 'Jay Jetrin', 'Peck Palitchoke', 'Bie Sukrit', 'Ice Saranyu', 'Aof Pongsak', 'Palmy', 'Endorphine', 'Tata Young', 'Ben Chalatit', 'James Ruangsak']
  },
  {
    id: 'preset_thai_y_series_boyband',
    title: '⚡ ซีรีส์วาย & T-POP บอยแบนด์สุดฮอต',
    region: 'thai',
    subtitle: 'BUS, PROXIE, ATLAS, PERSES, DICE, LYKN, GEMINI & FOURTH, DAOU & OFFROAD, Billkin, PP Krit',
    artists: ['BUS', 'PROXIE', 'ATLAS', 'PERSES', 'DICE', 'LYKN', 'GEMINI & FOURTH', 'DAOU & OFFROAD', 'Billkin', 'PP Krit', 'Nanon Korapat', 'Bright Vachirawit', 'Ice Paris']
  },
  {
    id: 'preset_thai_heavy_screamo',
    title: '🔥 ร็อกดุดัน นูเมทัล & ว๊ากสะใจ',
    region: 'thai',
    subtitle: 'Retrospect, Sweet Mullet, Ebola, Bomb At Track, The Yers, Lomosonic, Paper Planes',
    artists: ['Retrospect', 'Sweet Mullet', 'Ebola', 'Bomb At Track', 'The Yers', 'Lomosonic', 'Paper Planes', 'Taitosmith']
  },

  // ==========================================
  // 🌎 2. เพลงสากล (INTERNATIONAL) - 8 หมวด
  // ==========================================
  {
    id: 'preset_billboard_pop',
    title: '🏆 Top Billboard Pop Superstars',
    region: 'inter',
    subtitle: 'Taylor Swift, Bruno Mars, The Weeknd, Billie Eilish, Sabrina Carpenter, Olivia Rodrigo, Dua Lipa',
    artists: ['Taylor Swift', 'Bruno Mars', 'The Weeknd', 'Billie Eilish', 'Sabrina Carpenter', 'Olivia Rodrigo', 'Dua Lipa', 'Ariana Grande', 'Post Malone', 'Ed Sheeran', 'Harry Styles', 'Justin Bieber']
  },
  {
    id: 'preset_pop_divas',
    title: '💃 2000s-2010s Global Pop Queens',
    region: 'inter',
    subtitle: 'Lady Gaga, Katy Perry, Britney Spears, Miley Cyrus, Sia, Beyoncé, Adele, Kesha, Carly Rae Jepsen',
    artists: ['Lady Gaga', 'Katy Perry', 'Britney Spears', 'Miley Cyrus', 'Sia', 'Beyoncé', 'Adele', 'Kesha', 'Carly Rae Jepsen', 'Demi Lovato', 'Camila Cabello', 'Selena Gomez']
  },
  {
    id: 'preset_rock_numetal',
    title: '🎸 Rock & Alternative Stadium Anthems',
    region: 'inter',
    subtitle: 'Coldplay, Maroon 5, Imagine Dragons, Linkin Park, Queen, Bon Jovi, Oasis, Arctic Monkeys',
    artists: ['Coldplay', 'Maroon 5', 'Imagine Dragons', 'Linkin Park', 'Queen', 'Bon Jovi', 'Oasis', 'Arctic Monkeys', 'Twenty One Pilots', 'The Script', 'OneRepublic']
  },
  {
    id: 'preset_inter_hiphop',
    title: '🎧 Global Hip-Hop & Rap Titans',
    region: 'inter',
    subtitle: 'Eminem, Drake, Kendrick Lamar, Travis Scott, Post Malone, Jack Harlow, Lil Nas X, Juice WRLD',
    artists: ['Eminem', 'Drake', 'Kendrick Lamar', 'Travis Scott', 'Post Malone', 'Jack Harlow', 'Lil Nas X', 'Juice WRLD', 'XXXTENTACION', 'Nicki Minaj', 'Cardi B', 'Doja Cat', 'Megan Thee Stallion']
  },
  {
    id: 'preset_inter_edm_dance',
    title: '🪩 EDM Festival & Dance Party Hits',
    region: 'inter',
    subtitle: 'Avicii, Alan Walker, The Chainsmokers, David Guetta, Marshmello, Zedd, Clean Bandit, Pitbull',
    artists: ['Avicii', 'Alan Walker', 'The Chainsmokers', 'David Guetta', 'Marshmello', 'Zedd', 'Clean Bandit', 'Pitbull', 'Flo Rida', 'Black Eyed Peas']
  },
  {
    id: 'preset_inter_chill_indie',
    title: '☁️ Indie Pop & Chill Late Night Vibes',
    region: 'inter',
    subtitle: 'Joji, keshi, Jeremy Zucker, Daniel Caesar, Lauv, Troye Sivan, Conan Gray, Gracie Abrams, Lana Del Rey',
    artists: ['Joji', 'keshi', 'Jeremy Zucker', 'Daniel Caesar', 'Lauv', 'Troye Sivan', 'Conan Gray', 'Gracie Abrams', 'Lana Del Rey', 'SZA', 'Teddy Swims', 'Khalid', 'Sam Smith']
  },
  {
    id: 'preset_inter_boybands',
    title: '💖 2010s Boybands & Pop Heartthrobs',
    region: 'inter',
    subtitle: 'One Direction, Justin Bieber, Shawn Mendes, Charlie Puth, Harry Styles, Justin Timberlake, Usher',
    artists: ['One Direction', 'Justin Bieber', 'Shawn Mendes', 'Charlie Puth', 'Harry Styles', 'Justin Timberlake', 'Usher', 'Bruno Mars', 'Maroon 5', 'Chris Brown']
  },
  {
    id: 'preset_inter_alltime_legends',
    title: '🌟 All-Time Pop & Classic Legends',
    region: 'inter',
    subtitle: 'Michael Jackson, Queen, The Beatles, Madonna, Bon Jovi, Britney Spears, Shakira',
    artists: ['Michael Jackson', 'Queen', 'The Beatles', 'Madonna', 'Bon Jovi', 'Britney Spears', 'Shakira']
  },

  // ==========================================
  // ✨ 3. K-POP - 3 หมวด
  // ==========================================
  {
    id: 'preset_kpop_queens',
    title: '👑 K-POP ตัวแม่ & เกิร์ลกรุ๊ปทรงพลัง',
    region: 'kpop',
    subtitle: 'NewJeans, aespa, BLACKPINK, IVE, LE SSERAFIM, TWICE, (G)I-DLE, ILLIT, KISS OF LIFE',
    artists: ['NewJeans', 'aespa', 'BLACKPINK', 'IVE', 'LE SSERAFIM', 'TWICE', '(G)I-DLE', 'ILLIT', 'KISS OF LIFE', 'BABYMONSTER', 'ITZY', 'Red Velvet']
  },
  {
    id: 'preset_kpop_kings',
    title: '🔥 K-POP บอยแบนด์แถวหน้าสุดร้อนแรง',
    region: 'kpop',
    subtitle: 'BTS, Stray Kids, SEVENTEEN, ENHYPEN, RIIZE, TOMORROW X TOGETHER, EXO, NCT 127',
    artists: ['BTS', 'Stray Kids', 'SEVENTEEN', 'ENHYPEN', 'RIIZE', 'TOMORROW X TOGETHER', 'EXO', 'NCT 127', 'Jung Kook', 'ATEEZ', 'Super Junior', 'BIGBANG']
  },
  {
    id: 'preset_kpop_soloists',
    title: '✨ K-POP Soloists & World Icons',
    region: 'kpop',
    subtitle: 'ROSÉ, JENNIE, LISA, JISOO, Jung Kook, Jimin, V, IU, Taeyeon, TAEYANG, G-DRAGON, PSY',
    artists: ['ROSÉ', 'JENNIE', 'LISA', 'JISOO', 'Jung Kook', 'Jimin', 'V', 'IU', 'Taeyeon', 'TAEYANG', 'G-DRAGON', 'PSY']
  },

  // ==========================================
  // 🎌 4. Anime & J-POP - 4 หมวด
  // ==========================================
  {
    id: 'preset_anime_openings',
    title: '🔥 Anime OP มหาชนขวัญใจสายสตรีม',
    region: 'anime_jpop',
    subtitle: 'YOASOBI, LiSA, Ado, FLOW, KANA-BOON, Eve, Mrs. GREEN APPLE, SPYAIR, Kenshi Yonezu',
    artists: ['YOASOBI', 'LiSA', 'Ado', 'FLOW', 'KANA-BOON', 'Eve', 'Mrs. GREEN APPLE', 'SPYAIR', 'MAN WITH A MISSION', 'Kenshi Yonezu', 'Creepy Nuts']
  },
  {
    id: 'preset_anime_legends',
    title: '🌸 J-POP & Anime Legends',
    region: 'anime_jpop',
    subtitle: 'YOASOBI, LiSA, Ado, RADWIMPS, Kenshi Yonezu, Fujii Kaze, ONE OK ROCK, King Gnu, Vaundy',
    artists: ['YOASOBI', 'LiSA', 'Ado', 'RADWIMPS', 'Kenshi Yonezu', 'Fujii Kaze', 'ONE OK ROCK', 'King Gnu', 'Official HIGE DANdism', 'Vaundy', 'Hikaru Utada']
  },
  {
    id: 'preset_anime_shonen',
    title: '🗡️ Anime Battle & Shonen Rock',
    region: 'anime_jpop',
    subtitle: 'LiSA, FLOW, KANA-BOON, SPYAIR, Linked Horizon, SiM, TK from Ling tosite sigure, Maximum The Hormone',
    artists: ['LiSA', 'FLOW', 'KANA-BOON', 'SPYAIR', 'Linked Horizon', 'SiM', 'TK from Ling tosite sigure', 'Maximum The Hormone', 'coldrain', 'MAN WITH A MISSION', 'Asian Kung-Fu Generation']
  },
  {
    id: 'preset_modern_jrock',
    title: '🎧 Modern J-Rock & City Pop Vibes',
    region: 'anime_jpop',
    subtitle: 'YOASOBI, Ado, King Gnu, Official HIGE DANdism, Mrs. GREEN APPLE, Vaundy, Yorushika, Fujii Kaze',
    artists: ['YOASOBI', 'Ado', 'King Gnu', 'Official HIGE DANdism', 'Mrs. GREEN APPLE', 'Vaundy', 'Yorushika', 'ZUTOMAYO', 'Fujii Kaze', 'back number', 'Aimyon', 'Aimer']
  },

  // ==========================================
  // 🌐 5. Global Mega Mix - 1 หมวด
  // ==========================================
  {
    id: 'preset_ultimate_global_mix',
    title: '🌐 รวมมิตรศิลปินระดับโลก (Global Mega Mix)',
    region: 'all',
    subtitle: 'Taylor Swift, BTS, NewJeans, YOASOBI, Three Man Down, Bodyslam, Bruno Mars, Lady Gaga, LiSA',
    artists: ['Taylor Swift', 'BTS', 'NewJeans', 'YOASOBI', 'Three Man Down', 'Bodyslam', 'Bruno Mars', 'Lady Gaga', 'LiSA', 'aespa', 'The Weeknd', 'Fujii Kaze']
  }
];

let hasError = false;
EXPANDED_PRESETS.forEach(p => {
  p.artists.forEach(name => {
    if (!allNames.has(name.toLowerCase().trim())) {
      console.log(`[MISSING] Preset "${p.title}" has unknown artist: "${name}"`);
      hasError = true;
    }
  });
});

if (!hasError) {
  console.log(`✅ All ${EXPANDED_PRESETS.length} presets verified with 0 missing artists! Perfectly matches GLOBAL_ARTISTS.`);
}
