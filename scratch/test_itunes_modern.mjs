const testBatch = [
  ['Only Monday', 'TH'],
  ['ALALA', 'TH'],
  ['MXFRUIT', 'TH'],
  ['FLI:P', 'TH'],
  ['Clockwork Motionless', 'TH'],
  ['Earth Patravee', 'TH'],
  ['t_047', 'TH'],
  ['เขียนไขและวานิช', 'TH'],
  ['Chilax', 'TH'],
  ['JARVIS', 'TH'],
  ['GUYGEEGEE', 'TH'],
  ['CDGUNTEE', 'TH'],
  ['Chappell Roan', 'US'],
  ['Charli xcx', 'US'],
  ['Tate McRae', 'US'],
  ['Benson Boone', 'US'],
  ['Tommy Richman', 'US'],
  ['Laufey', 'US'],
  ['d4vd', 'US'],
  ['PinkPantheress', 'US'],
  ['Ice Spice', 'US'],
  ['Hozier', 'US'],
  ['LANY', 'US'],
  ['Playboi Carti', 'US'],
  ['Yeat', 'US'],
  ['Tyla', 'US'],
  ['Fred again..', 'US']
];

async function run() {
  for (const [name, sf] of testBatch) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=song&limit=3&country=${sf}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const topSong = data.results?.[0]?.trackName || 'NO TRACK';
      console.log(`[iTunes OK] ${name} (${sf}) -> ${data.resultCount} songs (Top: ${topSong})`);
    } catch (e) {
      console.log(`[ERR] ${name} -> ${e.message}`);
    }
  }
}

run();
