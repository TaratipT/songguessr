import type { Song, Category } from '../types';
import { CURATED_SONGS } from '../data/curatedSongs';
import { GLOBAL_ARTISTS, type ArtistRegion, getArtistStorefront, getArtistAliases } from '../data/artistsData';
import { THAI_ARTISTS } from '../data/thaiArtists';
import { cleanSongTitle, normalizeText, isSongMatch, isMainArtistMatch, shuffleArray } from './itunesApi';

export type SongRegion = 'thai' | 'inter' | 'kpop' | 'anime_jpop';

export const CATEGORY_FALLBACK_TITLES: Record<string, string[]> = {
  mega_thai_hits: [
    'ทรงอย่างแบด',
    'รักแรก',
    'โต๊ะริม',
    'วาดไว้',
    'คิดแต่ไม่ถึง',
    'ถ้าเราเจอกันอีก',
    'เพื่อนเล่น ไม่เล่นเพื่อน',
    'ถ้าเธอรักฉันจริง',
    'นะหน้าทอง',
    'เชือกวิเศษ',
    'คุกเข่า',
    'ไกลแค่ไหน คือ ใกล้',
    'เลือดกรุ๊ปบี',
    'วัดปะหล่ะ?',
    'คนไม่คุย',
    'ซ่อนกลิ่น',
    'ดาวหางฮัลเลย์',
    'สองใจ',
    'แสงสุดท้าย',
    'ยาพิษ',
    'ขอบคุณที่รักกัน',
    'ฤดูร้อน',
    'จันทร์เจ้า',
    'เล่นของสูง'
  ],
  mega_inter_hits: [
    'Shape of You',
    'Blinding Lights',
    'Stay',
    'As It Was',
    'Uptown Funk',
    'See You Again',
    'Sugar',
    'Counting Stars',
    'Something Just Like This',
    'Closer',
    'Bad Guy',
    'Levitating',
    'Cruel Summer',
    'Flowers',
    'Believer',
    'Someone You Loved',
    'Sunflower',
    'Wake Me Up'
  ],
  mega_kpop_hits: [
    'Dynamite',
    'Butter',
    'DDU-DU DDU-DU',
    'How You Like That',
    'Hype Boy',
    'Ditto',
    'Supernova',
    'Next Level',
    'LOVE DIVE',
    'ANTIFRAGILE',
    'What is Love?',
    'Queencard',
    "God's Menu",
    'WANNABE',
    'Love Scenario',
    'Gangnam Style'
  ],
  mega_all_stars: [
    'ทรงอย่างแบด',
    'Shape of You',
    'Dynamite',
    'โต๊ะริม',
    'Blinding Lights',
    'Hype Boy',
    'คุกเข่า',
    'Uptown Funk',
    'DDU-DU DDU-DU',
    'นะหน้าทอง',
    'As It Was',
    'Supernova',
    'เชือกวิเศษ',
    'Stay',
    'Ditto',
    'แสงสุดท้าย'
  ],
  thai_hits: [
    'ความรัก',
    'คุกเข่า',
    'ไกลแค่ไหน คือ ใกล้',
    'เชือกวิเศษ',
    'เล่นของสูง',
    'แพ้ทาง',
    'คู่ชีวิต',
    'ทิ้งไว้กลางทาง',
    'แสงสุดท้าย',
    'ฤดูร้อน',
    'ยาพิษ',
    'ข่มใจ',
    'น้ำหอม',
    'เธอคือของขวัญ',
    'คิดถึง',
    'คนที่ถูกรัก',
    'ขอบคุณที่รักกัน',
    'ชั่วฟ้าดินสลาย',
    'วณิพก',
    'บัวลอย',
    'สัญญาหน้าฝน',
    'ทะเลใจ',
    'เมด อิน ไทยแลนด์'
  ],
  tpop_indie: [
    'โต๊ะริม (Melt)',
    'พิง',
    'นะหน้าทอง',
    'คิดแต่ไม่ถึง',
    'ถ้าเราเจอกันอีก',
    'วัดปะหล่ะ?',
    'เลือดกรุ๊ปบี',
    'ทรงอย่างแบด (Bad Boy)',
    'ดวงเดือน',
    'วาดไว้',
    'ซ่อนกลิ่น',
    'สองใจ',
    'รักแรก (First Love)',
    'เพื่อนเล่น ไม่เล่นเพื่อน',
    'ลบไม่ได้ช่วยให้ลืม',
    'สายตาหลอกกันไม่ได้',
    'ดาวหางฮัลเลย์',
    'คนไม่คุย'
  ],
  inter_pop: [
    'Cruel Summer',
    'Blinding Lights',
    'As It Was',
    'Levitating',
    'Shape of You',
    'Save Your Tears',
    'Flowers',
    'Stay',
    'Bad Guy',
    'Watermelon Sugar',
    'Anti-Hero',
    'Starboy',
    'vampire',
    'Greedy',
    'Viva La Vida',
    'Just the Way You Are',
    '7 rings',
    'Espresso',
    'Good Luck, Babe!',
    'Birds of a Feather',
    'Beautiful Things',
    'Please Please Please',
    'Houdini'
  ],
  kpop: [
    'Ditto',
    'Super Shy',
    'Dynamite',
    'Cupid',
    'Pink Venom',
    'Hype Boy',
    'Seven',
    'Queencard',
    'Love Scenario',
    'OMG',
    'Butter',
    'How You Like That',
    'Next Level',
    'Magnetic',
    'Supernova',
    'What is Love?',
    'LOVE DIVE',
    'Perfect Night',
    'Antifragile',
    'Smart',
    'Drunk-Dazed',
    'Bite Me'
  ],
  y2k_90s: [
    'ใจนักเลง',
    'ซมซาน',
    'ชาวนากับงูเห่า',
    'ยิ่งใกล้ยิ่งเจ็บ',
    'ปราสาททราย',
    'ไม่อาจเปลี่ยนใจ',
    'แววตา',
    'เจ้าช่อมาลี',
    '18 ฝน',
    'รักแท้แพ้ใกล้ชิด',
    'บอดี้การ์ด',
    'คนใจอ่อน',
    'ขี้หึง',
    'ใจสั่งมา',
    'หายใจเป็นเธอ',
    'เล่าสู่กันฟัง',
    'รักไม่ได้หรือไม่ได้รัก'
  ],
  lukthung_indie: [
    'ไหง่ง่อง',
    'ผู้สาวขาเลาะ',
    'คำแพง',
    'สเตตัสบ่เคยเปลี่ยน',
    'จี่หอย',
    'เต่างอย',
    'ขอใจเธอแลกเบอร์โทร',
    'สาวเลยยังรอ',
    'รักควรมีสองคน',
    'ห่อหมกฮวกไปฝากป้า',
    'คำว่าฮักกัน มันเหี่ยถิ่มไส',
    'คนบ้านเดียวกัน',
    'สิมาฮักหยังตอนนี้',
    'กอดเสาเถียง',
    'วณิพก',
    'บัวลอย',
    'สัญญาหน้าฝน',
    'ทะเลใจ',
    'เมด อิน ไทยแลนด์',
    'คนจนผู้ยิ่งใหญ่',
    'มหาลัยวัวชน',
    'เสร็จแล้ว'
  ],
  anime_jpop: [
    'アイドル (Idol)',
    '紅蓮華 (Gurenge)',
    '死ぬのがいいわ (Shinunoga E-Wa)',
    'Lemon',
    'Pretender',
    '怪物 (Monster)',
    'KICK BACK',
    'Blue Bird',
    'Silhouette',
    'Sparkle',
    '新時代 (New Genesis)',
    '残酷な天使のテーゼ',
    'Bling-Bang-Bang-Born',
    'ドライフラワー (Dry Flower)',
    '夜に駆ける (Racing into the Night)',
    'Unravel',
    '廻廻奇譚 (Kaikai Kitan)',
    '前前前世 (Zenzenzense)'
  ],
  all_stars: [
    'ความรัก',
    'Cruel Summer',
    'Ditto',
    'โต๊ะริม (Melt)',
    'ผู้สาวขาเลาะ',
    'アイドル (Idol)',
    'Blinding Lights',
    'คิดแต่ไม่ถึง',
    'คุกเข่า',
    'Lemon'
  ]
};

