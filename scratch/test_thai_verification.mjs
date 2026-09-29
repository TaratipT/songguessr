import fs from 'fs';

// Simple unit test on logic extracted directly
const code = fs.readFileSync('src/data/thaiSongTitleAliases.ts', 'utf8');

// Ensure no blackbeans or wonderframe bogus translations exist
const forbidden = [
  'ย้อนเวลา',
  'จรวดสู่ดวงจันทร์',
  'เต้นรำกับฉัน',
  'นาทีแห่งความรัก',
  'ล้อเล่นเหรอ',
  'วัยเยาว์ (Be My Youth)',
  'หลบ (Escape)',
  'ครั้งหนึ่ง (Once)',
  'ฮิตมีอัพ',
  'ดวงจันทร์ของฉัน',
  'พรุ่งนี้'
];

for (const f of forbidden) {
  if (code.includes(f)) {
    console.error('FAIL: Found forbidden string:', f);
    process.exit(1);
  }
}
console.log('SUCCESS: No fabricated titles found in thaiSongTitleAliases.ts');

// Check that genuine songs ARE present
const required = [
  "ดาวหางฮัลเลย์ (Halley's Comet)",
  "ธรรมดาแสนพิเศษ (Extraordinary)",
  "หินหยดลงน้ำ (Adore)",
  "หนึ่งคนตรงนี้ (I'm here)",
  "ยอม..ปล่อย (Let You Go)",
  "รังเกียจกันไหม (Do You Mind)",
  "คิด(แต่ไม่)ถึง (Same Page?)",
  "เพื่อนเล่น ไม่เล่นเพื่อน (Just Being Friendly)",
  "โต๊ะริม (Melt)",
  "วาดไว้ (Recall)",
  "ทรงอย่างแบด (Bad Boy)"
];

for (const r of required) {
  if (!code.includes(r)) {
    console.error('FAIL: Missing required song:', r);
    process.exit(1);
  }
}
console.log('SUCCESS: All required genuine songs present');
