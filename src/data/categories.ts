import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  // ==========================================
  // 🔥 รวมมิตรเพลงดังยอดนิยม (Mega Hits - เพลงดังระดับปรากฏการณ์)
  // ==========================================
  {
    id: 'mega_thai_hits',
    name: 'Mega Thai Hits (100M+ Views)',
    thaiName: '🇹🇭 รวมมิตรเพลงดังไทย (100M+ วิว)',
    emoji: '🔥',
    badge: '100M+ วิว',
    description: 'รวมเฉพาะเพลงไทยยอดฮิตระดับปรากฏการณ์ ทะลุร้อยล้านวิว ร้องตามได้ทุกคน',
    region: 'thai',
    gradient: 'from-rose-600 via-amber-600 to-red-600',
    isMegaHits: true,
    searchQueries: [
      'ทรงอย่างแบด Paper Planes', 'เสแสร้ง Paper Planes', 'รักแรก นนท์ ธนนท์', 'โต๊ะริม NONT TANONT',
      'พิง นนท์ ธนนท์', 'วาดไว้ BOWKYLION', 'บานปลาย BOWKYLION', 'คิดแต่ไม่ถึง Tilly Birds',
      'ถ้าเราเจอกันอีก Tilly Birds', 'เพื่อนเล่น ไม่เล่นเพื่อน Tilly Birds', 'ถ้าเธอรักฉันจริง Three Man Down',
      'ฝนตกไหม Three Man Down', 'ข้างกัน Three Man Down', 'นะหน้าทอง โจอี้ ภูวศิษฐ์', 'ดวงเดือน โจอี้ ภูวศิษฐ์',
      'เชือกวิเศษ Labanoon', 'แพ้ทาง Labanoon', 'คุกเข่า Cocktail', 'เธอ Cocktail', 'คู่ชีวิต Cocktail',
      'ไกลแค่ไหน คือ ใกล้ Getsunova', 'คนไม่จำเป็น Getsunova', 'คนละชั้น Jaonaay', 'เลือดกรุ๊ปบี เอิ้ก ชาลิสา',
      'วัดปะหล่ะ 4EVE', 'คนไม่คุย PROXIE', 'เกินต้าน PiXXiE', 'ไม่ได้ก็ไม่เอา PiXXiE',
      'ซ่อนกลิ่น Palmy', 'คิดมาก Palmy', 'ดาวหางฮัลเลย์ fellow fellow', 'สองใจ ดา เอ็นโดรฟิน',
      'แสงสุดท้าย Bodyslam', 'ยาพิษ Bodyslam', 'คนที่ถูกรัก Bodyslam', 'ที่เดิม Potato',
      'ขอบคุณที่รักกัน Potato', 'ทิ้งไว้กลางทาง Potato', 'ขอเช็ดน้ำตา Clash', 'ใจนักเลง พงษ์พัฒน์',
      'สายตาหลอกกันไม่ได้ Ink Waruntorn', 'ลบไม่ได้ช่วยให้ลืม Ink Waruntorn', 'ดีใจด้วยนะ Ink Waruntorn',
      'แกล้ง Tattoo Colour', 'ขาหมู Tattoo Colour', 'ฤดูร้อน Paradox', 'จันทร์เจ้า Slot Machine',
      'เล่นของสูง Big Ass', 'รังเกียจกันไหม UrboyTJ', 'วายร้าย UrboyTJ', 'ถามคำ UrboyTJ',
      'พัง Indigo', 'เส้นบางๆ Indigo', 'กีฬาสี Jeff Satur', 'ลืมไปแล้วว่าลืมยังไง Jeff Satur',
      'กลิ่นดอกไม้ Newery', 'ไสว่าสิบ่ถิ่มกัน ก้อง ห้วยไร่', 'คำแพง แซ็ค ชุมแพ', 'ผู้สาวขาเลาะ ลำไย ไหทองคำ'
    ]
  },

  // ==========================================
  // 🇹🇭 หมวดหมู่เพลงไทย (Thai Music - 11 หมวด)
  // ==========================================
  {
    id: 'thai_hits',
    name: 'Thai Classic Hits',
    thaiName: 'เพลงไทยฮิตยอดนิยม',
    emoji: '🎸',
    badge: 'ยอดนิยม',
    description: 'รวมเพลงร็อกและสตริงระดับตำนานของไทย',
    region: 'thai',
    gradient: 'from-amber-600 to-red-600',
    searchQueries: [
      'Bodyslam', 'Potato', 'Cocktail', 'Getsunova', 'Labanoon', 'Clash', 'Big Ass', 'Palmy',
      'Singto Numchok', 'Stamp Apiwat', '25hours', 'Klear', 'Zeal', 'Paradox', 'Lomosonic',
      'Slot Machine', 'Nuvo', 'Micro', 'Silly Fools', 'Endorphine', 'Loso', 'Modern Dog',
      'Flure', 'Asanee Wasan', 'So Cool', 'Kala', 'Ebola', 'Blackhead', 'Taxi', 'Polycat'
    ]
  },
  {
    id: 'tpop_indie',
    name: 'T-POP & Modern Wave',
    thaiName: 'T-POP & ไอดอลคลื่นลูกใหม่',
    emoji: '✨',
    badge: 'ฮิตติดกระแส',
    description: 'ทีป็อป บอยแบนด์ เกิร์ลกรุ๊ป และเพลงฮิตติดกระแส',
    region: 'thai',
    gradient: 'from-pink-500 to-purple-600',
    searchQueries: [
      'Three Man Down', 'Tilly Birds', 'Jeff Satur', 'NONT TANONT', 'Bowkylion', 'Ink Waruntorn',
      'Fellow Fellow', 'PROXIE', '4EVE', 'PiXXiE', 'PERSES', 'LYKN', 'BUS', 'DICE', 'ATLAS',
      'bamm', 'Paper Planes', 'The TOYS', 'URBOYTJ', 'Billkin', 'PP Krit', 'Serious Bacon',
      'Violette Wautier', 'Zom Marie'
    ]
  },
  {
    id: 'thai_indie',
    name: 'Thai Indie & Synthpop',
    thaiName: 'อินดี้ไทย & ซินธ์ป็อป',
    emoji: '🌙',
    badge: 'ฟังสบาย',
    description: 'เพลงอินดี้ไทยฟังสบาย บรรยากาศคาเฟ่และซินธ์ไนท์',
    region: 'thai',
    gradient: 'from-indigo-500 to-blue-600',
    searchQueries: [
      'Safeplanet', 'Dept', 'HYBS', "Zweed n' Roll", 'เรนิษรา', "AYLA's", 'Anatomy Rabbit',
      'Mirrr', 'Fellow Fellow', 'Polycat', 'Scrubb', 'Whal & Dolph', 'YENTED', 'The TOYS',
      'PURPEECH', 'YourMOOD', 'Landokmai', 'Television Off', 'guncharlie', 'SOYBAD',
      'Blackbeans', 'Moving and Cut', 'Loserpop', 'Uncle Ben'
    ]
  },
  {
    id: 'thai_rock_2000s',
    name: 'Thai Rock 2000s',
    thaiName: 'ร็อกไทย 2000s โดดสุดตัว',
    emoji: '🤘',
    badge: 'ร็อกมันส์ๆ',
    description: 'ร็อกยุค 2000s มันส์สะใจ โดดสุดตัว ร้องตามได้ทุกท่อน',
    region: 'thai',
    gradient: 'from-red-600 to-orange-600',
    searchQueries: [
      'Bodyslam', 'Potato', 'Cocktail', 'Clash', 'Big Ass', 'The Richman Toy', 'Labanoon',
      'Getsunova', 'Klear', 'Zeal', '25hours', 'So Cool', 'Kala', 'Paradox', 'Slot Machine',
      'Dr.Fuu', 'Silly Fools', 'Loso', 'Ebola', 'Blackhead', 'Hangman'
    ]
  },
  {
    id: 'y2k_90s',
    name: 'Kamikaze & Y2K Pop',
    thaiName: 'วัยรุ่นกามิกาเซ่ & Y2K',
    emoji: '📼',
    badge: 'ย้อนวัยหวาน',
    description: 'เพลงฮิตวัยรุ่น Kamikaze และเพลงป็อปยุค 90s-2000s',
    region: 'thai',
    gradient: 'from-emerald-600 to-teal-700',
    searchQueries: [
      'Four Mod', 'K-OTIC', 'Waii', '3.2.1', 'Faye Fang Kaew', 'Knomjean', 'Timethai',
      'Golf Mike', 'Dan & Beam', 'D2B', 'Girly Berry', 'Neko Jump', 'China Dolls',
      'Katreeya English', 'Raptor', 'Boyscout', 'C-Quint', 'Chin Chinawut', 'Ice Saranyu', 'Bie Sukrit'
    ]
  },
  {
    id: 'thai_hiphop',
    name: 'Thai Hip-Hop & Rap',
    thaiName: 'ฮิปฮอป & แร็ปไทย',
    emoji: '🕶️',
    badge: 'แร็ปดุ',
    description: 'เพลงแร็ป ฮิปฮอป และ Trap ยอดฮิตของเมืองไทย',
    region: 'thai',
    gradient: 'from-zinc-700 to-stone-900',
    searchQueries: [
      'YOUNGOHM', 'illslick', 'UrboyTJ', 'AUTTA', 'GAVIN:D', 'SURIYA MQT', 'P6ICK', 'BLVCKHEART',
      'SPRITE', 'F.HERO', 'SARAN', 'D GERRARD', 'Twopee Southside', 'LAZYLOXY', 'MILLI',
      'RachYO', 'TangBadVoice', '1MILL', 'MAIYARAP', 'DIAMOND MQT', 'WONDERFRAME', 'OG-ANIC'
    ]
  },
  {
    id: 'lukthung_indie',
    name: 'Thai Country & Isan Hits',
    thaiName: 'ลูกทุ่งอินดี้ & อีสานร้อยล้านวิว',
    emoji: '🌾',
    badge: 'ม่วนหลาย',
    description: 'ลูกทุ่งอินดี้อีสานและเพลงม่วนซื่นยอดวิวสูงสุด',
    region: 'thai',
    gradient: 'from-yellow-600 to-amber-700',
    searchQueries: [
      'โจอี้ ภูวศิษฐ์', 'มนต์แคน แก่นคูน', 'ลำไย ไหทองคำ', 'ก้อง ห้วยไร่', 'ไผ่ พงศธร', 'ต่าย อรทัย',
      'ตั๊กแตน ชลดา', 'เบิ้ล ปทุมราช', 'แซ็ค ชุมแพ', 'กระแต อาร์สยาม', 'จ๊ะ นงผณี', 'เบลล์ นิภาดา',
      'ครูเต้ย อภิวัฒน์', 'มีนตรา อินทิรา', 'ลำเพลิน วงศกร'
    ]
  },
  {
    id: 'lukthung_lifesong',
    name: 'Classic Country & Life Songs',
    thaiName: 'ลูกทุ่งแท้ & เพื่อชีวิตอมตะ',
    emoji: '👑',
    badge: 'ตำนาน',
    description: 'มรดกเพลงลูกทุ่งแท้และเพลงเพื่อชีวิตระดับตำนาน',
    region: 'thai',
    gradient: 'from-amber-700 to-yellow-800',
    searchQueries: [
      'พุ่มพวง ดวงจันทร์', 'สุนารี ราชสีมา', 'ศิริพร อำไพพงษ์', 'จินตหรา พูนลาภ', 'ยอดรัก สลักใจ',
      'ไรอัล กาจบัณฑิต', 'คาราบาว', 'พงษ์สิทธิ์ คำภีร์', 'เสก โลโซ', 'ป้าง นครินทร์',
      'มาลีฮวนน่า', 'อัสนี วสันต์', 'หินเหล็กไฟ', 'วงฟลาย (Fly)'
    ]
  },
  {
    id: 'thai_feelgood',
    name: 'Feel-Good Pop & Acoustic',
    thaiName: 'ป็อปฟีลกู๊ด & อคูสติกอบอุ่น',
    emoji: '☕',
    badge: 'ฟีลกู๊ด',
    description: 'ป็อปอบอุ่น ฟังสบาย เหมาะกับคนคลั่งรัก อารมณ์ดี',
    region: 'thai',
    gradient: 'from-rose-400 to-orange-400',
    searchQueries: [
      'แสตมป์ อภิวัชร์', 'สิงโต นำโชค', 'Zom Marie', 'TWO Popetorn', 'Lipta', 'No One Else',
      'Sarah Salola', 'Patrickananda', 'First Anuwat', 'Bell Supol', 'Wan Thanakrit',
      'Pop Pongkool', 'Boy Peacemaker', 'SERIOUS BACON', 'Armchair', 'Superbaker',
      'Room39', 'Wanyai', 'WhatChaRaWaLee', 'Atom Chanakan', 'Oat Pramote'
    ]
  },
  {
    id: 'thai_diva',
    name: 'Thai Divas & 90s-2000s',
    thaiName: 'ดีว่า & ตัวแม่เพลงเศร้า 90s-2000s',
    emoji: '🎤',
    badge: 'กินใจ',
    description: 'เพลงป็อปอกหักและเสียงร้องทรงพลังระดับดีว่าไทย',
    region: 'thai',
    gradient: 'from-fuchsia-600 to-pink-600',
    searchQueries: [
      'Bird Thongchai', 'New & Jiew', 'Christina Aguilar', 'Nicole Theriault', 'Mos Patiparn',
      'Ploychompoo', 'Jay Jetrin', 'Peck Palitchoke', 'Bie Sukrit', 'Ice Saranyu',
      'Aof Pongsak', 'Palmy', 'Endorphine', 'Tata Young', 'Ben Chalatit', 'James Ruangsak'
    ]
  },
  {
    id: 'thai_heavy_rock',
    name: 'Heavy Rock & Metal',
    thaiName: 'ร็อกว๊าก & นูเมทัลไทย',
    emoji: '🔥',
    badge: 'ว๊ากสะใจ',
    description: 'สายว๊าก เมทัล และร็อกหนักแน่นสะใจ',
    region: 'thai',
    gradient: 'from-red-800 to-zinc-900',
    searchQueries: [
      'Retrospect', 'Sweet Mullet', 'Ebola', 'Lomosonic', 'Taitosmith', 'Little John',
      'Bomb at Track', 'Oblivious', 'The Yers', 'Silly Fools', 'Blackhead'
    ]
  },

  // ==========================================
  // 🌎 หมวดหมู่เพลงสากล (International)
  // ==========================================
  {
    id: 'mega_inter_hits',
    name: 'Global Mega Hits (Billion Views)',
    thaiName: '🌐 รวมมิตรเพลงดังสากล (พันล้านวิว)',
    emoji: '💎',
    badge: 'พันล้านวิว',
    description: 'รวมเฉพาะเพลงสากลระดับประวัติศาสตร์ มียอดวิวและสตรีมทะลุพันล้าน',
    region: 'inter',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    isMegaHits: true,
    searchQueries: [
      'Shape of You Ed Sheeran', 'The Weeknd Blinding Lights', 'Stay The Kid LAROI',
      'As It Was Harry Styles', 'Uptown Funk Bruno Mars', 'See You Again Wiz Khalifa',
      'Sugar Maroon 5', 'Counting Stars OneRepublic', 'Something Just Like This The Chainsmokers',
      'Closer The Chainsmokers', 'Bad Guy Billie Eilish', 'Levitating Dua Lipa',
      'Cruel Summer Taylor Swift', 'Flowers Miley Cyrus', 'Starboy The Weeknd',
      'Believer Imagine Dragons', 'Radioactive Imagine Dragons', 'Demons Imagine Dragons',
      'Someone You Loved Lewis Capaldi', 'Rolling in the Deep Adele', 'Hello Adele',
      'Thinking Out Loud Ed Sheeran', 'Perfect Ed Sheeran', '7 Rings Ariana Grande',
      'Thank U Next Ariana Grande', 'Watermelon Sugar Harry Styles', 'drivers license Olivia Rodrigo',
      'Good 4 U Olivia Rodrigo', 'Save Your Tears The Weeknd', 'Just the Way You Are Bruno Mars',
      'Wake Me Up Avicii', 'Faded Alan Walker', 'Happier Marshmello',
      'Love Yourself Justin Bieber', 'Sorry Justin Bieber', 'Peaches Justin Bieber',
      'Sunflower Post Malone', 'Circles Post Malone', 'vampire Olivia Rodrigo',
      'Attention Charlie Puth', 'We Don\'t Talk Anymore Charlie Puth', 'Treat You Better Shawn Mendes',
      'Señorita Shawn Mendes', 'Shallow Lady Gaga', 'Bad Romance Lady Gaga',
      'Viva La Vida Coldplay', 'Yellow Coldplay', 'The Scientist Coldplay',
      'Old Town Road Lil Nas X', 'Cheap Thrills Sia', 'Riptide Vance Joy'
    ]
  },
  {
    id: 'inter_pop',
    name: 'Global Billboard Hits',
    thaiName: 'เพลงสากล Billboard Hot 100',
    emoji: '🎧',
    badge: 'ระดับโลก',
    description: 'เพลงสากลยอดฮิตติดชาร์ต Billboard ระดับโลก',
    region: 'inter',
    gradient: 'from-blue-600 to-indigo-700',
    searchQueries: [
      'Taylor Swift', 'Bruno Mars', 'The Weeknd', 'Billie Eilish', 'Sabrina Carpenter',
      'Ed Sheeran', 'Ariana Grande', 'Coldplay', 'Maroon 5', 'Dua Lipa', 'Adele',
      'Justin Bieber', 'Drake', 'Post Malone', 'Olivia Rodrigo', 'Harry Styles',
      'Shawn Mendes', 'Charlie Puth', 'Sam Smith'
    ]
  },
  {
    id: 'inter_queens',
    name: 'Global Pop Queens',
    thaiName: 'Global Pop Queens',
    emoji: '👑',
    badge: 'ตัวแม่สากล',
    description: 'ตัวแม่เพลงป็อปสากล ฮิตติดหูและทรงพลังระดับโลก',
    region: 'inter',
    gradient: 'from-pink-600 to-rose-700',
    searchQueries: [
      'Taylor Swift', 'Billie Eilish', 'Sabrina Carpenter', 'Dua Lipa', 'Ariana Grande',
      'Lady Gaga', 'Katy Perry', 'Beyoncé', 'Rihanna', 'Olivia Rodrigo', 'Adele',
      'Britney Spears', 'Miley Cyrus', 'Sia', 'Camila Cabello', 'Selena Gomez', 'Lana Del Rey'
    ]
  },
  {
    id: 'inter_rock',
    name: 'Stadium Rock & Alternative',
    thaiName: 'Stadium Rock & Alternative',
    emoji: '🎸',
    badge: 'ร็อกสากล',
    description: 'ร็อกสากล อัลเทอร์เนทีฟ และเพลงฮิตสเตเดียมระดับตำนาน',
    region: 'inter',
    gradient: 'from-cyan-600 to-blue-800',
    searchQueries: [
      'Coldplay', 'Imagine Dragons', 'Linkin Park', 'Maroon 5', 'Queen', 'Oasis',
      'Green Day', 'OneRepublic', 'Arctic Monkeys', 'Twenty One Pilots', 'The Killers',
      'Panic! At The Disco', 'My Chemical Romance', 'Fall Out Boy', 'Bon Jovi', 'Nirvana'
    ]
  },
  {
    id: 'inter_edm',
    name: 'EDM & Festival Party',
    thaiName: 'EDM & Festival Party',
    emoji: '🪩',
    badge: 'ปาร์ตี้',
    description: 'เพลงแดนซ์ อีดีเอ็ม และเพลงตื๊ดเปิดในมิวสิกเฟสติวัล',
    region: 'inter',
    gradient: 'from-violet-600 to-purple-800',
    searchQueries: [
      'Avicii', 'The Chainsmokers', 'Alan Walker', 'David Guetta', 'Marshmello',
      'Calvin Harris', 'Martin Garrix', 'DJ Snake', 'Zedd', 'Kygo', 'Major Lazer',
      'Tiësto', 'Swedish House Mafia', 'Alesso'
    ]
  },

  // ==========================================
  // 🇰🇷 หมวดหมู่ K-POP
  // ==========================================
  {
    id: 'mega_kpop_hits',
    name: 'K-Pop Mega Hits (Iconic Anthems)',
    thaiName: '🇰🇷 รวมมิตรเพลงดังเกาหลี (เพลงชาติ K-Pop)',
    emoji: '👑',
    badge: 'เพลงชาติ K-Pop',
    description: 'รวมเฉพาะเพลงเคป็อปฮิตติดหูระดับตำนาน ที่เปิดท่อนฮุกที่ไหนทุกคนต้องรู้จัก',
    region: 'kpop',
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    isMegaHits: true,
    searchQueries: [
      'Dynamite BTS', 'Butter BTS', 'Boy With Luv BTS', 'Blood Sweat & Tears BTS',
      'DDU-DU DDU-DU BLACKPINK', 'Kill This Love BLACKPINK', 'How You Like That BLACKPINK',
      'Pink Venom BLACKPINK', 'As If It\'s Your Last BLACKPINK', 'Hype Boy NewJeans',
      'Ditto NewJeans', 'OMG NewJeans', 'Super Shy NewJeans', 'Attention NewJeans',
      'Next Level aespa', 'Supernova aespa', 'Drama aespa', 'Spicy aespa',
      'LOVE DIVE IVE', 'After LIKE IVE', 'I AM IVE', 'ELEVEN IVE',
      'ANTIFRAGILE LE SSERAFIM', 'EASY LE SSERAFIM', 'Perfect Night LE SSERAFIM',
      'What is Love? TWICE', 'Cheer Up TWICE', 'TT TWICE', 'Fancy TWICE',
      'Queencard (G)I-DLE', 'TOMBOY (G)I-DLE', 'Super Lady (G)I-DLE',
      'God\'s Menu Stray Kids', 'Maniac Stray Kids', 'S-Class Stray Kids',
      'Super SEVENTEEN', 'HOT SEVENTEEN', 'Very NICE SEVENTEEN',
      'WANNABE ITZY', 'DALLA DALLA ITZY', 'Psycho Red Velvet', 'Bad Boy Red Velvet',
      'Love Scenario iKON', 'BANG BANG BANG BIGBANG', 'FANTASTIC BABY BIGBANG',
      'Growl EXO', 'Love Shot EXO', 'Magnetic ILLIT', 'SHEESH BABYMONSTER',
      'Cupid FIFTY FIFTY', 'Gangnam Style PSY'
    ]
  },
  {
    id: 'kpop',
    name: 'K-POP Mega Hits',
    thaiName: 'K-POP Mega Hits',
    emoji: '💖',
    badge: 'เคป็อปฟีเวอร์',
    description: 'เพลงเกิร์ลกรุ๊ปและบอยแบนด์เกาหลียอดนิยมทั่วโลก',
    region: 'kpop',
    gradient: 'from-purple-600 to-violet-800',
    searchQueries: [
      'NewJeans', 'aespa', 'BLACKPINK', 'BTS', 'IVE', 'LE SSERAFIM', 'TWICE',
      'Stray Kids', 'SEVENTEEN', '(G)I-DLE', 'BABYMONSTER', 'ILLIT', 'RIIZE',
      'ZEROBASEONE', 'EXO', 'Red Velvet', 'ITZY', 'NCT 127', 'TOMORROW X TOGETHER', 'ENHYPEN'
    ]
  },
  {
    id: 'kpop_queens',
    name: 'K-POP Girl Groups',
    thaiName: 'K-POP Girl Groups ตัวแม่',
    emoji: '💃',
    badge: 'เกิร์ลกรุ๊ป',
    description: 'รวมเพลงเกิร์ลกรุ๊ปเกาหลีสุดปังทุกเจนเนอเรชัน',
    region: 'kpop',
    gradient: 'from-pink-500 to-fuchsia-700',
    searchQueries: [
      'BLACKPINK', 'NewJeans', 'aespa', 'IVE', 'TWICE', 'LE SSERAFIM', '(G)I-DLE',
      'Red Velvet', 'ITZY', "Girls' Generation", '2NE1', 'BABYMONSTER', 'ILLIT',
      'MAMAMOO', 'NMIXX', 'FIFTY FIFTY', 'IZ*ONE'
    ]
  },
  {
    id: 'kpop_kings',
    name: 'K-POP Boy Groups',
    thaiName: 'K-POP Boy Groups ตัวท็อป',
    emoji: '🕺',
    badge: 'บอยแบนด์',
    description: 'บอยแบนด์เกาหลีเพอร์ฟอร์แมนซ์สุดโหดและเพลงฮิตติดหู',
    region: 'kpop',
    gradient: 'from-blue-600 to-indigo-800',
    searchQueries: [
      'BTS', 'Stray Kids', 'SEVENTEEN', 'NCT 127', 'NCT DREAM', 'TOMORROW X TOGETHER',
      'ENHYPEN', 'EXO', 'BIGBANG', 'TREASURE', 'RIIZE', 'ZEROBASEONE', 'GOT7', 'iKON', 'SHINee'
    ]
  },

  // ==========================================
  // 🎌 หมวดหมู่ Anime & J-POP (2 หมวด)
  // ==========================================
  {
    id: 'anime_jpop',
    name: 'Anime & J-POP',
    thaiName: 'Anime & J-POP Top Tracks',
    emoji: '🌸',
    badge: 'อนิเมะฮิต',
    description: 'เพลงประกอบอนิเมะและเพลงเจป็อปยอดฮิตติดชาร์ต',
    region: 'anime_jpop',
    gradient: 'from-rose-500 to-red-600',
    searchQueries: [
      'YOASOBI', 'LiSA', 'Kenshi Yonezu', 'Ado', 'Radwimps', 'King Gnu',
      'Official HIGE DANdism', 'Eve', 'Vaundy', 'Aimyon', 'Fujii Kaze',
      'ONE OK ROCK', 'Aimer', 'milet', 'Yuuri', 'Creepy Nuts', 'Mrs. GREEN APPLE'
    ]
  },
  {
    id: 'anime_rock',
    name: 'Modern J-Rock & Shonen',
    thaiName: 'Modern J-Rock & Shonen',
    emoji: '⚡',
    badge: 'เจร็อก',
    description: 'ร็อกญี่ปุ่นสุดเดือด มันส์สะใจสไตล์การ์ตูนโชเน็น',
    region: 'anime_jpop',
    gradient: 'from-amber-600 to-red-700',
    searchQueries: [
      'ONE OK ROCK', 'King Gnu', 'SPYAIR', 'FLOW', 'MAN WITH A MISSION',
      'coldrain', 'SiM', 'Survive Said The Prophet', 'Maximum The Hormone',
      'Asian Kung-Fu Generation', 'Linked Horizon', 'KANA-BOON', 'TK from Ling tosite sigure'
    ]
  },

  // ==========================================
  // 🎲 หมวดหมู่สุ่มรวมทุกแนวเพลง (Special Mix)
  // ==========================================
  {
    id: 'mega_all_stars',
    name: 'All-Stars Mega Hits (Ultimate Mix)',
    thaiName: '🌟 รวมมิตรเพลงดังทุกชาติ (All-Stars Mega Hits)',
    emoji: '🏆',
    badge: 'รวมเพลงดังที่สุด',
    description: 'รวมเฉพาะสุดยอดเพลงดังระดับโลกและเพลงไทย ไม่มีเพลงเงียบ ทุกเพลงคือที่สุดของวงการ',
    region: 'all',
    gradient: 'from-amber-500 via-rose-500 to-indigo-600',
    isMegaHits: true,
    searchQueries: [
      // Thai Mega Hits
      'ทรงอย่างแบด Paper Planes', 'รักแรก นนท์ ธนนท์', 'โต๊ะริม NONT TANONT', 'วาดไว้ BOWKYLION',
      'คิดแต่ไม่ถึง Tilly Birds', 'เชือกวิเศษ Labanoon', 'คุกเข่า Cocktail', 'ไกลแค่ไหน คือ ใกล้ Getsunova',
      'นะหน้าทอง โจอี้ ภูวศิษฐ์', 'แสงสุดท้าย Bodyslam', 'ขอบคุณที่รักกัน Potato', 'วัดปะหล่ะ 4EVE',
      'คนไม่คุย PROXIE', 'ซ่อนกลิ่น Palmy', 'ดาวหางฮัลเลย์ fellow fellow', 'สองใจ ดา เอ็นโดรฟิน',
      'ถ้าเธอรักฉันจริง Three Man Down', 'พิง นนท์ ธนนท์', 'สายตาหลอกกันไม่ได้ Ink Waruntorn',
      // Inter Mega Hits
      'Shape of You Ed Sheeran', 'The Weeknd Blinding Lights', 'Stay The Kid LAROI', 'As It Was Harry Styles',
      'Uptown Funk Bruno Mars', 'See You Again Wiz Khalifa', 'Sugar Maroon 5', 'Bad Guy Billie Eilish',
      'Levitating Dua Lipa', 'Cruel Summer Taylor Swift', 'Flowers Miley Cyrus', 'Believer Imagine Dragons',
      'Someone You Loved Lewis Capaldi', 'Sunflower Post Malone', 'Counting Stars OneRepublic', 'Wake Me Up Avicii',
      'Rolling in the Deep Adele', 'Starboy The Weeknd', 'Just the Way You Are Bruno Mars',
      // K-Pop Mega Hits
      'Dynamite BTS', 'Butter BTS', 'DDU-DU DDU-DU BLACKPINK', 'How You Like That BLACKPINK',
      'Hype Boy NewJeans', 'Ditto NewJeans', 'Supernova aespa', 'Next Level aespa',
      'LOVE DIVE IVE', 'ANTIFRAGILE LE SSERAFIM', 'What is Love? TWICE', 'Queencard (G)I-DLE',
      'God\'s Menu Stray Kids', 'Love Scenario iKON', 'BANG BANG BANG BIGBANG', 'Gangnam Style PSY'
    ]
  },
  {
    id: 'all_stars',
    name: 'Random Mega Mix',
    thaiName: 'สุ่มรวมมิตรทุกแนวเพลง',
    emoji: '🎲',
    badge: 'ท้าทายสุดๆ',
    description: 'รวมเพลงฮิตทุกแนวเพลงแบบสุ่มความท้าทาย',
    region: 'all',
    gradient: 'from-orange-500 to-amber-600',
    searchQueries: [
      // Thai Rock & Alternative
      'Bodyslam', 'Potato', 'Clash', 'Big Ass', 'Labanoon', 'Cocktail', 'Tilly Birds',
      'Three Man Down', 'TaitosmitH', 'Little John', 'Slot Machine', 'Safeplanet', 'Dept', 'Anatomy Rabbit',
      'Loso', 'Silly Fools', 'Paradox', 'Palmy',
      // Thai Pop, R&B & T-Pop
      'Jeff Satur', 'NONT TANONT', 'Billkin', 'PP Krit', 'Bowkylion', 'Violette Wautier',
      'INK WARUNTORN', 'THE TOYS', 'Stamp Apiwat', '4EVE', 'PROXIE', 'BUS because of you i shine',
      'PERSES', 'LYKN', 'NuNew', 'Fellow Fellow', 'URBOYTJ',
      // Thai Country, Folk & Luk Thung
      'มนต์แคน แก่นคูน', 'ไผ่ พงศธร', 'ลำไย ไหทองคำ', 'คาราบาว', 'ต่าย อรทัย',
      'จินตหรา พูนลาภ', 'ก้อง ห้วยไร่', 'เบิ้ล ปทุมราช',
      // International Pop & Rock
      'Taylor Swift', 'Bruno Mars', 'The Weeknd', 'Billie Eilish', 'Coldplay', 'Maroon 5',
      'Ed Sheeran', 'Ariana Grande', 'Dua Lipa', 'Justin Bieber', 'Post Malone',
      'Olivia Rodrigo', 'Lady Gaga', 'Imagine Dragons', 'Queen', 'Adele', 'Charlie Puth',
      // K-Pop
      'BTS', 'BLACKPINK', 'NewJeans', 'TWICE', 'Stray Kids', 'aespa', 'SEVENTEEN',
      'IVE', 'LE SSERAFIM', 'BABYMONSTER', 'ENHYPEN', 'ITZY',
      // J-Pop & Anime
      'YOASOBI', 'LiSA', 'Official HIGE DANDism', 'Ado', 'Kenshi Yonezu', 'Mrs. GREEN APPLE',
      'Vaundy', 'ONE OK ROCK', 'RADWIMPS', 'King Gnu', 'Fujii Kaze'
    ]
  }
];
