import fs from 'fs';
import readline from 'readline';

async function scan() {
  const fileStream = fs.createReadStream('C:/Users/User/.gemini/antigravity-ide/brain/413a3ec8-0cf5-49d8-b5b7-7a782fb2818e/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let foundRequest = false;
  let count = 0;
  for await (const line of rl) {
    if (line.includes('ขอลิสตฺแบพร้อมเลข')) {
      foundRequest = true;
      continue;
    }
    if (foundRequest) {
      count++;
      try {
        const obj = JSON.parse(line);
        if (obj.content && obj.content.length > 50) {
          fs.writeFileSync('scratch/previous_proposed_list.txt', obj.content);
          console.log('Saved from transcript_full at step offset', count);
          break;
        }
      } catch (e) {}
    }
  }
}
scan();
