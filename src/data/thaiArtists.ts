export interface ThaiArtist {
  id: string;
  name: string;
  group: 'rock' | 'tpop' | 'y2k' | 'lukthung';
  groupLabel: string;
  emoji: string;
  hitsHint: string;
}

export const THAI_ARTISTS: ThaiArtist[] = [
  // -------------------------------------------------------------
  // 1. Rock & Classic Strings (ร็อก & สตริงฮิตอมตะ)
  // -------------------------------------------------------------
  {
    id: 'bodyslam',
    name: 'Bodyslam',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎸',
    hitsHint: 'ความรัก, แสงสุดท้าย, ยาพิษ'
  },
  {
    id: 'potato',
    name: 'Potato',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🥔',
    hitsHint: 'ทิ้งไว้กลางทาง, ขอบคุณที่รักกัน'
  },
  {
    id: 'cocktail',
    name: 'Cocktail',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🍸',
    hitsHint: 'คุกเข่า, เธอ, ดึงดัน'
  },
  {
    id: 'getsunova',
    name: 'Getsunova',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🌙',
    hitsHint: 'ไกลแค่ไหน คือ ใกล้, คนไม่จำเป็น'
  },
  {
    id: 'labanoon',
    name: 'Labanoon',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎸',
    hitsHint: 'เชือกวิเศษ, แพ้ทาง, ยาม'
  },
  {
    id: 'clash',
    name: 'Clash',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '⚡',
    hitsHint: 'ขอเช็ดน้ำตา, โรคประจำตัว, เธอจะอยู่กับฉันตลอดไป'
  },
  {
    id: 'big_ass',
    name: 'Big Ass',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🔥',
    hitsHint: 'เล่นของสูง, ก่อนตาย, ข่มใจ'
  },
  {
    id: 'palmy',
    name: 'Palmy',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🌸',
    hitsHint: 'ซ่อนกลิ่น, กอดในใจ, คิดมาก'
  },
  {
    id: 'tattoo_colour',
    name: 'Tattoo Colour',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎨',
    hitsHint: 'ขาหมู, ซ่อนหา, ฟ้า'
  },
  {
    id: 'paradox',
    name: 'Paradox',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🍭',
    hitsHint: 'ฤดูร้อน, มีแต่เธอ, น้องเปิ้ล'
  },
  {
    id: 'klear',
    name: 'Klear',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '💧',
    hitsHint: 'คำยินดี, รักไม่ต้องการเวลา'
  },
  {
    id: 'zeal',
    name: 'Zeal',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🛡️',
    hitsHint: 'สองรัก, หมดชีวิตฉันให้เธอ, เตลิด'
  },
  {
    id: 'lomosonic',
    name: 'Lomosonic',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🚀',
    hitsHint: 'ความรู้สึกของวันนี้, ขอ'
  },
  {
    id: 'slot_machine',
    name: 'Slot Machine',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '👁️',
    hitsHint: 'จันทร์เจ้า, เคลิ้ม'
  },
  {
    id: 'silly_fools',
    name: 'Silly Fools',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🤘',
    hitsHint: 'ขี้หึง, วัดใจ, น้ำลาย, จิ๊จ๊ะ'
  },
  {
    id: 'loso',
    name: 'Loso',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎸',
    hitsHint: 'ซมซาน, ใจสั่งมา, อะไรก็ยอม'
  },
  {
    id: 'taitosmith',
    name: 'Taitosmith',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '💣',
    hitsHint: 'Hello Mama, เพื่อชีวิตกู'
  },
  {
    id: 'little_john',
    name: 'Little John',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '⚡',
    hitsHint: 'ฉันไม่ต้องการตัวเธอในตอนนี้, รสชาติชีวิต, ที่ผ่านมาขอบใจจริงๆ'
  },
  {
    id: 'twenty_five_hours',
    name: '25hours',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '⏰',
    hitsHint: 'ยินดีที่ไม่รู้จัก, ไม่เคย, ทำได้เพียง'
  },
  {
    id: 'musketeers',
    name: 'Musketeers',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎩',
    hitsHint: 'Dancing, ใจความสำคัญ'
  },
  {
    id: 'the_parkinson',
    name: 'The Parkinson',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎷',
    hitsHint: 'เพื่อนรัก, หมดแก้ว, จะบอกเธอว่ารัก'
  },

  // -------------------------------------------------------------
  // 2. T-POP & Modern Indie (T-POP & อินดี้รุ่นใหม่)
  // -------------------------------------------------------------
  {
    id: 'three_man_down',
    name: 'Three Man Down',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '✨',
    hitsHint: 'ถ้าเธอรักฉันจริง, ฝนตกไหม, ฝันถึงแฟนเก่า'
  },
  {
    id: 'tilly_birds',
    name: 'Tilly Birds',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🕊️',
    hitsHint: 'คิดแต่ไม่ถึง, เพื่อนเล่น ไม่เล่นเพื่อน'
  },
  {
    id: 'jeff_satur',
    name: 'Jeff Satur',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🪐',
    hitsHint: 'ลืมไปแล้วว่าลืมยังไง, ซ่อนเธอ'
  },
  {
    id: 'bowkylion',
    name: 'BOWKYLION',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🦁',
    hitsHint: 'วาดไว้, บานปลาย, ทราบแล้วเปลี่ยน'
  },
  {
    id: 'nont_tanont',
    name: 'NONT TANONT',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '👓',
    hitsHint: 'โต๊ะริม, พิง, รักแรก'
  },
  {
    id: 'ink_waruntorn',
    name: 'Ink Waruntorn',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '💖',
    hitsHint: 'สายตาหลอกกันไม่ได้, ดีใจด้วยนะ'
  },
  {
    id: 'fellow_fellow',
    name: 'fellow fellow',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '☄️',
    hitsHint: 'ดาวหางฮัลเลย์, ไม่เป็นรอง'
  },
  {
    id: 'four_eve',
    name: '4EVE',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '👑',
    hitsHint: 'วัดปะหล่ะ?, Booty Bomb, หยดน้ำตา'
  },
  {
    id: 'proxie',
    name: 'PROXIE',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🤫',
    hitsHint: 'คนไม่คุย (Silent Mode), ที่รักของใครสักคน'
  },
  {
    id: 'purpeech',
    name: 'PURPEECH',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🍑',
    hitsHint: 'หากจะเพียงขอ, ภาพถ่ายวันวาน'
  },
  {
    id: 'yourmood',
    name: 'YourMOOD',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '⛅',
    hitsHint: 'เพื่อนที่ดี, ลาก่อน, คนดวงดี, กลัวเมีย'
  },
  {
    id: 'qler',
    name: 'QLER',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '📷',
    hitsHint: 'จีบอยู่เผื่อไม่รู้, รูปถ่าย, พะวง, ธันวาคม'
  },
  {
    id: 'txrbo',
    name: 'Txrbo',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🌊',
    hitsHint: 'เหลี่ยมจัด, จำเลยรัก, น้ำโขง, เจ้าความรัก'
  },
  {
    id: 'bell_warisara',
    name: 'Bell Warisara',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🖊️',
    hitsHint: 'เอาปากกามาวง, คนหรือไมโครเวฟ, ยิ้มแย้ม'
  },
  {
    id: 'bedroom_audio',
    name: 'Bedroom Audio',
    group: 'rock',
    groupLabel: 'ร็อก & อัลเทอร์เนทีฟ',
    emoji: '🛏️',
    hitsHint: 'ไม่บอกเธอ, รักมือสอง, กอดไม่ได้, เพลงที่เธอไม่ฟัง'
  },
  {
    id: 'safeplanet',
    name: 'Safeplanet',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🪐',
    hitsHint: 'กอดความเหงา, คำตอบ, ห้องกระจก'
  },
  {
    id: 'dept',
    name: 'Dept',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🌿',
    hitsHint: 'ฤดู, ประกาศให้โลกรู้'
  },
  {
    id: 'pixxie',
    name: 'PiXXiE',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🧚',
    hitsHint: 'มูเตลู, ไม่ได้ก็ไม่เอา, เกินต้าน'
  },
  {
    id: 'the_toys',
    name: 'The TOYS',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🧸',
    hitsHint: 'หน้าหนาวที่แล้ว, ก่อนฤดูฝน, 04:00'
  },
  {
    id: 'billkin',
    name: 'Billkin',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🌟',
    hitsHint: 'กีดกัน, ชอบตัวเองตอนอยู่กับเธอ'
  },
  {
    id: 'pp_krit',
    name: 'PP Krit',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🔥',
    hitsHint: 'FIRE BOY, ลังเล'
  },
  {
    id: 'bus',
    name: 'BUS',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🚌',
    hitsHint: 'Because of You I Shine, WATCH YOUR STEP'
  },
  {
    id: 'paper_planes',
    name: 'Paper Planes',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '✈️',
    hitsHint: 'ทรงอย่างแบด (Bad Boy), เสแสร้ง'
  },
  {
    id: 'urboytj',
    name: 'URBOYTJ',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🕶️',
    hitsHint: 'วายร้าย, ถามคำ, ซุปเปอร์ไซย่า'
  },
  {
    id: 'violette_wautier',
    name: 'Violette Wautier',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '💜',
    hitsHint: 'Smoke, ถ้าเธอ, ยื้อ'
  },

  // -------------------------------------------------------------
  // 3. 90s & Y2K Kamikaze (วัยรุ่น 90s & Y2K)
  // -------------------------------------------------------------
  {
    id: 'd2b',
    name: 'D2B',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '📻',
    hitsHint: 'คนใจอ่อน, ซ่าส์...(สั่นๆ), ต่อหน้าฉัน'
  },
  {
    id: 'bird_thongchai',
    name: 'Bird Thongchai',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🐦',
    hitsHint: 'เล่าสู่กันฟัง, สบาย สบาย, หมอกหรือควัน'
  },
  {
    id: 'four_mod',
    name: 'Four-Mod',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🍓',
    hitsHint: 'หายใจเป็นเธอ, เด็กมีปัญหา, ละลาย'
  },
  {
    id: 'k_otic',
    name: 'K-OTIC',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '⚡',
    hitsHint: 'รักไม่ได้หรือไม่ได้รัก, อย่าไว้ใจ, แฟนใหม่'
  },
  {
    id: 'waii',
    name: 'Waii',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '💅',
    hitsHint: 'ตกหลุมรัก, เสียใจแต่ไม่แคร์'
  },
  {
    id: 'three_two_one',
    name: '3.2.1',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '💥',
    hitsHint: 'รักต้องเปิด (แน่นอก), แค่ที่รัก'
  },
  {
    id: 'golf_mike',
    name: 'Golf Mike',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🕺',
    hitsHint: 'Bounce, อย่าเล่นแบบนี้, เรื่องเล็กของเธอ'
  },
  {
    id: 'tata_young',
    name: 'Tata Young',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '💃',
    hitsHint: 'โอ๊ะ...โอ๊ย, รบกวนมารักกัน, Dhoom Dhoom'
  },
  {
    id: 'nicole_theriault',
    name: 'Nicole Theriault',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🎀',
    hitsHint: 'กะโปโล, บุษบา, ทำไมเป็นคนแบบนี้'
  },
  {
    id: 'mos_patiparn',
    name: 'Mos Patiparn',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🧢',
    hitsHint: 'เหลวไหล, ฮัลโหล, สลัด...สะบัด'
  },
  {
    id: 'raptor',
    name: 'Raptor',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🦖',
    hitsHint: 'เกรงใจ, อย่าพูดเลย, ไม่เอานะ'
  },
  {
    id: 'so_cool',
    name: 'So Cool',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🧊',
    hitsHint: 'เลี้ยงส่ง, ซากอ้อย, คนเจียมตัว'
  },
  {
    id: 'kala',
    name: 'Kala',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🥥',
    hitsHint: 'ขอเป็นตัวเลือก, เธอเป็นแฟนฉันแล้ว, แม่ครับ'
  },
  {
    id: 'blackhead',
    name: 'Blackhead',
    group: 'y2k',
    groupLabel: 'วัยรุ่น 90s & Y2K',
    emoji: '🖤',
    hitsHint: 'ยิ่งโตยิ่งสวย, เหตุผล, อยู่ไปไม่มีเธอ'
  },

  // -------------------------------------------------------------
  // 4. Luk Thung & Phuea Chiwit (ลูกทุ่ง & เพื่อชีวิต)
  // -------------------------------------------------------------
  {
    id: 'monkan',
    name: 'มนต์แคน แก่นคูน',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🌾',
    hitsHint: 'คำว่าฮักกัน มันเหี่ยถิ่มไส, วอนหลวงพ่อรวย'
  },
  {
    id: 'lamyai',
    name: 'ลำไย ไหทองคำ',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '💃',
    hitsHint: 'ผู้สาวขาเลาะ, ยายแล่ม'
  },
  {
    id: 'phai_phongsathon',
    name: 'ไผ่ พงศธร',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🎤',
    hitsHint: 'คนบ้านเดียวกัน, ทบ.2 ลูกอีสาน'
  },
  {
    id: 'kong_huayrai',
    name: 'ก้อง ห้วยไร่',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🐃',
    hitsHint: 'ไสว่าสิบ่ถิ่มกัน, คู่คอง'
  },
  {
    id: 'carabao',
    name: 'คาราบาว',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🐂',
    hitsHint: 'บัวลอย, วณิพก, ทับหลัง'
  },
  {
    id: 'takatan',
    name: 'ตั๊กแตน ชลดา',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🦗',
    hitsHint: 'ไม่ใช่แฟนทำแทนไม่ได้'
  },
  {
    id: 'tai_orathai',
    name: 'ต่าย อรทัย',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🌸',
    hitsHint: 'ดอกหญ้าในป่าปูน, โทรหาแหน่เด๊อ'
  },
  {
    id: 'ble_patumrach',
    name: 'เบิ้ล ปทุมราช',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🌟',
    hitsHint: 'อ้ายมีเหตุผล, กอดครั้งสุดท้าย'
  },
  {
    id: 'jintara',
    name: 'จินตหรา พูนลาภ',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '💇‍♀️',
    hitsHint: 'เต่างอย, น้ำตาน้องเพ็ญ'
  },
  {
    id: 'kampee',
    name: 'พงษ์สิทธิ์ คำภีร์',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🎸',
    hitsHint: 'ตลอดเวลา, มือปืน, แค่นั้น'
  },
  {
    id: 'joey_phuwasit',
    name: 'โจอี้ ภูวศิษฐ์',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🎸',
    hitsHint: 'นะหน้าทอง, ดวงเดือน, เมษาจะกลับไป'
  },
  {
    id: 'pun',
    name: 'PUN',
    group: 'tpop',
    groupLabel: 'T-POP & โมเดิร์นป็อป',
    emoji: '🎧',
    hitsHint: 'เค้ามาก่อน, นนท์, Stay'
  },
  {
    id: 'no_one_else',
    name: 'No One Else',
    group: 'tpop',
    groupLabel: 'T-POP & โมเดิร์นป็อป',
    emoji: '💍',
    hitsHint: 'ต่อจากนี้เพลงรักทุกเพลงจะเป็นของเธอเท่านั้น'
  },
  {
    id: 'sarah_salola',
    name: 'Sarah Salola',
    group: 'tpop',
    groupLabel: 'T-POP & โมเดิร์นป็อป',
    emoji: '🎸',
    hitsHint: 'เอาใจลงไปเล่น, นะครับ(ได้ไหม)'
  },
  {
    id: 'patrickananda',
    name: 'Patrickananda',
    group: 'tpop',
    groupLabel: 'T-POP & โมเดิร์นป็อป',
    emoji: '🌙',
    hitsHint: 'คนละชั้น, จันทร์อังคารพุธพฤหัสศุกร์เสาร์อาทิตย์'
  },
  {
    id: 'timethai',
    name: 'Timethai',
    group: 'y2k',
    groupLabel: 'Y2K & กามิกาเซ่',
    emoji: '🔥',
    hitsHint: 'มีอะไรอีกมั้ยที่ลืมบอก, ชู้ทางไลน์'
  },
  {
    id: 'pang_nakarin',
    name: 'ป้าง นครินทร์',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎸',
    hitsHint: 'คนมีเสน่ห์, ภูมิแพ้กรุงเทพ, ทำอะไรสักอย่าง'
  },
  {
    id: 'sek_loso',
    name: 'เสก โลโซ',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🎸',
    hitsHint: 'ซมซาน, 14 อีกครั้ง, ใจสั่งมา'
  },
  {
    id: 'ab_normal',
    name: 'AB Normal',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '⚡',
    hitsHint: 'ใจน้อย, พูดไม่ค่อยเก่ง, ทั้งที่ผิดก็ยังรัก'
  },
  {
    id: 'hin_lek_fai',
    name: 'หินเหล็กไฟ',
    group: 'rock',
    groupLabel: 'ร็อก & สตริงฮิต',
    emoji: '🤘',
    hitsHint: 'ยอม, ศรัทธา, นางแมว'
  },
  {
    id: 'kratae_rsiam',
    name: 'กระแต อาร์สยาม',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '💃',
    hitsHint: 'วิลิศมาหรา, หนานะ, เปิดใจสาวแต'
  },
  {
    id: 'jah_nongpanee',
    name: 'จ๊ะ นงผณี',
    group: 'lukthung',
    groupLabel: 'ลูกทุ่ง & เพื่อชีวิต',
    emoji: '🎤',
    hitsHint: 'คันหู, เห็นนางเงียบๆ ฟาดเรียบนะคะ'
  },
  {
    id: 'knomjean',
    name: 'Knomjean',
    group: 'y2k',
    groupLabel: 'Y2K & กามิกาเซ่',
    emoji: '💔',
    hitsHint: 'ตามใจปาก, ระหว่างเพื่อนกับแฟน, อวดเก่ง'
  },
  {
    id: 'khiankai_lae_wanit',
    name: 'เขียนไขและวานิช',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🌾',
    hitsHint: 'แก้มน้องนางนั้นแดงกว่าใคร, หนีห่าง, ภาพฝันในจักรวาล, ฤดูฝน'
  },
  {
    id: 'themoonwillalwaysbewithme',
    name: 'themoonwillalwaysbewithme',
    group: 'tpop',
    groupLabel: 'T-POP & อินดี้รุ่นใหม่',
    emoji: '🌙',
    hitsHint: 'ซูลูปาก้า ตาปาเฮ้, ไดโนเสาร์ไข่ดาวปาจังกี้, ให้ดาวช่วยปลอบประโลมหัวใจ'
  }
];

