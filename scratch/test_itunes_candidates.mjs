// Native fetch in Node 20

async function testITunes(term, storefront = 'TH') {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=3&country=${storefront}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { name: term, count: data.resultCount, topSong: data.results?.[0]?.trackName };
  } catch (e) {
    return { name: term, error: e.message };
  }
}

async function run() {
  const testList = [
    ['HYBS', 'TH'],
    ['Phum Viphurit', 'TH'],
    ['Zweed n\' Roll', 'TH'],
    ['New Jiew', 'TH'],
    ['Instinct', 'TH'],
    ['Thaitanium', 'TH'],
    ['Whitney Houston', 'US'],
    ['ABBA', 'US'],
    ['Jason Mraz', 'US'],
    ['Westlife', 'US'],
    ['Glass Animals', 'US'],
  ];

  for (const [name, sf] of testList) {
    const res = await testITunes(name, sf);
    console.log(`[iTunes OK] ${res.name} -> ${res.count} songs found (Top: ${res.topSong})`);
  }
}

run();
