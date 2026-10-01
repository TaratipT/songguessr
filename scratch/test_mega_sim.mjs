// Test mega hits logic simulation
async function testMegaHitsLogic() {
  const sampleQueries = [
    'ทรงอย่างแบด Paper Planes',
    'รักแรก นนท์ ธนนท์',
    'โต๊ะริม NONT TANONT',
    'วาดไว้ BOWKYLION',
    'คิดแต่ไม่ถึง Tilly Birds',
    'ถ้าเธอรักฉันจริง Three Man Down',
    'นะหน้าทอง โจอี้ ภูวศิษฐ์',
    'เชือกวิเศษ Labanoon',
    'คุกเข่า Cocktail',
    'ไกลแค่ไหน คือ ใกล้ Getsunova'
  ];

  const fetchPromises = sampleQueries.map(async (query) => {
    let termStorefront = 'TH';
    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=${termStorefront}&entity=song&limit=4`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    const item = (data.results || []).find(it => it.previewUrl && it.trackName && it.artistName);
    if (!item) return null;
    return {
      title: item.trackName,
      artist: item.artistName,
      previewUrl: item.previewUrl
    };
  });

  const songs = (await Promise.all(fetchPromises)).filter(Boolean);
  console.log(`Successfully fetched ${songs.length} / ${sampleQueries.length} mega hits:`);
  songs.forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.title}] by ${s.artist} (Preview: ${s.previewUrl.slice(0, 35)}...)`);
  });
}

testMegaHitsLogic();
