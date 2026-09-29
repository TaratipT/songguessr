import React from 'react';
import { 
  Play, 
  Users, 
  LogIn, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Volume2,
  CheckCircle,
  Music2
} from 'lucide-react';
import './LandingPage.css';

interface LandingPageProps {
  onStartSolo: () => void;
  onStartDraft?: () => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartSolo,
  onCreateRoom,
  onJoinRoom
}) => {
  return (
    <div className="landing-page-wrapper">
      <div className="landing-card-container">
        {/* Top Header Bar */}
        <header className="landing-top-nav">
          <div className="landing-brand-group">
            <div className="landing-brand-pill">
              <span className="landing-brand-icon">🎧</span>
              <strong className="landing-brand-name">SongGuessr TH</strong>
            </div>
            <span className="landing-version-badge">v2.4 Duel</span>
          </div>

          <div className="landing-quick-meta">
            <span className="quick-pill"><Music2 size={13} /> 450+ ศิลปิน</span>
            <span className="quick-pill"><Zap size={13} /> Real-Time Sync</span>
            <span className="quick-pill free-tag">100% เล่นฟรี</span>
          </div>
        </header>

        {/* 2-Column Fixed Screen Layout (No Scroll) */}
        <div className="landing-main-grid">
          {/* LEFT / CENTER COLUMN: Primary Game Modes (Clean & Focused) */}
          <main className="landing-left-hub">
            <div className="landing-hero-copy">
              <div className="hero-badge-pill">
                <Sparkles size={13} />
                <span>เว็บเกมทายเพลงฮิตออนไลน์</span>
              </div>
              <h1 className="hero-clean-title">
                ทดสอบสกิลหูทองคำ <br />
                <span className="hero-highlight">ทายเพลงฮิต ชิงไหวชิงพริบดวล 1v1</span>
              </h1>
              <p className="hero-clean-desc">
                ฟังท่อนฮุกแล้วทายชื่อเพลงให้ไว! รวมเพลงไทยคลาสสิก 90s, Y2K, T-POP, ร็อกในตำนาน, K-POP, สากล และอนิเมะ
                เลือกเล่นคนเดียว หรือสร้างห้องประลองวัดความไวกับเพื่อนได้ทันที
              </p>
            </div>

            {/* 3 PRIMARY ACTION TILES (Solo Featured + 2 Online Rooms) */}
            <div className="landing-tiles-grid">
              {/* Tile 1: Solo (Featured Wide Card) */}
              <div className="landing-mode-card card-solo featured-solo" onClick={onStartSolo}>
                <div className="mode-card-header">
                  <span className="mode-icon-box solo-bg">
                    <Play size={20} />
                  </span>
                  <span className="mode-tag solo-tag">🎯 โหมดหลัก / ฝึกซ้อม</span>
                </div>
                <div className="mode-card-body">
                  <h3 className="mode-title">เล่นคนเดียว (Solo Practice)</h3>
                  <p className="mode-desc">
                    เลือกหมวดหมู่เพลงหรือเลือกศิลปินที่ชอบ ปรับเวลาและข้อตามใจ พร้อมนับคอมโบคะแนนสูงสุด หรือดวลกับ AI
                  </p>
                </div>
                <div className="mode-card-footer">
                  <span className="mode-btn-text">เริ่มเล่นคนเดียว</span>
                  <ArrowRight size={15} className="arrow-icon" />
                </div>
              </div>

              {/* Tile 2: Create Room */}
              <div className="landing-mode-card card-create" onClick={onCreateRoom}>
                <div className="mode-card-header">
                  <span className="mode-icon-box create-bg">
                    <Users size={20} />
                  </span>
                  <span className="mode-tag create-tag">👑 ปาร์ตี้ออนไลน์</span>
                </div>
                <div className="mode-card-body">
                  <h3 className="mode-title">สร้างห้องเล่นกับเพื่อน</h3>
                  <p className="mode-desc">
                    เปิดห้องส่วนตัว รับรหัส 4 หลัก หรือแชร์ลิงก์ให้เพื่อนเข้ามาแข่งสดพร้อมกัน
                  </p>
                </div>
                <div className="mode-card-footer">
                  <span className="mode-btn-text">สร้างห้องใหม่</span>
                  <ArrowRight size={15} className="arrow-icon" />
                </div>
              </div>

              {/* Tile 3: Join Room */}
              <div className="landing-mode-card card-join" onClick={onJoinRoom}>
                <div className="mode-card-header">
                  <span className="mode-icon-box join-bg">
                    <LogIn size={20} />
                  </span>
                  <span className="mode-tag join-tag">🚪 มีรหัสห้อง</span>
                </div>
                <div className="mode-card-body">
                  <h3 className="mode-title">เข้าร่วมห้อง (Join Room)</h3>
                  <p className="mode-desc">
                    มีรหัสห้อง 4 หลักจากเพื่อนแล้วใช่ไหม? ใส่รหัสแล้วโดดเข้าร่วมเล่นได้ทันที
                  </p>
                </div>
                <div className="mode-card-footer">
                  <span className="mode-btn-text">ใส่รหัสเข้าห้อง</span>
                  <ArrowRight size={15} className="arrow-icon" />
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR COLUMN: Compact Info & Tech Stack Panel */}
          <aside className="landing-right-sidebar">
            {/* Block 1: About Game */}
            <div className="sidebar-info-block">
              <div className="sidebar-block-title">
                <Volume2 size={15} className="block-icon" />
                <span>เกี่ยวกับ SongGuessr</span>
              </div>
              <p className="sidebar-summary-text">
                แพลตฟอร์มเกมทายเพลงของทุกคน รวบรวมศิลปินชั้นนำทั่วโลกกว่า <strong>450+ ศิลปิน</strong> เล่นสดในเบราว์เซอร์ได้ทันทีโดยไม่ต้องติดตั้งแอปพลิเคชัน
              </p>
              <div className="sidebar-stats-row">
                <div className="mini-stat">
                  <strong>450+</strong>
                  <span>ศิลปิน</span>
                </div>
                <div className="mini-stat">
                  <strong>21+</strong>
                  <span>หมวดหมู่</span>
                </div>
                <div className="mini-stat">
                  <strong>1v1</strong>
                  <span>SongDraft</span>
                </div>
              </div>
            </div>

            {/* Block 2: Tech Stack Showcase */}
            <div className="sidebar-info-block">
              <div className="sidebar-block-title">
                <span className="block-icon" style={{fontSize:'0.9rem'}}>💻</span>
                <span>เทคโนโลยีที่ใช้สร้าง (Tech Stack)</span>
              </div>
              <div className="sidebar-tech-list">
                <div className="tech-item-row">
                  <span className="tech-dot react-dot">⚛️</span>
                  <div className="tech-meta">
                    <strong>React 18 & TypeScript</strong>
                    <span>Virtual DOM, Type-Safe Architecture</span>
                  </div>
                </div>
                <div className="tech-item-row">
                  <span className="tech-dot vite-dot">⚡</span>
                  <div className="tech-meta">
                    <strong>Vite 5 Build Engine</strong>
                    <span>Lightning HMR & Optimized Bundles</span>
                  </div>
                </div>
                <div className="tech-item-row">
                  <span className="tech-dot mqtt-dot">🌐</span>
                  <div className="tech-meta">
                    <strong>EMQX Cloud MQTT WebSockets</strong>
                    <span>Real-Time Mesh Multiplayer Pub/Sub</span>
                  </div>
                </div>
                <div className="tech-item-row">
                  <span className="tech-dot audio-dot">🔊</span>
                  <div className="tech-meta">
                    <strong>Web Audio API & SoundFX</strong>
                    <span>Hook Trimming & Spatial Audio Synthesis</span>
                  </div>
                </div>
                <div className="tech-item-row">
                  <span className="tech-dot cf-dot">☁️</span>
                  <div className="tech-meta">
                    <strong>Cloudflare Pages Edge</strong>
                    <span>Global Anycast CDN & 99.99% Uptime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: How To Play (Quick 3 Steps) */}
            <div className="sidebar-info-block steps-compact">
              <div className="sidebar-block-title">
                <CheckCircle size={15} className="block-icon" />
                <span>วิธีเล่นง่ายๆ</span>
              </div>
              <div className="mini-steps-list">
                <div className="mini-step">
                  <span className="step-num">1</span>
                  <span>ฟังเพลงท่อนฮุก 20-30 วินาที</span>
                </div>
                <div className="mini-step">
                  <span className="step-num">2</span>
                  <span>เลือกช้อยส์หรือพิมพ์ตอบให้ไวที่สุด</span>
                </div>
                <div className="mini-step">
                  <span className="step-num">3</span>
                  <span>ลุ้นเฉลยพร้อมเพื่อน & ครองอันดับหนึ่ง</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
