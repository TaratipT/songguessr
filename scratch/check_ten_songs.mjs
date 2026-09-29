async function checkOne(name, query, country) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=${country}&entity=song&limit=3`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const top = data.results[0];
      console.log(`\n[${name}] OK: ${top.trackName} by ${top.artistName}`);
      console.log(`  Preview: ${top.previewUrl}`);
      console.log(`  Artwork: ${top.artworkUrl100?.replace('100x100bb', '600x600bb')}`);
    } else {
      console.log(`\n[${name}] NOT FOUND for query "${query}"`);
    }
  } catch (err) {
    console.log(`\n[${name}] Fetch error: ${err.message}`);
  }
}

async function run() {
  await checkOne('bp_1', 'BLACKPINK How You Like That', 'US');
  await checkOne('bts_1', 'BTS Dynamite', 'US');
  await checkOne('loso_1', 'Loso ใจสั่งมา', 'TH');
  await checkOne('phai_1', 'ไผ่ พงศธร คนบ้านเดียวกัน', 'TH');
  await checkOne('yoasobi_idol', 'YOASOBI Idol', 'JP');
  await checkOne('lisa_gurenge', 'LiSA Gurenge', 'JP');
  await checkOne('hige_pretender', 'Official HIGE DANdism Pretender', 'JP');
  await checkOne('ado_new_genesis', 'Ado New Genesis', 'JP');
  await checkOne('kenshi_kickback', 'Kenshi Yonezu KICK BACK', 'JP');
  await checkOne('eve_kaikai', 'Eve Kaikai Kitan', 'JP');
}

run();
