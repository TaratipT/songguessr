export type ArtistRegion = 'thai' | 'inter' | 'kpop' | 'anime_jpop';

export interface GlobalArtist {
  id: string;
  name: string;
  region: ArtistRegion;
  regionLabel: string;
  genreLabel?: string;
  emoji: string;
  hitsHint: string;
  storefront: 'TH' | 'US' | 'KR' | 'JP';
  itunesArtistId?: number;
}

export const GLOBAL_ARTISTS: GlobalArtist[] = [
  // =========================================================================
  // 1. 🇹🇭 ศิลปินไทย (THAI ARTISTS) - 52
  // =========================================================================
  {
    id: 'bodyslam',
    name: 'Bodyslam',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก',
    emoji: '🎸',
    hitsHint: 'ความรัก, แสงสุดท้าย, ยาพิษ, เรือเล็กควรออกจากฝั่ง',
    storefront: 'TH'
  },
  {
    id: 'three_man_down',
    name: 'Three Man Down',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก',
    emoji: '🌧️',
    hitsHint: 'ฝนตกไหม, ถ้าเธอรักฉันจริง, ข้างกัน, วันเกิดฉันปีนี้',
    storefront: 'TH'
  },
  {
    id: 'potato',
    name: 'Potato',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก/ป็อป',
    emoji: '🥔',
    hitsHint: 'ทิ้งไว้กลางทาง, ขอบคุณที่รักกัน, ที่เดิม, เพียงพอ',
    storefront: 'TH'
  },
  {
    id: 'tilly_birds',
    name: 'Tilly Birds',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อัลเทอร์เนทีฟ',
    emoji: '🦅',
    hitsHint: 'คิด(แต่ไม่)ถึง, เพื่อนเล่น ไม่เล่นเพื่อน, ถ้าเราเจอกันอีก',
    storefront: 'TH'
  },
  {
    id: 'jeff_satur',
    name: 'Jeff Satur',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อาร์แอนด์บี',
    emoji: '🪐',
    hitsHint: 'ลืมไปแล้วว่าลืมยังไง, ซ่อน(ไม่)หา, Fade, แค่เธอ',
    storefront: 'TH'
  },
  {
    id: 'nont_tanont',
    name: 'NONT TANONT',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป',
    emoji: '👓',
    hitsHint: 'โต๊ะริม, รักแรก, วันครบเลิก, ทุกนาทีที่สวยงาม',
    storefront: 'TH'
  },
  {
    id: 'bowkylion',
    name: 'Bowkylion',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อินดี้',
    emoji: '🦁',
    hitsHint: 'วาดไว้, บานปลาย, ลงใจ, ทราบแล้วเปลี่ยน',
    storefront: 'TH'
  },
  {
    id: 'ink_waruntorn',
    name: 'Ink Waruntorn',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ซินธ์ป็อป',
    emoji: '🌸',
    hitsHint: 'สายตาหลอกกันไม่ได้, ดีใจด้วยนะ, ลบไม่ได้ช่วยให้ลืม, อยากเริ่มต้นใหม่กับคนเดิม',
    storefront: 'TH'
  },
  {
    id: 'palmy',
    name: 'Palmy',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/โฟล์ก',
    emoji: '🌿',
    hitsHint: 'ซ่อนกลิ่น, คิดมาก, อยากร้องดังดัง, แปดโมงเช้าวันอังคาร',
    storefront: 'TH'
  },
  {
    id: 'cocktail',
    name: 'Cocktail',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก',
    emoji: '🍸',
    hitsHint: 'คุกเข่า, เธอ, ดึงดัน, คู่ชีวิต',
    storefront: 'TH'
  },
  {
    id: 'getsunova',
    name: 'Getsunova',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก',
    emoji: '🌙',
    hitsHint: 'ไกลแค่ไหน คือ ใกล้, คนไม่จำเป็น, อยู่ตรงนี้ นานกว่านี้',
    storefront: 'TH'
  },
  {
    id: 'labanoon',
    name: 'Labanoon',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก',
    emoji: '🎸',
    hitsHint: 'เชือกวิเศษ, แพ้ทาง, ยาม, 191',
    storefront: 'TH'
  },
  {
    id: 'clash',
    name: 'Clash',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก',
    emoji: '⚡',
    hitsHint: 'ขอเช็ดน้ำตา, โรคประจำตัว, เธอจะอยู่กับฉันตลอดไป',
    storefront: 'TH'
  },
  {
    id: 'big_ass',
    name: 'Big Ass',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก',
    emoji: '🔥',
    hitsHint: 'เล่นของสูง, ก่อนตาย, ข่มใจ, เกิดมาแค่รักกัน',
    storefront: 'TH'
  },
  {
    id: '4eve',
    name: '4EVE',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP เกิร์ลกรุ๊ป',
    emoji: '✨',
    hitsHint: 'วัดปะหล่ะ?, หยดน้ำตา, ข้อยยกเว้น, I LIKE BOYS',
    storefront: 'TH'
  },
  {
    id: 'pixxie',
    name: 'PiXXiE',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP เกิร์ลกรุ๊ป',
    emoji: '🧚',
    hitsHint: 'ไม่ได้ก็ไม่เอา, มูเตลู, เกินต้าน, DEJAYOU',
    storefront: 'TH'
  },
  {
    id: 'proxie',
    name: 'PROXIE',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP บอยแบนด์',
    emoji: '🕺',
    hitsHint: 'คนไม่คุย, ที่รักของใครสักคน, ตบปาก',
    storefront: 'TH'
  },
  {
    id: 'bus_because_of_you_shine',
    name: 'BUS',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP บอยแบนด์',
    emoji: '🚌',
    hitsHint: 'Because of You, Shine, ฟิลลิ่งแบบว่าอูว์, แค่ไหนแค่นั้น',
    storefront: 'TH'
  },
  {
    id: 'billkin',
    name: 'Billkin',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/บัลลาด',
    emoji: '🎭',
    hitsHint: 'โคตรพิเศษ, แปลไม่ออก, กีดกัน, ชอบตัวเองตอนอยู่กับเธอ',
    storefront: 'TH'
  },
  {
    id: 'pp_krit',
    name: 'PP Krit',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป',
    emoji: '✨',
    hitsHint: 'FIRE BOY, ลังเล, หรูเหรา, ไม่ปล่อยมือ',
    storefront: 'TH'
  },
  {
    id: 'the_toys',
    name: 'The TOYS',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🧸',
    hitsHint: 'หน้าหนาวที่แล้ว, ก่อนฤดูฝน, ลาลาลอย, เมะ',
    storefront: 'TH'
  },
  {
    id: 'safeplanet',
    name: 'Safeplanet',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🪐',
    hitsHint: 'คำตอบ, ข้างกาย, เพียงเธอ, กอดความเจ็บปวด, พอง',
    storefront: 'TH'
  },
  {
    id: 'dept',
    name: 'Dept',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '☕',
    hitsHint: '17, ไม่ได้โม้, คลั่งรัก, ทำได้หรือเปล่า, เพราะเธอหรือเปล่า',
    storefront: 'TH'
  },
  {
    id: 'purpeech',
    name: 'PURPEECH',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🍑',
    hitsHint: 'ตอนเธอไม่อยู่, ทักครับ, ภาพถ่ายวันวาน',
    storefront: 'TH'
  },
  {
    id: 'yourmood',
    name: 'YourMOOD',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '⛅',
    hitsHint: 'เพื่อนที่ดี, ลาก่อน, คนดวงดี, กลัวเมีย',
    storefront: 'TH'
  },
  {
    id: 'qler',
    name: 'QLER',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '📷',
    hitsHint: 'จีบอยู่เผื่อไม่รู้, รูปถ่าย, พะวง, ธันวาคม',
    storefront: 'TH'
  },
  {
    id: 'txrbo',
    name: 'Txrbo',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อาร์แอนด์บี',
    emoji: '🌊',
    hitsHint: 'เหลี่ยมจัด, จำเลยรัก, น้ำโขง, เจ้าความรัก',
    storefront: 'TH'
  },
  {
    id: 'bell_warisara',
    name: 'Bell Warisara',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP / คิวท์ป็อป',
    emoji: '🖊️',
    hitsHint: 'เอาปากกามาวง, คนหรือไมโครเวฟ, ยิ้มแย้ม',
    storefront: 'TH'
  },
  {
    id: 'bedroom_audio',
    name: 'Bedroom Audio',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ร็อก',
    emoji: '🛏️',
    hitsHint: 'ไม่บอกเธอ, รักมือสอง, กอดไม่ได้, เพลงที่เธอไม่ฟัง',
    storefront: 'TH'
  },
  {
    id: 'anatomy_rabbit',
    name: 'Anatomy Rabbit',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป / ดรีมป็อป',
    emoji: '🐇',
    hitsHint: 'ขอให้เธอโชคดี, ออกมายัง, Extraordinary, U drink I drive',
    storefront: 'TH'
  },
  {
    id: 'zentyarb',
    name: 'Zentyarb',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อินดี้',
    emoji: '🌿',
    hitsHint: 'เรายังคู่กัน, คิดถึงน้า, ลมหายใจ, หลงทาง',
    storefront: 'TH'
  },
  {
    id: 'fellow_fellow',
    name: 'Fellow Fellow',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / อคูสติก',
    emoji: '🧸',
    hitsHint: 'ดาวหางฮัลเลย์, เมษา, ไม่เปลี่ยนเลย, ไม่สนิทบิดหมด',
    storefront: 'TH'
  },
  {
    id: 'paper_planes',
    name: 'Paper Planes',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก/อีโม',
    emoji: '✈️',
    hitsHint: 'ทรงอย่างแบด, เสแสร้ง, ชัดเจน',
    storefront: 'TH'
  },
  {
    id: 'urboytj',
    name: 'UrboyTJ',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป / ทีป็อป',
    emoji: '🧢',
    hitsHint: 'เค้าก่อน, วายร้าย, ถามคำ, เป็นได้ทุกอย่าง, กอดได้ไหม',
    storefront: 'TH'
  },
  {
    id: 'youngohm',
    name: 'YOUNGOHM',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป / แร็ป',
    emoji: '⚡',
    hitsHint: 'ธาตุทองซาวด์, เฉยเมย, ดูไว้, สายน้ำผึ้ง, บางกอก เลกาซี',
    storefront: 'TH'
  },
  {
    id: 'violette_wautier',
    name: 'Violette Wautier',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อินดี้',
    emoji: '💜',
    hitsHint: 'Smoke, กักตัว, ตั้งแต่มีเธอฉันมีความสุข',
    storefront: 'TH'
  },
  {
    id: 'scrubb',
    name: 'Scrubb',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'บริตป็อป / อินดี้',
    emoji: '🎸',
    hitsHint: 'เข้ากันดี, ทุกอย่าง, ใกล้, รอยยิ้ม, เธอหมุนรอบฉัน ฉันหมุนรอบเธอ',
    storefront: 'TH'
  },
  {
    id: 'tattoo_colour',
    name: 'Tattoo Colour',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก',
    emoji: '🎨',
    hitsHint: 'ขาหมู, เธอไม่อาจเอารักไปจากหัวใจ, ซินเดอเรลล่า, SuperCarCare',
    storefront: 'TH'
  },
  {
    id: 'taitosmith',
    name: 'Taitosmith',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก/เพื่อชีวิตรุ่นใหม่',
    emoji: '🔨',
    hitsHint: 'แดงกับเขียว, โคโยตี้, คิดถึง, ปัทมา',
    storefront: 'TH'
  },
  {
    id: 'little_john',
    name: 'Little John',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อกโมเดิร์น/9Arkkhan',
    emoji: '⚡',
    hitsHint: 'ฉันไม่ต้องการตัวเธอในตอนนี้, รสชาติชีวิต, ที่ผ่านมาขอบใจจริงๆ, ชาติหน้าเอาใหม่',
    storefront: 'TH',
    itunesArtistId: 1790625632
  },
  {
    id: 'loso',
    name: 'Loso',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก Y2K',
    emoji: '🎸',
    hitsHint: 'ใจสั่งมา, ซมซาน, 14 อีกครั้ง, อะไรก็ยอม',
    storefront: 'TH'
  },
  {
    id: 'silly_fools',
    name: 'Silly Fools',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อกคลาสสิก',
    emoji: '🤡',
    hitsHint: 'จิ๊จ๊ะ, ขี้หึง, วัดใจ, ผิดที่ไว้ใจ',
    storefront: 'TH'
  },
  {
    id: 'd2b',
    name: 'D2B',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'บอยแบนด์ ยุค 2000s',
    emoji: '💿',
    hitsHint: 'คนใจอ่อน, ซ่าส์...(สั่นๆ), ต่อหน้าฉัน (เธอทำอย่างนั้นได้อย่างไร)',
    storefront: 'TH'
  },
  {
    id: 'bird_thongchai',
    name: 'Bird Thongchai',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปตำนาน',
    emoji: '👑',
    hitsHint: 'คู่กัด, สบาย สบาย, เล่าสู่กันฟัง, แฟนจ๋า',
    storefront: 'TH'
  },
  {
    id: 'monkan_kankoon',
    name: 'มนต์แคน แก่นคูน',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งพันล้านวิว',
    emoji: '🌾',
    hitsHint: 'คำว่าฮักกัน มันเหี่ยถิ่มไส, วอนหลวงพ่อรวย, อ้ายมาส่งทาง',
    storefront: 'TH'
  },
  {
    id: 'lamyai_haithongkham',
    name: 'ลำไย ไหทองคำ',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งอินดี้',
    emoji: '💃',
    hitsHint: 'ผู้สาวขาเลาะ, ยายแล่ม, เจ็บตรงนี้',
    storefront: 'TH'
  },
  {
    id: 'kong_huayrai',
    name: 'ก้อง ห้วยไร่',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งเพื่อชีวิต',
    emoji: '🐃',
    hitsHint: 'ไสว่าสิบ่ถิ่มกัน, คู่คอง, กลิ่นแป้ง',
    storefront: 'TH'
  },
  {
    id: 'carabao',
    name: 'คาราบาว',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'เพื่อชีวิตในตำนาน',
    emoji: '🐂',
    hitsHint: 'บัวลอย, วณิพก, เมดอินไทยแลนด์, ทับหลัง',
    storefront: 'TH'
  },
  {
    id: 'mirrr',
    name: 'Mirrr',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ / ซินธ์',
    emoji: '🌌',
    hitsHint: 'ดอกไม้ไฟ, นิโคติน, ชาชาชา, กำแพงหัวใจ',
    storefront: 'TH'
  },
  {
    id: 'serious_bacon',
    name: 'SERIOUS BACON',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปอินดี้',
    emoji: '🥓',
    hitsHint: 'พี่ๆ ตัดแว่นให้หน่อย, ไม่พิเศษ, วังวน, หากว่าฉัน',
    storefront: 'TH'
  },
  {
    id: 'lipta',
    name: 'Lipta',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / อาร์แอนด์บี',
    emoji: '🕶️',
    hitsHint: 'ยังทำใจไม่ได้, แฟน, ไปอยู่ที่ไหนมา, ทบทวน',
    storefront: 'TH'
  },
  {
    id: 'stamp_apiwat',
    name: 'แสตมป์ อภิวัชร์',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป',
    emoji: '👓',
    hitsHint: 'ความคิด, กาลครั้งหนึ่ง, สบตา, ให้ตายสิพับผ่า, โอมจงเงย',
    storefront: 'TH'
  },
  {
    id: 'singto_numchok',
    name: 'สิงโต นำโชค',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / อคูสติก',
    emoji: '🦁',
    hitsHint: 'อยู่ต่อเลยได้ไหม, อาย, ขวานบิ่น, I Just Wanna Pen Fan You Dai Bor',
    storefront: 'TH'
  },
  {
    id: 'milli',
    name: 'MILLI',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป / ทีป็อป',
    emoji: '🥭',
    hitsHint: 'พักก่อน, สุดปัง, Sad Aerobic, 17 นาที, Mirror Mirror',
    storefront: 'TH'
  },
  {
    id: 'polycat',
    name: 'Polycat',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ซินธ์ป็อป 80s',
    emoji: '🐈',
    hitsHint: 'อาวรณ์, เป็นเพราะฝน, ดูดี, พบกันใหม่, อาลัยหมาวัด',
    storefront: 'TH'
  },
  {
    id: 'slot_machine',
    name: 'Slot Machine',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'โมเดิร์นร็อก',
    emoji: '🎰',
    hitsHint: 'เคลิ้ม, ผ่าน, จันทร์เจ้า, รุ้ง, คำสุดท้าย',
    storefront: 'TH'
  },
  {
    id: 'sweet_mullet',
    name: 'Sweet Mullet',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก / โพสต์ฮาร์ดคอร์',
    emoji: '🎸',
    hitsHint: 'พลังแสงอาทิตย์, ฝากเลี้ยง, สภาวะหัวใจล้มเหลวเฉียบพลัน, หลอมละลาย',
    storefront: 'TH'
  },
  {
    id: 'retrospect',
    name: 'Retrospect',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก / เมทัล',
    emoji: '🔥',
    hitsHint: 'ไม่มีเธอ, ปล่อยฉัน, เพราะว่ารัก, ให้ฉันลืมเธอ, สุดที่รัก',
    storefront: 'TH'
  },
  {
    id: 'moderndog',
    name: 'Moderndog',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อัลเทอร์เนทีฟ',
    emoji: '🐕',
    hitsHint: 'ตาสว่าง, บุษบา, สิ่งที่ไม่เคยบอก, ก่อน, ติ๋ม',
    storefront: 'TH'
  },

  {
    id: 'perses',
    name: "PERSES",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "T-POP",
    emoji: '⚡',
    hitsHint: "Cut Off, Catch the Night, My Time, คนใหม่",
    storefront: 'TH'
  },
  {
    id: 'dice',
    name: "DICE",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "T-POP",
    emoji: '🎲',
    hitsHint: "Mona Lisa, โคตรชอบเลยอ่ะ, TRAP",
    storefront: 'TH'
  },
  {
    id: 'atlas',
    name: "ATLAS",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "T-POP",
    emoji: '🚀',
    hitsHint: "MAYDAY MAYDAY, LOLAY, คุยแก้เหงา, รักกันวันเดียว",
    storefront: 'TH'
  },
  {
    id: 'lykn',
    name: "LYKN",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "T-POP",
    emoji: '🐺',
    hitsHint: "เลิกกับเขาเดี๋ยวเหงาเป็นเพื่อน, แอบรักไม่ทำให้ใครตาย, ฉ่ำ (CHARM)",
    storefront: 'TH'
  },
  {
    id: 'pretzel',
    name: "PRETZEL",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "T-POP",
    emoji: '🥨',
    hitsHint: "ต้องชอบแค่ไหน, ไม่รับสาย (Ringtone), ไม่มีคนคุย",
    storefront: 'TH'
  },
  {
    id: 'bamm',
    name: "bamm",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "T-POP",
    emoji: '💥',
    hitsHint: "โดนเทแต่เท่อยู่, เอ๋ง (Woof), ปล่อยจอย, ฉันจะฉาปเธอ",
    storefront: 'TH'
  },
  {
    id: 'mean',
    name: "MEAN",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป/อินดี้",
    emoji: '📻',
    hitsHint: "หมายความว่าอะไร, พอเถอะ, ผู้ชมที่ดี, เหมาะสม",
    storefront: 'TH'
  },
  {
    id: 'television_off',
    name: "Television Off",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ร็อก",
    emoji: '📺',
    hitsHint: "ให้เธอหายไป, ฝันที่ไม่เป็นจริง, ขอแค่ฝัน",
    storefront: 'TH'
  },
  {
    id: 'loserpop',
    name: "Loserpop",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ป็อป",
    emoji: '🍭',
    hitsHint: "เคย, อีกกี่ครั้ง, ทางที่ดี, ชวนเธอนอนดูดาว",
    storefront: 'TH'
  },
  {
    id: 'yew',
    name: "Yew",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้",
    emoji: '🍃',
    hitsHint: "ลมแล้ง, ถ้าเธอคิดเหมือนกัน, ปล่อยให้เวลา, หมอก",
    storefront: 'TH'
  },
  {
    id: 'landokmai',
    name: "Landokmai",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ดรีมป็อป",
    emoji: '🌷',
    hitsHint: "เพลงรักเพลงแรก, Tsuki, ฟ้า, เกาะลอยกว้างใหญ่",
    storefront: 'TH'
  },
  {
    id: 'uncle_ben',
    name: "Uncle Ben",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ป็อป",
    emoji: '☕',
    hitsHint: "โตไปด้วยกัน, อย่าเป็นฉันเลย, เปลี่ยนไปทุกอย่าง",
    storefront: 'TH'
  },
  {
    id: 'slapkiss',
    name: "SLAPKISS",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป",
    emoji: '💋',
    hitsHint: "แฟนเก่าคนโปรด, ให้ลืมได้ไง, ขอเฉลย, สู้คนในใจแกไม่ไหวหรอก",
    storefront: 'TH'
  },
  {
    id: 'blackbeans',
    name: "Blackbeans",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้/อาร์แอนด์บี",
    emoji: '☕',
    hitsHint: "Wish, Moon, About Love, Dance with Me",
    storefront: 'TH'
  },
  {
    id: 'moving_and_cut',
    name: "Moving and Cut",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ป็อป",
    emoji: '✂️',
    hitsHint: "คำตอบ, อย่าเลยอย่า, ฉันยอม, อย่าเสียใจคนเดียว",
    storefront: 'TH'
  },
  {
    id: 'grease_cafe',
    name: "grease cafe",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ร็อก",
    emoji: '☕',
    hitsHint: "ความบังเอิญ, สิ่งเหล่านี้, ฝืน, ประโยคบอกเล่า",
    storefront: 'TH'
  },
  {
    id: 'the_parkinson',
    name: "The Parkinson",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "โซล/บลูส์",
    emoji: '🎸',
    hitsHint: "เพื่อนรัก, จะบอกเธอว่ารัก, หมดแก้ว, แค่นี้...พอ",
    storefront: 'TH'
  },
  {
    id: 'sqweez_animal',
    name: "Sqweez Animal",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ป็อป",
    emoji: '🦊',
    hitsHint: "คำบางคำ, ไม่มีความหมาย, รักเราไม่เท่ากัน, เริ่มใหม่",
    storefront: 'TH'
  },
  {
    id: '25hours',
    name: "25hours",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "โมเดิร์นร็อก",
    emoji: '⏰',
    hitsHint: "ยินดีที่ไม่รู้จัก, ไม่เคย, ทำได้เพียง, คนข้างๆ",
    storefront: 'TH'
  },
  {
    id: 'klear',
    name: "Klear",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปร็อก",
    emoji: '💎',
    hitsHint: "คำยินดี, สิ่งของ, รักไม่ต้องการเวลา, จะรักหรือจะร้าย",
    storefront: 'TH'
  },
  {
    id: 'zeal',
    name: "Zeal",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อก",
    emoji: '🔥',
    hitsHint: "สองรัก, หมดชีวิตฉันให้เธอ, เตลิด, ปลุก",
    storefront: 'TH'
  },
  {
    id: 'paradox',
    name: "Paradox",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อินดี้ร็อก",
    emoji: '🎪',
    hitsHint: "ฤดูร้อน, Sexy, ซักซี๊ดนึง, รุ้ง, ขอ",
    storefront: 'TH'
  },
  {
    id: 'mild',
    name: "Mild",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปร็อก",
    emoji: '🍧',
    hitsHint: "Unlovable, หวานเย็น, รักล้นใจ, ดาว",
    storefront: 'TH'
  },
  {
    id: 'lomosonic',
    name: "Lomosonic",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อก",
    emoji: '⚡',
    hitsHint: "ขอ, ถึงเวลา..., ใครจะหยุด, ความรู้สึกของวันนี้",
    storefront: 'TH'
  },
  {
    id: 'musketeers',
    name: "Musketeers",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "โมเดิร์นร็อก",
    emoji: '🗡️',
    hitsHint: "Dancing, แค่บางคำ, อยากให้เธอลอง, ใจความสำคัญ",
    storefront: 'TH'
  },
  {
    id: 'flure',
    name: "Flure",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อัลเทอร์เนทีฟ",
    emoji: '🌧️',
    hitsHint: "ฤดูที่ฉันเหงา, เปลี่ยน, ยื้อ, เรื่องเดียว",
    storefront: 'TH'
  },
  {
    id: 'playground',
    name: "Playground",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปร็อก",
    emoji: '🎠',
    hitsHint: "มุม, ปล่อยวาง, Soul Mate, เจ้าชู้ประตูดิน",
    storefront: 'TH'
  },
  {
    id: 'friday',
    name: "Friday",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป/อินดี้",
    emoji: '☕',
    hitsHint: "ชั่วโมงต้องมนต์, หนาวนี้, นิดนึงพอ",
    storefront: 'TH'
  },
  {
    id: 'crescendo',
    name: "Crescendo",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "โซล/ฟังค์/ป็อป",
    emoji: '🎺',
    hitsHint: "ความจริงในใจ, ดินแดนแห่งความรัก, ใจกลางความเจ็บปวด",
    storefront: 'TH'
  },
  {
    id: 'asanee_wasan',
    name: "Asanee Wasan",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อกตำนาน",
    emoji: '🎸',
    hitsHint: "ยินดีไม่มีปัญหา, บ้าหอบฟาง, ร่ำไร, รักเธอเสมอ, ได้อย่างเสียอย่าง",
    storefront: 'TH'
  },
  {
    id: 'micro',
    name: "Micro",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อกตำนาน",
    emoji: '🏍️',
    hitsHint: "เอาไปเลย, เติมน้ำมัน, เสียมั้ย, ใจโทรมๆ, รักปอนปอน",
    storefront: 'TH'
  },
  {
    id: 'nuvo',
    name: "Nuvo",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปร็อก",
    emoji: '🕶️',
    hitsHint: "ลืมไปไม่รักกัน, สัญชาตญาณบอก, ไม่เป็นไรเลย, สุดสุดไปเลย",
    storefront: 'TH'
  },
  {
    id: 'endorphine',
    name: "Endorphine",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปร็อก",
    emoji: '🎙️',
    hitsHint: "เพื่อนสนิท, สิ่งสำคัญ, น้ำเต็มแก้ว, คืนข้ามปี, คำขอสุดท้าย",
    storefront: 'TH'
  },
  {
    id: 'so_cool',
    name: "So Cool",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปร็อก",
    emoji: '🧊',
    hitsHint: "เลี้ยงส่ง, ซากอ้อย, คนเจียมตัว, อกหักจากมือถือ",
    storefront: 'TH'
  },
  {
    id: 'kala',
    name: "Kala",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อก",
    emoji: '🥥',
    hitsHint: "ขอเป็นตัวเลือก, เธอเป็นแฟนฉันแล้ว, แม่ครับ, ใช่ฉันหรือเปล่า",
    storefront: 'TH'
  },
  {
    id: 'ebola',
    name: "Ebola",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮาร์ดร็อก",
    emoji: '⚡',
    hitsHint: "แสงสว่าง, สิ่งที่ฉันเป็น, เอาให้ตาย, กลับสู่จุดเริ่มต้น",
    storefront: 'TH'
  },
  {
    id: 'blackhead',
    name: "Blackhead",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อก",
    emoji: '🖤',
    hitsHint: "ยืนยัน, ยิ่งโตยิ่งสวย, เหตุผล, ไม่จำเป็นต้องดีที่สุด",
    storefront: 'TH'
  },
  {
    id: 'taxi',
    name: "Taxi",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ร็อก",
    emoji: '🚕',
    hitsHint: "คิดถึงฉันไหมเวลาที่เธอ..., น่านะ, นางฟ้ากับควาย",
    storefront: 'TH'
  },
  {
    id: 'sprite',
    name: "SPRITE",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป/แร็ป",
    emoji: '🥤',
    hitsHint: "ทน, บังอร, ไอดอล, ดึกแล้วละบ่",
    storefront: 'TH'
  },
  {
    id: 'saran',
    name: "SARAN",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป/แร็ป",
    emoji: '🎤',
    hitsHint: "ลืมแทบไม่ไหว, ลืมไป, ปลดล็อกสกินทอง",
    storefront: 'TH'
  },
  {
    id: 'fhero',
    name: "F.HERO",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป",
    emoji: '🦁',
    hitsHint: "จำเก่ง, Mirror Mirror, เสือสิ้นลาย, มีแค่เรา",
    storefront: 'TH'
  },
  {
    id: 'dgerrard',
    name: "D GERRARD",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "อาร์แอนด์บี/โซล",
    emoji: '🌌',
    hitsHint: "Galaxy, รูปร่าง, เอิงเอย, กลัวแฟน",
    storefront: 'TH'
  },
  {
    id: 'twopee',
    name: "Twopee Southside",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป",
    emoji: '🌴',
    hitsHint: "ได้ไหม, เอาละเว้ย, Aow La Woii",
    storefront: 'TH'
  },
  {
    id: 'oganic',
    name: "OG-ANIC",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป",
    emoji: '🌿',
    hitsHint: "รู้ทั้งรู้, เป็นไรไหม, หัวใจไม่อยู่กับตัว",
    storefront: 'TH'
  },
  {
    id: 'lazyloxy',
    name: "LAZYLOXY",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป/อาร์แอนด์บี",
    emoji: '🌙',
    hitsHint: "เป็นไรไหม, Morning, ยอม",
    storefront: 'TH'
  },
  {
    id: 'onemill',
    name: "1MILL",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "แทร็ป/ฮิปฮอป",
    emoji: '💰',
    hitsHint: "Can't Tell Me Shit, Kool Kid, PRADA",
    storefront: 'TH',
    itunesArtistId: 1464572030
  },
  {
    id: 'diamond_mqt',
    name: "DIAMOND MQT",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป",
    emoji: '💎',
    hitsHint: "Gucci Belt, เพชร, วันนี้ปีที่แล้ว",
    storefront: 'TH'
  },
  {
    id: 'maiyarap',
    name: "MAIYARAP",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ฮิปฮอป",
    emoji: '🌿',
    hitsHint: "เก็บไว้ในใจไม่พอ, แฟนใหม่หน้าคุ้น, เลิกกับเขาเดี๋ยวเหงาเป็นเพื่อน",
    storefront: 'TH'
  },
  {
    id: 'four_mod',
    name: "Four Mod",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "กามิกาเซ่/ป็อป",
    emoji: '🍓',
    hitsHint: "ละลาย, หายใจเป็นเธอ, เด็กมีปัญหา, ใครทิ้งใครก่อน",
    storefront: 'TH'
  },
  {
    id: 'kotic',
    name: "K-OTIC",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "กามิกาเซ่/แดนซ์",
    emoji: '🥋',
    hitsHint: "เหงาปาก, รักไม่ได้หรือไม่ได้รัก, แฟนใหม่, FREE TO PLAY",
    storefront: 'TH'
  },
  {
    id: 'waii',
    name: "Waii",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "กามิกาเซ่/อาร์แอนด์บี",
    emoji: '🎀',
    hitsHint: "ถามผิดมั้ง, เสียใจแต่ไม่แคร์, ยอมให้จับนะ, ตกหลุมรัก",
    storefront: 'TH'
  },
  {
    id: 'three_two_one',
    name: "3.2.1",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "กามิกาเซ่/ฮิปฮอป",
    emoji: '🔊',
    hitsHint: "รักต้องเปิด (แน่นอก), แค่ที่รัก (My Boo), เขย่า",
    storefront: 'TH'
  },
  {
    id: 'ffk',
    name: "Faye Fang Kaew",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "กามิกาเซ่/ป็อป",
    emoji: '👭',
    hitsHint: "คำถาม, Miz Call Miz U, อย่าให้ความหวัง, Baby Boy",
    storefront: 'TH'
  },
  {
    id: 'golf_mike',
    name: "Golf Mike",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปแดนซ์/Y2K",
    emoji: '🏌️',
    hitsHint: "Bounce, อย่าเล่นแบบนี้, เรื่องเล็กของเธอ, ไม่ว่างกำลังเต้น",
    storefront: 'TH'
  },
  {
    id: 'dan_beam',
    name: "Dan & Beam",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป/Y2K",
    emoji: '👬',
    hitsHint: "ต่อหน้าฉันเธอทำอย่างนั้นได้อย่างไร, คิดมาก, คนใจอ่อน",
    storefront: 'TH'
  },
  {
    id: 'girly_berry',
    name: "Girly Berry",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปแดนซ์",
    emoji: '🍒',
    hitsHint: "Gossip, ช่างรวดเร็ว, ตุ๊มต่อม, รางวัลชมเชย",
    storefront: 'TH'
  },
  {
    id: 'neko_jump',
    name: "Neko Jump",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "กามิกาเซ่/ป็อป",
    emoji: '🐱',
    hitsHint: "จุ๊บ จุ๊บ, ปู, ไม่ถอดใจ",
    storefront: 'TH'
  },
  {
    id: 'chin_chinawut',
    name: "Chin Chinawut",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปแดนซ์/อาร์แอนด์บี",
    emoji: '🕺',
    hitsHint: "ปากไม่ตรงกับใจ, คืนนี้อยากได้กี่ครั้ง, หัวใจไม่ใช่ก้อนหิน",
    storefront: 'TH'
  },
  {
    id: 'ice_saranyu',
    name: "Ice Saranyu",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป",
    emoji: '🍦',
    hitsHint: "คนมันรัก, คนใจง่าย, อย่าเล่นตัว, บุพเพสันนิวาส",
    storefront: 'TH'
  },
  {
    id: 'bie_sukrit',
    name: "Bie Sukrit",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อปแดนซ์",
    emoji: '🌟',
    hitsHint: "จังหวะหัวใจ, มากมาย, I Need Somebody, รักนะคะ",
    storefront: 'TH'
  },
  {
    id: 'peck_palitchoke',
    name: "Peck Palitchoke",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป/อาร์แอนด์บี",
    emoji: '🦘',
    hitsHint: "ไม่มีใครรู้, มีหัวใจแต่ไม่อยากรัก, โทษที่เอาแต่ใจ, First Lady",
    storefront: 'TH'
  },
  {
    id: 'aof_pongsak',
    name: "Aof Pongsak",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "บัลลาด/ป็อป",
    emoji: '💔',
    hitsHint: "แทงข้างหลังทะลุถึงหัวใจ, ผู้ชายคนนี้กำลังหมดแรง, เรื่องจริงยิ่งกว่านิยาย",
    storefront: 'TH'
  },
  {
    id: 'tata_young',
    name: "Tata Young",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "แดนซ์/ป็อป",
    emoji: '💃',
    hitsHint: "Dhoom Dhoom, Sexy Naughty Bitchy, โอ๊ะ...โอ๊ย, รบกวนมารักกัน",
    storefront: 'TH'
  },
  {
    id: 'christina_aguilar',
    name: "Christina Aguilar",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "แดนซ์ควีน",
    emoji: '👑',
    hitsHint: "พูดอีกที, นินจา, ประวัติศาสตร์, พลิกล็อค",
    storefront: 'TH'
  },
  {
    id: 'nicole_theriault',
    name: "Nicole Theriault",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป 90s",
    emoji: '🌸',
    hitsHint: "กะโปโล, บุษบา, ทำไมเป็นคนแบบนี้, ไม่ใช่ฉัน",
    storefront: 'TH'
  },
  {
    id: 'mos_patiparn',
    name: "Mos Patiparn",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ป็อป 90s",
    emoji: '🛹',
    hitsHint: "เหลวไหล, ฮัลโหล, สลัด สะบัด, รู้ไหมว่าใครใหญ่",
    storefront: 'TH'
  },
  {
    id: 'jay_jetrin',
    name: "Jay Jetrin",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "แดนซ์/ป็อป 90s",
    emoji: '🏄‍♂️',
    hitsHint: "คาใจ, กองไว้, แววตา, ฝากเลี้ยง, เจ เจตริน",
    storefront: 'TH'
  },
  {
    id: 'phai_phongsathon',
    name: "ไผ่ พงศธร",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งอีสาน",
    emoji: '🌾',
    hitsHint: "คนบ้านเดียวกัน, ยืมหน้ามาเข้าฝัน, ไม่มีข้อแม้ตั้งแต่เริ่มต้น",
    storefront: 'TH'
  },
  {
    id: 'tai_orathai',
    name: "ต่าย อรทัย",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งอีสาน",
    emoji: '🌸',
    hitsHint: "ดอกหญ้าในป่าปูน, โทรหาแหน่เด๊อ, สิเทน้อง ให้บอกแน",
    storefront: 'TH'
  },
  {
    id: 'takkatan_chonlada',
    name: "ตั๊กแตน ชลดา",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่ง",
    emoji: '🦗',
    hitsHint: "ไม่ใช่แฟนทำแทนไม่ได้, แฟนเก็บ, โคตรเลวในดวงใจ",
    storefront: 'TH'
  },
  {
    id: 'jintara_poonlarp',
    name: "จินตหรา พูนลาภ",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งหมอลำ",
    emoji: '🍉',
    hitsHint: "เต่างอย, แตงโมจินตหรา, น้ำตาน้องเพ็ญ",
    storefront: 'TH'
  },
  {
    id: 'ble_patumrach',
    name: "เบิ้ล ปทุมราช",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งอินดี้",
    emoji: '🎸',
    hitsHint: "อ้ายมีเหตุผล, กอดครั้งสุดท้าย, เฟสก็หายไลน์ก็เงียบ",
    storefront: 'TH'
  },
  {
    id: 'zak_chumpae',
    name: "แซ็ค ชุมแพ",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งอินดี้",
    emoji: '🌾',
    hitsHint: "คำแพง, บ่แม่นบ่ฮัก",
    storefront: 'TH'
  },
  {
    id: 'maithai',
    name: "ไหมไทย หัวใจศิลป์",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งหมอลำ",
    emoji: '🎤',
    hitsHint: "ผัวสำรอง, เห็นเธอที่บาร์เบียร์, นางฟ้าหรือยาพิษ",
    storefront: 'TH'
  },
  {
    id: 'yinglee',
    name: "หญิงลี ศรีจุมพล",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งแดนซ์",
    emoji: '💃',
    hitsHint: "ขอใจเธอแลกเบอร์โทร, ขาขาวสาวลำซิ่ง, รอสายคนโสด",
    storefront: 'TH'
  },
  {
    id: 'pongsit_kampee',
    name: "พงษ์สิทธิ์ คำภีร์",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "เพื่อชีวิต",
    emoji: '🎸',
    hitsHint: "ตลอดเวลา, มือปืน, รักเดียว, ไถ่เธอด้วยกวด",
    storefront: 'TH'
  },
  {
    id: 'maleehuana',
    name: "มาลีฮวนน่า",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "เพื่อชีวิต",
    emoji: '🌙',
    hitsHint: "แสงจันทร์, ลมเพลมพัด, หัวใจพรือโฉ้",
    storefront: 'TH'
  },
  {
    id: 'meentra_inthira',
    name: "มีนตรา อินทิรา",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งโมเดิร์น",
    emoji: '🌾',
    hitsHint: "ว่าว, นะหน้าทอง, ห้ามตั๋ว",
    storefront: 'TH'
  },
  {
    id: 'pumpuang_duangjan',
    name: "พุ่มพวง ดวงจันทร์",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ราชินีลูกทุ่ง",
    emoji: '👑',
    hitsHint: "ส้มตำ, ผู้ชายในฝัน, ขอให้รวย, กระแซะเข้ามาซิ",
    storefront: 'TH'
  },
  {
    id: 'tae_trakooltor',
    name: "เต๊ะ ตระกูลตอ",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: "ลูกทุ่งอินดี้",
    emoji: '🐸',
    hitsHint: "ห่อหมกฮวกไปฝากป้า, ผู้สาวเก่าเป็นการเมือง",
    storefront: 'TH'
  },
  {
    id: 'joey_phuwasit',
    name: 'โจอี้ ภูวศิษฐ์',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก/อีสานอินดี้',
    emoji: '🎸',
    hitsHint: 'นะหน้าทอง, ดวงเดือน, เมษาจะกลับไป, สัญญาเดือนหก',
    storefront: 'TH'
  },
  {
    id: 'pun',
    name: 'PUN',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อาร์แอนด์บี/ฮิปฮอป',
    emoji: '🎧',
    hitsHint: 'เค้ามาก่อน, นนท์, Stay, Goodbye',
    storefront: 'TH'
  },
  {
    id: 'no_one_else',
    name: 'No One Else',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/โซล',
    emoji: '💍',
    hitsHint: 'ต่อจากนี้เพลงรักทุกเพลงจะเป็นของเธอเท่านั้น, แค่มีเธออยู่ตรงนี้, กี่เพลงรักที่ผ่านไป',
    storefront: 'TH'
  },
  {
    id: 'sarah_salola',
    name: 'Sarah Salola',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🎸',
    hitsHint: 'เอาใจลงไปเล่น, นะครับ(ได้ไหม), ยินดีด้วยนะ, วิวโปรดของฉันคือเธอ',
    storefront: 'TH'
  },
  {
    id: 'patrickananda',
    name: 'Patrickananda',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อาร์แอนด์บี/โซล',
    emoji: '🌙',
    hitsHint: 'คนละชั้น, จันทร์อังคารพุธพฤหัสศุกร์เสาร์อาทิตย์, Lavender, แสงไฟ',
    storefront: 'TH'
  },
  {
    id: 'first_anuwat',
    name: 'First Anuwat',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อคูสติก',
    emoji: '🎸',
    hitsHint: 'ถ้าเธออยากรักใครฉันยินดี, ไหวอยู่ (แต่ก็รู้สึก), คลั่งรัก, พิจารณา',
    storefront: 'TH'
  },
  {
    id: 'timethai',
    name: 'Timethai',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อาร์แอนด์บี/ฮิปฮอป',
    emoji: '🔥',
    hitsHint: 'มีอะไรอีกมั้ยที่ลืมบอก, ชู้ทางไลน์, เปิดใจไม่เปิดหาร, HIT ME UP',
    storefront: 'TH'
  },
  {
    id: 'bow_maylada',
    name: 'Bow Maylada',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปน่ารัก',
    emoji: '🌸',
    hitsHint: 'แฟนผมน่ารัก, รอยยิ้มของทุกวัน, มาดามฟิน',
    storefront: 'TH'
  },
  {
    id: 'nanon_korapat',
    name: 'Nanon Korapat',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/ร็อก',
    emoji: '🎸',
    hitsHint: 'แค่เพื่อนมั้ง, KNOCK KNOCK, จักรวาลที่ฉันต้องการมีแค่เธอ',
    storefront: 'TH'
  },
  {
    id: 'bright_vachirawit',
    name: 'Bright Vachirawit',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/อาร์แอนด์บี',
    emoji: '✨',
    hitsHint: 'คั่นกู, คืนนี้ออกไปเต้น, Sad Movie, Lost&Found',
    storefront: 'TH'
  },
  {
    id: 'gemini_fourth',
    name: 'GEMINI & FOURTH',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP/ป็อป',
    emoji: '🌟',
    hitsHint: 'เพลงรัก, รักหน้าตาเหมือนเธอไหม, เขินให้หน่อย, ลบยัง',
    storefront: 'TH'
  },
  {
    id: 'daou_offroad',
    name: 'DAOU & OFFROAD',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP',
    emoji: '💫',
    hitsHint: 'ไม่ปล่อยมือ, เต็มสิบ, รักแท้, เจ้าหญิง',
    storefront: 'TH'
  },
  {
    id: 'bell_supol',
    name: 'Bell Supol',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/บัลลาด',
    emoji: '🎙️',
    hitsHint: 'แสนล้านนาที, ตอบได้ไหมว่า...ได้ไหม, ไม่ธรรมดา',
    storefront: 'TH'
  },
  {
    id: 'wan_thanakrit',
    name: 'Wan Thanakrit',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/โฟล์ก',
    emoji: '☕',
    hitsHint: 'ระยะปลอดภัย, วัยทองรำลึก, อยู่บำรุง, คนไม่มีเวลา',
    storefront: 'TH'
  },
  {
    id: 'pop_pongkool',
    name: 'Pop Pongkool',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป/บัลลาด',
    emoji: '🎤',
    hitsHint: 'ปล่อย, สลักจิต, ภาพจำ, ระหว่างที่รอเขา',
    storefront: 'TH'
  },
  {
    id: 'boy_peacemaker',
    name: 'Boy Peacemaker',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก/บัลลาด',
    emoji: '💔',
    hitsHint: 'การเปลี่ยนแปลง, ความอ่อนแอ, ส่วนเกิน, เนื้อคู่, พื้นที่ทับซ้อน',
    storefront: 'TH'
  },
  {
    id: 'the_yers',
    name: 'The Yers',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'โพสต์พังก์/ร็อก',
    emoji: '⚡',
    hitsHint: 'การสื่อสาร, เพียงหนึ่งครั้ง, คืนที่ฟ้าสว่าง, เสพติดความเจ็บปวด',
    storefront: 'TH'
  },
  {
    id: 'freehand',
    name: 'Freehand',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อัลเทอร์เนทีฟร็อก',
    emoji: '🕊️',
    hitsHint: 'ก่อนดาวจะตก, คลั่งรัก, คุกเข่า, ดอกไม้ไฟ, ดวงอาทิตย์ตก',
    storefront: 'TH'
  },
  {
    id: 'pang_nakarin',
    name: 'ป้าง นครินทร์',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อกตำนาน',
    emoji: '🎸',
    hitsHint: 'คนมีเสน่ห์, ภูมิแพ้กรุงเทพ, ทำอะไรสักอย่าง, คุกเข่า, อากาศ',
    storefront: 'TH'
  },
  {
    id: 'ab_normal',
    name: 'AB Normal',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก/ป็อปร็อก',
    emoji: '⚡',
    hitsHint: 'ใจน้อย, พูดไม่ค่อยเก่ง, ทั้งที่ผิดก็ยังรัก, ตัวถ่วง',
    storefront: 'TH'
  },
  {
    id: 'izax',
    name: 'I-Zax',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก 2000s',
    emoji: '🎸',
    hitsHint: 'ปวดใจ, ดอกไม้กับหัวใจ, เพราะอะไร, ขาดเธอไม่ได้',
    storefront: 'TH'
  },
  {
    id: 'hin_lek_fai',
    name: 'หินเหล็กไฟ',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮาร์ดร็อก/เฮฟวีเมทัล',
    emoji: '🤘',
    hitsHint: 'ยอม, ศรัทธา, นางแมว, หลงกล, เพื่อเธอ',
    storefront: 'TH'
  },
  {
    id: 'fly_band',
    name: 'วงฟลาย (Fly)',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อกไทย 90s',
    emoji: '🦅',
    hitsHint: 'ชาวนากับงูเห่า, บิน, พายุในใจ, บัวช้ำ น้ำขุ่น',
    storefront: 'TH'
  },
  {
    id: 'y_not_7',
    name: 'Y Not 7',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'กรันจ์/ร็อก 90s',
    emoji: '🎸',
    hitsHint: 'ทิ้งรักลงแม่น้ำ, รู้ไว้ซะ, ชู้รัก, ค่อยค่อยพูด',
    storefront: 'TH'
  },
  {
    id: 'solitude_is_bliss',
    name: 'Solitude Is Bliss',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้/ไซเคเดลิกร็อก',
    emoji: '🌌',
    hitsHint: 'ร่องน้ำตา, สัญญาณ, วิ่งหนี, ปาร์ตี้',
    storefront: 'TH'
  },
  {
    id: 'bomb_at_track',
    name: 'Bomb At Track',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'แร็ปร็อก/นูเมทัล',
    emoji: '💣',
    hitsHint: 'ราชา, อำนาจเจริญ, คำสั่ง, เจ้าหน้าที่',
    storefront: 'TH'
  },
  {
    id: 'yessir_days',
    name: "Yes'sir Days",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก',
    emoji: '⚡',
    hitsHint: 'เจ็บไปรักไป, อยากให้เธอได้ยินหัวใจ, มนุษย์ล่องหน',
    storefront: 'TH'
  },
  {
    id: 'armchair',
    name: 'Armchair',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'บอสซาโนวา/อินดี้ป็อป',
    emoji: '☕',
    hitsHint: 'รึเปล่า, ไปสู่ความว่างเปล่า, รักแท้, วันที่ฉันป่วย',
    storefront: 'TH'
  },
  {
    id: 'better_weather',
    name: 'Better Weather',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '⛅',
    hitsHint: 'ปฏิเสธอย่างไร, Is This Love, แค่เท่านั้น',
    storefront: 'TH'
  },
  {
    id: 'superbaker',
    name: 'Superbaker',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปฟีลกู๊ด',
    emoji: '🍞',
    hitsHint: 'นาที, ออกซิเจน, ความรัก, มนุษย์ล่องหน',
    storefront: 'TH'
  },
  {
    id: 'penguin_villa',
    name: 'Penguin Villa',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🐧',
    hitsHint: 'อคูสติก, ลาลา, เว... (Acousoul)',
    storefront: 'TH'
  },
  {
    id: 'raptor',
    name: 'Raptor',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปแดนซ์ 90s',
    emoji: '🦖',
    hitsHint: 'เกรงใจ, อย่าพูดเลย, รู้สึกอย่างไร, ไม่เอานะ',
    storefront: 'TH'
  },
  {
    id: 'james_ruangsak',
    name: 'James Ruangsak',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปแดนซ์/บัลลาด 90s',
    emoji: '🍗',
    hitsHint: 'ข้าวมันไก่, ไม่อาจเปลี่ยนใจ, ไซเรนเลิฟ, ชั๊บ ชั๊บ ชั๊บ',
    storefront: 'TH'
  },
  {
    id: 'dome_pakorn_lam',
    name: 'Dome Pakorn Lam',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก 90s-2000s',
    emoji: '🌟',
    hitsHint: 'สมมุติ, หน้ากาก, ยิ่งรักเธอ, อย่ารักเขาได้ไหม',
    storefront: 'TH'
  },
  {
    id: 'katreeya_english',
    name: 'Katreeya English',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'แดนซ์/ป็อป 2000s',
    emoji: '💃',
    hitsHint: 'O.K. นะคะ, นอกสายตา, ท้าพิสูจน์',
    storefront: 'TH'
  },
  {
    id: 'china_dolls',
    name: 'China Dolls',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'แดนซ์/ป็อป 2000s',
    emoji: '💃',
    hitsHint: 'หมวยนี่คะ, ตีหมวย, คนหน้า ม.',
    storefront: 'TH'
  },
  {
    id: 'knomjean',
    name: 'Knomjean',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'กามิกาเซ่/ป็อปร็อก',
    emoji: '💔',
    hitsHint: 'ตามใจปาก, ระหว่างเพื่อนกับแฟน, อวดเก่ง, เสี่ยงมั้ย',
    storefront: 'TH'
  },
  {
    id: 'tor_saksit',
    name: 'Tor Saksit',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'เปียโนป็อป',
    emoji: '🎹',
    hitsHint: 'รักเธอ, มั้ง, ได้ไหม, คนไม่พิเศษ',
    storefront: 'TH'
  },
  {
    id: 'ben_chalatit',
    name: 'Ben Chalatit',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'โซล/ดีว่า',
    emoji: '🎤',
    hitsHint: 'โอ๊ย โอ๊ย, คนข้างล่าง, ใกล้, คะแนนแห่งชีวิต',
    storefront: 'TH'
  },
  {
    id: 'illslick',
    name: 'illslick',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อาร์แอนด์บี/แร็ป',
    emoji: '👑',
    hitsHint: 'ถ้าเธอรักฉันจริง, กลัวเครื่องบิน, จูบ, พิพิธภัณฑ์, หัวเราะใส่ฉัน',
    storefront: 'TH'
  },
  {
    id: 'rachyo',
    name: 'RachYO',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอปอีสาน',
    emoji: '🌾',
    hitsHint: 'เลวพอกัน, ข้ามันลูกทุ่ง, ดึงดัน, ไว้ใจ๋',
    storefront: 'TH'
  },
  {
    id: 'tangbadvoice',
    name: 'TangBadVoice',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'คอมเมดี้ฮิปฮอป',
    emoji: '🎭',
    hitsHint: 'เปรตป่ะ, เปรี้ยวใจ, ผู้โชคดี, ลิ้นติดโปร',
    storefront: 'TH'
  },
  {
    id: 'phot',
    name: 'P-HOT',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป',
    emoji: '🔥',
    hitsHint: 'เสือสิ้นลาย, เบอร์มาดิ, Bye Bye',
    storefront: 'TH'
  },
  {
    id: 'kratae_rsiam',
    name: 'กระแต อาร์สยาม',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งแดนซ์/อินเตอร์',
    emoji: '💃',
    hitsHint: 'วิลิศมาหรา, หนานะ, เปิดใจสาวแต, เมรี',
    storefront: 'TH'
  },
  {
    id: 'jah_nongpanee',
    name: 'จ๊ะ นงผณี',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งวาไรตี้',
    emoji: '🎤',
    hitsHint: 'คันหู, เห็นนางเงียบๆ ฟาดเรียบนะคะ, สวยวนไปค่ะ',
    storefront: 'TH'
  },
  {
    id: 'bell_niphada',
    name: 'เบลล์ นิภาดา',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งอีสานอินดี้',
    emoji: '📦',
    hitsHint: 'ให้เคอรี่มาส่งได้บ่, ย่านรถไฟชนกัน, บ่มีสิทธิ์ถืกตั๋ว',
    storefront: 'TH'
  },
  {
    id: 'kru_toey',
    name: 'ครูเต้ย อภิวัฒน์',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งอินดี้',
    emoji: '👨‍🏫',
    hitsHint: 'อยู่บ่ได้, ถ้าอ้ายหน้าใหม่, ไข่เจียวหมูสับ',
    storefront: 'TH'
  },
  {
    id: 'lumplearn',
    name: 'ลำเพลิน วงศกร',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งหมอลำ',
    emoji: '🌾',
    hitsHint: 'รำคาญกะบอกกันเด้อ, บุญเก่า, ห่อหมกฮวกไปฝากป้า',
    storefront: 'TH'
  },
  {
    id: 'ryal_kajbundit',
    name: 'ไรอัล กาจบัณฑิต',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งแท้',
    emoji: '🏆',
    hitsHint: 'ฉันรักเพลงลูกทุ่ง, แรงใจหน้าจอ, ลานไม้ป่า',
    storefront: 'TH'
  },
  {
    id: 'siriporn_ampaipong',
    name: 'ศิริพร อำไพพงษ์',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งหมอลำระดับตำนาน',
    emoji: '👑',
    hitsHint: 'ปริญญาใจ, โบว์รักสีดำ, ล้างจานในงานแต่ง, ย่านบ่มีชาติหน้า',
    storefront: 'TH'
  },
  {
    id: 'sunaree_ratchasima',
    name: 'สุนารี ราชสีมา',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งระดับตำนาน',
    emoji: '🌹',
    hitsHint: 'กราบเท้าย่าโม, มอเตอร์ไซค์นุ่งสั้น, จำเสี่ยงทาย, เรารอเขาลืม',
    storefront: 'TH'
  },
  {
    id: 'sek_loso',
    name: 'เสก โลโซ',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อกระดับตำนาน',
    emoji: '🎸',
    hitsHint: 'ซมซาน, 14 อีกครั้ง, ใจสั่งมา, แม่, พันธ์ทิพย์',
    storefront: 'TH'
  },
  {
    id: 'lula',
    name: 'Lula',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'บอสซาโนวา/ป็อป',
    emoji: '🌸',
    hitsHint: 'ตุ๊กตาหน้ารถ, ทะเลสีดำ, มันคือความรัก, เรื่องที่ขอ',
    storefront: 'TH'
  },
  {
    id: 'bnk48',
    name: 'BNK48',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ไอดอล/ป็อป',
    emoji: '🎀',
    hitsHint: 'คุกกี้เสี่ยงทาย, วันแรก, โดดดิด่ง, เธอคือ...เมโลดี้',
    storefront: 'TH'
  },
  {
    id: 'ice_paris',
    name: 'Ice Paris',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP/ป็อป',
    emoji: '✨',
    hitsHint: 'รักติดไซเรน, ดี๊ดี, นิมมาน, รอยยิ้มที่อบอุ่น',
    storefront: 'TH'
  },
  {
    id: 'whal_and_dolph',
    name: 'Whal & Dolph',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🐬',
    hitsHint: 'ใจเดียว, ยิ้ม, นานอีกหน่อย, ไม่รู้ทำไม',
    storefront: 'TH'
  },
  {
    id: 'yented',
    name: 'YENTED',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'นีโอโซล/อินดี้ป็อป',
    emoji: '🌙',
    hitsHint: 'หินหยดลงน้ำ, อย่าสงสัย, Her, ถ้าหาก',
    storefront: 'TH'
  },
  {
    id: 'younggu',
    name: 'YOUNGGU',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป/แทร็ป',
    emoji: '🔥',
    hitsHint: 'วิ่งแบบพี่ตูน, Shishi, ไม่ใช่เรื่องง่าย, แร็ปบาร์ทองคำ',
    storefront: 'TH'
  },
  {
    id: 'hybs',
    name: 'HYBS',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป / ซินธ์ป็อป',
    emoji: '🕶️',
    hitsHint: 'Ride, Dancing with my phone, Tip Toe, Killer, Prettiest To Me',
    storefront: 'TH'
  },
  {
    id: 'zweed_n_roll',
    name: "Zweed n' Roll",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อัลเทอร์เนทีฟร็อก / อินดี้',
    emoji: '🥀',
    hitsHint: 'ช่วงเวลา, อยู่คนเดียว, อาจเป็นเพราะฉัน, Diary',
    storefront: 'TH'
  },
  {
    id: 'zom_marie',
    name: 'Zom Marie',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป',
    emoji: '🍊',
    hitsHint: 'รางวัลปลอบใจ, หรือฉันคิดไปเอง, หากว่าเราไม่คิดถึงกัน, โลกอีกใบ, กอดในใจ',
    storefront: 'TH'
  },
  {
    id: 'ploychompoo',
    name: 'Ploychompoo',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ทีนป็อป',
    emoji: '🌸',
    hitsHint: 'ปลิว, อาจเป็นเพราะ, แพ้แล้วพาล, ชักดิ้นชักงอ, เธอเดินเข้ามา',
    storefront: 'TH'
  },
  {
    id: 'new_jiew',
    name: 'New & Jiew',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / ดีว่า',
    emoji: '👭',
    hitsHint: 'คนเจ้าน้ำตา, ไม่รักไม่ต้อง, รอแล้วได้อะไร, อย่าเอาความเหงามาลงที่ฉัน, จมน้ำตา',
    storefront: 'TH'
  },
  {
    id: 'two_popetorn',
    name: 'TWO Popetorn',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'R&B / ป็อป',
    emoji: '🎙️',
    hitsHint: 'พูดทำไม, แต่ยังคิดถึง, โปรดอย่ามาสงสาร, ถ้าเรียกเธอว่าความรัก, แค่เป็นเธอ',
    storefront: 'TH'
  },
  {
    id: 'the_richman_toy',
    name: 'The Richman Toy',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'โมเดิร์นวินเทจ / ร็อก',
    emoji: '🎸',
    hitsHint: 'อ๊อด อ๊อด, ธิดาประจำอำเภอ, กระเป๋าแบนแฟนยิ้ม, ม้าป่า, แต่งงานกันเด้อ',
    storefront: 'TH'
  },
  {
    id: 'gavin_d',
    name: 'GAVIN:D',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป / ป็อป',
    emoji: '🚀',
    hitsHint: 'A Rocket to the Moon, รักได้ป่าว, เกาะสวาทหาดสวรรค์, โคตรบ่อย',
    storefront: 'TH'
  },
  {
    id: 'autta',
    name: 'AUTTA',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'แร็ป / ฮิปฮอป',
    emoji: '🎤',
    hitsHint: 'สุดท้ายแล้วเราจะ, วันอากาศดีๆ ที่ไม่มีเธออยู่, ชายหน้าม้า, 안녕, ว่างยัง',
    storefront: 'TH'
  },
  {
    id: 'aylas',
    name: "AYLA's",
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป / ร็อก',
    emoji: '🌙',
    hitsHint: 'จากตรงนี้ที่(เคย)สวยงาม, เพียงแค่ถามเธอดู, เปลี่ยนไปแต่เหมือนเดิม, คงจะดีหากฉันหายไป',
    storefront: 'TH'
  },
  {
    id: 'blvckheart',
    name: 'BLVCKHEART',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'R&B / ฮิปฮอป',
    emoji: '🖤',
    hitsHint: 'เมื่อไหร่จะมี (มีใจให้กัน), โทรมาที่เบอร์นี้, ขึ้นใจ, ได้แค่เดินมาส่ง',
    storefront: 'TH'
  },
  {
    id: 'p6ick',
    name: 'P6ICK',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป / แทร็ป',
    emoji: '🔥',
    hitsHint: 'BU, หนุ่มเมกา, หนุ่มบ้านนอก, BODY',
    storefront: 'TH'
  },
  {
    id: 'reinizra',
    name: 'เรนิษรา',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป / บัลลาด',
    emoji: '🌸',
    hitsHint: 'ผู้ถูกเลือกให้ผิดหวัง (ดอกไม้ฤดูหนาว), Chronically Unhappy, Self-neglect, หวานใจผมน่ารักกว่าใคร',
    storefront: 'TH'
  },
  {
    id: 'suriya_mqt',
    name: 'SURIYA MQT',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ฮิปฮอป / แทร็ป',
    emoji: '⚡',
    hitsHint: '1 ในล้าน, หนุ่มเมกา, หนุ่มบ้านนอก, BU',
    storefront: 'TH'
  },
  {
    id: 'only_monday',
    name: 'Only Monday',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก',
    emoji: '🎸',
    hitsHint: 'ได้แต่นึกถึง, บรรยากาศ, ไม่เป็นไรหรอกมั้ง, ทิ้งไป, ทุกความทรงจำ',
    storefront: 'TH'
  },
  {
    id: 'rooftop',
    name: 'ROOFTOP',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป',
    emoji: '🏢',
    hitsHint: 'คนเราจะแอบรักใครสักคนได้นานแค่ไหน, กลัวเธอเหงา, เคยคิดถึงฉันไหม, เอาแก้มแตะ, แวะ',
    storefront: 'TH'
  },
  {
    id: 'oat_pramote',
    name: 'Oat Pramote',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป',
    emoji: '🎙️',
    hitsHint: 'ติดตลก, มีแฟนแล้ว, ที่รัก, ยิ้ม, เมื่อวาน, คิดถึงจัง',
    storefront: 'TH'
  },
  {
    id: 'guncharlie',
    name: 'guncharlie',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'อินดี้ป็อป',
    emoji: '🐕',
    hitsHint: 'เผื่อวันไหนเธอจะกลับมา, ศูนย์รวมความโฮ่งโฮ่ง, ไม่ได้ลืมแค่ไม่ได้เจอ, สถานะคนคุย',
    storefront: 'TH'
  },
  {
    id: 'atom_chanakan',
    name: 'Atom Chanakan',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / โซล',
    emoji: '✨',
    hitsHint: 'อ้าว, ทางของฝุ่น (Dust), แผลเป็น, อยู่นี่ไง, ปล่อยปาก, Good Morning Teacher',
    storefront: 'TH'
  },
  {
    id: 'dr_fuu',
    name: 'Dr.Fuu',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อปร็อก',
    emoji: '🎸',
    hitsHint: 'ใจเหลือเหลือ, แพ้คนห่างไกล, เมื่อไหร่จะรัก, กอดตัวเอง, ดวงดาวแห่งรัก',
    storefront: 'TH'
  },
  {
    id: 'soybad',
    name: 'SOYBAD',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'R&B / อินดี้',
    emoji: '☁️',
    hitsHint: 'หมอก, ยิ้ม, ไม่ได้ยิน, ฟ้าร้อง, แอบ, แค่ได้มอง',
    storefront: 'TH'
  },
  {
    id: 'wonderframe',
    name: 'WONDERFRAME',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / ฮิปฮอป',
    emoji: '🎀',
    hitsHint: 'อยู่ดีๆก็…, ชู้แต่เธอไม่รอบ ชอบแต่เธอไม่รู้, เขาไปแล้ว, เปะปะ, มีแฟนหรือยัง',
    storefront: 'TH'
  },
  {
    id: 'room39',
    name: 'Room39',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / อะคูสติก',
    emoji: '🛋️',
    hitsHint: 'หน่วง, เป็นทุกอย่าง, ความจริง, อย่าให้ฉันคิด, เข้ากันไม่ได้',
    storefront: 'TH'
  },
  {
    id: 'wanyai',
    name: 'Wanyai',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / อะคูสติก',
    emoji: '👓',
    hitsHint: 'ลืมไป, ไปได้ดี, เจ็บจนพอ, บอกตัวเอง, อยู่คนเดียว, ทรมาน',
    storefront: 'TH'
  },
  {
    id: 'whatcharawalee',
    name: 'WhatChaRaWaLee',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ป็อป / ฟีลกู๊ด',
    emoji: '🍭',
    hitsHint: 'ลูกอม, ร่มสีเทา, ทราย, Avenue, สถานีดวงจันทร์, จิ๊กซอว์',
    storefront: 'TH'
  },

  // =========================================================================
  // 2. 🌎 ศิลปินสากล (GLOBAL BILLBOARD ARTISTS) - 39
  // =========================================================================
  {
    id: 'taylor_swift',
    name: 'Taylor Swift',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Country Pop',
    emoji: '🧣',
    hitsHint: 'Cruel Summer, Anti-Hero, Blank Space, Shake It Off',
    storefront: 'US'
  },
  {
    id: 'bruno_mars',
    name: 'Bruno Mars',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Funk / R&B',
    emoji: '🕺',
    hitsHint: 'Uptown Funk, That\'s What I Like, Die With A Smile, 24K Magic',
    storefront: 'US'
  },
  {
    id: 'the_weeknd',
    name: 'The Weeknd',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'R&B / Synthwave',
    emoji: '🕶️',
    hitsHint: 'Blinding Lights, Starboy, Save Your Tears, The Hills',
    storefront: 'US'
  },
  {
    id: 'billie_eilish',
    name: 'Billie Eilish',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Alt-Pop / Indie',
    emoji: '🥑',
    hitsHint: 'bad guy, BIRDS OF A FEATHER, ocean eyes, What Was I Made For?',
    storefront: 'US'
  },
  {
    id: 'joji',
    name: 'Joji',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'R&B / Lo-Fi Pop',
    emoji: '🥀',
    hitsHint: 'Glimpse of Us, SLOW DANCING IN THE DARK, DIE FOR YOU, Sanctuary, YEAH RIGHT',
    storefront: 'US'
  },
  {
    id: 'the_kid_laroi',
    name: 'The Kid LAROI',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Hip-Hop',
    emoji: '🧢',
    hitsHint: 'STAY, WITHOUT YOU, NIGHTS LIKE THIS, LOVE AGAIN',
    storefront: 'US'
  },
  {
    id: 'shakira',
    name: 'Shakira',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Latin Pop / Dance',
    emoji: '💃',
    hitsHint: "Hips Don't Lie, Waka Waka, Whenever Wherever, Chantaje",
    storefront: 'US'
  },
  {
    id: 'anne_marie',
    name: 'Anne-Marie',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop',
    emoji: '🌸',
    hitsHint: '2002, Friends, Alarm, Ciao Adios',
    storefront: 'US'
  },
  {
    id: 'lil_nas_x',
    name: 'Lil Nas X',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop Rap / Hip-Hop',
    emoji: '🤠',
    hitsHint: 'Old Town Road, MONTERO (Call Me By Your Name), INDUSTRY BABY',
    storefront: 'US'
  },
  {
    id: 'daniel_caesar',
    name: 'Daniel Caesar',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'R&B / Soul',
    emoji: '☕',
    hitsHint: 'Best Part, Get You, Always, Japanese Denim',
    storefront: 'US'
  },
  {
    id: 'clean_bandit',
    name: 'Clean Bandit',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Electro-Pop / Dance',
    emoji: '🎻',
    hitsHint: 'Rather Be, Symphony, Rockabye, Solo',
    storefront: 'US'
  },
  {
    id: 'ed_sheeran',
    name: 'Ed Sheeran',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Acoustic',
    emoji: '🎸',
    hitsHint: 'Shape of You, Perfect, Thinking Out Loud, Bad Habits',
    storefront: 'US'
  },
  {
    id: 'ariana_grande',
    name: 'Ariana Grande',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / R&B',
    emoji: '🎀',
    hitsHint: '7 rings, thank u, next, positions, we can\'t be friends',
    storefront: 'US'
  },
  {
    id: 'dua_lipa',
    name: 'Dua Lipa',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Disco-Pop / Dance',
    emoji: '💃',
    hitsHint: 'Levitating, Don\'t Start Now, New Rules, Houdini',
    storefront: 'US'
  },
  {
    id: 'justin_bieber',
    name: 'Justin Bieber',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / R&B',
    emoji: '🍑',
    hitsHint: 'STAY, Peaches, Love Yourself, Baby, Sorry, Ghost',
    storefront: 'US'
  },
  {
    id: 'olivia_rodrigo',
    name: 'Olivia Rodrigo',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop Rock / Alt',
    emoji: '💜',
    hitsHint: 'drivers license, good 4 u, vampire, deja vu',
    storefront: 'US'
  },
  {
    id: 'sabrina_carpenter',
    name: 'Sabrina Carpenter',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop',
    emoji: '☕',
    hitsHint: 'Espresso, Please Please Please, Feather, Nonsense',
    storefront: 'US'
  },
  {
    id: 'coldplay',
    name: 'Coldplay',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Alt-Rock / Pop',
    emoji: '🌌',
    hitsHint: 'Yellow, Viva La Vida, Fix You, The Scientist, Hymn for the Weekend',
    storefront: 'US'
  },
  {
    id: 'maroon_5',
    name: 'Maroon 5',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop Rock / Funk',
    emoji: '🍭',
    hitsHint: 'Sugar, Payphone, Memories, Moves Like Jagger, She Will Be Loved',
    storefront: 'US'
  },
  {
    id: 'post_malone',
    name: 'Post Malone',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Hip Hop / Pop / Country',
    emoji: '🌻',
    hitsHint: 'Sunflower, Circles, Rockstar, Congratulations, I Had Some Help',
    storefront: 'US'
  },
  {
    id: 'lady_gaga',
    name: 'Lady Gaga',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Dance',
    emoji: '👑',
    hitsHint: 'Bad Romance, Poker Face, Shallow, Born This Way, Die With A Smile',
    storefront: 'US'
  },
  {
    id: 'katy_perry',
    name: 'Katy Perry',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop',
    emoji: '🎆',
    hitsHint: 'Firework, Roar, Dark Horse, California Gurls, Teenage Dream',
    storefront: 'US'
  },
  {
    id: 'charlie_puth',
    name: 'Charlie Puth',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop',
    emoji: '🎹',
    hitsHint: 'Attention, See You Again, We Don\'t Talk Anymore, Left and Right',
    storefront: 'US'
  },
  {
    id: 'harry_styles',
    name: 'Harry Styles',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Rock',
    emoji: '🍉',
    hitsHint: 'As It Was, Watermelon Sugar, Sign of the Times, Golden, Adore You',
    storefront: 'US'
  },
  {
    id: 'adele',
    name: 'Adele',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Soul',
    emoji: '🎹',
    hitsHint: 'Rolling in the Deep, Someone Like You, Easy On Me, Hello, Set Fire to the Rain',
    storefront: 'US'
  },
  {
    id: 'drake',
    name: 'Drake',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Hip-Hop / Rap',
    emoji: '🦉',
    hitsHint: 'God\'s Plan, One Dance, Hotline Bling, In My Feelings, Passionfruit',
    storefront: 'US'
  },
  {
    id: 'kendrick_lamar',
    name: 'Kendrick Lamar',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Hip-Hop / Rap',
    emoji: '👑',
    hitsHint: 'Not Like Us, HUMBLE., Alright, swimming pools, All The Stars',
    storefront: 'US'
  },
  {
    id: 'eminem',
    name: 'Eminem',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Hip-Hop / Rap',
    emoji: '🎤',
    hitsHint: 'Lose Yourself, Without Me, Rap God, The Real Slim Shady, Mockingbird',
    storefront: 'US'
  },
  {
    id: 'sza',
    name: 'SZA',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'R&B / Pop',
    emoji: '🪐',
    hitsHint: 'Kill Bill, Snooze, Saturn, Good Days, Kiss Me More',
    storefront: 'US'
  },
  {
    id: 'teddy_swims',
    name: 'Teddy Swims',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Soul / Pop',
    emoji: '🐻',
    hitsHint: 'Lose Control, The Door, Bed on Fire, Bad Dreams',
    storefront: 'US'
  },
  {
    id: 'avicii',
    name: 'Avicii',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Dance',
    emoji: '🎧',
    hitsHint: 'Wake Me Up, The Nights, Levels, Waiting for Love',
    storefront: 'US'
  },
  {
    id: 'alan_walker',
    name: 'Alan Walker',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Electro House',
    emoji: '🎭',
    hitsHint: 'Faded, Alone, The Spectre, On My Way',
    storefront: 'US'
  },
  {
    id: 'the_chainsmokers',
    name: 'The Chainsmokers',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Pop',
    emoji: '🚬',
    hitsHint: 'Closer, Something Just Like This, Don\'t Let Me Down, Paris',
    storefront: 'US'
  },
  {
    id: 'onerepublic',
    name: 'OneRepublic',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop Rock',
    emoji: '🏙️',
    hitsHint: 'Counting Stars, Apologize, I Ain\'t Worried, Secrets',
    storefront: 'US'
  },
  {
    id: 'shawn_mendes',
    name: 'Shawn Mendes',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop',
    emoji: '🎸',
    hitsHint: 'Señorita, Treat You Better, Stitches, There\'s Nothing Holdin\' Me Back',
    storefront: 'US'
  },
  {
    id: 'beyonce',
    name: 'Beyoncé',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'R&B / Pop / Country',
    emoji: '🐝',
    hitsHint: 'TEXAS HOLD \'EM, Halo, Single Ladies, Crazy in Love',
    storefront: 'US'
  },
  {
    id: 'travis_scott',
    name: 'Travis Scott',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Hip-Hop / Trap',
    emoji: '🌵',
    hitsHint: 'FE!N, SICKO MODE, goosebumps, HIGHEST IN THE ROOM, MELTDOWN',
    storefront: 'US'
  },
  {
    id: 'doja_cat',
    name: 'Doja Cat',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Hip Hop',
    emoji: '🐱',
    hitsHint: 'Paint The Town Red, Say So, Kiss Me More, Woman',
    storefront: 'US'
  },
  {
    id: 'sam_smith',
    name: 'Sam Smith',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Soul',
    emoji: '🕊️',
    hitsHint: 'Unholy, Stay With Me, Too Good At Goodbyes, I\'m Not The Only One',
    storefront: 'US'
  },
  {
    id: 'one_direction',
    name: 'One Direction',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop',
    emoji: '👦',
    hitsHint: 'What Makes You Beautiful, Night Changes, Story of My Life, Drag Me Down',
    storefront: 'US'
  },
  {
    id: 'queen',
    name: 'Queen',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Classic Rock',
    emoji: '👑',
    hitsHint: 'Bohemian Rhapsody, Don\'t Stop Me Now, We Will Rock You, Another One Bites the Dust',
    storefront: 'US'
  },
  {
    id: 'michael_jackson',
    name: 'Michael Jackson',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Funk',
    emoji: '🕺',
    hitsHint: 'Billie Jean, Beat It, Thriller, Smooth Criminal, Bad, Man in the Mirror',
    storefront: 'US'
  },

  {
    id: 'britney_spears',
    name: "Britney Spears",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop Queen",
    emoji: '👑',
    hitsHint: "...Baby One More Time, Toxic, Oops!... I Did It Again, Gimme More",
    storefront: 'US'
  },
  {
    id: 'miley_cyrus',
    name: "Miley Cyrus",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop / Rock",
    emoji: '🌸',
    hitsHint: "Flowers, Wrecking Ball, Party in the U.S.A., The Climb",
    storefront: 'US'
  },
  {
    id: 'sia',
    name: "Sia",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Electropop",
    emoji: '🎀',
    hitsHint: "Chandelier, Cheap Thrills, Elastic Heart, Titanium",
    storefront: 'US'
  },
  {
    id: 'camila_cabello',
    name: "Camila Cabello",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Latin Pop",
    emoji: '💃',
    hitsHint: "Havana, Señorita, Never Be the Same",
    storefront: 'US'
  },
  {
    id: 'selena_gomez',
    name: "Selena Gomez",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop / Dance",
    emoji: '💫',
    hitsHint: "Lose You to Love Me, Calm Down, Good for You, Hands to Myself",
    storefront: 'US'
  },
  {
    id: 'demi_lovato',
    name: "Demi Lovato",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop / Rock",
    emoji: '💖',
    hitsHint: "Heart Attack, Cool for the Summer, Sorry Not Sorry",
    storefront: 'US'
  },
  {
    id: 'kesha',
    name: "Kesha",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Dance Pop",
    emoji: '✨',
    hitsHint: "TiK ToK, Praying, Die Young, Timber",
    storefront: 'US'
  },
  {
    id: 'lana_del_rey',
    name: "Lana Del Rey",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Dream Pop / Alt",
    emoji: '🥀',
    hitsHint: "Summertime Sadness, Video Games, Young and Beautiful, Born to Die",
    storefront: 'US'
  },
  {
    id: 'gracie_abrams',
    name: "Gracie Abrams",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Indie Pop",
    emoji: '💌',
    hitsHint: "I Love You, I'm Sorry, us., Risk",
    storefront: 'US'
  },
  {
    id: 'madonna',
    name: "Madonna",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Queen of Pop",
    emoji: '👑',
    hitsHint: "Like a Prayer, Hung Up, Material Girl, Vogue",
    storefront: 'US'
  },
  {
    id: 'conan_gray',
    name: "Conan Gray",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Indie Pop",
    emoji: '🍂',
    hitsHint: "Heather, Maniac, Memories, People Watching",
    storefront: 'US'
  },
  {
    id: 'lauv',
    name: "Lauv",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop / Indie",
    emoji: '💙',
    hitsHint: "I Like Me Better, Paris in the Rain, Steal the Show, Feelings",
    storefront: 'US'
  },
  {
    id: 'troye_sivan',
    name: "Troye Sivan",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Electropop",
    emoji: '✨',
    hitsHint: "Rush, Youth, One of Your Girls, Angel Baby",
    storefront: 'US'
  },
  {
    id: 'jack_harlow',
    name: "Jack Harlow",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hip-Hop / Rap",
    emoji: '🧢',
    hitsHint: "Lovin On Me, First Class, WHATS POPPIN, Industry Baby",
    storefront: 'US'
  },
  {
    id: 'khalid',
    name: "Khalid",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "R&B / Pop",
    emoji: '🎧',
    hitsHint: "Location, Young Dumb & Broke, Talk, Better",
    storefront: 'US'
  },
  {
    id: 'justin_timberlake',
    name: "Justin Timberlake",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop / R&B",
    emoji: '🕺',
    hitsHint: "Can't Stop the Feeling!, Mirrors, SexyBack, Cry Me a River",
    storefront: 'US'
  },
  {
    id: 'usher',
    name: "Usher",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "R&B King",
    emoji: '💎',
    hitsHint: "Yeah!, DJ Got Us Fallin' in Love, Burn, OMG, My Boo",
    storefront: 'US'
  },
  {
    id: 'chris_brown',
    name: "Chris Brown",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "R&B / Hip-Hop",
    emoji: '⚡',
    hitsHint: "Under the Influence, With You, Forever, Look at Me Now",
    storefront: 'US'
  },
  {
    id: 'imagine_dragons',
    name: "Imagine Dragons",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Alt Rock / Pop",
    emoji: '🐉',
    hitsHint: "Believer, Demons, Radioactive, Thunder, Bones",
    storefront: 'US'
  },
  {
    id: 'linkin_park',
    name: "Linkin Park",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Nu-Metal / Rock",
    emoji: '⚡',
    hitsHint: "In the End, Numb, Faint, The Emptiness Machine, Crawling",
    storefront: 'US'
  },
  {
    id: 'panic_at_the_disco',
    name: "Panic! At The Disco",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop Rock",
    emoji: '🎭',
    hitsHint: "High Hopes, I Write Sins Not Tragedies, Death of a Bachelor",
    storefront: 'US'
  },
  {
    id: 'my_chemical_romance',
    name: "My Chemical Romance",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Emo / Rock",
    emoji: '🖤',
    hitsHint: "Welcome to the Black Parade, Helena, Teenagers, I'm Not Okay",
    storefront: 'US'
  },
  {
    id: 'oasis',
    name: "Oasis",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Britpop / Rock",
    emoji: '🎸',
    hitsHint: "Wonderwall, Don't Look Back in Anger, Champagne Supernova, Stand by Me",
    storefront: 'US'
  },
  {
    id: 'arctic_monkeys',
    name: "Arctic Monkeys",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Indie Rock",
    emoji: '🐒',
    hitsHint: "Do I Wanna Know?, 505, I Wanna Be Yours, R U Mine?",
    storefront: 'US'
  },
  {
    id: 'twenty_one_pilots',
    name: "Twenty One Pilots",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Alt / Pop",
    emoji: '🔴',
    hitsHint: "Stressed Out, Ride, Heathens, Overcompensate",
    storefront: 'US'
  },
  {
    id: 'the_script',
    name: "The Script",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Pop Rock",
    emoji: '📜',
    hitsHint: "Hall of Fame, The Man Who Can't Be Moved, Breakeven",
    storefront: 'US'
  },
  {
    id: 'the_beatles',
    name: "The Beatles",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Classic Rock",
    emoji: '🍏',
    hitsHint: "Hey Jude, Let It Be, Yesterday, Come Together, Here Comes the Sun",
    storefront: 'US'
  },
  {
    id: 'guns_n_roses',
    name: "Guns N' Roses",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hard Rock",
    emoji: '🌹',
    hitsHint: "Sweet Child O' Mine, November Rain, Paradise City, Welcome to the Jungle",
    storefront: 'US'
  },
  {
    id: 'bon_jovi',
    name: "Bon Jovi",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Rock",
    emoji: '🎸',
    hitsHint: "Livin' on a Prayer, It's My Life, You Give Love a Bad Name, Always",
    storefront: 'US'
  },
  {
    id: 'david_guetta',
    name: "David Guetta",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "EDM / Dance",
    emoji: '🎧',
    hitsHint: "Titanium, Memories, I'm Good (Blue), Hey Mama, Without You",
    storefront: 'US'
  },
  {
    id: 'marshmello',
    name: "Marshmello",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "EDM / Pop",
    emoji: '🍬',
    hitsHint: "Happier, Wolves, Silence, Alone, Friends",
    storefront: 'US'
  },
  {
    id: 'zedd',
    name: "Zedd",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "EDM / Pop",
    emoji: '🎹',
    hitsHint: "Clarity, The Middle, Stay, Beautiful Now",
    storefront: 'US'
  },
  {
    id: 'pitbull',
    name: "Pitbull",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Dance / Hip-Hop",
    emoji: '🌎',
    hitsHint: "Give Me Everything, Timber, Fireball, Time of Our Lives, On the Floor",
    storefront: 'US'
  },
  {
    id: 'black_eyed_peas',
    name: "Black Eyed Peas",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hip-Hop / Dance",
    emoji: '🤖',
    hitsHint: "Where Is the Love?, I Gotta Feeling, Boom Boom Pow, Pump It",
    storefront: 'US'
  },
  {
    id: 'flo_rida',
    name: "Flo Rida",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hip-Hop / Dance",
    emoji: '🏖️',
    hitsHint: "Low, Whistle, Good Feeling, Wild Ones, Right Round",
    storefront: 'US'
  },
  {
    id: 'nicki_minaj',
    name: "Nicki Minaj",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hip-Hop Queen",
    emoji: '🎀',
    hitsHint: "Super Bass, Starships, Anaconda, Bang Bang, Super Freaky Girl",
    storefront: 'US'
  },
  {
    id: 'cardi_b',
    name: "Cardi B",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hip-Hop / Rap",
    emoji: '💎',
    hitsHint: "Bodak Yellow, I Like It, WAP, Up",
    storefront: 'US'
  },
  {
    id: 'megan_thee_stallion',
    name: "Megan Thee Stallion",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Hip-Hop / Rap",
    emoji: '🐎',
    hitsHint: "Savage, Body, Mamushi, WAP, Hiss",
    storefront: 'US'
  },
  {
    id: 'juice_wrld',
    name: "Juice WRLD",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Emo Rap",
    emoji: '🕊️',
    hitsHint: "Lucid Dreams, All Girls Are the Same, Robbery",
    storefront: 'US'
  },
  {
    id: 'xxxtentacion',
    name: "XXXTENTACION",
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: "Emo Rap / Alt",
    emoji: '🖤',
    hitsHint: "SAD!, Moonlight, Jocelyn Flores, Look At Me!",
    storefront: 'US'
  },
  {
    id: 'carly_rae_jepsen',
    name: 'Carly Rae Jepsen',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / Dance-Pop',
    emoji: '💖',
    hitsHint: 'Call Me Maybe, I Really Like You, Run Away With Me, Cut to the Feeling',
    storefront: 'US'
  },
  {
    id: 'ellie_goulding',
    name: 'Ellie Goulding',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Electropop / Pop',
    emoji: '✨',
    hitsHint: 'Love Me Like You Do, Lights, Burn, I Need Your Love',
    storefront: 'US'
  },
  {
    id: 'keshi',
    name: 'keshi',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Indie Pop / R&B',
    emoji: '🌙',
    hitsHint: 'beside you, LIMBO, drunk, 2 soon, UNDERSTAND, GET IT',
    storefront: 'US'
  },
  {
    id: 'jeremy_zucker',
    name: 'Jeremy Zucker',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Indie Pop / Acoustic',
    emoji: '☕',
    hitsHint: 'comethru, all the kids are depressed, you were good to me, talk is overrated',
    storefront: 'US'
  },
  {
    id: 'central_cee',
    name: 'Central Cee',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'UK Drill / Hip-Hop',
    emoji: '🧢',
    hitsHint: 'Doja, BAND4BAND, Sprinter, Let Go, Loading',
    storefront: 'US'
  },

  // =========================================================================
  // 3. 🇰🇷 K-POP MEGA STARS (เคป็อป) - 34
  // =========================================================================
  {
    id: 'blackpink',
    name: 'BLACKPINK',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🖤',
    hitsHint: 'DDU-DU DDU-DU, How You Like That, Pink Venom, Kill This Love',
    storefront: 'KR'
  },
  {
    id: 'bts',
    name: 'BTS',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '💜',
    hitsHint: 'Dynamite, Butter, Boy With Luv, Spring Day, Blood Sweat & Tears',
    storefront: 'KR'
  },
  {
    id: 'cortis',
    name: 'CORTIS',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'K-POP 5th Gen / Hip-Hop',
    emoji: '⚡',
    hitsHint: 'What You Want, REDRED, Color Outside the Lines',
    storefront: 'US'
  },
  {
    id: 'heart2heart',
    name: 'Hearts2Hearts',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'K-POP 5th Gen / Girl Group',
    emoji: '💖',
    hitsHint: 'The Chase, RUDE!, Iconic Heart',
    storefront: 'US'
  },
  {
    id: 'newjeans',
    name: 'NewJeans',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '👖',
    hitsHint: 'Hype Boy, Ditto, Super Shy, OMG, ETA, How Sweet',
    storefront: 'KR'
  },
  {
    id: 'twice',
    name: 'TWICE',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🍭',
    hitsHint: 'What is Love?, TT, Cheer Up, Fancy, Feel Special, The Feels',
    storefront: 'KR'
  },
  {
    id: 'aespa',
    name: 'aespa',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '👾',
    hitsHint: 'Supernova, Next Level, Drama, Savage, Armageddon',
    storefront: 'KR'
  },
  {
    id: 'ive',
    name: 'IVE',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '💖',
    hitsHint: 'LOVE DIVE, After LIKE, I AM, ELEVEN, Baddie, HEYA',
    storefront: 'KR'
  },
  {
    id: 'le_sserafim',
    name: 'LE SSERAFIM',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🔥',
    hitsHint: 'ANTIFRAGILE, Perfect Night, EASY, FEARLESS, Smart, CRAZY',
    storefront: 'KR'
  },
  {
    id: 'stray_kids',
    name: 'Stray Kids',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '⚡',
    hitsHint: 'God\'s Menu, MANIAC, S-Class, Thunderous, Chk Chk Boom',
    storefront: 'KR'
  },
  {
    id: 'seventeen',
    name: 'SEVENTEEN',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '💎',
    hitsHint: 'Super, Very NICE, HOT, Left & Right, MAESTRO, Don\'t Wanna Cry',
    storefront: 'KR'
  },
  {
    id: 'g_i_dle',
    name: '(G)I-DLE',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🦁',
    hitsHint: 'TOMBOY, Queencard, Nxde, Fate, Klaxon, LATATA',
    storefront: 'KR'
  },
  {
    id: 'babymonster',
    name: 'BABYMONSTER',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '👿',
    hitsHint: 'SHEESH, BATTER UP, FOREVER, LIKE THAT',
    storefront: 'KR'
  },
  {
    id: 'illit',
    name: 'ILLIT',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🧲',
    hitsHint: 'Magnetic, Lucky Girl Syndrome, Cherish (My Love)',
    storefront: 'KR'
  },
  {
    id: 'riize',
    name: 'RIIZE',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '🎸',
    hitsHint: 'Get A Guitar, Love 119, Boom Boom Bass, Talk Saxy',
    storefront: 'KR'
  },
  {
    id: 'exo',
    name: 'EXO',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '🪐',
    hitsHint: 'Growl, Monster, Love Shot, Call Me Baby, Ko Ko Bop',
    storefront: 'KR'
  },
  {
    id: 'red_velvet',
    name: 'Red Velvet',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🍰',
    hitsHint: 'Psycho, Red Flavor, Bad Boy, Feel My Rhythm, Russian Roulette',
    storefront: 'KR'
  },
  {
    id: 'itzy',
    name: 'ITZY',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '👑',
    hitsHint: 'WANNABE, DALLA DALLA, Not Shy, LOCO, SNEAKERS',
    storefront: 'KR'
  },
  {
    id: 'txt',
    name: 'TOMORROW X TOGETHER',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '🦊',
    hitsHint: 'Deja Vu, Sugar Rush Ride, Crown, Good Boy Gone Bad, Blue Hour',
    storefront: 'KR'
  },
  {
    id: 'enhypen',
    name: 'ENHYPEN',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '⚡',
    hitsHint: 'Bite Me, Polarized Love, Fever, Drunk-Dazed, Sweet Venom',
    storefront: 'KR'
  },
  {
    id: 'bigbang',
    name: 'BIGBANG',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group ตำนาน',
    emoji: '👑',
    hitsHint: 'BANG BANG BANG, Fantastic Baby, Haru Haru, Loser, Still Life',
    storefront: 'KR'
  },
  {
    id: 'two_ne_one',
    name: '2NE1',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group ตำนาน',
    emoji: '♠️',
    hitsHint: 'I Am The Best, Come Back Home, Lonely, Fire',
    storefront: 'KR'
  },
  {
    id: 'snsd',
    name: 'Girls\' Generation (SNSD)',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group ตำนาน',
    emoji: '💖',
    hitsHint: 'Gee, Into the New World, The Boys, I GOT A BOY, FOREVER 1',
    storefront: 'KR'
  },
  {
    id: 'iu',
    name: 'IU',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Solo Queen',
    emoji: '🌸',
    hitsHint: 'Love wins all, Blueming, Celebrity, Through the Night, eight, Good Day',
    storefront: 'KR'
  },
  {
    id: 'taeyeon',
    name: 'Taeyeon',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Soloist',
    emoji: '🦋',
    hitsHint: 'I, INVU, Fine, Four Seasons, What Do I Call You, To. X',
    storefront: 'KR'
  },
  {
    id: 'psy',
    name: 'PSY',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Soloist',
    emoji: '🕶️',
    hitsHint: 'Gangnam Style, Gentleman, That That, New Face, Daddy',
    storefront: 'KR'
  },
  {
    id: 'nct_127',
    name: 'NCT 127',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '💚',
    hitsHint: 'Kick It, Cherry Bomb, 2 Baddies, Fact Check, Sticker',
    storefront: 'KR'
  },
  {
    id: 'stayc',
    name: 'STAYC',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '🧸',
    hitsHint: 'ASAP, RUN2U, Bubble, Teddy Bear, Stereotype',
    storefront: 'KR'
  },
  {
    id: 'kiss_of_life',
    name: 'KISS OF LIFE',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Girl Group',
    emoji: '💋',
    hitsHint: 'Sticky, Midas Touch, Shhh, Bad News, Nobody Knows',
    storefront: 'KR'
  },
  {
    id: 'ateez',
    name: 'ATEEZ',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '🏴‍☠️',
    hitsHint: 'BOUNCY, WORK, Guerrilla, Deja Vu, Wonderland',
    storefront: 'KR'
  },
  {
    id: 'super_junior',
    name: 'Super Junior',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group ตำนาน',
    emoji: '💙',
    hitsHint: 'Sorry, Sorry, Bonamana, Mr. Simple, Miracle',
    storefront: 'KR'
  },
  {
    id: 'shinee',
    name: 'SHINee',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '💎',
    hitsHint: 'Ring Ding Dong, Lucifer, Replay, HARD, View',
    storefront: 'KR'
  },
  {
    id: 'tws',
    name: 'TWS',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '👦',
    hitsHint: 'plot twist (첫 만남은 계획대로 되지 않아), If I\'m S, Can You Be My N?',
    storefront: 'KR'
  },
  {
    id: 'zerobaseone',
    name: 'ZEROBASEONE',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '🌹',
    hitsHint: 'In Bloom, CRUSH, Feel the POP, GOOD SO BAD',
    storefront: 'KR'
  },
  {
    id: 'nct_dream',
    name: 'NCT DREAM',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Boy Group',
    emoji: '🍬',
    hitsHint: 'Candy, Smoothie, Glitch Mode, Hot Sauce, ISTJ',
    storefront: 'KR'
  },
  {
    id: 'jungkook',
    name: 'Jung Kook',
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: 'Pop / K-Pop',
    emoji: '🐰',
    hitsHint: 'Seven, Standing Next to You, 3D, Left and Right',
    storefront: 'KR'
  },

  {
    id: 'nmixx',
    name: "NMIXX",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "MIXX POP",
    emoji: '🌊',
    hitsHint: "Dash, Love Me Like This, See that?, O.O, DICE",
    storefront: 'KR'
  },
  {
    id: 'mamamoo',
    name: "MAMAMOO",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Vocal / Pop",
    emoji: '🎤',
    hitsHint: "HIP, Egotistic, Starry Night, gogobebe, Décalcomanie",
    storefront: 'KR'
  },
  {
    id: 'everglow',
    name: "EVERGLOW",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Girl Crush",
    emoji: '🔮',
    hitsHint: "DUN DUN, Adios, LA DI DA, BON BON CHOCOLAT, FIRST",
    storefront: 'KR'
  },
  {
    id: 'viviz',
    name: "VIVIZ",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Dance Pop",
    emoji: '🦋',
    hitsHint: "MANIAC, BOP BOP!, PULL UP, Untie",
    storefront: 'KR'
  },
  {
    id: 'gfriend',
    name: "GFRIEND",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Legendary GG",
    emoji: '💫',
    hitsHint: "Rough, Me Gustas Tu, MAGO, NAVILLERA, Time for the moon night",
    storefront: 'KR'
  },
  {
    id: 'izone',
    name: "IZ*ONE",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Girl Group",
    emoji: '🌸',
    hitsHint: "La Vie en Rose, FIESTA, Panorama, Secret Story of the Swan, Violeta",
    storefront: 'KR'
  },
  {
    id: 'fifty_fifty',
    name: "FIFTY FIFTY",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Pop",
    emoji: '💘',
    hitsHint: "Cupid, SOS, Gravity, Lovin' Me",
    storefront: 'KR'
  },
  {
    id: 'boynextdoor',
    name: "BOYNEXTDOOR",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Gen 5 BG",
    emoji: '🚪',
    hitsHint: "Nice Guy, Earth Wind & Fire, One and Only, But Sometimes",
    storefront: 'KR'
  },
  {
    id: 'treasure',
    name: "TREASURE",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Boy Group",
    emoji: '💎',
    hitsHint: "DARARI, JIKJIN, BOY, BONA BONA, HELLO",
    storefront: 'KR'
  },
  {
    id: 'got7',
    name: "GOT7",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Boy Group",
    emoji: '💚',
    hitsHint: "Just Right, Hard Carry, Lullaby, You Calling My Name, If You Do",
    storefront: 'KR'
  },
  {
    id: 'ikon',
    name: "iKON",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Boy Group",
    emoji: '🔥',
    hitsHint: "LOVE SCENARIO, Killing Me, Rhythm Ta, MY TYPE",
    storefront: 'KR'
  },
  {
    id: 'twopm',
    name: "2PM",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Boy Group",
    emoji: '⏰',
    hitsHint: "Heartbeat, My House, Hands Up, Again & Again",
    storefront: 'KR'
  },
  {
    id: 'wayv',
    name: "WayV",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "C-Pop / K-Pop",
    emoji: '🛸',
    hitsHint: "Love Talk, On My Youth, Phantom, Kick Back",
    storefront: 'KR'
  },
  {
    id: 'rose',
    name: "ROSÉ",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Pop / Acoustic",
    emoji: '🌹',
    hitsHint: "APT., On The Ground, Gone",
    storefront: 'KR'
  },
  {
    id: 'jennie',
    name: "JENNIE",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Pop / Hip-Hop",
    emoji: '💎',
    hitsHint: "Mantra, SOLO, You & Me, One Of The Girls",
    storefront: 'KR'
  },
  {
    id: 'jisoo',
    name: "JISOO",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Pop",
    emoji: '🌺',
    hitsHint: "FLOWER, All Eyes On Me",
    storefront: 'KR'
  },
  {
    id: 'jimin',
    name: "Jimin",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Pop / R&B",
    emoji: '🐥',
    hitsHint: "Who, Like Crazy, Set Me Free Pt.2, Filter",
    storefront: 'KR'
  },
  {
    id: 'v_bts',
    name: "V",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Jazz / R&B",
    emoji: '🐻',
    hitsHint: "Slow Dancing, Love Me Again, Christmas Tree, Fri(end)s, Sweet Night",
    storefront: 'KR'
  },
  {
    id: 'agust_d',
    name: "Agust D",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Hip-Hop / Rap",
    emoji: '🔥',
    hitsHint: "Daechwita, Haegeum, People, People Pt.2",
    storefront: 'KR'
  },
  {
    id: 'jin',
    name: "Jin",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Pop / Rock",
    emoji: '🐹',
    hitsHint: "The Astronaut, Super Tuna, I'll Be There, Abyss, Moon",
    storefront: 'KR'
  },
  {
    id: 'jhope',
    name: "J-Hope",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Hip-Hop / Dance",
    emoji: '🐿️',
    hitsHint: "Arson, More, Chicken Noodle Soup, on the street, NEURON",
    storefront: 'KR'
  },
  {
    id: 'rm',
    name: "RM",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Alt / Hip-Hop",
    emoji: '🐨',
    hitsHint: "Wild Flower, Come back to me, LOST!, Still Life",
    storefront: 'KR'
  },
  {
    id: 'gdragon',
    name: "G-DRAGON",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "King of K-Pop",
    emoji: '👑',
    hitsHint: "POWER, Crooked, Untitled 2014, Heartbreaker, BANG BANG BANG",
    storefront: 'KR'
  },
  {
    id: 'taeyang',
    name: "TAEYANG",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "R&B / Soul",
    emoji: '☀️',
    hitsHint: "Eyes Nose Lips, VIBE, Ringa Linga, Wedding Dress",
    storefront: 'KR'
  },
  {
    id: 'hyuna',
    name: "HyunA",
    region: 'kpop',
    regionLabel: 'K-POP',
    genreLabel: "Dance / Pop",
    emoji: '💋',
    hitsHint: "Bubble Pop!, Roll Deep, I'm Not Cool, Change, Red",
    storefront: 'KR'
  },

  // =========================================================================
  // 4. 🇯🇵 ANIME & J-POP TOP TRACKS (อนิเมะ & เจป็อป) - 23
  // =========================================================================
  {
    id: 'yoasobi',
    name: 'YOASOBI',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Anime Theme',
    emoji: '🌠',
    hitsHint: 'Idol (推しの子), Racing into the Night (夜に駆ける), Monster, Gunjo',
    storefront: 'JP'
  },
  {
    id: 'lisa_jp',
    name: 'LiSA',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Rock / Demon Slayer',
    emoji: '⚔️',
    hitsHint: 'Gurenge (紅蓮華), Homura (炎), Crossing Field (SAO), catch the moment',
    storefront: 'JP'
  },
  {
    id: 'ado',
    name: 'Ado',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'Utaite / Rock',
    emoji: '💙',
    hitsHint: 'New Genesis (ONE PIECE FILM RED), Usseewa (うっせぇわ), Show, Odo',
    storefront: 'JP'
  },
  {
    id: 'kenshi_yonezu',
    name: 'Kenshi Yonezu',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Chainsaw Man',
    emoji: '🍋',
    hitsHint: 'Lemon, KICK BACK (Chainsaw Man), Peace Sign (My Hero Academia), Shinigami',
    storefront: 'JP'
  },
  {
    id: 'radwimps',
    name: 'RADWIMPS',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Rock / Shinkai Movies',
    emoji: '☄️',
    hitsHint: 'Sparkle (Your Name), Zenzenzense, Nandemonaiya, Suzume',
    storefront: 'JP'
  },
  {
    id: 'official_hige_dandism',
    name: 'Official HIGE DANdism',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / SPY×FAMILY',
    emoji: '🧔',
    hitsHint: 'Pretender, Mixed Nuts (SPY×FAMILY), Cry Baby (Tokyo Revengers), I LOVE...',
    storefront: 'JP'
  },
  {
    id: 'king_gnu',
    name: 'King Gnu',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Rock / Jujutsu Kaisen',
    emoji: '👑',
    hitsHint: 'SPECIALZ (Jujutsu Kaisen), Hakujitsu, Ichizu, Sakayume',
    storefront: 'JP'
  },
  {
    id: 'eve_jp',
    name: 'Eve',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'Anime / J-Rock',
    emoji: '👁️',
    hitsHint: 'Kaikai Kitan (呪術廻戦 Jujutsu Kaisen), Dramaturgy, Tokyo Ghetto, As You Like It',
    storefront: 'JP'
  },
  {
    id: 'vaundy',
    name: 'Vaundy',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Rock',
    emoji: '🎨',
    hitsHint: 'Kaiju no Hanauta (怪獣の花唄), Odoriko, Chainsaw Blood (Chainsaw Man), Tokyo Flash',
    storefront: 'JP'
  },
  {
    id: 'aimer',
    name: 'Aimer',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Demon Slayer',
    emoji: '🌙',
    hitsHint: 'Zankyou Sanka (残響散歌), Brave Shine, Kataomoi, Ref:rain',
    storefront: 'JP'
  },
  {
    id: 'fujii_kaze',
    name: 'Fujii Kaze',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / R&B',
    emoji: '🍃',
    hitsHint: 'Shinunoga E-Wa (死ぬのがいいわ), Matsuri, Kirari, Michi Teyu Ku, Nan-Nan',
    storefront: 'JP'
  },
  {
    id: 'creepy_nuts',
    name: 'Creepy Nuts',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Hip Hop / Mashle',
    emoji: '🥜',
    hitsHint: 'Bling-Bang-Bang-Born (MASHLE), Otonoke (Dandadan), Yofukashi no Uta',
    storefront: 'JP'
  },
  {
    id: 'mrs_green_apple',
    name: 'Mrs. GREEN APPLE',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Rock',
    emoji: '🍏',
    hitsHint: 'Inferno (インフェルノ Fire Force), Que Sera Sera, Ao to Natsu, Lilac, Dance Hall',
    storefront: 'JP'
  },
  {
    id: 'one_ok_rock',
    name: 'ONE OK ROCK',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Rock',
    emoji: '🎸',
    hitsHint: 'The Beginning (Rurouni Kenshin), Wherever You Are, Stand Out Fit In, We Are, Clock Strikes',
    storefront: 'JP'
  },
  {
    id: 'spyair',
    name: 'SPYAIR',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Rock / Haikyuu!!',
    emoji: '🏐',
    hitsHint: 'Imagination (Haikyuu!!), Orange, Samurai Heart (Gintama), I\'m a Believer',
    storefront: 'JP'
  },
  {
    id: 'asian_kung_fu_generation',
    name: 'Asian Kung-Fu Generation',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Rock / Naruto',
    emoji: '🥋',
    hitsHint: 'Haruka Kanata (Naruto), Rewrite (Fullmetal Alchemist), After Dark (Bleach)',
    storefront: 'JP'
  },
  {
    id: 'milet',
    name: 'milet',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Frieren',
    emoji: '🧝',
    hitsHint: 'Anytime Anywhere (Frieren), inside you, us, Drown (Vinland Saga)',
    storefront: 'JP'
  },
  {
    id: 'yuuri',
    name: 'Yuuri',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Ballad',
    emoji: '🌸',
    hitsHint: 'Dry Flower (ドライフラワー), Betelgeuse, Leo, Kakurenbo',
    storefront: 'JP'
  },
  {
    id: 'aimyon',
    name: 'Aimyon',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Folk Rock',
    emoji: '🌼',
    hitsHint: 'Marigold (マリーゴールド), Harunohi, Naked Heart, Ai wo Tsutaetaidatoka',
    storefront: 'JP'
  },
  {
    id: 'flow_jp',
    name: 'FLOW',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'Anime / Rock',
    emoji: '⚡',
    hitsHint: 'GO!!! (Naruto), Colors (Code Geass), Sign (Naruto Shippuden), DAYS (Eureka Seven)',
    storefront: 'JP'
  },
  {
    id: 'man_with_a_mission',
    name: 'MAN WITH A MISSION',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'Anime / Rock',
    emoji: '🐺',
    hitsHint: 'Kizuna no Kiseki (Demon Slayer), Raise Your Flag (Gundam), database (Log Horizon)',
    storefront: 'JP'
  },
  {
    id: 'hikaru_utada',
    name: 'Hikaru Utada',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'J-Pop / Anime',
    emoji: '✨',
    hitsHint: 'First Love, One Last Kiss (Evangelion), Simple and Clean (Kingdom Hearts), Beautiful World',
    storefront: 'JP'
  },
  {
    id: 'kana_boon',
    name: 'KANA-BOON',
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: 'Anime / Rock',
    emoji: '🍥',
    hitsHint: 'Silhouette (シルエット Naruto), Baton Road (Boruto), Nai Mono Nedari, Fighter',
    storefront: 'JP'
  },
  {
    id: 'yorushika',
    name: "Yorushika",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Pop",
    emoji: '🍃',
    hitsHint: "Just a Sunny Day for You (ただ君に晴れ), That's Why I Gave Up on Music, Spring Thief, Matasaburo",
    storefront: 'JP'
  },
  {
    id: 'zutomayo',
    name: "ZUTOMAYO",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Funk Rock / J-Pop",
    emoji: '🦔',
    hitsHint: "Byoushinwo Kamu (秒針を噛む), Kura Kura (Spy x Family), Darken, Justice",
    storefront: 'JP'
  },
  {
    id: 'back_number',
    name: "back number",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Ballad",
    emoji: '🎄',
    hitsHint: "Christmas Song, Happy End, Takane no Hanako-san, Kaijuu no Hanauta",
    storefront: 'JP'
  },
  {
    id: 'sekai_no_owari',
    name: "SEKAI NO OWARI",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Fantasy Pop",
    emoji: '🎪',
    hitsHint: "RPG, Habit, Dragon Night, Habataki, Rain",
    storefront: 'JP'
  },
  {
    id: 'bump_of_chicken',
    name: "BUMP OF CHICKEN",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock Legend",
    emoji: '⭐',
    hitsHint: "Ray, Acacia (Pokémon), Karma (Tales), Tentai Kansoku, SOUVENIR (Spy x Family)",
    storefront: 'JP'
  },
  {
    id: 'gen_hoshino',
    name: "Gen Hoshino",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Pop / Soul",
    emoji: '🥜',
    hitsHint: "Comedy (Spy x Family), Koi, SUN, Fushigi, Doraemon",
    storefront: 'JP'
  },
  {
    id: 'daoko',
    name: "DAOKO",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Electro Pop",
    emoji: '🎆',
    hitsHint: "Uchiage Hanabi (打上花火 Fireworks), Step Up LOVE, ME!ME!ME!",
    storefront: 'JP'
  },
  {
    id: 'atarashii_gakko',
    name: "ATARASHII GAKKO!",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Avantgarde J-Pop",
    emoji: '👧',
    hitsHint: "Otonablue (オトナブルー), Tokyo Calling, Suki Lie, Toryanse",
    storefront: 'JP'
  },
  {
    id: 'kana_nishino',
    name: "Kana Nishino",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Pop Love Songs",
    emoji: '🎀',
    hitsHint: "Torisetsu, Darling, Best Friend, If (Naruto Shippuden), Aitakute Aitakute",
    storefront: 'JP'
  },
  {
    id: 'yui',
    name: "YUI",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Acoustic / Rock",
    emoji: '🎸',
    hitsHint: "again (Fullmetal Alchemist: Brotherhood), Tokyo, CHE.R.RY, Rolling star (Bleach)",
    storefront: 'JP'
  },
  {
    id: 'mika_nakashima',
    name: "Mika Nakashima",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Pop / Rock Ballad",
    emoji: '❄️',
    hitsHint: "GLAMOROUS SKY (NANA), Yuki no Hana (雪の華), Boku ga Shinou to Omotta no Wa",
    storefront: 'JP'
  },
  {
    id: 'ayumi_hamasaki',
    name: "Ayumi Hamasaki",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Empress of J-Pop",
    emoji: '👑',
    hitsHint: "Dearest (Inuyasha), Evolution, Voyage, M, SEASONS",
    storefront: 'JP'
  },
  {
    id: 'namie_amuro',
    name: "Namie Amuro",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Queen of J-Pop",
    emoji: '👑',
    hitsHint: "Hero, Hope (One Piece), Fight Together (One Piece), Baby Don't Cry, CAN YOU CELEBRATE?",
    storefront: 'JP'
  },
  {
    id: 'daichi_miura',
    name: "Daichi Miura",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "R&B / Dance",
    emoji: '🔥',
    hitsHint: "Blizzard (Dragon Ball Super), EXCITE (Kamen Rider Ex-Aid), Cry & Fight",
    storefront: 'JP'
  },
  {
    id: 'larc_en_ciel',
    name: "L'Arc~en~Ciel",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Legendary J-Rock",
    emoji: '🌈',
    hitsHint: "Driver's High (GTO), READY STEADY GO (Fullmetal Alchemist), Pieces, DAYBREAK'S BELL (Gundam 00)",
    storefront: 'JP'
  },
  {
    id: 'glay',
    name: "GLAY",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock Legend",
    emoji: '🎸',
    hitsHint: "HOWEVER, Winter again, Yuuwaku, Kanojo no Modern",
    storefront: 'JP'
  },
  {
    id: 'x_japan',
    name: "X JAPAN",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Visual Kei / Metal",
    emoji: '⚔️',
    hitsHint: "Kurenai (紅), Tears, Endless Rain, Rusty Nail, Forever Love",
    storefront: 'JP'
  },
  {
    id: 'luna_sea',
    name: "LUNA SEA",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Visual Kei",
    emoji: '🌙',
    hitsHint: "ROSIER, STORM, I for You, TRUE BLUE, gravity",
    storefront: 'JP'
  },
  {
    id: 'sid',
    name: "SID",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anime / Rock",
    emoji: '🥀',
    hitsHint: "Uso (Fullmetal Alchemist), Ranbu no Melody (Bleach), V.I.P (Magi), Monochrome no Kiss (Black Butler)",
    storefront: 'JP'
  },
  {
    id: 'uverworld',
    name: "UVERworld",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anime / Rock",
    emoji: '🐺',
    hitsHint: "D-tecnoLife (Bleach), Touch off (Promised Neverland), Colors of the Heart (Blood+), ODD FUTURE (MHA)",
    storefront: 'JP'
  },
  {
    id: 'porno_graffitti',
    name: "Porno Graffitti",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Anime",
    emoji: '🎙️',
    hitsHint: "Melissa (Fullmetal Alchemist), THE DAY (My Hero Academia), Hitori no Yoru (GTO), Saudade",
    storefront: 'JP'
  },
  {
    id: 'orange_range',
    name: "ORANGE RANGE",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Rap Rock",
    emoji: '🍊',
    hitsHint: "Asterisk (Bleach), Locolotion, Hana, O2 (Code Geass R2)",
    storefront: 'JP'
  },
  {
    id: 'linked_horizon',
    name: "Linked Horizon",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Symphonic Rock",
    emoji: '⚔️',
    hitsHint: "Guren no Yumiya (Attack on Titan), Shinzou wo Sasageyo!, Jiyuu no Tsubasa",
    storefront: 'JP'
  },
  {
    id: 'sim',
    name: "SiM",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Reggae Punk / Metal",
    emoji: '👹',
    hitsHint: "The Rumbling (Attack on Titan), Under the Tree, KiLLiNG ME, RED",
    storefront: 'JP'
  },
  {
    id: 'coldrain',
    name: "coldrain",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Post-Hardcore",
    emoji: '🌧️',
    hitsHint: "Mayday (Fire Force), Feed the Fire (King's Game), The Revelation, ENVY",
    storefront: 'JP'
  },
  {
    id: 'survive_said_the_prophet',
    name: "Survive Said The Prophet",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Post-Hardcore",
    emoji: '🔥',
    hitsHint: "MUKANJYO (Vinland Saga), Found & Lost (Banana Fish), Right and Left",
    storefront: 'JP'
  },
  {
    id: 'maximum_the_hormone',
    name: "Maximum The Hormone",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Nu-Metal / Hardcore",
    emoji: '🤘',
    hitsHint: "What's up people?! (Death Note), Zetsubou Billy, Hawatari Nioku Centi (Chainsaw Man)",
    storefront: 'JP'
  },
  {
    id: 'tk_from_ling_tosite_sigure',
    name: "TK from Ling tosite sigure",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Post-Hardcore / Art",
    emoji: '☕',
    hitsHint: "unravel (Tokyo Ghoul), katharsis (Tokyo Ghoul:re), Signal (91 Days), first death (Chainsaw Man)",
    storefront: 'JP'
  },
  {
    id: 'ling_tosite_sigure',
    name: "Ling tosite sigure",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Math Rock / Post-Hardcore",
    emoji: '⚡',
    hitsHint: "abnormalize (Psycho-Pass), Enigmatic Feeling, alexithymiaspare",
    storefront: 'JP'
  },
  {
    id: 'unison_square_garden',
    name: "UNISON SQUARE GARDEN",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Pop Rock",
    emoji: '🎸',
    hitsHint: "Sugar Song and Bitter Step (Kekkai Sensen), fake town baby, Catch up latency, Orion",
    storefront: 'JP'
  },
  {
    id: 'claris',
    name: "ClariS",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anisong Duo",
    emoji: '✨',
    hitsHint: "Connect (Madoka Magica), Irony (Oreimo), ALIVE (Lycoris Recoil), Hitorigoto (Eromanga Sensei)",
    storefront: 'JP'
  },
  {
    id: 'fripside',
    name: "fripSide",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Digital J-Pop",
    emoji: '⚡',
    hitsHint: "only my railgun (Railgun), LEVEL5 -judgelight-, sister's noise, black bullet",
    storefront: 'JP'
  },
  {
    id: 'jam_project',
    name: "JAM Project",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anisong Supergroup",
    emoji: '👊',
    hitsHint: "THE HERO !! (One Punch Man), SKILL, GONG, Seijaku no Apostle",
    storefront: 'JP'
  },
  {
    id: 'granrodeo',
    name: "GRANRODEO",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anime / Hard Rock",
    emoji: '🏀',
    hitsHint: "Can Do (Kuroko no Basket), The Other self, Punky Funky Love, TRASH CANDY (Bungou Stray Dogs)",
    storefront: 'JP'
  },
  {
    id: 'alia',
    name: "AliA",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock",
    emoji: '🎭',
    hitsHint: "kakurenbo (かくれんぼ), impulse, eye, animation",
    storefront: 'JP'
  },
  {
    id: 'goose_house',
    name: "Goose house",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Acoustic / Pop",
    emoji: '🎻',
    hitsHint: "Hikaru Nara (Your Lie in April 光るなら), Oto no Naru Hou e (Silver Spoon), NonStop Journey",
    storefront: 'JP'
  },
  {
    id: 'reona',
    name: "ReoNa",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anisong / Dark Pop",
    emoji: '🗡️',
    hitsHint: "ANIMA (Sword Art Online), forget-me-not, Till the End, Nai Nai (Shadows House)",
    storefront: 'JP'
  },
  {
    id: 'asca',
    name: "ASCA",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Anisong / Rock",
    emoji: '⚔️',
    hitsHint: "RESISTER (Sword Art Online), Howling (Mahouka), Koe (Fate/Apocrypha)",
    storefront: 'JP'
  },
  {
    id: 'sayuri',
    name: "Sayuri",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "Acid Folk / Anime",
    emoji: '🌧️',
    hitsHint: "Mikazuki (Rampo Kitan), Sore wa Chiisana Hikari no Youna (Erased), Hana no Tou (Lycoris Recoil), Heikousen",
    storefront: 'JP'
  },
  {
    id: 'minami',
    name: "Minami",
    region: 'anime_jpop',
    regionLabel: 'Anime & J-POP',
    genreLabel: "J-Rock / Singer-Songwriter",
    emoji: '💧',
    hitsHint: "Crying for Rain (Kawaki wo Ameku カワキヲアメク DomeKano), Main Actor, Hollowness, Rude Lose Dance",
    storefront: 'JP'
  },
  // Thai Rock, Y2K & Lukthung Additions
  {
    id: 'hangman',
    name: 'Hangman',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก / อัลเทอร์เนทีฟ',
    emoji: '🎸',
    hitsHint: 'ช็อกโกแลต, สัญญา, รักเธอหัวทิ่มบ่อ, พยายามกี่ครั้งก็ตามแต่',
    storefront: 'TH'
  },
  {
    id: 'boyscout',
    name: 'Boyscout',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'บอยแบนด์ / Y2K',
    emoji: '👦',
    hitsHint: 'ปอดปอด, ขอคืน, แก๊งใจง่าย, คิกขุอาโนเนะ',
    storefront: 'TH'
  },
  {
    id: 'c_quint',
    name: 'C-Quint',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'T-POP / บอยแบนด์',
    emoji: '🕺',
    hitsHint: 'ต่อให้โลกหยุดหมุน, อาการนอกใจ, ไม่อยากลืมตา, หน้าไม่อาย',
    storefront: 'TH'
  },
  {
    id: 'yodrak_salakjai',
    name: 'ยอดรัก สลักใจ',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ลูกทุ่งคลาสสิก',
    emoji: '🌾',
    hitsHint: '30 ยังแจ๋ว, ทหารใหม่ไปกอง, ล่องเรือหารัก, จูบไม่หวาน',
    storefront: 'TH'
  },
  {
    id: 'oblivious',
    name: 'Oblivious',
    region: 'thai',
    regionLabel: 'ไทย',
    genreLabel: 'ร็อก / อีโม',
    emoji: '⚡',
    hitsHint: 'เหนือความคาดหมาย, บ้าบอ, การเดินทางที่ไม่มีจุดหมาย, รูปภาพ',
    storefront: 'TH'
  },
  // International Pop & Legendary Rock
  {
    id: 'rihanna',
    name: 'Rihanna',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop / R&B',
    emoji: '💎',
    hitsHint: 'Umbrella, Diamonds, We Found Love, Work, Stay',
    storefront: 'US'
  },
  {
    id: 'green_day',
    name: 'Green Day',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Punk Rock / Rock',
    emoji: '🎸',
    hitsHint: 'American Idiot, 21 Guns, Boulevard of Broken Dreams, Wake Me Up When September Ends, Basket Case',
    storefront: 'US'
  },
  {
    id: 'the_killers',
    name: 'The Killers',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Indie Rock / Synth Rock',
    emoji: '⚡',
    hitsHint: 'Mr. Brightside, Somebody Told Me, When You Were Young, Human',
    storefront: 'US'
  },
  {
    id: 'fall_out_boy',
    name: 'Fall Out Boy',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Pop Punk / Rock',
    emoji: '🔥',
    hitsHint: "Centuries, Thnks fr th Mmrs, Sugar, We're Goin Down, Immortals, My Songs Know What You Did in the Dark",
    storefront: 'US'
  },
  {
    id: 'nirvana',
    name: 'Nirvana',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Grunge / Alt Rock',
    emoji: '🎸',
    hitsHint: 'Smells Like Teen Spirit, Come As You Are, Lithium, In Bloom, Heart-Shaped Box',
    storefront: 'US'
  },
  // International EDM Superstars
  {
    id: 'calvin_harris',
    name: 'Calvin Harris',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Dance Pop',
    emoji: '🎧',
    hitsHint: 'Summer, This Is What You Came For, One Kiss, Feel So Close, How Deep Is Your Love',
    storefront: 'US'
  },
  {
    id: 'martin_garrix',
    name: 'Martin Garrix',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Progressive House',
    emoji: '➕',
    hitsHint: 'Animals, In the Name of Love, Scared to Be Lonely, Tremor, High on Life',
    storefront: 'US'
  },
  {
    id: 'dj_snake',
    name: 'DJ Snake',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Trap',
    emoji: '🐍',
    hitsHint: 'Turn Down for What, Let Me Love You, Lean On, Taki Taki, Middle',
    storefront: 'US'
  },
  {
    id: 'kygo',
    name: 'Kygo',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'Tropical House / EDM',
    emoji: '🎹',
    hitsHint: "Firestone, Stole the Show, It Ain't Me, Remind Me to Forget, Higher Love",
    storefront: 'US'
  },
  {
    id: 'major_lazer',
    name: 'Major Lazer',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Dancehall',
    emoji: '💥',
    hitsHint: 'Lean On, Cold Water, Light It Up, Watch Out for This',
    storefront: 'US'
  },
  {
    id: 'tiesto',
    name: 'Tiësto',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Dance',
    emoji: '🔊',
    hitsHint: 'The Business, Secrets, Red Lights, 10:35, The Motto',
    storefront: 'US'
  },
  {
    id: 'swedish_house_mafia',
    name: 'Swedish House Mafia',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / House',
    emoji: '⚫',
    hitsHint: "Don't You Worry Child, Save the World, Moth to a Flame, Greyhound",
    storefront: 'US'
  },
  {
    id: 'alesso',
    name: 'Alesso',
    region: 'inter',
    regionLabel: 'สากล',
    genreLabel: 'EDM / Progressive House',
    emoji: '🎛️',
    hitsHint: 'Heroes, Under Control, If I Lose Myself, Calling (Lose My Mind), Remedy',
    storefront: 'US'
  }
];

