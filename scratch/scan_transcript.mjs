import fs from 'fs';
import readline from 'readline';

async function scan() {
  const fileStream = fs.createReadStream('C:/Users/User/.gemini/antigravity-ide/brain/413a3ec8-0cf5-49d8-b5b7-7a782fb2818e/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('1 2 3 6') || line.includes('ขอลิสตฺแบพร้อมเลข') || line.includes('เสนอศิลปิน')) {
      try {
        const obj = JSON.parse(line);
        if (obj.content) {
          console.log('--- FOUND MATCH ---', obj.type);
          console.log(obj.content.slice(0, 300));
        }
      } catch (e) {}
    }
  }
}
scan();
