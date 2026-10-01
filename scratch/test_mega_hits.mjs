// Test mega hits iTunes query
async function testQuery(term, country) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1&country=${country}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const item = data.results[0];
    console.log(`[OK] "${term}" -> Title: "${item.trackName}" | Artist: "${item.artistName}" | Preview: ${!!item.previewUrl}`);
  } else {
    console.log(`[FAIL] "${term}" -> Not found`);
  }
}

async function run() {
  console.log('Testing Thai Mega Hits:');
  await testQuery('ทรงอย่างแบด Paper Planes', 'TH');
  await testQuery('รักแรก นนท์ ธนนท์', 'TH');
  await testQuery('โต๊ะริม NONT TANONT', 'TH');
  await testQuery('เชือกวิเศษ Labanoon', 'TH');
  await testQuery('คุกเข่า Cocktail', 'TH');

  console.log('\nTesting Inter Mega Hits:');
  await testQuery('Shape of You Ed Sheeran', 'US');
  await testQuery('Blinding Lights The Weeknd', 'US');
  await testQuery('Uptown Funk Bruno Mars', 'US');

  console.log('\nTesting K-Pop Mega Hits:');
  await testQuery('Dynamite BTS', 'US');
  await testQuery('Hype Boy NewJeans', 'US');
  await testQuery('Supernova aespa', 'US');
  await testQuery('DDU-DU DDU-DU BLACKPINK', 'US');
}

run();
