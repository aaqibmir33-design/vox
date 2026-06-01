import React from 'react'
import { mockStats, mockVoices, mockJobs, mockClips } from '../data/mockData'
import WaveformVisualizer from './WaveformVisualizer'
import './Dashboard.css'

const Dashboard: React.FC = () => {
  const stats = mockStats
  const recentVoices = mockVoices.slice(0, 4)
  const activeJobs = mockJobs.filter(j => j.status !== 'completed')
  const recentClips = mockClips.slice(0, 3)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="dashboard animate-fadeIn">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">Welcome back, Alex. Here's what's happening in your studio.</p>
        </div>
        <button className="dashboard__cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--voices">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{stats.totalVoices}</div>
            <div className="stat-card__label">Active Voices</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--clips">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{stats.totalClips}</div>
            <div className="stat-card__label">Audio Clips</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--duration">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{formatDuration(stats.totalDuration)}</div>
            <div className="stat-card__label">Total Duration</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--jobs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{stats.activeJobs}</div>
            <div className="stat-card__label">Active Jobs</div>
          </div>
        </div>
      </div>

      <div className="dashboard__grid">
        {/* Active Jobs */}
        <div className="dashboard__section">
          <div className="section-header">
            <h2 className="section-header__title">Active Jobs</h2>
            <button className="section-header__link">View All</button>
          </div>
          <div className="jobs-list">
            {activeJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card__info">
                  <div className={`job-card__status job-card__status--${job.status}`}>
                    {job.status === 'training' && (
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    )}
                    {job.status === 'processing' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    )}
                    <span>{job.status}</span>
                  </div>
                  <div className="job-card__name">{job.name}</div>
                  <div className="job-card__meta">
                    {job.samples} samples · {formatDuration(job.totalDuration)} · Started {formatTime(job.startedAt)}
                  </div>
                </div>
                <div className="job-card__progress">
                  <div className="job-card__progress-bar">
                    <div 
                      className="job-card__progress-fill" 
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  <span className="job-card__progress-text">{job.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Clips */}
        <div className="dashboard__section">
          <div className="section-header">
            <h2 className="section-header__title">Recent Clips</h2>
            <button className="section-header__link">View All</button>
          </div>
          <div className="clips-list">
            {recentClips.map((clip) => {
              const voice = mockVoices.find(v => v.id === clip.voiceId)
              return (
                <div key={clip.id} className="clip-card">
                  <div className="clip-card__waveform">
                    <WaveformVisualizer data={clip.waveform} height={40} color="rgba(99,102,241,0.6)" />
                  </div>
                  <div className="clip-card__info">
                    <div className="clip-card__voice">
                      <img src={voice?.avatar} alt={voice?.name} className="clip-card__avatar" />
                      <span className="clip-card__voice-name">{voice?.name}</span>
                    </div>
                    <p className="clip-card__text">{clip.text}</p>
                    <div className="clip-card__meta">
                      <span>{clip.duration.toFixed(1)}s</span>
                      <span>·</span>
                      <span>{clip.createdAt}</span>
                    </div>
                  </div>
                  <div className="clip-card__actions">
                    <button className="clip-card__btn" aria-label="Play">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <button className="clip-card__btn" aria-label="Download">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Voices */}
      <div className="dashboard__section dashboard__section--full">
        <div className="section-header">
          <h2 className="section-header__title">Popular Voices</h2>
          <button className="section-header__link">Browse All</button>
        </div>
        <div className="voices-grid">
          {recentVoices.map((voice) => (
            <div key={voice.id} className="voice-card glow-border">
              <div className="voice-card__header">
                <img src={voice.avatar} alt={voice.name} className="voice-card__avatar" />
                <div className="voice-card__quality">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {voice.quality}%
                </div>
              </div>
              <div className="voice-card__content">
                <h3 className="voice-card__name">{voice.name}</h3>
                <p className="voice-card__desc">{voice.description}</p>
                <div className="voice-card__tags">
                  {voice.tags.map((tag) => (
                    <span key={tag} className="voice-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="voice-card__footer">
                <div className="voice-card__stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {voice.clones.toLocaleString()} clones
                </div>
                <div className="voice-card__stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {voice.sampleDuration}s sample
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
