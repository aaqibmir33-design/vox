import React, { useState } from 'react'
import { mockVoices } from '../data/mockData'
import WaveformVisualizer from './WaveformVisualizer'
import './VoiceLibrary.css'

const VoiceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterAccent, setFilterAccent] = useState('all')
  const [filterGender, setFilterGender] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const accents = ['all', ...Array.from(new Set(mockVoices.map(v => v.accent)))]
  const genders = ['all', 'male', 'female', 'neutral']

  const filteredVoices = mockVoices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voice.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesAccent = filterAccent === 'all' || voice.accent === filterAccent
    const matchesGender = filterGender === 'all' || voice.gender === filterGender
    return matchesSearch && matchesAccent && matchesGender
  })

  const demoWaveform = Array.from({ length: 50 }, () => Math.random() * 0.6 + 0.2)

  return (
    <div className="voice-library animate-fadeIn">
      <div className="voice-library__header">
        <div>
          <h1 className="voice-library__title">Voice Library</h1>
          <p className="voice-library__subtitle">{mockVoices.length} voices available · {filteredVoices.length} matching filters</p>
        </div>
        <button className="voice-library__cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Clone New Voice
        </button>
      </div>

      {/* Filters Bar */}
      <div className="voice-library__filters">
        <div className="voice-library__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search voices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="voice-library__search-input"
          />
        </div>

        <div className="voice-library__filter-group">
          <select
            value={filterAccent}
            onChange={(e) => setFilterAccent(e.target.value)}
            className="voice-library__filter-select"
          >
            {accents.map(accent => (
              <option key={accent} value={accent}>
                {accent === 'all' ? 'All Accents' : accent}
              </option>
            ))}
          </select>

          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="voice-library__filter-select"
          >
            {genders.map(gender => (
              <option key={gender} value={gender}>
                {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="voice-library__view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'view-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'view-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Voices Display */}
      {viewMode === 'grid' ? (
        <div className="voices-grid voices-grid--large">
          {filteredVoices.map((voice) => (
            <div key={voice.id} className="voice-card voice-card--large glow-border">
              <div className="voice-card__top">
                <div className="voice-card__preview">
                  <WaveformVisualizer data={demoWaveform} height={60} color="rgba(99,102,241,0.4)" animated={false} />
                  <button className="voice-card__play-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div className="voice-card__header-content">
                  <img src={voice.avatar} alt={voice.name} className="voice-card__avatar voice-card__avatar--large" />
                  <div className="voice-card__header-info">
                    <h3 className="voice-card__name">{voice.name}</h3>
                    <div className="voice-card__badges">
                      <span className="badge badge--accent">{voice.accent}</span>
                      <span className="badge">{voice.gender}</span>
                      <span className="badge badge--quality">{voice.quality}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="voice-card__body">
                <p className="voice-card__desc">{voice.description}</p>
                <div className="voice-card__tags">
                  {voice.tags.map((tag) => (
                    <span key={tag} className="voice-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="voice-card__actions-bar">
                <div className="voice-card__stats-row">
                  <span className="voice-card__stat-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    {voice.clones.toLocaleString()} uses
                  </span>
                  <span className="voice-card__stat-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {voice.sampleDuration}s sample
                  </span>
                </div>
                <div className="voice-card__action-btns">
                  <button className="voice-card__action-btn voice-card__action-btn--primary">
                    Use in Studio
                  </button>
                  <button className="voice-card__action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="voices-list">
          {filteredVoices.map((voice) => (
            <div key={voice.id} className="voice-list-item">
              <img src={voice.avatar} alt={voice.name} className="voice-list-item__avatar" />
              <div className="voice-list-item__info">
                <div className="voice-list-item__header">
                  <h3 className="voice-list-item__name">{voice.name}</h3>
                  <div className="voice-list-item__badges">
                    <span className="badge badge--accent">{voice.accent}</span>
                    <span className="badge">{voice.gender}</span>
                    <span className="badge badge--quality">{voice.quality}%</span>
                  </div>
                </div>
                <p className="voice-list-item__desc">{voice.description}</p>
                <div className="voice-list-item__meta">
                  <span>{voice.clones.toLocaleString()} uses</span>
                  <span>·</span>
                  <span>{voice.sampleDuration}s sample</span>
                  <span>·</span>
                  <span>{voice.language}</span>
                </div>
              </div>
              <div className="voice-list-item__actions">
                <button className="voice-list-item__btn voice-list-item__btn--primary">Use</button>
                <button className="voice-list-item__btn">Preview</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VoiceLibrary