// ---------------------------------------------------------------------------
// Pre-indexed Artist Hits & Regional Pools for O(1) Instant Decoy Lookup
// ---------------------------------------------------------------------------
interface ArtistHitData {
  artistName: string;
  region: ArtistRegion;
  genreLabel: string;
  hits: string[];
}

const ARTIST_HIT_MAP = new Map<string, ArtistHitData>();
const REGION_ARTISTS: Record<ArtistRegion, ArtistHitData[]> = {
  thai: [],
  inter: [],
  kpop: [],
  anime_jpop: []
};
const REGION_SONG_POOL: Record<ArtistRegion, string[]> = {
  thai: [],
  inter: [],
  kpop: [],
  anime_jpop: []
};

// ---------------------------------------------------------------------------
// Dynamic Discography Cache & Comprehensive Pre-seeded Artist Hits
// ---------------------------------------------------------------------------
export const ARTIST_DISCOGRAPHY_CACHE = new Map<string, Set<string>>();

export function registerArtistTracks(artistName: string, tracks: string[]) {
  if (!artistName || !tracks || tracks.length === 0) return;
  const aliases = [artistName, ...getArtistAliases(artistName)];
  for (const a of aliases) {
    const key = normalizeText(a);
    if (!key) continue;
    let set = ARTIST_DISCOGRAPHY_CACHE.get(key);
    if (!set) {
      set = new Set<string>();
      ARTIST_DISCOGRAPHY_CACHE.set(key, set);
    }
    for (const t of tracks) {
      const cleaned = cleanSongTitle(t, artistName);
      if (cleaned && cleaned.length >= 2) {
        set.add(cleaned);
      }
    }
  }
}

const PRESEEDED_ARTIST_HITS = new Map<string, string[]>();

