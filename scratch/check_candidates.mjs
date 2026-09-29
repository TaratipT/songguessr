import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/existing_artists_summary.json', 'utf8'));
const thaiSet = new Set(data.thaiNames);
const interSet = new Set(data.interNames);

// Let's test a broad set of popular Thai artists across categories:
const candidateThai = [
  // T-POP / Pop Modern
  { name: 'ALALA', genre: 'T-POP เกิร์ลกรุ๊ป', hits: 'ร้องไห้ดังๆ, ซึ้งอยู่, บังเอิญตั้งใจ' },
  { name: 'DEXX', genre: 'T-POP บอยแบนด์', hits: 'DEXX, โคตรจะดี' },
  { name: 'VIIS', genre: 'T-POP เกิร์ลกรุ๊ป', hits: 'Barbie (Oops! Oops!), Mirage, Don\'t Mind' },
  { name: 'bamm', genre: 'T-POP Co-ed', hits: 'โดนเทแต่เทอยู่, เอ๋ง, ปล่อยจอย, ฉันจะฉาปเธอ' },
  { name: 'MXFRUIT', genre: 'T-POP เกิร์ลกรุ๊ป', hits: 'strawberry ice cream, ทำไมไม่ตอบ, มีใจก็ทัก' },
  { name: 'LYKN', genre: 'T-POP บอยแบนด์', hits: 'เลิกกับเขาเดี๋ยวเหงาเป็นเพื่อน, แอบรักไม่ทำให้ใครตาย, โฮ่ง!' },
  { name: 'PERSES', genre: 'T-POP บอยแบนด์', hits: 'MY TIME, TOUCHDOWN, CATCH THE NIGHT, น่ารักน้อยลงหน่อย' },
  { name: 'Pretzelle', genre: 'T-POP เกิร์ลกรุ๊ป', hits: 'ต้องชอบแค่ไหน, ไม่รับสาย, ถ้าหากเธอไม่เคยรัก' },
  { name: 'BNK48', genre: 'ไอดอล/ป็อป', hits: 'คุกกี้เสี่ยงทาย, วันแรก, โดดดิด่ง, เธอคือ...เมโลดี้' },
  { name: 'CGM48', genre: 'ไอดอล/ป็อป', hits: 'เชียงใหม่ 106, มะลิ, ลา ลา รัก' },
  { name: 'QRRA', genre: 'T-POP เกิร์ลกรุ๊ป', hits: 'Miracle, ไม่ง้อ' },
  { name: 'ATLAS', genre: 'T-POP บอยแบนด์', hits: 'MAYDAY MAYDAY, LOLAY, เธอมีความหมาย' },
  { name: 'DICE', genre: 'T-POP บอยแบนด์', hits: 'Mona Lisa, Trap' },

  // Thai Indie / Modern Pop / Synth
  { name: 'LANDOKMAI', genre: 'ดรีมป็อป/อินดี้', hits: 'เพลงรักเพลงแรก, Tsuki, ด้วยใจยินดี, เกาะลอย' },
  { name: 'Television off', genre: 'อินดี้ร็อก/ชูเกซ', hits: 'ฝันที่ไม่ปลอดภัย, ให้เธอหายไป, ขอจำไว้ก่อน' },
  { name: 'Moving and Cut', genre: 'อินดี้ป็อป', hits: 'อย่าเลย...อย่าทรมาน, คำบอกลา, ฉันยอม' },
  { name: 'Whal & Dolph', genre: 'อินดี้ป็อป', hits: 'ใจเดียว, ยิ้ม, นานอีกหน่อย, ไม่รู้ทำไม' },
  { name: 'Solitude Is Bliss', genre: 'อินดี้ร็อก', hits: 'ร่องน้ำตา, สัญญาณ' },
  { name: 'YENTED', genre: 'นีโอโซล/อินดี้ป็อป', hits: 'หินหยดลงน้ำ, อย่าสงสัย, Her, ถ้าหาก' },
  { name: 'loserpop', genre: 'อินดี้ป็อป', hits: 'เคยคิดว่า, ฉันคนหนึ่ง, วันเก่า' },
  { name: 'Blackbeans', genre: 'อินดี้ป็อป/โลไฟ', hits: 'Moon, Wish, About Love, Winston' },
  { name: 'Desktop Error', genre: 'โพสต์ร็อก/อินดี้', hits: 'ควัน, ขอ, ทุกทุกวัน' },
  { name: 'Plastic Plastic', genre: 'อินดี้ป็อป/โฟล์ก', hits: 'ฮัม, อยากรู้, Merry Go Round' },
  { name: 'เขียนไขและวานิช', genre: 'โฟล์กเหน่อ/อินดี้', hits: 'แก้มน้องนางนั้นแดงกว่าใคร, หนีห่าง, ภาพถ่าย' },
  { name: 'ไววิทย์', genre: 'โฟล์กเพื่อชีวิต', hits: 'ศิลปินไส้แห้ง, ไววิทย์, กวีร้องไห้' },
  { name: 'คณะขวัญใจ', genre: 'โฟล์กเพื่อชีวิตอินดี้', hits: 'ย้ายป่า, ฉันรักเธอ, ฟ้าครึ้ม' },
  { name: 'เรืองฤทธิ์', genre: 'โฟล์กอินดี้', hits: 'เธอคือดวงจันทร์, คนที่เธอไม่มอง' },
  { name: 'Uncle Tree', genre: 'อินดี้/อะคูสติก', hits: 'ต้นไม้แห่งความหลัง, สบายดี' },

  // Thai Hip Hop / R&B
  { name: 'SARAN', genre: 'ฮิปฮอป/แร็ป', hits: 'ลืมแทบไม่ไหว, ใจพัง, เธอไม่ต้องพูด' },
  { name: '1MILL', genre: 'ฮิปฮอป/แทร็ป', hits: 'Can\'t Stop Me, Go Get The Money, Bad Bitch' },
  { name: 'DIAMOND MQT', genre: 'ฮิปฮอป', hits: 'Gucci Belt, เพลงรักเพลงหนึ่ง, ไม่บอก' },
  { name: 'MILLI', genre: 'ฮิปฮอป/ป็อป', hits: 'พักก่อน, สุดปัง, Mirror Mirror, 17 นาที' },
  { name: 'SPRITE', genre: 'ฮิปฮอป/ป็อป', hits: 'ทน, เดียวดาย, ปิก้า, ไอโซดา' },
  { name: 'OG-ANIC', genre: 'ฮิปฮอป/อาร์แอนด์บี', hits: 'รู้ทั้งรู้, เป็นไรไหม, มีแค่เธอ' },
  { name: 'LAZYLOXY', genre: 'ฮิปฮอป/อาร์แอนด์บี', hits: 'เป็นไรไหม, มอร์นิ่ง, ไนต์, FINE DAY' },
  { name: 'MAIYARAP', genre: 'ฮิปฮอป', hits: 'แฟนใหม่หน้าคุ้น, เก็บไว้ในใจไม่พอ, ปล่อย' },
  { name: 'TWOPEE SOUTHSIDE', genre: 'ฮิปฮอป', hits: 'ได้อยู่, ไหวรึเปล่า, เอาละเว้ย' },
  { name: 'YOUNGOHM', genre: 'ฮิปฮอป/แทร็ป', hits: 'เฉยเมย, ธาตุทองซาวด์, ดูไว้, ก่อนนอนคืนนี้' },
  { name: 'YOUNGGU', genre: 'ฮิปฮอป', hits: 'วิ่งแบบพี่ตูน, Shishi' },
  { name: 'F.HERO', genre: 'ฮิปฮอปไทยระดับตำนาน', hits: 'จำเก่ง, คอแห้ง, มีแค่เรา, ชูใจ' },
  { name: 'D GERRARD', genre: 'อาร์แอนด์บี/โซล', hits: 'Galaxy, ไม่เหมือนใคร, เกาะสวาทหาดสวรรค์, เอิงเอย' },
  { name: 'Pun', genre: 'อาร์แอนด์บี/ป็อป', hits: 'KRYPTONITE, STAY, Goodbye, รอรับสาย' },
  { name: 'URBOYTJ', genre: 'ฮิปฮอป/ป็อป', hits: 'วายร้าย, เค้าก่อน, รังแก, เป็นได้ทุกอย่าง' },
  { name: 'CDGUNTEE', genre: 'ฮิปฮอป/อาร์แอนด์บี', hits: 'Microphone, ดึกแล้ว, เธอคนเดียว' },

  // Thai Pop / Rock / 90s-2000s Legends
  { name: 'เบิร์ด ธงไชย', genre: 'ป็อปซูเปอร์สตาร์ตลอดกาล', hits: 'หมอกหรือควัน, บูมเมอแรง, พริกขี้หนู, สบาย สบาย, แฟนจ๋า' },
  { name: 'บี้ สุกฤษฎิ์', genre: 'แดนซ์/ป็อปสตาร์', hits: 'จังหวะหัวใจ, Wait a Minute, I Need Somebody, มากมาย' },
  { name: 'สิงโต นำโชค', genre: 'ฟีลกู๊ด/โฟล์กป็อป', hits: 'อยู่ต่อเลยได้ไหม, อาย, อ้ายข่อยเจ็บ, สบายดีหรือเปล่า' },
  { name: 'ก้อง ห้วยไร่', genre: 'ลูกทุ่ง/เพื่อชีวิตโมเดิร์น', hits: 'ไสว่าสิบ่ถิ่มกัน, คู่คอง, ริบบิ้นเลิฟมวยไทย' },
  { name: 'มนต์แคน แก่นคูน', genre: 'ลูกทุ่งอีสานพันล้านวิว', hits: 'คำว่าฮักกัน, อ้ายฮักเขา, สัญญาน้ำตาแม่' },
  { name: 'ลำไย ไหทองคำ', genre: 'ลูกทุ่งหมอลำซิ่ง', hits: 'ผู้สาวขาเลาะ, ยายแล่ม, แดนซ์สะเด่า' },
  { name: 'จ๊ะ นงผณี', genre: 'ลูกทุ่งแดนซ์', hits: 'คันหู, เห็นนางเงียบๆ' },
  { name: 'เต๋า สมชาย', genre: 'ทีนป็อป/ร็อก 90s', hits: 'สมชายจรดปลายเท้า, บอดี้การ์ด, โลกทั้งใบให้นายคนเดียว' },
  { name: 'มอส ปฏิภาณ', genre: 'ป็อป 90s', hits: 'เหลวไหล, ด้วยรักและปลาทู, สลัดสะบัด' },
  { name: 'เจ เจตริน', genre: 'แดนซ์ป็อป 90s คิงออฟแดนซ์', hits: 'กองไว้, คาใจ, เจ็บไปเจ็บมา, ฝากเลี้ยง, All I Wanna Do' },
  { name: 'คริสติน่า อากีล่าร์', genre: 'ควีนออฟแดนซ์ 90s', hits: 'พลิกล็อค, นินจา, พูดอีกที, ประวัติศาสตร์' },
  { name: 'ทาทา ยัง', genre: 'ป็อปไอคอน 90s-2000s', hits: 'โอ๊ะ...โอ๊ย, รบกวนมารักกัน, ซักกะนิด, Dhoom Dhoom' },
  { name: 'นิโคล เทริโอ', genre: 'ป็อป 90s', hits: 'กะโปโล, บุษบา, ไม่แน่ใจ, เปรี้ยวใจ' },
  { name: 'โบ สุนิตา', genre: 'ดีว่าบัลลาด 90s', hits: 'ฉันรู้, พรุ่งนี้จะไปกับเธอ, ขอเป็นคนของเธอ, อธิษฐาน' },
  { name: 'ปาน ธนพร', genre: 'ดีว่าสายดราม่า 2000s', hits: 'เรื่องง่ายๆ (ที่ผู้ชายไม่รู้), ตบมือข้างเดียว, นรกในใจ' },
  { name: 'ดา เอ็นโดรฟิน', genre: 'ป็อปร็อกดีว่า', hits: 'เพื่อนสนิท, สิ่งสำคัญ, ได้ยินไหม, น้ำเต็มแก้ว' },
  { name: 'Lula (ลุลา)', genre: 'บอสซาโนวา/ป็อป', hits: 'ตุ๊กตาหน้ารถ, ทะเลสีดำ, มันคือความรัก' },
  { name: 'Singular', genre: 'อะคูสติกป็อป', hits: 'เบา เบา, 24.7, ลอง' },
  { name: 'ETC.', genre: 'โซล/ป็อปแจ๊ส', hits: 'เธอคือใคร, เปลี่ยน, สิ่งมีชีวิตที่คิดได้และเจ็บเป็น' },
  { name: 'Crescendo', genre: 'ฟังก์/โซล/ร็อก', hits: 'ความจริงในใจ, ดินแดนแห่งความรัก, วาสนา' },
  { name: 'วงกางเกง', genre: 'เพื่อชีวิตแดนใต้/ร็อก', hits: 'กางเกงตัวร้ายๆ, สัญญาณเตือน' },
  { name: 'พงษ์สิทธิ์ คำภีร์', genre: 'เพื่อชีวิตระดับตำนาน', hits: 'ตลอดเวลา, มือปืน, เสมอ, รักเดียว, ไถ่เธอที่หน้าซีคอน' },
  { name: 'มาลีฮวนน่า', genre: 'เพื่อชีวิตปักษ์ใต้', hits: 'แสงจันทร์, หัวใจละเหี่ย, เรือรักกระดาษ' },
  { name: 'แคลช', genre: 'ร็อก', hits: 'ขอเช็ดน้ำตา' }, // Clash already there
  { name: 'Sweet Mullet', genre: 'โพสต์ฮาร์ดคอร์/ร็อก', hits: 'พลังแสงอาทิตย์, สภาวะหัวใจล้มเหลวเฉียบพลัน' },
  { name: 'Retrospect', genre: 'สครีโม/เมทัลคอร์', hits: 'ไม่มีเธอ, เพราะว่ารัก, ปล่อยฉัน, ให้ฉันลืมเธอ' },
  { name: 'Ebola', genre: 'นูเมทัล/ฮาร์ดร็อก', hits: 'สิ่งที่ฉันเป็น, แสงสว่าง, กลับสู่จุดเริ่มต้น' },
  { name: 'Silly Fools', genre: 'โมเดิร์นร็อกระดับตำนาน', hits: 'จิ๊จ๊ะ, วัดใจ, ขี้หึง, น้ำลาย, ไหนว่าจะไม่หลอกกัน' },
  { name: 'Loso', genre: 'ร็อกระดับตำนาน', hits: 'ซมซาน, ใจสั่งมา, อะไรก็ยอม, คืนจันทร์, 14 อีกครั้ง' },
  { name: 'Blackhead', genre: 'ร็อก 90s', hits: 'ยิ่งโตยิ่งสวย, ยอมรับ, อยู่ไปไม่มีเธอ, เหตุผล' },
  { name: 'Zeal', genre: 'ป็อปร็อก', hits: 'สองรัก, หมดชีวิต (ฉันให้เธอ), ล้มทั้งยืน, เตลิด' },
  { name: 'Klear', genre: 'ป็อปร็อก', hits: 'คำยินดี, เล่นของสูง, รักไม่ต้องการเวลา, จะรักหรือจะร้าย' },
  { name: 'Paradox', genre: 'อินดี้ร็อก/วาไรตี้', hits: 'ฤดูร้อน, ร้องไห้เหม็น, ร.ด. Dance, Sexy, มีแต่เธอ' },
  { name: 'Slot Machine', genre: 'อัลเทอร์เนทีฟร็อก', hits: 'ผ่าน, เคลิ้ม, จันทร์เจ้า, รุ้ง' },
  { name: 'Tattoo Colour', genre: 'ป็อปร็อก/วาไรตี้', hits: 'ขาหมู, ฟ้า, เกาะร้าง ห่างรัก, Cinderella, โกหก' },
  { name: 'Modern Dog', genre: 'อัลเทอร์เนทีฟระดับตำนาน', hits: 'บุษบา, ตาสว่าง, ก่อน, กะลา, ติ๋ม' },
  { name: 'Flure', genre: 'อัลเทอร์เนทีฟร็อก', hits: 'ฤดูที่ฉันเหงา, เรื่องเดียว, เปลี่ยน, ยื้อ' }
];

