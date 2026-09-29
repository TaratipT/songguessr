import React, { useState, useMemo, useCallback, useDeferredValue } from 'react';
import {
  GLOBAL_ARTISTS,
  ARTIST_PRESETS,
  ARTIST_ALIASES,
  type GlobalArtist,
  type ArtistRegion,
  type ArtistPreset
} from '../data/artistsData';
import {
  Search,
  X,
  Check,
  Sparkles,
  Plus,
  Star,
  RotateCcw,
  Dice5,
  CheckCircle2
} from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { storageService } from '../services/storageService';

const RANDOM_CATEGORY_OPTIONS: { id: ArtistRegion; label: string; shortLabel: string; emoji: string }[] = [
  { id: 'thai', label: 'เพลงไทย', shortLabel: 'ไทย', emoji: '🎵' },
  { id: 'inter', label: 'สากล', shortLabel: 'สากล', emoji: '🌎' },
  { id: 'kpop', label: 'K-POP', shortLabel: 'K-POP', emoji: '✨' },
  { id: 'anime_jpop', label: 'Anime / J-POP', shortLabel: 'Anime', emoji: '🎌' },
];

const PRESET_CATEGORIES: { id: ArtistRegion | 'all'; label: string; emoji: string }[] = [
  { id: 'all', label: 'ทั้งหมด', emoji: '🌟' },
  { id: 'thai', label: 'เพลงไทย', emoji: '🇹🇭' },
  { id: 'inter', label: 'เพลงสากล', emoji: '🌎' },
  { id: 'kpop', label: 'K-POP', emoji: '✨' },
  { id: 'anime_jpop', label: 'Anime & J-POP', emoji: '🎌' },
];


export interface ArtistSelectionMeta {
  sourceType: 'preset' | 'random' | 'custom';
  presetTitle?: string;
  presetSubtitle?: string;
  randomSummary?: string;
  artists: string[];
}

interface GlobalArtistPickerModalProps {
  initialSelected?: string[];
  presetRegion?: ArtistRegion;
  onConfirm: (selectedArtists: string[], meta?: ArtistSelectionMeta) => void;
  onClose: () => void;
}