const RAW_PRESEEDED: Record<string, string[]> = {
  // Thai Rock / Classic Bands
  cocktail: [
    'คุกเข่า', 'เธอ', 'คู่ชีวิต', 'ดึงดัน', 'ไม่เป็นรอง', 'ช่างมัน', 'โปรดเถิดรัก',
    'เธอทำให้ฉันเสียใจ', 'เรื่องธรรมดา', 'เวลา', 'น้ำหอม', 'กาลเวลาพิสูจน์คน',
    'งานเต้นรำในคืนพระจันทร์เต็มดวง', 'ปรารถนาสิ่งใดฤๅ', 'จากฉันถึงเธอ', 'เรา',
    'Yours Ever', 'ต่างคน', 'น้ำตาสุดท้าย', 'วัย', 'สาวเซี่ยงไฮ้', 'ส่งเธอออกไป',
    'ลั่นทม', 'ความคาดหวัง', 'อภิสิทธิ์ชน'
  ],
  bodyslam: [
    'ความรัก', 'แสงสุดท้าย', 'ยาพิษ', 'เรือเล็กควรออกจากฝั่ง', 'คนที่ถูกรัก', 'อกหัก',
    'คิดฮอด', 'สติกเกอร์', 'เปราะบาง', 'ปล่อย', 'เสี้ยววินาที', 'ขอบฟ้า', 'ความเชื่อ',
    'งมงาย', 'ยามเมื่อลมพัดหวน', 'ให้รักคุ้มครอง', 'ปลายทาง', 'ยิ่งรู้ยิ่งไม่เข้าใจ',
    'ครึ่งๆ กลางๆ', 'วิชาตัวเบา', '149.6', 'ไม่แก่ตาย'
  ],
  potato: [
    'ทิ้งไว้กลางทาง', 'ขอบคุณที่รักกัน', 'ที่เดิม', 'เพียงพอ', 'กล้าพอไหม', 'เธอยัง',
    'ไม่ให้เธอไป', 'รักแท้ ดูแลไม่ได้', 'เข้าทาง', 'แชร์', 'บังเอิญ โลกกลม พรหมลิขิต',
    'ปากดี', 'ทนพิษบาดแผลไม่ไหว', 'ฮู้ฮู', 'อารมณ์สีเทา', 'กี่พรุ่งนี้', 'หมดดวงใจ',
    'พระจันทร์ดวงเก่า', 'ตัวปลอม', 'ทำนองที่หายไป'
  ],
  bigass: [
    'เล่นของสูง', 'ก่อนตาย', 'แดนเนรมิต', 'ลมเปลี่ยนทิศ', 'รักแรกพบ', 'เกิดมาแค่รักกัน',
    'ยักษ์ใหญ่ไล่ยักษ์เล็ก', 'ฝุ่น', 'ข้าน้อยสมควรตาย', 'อย่างน้อย', 'คนไม่เอาถ่าน',
    'สายล่อฟ้า', 'ไม่เดียงสา', 'ดีแต่ปาก', 'บีบมือ'
  ],
  clash: [
    'ขอเช็ดน้ำตา', 'กอด', 'รับได้ทุกอย่าง', 'เธอจะอยู่กับฉันตลอดไป', 'ปฏิเสธรัก',
    'โรคประจำตัว', 'ขอเจ็บแทน', 'ซบที่อกฉัน', 'ไฟรัก', 'นางฟ้าคนเดิม', 'เกินคำว่ารัก',
    'ยิ้มเข้าไว้', 'ไออุ่นรัก', 'เขาชื่ออะไร', 'ใส่ร้ายป้ายสี'
  ],
  loso: [
    'ซมซาน', 'มอเตอร์ไซค์ฮอนด้า', 'คืนจันทร์', 'ใจสั่งมา', 'พันธ์ทิพย์', 'จักรยานสีแดง',
    '14 อีกครั้ง', 'สาหัส', 'อะไรก็ยอม', 'ไม่ตายหรอกเธอ', 'เคยบอกว่ารักกัน',
    'ฉันหรือเธอที่เปลี่ยนไป', 'รอยยิ้มนักสู้', 'แม่', 'เราและนาย'
  ],
  sillyfools: [
    'ขี้หึง', 'จิ๊จ๊ะ', 'น้ำลาย', 'วัดใจ', 'ผิดที่ไว้ใจ', 'อย่าบอกว่ารัก', 'แกล้ง',
    'เพลงนี้เกี่ยวกับความรัก', 'สู้ไม่ได้', 'ไม่หวั่นแม้วันมามาก', 'บ้าบอ', 'คนที่ฆ่าฉัน',
    'คิดถึง', 'เหนื่อยไหมหัวใจ', 'นางฟ้า'
  ],
  getsunova: [
    'ไกลแค่ไหน คือ ใกล้', 'คนไม่จำเป็น', 'แตกต่างเหมือนกัน', 'คำถามซึ่งไร้คนตอบ',
    'อยู่ตรงนี้ นานกว่านี้', 'ดวงจันทร์กลางวัน', 'โดดเดี่ยวด้วยกัน', 'รู้ดีว่าไม่ดี',
    'พระเอกจำลอง', 'ปลาบนฟ้า', 'ความเงียบดังที่สุด'
  ],
  labanoon: [
    'เชือกวิเศษ', 'แพ้ทาง', 'ใจหมา', 'ยาม', '191', 'คนอบอุ่น', 'รักแท้', 'พลังงานจน',
    'ศึกษานารี', 'พลอย', 'ดอกฟ้า', 'ตายดาบหน้า', 'คิดในใจ', 'หนักใจ'
  ],
  palmy: [
    'ซ่อนกลิ่น', 'คิดมาก', 'อยากร้องดังดัง', 'แปดโมงเช้าวันอังคาร', 'กิเลสหนา',
    'ความทรงจำสีจาง', 'กลิ่น', 'นาฬิกาเรือนเก่า', 'ทำเป็นไม่ทัก', 'Stay', 'ทบทวน',
    'ขวัญเอยขวัญมา', 'ริบบิ้นเลิฟฟลอร์', 'ดวงใจ'
  ],
  tattoocolour: [
    'ขาหมู', 'ซินเดอเรลล่า', 'ฝากที', 'ฟ้า', 'เกาะร้าง ห่างรัก', 'โอกาสสุดท้าย',
    'รอยจูบ', 'รักแรกพบ', 'คืนนี้สบาย', 'ลับสุดยอด', 'SuperCarCare', 'ตั้งใจเรียน'
  ],
  slotmachine: [
    'จันทร์เจ้า', 'ผ่าน', 'เคลิ้ม', 'คำสุดท้าย', 'รอ', 'ฤดู', 'รุ้ง', 'พระอาทิตย์ทรงกลด',
    'เหนื่อยบ้างไหม', 'ย้อน', 'หลับตา', 'มีอยู่จริงหรือเปล่า'
  ],
  paradox: [
    'ฤดูร้อน', 'sexy', 'น้องเปิ้ล', 'รด.แดนซ์', 'มีแต่เธอ', 'บอลลูน', 'ขอ',
    'ทาส', 'เพลงสุดท้าย', 'ดาว', 'คนบนฟ้า', 'เสือไบ'
  ],

  // Modern T-Pop & Indie
  inkwaruntorn: [
    'สายตาหลอกกันไม่ได้', 'ดีใจด้วยนะ', 'ลบไม่ได้ช่วยให้ลืม', 'อยากเริ่มต้นใหม่กับคนเดิม',
    'รอหรือพอ', 'เก่งแต่เรื่องคนอื่น', 'ภาพจำ', 'เหงา เหงา', 'ขอดูก่อน', 'Snap',
    'ไม่อยากเหงาแล้ว', 'ชอบอยู่คนเดียว', 'แปลไม่ออก', 'โลกที่แบกไว้', 'คนใหม่เขาดูแลอยู่',
    'พบรัก', 'ฉันต้องคิดถึงเธอแบบไหน', 'แฟนเก่าคนโปรด'
  ],
  threemandown: [
    'ฝนตกไหม', 'ถ้าเธอรักฉันจริง', 'ข้างกัน', 'วันเกิดฉันปีนี้', 'คุยคนเดียวเก่ง',
    'เดาไม่เก่ง', 'ผ่านตา', 'รถไฟบนฟ้า', 'น้อง', 'ปล่อยให้เวลา', 'ฝันถึงแฟนเก่า',
    'ทีมรอเธอ', 'Friend Zone', 'เปิดเพลงไหนก็เศร้า', 'ตอนไม่ได้เจอ'
  ],
  tillybirds: [
    'คิดแต่ไม่ถึง', 'เพื่อนเล่น ไม่เล่นเพื่อน', 'ถ้าเราเจอกันอีก', 'ลู่วิ่ง',
    'ให้พี่กระซิบไหม', 'จำเก่ง', 'ตัวเลือก ตัวคั่น', 'เดอะแบก', 'ฤดูหนาว',
    'จากกันด้วยดี', 'เบื่อคนขี้บ่น', 'ยิ้มเธอคือความสุข', 'ฉันไม่ใช่หมอ'
  ],
  bowkylion: [
    'วาดไว้', 'บานปลาย', 'ลงใจ', 'ทราบแล้วเปลี่ยน', 'คิดถึงแต่', 'ซับ', 'ยิ้มมา',
    'บานเย็น', 'เจ้าป่า', 'ร้องไห้คนเดียว', 'คบไม่ได้', 'กอดที', 'คนเฬว', 'เลิกรา', 'ส่วนต่าง'
  ],
  nonttanont: [
    'โต๊ะริม', 'รักแรก', 'วันครบเลิก', 'ทุกนาทีที่สวยงาม', 'แน่ใจไหม', 'พิง',
    'มีผลต่อหัวใจ', 'ความรักกำลังก่อตัว', 'ไม่เป็นไร', 'เจ็บที่ยังรู้สึก', 'หมื่นคำลา',
    'ฝืนตัวเองไม่เป็น', 'เมมชื่อฉันว่าคนรัก', 'เธอมีคนเดียวบนโลก'
  ],
  jeffsatur: [
    'ลืมไปแล้วว่าลืมยังไง', 'ซ่อน(ไม่)หา', 'Fade', 'แค่เธอ', 'กีฬาสี', 'Dum Dum',
    'ล่องลอย', 'ก่อนที่เธอจะลืมฝัน', 'Rainflower', 'Ghost', 'Lucid'
  ],
  fellowfellow: [
    'ดาวหางฮัลเลย์', 'ไม่เป็นรอง', 'ไม่เปลี่ยนเลย', 'เมษา', 'แพ้ทุกที', 'ชอบตัวเองตอนอยู่กับเธอ',
    'เขียนด้วยมือลบด้วยน้ำตา', 'อยู่คนเดียวไม่เป็นแล้ว', 'หน้าที่ของน้ำตา', 'แพ้กางเกงยีนส์', 'ซ่อนเธอ', 'Best Luck'
  ],
  '4eve': [
    'วัดปะหล่ะ?', 'Booty Bomb', 'หยดน้ำตา', 'ข้อยกเว้น', 'สิ่งเล็กน้อย', 'Life Boy',
    'Vroom Vroom', 'Hot 2 Hot', 'I Like Boys', 'JACKPOT', 'Trick or Treat'
  ],
  proxie: [
    'คนไม่คุย', 'Crazy Love', 'ที่รักของใครสักคน', 'ตบปาก', 'สถานะเบลอ', 'เจ็บอยู่'
  ],
  pixxie: [
    'เกินต้าน', 'ไม่ได้ก็ไม่เอา', 'มูเตลู', 'เด็ด', 'ชอบอยู่ รู้ยัง', 'FEAT', 'ลองเลิกกันมั้ย'
  ],
  paperplanes: [
    'ทรงอย่างแบด', 'เสแสร้ง', 'ความคิดถึงที่ฉันได้เคยส่งไป', 'กำหมัด', 'ซ้ำซ้ำ'
  ],
  khiankailawanit: [
    'แก้มน้องนางนั้นแดงกว่าใคร', 'หนีห่าง', 'ภาพฝันในจักรวาล', 'ฤดูฝน', 'อาจจะเพียง',
    'ต่อไปนี้', 'อดีต', 'เรือกระดาษ', 'สาย', 'การให้'
  ],
  themoonwillalwaysbewithme: [
    'ซูลูปาก้า ตาปาเฮ้', 'ไดโนเสาร์ไข่ดาวปาจังกี้', 'ให้ดาวช่วยปลอบประโลมหัวใจของเธอให้หายดี',
    'ต่อให้เดือนพฤศจิ ดอกไม้จะไม่ผลิบาน', 'ดาวที่เลือนลาง กับใจที่บางเบา', 'ใจผมก็มีอยู่แค่นี้',
    'วันนี้เมฆสีอะไร', 'หลับตาลง ก็คงได้เจอ', 'รักยิ้ม', 'PASWEL'
  ],

  // International Pop & Rock
  taylorswift: [
    'Cruel Summer', 'Blank Space', 'Shake It Off', 'Anti-Hero', 'Lover', 'Love Story',
    'You Belong With Me', 'Cardigan', 'Style', 'Bad Blood', 'Fortnight', 'All Too Well',
    'Enchanted', 'Karma', 'Delicate', 'I Knew You Were Trouble'
  ],
  brunomars: [
    'Uptown Funk', 'Just the Way You Are', 'Grenade', 'That\'s What I Like', '24K Magic',
    'When I Was Your Man', 'Locked Out of Heaven', 'Treasure', 'Leave the Door Open',
    'Die With a Smile', 'Count On Me', 'Marry You', 'Versace on the Floor'
  ],
  theweeknd: [
    'Blinding Lights', 'Starboy', 'Can\'t Feel My Face', 'Save Your Tears', 'The Hills',
    'I Feel It Coming', 'Die For You', 'Out of Time', 'In Your Eyes', 'Call Out My Name',
    'Heartless', 'Earned It', 'Creepin\''
  ],
  coldplay: [
    'Viva La Vida', 'Yellow', 'The Scientist', 'Fix You', 'Paradise', 'A Sky Full of Stars',
    'Hymn for the Weekend', 'Something Just Like This', 'Clocks', 'Speed of Sound'
  ],
  maroon5: [
    'Sugar', 'Memories', 'Girls Like You', 'Payphone', 'Maps', 'She Will Be Loved',
    'Moves Like Jagger', 'Animals', 'Sunday Morning', 'One More Night'
  ],
  imaginedragons: [
    'Believer', 'Radioactive', 'Demons', 'Thunder', 'Whatever It Takes', 'Bones',
    'Enemy', 'Natural', 'Bad Liar', 'Follow You'
  ],

  // K-Pop
  bts: [
    'Dynamite', 'Butter', 'Boy With Luv', 'Blood Sweat & Tears', 'DNA', 'Spring Day',
    'Fake Love', 'Idol', 'Life Goes On', 'MIC Drop', 'Permission to Dance', 'Fire'
  ],
  blackpink: [
    'DDU-DU DDU-DU', 'Kill This Love', 'How You Like That', 'Pink Venom', 'As If It\'s Your Last',
    'BOOMBAYAH', 'Whistle', 'Playing With Fire', 'Lovesick Girls', 'Shut Down', 'Forever Young'
  ],
  newjeans: [
    'Hype Boy', 'Attention', 'Cookie', 'Ditto', 'OMG', 'Super Shy', 'ETA', 'Cool With You',
    'New Jeans', 'How Sweet', 'Bubble Gum', 'Hurt', 'ASAP'
  ],
  aespa: [
    'Next Level', 'Black Mamba', 'Savage', 'Supernova', 'Drama', 'Spicy', 'Armageddon',
    'Illusion', 'Dreams Come True', 'Girls', 'Whiplash'
  ],
  twice: [
    'Cheer Up', 'TT', 'What is Love?', 'Fancy', 'Feel Special', 'Likey',
    'Dance The Night Away', 'I Can\'t Stop Me', 'Alcohol-Free', 'Talk that Talk'
  ],
  ive: [
    'ELEVEN', 'LOVE DIVE', 'After LIKE', 'I AM', 'Kitsch', 'Baddie', 'HEYA', 'Off The Record'
  ],
  lesserafim: [
    'FEARLESS', 'ANTIFRAGILE', 'UNFORGIVEN', 'Eve Psyche & The Bluebeard\'s wife', 'Perfect Night',
    'EASY', 'Smart', 'CRAZY'
  ]
};

