// =========================================================================
// 💻 ชื่อผู้เล่นสายไอที เบียวๆ ฮาๆ (Chuunibyou IT & Programmer Names)
// =========================================================================

export const CHUUNIBYOU_IT_NAMES: string[] = [
  'จอมมาร Full-Stack ไร้บั๊ก',
  'เทพแห่งการ Git Push --force',
  'เซียนแก้โค้ดตอนตีสาม',
  'Dev สิ้นหวังยังแก้เพลิน',
  'บอสใหญ่ NullPointer',
  'มหาเทพอินฟราไม่เคยนอน',
  'เทพจอมเวท CSS จัดกึ่งกลาง',
  'สิงห์ลบ Database บน Prod',
  'นักรบ Docker คืนชีพ',
  'จอมขมังเวท StackOverflow',
  'เจ้าชายแห่ง Kernel Panic',
  'นักดาบ Python ไร้ Indent',
  'เทพเซียนกู้ Server พัง',
  'ราชันย์แห่ง 404 Not Found',
  'จอมเวทมนตร์ดำ AI Prompt',
  'เซียนแก้โค้ดแล้วไม่ Test',
  'มือปืน React Hook มหากาฬ',
  'เทพเจ้าแห่ง Memory Leak',
  'นักพรตแก้ลูป Infinite',
  'อัศวินลืม Commit โค้ด',
  'เทพล้างแคช F5 รัวๆ',
  'เจ้าแม่ RegEx ลี้ลับ',
  'สหายสาย Debug ด้วย Print',
  'ปรมาจารย์ Spaghetti Code',
  'มหาโจรขโมย API Key',
  'ผู้พิชิต Bug ตอน Demo',
  'จอมยุทธ์ก๊อปโค้ดอินเดีย',
  'เทพบุตร Deploy วันศุกร์',
  'นักเชือด Merge Conflict',
  'จอมมารลืมปิดแท็ก div',
  'เซียน Linux สั่ง sudo rm -rf',
  'เทพทรูเติม Claude เกินลิมิต',
  'จอมสับขาหลอก Pull Request',
  'มหาเทพ Jira ตั๋วค้างพันใบ',
  'สิงห์ปืนไว Typing 120 WPM'
];

export function getRandomITPlayerName(): string {
  const index = Math.floor(Math.random() * CHUUNIBYOU_IT_NAMES.length);
  return CHUUNIBYOU_IT_NAMES[index];
}