export const GlobalArtistPickerModal: React.FC<GlobalArtistPickerModalProps> = ({
  initialSelected = [],
  presetRegion,
  onConfirm,
  onClose
}) => {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [activeTab, setActiveTab] = useState<ArtistRegion | 'all'>(presetRegion || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [customInput, setCustomInput] = useState<string>('');
  const [selectedOnlyFilter, setSelectedOnlyFilter] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [presetCategoryFilter, setPresetCategoryFilter] = useState<ArtistRegion | 'all'>('all');

  // Right Tools Sidebar: show/hide & active tab ('random' | 'presets')
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [sidebarTab, setSidebarTab] = useState<'random' | 'presets'>('random');
  const [selectedRandomRegions, setSelectedRandomRegions] = useState<ArtistRegion[]>(() => {
    return storageService.getRandomRegions(['thai', 'inter', 'kpop', 'anime_jpop']);
  });
  const [randomCount, setRandomCount] = useState<number>(() => {
    return storageService.getRandomCount(5);
  });
  const [randomToast, setRandomToast] = useState<string | null>(null);
  const [showSelectedTray, setShowSelectedTray] = useState<boolean>(false);
  const [wasRandomized, setWasRandomized] = useState<boolean>(false);
  const [resultsViewMode, setResultsViewMode] = useState<'list' | 'chips'>('list');

  // Fast lookup map for artist details (emoji, region, genre)
  const artistMap = useMemo(() => {
    const map = new Map<string, GlobalArtist>();
    for (const a of GLOBAL_ARTISTS) {
      map.set(a.name.toLowerCase().trim(), a);
    }
    return map;
  }, []);

  // Normalized set for reliable, case-insensitive, trimmed matching
  const selectedNormalizedSet = useMemo(() => {
    return new Set(selected.map((s) => s.trim().toLowerCase()));
  }, [selected]);

  // Count presets by region
  const presetCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: ARTIST_PRESETS.length,
      thai: 0,
      inter: 0,
      kpop: 0,
      anime_jpop: 0
    };
    for (const p of ARTIST_PRESETS) {
      if (p.region !== 'all' && counts[p.region] !== undefined) {
        counts[p.region]++;
      }
    }
    return counts;
  }, []);

  const PRESET_GROUPS = useMemo(() => [
    { region: 'thai' as const, title: '🇹🇭 หมวดเพลงไทย', count: presetCounts.thai },
    { region: 'inter' as const, title: '🌎 หมวดเพลงสากล', count: presetCounts.inter },
    { region: 'kpop' as const, title: '✨ หมวด K-POP', count: presetCounts.kpop },
    { region: 'anime_jpop' as const, title: '🎌 หมวด Anime & J-POP', count: presetCounts.anime_jpop },
    { region: 'all' as const, title: '🌐 รวมมิตรศิลปินระดับโลก', count: 1 },
  ], [presetCounts]);

  // Filtered artists based on tab, search, and selectedOnly filter
  const filteredArtists = useMemo(() => {
    const q = deferredSearchQuery.toLowerCase().trim();
    return GLOBAL_ARTISTS.filter((artist) => {
      // If "View selected only" mode is active
      if (selectedOnlyFilter) {
        return selectedNormalizedSet.has(artist.name.trim().toLowerCase());
      }
      // Tab check
      if (activeTab !== 'all' && artist.region !== activeTab) {
        return false;
      }
      // Search check
      if (q) {
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesHits = artist.hitsHint.toLowerCase().includes(q);
        const matchesGenre = artist.genreLabel?.toLowerCase().includes(q);

        const directAliases = ARTIST_ALIASES[artist.name.toLowerCase()] || [];
        const matchesDirectAlias = directAliases.some((a) => a.toLowerCase().includes(q));

        const matchesReverseAlias = Object.entries(ARTIST_ALIASES).some(
          ([aliasKey, targets]) =>
            aliasKey.toLowerCase().includes(q) &&
            targets.some((t) => t.toLowerCase() === artist.name.toLowerCase())
        );

        return matchesName || matchesHits || matchesGenre || matchesDirectAlias || matchesReverseAlias;
      }
      return true;
    });
  }, [activeTab, deferredSearchQuery, selectedOnlyFilter, selectedNormalizedSet]);

  const toggleArtist = useCallback((artistName: string) => {
    soundFX.playClick();
    const clean = artistName.trim();
    setSelected((prev) => {
      const lower = clean.toLowerCase();
      const exists = prev.some((item) => item.trim().toLowerCase() === lower);
      if (exists) {
        return prev.filter((item) => item.trim().toLowerCase() !== lower);
      } else {
        return [...prev, clean];
      }
    });
  }, []);

  const handleSelectAllInView = () => {
    soundFX.playClick();
    const namesInView = filteredArtists.map((a) => a.name);
    const newSet = new Set([...selected, ...namesInView]);
    setSelected(Array.from(newSet));
  };

  const handleClearAll = () => {
    soundFX.playClick();
    setSelected([]);
    setSelectedOnlyFilter(false);
    setActivePresetId(null);
    setWasRandomized(false);
  };

  // When a preset card is clicked: switch to the preset's region & select its artists
  const handleApplyPreset = (pr: ArtistPreset) => {
    soundFX.playClick();
    setActivePresetId(pr.id);
    setSelectedOnlyFilter(false);
    setWasRandomized(false);
    if (pr.region && pr.region !== 'all') {
      setActiveTab(pr.region);
    }
    setSelected(pr.artists);
    setRandomToast(`⚡ เลือกชุด "${pr.title}" (${pr.artists.length} คน) เรียบร้อย!`);
    setTimeout(() => {
      setRandomToast(null);
    }, 2800);
  };

  const getRegionLabel = (reg: ArtistRegion | 'all'): string => {
    switch (reg) {
      case 'thai':
        return 'เพลงไทย';
      case 'inter':
        return 'สากล';
      case 'kpop':
        return 'K-POP';
      case 'anime_jpop':
        return 'Anime/J-POP';
      default:
        return 'ผสมทุกแนว';
    }
  };

  const getRandomRegionsSummary = (regions: ArtistRegion[]): string => {
    if (regions.length === 4) return 'ผสมทุกแนว';
    if (regions.length === 0) return 'ไม่ได้เลือกหมวด';
    if (regions.length === 1) return getRegionLabel(regions[0]);
    const labelMap: Record<ArtistRegion, string> = {
      thai: 'ไทย',
      inter: 'สากล',
      kpop: 'K-POP',
      anime_jpop: 'Anime'
    };
    return regions.map((r) => labelMap[r] || r).join(' + ');
  };

  const updateRandomCount = (cnt: number) => {
    const clamped = Math.max(1, Math.min(25, cnt));
    setRandomCount(clamped);
    storageService.setRandomCount(clamped);
  };

  const toggleRandomRegion = (reg: ArtistRegion) => {
    soundFX.playClick();
    setSelectedRandomRegions((prev) => {
      let updated: ArtistRegion[];
      if (prev.includes(reg)) {
        if (prev.length <= 1) {
          setRandomToast('⚠️ ต้องเลือกอย่างน้อย 1 หมวดเพลง');
          setTimeout(() => setRandomToast(null), 2500);
          return prev;
        }
        updated = prev.filter((r) => r !== reg);
      } else {
        updated = [...prev, reg];
      }
      storageService.setRandomRegions(updated);
      return updated;
    });
  };

  const handleSelectAllRandomRegions = () => {
    soundFX.playClick();
    const all: ArtistRegion[] = ['thai', 'inter', 'kpop', 'anime_jpop'];
    setSelectedRandomRegions(all);
    storageService.setRandomRegions(all);
  };

  // Smart Randomizer Execute Handler (Multi-Category Filtering)
  const handleExecuteSmartRandom = () => {
    soundFX.playClick();
    setSelectedOnlyFilter(false);
    setActivePresetId(null);

    const activeRegions = selectedRandomRegions.length > 0
      ? selectedRandomRegions
      : (['thai', 'inter', 'kpop', 'anime_jpop'] as ArtistRegion[]);

    const pool = GLOBAL_ARTISTS.filter((a) => activeRegions.includes(a.region));

    if (pool.length === 0) return;

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const countToPick = Math.min(randomCount, pool.length);
    const picked = shuffled.slice(0, countToPick).map((a) => a.name);
    setSelected(picked);
    setWasRandomized(true);

    if (activeRegions.length === 1) {
      setActiveTab(activeRegions[0]);
    } else {
      setActiveTab('all');
    }

    const summary = getRandomRegionsSummary(activeRegions);
    setRandomToast(`🎲 สุ่มสำเร็จ! สุ่ม ${picked.length} ศิลปิน (${summary}) เรียบร้อย`);
    setTimeout(() => {
      setRandomToast(null);
    }, 3200);
  };

  const handleAddCustomArtist = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    soundFX.playClick();
    if (!selectedNormalizedSet.has(trimmed.toLowerCase())) {
      setSelected((prev) => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const handleConfirm = () => {
    soundFX.playClick();
    let meta: ArtistSelectionMeta;
    if (activePresetId && !wasRandomized) {
      const preset = ARTIST_PRESETS.find((p) => p.id === activePresetId);
      meta = {
        sourceType: 'preset',
        presetTitle: preset?.title,
        presetSubtitle: preset?.subtitle,
        artists: selected
      };
    } else if (wasRandomized) {
      meta = {
        sourceType: 'random',
        randomSummary: getRandomRegionsSummary(selectedRandomRegions),
        artists: selected
      };
    } else {
      meta = {
        sourceType: 'custom',
        artists: selected
      };
    }
    onConfirm(selected, meta);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="clean-modal-card global-artist-picker-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Top Modal Header */}
        <div className="picker-modal-header">
          <div className="picker-title-group">
            <h2 className="picker-title">เลือกศิลปินที่ต้องการทาย</h2>
            <span className="picker-subtitle">
              ผสมผสานศิลปินข้ามสัญชาติได้อิสระ
            </span>
          </div>

          <div className="picker-header-actions">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setShowSidebar(!showSidebar);
              }}
              className={`picker-sidebar-toggle-btn ${showSidebar ? 'active' : ''}`}
              title={showSidebar ? 'ซ่อนแผงเครื่องมือด้านขวา' : 'เปิดแผงเครื่องมือด้านขวา'}
            >
              <Sparkles size={14} />
              <span>{showSidebar ? 'ซ่อนเครื่องมือด่วน' : 'เครื่องมือสุ่ม/ชุดด่วน'}</span>
              <span className="sidebar-toggle-badge">{ARTIST_PRESETS.length}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="picker-close-btn"
              title="ปิดหน้าต่าง"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Floating Random Feedback Toast */}
        {randomToast && (
          <div className="picker-random-toast">
            <CheckCircle2 size={15} />
            <span>{randomToast}</span>
          </div>
        )}

        {/* Modal 2-Column Main Body */}
        <div className="picker-modal-body">
          {/* Left Column: Artists Browsing & Search */}
          <div className="picker-main-column">
            {/* Search & Custom Add Bar */}
            <div className="picker-search-bar-row">
              <div className="picker-search-field">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (selectedOnlyFilter) setSelectedOnlyFilter(false);
                  }}
                  placeholder="ค้นหาชื่อศิลปิน เช่น โจอี้, NewJeans, Taylor, Bodyslam..."
                  className="picker-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="clear-search-btn"
                    title="ล้างคำค้นหา"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <form onSubmit={handleAddCustomArtist} className="custom-add-artist-form">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="เพิ่มชื่อศิลปินเอง..."
                  className="custom-artist-writein"
                />
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="btn-add-custom-artist"
                >
                  <Plus size={14} />
                  <span>เพิ่ม</span>
                </button>
              </form>
            </div>

            {/* Region Filter Tabs */}
            <div className="picker-tabs-row">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('all');
                  setSelectedOnlyFilter(false);
                  setActivePresetId(null);
                }}
                className={`picker-tab-btn ${activeTab === 'all' && !selectedOnlyFilter ? 'active' : ''}`}
              >
                <span>🔥 ทั้งหมด</span>
                <span className="tab-count-badge">{GLOBAL_ARTISTS.length}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('thai');
                  setSelectedOnlyFilter(false);
                  setActivePresetId(null);
                }}
                className={`picker-tab-btn ${activeTab === 'thai' && !selectedOnlyFilter ? 'active' : ''}`}
              >
                <span>🎸 เพลงไทย</span>
                <span className="tab-count-badge">
                  {GLOBAL_ARTISTS.filter((a) => a.region === 'thai').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('inter');
                  setSelectedOnlyFilter(false);
                  setActivePresetId(null);
                }}
                className={`picker-tab-btn ${activeTab === 'inter' && !selectedOnlyFilter ? 'active' : ''}`}
              >
                <span>🌐 สากล</span>
                <span className="tab-count-badge">
                  {GLOBAL_ARTISTS.filter((a) => a.region === 'inter').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('kpop');
                  setSelectedOnlyFilter(false);
                  setActivePresetId(null);
                }}
                className={`picker-tab-btn ${activeTab === 'kpop' && !selectedOnlyFilter ? 'active' : ''}`}
              >
                <span>🎈 K-POP</span>
                <span className="tab-count-badge">
                  {GLOBAL_ARTISTS.filter((a) => a.region === 'kpop').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('anime_jpop');
                  setSelectedOnlyFilter(false);
                  setActivePresetId(null);
                }}
                className={`picker-tab-btn ${activeTab === 'anime_jpop' && !selectedOnlyFilter ? 'active' : ''}`}
              >
                <span>🌸 Anime/J-POP</span>
                <span className="tab-count-badge">
                  {GLOBAL_ARTISTS.filter((a) => a.region === 'anime_jpop').length}
                </span>
              </button>

              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedOnlyFilter(!selectedOnlyFilter);
                  }}
                  className={`picker-tab-btn view-selected-tab ${selectedOnlyFilter ? 'active' : ''}`}
                >
                  <Star size={13} fill={selectedOnlyFilter ? 'currentColor' : 'none'} />
                  <span>ที่เลือกไว้ ({selected.length})</span>
                </button>
              )}
            </div>

            {/* Actions & Result Count Strip */}
            <div className="picker-actions-strip">
              <span className="showing-results-text">
                {selectedOnlyFilter ? (
                  <>⭐ แสดงเฉพาะที่เลือก (<strong>{filteredArtists.length}</strong> คน)</>
                ) : (
                  <>แสดง <strong>{filteredArtists.length}</strong> ศิลปิน {activeTab !== 'all' && `(${getRegionLabel(activeTab)})`}</>
                )}
              </span>
              <div className="quick-select-buttons">
                <button
                  type="button"
                  onClick={handleSelectAllInView}
                  className="btn-select-all-view"
                >
                  เลือกทั้งหมดในหน้านี้
                </button>
                {selected.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="btn-clear-selection"
                  >
                    <RotateCcw size={12} />
                    <span>ล้างที่เลือก ({selected.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Artists Card Grid */}
            <div className="picker-artists-scroll-area">
              <div className="artists-multiselect-grid">
                {filteredArtists.map((artist: GlobalArtist) => {
                  const isChecked = selectedNormalizedSet.has(artist.name.trim().toLowerCase());
                  return (
                    <ArtistCardItem
                      key={artist.id}
                      artist={artist}
                      isChecked={isChecked}
                      onToggle={toggleArtist}
                    />
                  );
                })}
              </div>

              {filteredArtists.length === 0 && (
                <div className="picker-empty-state">
                  <p>🔍 ไม่พบศิลปินที่ค้นหา "{searchQuery}"</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        toggleArtist(searchQuery.trim());
                        setSearchQuery('');
                      }
                    }}
                    className="btn-primary-accent"
                  >
                    + เพิ่ม "{searchQuery}" เป็นศิลปินที่ต้องการทาย
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dedicated Smart Tools Sidebar */}
          {showSidebar && (
            <aside className="picker-right-sidebar">
              {/* Segmented Tab Switcher */}
              <div className="sidebar-tabs-bar">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSidebarTab('random');
                  }}
                  className={`sidebar-tab-btn ${sidebarTab === 'random' ? 'active' : ''}`}
                >
                  <Dice5 size={14} />
                  <span>สุ่มอัตโนมัติ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSidebarTab('presets');
                  }}
                  className={`sidebar-tab-btn ${sidebarTab === 'presets' ? 'active' : ''}`}
                >
                  <Sparkles size={14} />
                  <span>จัดชุดด่วน</span>
                  <span className="sidebar-tab-badge">{ARTIST_PRESETS.length}</span>
                </button>
              </div>

              {/* Sidebar Content Body */}
              <div className="sidebar-tab-content">
                {sidebarTab === 'random' ? (
                  <div className="sidebar-random-panel">
                    {/* Category Multi-select */}
                    <div className="sidebar-random-cats-box">
                      <div className="sidebar-box-label-row">
                        <span className="sidebar-box-label">หมวดหมู่ที่จะสุ่ม:</span>
                        <button
                          type="button"
                          onClick={handleSelectAllRandomRegions}
                          className="btn-text-toggle"
                          title="เลือกหรือยกเลิกทุกหมวด"
                        >
                          {selectedRandomRegions.length === 4 ? 'ล้างหมวด' : 'เลือกทั้งหมด'}
                        </button>
                      </div>

                      {/* 2x2 Category Cards Grid */}
                      <div className="sidebar-cat-grid">
                        {RANDOM_CATEGORY_OPTIONS.map((cat) => {
                          const isChecked = selectedRandomRegions.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => toggleRandomRegion(cat.id)}
                              className={`sidebar-cat-card ${isChecked ? 'is-checked' : 'is-unchecked'}`}
                            >
                              <span className={`pill-check-box ${isChecked ? 'checked' : 'unchecked'}`}>
                                {isChecked && <Check size={10} strokeWidth={3.5} />}
                              </span>
                              <span className="sidebar-cat-emoji">{cat.emoji}</span>
                              <span className="sidebar-cat-label">{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Count Stepper & Range Slider */}
                    <div className="sidebar-count-box">
                      <div className="sidebar-box-label-row">
                        <span className="sidebar-box-label">จำนวนศิลปิน:</span>
                        <div className="sidebar-stepper-inline">
                          <button
                            type="button"
                            onClick={() => {
                              soundFX.playClick();
                              updateRandomCount(randomCount - 1);
                            }}
                            className="sidebar-stepper-btn"
                            title="ลด 1 คน"
                          >
                            -
                          </button>
                          <span className="sidebar-count-highlight">{randomCount} คน</span>
                          <button
                            type="button"
                            onClick={() => {
                              soundFX.playClick();
                              updateRandomCount(randomCount + 1);
                            }}
                            className="sidebar-stepper-btn"
                            title="เพิ่ม 1 คน"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Quick Count Chips */}
                      <div className="sidebar-quick-counts">
                        {[3, 5, 10, 15, 20].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              soundFX.playClick();
                              updateRandomCount(num);
                            }}
                            className={`sidebar-quick-btn ${randomCount === num ? 'active' : ''}`}
                          >
                            {num} คน
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Big Action Button */}
                    <button
                      type="button"
                      onClick={handleExecuteSmartRandom}
                      className="sidebar-btn-roll"
                    >
                      <Dice5 size={18} className="dice-spin" />
                      <span>กดสุ่ม {randomCount} คนทันที</span>
                    </button>

                    {/* Results of Randomization / Current Selection in Lower-Right Space */}
                    <div className="sidebar-results-box">
                      <div className="sidebar-results-header">
                        <div className="results-title-group">
                          <span className="results-box-title">
                            {wasRandomized ? '🎲 รายชื่อที่สุ่มได้' : '🎯 ศิลปินที่เลือกไว้'}
                          </span>
                          <span className="results-count-pill">{selected.length} คน</span>
                        </div>

                        <div className="results-actions-group">
                          {selected.length > 0 && (
                            <div className="results-view-mode-toggle">
                              <button
                                type="button"
                                onClick={() => setResultsViewMode('list')}
                                className={`btn-mode-toggle ${resultsViewMode === 'list' ? 'active' : ''}`}
                                title="แสดงแบบแถวรายการ"
                              >
                                รายการ
                              </button>
                              <button
                                type="button"
                                onClick={() => setResultsViewMode('chips')}
                                className={`btn-mode-toggle ${resultsViewMode === 'chips' ? 'active' : ''}`}
                                title="แสดงแบบชิปกระชับ"
                              >
                                ชิป
                              </button>
                            </div>
                          )}

                          {selected.length > 0 && (
                            <button
                              type="button"
                              onClick={handleClearAll}
                              className="btn-clear-results"
                              title="ล้างทั้งหมด"
                            >
                              <RotateCcw size={11} />
                              <span>ล้าง</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {selected.length > 0 ? (
                        resultsViewMode === 'chips' ? (
                          <div className="sidebar-results-chips">
                            {selected.map((name) => {
                              const artistInfo = artistMap.get(name.toLowerCase().trim());
                              return (
                                <div key={name} className="sidebar-result-chip">
                                  <span className="chip-emoji">{artistInfo?.emoji || '🎤'}</span>
                                  <span className="chip-name">{name}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleArtist(name);
                                    }}
                                    className="chip-remove"
                                    title={`ลบ ${name}`}
                                  >
                                    <X size={11} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="sidebar-results-list">
                            {selected.map((name) => {
                              const artistInfo = artistMap.get(name.toLowerCase().trim());
                              return (
                                <div key={name} className="sidebar-result-item">
                                  <div className="result-artist-left">
                                    <span className="result-artist-emoji">{artistInfo?.emoji || '🎤'}</span>
                                    <span className="result-artist-name">{name}</span>
                                  </div>
                                  <div className="result-artist-right">
                                    {artistInfo && (
                                      <span className="result-artist-tag">
                                        {artistInfo.region === 'thai'
                                          ? 'ไทย'
                                          : artistInfo.region === 'inter'
                                          ? 'สากล'
                                          : artistInfo.region === 'kpop'
                                          ? 'K-POP'
                                          : 'Anime'}
                                      </span>
                                    )}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleArtist(name);
                                      }}
                                      className="btn-remove-result"
                                      title={`ลบ ${name}`}
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )
                      ) : (
                        <div className="sidebar-results-empty">
                          <Dice5 size={22} className="empty-results-icon" />
                          <p className="empty-results-text">กดปุ่มสุ่มด้านบนเพื่อสุ่มศิลปิน</p>
                          <span className="empty-results-sub">รายชื่อที่สุ่มได้จะแสดงตรงนี้ทันที</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="sidebar-presets-panel">
                    <div className="sidebar-section-header">
                      <div className="presets-header-title-row">
                        <h4 className="sidebar-section-title">⚡ คอลเลกชันจัดชุดด่วน</h4>
                        <span className="presets-total-pill">{ARTIST_PRESETS.length} ชุด</span>
                      </div>
                      <p className="sidebar-section-desc">คลิกเพื่อเลือกชุดศิลปินยอดนิยม แบ่งตามหมวดหมู่ชัดเจน</p>
                    </div>

                    {/* Subcategory Filter Chips */}
                    <div className="preset-category-filter-row">
                      {PRESET_CATEGORIES.map((cat) => {
                        const isCatActive = presetCategoryFilter === cat.id;
                        const count = cat.id === 'all' ? ARTIST_PRESETS.length : presetCounts[cat.id] || 0;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              soundFX.playClick();
                              setPresetCategoryFilter(cat.id);
                            }}
                            className={`preset-filter-chip ${isCatActive ? 'active' : ''}`}
                          >
                            <span className="chip-emoji">{cat.emoji}</span>
                            <span className="chip-label">{cat.label}</span>
                            <span className="chip-count">{count}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="sidebar-presets-list">
                      {presetCategoryFilter === 'all' ? (
                        PRESET_GROUPS.map((group) => {
                          const groupPresets = ARTIST_PRESETS.filter((p) => p.region === group.region);
                          if (groupPresets.length === 0) return null;
                          return (
                            <div key={group.region} className="preset-group-section">
                              <div className="preset-group-header">
                                <span className="preset-group-title">{group.title}</span>
                                <span className="preset-group-count">{groupPresets.length} ชุด</span>
                              </div>
                              <div className="preset-group-cards">
                                {groupPresets.map((pr) => {
                                  const selectedCountInPreset = pr.artists.filter((a) =>
                                    selectedNormalizedSet.has(a.toLowerCase().trim())
                                  ).length;
                                  const isFullySelected = selectedCountInPreset === pr.artists.length && pr.artists.length > 0;
                                  const isPresetActive = activePresetId === pr.id || isFullySelected;

                                  return (
                                    <button
                                      key={pr.id}
                                      type="button"
                                      onClick={() => handleApplyPreset(pr)}
                                      className={`sidebar-preset-card ${isPresetActive ? 'active' : ''}`}
                                      title={pr.subtitle}
                                    >
                                      <div className="preset-card-top-row">
                                        <span className="preset-card-title">{pr.title}</span>
                                        <div className="preset-card-badges-group">
                                          <span className={`preset-region-badge reg-${pr.region}`}>
                                            {pr.region === 'thai'
                                              ? '🇹🇭 ไทย'
                                              : pr.region === 'inter'
                                              ? '🌎 สากล'
                                              : pr.region === 'kpop'
                                              ? '✨ K-POP'
                                              : pr.region === 'anime_jpop'
                                              ? '🎌 Anime'
                                              : '🌐 ผสม'}
                                          </span>
                                          <span className="preset-card-badge">{pr.artists.length} คน</span>
                                        </div>
                                      </div>
                                      <p className="preset-card-preview">{pr.subtitle}</p>
                                      <div className="preset-card-status-row">
                                        {isFullySelected ? (
                                          <div className="preset-card-active-tag full">
                                            <CheckCircle2 size={12} strokeWidth={2.5} />
                                            <span>เลือกครบชุดแล้ว ({pr.artists.length}/{pr.artists.length})</span>
                                          </div>
                                        ) : selectedCountInPreset > 0 ? (
                                          <div className="preset-card-active-tag partial">
                                            <span>เลือกอยู่ {selectedCountInPreset}/{pr.artists.length} คน</span>
                                          </div>
                                        ) : (
                                          <span className="preset-card-click-hint">คลิกเพื่อเลือกชุดนี้</span>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="preset-group-section single">
                          <div className="preset-group-cards">
                            {ARTIST_PRESETS.filter((p) => p.region === presetCategoryFilter).map((pr) => {
                              const selectedCountInPreset = pr.artists.filter((a) =>
                                selectedNormalizedSet.has(a.toLowerCase().trim())
                              ).length;
                              const isFullySelected = selectedCountInPreset === pr.artists.length && pr.artists.length > 0;
                              const isPresetActive = activePresetId === pr.id || isFullySelected;

                              return (
                                <button
                                  key={pr.id}
                                  type="button"
                                  onClick={() => handleApplyPreset(pr)}
                                  className={`sidebar-preset-card ${isPresetActive ? 'active' : ''}`}
                                  title={pr.subtitle}
                                >
                                  <div className="preset-card-top-row">
                                    <span className="preset-card-title">{pr.title}</span>
                                    <div className="preset-card-badges-group">
                                      <span className={`preset-region-badge reg-${pr.region}`}>
                                        {pr.region === 'thai'
                                          ? '🇹🇭 ไทย'
                                          : pr.region === 'inter'
                                          ? '🌎 สากล'
                                          : pr.region === 'kpop'
                                          ? '✨ K-POP'
                                          : pr.region === 'anime_jpop'
                                          ? '🎌 Anime'
                                          : '🌐 ผสม'}
                                      </span>
                                      <span className="preset-card-badge">{pr.artists.length} คน</span>
                                    </div>
                                  </div>
                                  <p className="preset-card-preview">{pr.subtitle}</p>
                                  <div className="preset-card-status-row">
                                    {isFullySelected ? (
                                      <div className="preset-card-active-tag full">
                                        <CheckCircle2 size={12} strokeWidth={2.5} />
                                        <span>เลือกครบชุดแล้ว ({pr.artists.length}/{pr.artists.length})</span>
                                      </div>
                                    ) : selectedCountInPreset > 0 ? (
                                      <div className="preset-card-active-tag partial">
                                        <span>เลือกอยู่ {selectedCountInPreset}/{pr.artists.length} คน</span>
                                      </div>
                                    ) : (
                                      <span className="preset-card-click-hint">คลิกเพื่อเลือกชุดนี้</span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

        {/* Bottom Dock: Multi-line Wrapped Selected Tray (No Horizontal Scrolling Needed!) */}
        <div className="picker-bottom-dock">
          <div className="selected-summary-header">
            <div className="summary-counter">
              <strong>ศิลปินที่เลือกไว้:</strong>
              <span className="counter-pill">{selected.length} คน</span>
              {selected.length === 0 ? (
                <span className="hint-warning">(กรุณาเลือกอย่างน้อย 1 คน)</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSelectedTray(!showSelectedTray)}
                  className="btn-toggle-tray"
                >
                  {showSelectedTray ? 'ซ่อนรายชื่อ ▲' : 'แสดงรายชื่อ ▼'}
                </button>
              )}
            </div>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="btn-clear-tray"
              >
                ล้างทั้งหมด
              </button>
            )}
          </div>

          {/* Chips Tray Wraps onto Multiple Lines Automatically */}
          {selected.length > 0 && showSelectedTray && (
            <div className="selected-chips-tray">
              {selected.map((item) => (
                <span key={item} className="selected-artist-chip">
                  <span className="chip-artist-name">{item}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleArtist(item);
                    }}
                    className="chip-remove-btn"
                    title={`ลบ ${item}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="dock-buttons-row">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel-modal"
            >
              ยกเลิก
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={selected.length === 0}
              className="btn-confirm-artists"
            >
              <span>
                {selected.length === 0
                  ? 'กรุณาเลือกศิลปิน'
                  : `ยืนยันและเริ่มเล่น (${selected.length} คน)`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Memoized Individual Artist Card for High-Performance Rendering
// ---------------------------------------------------------------------------
const REGION_BADGE_MAP: Record<ArtistRegion, { label: string; className: string; flag: string }> = {
  thai: { label: 'ไทย', className: 'region-thai', flag: '🇹🇭' },
  inter: { label: 'สากล', className: 'region-inter', flag: '🌐' },
  kpop: { label: 'K-POP', className: 'region-kpop', flag: '🇰🇷' },
  anime_jpop: { label: 'Anime/J-POP', className: 'region-anime_jpop', flag: '🎌' },
};

interface ArtistCardItemProps {
  artist: GlobalArtist;
  isChecked: boolean;
  onToggle: (artistName: string) => void;
}

const ArtistCardItem = React.memo<ArtistCardItemProps>(({ artist, isChecked, onToggle }) => {
  const regionInfo = REGION_BADGE_MAP[artist.region];

  return (
    <div
      onClick={() => onToggle(artist.name)}
      className={`global-artist-card region-${artist.region} ${isChecked ? 'selected' : ''}`}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle(artist.name);
        }
      }}
    >
      <div className="global-artist-card-top">
        <div className="global-artist-name-wrap">
          <span className="artist-emoji">{artist.emoji}</span>
          <strong className="artist-name" title={artist.name}>
            {artist.name}
          </strong>
        </div>
        <div className={`card-checkbox-circle ${isChecked ? 'checked' : ''}`}>
          {isChecked ? <Check size={13} strokeWidth={3} /> : null}
        </div>
      </div>

      <div className="artist-badge-row">
        {regionInfo && (
          <span className={`artist-region-tag ${regionInfo.className}`}>
            {regionInfo.flag} {regionInfo.label}
          </span>
        )}
        {artist.genreLabel && (
          <span className="artist-genre-tag" title={artist.genreLabel}>
            {artist.genreLabel}
          </span>
        )}
      </div>
    </div>
  );
});

ArtistCardItem.displayName = 'ArtistCardItem';