for (const [key, hits] of Object.entries(RAW_PRESEEDED)) {
  PRESEEDED_ARTIST_HITS.set(normalizeText(key), hits);
}

// Build indexes once at module load (Both GLOBAL_ARTISTS & THAI_ARTISTS)
for (const artist of GLOBAL_ARTISTS) {
  const rawHits = artist.hitsHint
    ? artist.hitsHint.split(',').map((s) => cleanSongTitle(s)).filter(Boolean)
    : [];
  const hitData: ArtistHitData = {
    artistName: artist.name,
    region: artist.region,
    genreLabel: artist.genreLabel || '',
    hits: rawHits
  };
  ARTIST_HIT_MAP.set(artist.name.toLowerCase().trim(), hitData);
  if (artist.id) {
    ARTIST_HIT_MAP.set(artist.id.toLowerCase().trim(), hitData);
  }
  REGION_ARTISTS[artist.region].push(hitData);
  REGION_SONG_POOL[artist.region].push(...rawHits);
}

// Also index THAI_ARTISTS
for (const ta of THAI_ARTISTS) {
  const key = ta.name.toLowerCase().trim();
  const rawHits = ta.hitsHint
    ? ta.hitsHint.split(',').map((s) => cleanSongTitle(s)).filter(Boolean)
    : [];
  if (!ARTIST_HIT_MAP.has(key)) {
    const hitData: ArtistHitData = {
      artistName: ta.name,
      region: 'thai',
      genreLabel: ta.groupLabel || '',
      hits: rawHits
    };
    ARTIST_HIT_MAP.set(key, hitData);
    if (ta.id) {
      ARTIST_HIT_MAP.set(ta.id.toLowerCase().trim(), hitData);
    }
    REGION_ARTISTS.thai.push(hitData);
  }
  REGION_SONG_POOL.thai.push(...rawHits);
}

