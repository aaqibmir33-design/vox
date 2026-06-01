import React, { useState } from 'react'
import { mockClips, mockVoices } from '../data/mockData'
import WaveformVisualizer from './WaveformVisualizer'
import './AudioLibrary.css'

const AudioLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'duration'>('newest')
  const [selectedClip, setSelectedClip] = useState<string | null>(null)

  const filteredClips = mockClips
    .filter(clip => {
      const voice = mockVoices.find(v => v.id === clip.voiceId)
      return clip.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice?.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === 'duration') return b.duration - a.duration
      return 0
    })

  return (
    <div className="audio-library animate-fadeIn">
      <div className="audio-library__header">
        <div>
          <h1 className="audio-library__title">Audio Library</h1>
          <p className="audio-library__subtitle">{mockClips.length} clips generated · Manage and organize your audio assets</p>
        </div>
        <div className="audio-library__actions">
          <button className="audio-library__btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export All
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="audio-library__toolbar">
        <div className="audio-library__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search clips by text or voice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="audio-library__search-input"
          />
        </div>
        <div className="audio-library__sort">
          <label className="audio-library__sort-label">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="audio-library__sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Clips Table */}
      <div className="audio-library__table-wrapper">
        <table className="audio-library__table">
          <thead>
            <tr>
              <th className="audio-library__th">Clip</th>
              <th className="audio-library__th">Voice</th>
              <th className="audio-library__th">Waveform</th>
              <th className="audio-library__th">Duration</th>
              <th className="audio-library__th">Date</th>
              <th className="audio-library__th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClips.map((clip) => {
              const voice = mockVoices.find(v => v.id === clip.voiceId)
              const isSelected = selectedClip === clip.id
              return (
                <tr
                  key={clip.id}
                  className={`audio-library__row ${isSelected ? 'audio-library__row--selected' : ''}`}
                  onClick={() => setSelectedClip(isSelected ? null : clip.id)}
                >
                  <td className="audio-library__td">
                    <div className="clip-info">
                      <div className="clip-info__play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="clip-info__text">
                        <span className="clip-info__title">{clip.text.slice(0, 60)}{clip.text.length > 60 ? '...' : ''}</span>
                        <span className="clip-info__id">ID: {clip.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="audio-library__td">
                    <div className="voice-info">
                      <img src={voice?.avatar} alt={voice?.name} className="voice-info__avatar" />
                      <span className="voice-info__name">{voice?.name}</span>
                    </div>
                  </td>
                  <td className="audio-library__td audio-library__td--waveform">
                    <WaveformVisualizer data={clip.waveform} height={32} color="rgba(168,85,247,0.5)" animated={false} />
                  </td>
                  <td className="audio-library__td">
                    <span className="duration-badge">{clip.duration.toFixed(1)}s</span>
                  </td>
                  <td className="audio-library__td">
                    <span className="date-text">{clip.createdAt}</span>
                  </td>
                  <td className="audio-library__td">
                    <div className="clip-actions">
                      <button className="clip-actions__btn" title="Play">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <button className="clip-actions__btn" title="Download">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                      </button>
                      <button className="clip-actions__btn" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredClips.length === 0 && (
        <div className="audio-library__empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <h3>No clips found</h3>
          <p>Try adjusting your search or generate new clips in the Studio</p>
          <button className="audio-library__empty-btn">Go to Studio</button>
        </div>
      )}
    </div>
  )
}

export default AudioLibrary
