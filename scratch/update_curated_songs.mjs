import fs from 'fs';

// Read existing curatedSongs.ts
const content = fs.readFileSync('src/data/curatedSongs.ts', 'utf-8');

// Accurate manual overrides or search terms for any tricky tracks
const SEARCH_CONFIG = {
  // thai_hits
  bs_1: { query: 'Bodyslam ความรัก', country: 'TH' },
  ck_1: { query: 'Cocktail คุกเข่า', country: 'TH' },
  gn_1: { query: 'Getsunova ไกลแค่ไหน คือ ใกล้', country: 'TH' },
  lb_1: { query: 'Labanoon เชือกวิเศษ', country: 'TH' },
  ba_1: { query: 'Big Ass เล่นของสูง', country: 'TH' },
  pm_1: { query: 'Palmy ซ่อนกลิ่น', country: 'TH' },
  pt_1: { query: 'Potato ทนพิษบาดแผลไม่ไหว', country: 'TH' },
  clash_1: { query: 'Clash ขอเช็ดน้ำตา', country: 'TH' },
  tattoo_1: { query: 'Tattoo Colour ขาหมู', country: 'TH' },
  klear_1: { query: 'Klear คำยินดี', country: 'TH' },
  sm_1: { query: 'Slot Machine จันทร์เจ้า', country: 'TH' },
  pd_1: { query: 'Paradox ฤดูร้อน', country: 'TH' },

  // tpop_indie
  tmd_1: { query: 'Three Man Down ถ้าเธอรักฉันจริง', country: 'TH' },
  tilly_1: { query: 'Tilly Birds คิดแต่ไม่ถึง', country: 'TH' },
  bowky_1: { query: 'BOWKYLION วาดไว้', country: 'TH' },
  nont_1: { query: 'NONT TANONT โต๊ะริม', country: 'TH' },
  jeff_1: { query: 'Jeff Satur ลืมไปแล้วว่าลืมยังไง', country: 'TH' },
  ink_1: { query: 'Ink Waruntorn สายตาหลอกกันไม่ได้', country: 'TH' },
  fellow_1: { query: 'fellow fellow ดาวหางฮัลเลย์', country: 'TH' },
  proxie_1: { query: 'PROXIE คนไม่คุย', country: 'TH' },
  eve_1: { query: '4EVE วัดปะหล่ะ', country: 'TH' },
  toys_1: { query: 'The TOYS หน้าหนาวที่แล้ว', country: 'TH' },

  // inter_pop
  ts_1: { query: 'Taylor Swift Cruel Summer', country: 'US' },
  wk_1: { query: 'The Weeknd Blinding Lights', country: 'US' },
  cp_1: { query: 'Coldplay Viva La Vida', country: 'US' },
  bm_1: { query: 'Bruno Mars Just the Way You Are', country: 'US' },
  ed_1: { query: 'Ed Sheeran Shape of You', country: 'US' },
  be_1: { query: 'Billie Eilish bad guy', country: 'US' },
  ag_1: { query: 'Ariana Grande 7 rings', country: 'US' },
  dl_1: { query: 'Dua Lipa Levitating', country: 'US' },

  // kpop
  bp_1: { query: 'BLACKPINK How You Like That', country: 'US' },
  nj_1: { query: 'NewJeans Ditto', country: 'US' },
  bts_1: { query: 'BTS Dynamite', country: 'US' },
  tw_1: { query: 'TWICE What is Love?', country: 'US' },
  aespa_1: { query: 'aespa Supernova', country: 'US' },
  ive_1: { query: 'IVE LOVE DIVE', country: 'US' },
  ls_1: { query: 'LE SSERAFIM Perfect Night', country: 'US' },

  // y2k_90s
  d2b_1: { query: 'D2B คนใจอ่อน', country: 'TH' },
  sf_1: { query: 'Silly Fools ขี้หึง', country: 'TH' },
  loso_1: { query: 'Sek Loso ใจสั่งมา', country: 'TH' },
  fourmod_1: { query: 'Four-Mod หายใจเป็นเธอ', country: 'TH' },
  bird_1: { query: 'Bird Thongchai เล่าสู่กันฟัง', country: 'TH' },
  kotic_1: { query: 'K-OTIC รักไม่ได้หรือไม่ได้รัก', country: 'TH' },

  // lukthung_indie
  monkan_1: { query: 'มนต์แคน แก่นคูน คำว่าฮักกัน', country: 'TH' },
  lamyai_1: { query: 'ลำไย ไหทองคำ ผู้สาวขาเลาะ', country: 'TH' },
  phai_1: { query: 'Pai Pongsathon คนบ้านเดียวกัน', country: 'TH' },
  carabao_1: { query: 'คาราบาว วณิพก', country: 'TH' },
  carabao_2: { query: 'คาราบาว บัวลอย', country: 'TH' },
  carabao_3: { query: 'คาราบาว สัญญาหน้าฝน', country: 'TH' },
  carabao_4: { query: 'คาราบาว ทะเลใจ', country: 'TH' },
  carabao_5: { query: 'คาราบาว เมด อิน ไทยแลนด์', country: 'TH' },

  // anime_jpop
  yoasobi_idol: { query: 'YOASOBI Idol', country: 'JP' },
  lisa_gurenge: { query: 'LiSA Gurenge', country: 'JP' },
  kenshi_lemon: { query: 'Kenshi Yonezu Lemon', country: 'JP' },
  hige_pretender: { query: 'Official HIGE DANdism Pretender', country: 'JP' },
  fujii_shinunoga: { query: 'Fujii Kaze Shinunoga E-Wa', country: 'JP' },
  ado_new_genesis: { query: 'Ado New Genesis', country: 'JP' },
  kenshi_kickback: { query: 'Kenshi Yonezu KICK BACK', country: 'JP' },
  eve_kaikai: { query: 'Eve Kaikai Kitan', country: 'JP' }
};

async function getTrackData(id) {
  const conf = SEARCH_CONFIG[id];
  if (!conf) return null;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(conf.query)}&country=${conf.country}&entity=song&limit=3`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const top = data.results[0];
      return {
        previewUrl: top.previewUrl,
        artworkUrl: top.artworkUrl100 ? top.artworkUrl100.replace('100x100bb', '600x600bb') : ''
      };
    }
  } catch (err) {
    console.error(`Error fetching ${id}:`, err);
  }
  return null;
}

async function run() {
  const results = {};
  for (const id of Object.keys(SEARCH_CONFIG)) {
    const data = await getTrackData(id);
    if (data && data.previewUrl) {
      results[id] = data;
      console.log(`[FOUND] ${id}: ${data.previewUrl}`);
    } else {
      console.error(`[NOT FOUND] ${id}`);
    }
    await new Promise(r => setTimeout(r, 150));
  }

  fs.writeFileSync('scratch/verified_curated.json', JSON.stringify(results, null, 2));
  console.log('Saved verified tracks to scratch/verified_curated.json');
}

run();