// Add curated songs into regional pools
for (const [catKey, songs] of Object.entries(CURATED_SONGS)) {
  let targetRegion: ArtistRegion = 'thai';
  if (catKey === 'inter_pop' || catKey === 'mega_inter_hits') targetRegion = 'inter';
  else if (catKey === 'kpop' || catKey === 'mega_kpop_hits') targetRegion = 'kpop';
  else if (catKey === 'anime_jpop') targetRegion = 'anime_jpop';

  for (const s of songs) {
    const cleaned = cleanSongTitle(s.title);
    if (cleaned) {
      REGION_SONG_POOL[targetRegion].push(cleaned);
    }
  }
}

// Add fallback titles into regional pools
for (const [catKey, titles] of Object.entries(CATEGORY_FALLBACK_TITLES)) {
  if (catKey === 'all_stars' || catKey === 'mega_all_stars') continue;
  let targetRegion: ArtistRegion = 'thai';
  if (catKey === 'inter_pop' || catKey === 'mega_inter_hits') targetRegion = 'inter';
  else if (catKey === 'kpop' || catKey === 'mega_kpop_hits') targetRegion = 'kpop';
  else if (catKey === 'anime_jpop') targetRegion = 'anime_jpop';

  for (const t of titles) {
    REGION_SONG_POOL[targetRegion].push(cleanSongTitle(t));
  }
}

