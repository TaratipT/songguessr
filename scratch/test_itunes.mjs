import https from 'https';

const testArtists = [
  { name: 'Lula', storefront: 'TH' },
  { name: 'BNK48', storefront: 'TH' },
  { name: 'Ice Paris', storefront: 'TH' },
  { name: 'Whal & Dolph', storefront: 'TH' },
  { name: 'YENTED', storefront: 'TH' },
  { name: 'YOUNGGU', storefront: 'TH' },
  { name: 'Carly Rae Jepsen', storefront: 'US' },
  { name: 'Ellie Goulding', storefront: 'US' },
  { name: 'keshi', storefront: 'US' },
  { name: 'Jeremy Zucker', storefront: 'US' }
];

async function checkArtist(artist) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist.name)}&country=${artist.storefront}&media=music&entity=song&limit=5`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✓ ${artist.name} (${artist.storefront}): found ${json.resultCount} tracks on iTunes (e.g. "${json.results[0]?.trackName}" by "${json.results[0]?.artistName}")`);
          resolve(true);
        } catch (e) {
          console.error(`✗ ${artist.name}: Error parsing iTunes response`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`✗ ${artist.name}: Error:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const a of testArtists) {
    await checkArtist(a);
  }
}
run();
