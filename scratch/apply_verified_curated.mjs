import fs from 'fs';

const verified = JSON.parse(fs.readFileSync('scratch/verified_curated.json', 'utf8'));

// Add manual entries for fujii_shinunoga and phai_1
verified.fujii_shinunoga = {
  previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b1/27/a4/b127a427-710b-e65f-e734-ead910b94cbc/mzaf_692825803667967327.plus.aac.p.m4a',
  artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/96/4e/5b/964e5b6e-4766-63ba-7e50-9f8a5bd0569e/20UMGIM17280.rgb.jpg/600x600bb.jpg'
};

verified.phai_1 = {
  previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/27/e1/52/27e15232-c086-1eb6-07c3-8596b3430b7c/mzaf_7872931806740257343.plus.aac.p.m4a',
  artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ee/15/5a/ee155ad3-f256-f065-b81e-007a6cf79342/888332975834.jpg/600x600bb.jpg'
};

let content = fs.readFileSync('src/data/curatedSongs.ts', 'utf-8');

// Replace previewUrl and artworkUrl for each song block
for (const [id, data] of Object.entries(verified)) {
  // Find block starting with id: 'id'
  const blockRegex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?previewUrl:\\s*')[^']+('[\\s\\S]*?artworkUrl:\\s*')[^']+(')`);
  if (blockRegex.test(content)) {
    content = content.replace(blockRegex, `$1${data.previewUrl}$2${data.artworkUrl}$3`);
    console.log(`Updated ${id}`);
  } else {
    console.warn(`Could not match regex for ${id}`);
  }
}

fs.writeFileSync('src/data/curatedSongs.ts', content);
console.log('Successfully updated src/data/curatedSongs.ts');