// Candidates for International (สากล)
const candidateInter = [
  // Pop Superstars
  { name: 'Olivia Rodrigo', genre: 'Pop / Pop-Rock', hits: 'drivers license, good 4 u, vampire, deja vu, bad idea right?' },
  { name: 'Sabrina Carpenter', genre: 'Pop', hits: 'Espresso, Please Please Please, Feather, Nonsense' },
  { name: 'Billie Eilish', genre: 'Alt-Pop', hits: 'bad guy, BIRDS OF A FEATHER, bury a friend, LUNCH, Ocean Eyes' },
  { name: 'Dua Lipa', genre: 'Dance-Pop', hits: 'Levitating, Don\'t Start Now' },
  { name: 'Chappell Roan', genre: 'Synth-Pop / Alt', hits: 'Good Luck, Babe!, HOT TO GO!, Red Wine Supernova, Pink Pony Club' },
  { name: 'Charli xcx', genre: 'Hyperpop / Club', hits: 'Apple, 360, Boom Clap, Speed Drive, Talk talk' },
  { name: 'Lady Gaga', genre: 'Pop / Dance', hits: 'Bad Romance, Poker Face, Shallow, Born This Way, Die With A Smile' },
  { name: 'Rihanna', genre: 'Pop / R&B', hits: 'Umbrella, Diamonds, We Found Love, Work, Love On The Brain' },
  { name: 'Katy Perry', genre: 'Pop', hits: 'Firework, Roar, Teenage Dream, Dark Horse, California Gurls' },
  { name: 'Beyoncé', genre: 'Pop / R&B / Dance', hits: 'Single Ladies, Halo, TEXAS HOLD \'EM, Crazy in Love, CUFF IT' },
  { name: 'Adele', genre: 'Pop / Soul / Ballad', hits: 'Rolling in the Deep, Someone Like You, Hello, Easy On Me, Set Fire to the Rain' },
  { name: 'Lana Del Rey', genre: 'Dream Pop / Alt', hits: 'Summertime Sadness, Video Games, Young and Beautiful, Born to Die' },
  { name: 'Lorde', genre: 'Art Pop / Indie Pop', hits: 'Royals, Green Light, Solar Power, Team' },
  { name: 'Carly Rae Jepsen', genre: 'Pop', hits: 'Call Me Maybe, I Really Like You, Run Away With Me' },
  { name: 'Selena Gomez', genre: 'Pop / Dance', hits: 'Lose You to Love Me, Wolves, Hands to Myself, Calm Down' },
  { name: 'Miley Cyrus', genre: 'Pop / Rock', hits: 'Flowers, Wrecking Ball, Party In The U.S.A., Midnight Sky' },
  { name: 'Demi Lovato', genre: 'Pop', hits: 'Heart Attack, Cool for the Summer, Sorry Not Sorry' },
  { name: 'Camila Cabello', genre: 'Pop / Latin Pop', hits: 'Havana, Señorita, Never Be the Same, I LUV IT' },
  { name: 'Meghan Trainor', genre: 'Pop / Doo-Wop', hits: 'All About That Bass, Made You Look, Like I\'m Gonna Lose You' },
  { name: 'Shawn Mendes', genre: 'Pop / Acoustic', hits: 'Treat You Better, Stitches, Señorita, There\'s Nothing Holdin\' Me Back' },
  { name: 'Charlie Puth', genre: 'Pop', hits: 'Attention, We Don\'t Talk Anymore, Left and Right, See You Again' },
  { name: 'Harry Styles', genre: 'Pop-Rock', hits: 'As It Was, Watermelon Sugar, Sign of the Times, Golden' },
  { name: 'ZAYN', genre: 'R&B / Pop', hits: 'PILLOWTALK, Dusk Till Dawn, I Don\'t Wanna Live Forever' },
  { name: 'Niall Horan', genre: 'Pop / Folk-Pop', hits: 'Slow Hands, This Town, Heaven' },
  { name: 'One Direction', genre: 'Boy Band / Pop', hits: 'What Makes You Beautiful, Story of My Life, Drag Me Down, Night Changes' },
  { name: 'Justin Timberlake', genre: 'Pop / R&B', hits: 'CAN\'T STOP THE FEELING!, Mirrors, SexyBack, Cry Me a River' },
  { name: 'Bruno Mars', genre: 'Pop / Funk / Soul', hits: 'Uptown Funk, That\'s What I Like, 24K Magic, Die With A Smile, Just the Way You Are' },
  { name: 'Ed Sheeran', genre: 'Pop / Acoustic', hits: 'Shape of You, Perfect, Thinking Out Loud, Bad Habits' },
  { name: 'The Weeknd', genre: 'R&B / Synthwave / Pop', hits: 'Blinding Lights, Starboy, Can\'t Feel My Face, Save Your Tears' },
  { name: 'Sam Smith', genre: 'Soul / Pop', hits: 'Stay With Me, Unholy, I\'m Not The Only One, Too Good at Goodbyes' },
  { name: 'Post Malone', genre: 'Pop / Rap / Country', hits: 'Sunflower, Circles, Congratulations, Rockstar, I Had Some Help' },
  { name: 'Kendrick Lamar', genre: 'Hip Hop', hits: 'Not Like Us, HUMBLE., Alright, DNA., swimming pools' },
  { name: 'Drake', genre: 'Hip Hop / R&B', hits: 'God\'s Plan, One Dance, Hotline Bling, In My Feelings' },
  { name: 'Travis Scott', genre: 'Trap / Hip Hop', hits: 'SICKO MODE, FE!N, goosebumps, HIGHEST IN THE ROOM' },
  { name: 'Eminem', genre: 'Hip Hop Legend', hits: 'Lose Yourself, Without Me, The Real Slim Shady, Houdini, Love The Way You Lie' },
  { name: 'Kanye West', genre: 'Hip Hop', hits: 'Stronger, Heartless, Runaway, Gold Digger, CARNIVAL' },
  { name: 'Coldplay', genre: 'Alt Rock / Pop Rock', hits: 'Yellow, Fix You, Viva La Vida, A Sky Full of Stars, The Scientist' },
  { name: 'Maroon 5', genre: 'Pop Rock', hits: 'Sugar, Payphone, Moves Like Jagger, Memories, She Will Be Loved' },
  { name: 'Imagine Dragons', genre: 'Alt Rock / Pop', hits: 'Believer, Radioactive, Demons, Thunder, Bones' },
  { name: 'OneRepublic', genre: 'Pop Rock', hits: 'Counting Stars, Apologize, Secrets, I Ain\'t Worried' },
  { name: 'The Chainsmokers', genre: 'EDM / Dance-Pop', hits: 'Closer, Don\'t Let Me Down, Something Just Like This, Roses' },
  { name: 'Avicii', genre: 'EDM / Dance', hits: 'Wake Me Up, The Nights, Waiting For Love, Levels, Hey Brother' },
  { name: 'Marshmello', genre: 'EDM / Pop', hits: 'Happier, Alone, Silence, FRIENDS, Wolves' },
  { name: 'Calvin Harris', genre: 'Dance / EDM', hits: 'Summer, Feel So Close, This Is What You Came For, One Kiss' },
  { name: 'David Guetta', genre: 'EDM / Dance', hits: 'Titanium, Hey Mama, I\'m Good (Blue), Memories' },
  { name: 'Alan Walker', genre: 'EDM / Electro', hits: 'Faded, Alone, The Spectre, Darkside' },
  { name: 'Linkin Park', genre: 'Nu-Metal / Alt Rock', hits: 'In the End, Numb, Faint, The Emptiness Machine, What I\'ve Done' },
  { name: 'Green Day', genre: 'Punk Rock', hits: 'Boulevard of Broken Dreams, American Idiot, 21 Guns, Basket Case' },
  { name: 'Queen', genre: 'Classic Rock Legend', hits: 'Bohemian Rhapsody, Don\'t Stop Me Now, We Will Rock You, Another One Bites the Dust' },
  { name: 'The Beatles', genre: 'Rock Legend', hits: 'Hey Jude, Let It Be, Yesterday, Come Together' },
  { name: 'Michael Jackson', genre: 'King of Pop', hits: 'Billie Jean, Beat It, Thriller, Smooth Criminal, Man in the Mirror' },
  { name: 'Backstreet Boys', genre: '90s Boy Band', hits: 'I Want It That Way, Everybody (Backstreet\'s Back), As Long As You Love Me' },
  { name: 'Britney Spears', genre: 'Princess of Pop', hits: '...Baby One More Time, Toxic, Oops!... I Did It Again, Gimme More' },
  { name: 'Snoop Dogg', genre: 'West Coast Hip Hop', hits: 'Drop It Like It\'s Hot, Young Wild and Free, Gin and Juice' },
  { name: '50 Cent', genre: 'Hip Hop', hits: 'In Da Club, 21 Questions, Candy Shop' },
  { name: 'Pitbull', genre: 'Latin / Dance-Pop', hits: 'Give Me Everything, Timber, Fireball, Time of Our Lives' }
];

const missingThai = candidateThai.filter(c => !thaiSet.has(c.name.toLowerCase()));
const missingInter = candidateInter.filter(c => !interSet.has(c.name.toLowerCase()));

console.log('=== MISSING THAI ARTISTS (' + missingThai.length + ') ===');
missingThai.forEach(m => console.log(`- ${m.name}: [${m.genre}] Hits: ${m.hits}`));

console.log('\n=== MISSING INTER ARTISTS (' + missingInter.length + ') ===');
missingInter.forEach(m => console.log(`- ${m.name}: [${m.genre}] Hits: ${m.hits}`));
