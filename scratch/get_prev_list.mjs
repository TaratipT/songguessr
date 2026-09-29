import fs from 'fs';
import readline from 'readline';

async function scan() {
  const fileStream = fs.createReadStream('C:/Users/User/.gemini/antigravity-ide/brain/413a3ec8-0cf5-49d8-b5b7-7a782fb2818e/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let foundRequest = false;
  for await (const line of rl) {
    if (line.includes('ขอลิสตฺแบพร้อมเลข')) {
      foundRequest = true;
      continue;
    }
    if (foundRequest && line.includes('"type":"PLANNER_RESPONSE"')) {
      const obj = JSON.parse(line);
      fs.writeFileSync('scratch/previous_proposed_list.txt', obj.content || '');
      console.log('Saved previous proposed list to scratch/previous_proposed_list.txt');
      break;
    }
  }
}
scan();