// Presets for instant fun
export interface ArtistPreset {
  id: string;
  title: string;
  region: ArtistRegion | 'all';
  subtitle: string;
  artists: string[];
}

export const ARTIST_PRESETS: ArtistPreset[] = [
  // ==========================================
  // 🇹🇭 1. เพลงไทย (THAI MUSIC) - 12 หมวด
  // ==========================================
  {
    id: 'preset_thai_rock_2000s',
    title: '🎸 ร็อกไทย 2000s มันส์หยุดไม่อยู่',
    region: 'thai',
    subtitle: 'Bodyslam, Potato, Cocktail, Clash, Big Ass, The Richman Toy, Labanoon, Klear, Zeal, Dr.Fuu',
    artists: ['Bodyslam', 'Potato', 'Cocktail', 'Clash', 'Big Ass', 'The Richman Toy', 'Labanoon', 'Getsunova', 'Klear', 'Zeal', '25hours', 'So Cool', 'Kala', 'Paradox', 'Slot Machine', 'Dr.Fuu']
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
    subtitle: 'Safeplanet, Dept, HYBS, Zweed n\' Roll, เรนิษรา, AYLA\'s, Mirrr, Fellow Fellow, Polycat',
    artists: ['Safeplanet', 'Dept', 'HYBS', "Zweed n' Roll", 'เรนิษรา', "AYLA's", 'Anatomy Rabbit', 'Mirrr', 'Fellow Fellow', 'Polycat', 'Scrubb', 'Whal & Dolph', 'YENTED', 'The TOYS', 'PURPEECH', 'YourMOOD', 'Landokmai', 'Television Off', 'guncharlie', 'SOYBAD']
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
    subtitle: 'YOUNGOHM, illslick, UrboyTJ, AUTTA, GAVIN:D, SURIYA MQT, P6ICK, BLVCKHEART, SARAN, WONDERFRAME',
    artists: ['YOUNGOHM', 'illslick', 'UrboyTJ', 'AUTTA', 'GAVIN:D', 'SURIYA MQT', 'P6ICK', 'BLVCKHEART', 'SPRITE', 'F.HERO', 'SARAN', 'D GERRARD', 'Twopee Southside', 'LAZYLOXY', 'MILLI', 'RachYO', 'TangBadVoice', '1MILL', 'MAIYARAP', 'DIAMOND MQT', 'WONDERFRAME']
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
    subtitle: 'แสตมป์, Room39, สิงโต นำโชค, Atom, Oat Pramote, Wanyai, วัชราวลี, Zom Marie, Lipta',
    artists: ['แสตมป์ อภิวัชร์', 'สิงโต นำโชค', 'Zom Marie', 'TWO Popetorn', 'Lipta', 'No One Else', 'Sarah Salola', 'Patrickananda', 'First Anuwat', 'Bell Supol', 'Wan Thanakrit', 'Pop Pongkool', 'Boy Peacemaker', 'SERIOUS BACON', 'Armchair', 'Superbaker', 'Room39', 'Wanyai', 'WhatChaRaWaLee', 'Atom Chanakan', 'Oat Pramote']
  },
  {
    id: 'preset_thai_diva_legends',
    title: '👑 ป็อปดีว่า & ตัวพ่อตัวแม่ 90s-2000s',
    region: 'thai',
    subtitle: 'Bird Thongchai, New & Jiew, Christina, Nicole, Mos, Ploychompoo, Jay Jetrin, Tata Young',
    artists: ['Bird Thongchai', 'New & Jiew', 'Christina Aguilar', 'Nicole Theriault', 'Mos Patiparn', 'Ploychompoo', 'Jay Jetrin', 'Peck Palitchoke', 'Bie Sukrit', 'Ice Saranyu', 'Aof Pongsak', 'Palmy', 'Endorphine', 'Tata Young', 'Ben Chalatit', 'James Ruangsak']
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
    artists: ['Retrospect', 'Sweet Mullet', 'Ebola', 'Bomb At Track', 'The Yers', 'Lomosonic', 'Paper Planes', 'Taitosmith', 'Little John']
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
    subtitle: 'Eminem, Drake, Kendrick Lamar, Central Cee, Travis Scott, Post Malone, Jack Harlow',
    artists: ['Eminem', 'Drake', 'Kendrick Lamar', 'Central Cee', 'Travis Scott', 'Post Malone', 'Jack Harlow', 'Lil Nas X', 'Juice WRLD', 'XXXTENTACION', 'Nicki Minaj', 'Cardi B', 'Doja Cat', 'Megan Thee Stallion']
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

export function getArtistStorefront(artistName: string): 'TH' | 'US' | 'KR' | 'JP' {
  const cleanName = artistName.trim().toLowerCase();
  const match = GLOBAL_ARTISTS.find(
    (a) => a.name.toLowerCase() === cleanName || a.id.toLowerCase() === cleanName
  );
  if (match) {
    return match.storefront === 'KR' ? 'US' : match.storefront;
  }

  // Language script heuristics
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(artistName)) return 'JP';
  if (/[\u0E00-\u0E7F]/.test(artistName)) return 'TH';

  return 'US';
}

export const ARTIST_ALIASES: Record<string, string[]> = {
  'cortis': ['코르티스', 'CORTIS'],
  'heart2heart': ['Heart2Heart', 'Hearts2Hearts', 'H2H', '하츠투하츠'],
  'hearts2hearts': ['Heart2Heart', 'Hearts2Hearts', 'H2H', '하츠투하츠'],
  'h2h': ['Heart2Heart', 'Hearts2Hearts'],
  // Thai Country, Folk & Rock
  'คาราบาว': ['Carabao', 'Add Carabao', 'แอ๊ด คาราบาว'],
  'carabao': ['คาราบาว', 'Add Carabao', 'แอ๊ด คาราบาว'],
  'add carabao': ['คาราบาว', 'Carabao', 'แอ๊ด คาราบาว'],
  'แอ๊ด คาราบาว': ['Carabao', 'Add Carabao', 'คาราบาว'],
  'มนต์แคน แก่นคูน': ['Monkan Kankoon', 'Monkan'],
  'monkan kankoon': ['มนต์แคน แก่นคูน', 'มนต์แคน'],
  'ลำไย ไหทองคำ': ['Lumyai Hitongkam', 'Lamyai Haithongkham', 'Lamyai', 'ลำไย'],
  'lumyai hitongkam': ['ลำไย ไหทองคำ', 'ลำไย'],
  'lamyai haithongkham': ['ลำไย ไหทองคำ', 'ลำไย'],
  'ก้อง ห้วยไร่': ['Kong Huayrai', 'Kong Huay Rai'],
  'kong huayrai': ['ก้อง ห้วยไร่'],
  'ไผ่ พงศธร': ['Pai Pongsathon', 'Phai Phongsathon'],
  'pai pongsathon': ['ไผ่ พงศธร'],
  'ต่าย อรทัย': ['Tai Orathai'],
  'tai orathai': ['ต่าย อรทัย'],
  'ตั๊กแตน ชลดา': ['Takkatan Chonlada', 'ตั๊กแตน'],
  'takkatan chonlada': ['ตั๊กแตน ชลดา'],
  'จินตหรา พูนลาภ': ['Jintalar Poonlab', 'Jintara Poonlarp', 'จินตหรา'],
  'jintalar poonlab': ['จินตหรา พูนลาภ'],
  'เบิ้ล ปทุมราช': ['Ble Patumrach'],
  'ble patumrach': ['เบิ้ล ปทุมราช'],
  'แซ็ค ชุมแพ': ['ZAK CHUMPAE', 'Zak Chumpae'],
  'zak chumpae': ['แซ็ค ชุมแพ'],
  'ไหมไทย หัวใจศิลป์': ['Maithai Huajaisil', 'Maithai Jaitawan', 'Mai Thai', 'ไหมไทย'],
  'maithai huajaisil': ['ไหมไทย หัวใจศิลป์'],
  'หญิงลี ศรีจุมพล': ['Yinglee Srijumpol', 'Yinglee', 'หญิงลี'],
  'yinglee srijumpol': ['หญิงลี ศรีจุมพล'],
  'พงษ์สิทธิ์ คำภีร์': ['Pongsit Kampee', 'Pu Pongsit Kampee', 'คำภีร์', 'พงษ์สิทธิ์'],
  'pongsit kampee': ['พงษ์สิทธิ์ คำภีร์'],
  'มาลีฮวนน่า': ['Maleehuana', 'มาลีฮวนนา'],
  'maleehuana': ['มาลีฮวนน่า'],
  'มีนตรา อินทิรา': ['MEENTRA INTIRA', 'Meentra Intira', 'มีนตรา'],
  'meentra intira': ['มีนตรา อินทิรา'],
  'พุ่มพวง ดวงจันทร์': ['Phumphuang Duangchan', 'Pumpuang Duangjan', 'พุ่มพวง ดวงจันท์', 'พุ่มพวง'],
  'phumphuang duangchan': ['พุ่มพวง ดวงจันทร์'],
  'เต๊ะ ตระกูลตอ': ['Tae Trakooltor'],
  'tae trakooltor': ['เต๊ะ ตระกูลตอ'],
  'เต๋า ภูศิลป์': ['Tao Phusilp'],
  'tao phusilp': ['เต๋า ภูศิลป์'],
  'ศิริพร อำไพพงษ์': ['Siriporn Umpaipong'],
  'สุนารี ราชสีมา': ['Sunaree Rachasima'],
  'ยอดรัก สลักใจ': ['Yodrak Salakjai'],
  'กล้วย คลองหอยโข่ง': ['Kluay Klonghoikong'],
  'เนสกาแฟ ศรีนคร': ['Nescafe Srinakorn'],
  'อาม ชุติมา': ['Arm Chutima'],
  'แอน อรดี': ['Ann Oradee'],
  'รัชนก ศรีโลพันธุ์': ['Ratchanok Srilophan'],
  'เปาวลี พรพิมล': ['Paowalee Pornpimon'],
  // Thai Pop, Rock, 90s, Kamikaze
  'สิงโต นำโชค': ['Singto Numchok', 'สิงโต'],
  'singto numchok': ['สิงโต นำโชค'],
  'แสตมป์ อภิวัชร์': ['Stamp', 'Stamp Apiwat', 'แสตมป์'],
  'stamp apiwat': ['แสตมป์ อภิวัชร์', 'Stamp'],
  'เบิร์ด ธงไชย': ['Bird Thongchai', 'Thongchai McIntyre', 'เบิร์ด'],
  'bird thongchai': ['เบิร์ด ธงไชย'],
  'เสก โลโซ': ['Sek Loso', 'Loso'],
  'sek loso': ['เสก โลโซ', 'Loso'],
  'ชิน ชินวุฒ': ['Chin Chinawut'],
  'chin chinawut': ['ชิน ชินวุฒ'],
  'ไอซ์ ศรัณยู': ['Ice Saranyu'],
  'ice saranyu': ['ไอซ์ ศรัณยู'],
  'บี้ สุกฤษฎิ์': ['Bie Sukrit', 'บี้'],
  'bie sukrit': ['บี้ สุกฤษฎิ์'],
  'เป๊ก ผลิตโชค': ['Peck Palitchoke', 'เป๊ก'],
  'peck palitchoke': ['เป๊ก ผลิตโชค'],
  'อ๊อฟ ปองศักดิ์': ['Aof Pongsak', 'อ๊อฟ'],
  'aof pongsak': ['อ๊อฟ ปองศักดิ์'],
  'ทาทา ยัง': ['Tata Young'],
  'tata young': ['ทาทา ยัง'],
  'คริสติน่า อากีล่าร์': ['Christina Aguilar', 'คริสติน่า'],
  'christina aguilar': ['คริสติน่า อากีล่าร์'],
  'นิโคล เทริโอ': ['Nicole Theriault', 'นิโคล'],
  'nicole theriault': ['นิโคล เทริโอ'],
  'มอส ปฏิภาณ': ['Mos Patiparn', 'มอส'],
  'mos patiparn': ['มอส ปฏิภาณ'],
  'เจ เจตริน': ['Jay Jetrin', 'J Jetrin'],
  'jay jetrin': ['เจ เจตริน'],
  'เต๋า สมชาย': ['Tao Somchai'],
  'tao somchai': ['เต๋า สมชาย'],
  'แดน บีม': ['Dan & Beam', 'Dan Beam'],
  'dan & beam': ['แดน บีม'],
  'กอล์ฟ ไมค์': ['Golf Mike', 'Golf & Mike'],
  'golf mike': ['กอล์ฟ ไมค์'],
  'โฟร์ มด': ['Four Mod', 'Four-Mod'],
  'four mod': ['โฟร์ มด'],
  'เค-โอติก': ['K-OTIC', 'K-Otic', 'kotic'],
  'k-otic': ['เค-โอติก'],
  'เกิร์ลลี่ เบอร์รี่': ['Girly Berry'],
  'girly berry': ['เกิร์ลลี่ เบอร์รี่'],
  'เนโกะ จัมพ์': ['Neko Jump'],
  'neko jump': ['เนโกะ จัมพ์'],
  'หวาย': ['Waii'],
  'waii': ['หวาย'],
  'ดา เอ็นโดรฟิน': ['Endorphine', 'Da Endorphine', 'ดา'],
  'da endorphine': ['Endorphine', 'ดา เอ็นโดรฟิน'],
  'endorphine': ['ดา เอ็นโดรฟิน', 'Da Endorphine', 'ดา'],
  'diamond mqt': ['ไดมอนด์', 'ไดม่อนด์', 'Diamond'],
  'ลุลา': ['Lula'],
  'lula': ['ลุลา'],
  'bnk48': ['บีเอ็นเค48', 'บีเอ็นเค', 'BNK'],
  'บีเอ็นเค48': ['BNK48'],
  'ice paris': ['ไอซ์ พาริส', 'พาริส'],
  'ไอซ์ พาริส': ['Ice Paris'],
  'whal & dolph': ['วาฬแอนด์ดอล์ฟ', 'Whal and Dolph'],
  'yented': ['เย็นเต็ด'],
  'younggu': ['ยังกู'],
  'hybs': ['HYBS'],
  'zweed n\' roll': ['Zweed n Roll', 'สวีด แอนด์ โรล', 'สวีดแอนด์โรล', 'Zweed n’ Roll'],
  'ส้ม มารี': ['Zom Marie', 'ZOM MARIE'],
  'zom marie': ['ส้ม มารี', 'Zom Marie'],
  'little john': ['Little John', 'LITTLE JOHN', 'ลิตเติ้ล จอห์น', 'ลิตเติล จอห์น', 'ลิตเติ้ลจอห์น'],
  'ลิตเติ้ล จอห์น': ['Little John', 'LITTLE JOHN'],
  'ลิตเติ้ลจอห์น': ['Little John', 'LITTLE JOHN'],
  'ploychompoo': ['Ploychompoo', 'พลอยชมพู', 'Jannine Weigel'],
  'พลอยชมพู': ['Ploychompoo', 'Jannine Weigel'],
  'jannine weigel': ['Ploychompoo', 'พลอยชมพู'],
  'new & jiew': ['นิว จิ๋ว', 'New Jiew', 'นิวจิ๋ว', 'New & Jiew'],
  'นิว จิ๋ว': ['New & Jiew', 'New Jiew', 'นิวจิ๋ว'],
  'new jiew': ['New & Jiew', 'นิว จิ๋ว'],
  'two popetorn': ['ตู่ ภพธร', 'TWO Popetorn', 'ตู่'],
  'ตู่ ภพธร': ['TWO Popetorn', 'Two Popetorn'],
  'the richman toy': ['The Richman Toy', 'เดอะ ริชแมน ทอย', 'ริชแมนทอย'],
  'gavin:d': ['GAVIN:D', 'Gavin D', 'กวินท์', 'กวินท์ ดูวาล'],
  'กวินท์': ['GAVIN:D', 'Gavin D'],
  'autta': ['AUTTA', 'อัตตา'],
  'อัตตา': ['AUTTA'],
  'central cee': ['Central Cee', 'Centralcee'],
  'ayla\'s': ["AYLA's", 'AYLA', 'ไอล่า', 'ไอล่าส์'],
  'ayla': ["AYLA's", 'ไอล่า'],
  'blvckheart': ['BLVCKHEART', 'Blackheart', 'แบล็คฮาร์ท'],
  'p6ick': ['P6ICK', 'พิก'],
  'เรนิษรา': ['เรนิษรา', 'reinizra'],
  'reinizra': ['เรนิษรา'],
  'suriya mqt': ['SURIYA MQT', 'SURIYA', 'สุริยา', 'สุริยา เอ็มคิวที'],
  'suriya': ['SURIYA MQT', 'สุริยา'],
  'only monday': ['Only Monday', 'โอนลี่ มันเดย์', 'โอนลี่มันเดย์'],
  'rooftop': ['ROOFTOP', 'รูฟท็อป'],
  'oat pramote': ['โอ๊ต ปราโมทย์', 'โอ๊ต', 'ปราโมทย์ ปาทาน', 'Oat Pramote', 'Oat'],
  'โอ๊ต ปราโมทย์': ['Oat Pramote', 'โอ๊ต', 'ปราโมทย์ ปาทาน'],
  'โอ๊ต': ['Oat Pramote', 'โอ๊ต ปราโมทย์'],
  'guncharlie': ['กันชาร์ลี', 'กัญจน์ กันต์ธีร์'],
  'กันชาร์ลี': ['guncharlie'],
  'atom chanakan': ['อะตอม ชนกันต์', 'Atom Chanakan', 'Atom', 'อะตอม'],
  'atom': ['Atom Chanakan', 'อะตอม ชนกันต์', 'อะตอม'],
  'อะตอม ชนกันต์': ['Atom Chanakan', 'Atom', 'อะตอม'],
  'อะตอม': ['Atom Chanakan', 'Atom', 'อะตอม ชนกันต์'],
  'dr.fuu': ['Dr Fuu', 'ด็อกเตอร์ฟู', 'Dr. Fuu', 'ดร.ฟู'],
  'dr fuu': ['Dr.Fuu', 'ด็อกเตอร์ฟู', 'Dr. Fuu'],
  'ด็อกเตอร์ฟู': ['Dr.Fuu', 'Dr Fuu', 'ดร.ฟู'],
  'soybad': ['Soybad', 'ซอยแบด'],
  'ซอยแบด': ['SOYBAD', 'Soybad'],
  'wonderframe': ['วันเดอร์เฟรม', 'เฟรม', 'Wonderframe'],
  'วันเดอร์เฟรม': ['WONDERFRAME', 'Wonderframe'],
  'room39': ['Room 39', 'รูม39', 'รูม 39'],
  'room 39': ['Room39', 'รูม39', 'รูม 39'],
  'รูม39': ['Room39', 'Room 39'],
  'wanyai': ['WANYAi', 'แว่นใหญ่', 'โอฬาร ชูใจ'],
  'แว่นใหญ่': ['Wanyai', 'WANYAi'],
  'whatcharawalee': ['วัชราวลี', 'Whatcharawalee', 'WhatChaRaWaLee'],
  'วัชราวลี': ['WhatChaRaWaLee', 'Whatcharawalee'],
  'carly rae jepsen': ['คาร์ลี เร เจปเซน', 'Carly'],
  'ellie goulding': ['เอลลี กูลดิง', 'Ellie'],
  'keshi': ['เคชิ'],
  'เคชิ': ['keshi'],
  'jeremy zucker': ['เจเรมี ซัคเกอร์', 'Jeremy'],
  // Anime & J-Pop
  'yoasobi': ['ヨアソビ'],
  'lisa': ['リサ', '리사', 'LISA', 'LiSA'],
  'kenshi yonezu': ['米津玄師'],
  '米津玄師': ['Kenshi Yonezu'],
  'ado': ['アド'],
  'radwimps': ['ラッドウィンプス'],
  'king gnu': ['キングヌー'],
  'official hige dandism': ['Official髭男dism', 'Hige Dan'],
  'official髭男dism': ['Official HIGE DANdism'],
  'eve': ['いぶ'],
  'vaundy': ['バウンディ'],
  'aimer': ['エメ'],
  'aimyon': ['あいみょん'],
  'あいみょん': ['Aimyon'],
  'fujii kaze': ['藤井 風', '藤井風'],
  '藤井 風': ['Fujii Kaze'],
  'yuuri': ['優里'],
  '優里': ['Yuuri'],
  'mrs. green apple': ['ミセス'],
  'hikaru utada': ['宇多田ヒカル', 'Utada Hikaru'],
  '宇多田ヒカル': ['Hikaru Utada'],
  'yorushika': ['ヨルシカ'],
  'ヨルシカ': ['Yorushika'],
  'zutomayo': ['ずっと真夜中でいいのに。'],
  'ずっと真夜中でいいのに。': ['ZUTOMAYO'],
  'back number': ['バックナンバー'],
  'sekai no owari': ['世界の終わり'],
  'bump of chicken': ['バンプオブチキン'],
  'gen hoshino': ['星野源'],
  '星野源': ['Gen Hoshino'],
  'daoko': ['だをこ'],
  'atarashii gakko!': ['新しい学校のリーダーズ'],
  'kana nishino': ['西野カナ'],
  'yui': ['ユイ'],
  'mika nakashima': ['中島美嘉'],
  'ayumi hamasaki': ['浜崎あゆみ'],
  'namie amuro': ['安室奈美恵'],
  // K-Pop
  'bts': ['방탄소년단', 'Bangtan'],
  '방탄소년단': ['BTS'],
  'blackpink': ['블랙핑크'],
  '블랙핑크': ['BLACKPINK'],
  'twice': ['트와이스'],
  '트와이스': ['TWICE'],
  'newjeans': ['뉴진스'],
  '뉴진스': ['NewJeans'],
  'aespa': ['에스파'],
  '에스파': ['aespa'],
  'ive': ['아이브'],
  '아이브': ['IVE'],
  'le sserafim': ['르세라핌'],
  '르세拉핌': ['LE SSERAFIM'],
  'stray kids': ['스트레이 키즈'],
  '스트레이 키즈': ['Stray Kids'],
  'seventeen': ['세븐틴'],
  '세븐틴': ['SEVENTEEN'],
  '(g)i-dle': ['여자아이들', 'i-dle', 'gidle'],
  '여자아이들': ['(G)I-DLE'],
  'itzy': ['있지'],
  'red velvet': ['레드벨벳'],
  'exo': ['엑소'],
  'iu': ['아이유'],
  '아이유': ['IU'],
  'taeyeon': ['태연'],
  '태연': ['Taeyeon'],
  'psy': ['싸이'],
  'g-dragon': ['지드래곤'],
  '지드래곤': ['G-DRAGON'],
  'taeyang': ['태양'],
  '태양': ['TAEYANG'],
  'rosé': ['rose', '로제'],
  '로제': ['ROSÉ', 'Rose'],
  'jennie': ['제니'],
  '제니': ['JENNIE'],
  '리사': ['LISA', 'LiSA'],
  'jisoo': ['지수'],
  '지수': ['JISOO'],
  'jung kook': ['jungkook', '정국'],
  '정국': ['Jung Kook'],
  'jimin': ['지민'],
  '지민': ['Jimin'],
  'v': ['뷔', 'taehyung'],
  '뷔': ['V'],
  'agust d': ['suga', '슈가'],
  '슈가': ['Agust D', 'SUGA'],
  'jin': ['진'],
  '진': ['Jin'],
  'j-hope': ['제이홉'],
  'rm': ['알엠'],
  // Thai & Asian Music Aliases
  'four-mod': ['Four Mod', 'โฟร์มด', 'โฟร์-มด'],
  'modern dog': ['Moderndog', 'โมเดิร์นด็อก'],
  'moderndog': ['Modern Dog', 'โมเดิร์นด็อก'],
  'อัสนี วสันต์': ['Asanee Wasan', 'อัสนี-วสันต์', 'อัสนี'],
  'asanee wasan': ['อัสนี วสันต์', 'อัสนี-วสันต์'],
  'girls\' generation': ['SNSD', 'เกิลส์เจเนอเรชัน', '소녀시대', 'Girls\' Generation (SNSD)'],
  'snsd': ['Girls\' Generation', 'เกิลส์เจเนอเรชัน', '소녀시대', 'Girls\' Generation (SNSD)'],
  'boyscout': ['บอยสเก๊าท์', 'บอยสเกาท์'],
  'c-quint': ['ซีควินท์', 'C Quint', 'ซีควินต์'],
  'hangman': ['แฮงแมน'],
  'oblivious': ['ออบลิเวียส'],
};

export function getArtistAliases(name: string): string[] {
  const clean = name.trim().toLowerCase();
  const results = new Set<string>();

  for (const [key, list] of Object.entries(ARTIST_ALIASES)) {
    const normKey = key.toLowerCase().replace(/[\s\-_.,!?'"()[\]{}【】]/g, '').trim();
    const normClean = clean.replace(/[\s\-_.,!?'"()[\]{}【】]/g, '').trim();
    if (normKey === normClean) {
      for (const alias of list) {
        results.add(alias.toLowerCase().replace(/[\s\-_.,!?'"()[\]{}【】]/g, '').trim());
      }
    }
  }

  return Array.from(results);
}

const ARTIST_ITUNES_IDS: Record<string, number> = {
  '1mill': 1464572030,
  'onemill': 1464572030,
  'milli': 1527648726,
  'pun': 1614805714,
  'v': 1191852113,
  // Thai Indie & Rock artists with ambiguous global names
  'dept': 1479939939,           // Thai Indie Pop band Dept (Smallroom) - not Korean R&B Dept
  'socool': 264759167,          // Thai Rock band So Cool - not SISTAR/DAY6
  'clash': 827951,              // Thai Rock band Clash
  'hangman': 1798659218,        // Thai Rock band HANGMAN (To Silly Fools)
  'zeal': 93522843,             // Thai Rock band Zeal
  'kala': 1462818528,           // Thai Rock band Kala
  'numkala': 700727213,         // Num Kala
  'ebola': 187169898,           // Thai Rock band Ebola
  'freehand': 1154949848,       // Thai Indie band Freehand
  'yented': 1342691242,         // Thai Indie band Yented
  'whalndolph': 1203155982,     // Thai Indie Whal & Dolph
  'whalanddolph': 1203155982,   // Thai Indie Whal & Dolph
  'polycat': 253438210,         // Thai Pop/Indie POLYCAT
  'fellowfellow': 599575151,    // Thai Pop band Fellow Fellow
  'purpeech': 1565492336,       // Thai Indie band PURPEECH
  'anatomyrabbit': 1456053491,  // Thai Indie band Anatomy Rabbit
  'littlejohn': 1790625632,     // Thai Rock band LITTLE JOHN (9Arkkhan)
};

export function getArtistItunesId(name: string): number | undefined {
  const norm = name.trim().toLowerCase().replace(/[\s\-_.]/g, '');
  if (ARTIST_ITUNES_IDS[norm]) {
    return ARTIST_ITUNES_IDS[norm];
  }
  const artist = GLOBAL_ARTISTS.find((a) => a.name.toLowerCase() === name.toLowerCase() || a.id === name.toLowerCase());
  return artist?.itunesArtistId;
}
