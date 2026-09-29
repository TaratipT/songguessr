const list = [
  'NuNew', 'ALALA', 'MXFRUIT', 'VIIS', 'QRRA', 'FLI:P', 'DIDIxDADA', 'Wizzle', 'EMPRESS', 'ALLY', 'Mew Suppasit',
  'Clockwork Motionless', 'Chilax', 'Earth Patravee', 'mints', 'Monica', 'KIKI', 'PanPan Yeeyee', 'Gym and Swim', 'H 3 F',
  't_047', 'เขียนไขและวานิช', 'คณะขวัญใจ', 'ไววิทย์',
  'JARVIS', 'GUYGEEGEE', 'CDGUNTEE', 'LIL X', 'FIIXD', 'Thaitanium',
  'Instinct', 'Pancake', 'Black Vanilla', 'เล้าโลม', 'Slur', 'P.O.P',
  'Oat Pramote', 'Boyd Kosiyabong', 'พลพล', 'Gun Napat', 'Gam Wichayanee', 'โรส ศิรินทิพย์'
];

async function check() {
  for (const name of list) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=song&limit=2&country=TH`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const topSong = data.results?.[0]?.trackName || 'NO SONG';
      console.log(`[OK] ${name} -> ${data.resultCount} songs (Top: ${topSong})`);
    } catch (e) {
      console.log(`[FAIL] ${name} -> ${e.message}`);
    }
  }
}
check();