// ---------------------------------------------------------------------------
// Accurate Region & Language Detector
// ---------------------------------------------------------------------------
export function detectSongRegion(targetSong: Song, explicitCategoryId?: string): ArtistRegion {
  const artistLower = targetSong.artist.toLowerCase().trim();
  const known = ARTIST_HIT_MAP.get(artistLower);
  if (known) {
    return known.region;
  }

  // Check Japanese characters (Hiragana, Katakana, Kanji)
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(targetSong.title + targetSong.artist)) {
    return 'anime_jpop';
  }

  // Check Korean characters (Hangul)
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(targetSong.title + targetSong.artist)) {
    return 'kpop';
  }

  // Check Thai characters
  if (/[\u0E00-\u0E7F]/.test(targetSong.title + targetSong.artist)) {
    return 'thai';
  }

  // Storefront check
  const storefront = getArtistStorefront(targetSong.artist);
  if (storefront === 'TH') return 'thai';
  if (storefront === 'JP') return 'anime_jpop';
  if (storefront === 'KR') return 'kpop';
  if (storefront === 'US') return 'inter';

  // Explicit category check if not all_stars
  if (explicitCategoryId && explicitCategoryId !== 'all_stars' && explicitCategoryId !== 'mega_all_stars') {
    if (explicitCategoryId === 'inter_pop' || explicitCategoryId === 'mega_inter_hits') return 'inter';
    if (explicitCategoryId === 'kpop' || explicitCategoryId === 'mega_kpop_hits') return 'kpop';
    if (explicitCategoryId === 'anime_jpop') return 'anime_jpop';
    if (['thai_hits', 'mega_thai_hits', 'tpop_indie', 'y2k_90s', 'lukthung_indie'].includes(explicitCategoryId)) return 'thai';
  }

  // Check Pure Latin / English
  const isPureLatin =
    /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(targetSong.title) &&
    /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(targetSong.artist);
  if (isPureLatin) {
    return 'inter';
  }

  return 'thai';
}

export function detectSongCategory(targetSong: Song, explicitCategoryId?: string): string {
  const region = detectSongRegion(targetSong, explicitCategoryId);
  if (region === 'inter') return 'inter_pop';
  if (region === 'kpop') return 'kpop';
  if (region === 'anime_jpop') return 'anime_jpop';

  if (explicitCategoryId && ['thai_hits', 'mega_thai_hits', 'tpop_indie', 'y2k_90s', 'lukthung_indie'].includes(explicitCategoryId)) {
    return explicitCategoryId;
  }
  if (/อีสาน|หมอลำ|ไหง่|ผู้สาว|ลูกทุ่ง|มนต์แคน|ไผ่|ต่าย|ก้อง|ห้วยไร่|สลักใจ|คาราบาว|carabao|เพื่อชีวิต|กางเกง|พัทลุง|มหาหิงค์/i.test(targetSong.genre + targetSong.artist)) {
    return 'lukthung_indie';
  }
  if (typeof targetSong.year === 'number' && targetSong.year >= 1990 && targetSong.year <= 2005) {
    return 'y2k_90s';
  }
  return 'thai_hits';
}

// ---------------------------------------------------------------------------
// Strict Language / Script Matcher (Prevents giving Thai choices for English songs & vice versa)
// ---------------------------------------------------------------------------
function isValidDecoyForRegion(title: string, region: ArtistRegion): boolean {
  if (!title || typeof title !== 'string') return false;
  const trimmed = title.trim();
  if (!trimmed || trimmed.length < 2) return false;

  if (region === 'inter') {
    // Strictly Latin / English only! Disallow any Thai, Korean, Japanese characters!
    if (/[\u0E00-\u0E7F\uac00-\ud7af\u3040-\u30ff\u4e00-\u9fff]/.test(trimmed)) {
      return false;
    }
    // Must be readable Latin
    return /^[A-Za-z0-9\s.,!?'"()\-:&$/#+]+$/.test(trimmed);
  }

  if (region === 'thai') {
    // If it contains Thai script, valid!
    if (/[\u0E00-\u0E7F]/.test(trimmed)) {
      return true;
    }
    // If it is Latin without Thai characters, only allow if it is a known Thai title
    const normalized = normalizeText(trimmed);
    const isThaiLatin = REGION_SONG_POOL.thai.some((t) => normalizeText(t) === normalized);
    return isThaiLatin;
  }

  if (region === 'kpop') {
    if (/[\uac00-\ud7af\u1100-\u11ff]/.test(trimmed)) return true;
    const normalized = normalizeText(trimmed);
    return REGION_SONG_POOL.kpop.some((t) => normalizeText(t) === normalized);
  }

  if (region === 'anime_jpop') {
    if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(trimmed)) return true;
    const normalized = normalizeText(trimmed);
    return REGION_SONG_POOL.anime_jpop.some((t) => normalizeText(t) === normalized);
  }

  return true;
}

// ---------------------------------------------------------------------------
// Strict Duplicate & Subtitle Title Comparator
// Completely prevents subtitle duplicates (e.g. "ลบไม่ได้ช่วยให้ลืม (Erase)" vs "ลบไม่ได้ช่วยให้ลืม")
// ---------------------------------------------------------------------------
export function getCoreTitle(title: string): string {
  if (!title) return '';
  return normalizeText(
    title
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/【.*?】/g, '')
      .replace(/\s*[-–—].*$/g, '')
      .trim()
  );
}

