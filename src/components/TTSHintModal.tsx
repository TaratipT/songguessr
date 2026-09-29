import React, { useState, useEffect } from 'react';
import { Mic, Volume2, VolumeX, X, Sparkles } from 'lucide-react';
import type { Song } from '../types';
import { soundFX } from '../services/soundEffects';

interface TTSHintModalProps {
  song: Song;
  onClose: () => void;
}

export const TTSHintModal: React.FC<TTSHintModalProps> = ({ song, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    soundFX.playClick();
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('เบราว์เซอร์ของคุณไม่รองรับ Text-to-Speech');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `คำใบ้เพลงนี้: เป็นเพลงของ ${song.artist} ปล่อยเมื่อปี ${song.year} อยู่ในอัลบั้ม ${song.album}. ${song.lyricsHint || ''}`;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'th-TH';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleClose = () => {
    soundFX.playClick();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="tts-modal-card">
        <div className="tts-header">
          <div className="tts-title-wrap">
            <Mic size={22} className="mic-icon" />
            <h3>ฟังเสียงอ่านคำใบ้ (TTS)</h3>
          </div>
          <button onClick={handleClose} className="close-btn" title="ปิด">
            <X size={20} />
          </button>
        </div>

        <p className="tts-description">
          สำหรับผู้เล่นที่ต้องการฟังเบาะแสเพิ่มเติม ระบบสังเคราะห์เสียงจะช่วยอ่านข้อมูลศิลปินและเบาะแสให้ฟัง!
        </p>

        <div className="tts-clue-box">
          <Sparkles size={16} className="sparkle" />
          <p className="clue-preview">
            "เป็นเพลงฮิตยอดนิยมของศิลปิน {song.artist} แนวเพลง {song.genre} ปล่อยปี {song.year}..."
          </p>
        </div>

        <div className="tts-actions">
          <button
            onClick={handleSpeak}
            className={`tts-speak-btn ${isSpeaking ? 'is-speaking' : ''}`}
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <span>{isSpeaking ? 'กดเพื่อหยุดเสียงพูด' : 'กดเพื่อให้ระบบอ่านคำใบ้'}</span>
          </button>
          <button onClick={handleClose} className="tts-cancel-btn">
            เข้าใจแล้ว ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
