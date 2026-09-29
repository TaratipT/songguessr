import React, { useEffect, useState } from 'react';
import { Film, X, Clock } from 'lucide-react';
import type { Song } from '../types';

interface MVPreviewModalProps {
  song: Song;
  onClose: () => void;
}

export const MVPreviewModal: React.FC<MVPreviewModalProps> = ({ song, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="mv-preview-card">
        <div className="mv-preview-header">
          <div className="mv-title-group">
            <Film size={22} className="film-icon" />
            <h3>ตัวอย่างภาพปก / MV (เปิดดู 8 วินาที)</h3>
          </div>
          <button onClick={onClose} className="close-btn" title="ปิดก่อนเวลา">
            <X size={20} />
          </button>
        </div>

        {/* Countdown Bar */}
        <div className="countdown-timer-bar">
          <Clock size={16} className="clock-icon" />
          <span>เหลือเวลาเปิดดู: <strong>{secondsLeft}</strong> วินาที</span>
          <div className="timer-track">
            <div
              className="timer-fill"
              style={{ width: `${(secondsLeft / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Visual Teaser with blurred hints */}
        <div className="mv-artwork-stage">
          <img
            src={song.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600'}
            alt="MV Artwork Clue"
            className="mv-artwork-img"
          />
          <div className="mv-overlay-blur">
            <span className="mv-watermark">SONGGUESSR MV PREVIEW</span>
          </div>
        </div>

        <p className="mv-hint-footnote">
          💡 สังเกตโทนสี และสไตล์งานศิลป์ของอัลบั้มเพื่อช่วยนึกชื่อเพลง!
        </p>
      </div>
    </div>
  );
};
