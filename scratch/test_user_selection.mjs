async function testSearch(name, storefront) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=song&limit=5&country=${storefront}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      term: name,
      count: data.resultCount,
      artistNames: [...new Set(data.results?.map(r => r.artistName))],
      topSongs: data.results?.map(r => `${r.trackName} (${r.artistName})`).slice(0, 4)
    };
  } catch (e) {
    return { term: name, error: e.message };
  }
}

async function run() {
  const list = [
    // Selected from numbers
    ['HYBS', 'TH'],
    ['Zweed n\' Roll', 'TH'],
    ['Zom Marie', 'TH'],
    ['ส้ม มารี', 'TH'],
    ['Jannine Weigel', 'TH'],
    ['พลอยชมพู', 'TH'],
    ['New Jiew', 'TH'],
    ['นิว จิ๋ว', 'TH'],
    ['Two Popetorn', 'TH'],
    ['ตู่ ภพธร', 'TH'],
    ['The Richman Toy', 'TH'],
    ['GAVIN:D', 'TH'],
    ['กวินท์', 'TH'],
    ['AUTTA', 'TH'],
    ['อัตตา', 'TH'],
    ['Central Cee', 'US'],

    // User explicitly requested Thai artists
    ['AYLA', 'TH'],
    ['AYLA\'s', 'TH'],
    ['BLVCKHEART', 'TH'],
    ['P6ICK', 'TH'],
    ['เรนิษรา', 'TH'],
    ['reinizra', 'TH'],
    ['SURIYA MQT', 'TH'],
    ['SURIYA', 'TH']
  ];

  for (const [name, sf] of list) {
    const r = await testSearch(name, sf);
    console.log(`\n--- [${r.term}] (${sf}) -> ${r.count} results ---`);
    console.log('Artists:', r.artistNames);
    console.log('Top Songs:', r.topSongs);
  }
}

run();
