import React, { useState, useMemo } from 'react';
import { THAI_ARTISTS, type ThaiArtist } from '../data/thaiArtists';
import { Search, Check, X, Plus, Sparkles, Shuffle, RotateCcw } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

interface ThaiArtistPickerModalProps {
  initialSelected?: string[];
  presetGenre?: 'rock' | 'tpop' | 'y2k' | 'lukthung';
  onConfirm: (selectedArtists: string[]) => void;
  onClose: () => void;
}

export const ThaiArtistPickerModal: React.FC<ThaiArtistPickerModalProps> = ({
  initialSelected = [],
  presetGenre,
  onConfirm,
  onClose
}) => {
  const [selectedArtists, setSelectedArtists] = useState<string[]>(initialSelected);
  const [activeGenre, setActiveGenre] = useState<'all' | 'rock' | 'tpop' | 'y2k' | 'lukthung'>(
    presetGenre || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [customInput, setCustomInput] = useState('');

  // Filtered artists based on genre and search
  const filteredArtists = useMemo(() => {
    return THAI_ARTISTS.filter((artist) => {
      const matchesGenre = activeGenre === 'all' || artist.group === activeGenre;
      const matchesSearch =
        !searchQuery.trim() ||
        artist.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        artist.hitsHint.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesGenre && matchesSearch;
    });
  }, [activeGenre, searchQuery]);

  // Toggle an artist selection
  const handleToggleArtist = (artistName: string) => {
    soundFX.playClick();
    setSelectedArtists((prev) => {
      if (prev.includes(artistName)) {
        return prev.filter((a) => a !== artistName);
      } else {
        return [...prev, artistName];
      }
    });
  };

  // Select all in currently filtered view
  const handleSelectAllFiltered = () => {
    soundFX.playClick();
    const namesToAdd = filteredArtists.map((a) => a.name);
    setSelectedArtists((prev) => Array.from(new Set([...prev, ...namesToAdd])));
  };

  // Clear all selections
  const handleClearAll = () => {
    soundFX.playClick();
    setSelectedArtists([]);
  };

  // Pick random N artists from catalog
  const handleRandomPick = (count: number) => {
    soundFX.playClick();
    const source = activeGenre === 'all' ? THAI_ARTISTS : THAI_ARTISTS.filter((a) => a.group === activeGenre);
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    const pickedNames = shuffled.slice(0, count).map((a) => a.name);
    setSelectedArtists(pickedNames);
  };

  // Add custom artist by name
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    soundFX.playClick();
    if (!selectedArtists.some((a) => a.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedArtists((prev) => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const handleConfirm = () => {
    if (selectedArtists.length === 0) return;
    soundFX.playClick();
    onConfirm(selectedArtists);
  };

  return (
    <div className="modal-overlay">
      <div className="clean-modal-card artist-picker-modal">
        {/* Header */}
        <div className="picker-header">
          <div className="picker-title-group">
            <span className="picker-emoji">🇹🇭</span>
            <div>
              <h3>เลือกศิลปินไทยที่ต้องการทาย</h3>
              <p className="picker-subtitle">
                เลือกศิลปินที่คุณชื่นชอบได้หลายคนพร้อมกัน ระบบจะสุ่มเพลงจากศิลปินที่เลือกมาประลองความแม่น!
              </p>
            </div>
          </div>
          <button onClick={onClose} className="picker-close-btn" title="ปิด">
            <X size={20} />
          </button>
        </div>

        {/* Search & Custom Add Row */}
        <div className="picker-toolbar">
          <div className="picker-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อศิลปิน หรือเพลงฮิต (เช่น Bodyslam, Three Man Down)..."
              className="picker-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                <X size={14} />
              </button>
            )}
          </div>

          <form onSubmit={handleAddCustom} className="picker-custom-add-form">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="พิมพ์ชื่อศิลปินอื่น..."
              className="custom-artist-field"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="btn-add-custom"
              title="เพิ่มศิลปินนี้เข้ารายชื่อที่เลือก"
            >
              <Plus size={16} />
              <span>เพิ่ม</span>
            </button>
          </form>
        </div>

        {/* Genre Tabs */}
        <div className="picker-genre-tabs">
          <button
            type="button"
            onClick={() => setActiveGenre('all')}
            className={`genre-tab-btn ${activeGenre === 'all' ? 'active' : ''}`}
          >
            🇹🇭 ทั้งหมด ({THAI_ARTISTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveGenre('rock')}
            className={`genre-tab-btn ${activeGenre === 'rock' ? 'active' : ''}`}
          >
            🎸 ร็อก & สตริง
          </button>
          <button
            type="button"
            onClick={() => setActiveGenre('tpop')}
            className={`genre-tab-btn ${activeGenre === 'tpop' ? 'active' : ''}`}
          >
            ✨ T-POP & อินดี้
          </button>
          <button
            type="button"
            onClick={() => setActiveGenre('y2k')}
            className={`genre-tab-btn ${activeGenre === 'y2k' ? 'active' : ''}`}
          >
            📼 90s & Y2K
          </button>
          <button
            type="button"
            onClick={() => setActiveGenre('lukthung')}
            className={`genre-tab-btn ${activeGenre === 'lukthung' ? 'active' : ''}`}
          >
            🌾 ลูกทุ่ง & เพื่อชีวิต
          </button>
        </div>

        {/* Quick presets row */}
        <div className="picker-quick-presets">
          <button
            type="button"
            onClick={handleSelectAllFiltered}
            className="preset-btn"
            title="เลือกศิลปินทั้งหมดในหมวดนี้"
          >
            <Check size={14} />
            <span>เลือกทั้งหมดในหน้านี้ ({filteredArtists.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleRandomPick(3)}
            className="preset-btn"
            title="สุ่ม 3 ศิลปิน"
          >
            <Shuffle size={14} />
            <span>สุ่ม 3 คน</span>
          </button>

          <button
            type="button"
            onClick={() => handleRandomPick(5)}
            className="preset-btn"
            title="สุ่ม 5 ศิลปิน"
          >
            <Sparkles size={14} />
            <span>สุ่ม 5 คน</span>
          </button>

          {selectedArtists.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="preset-btn clear"
              title="ล้างรายชื่อที่เลือกทั้งหมด"
            >
              <RotateCcw size={14} />
              <span>ล้างทั้งหมด ({selectedArtists.length})</span>
            </button>
          )}
        </div>

        {/* Artists Selection Grid */}
        <div className="picker-artists-scroll-box">
          <div className="picker-artists-grid">
            {filteredArtists.map((artist: ThaiArtist) => {
              const isSelected = selectedArtists.includes(artist.name);

              return (
                <div
                  key={artist.id}
                  onClick={() => handleToggleArtist(artist.name)}
                  className={`artist-select-card ${isSelected ? 'is-selected' : ''}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="artist-card-top">
                    <span className="artist-emoji">{artist.emoji}</span>
                    <div className="artist-check-badge">
                      {isSelected ? <Check size={14} strokeWidth={3} /> : null}
                    </div>
                  </div>
                  <div className="artist-card-name">{artist.name}</div>
                  <div className="artist-card-hint" title={artist.hitsHint}>
                    {artist.hitsHint}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArtists.length === 0 && (
            <div className="picker-empty-state">
              <p>ไม่พบศิลปินที่ตรงกับ "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => {
                  if (searchQuery.trim()) {
                    setSelectedArtists((prev) => Array.from(new Set([...prev, searchQuery.trim()])));
                    setSearchQuery('');
                  }
                }}
                className="btn-add-search-artist"
              >
                + เพิ่ม "{searchQuery}" เป็นศิลปินที่ต้องการเล่น
              </button>
            </div>
          )}
        </div>

        {/* Selected Artists Bottom Tray & Confirm Action */}
        <div className="picker-bottom-bar">
          <div className="selected-summary-row">
            <div className="selected-count-label">
              <strong>เลือกแล้ว {selectedArtists.length} ศิลปิน:</strong>
              {selectedArtists.length === 0 && (
                <span className="no-selection-hint">(กรุณาคลิกเลือกอย่างน้อย 1 คน)</span>
              )}
            </div>
            {selectedArtists.length > 0 && (
              <div className="selected-chips-slider">
                {selectedArtists.map((name) => (
                  <span key={name} className="selected-artist-chip">
                    <span>{name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleArtist(name);
                      }}
                      className="chip-remove-btn"
                      title={`นำ ${name} ออก`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="picker-actions-row">
            <button type="button" onClick={onClose} className="picker-cancel-btn">
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={selectedArtists.length === 0}
              className="picker-confirm-btn"
            >
              <Check size={18} />
              <span>ยืนยันศิลปินที่เลือก ({selectedArtists.length} คน)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