export function areTitlesDuplicate(titleA: string, titleB: string): boolean {
  if (!titleA || !titleB) return false;
  const cleanA = cleanSongTitle(titleA);
  const cleanB = cleanSongTitle(titleB);
  if (!cleanA || !cleanB) return false;

  const normA = normalizeText(cleanA);
  const normB = normalizeText(cleanB);
  if (normA === normB) return true;

  // 1. Core title check: strip anything inside parentheses, brackets, or after dashes/hyphens
  const coreA = getCoreTitle(cleanA);
  const coreB = getCoreTitle(cleanB);
  if (coreA && coreB) {
    if (coreA === coreB) return true;
    if (coreA.length >= 3 && coreB.length >= 3) {
      if (coreA.startsWith(coreB) || coreB.startsWith(coreA)) {
        if (Math.abs(coreA.length - coreB.length) <= 3) return true;
      }
    }
  }

  // 2. Cross match using isSongMatch (handles translations, aliases, karaoke, etc.)
  const dummySongA: Song = { id: '1', title: cleanA, artist: '', album: '', year: 0, genre: '', previewUrl: '', artworkUrl: '' };
  const dummySongB: Song = { id: '2', title: cleanB, artist: '', album: '', year: 0, genre: '', previewUrl: '', artworkUrl: '' };
  if (isSongMatch(cleanA, dummySongB) || isSongMatch(cleanB, dummySongA)) {
    return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Main Choice Generator
// ---------------------------------------------------------------------------
export function generateChoicesForSong(
  targetSong: Song,
  songPool: Song[] = [],
  categoryOrId?: Category | string
): string[] {
  const category = typeof categoryOrId === 'object' ? categoryOrId : undefined;
  const categoryId = typeof categoryOrId === 'string' ? categoryOrId : category?.id;

  const targetCleanTitle = cleanSongTitle(targetSong.title, targetSong.artist) || targetSong.title;
  const choices = new Set<string>();
  choices.add(targetCleanTitle);

  // 1. Detect if this game is restricted to specific artist(s) (Single artist or custom artist mode)
  const explicitArtists: string[] = category?.selectedArtists && category.selectedArtists.length > 0
    ? category.selectedArtists
    : (category?.modeType === 'custom' && category?.name
        ? [category.name]
        : (category?.searchQueries && category.searchQueries.length === 1 && isMainArtistMatch(targetSong.artist, category.searchQueries[0])
            ? [category.searchQueries[0]]
            : []));

  // Also check if songPool consists entirely of songs by the target artist
  const isMatchSingleArtist = songPool.length >= 1 && songPool.every((s) => isMainArtistMatch(s.artist, targetSong.artist));

  const isSpecificArtistMode = explicitArtists.length > 0 || isMatchSingleArtist;
  const allowedArtists: string[] = explicitArtists.length > 0
    ? explicitArtists
    : (isMatchSingleArtist ? [targetSong.artist] : []);

  // 2. Build forbiddenTitles set (only used for general multi-artist categories to prevent round spoilers)
  // For specific-artist games, we DO NOT forbid other songs in songPool because they are valid songs by this artist!
  const forbiddenTitles: string[] = [];
  if (!isSpecificArtistMode) {
    for (const s of songPool) {
      const clean = cleanSongTitle(s.title, s.artist) || s.title;
      if (!areTitlesDuplicate(clean, targetCleanTitle)) {
        forbiddenTitles.push(clean);
      }
    }
  }

  // 3. Detect region & subcategory of target song
  const region = detectSongRegion(targetSong, categoryId);
  const subcategory = detectSongCategory(targetSong, categoryId);

  const canAdd = (candidate: string, candidateArtist?: string): boolean => {
    if (!candidate || typeof candidate !== 'string') return false;
    const cleaned = cleanSongTitle(candidate, candidateArtist || targetSong.artist);
    if (!cleaned || cleaned.length < 2) return false;

    // Check duplicate against target song
    if (areTitlesDuplicate(cleaned, targetCleanTitle)) {
      return false;
    }

    // Check duplicate against ANY already added choice
    for (const existingChoice of choices) {
      if (areTitlesDuplicate(cleaned, existingChoice)) {
        return false;
      }
    }

    // Check forbidden titles (only active for general multi-artist categories)
    for (const forbidden of forbiddenTitles) {
      if (areTitlesDuplicate(cleaned, forbidden)) {
        return false;
      }
    }

    // In specific artist mode, songs already verified to be from the artist are valid decoys even if title is English
    if (!isSpecificArtistMode && !isValidDecoyForRegion(cleaned, region)) {
      return false;
    }

    return true;
  };

  const tryAdd = (candidate: string, candidateArtist?: string): boolean => {
    if (canAdd(candidate, candidateArtist)) {
      const cleaned = cleanSongTitle(candidate, candidateArtist || targetSong.artist);
      choices.add(cleaned);
      return true;
    }
    return false;
  };

  // =========================================================================
  // IF SPECIFIC ARTIST MODE (e.g. Cocktail, Bodyslam, Ink Waruntorn, etc.)
  // STRICT RULE: All 4 choices must belong to the chosen artist(s)! Never pull another artist!
  // =========================================================================
  if (isSpecificArtistMode) {
    const artistCandidates: string[] = [];

    // Search allowed artists plus targetSong.artist to ensure comprehensive coverage
    const targetArtistsToSearch = Array.from(new Set<string>([...allowedArtists, targetSong.artist]));

    for (const artistName of targetArtistsToSearch) {
      const normArtist = normalizeText(artistName);
      const artistKeys = [normArtist, ...getArtistAliases(artistName).map(normalizeText)].filter(Boolean);

      // Source A & B: Cached discography & Pre-seeded discography for all aliases
      for (const aKey of artistKeys) {
        const cached = ARTIST_DISCOGRAPHY_CACHE.get(aKey);
        if (cached) {
          artistCandidates.push(...cached);
        }

        const preseeded = PRESEEDED_ARTIST_HITS.get(aKey);
        if (preseeded) {
          artistCandidates.push(...preseeded);
        }
      }

      // Source C: Other songs in songPool matching this artist
      for (const s of songPool) {
        if (isMainArtistMatch(s.artist, artistName)) {
          artistCandidates.push(s.title);
        }
      }

      // Source D: GLOBAL_ARTISTS & THAI_ARTISTS hitsHint
      const known = ARTIST_HIT_MAP.get(artistName.toLowerCase().trim());
      if (known && known.hits) {
        artistCandidates.push(...known.hits);
      }

      // Source E: CURATED_SONGS matching this artist
      const allCurated = Object.values(CURATED_SONGS).flat();
      for (const cs of allCurated) {
        if (isMainArtistMatch(cs.artist, artistName)) {
          artistCandidates.push(cs.title);
        }
      }
    }

    // Shuffle and add strictly from the allowed artist(s)
    const shuffledArtistCandidates = shuffleArray(artistCandidates);
    for (const title of shuffledArtistCandidates) {
      tryAdd(title);
      if (choices.size >= 4) break;
    }

    // If 4 choices were formed from the chosen artist, return immediately!
    if (choices.size >= 4) {
      return Array.from(choices).slice(0, 4).sort(() => Math.random() - 0.5);
    }
  }

  // =========================================================================
  // GENERAL MULTI-ARTIST CATEGORY FLOW (e.g. thai_hits, mega_thai_hits, inter_pop)
  // =========================================================================
  // TIER 1: Hits by the SAME artist (creates a realistic, fun challenge, up to 1-2 hits)
  const artistLower = targetSong.artist.toLowerCase().trim();
  const sameArtistPool: string[] = [];
  const cachedSame = ARTIST_DISCOGRAPHY_CACHE.get(normalizeText(targetSong.artist));
  if (cachedSame) sameArtistPool.push(...cachedSame);
  const preseededSame = PRESEEDED_ARTIST_HITS.get(normalizeText(targetSong.artist));
  if (preseededSame) sameArtistPool.push(...preseededSame);
  const knownArtist = ARTIST_HIT_MAP.get(artistLower);
  if (knownArtist && knownArtist.hits) sameArtistPool.push(...knownArtist.hits);

  if (sameArtistPool.length > 0) {
    const shuffledSame = shuffleArray(sameArtistPool);
    let sameArtistAdded = 0;
    for (const h of shuffledSame) {
      if (tryAdd(h, targetSong.artist)) {
        sameArtistAdded++;
        if (sameArtistAdded >= 2 || choices.size >= 3) break;
      }
    }
  }

  // TIER 2: Hits from similar artists in the SAME region & compatible genre
  if (choices.size < 4 && !isSpecificArtistMode) {
    const regionArtists = shuffleArray([...REGION_ARTISTS[region]]);

    // Prioritize artists with similar genre
    if (knownArtist && knownArtist.genreLabel) {
      const targetGenreLower = knownArtist.genreLabel.toLowerCase();
      regionArtists.sort((a, b) => {
        const aMatch =
          a.genreLabel.toLowerCase().includes(targetGenreLower) ||
          targetGenreLower.includes(a.genreLabel.toLowerCase());
        const bMatch =
          b.genreLabel.toLowerCase().includes(targetGenreLower) ||
          targetGenreLower.includes(b.genreLabel.toLowerCase());
        return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
      });
    }

    for (const otherArtist of regionArtists) {
      if (otherArtist.artistName.toLowerCase() === artistLower) continue;
      const shuffledHits = shuffleArray([...otherArtist.hits]);
      for (const h of shuffledHits) {
        if (tryAdd(h, otherArtist.artistName)) {
          break; // Take 1 hit per artist for diversity
        }
      }
      if (choices.size >= 4) break;
    }
  }

  // TIER 3: Curated songs in matching subcategory
  if (choices.size < 4 && !isSpecificArtistMode) {
    const curatedList =
      CURATED_SONGS[subcategory] ||
      CURATED_SONGS[
        region === 'inter'
          ? 'inter_pop'
          : region === 'kpop'
          ? 'kpop'
          : region === 'anime_jpop'
          ? 'anime_jpop'
          : 'thai_hits'
      ] ||
      [];
    const shuffledCurated = shuffleArray([...curatedList]);
    for (const s of shuffledCurated) {
      tryAdd(s.title, s.artist);
      if (choices.size >= 4) break;
    }
  }

  // TIER 4: Fallback titles strictly for this region
  if (choices.size < 4 && !isSpecificArtistMode) {
    const fallbackList =
      CATEGORY_FALLBACK_TITLES[subcategory] ||
      CATEGORY_FALLBACK_TITLES[
        region === 'inter'
          ? 'inter_pop'
          : region === 'kpop'
          ? 'kpop'
          : region === 'anime_jpop'
          ? 'anime_jpop'
          : 'thai_hits'
      ] ||
      [];
    const shuffledFallback = shuffleArray([...fallbackList]);
    for (const t of shuffledFallback) {
      tryAdd(t);
      if (choices.size >= 4) break;
    }
  }

  // TIER 5: Emergency Regional Pool (Guaranteed 4 choices in matching language)
  if (choices.size < 4 && !isSpecificArtistMode) {
    const emergencyPool = REGION_SONG_POOL[region] || [];
    const shuffledEmergency = shuffleArray([...emergencyPool]);
    for (const t of shuffledEmergency) {
      tryAdd(t);
      if (choices.size >= 4) break;
    }
  }

  // Return exactly 4 choices, shuffled
  return Array.from(choices).slice(0, 4).sort(() => Math.random() - 0.5);
}

