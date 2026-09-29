import fs from 'fs';

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const ids = ['oat_pramote', 'guncharlie', 'atom_chanakan', 'dr_fuu', 'soybad', 'wonderframe', 'room39', 'wanyai', 'whatcharawalee'];

ids.forEach(id => {
  const exists = content.includes(`id: '${id}'`);
  console.log(id, '->', exists ? 'EXISTS' : 'OK (Fresh ID)');
});
