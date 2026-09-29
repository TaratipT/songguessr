import React, { useEffect } from 'react';
import type { RoundResult } from '../types';
import { CheckCircle2, XCircle, ArrowRight, Music2 } from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { getThaiTitleTranslation } from '../data/thaiSongTitleAliases';

interface RoundResultModalProps {
  result: RoundResult;
  isLastRound: boolean;
  onNextRound: () => void;
}

export const RoundResultModal: React.FC<RoundResultModalProps> = ({
  result,
  isLastRound,
  onNextRound
}) => {
  const { song, guessedCorrectly, pointsEarned } = result;

  useEffect(() => {
    if (guessedCorrectly) {
      soundFX.playCorrect();
    } else {
      soundFX.playWrong();
    }
  }, [guessedCorrectly]);

  return (
    <div className="modal-overlay">
      <div className={`round-result-card ${guessedCorrectly ? 'is-correct' : 'is-wrong'}`}>
        {/* Status Header */}
        <div className="result-status-header">
          {guessedCorrectly ? (
            <div className="status-badge correct">
              <CheckCircle2 size={32} />
              <div>
                <h2>ถูกต้องนะคร้าบ! 🎉</h2>
                <p>+ {pointsEarned} คะแนน</p>
              </div>
            </div>
          ) : (
            <div className="status-badge wrong">
              <XCircle size={32} />
              <div>
                <h2>ยังไม่ถูกต้อง! 😢</h2>
                <p>+ 0 คะแนน</p>
              </div>
            </div>
          )}
        </div>

        {/* Revealed Song Details */}
        <div className="revealed-song-box">
          <img
            src={song.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400'}
            alt={song.title}
            className="album-cover-img"
          />
          <div className="song-info">
            <span className="info-label">เฉลยเพลงในรอบนี้:</span>
            <h3 className="revealed-title">{getThaiTitleTranslation(song.title, song.artist) || song.title}</h3>
            <p className="revealed-artist">
              <Music2 size={16} />
              {song.artist}
            </p>
            <p className="revealed-meta">
              อัลบั้ม: <strong>{song.album}</strong> • ปี {song.year} ({song.genre})
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onNextRound();
          }}
          className="next-round-btn"
          id="next-round-btn"
        >
          <span>{isLastRound ? 'ดูสรุปผลคะแนนรวม' : 'เล่นรอบถัดไป'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
