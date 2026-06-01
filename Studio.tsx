import React, { useState, useCallback } from 'react'
import { mockVoices, defaultSettings } from '../data/mockData'
import type { VoiceSettings } from '../types/voice'
import WaveformVisualizer from './WaveformVisualizer'
import './Studio.css'

const Studio: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState(mockVoices[0])
  const [text, setText] = useState('Welcome to AURA Studio. Type your text here and select a voice to generate high-quality speech synthesis. Adjust the parameters below to fine-tune the output.')
  const [settings, setSettings] = useState<VoiceSettings>(defaultSettings)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedWaveform, setGeneratedWaveform] = useState<number[] | null>(null)

  const handleSettingChange = useCallback((key: keyof VoiceSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      const waveform = Array.from({ length: 60 }, () => Math.random() * 0.8 + 0.2)
      setGeneratedWaveform(waveform)
      setIsGenerating(false)
    }, 2000)
  }, [])

  const emotions = [
    { id: 'neutral', label: 'Neutral', icon: '😐' },
    { id: 'happy', label: 'Happy', icon: '😊' },
    { id: 'sad', label: 'Sad', icon: '😢' },
    { id: 'angry', label: 'Angry', icon: '😠' },
    { id: 'excited', label: 'Excited', icon: '🤩' },
    { id: 'calm', label: 'Calm', icon: '😌' },
  ]

  const styles = [
    { id: 'conversational', label: 'Conversational' },
    { id: 'narrative', label: 'Narrative' },
    { id: 'professional', label: 'Professional' },
    { id: 'dramatic', label: 'Dramatic' },
  ]

  return (
    <div className="studio animate-fadeIn">
      <div className="studio__header">
        <div>
          <h1 className="studio__title">Synthesis Studio</h1>
          <p className="studio__subtitle">Craft perfect voice output with real-time parameter control</p>
        </div>
      </div>

      <div className="studio__layout">
        {/* Voice Selection Panel */}
        <div className="studio__panel studio__panel--voices">
          <h3 className="studio__panel-title">Select Voice</h3>
          <div className="studio__voices">
            {mockVoices.map((voice) => (
              <button
                key={voice.id}
                className={`voice-select ${selectedVoice.id === voice.id ? 'voice-select--active' : ''}`}
                onClick={() => setSelectedVoice(voice)}
              >
                <img src={voice.avatar} alt={voice.name} className="voice-select__avatar" />
                <div className="voice-select__info">
                  <span className="voice-select__name">{voice.name}</span>
                  <span className="voice-select__meta">{voice.accent} · {voice.gender}</span>
                </div>
                <div className="voice-select__quality">{voice.quality}%</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Workspace */}
        <div className="studio__panel studio__panel--main">
          {/* Text Input */}
          <div className="studio__text-area">
            <div className="studio__text-header">
              <span className="studio__text-label">Input Text</span>
              <span className="studio__text-count">{text.length} characters</span>
            </div>
            <textarea
              className="studio__textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to synthesize..."
              rows={6}
            />
            <div className="studio__text-actions">
              <button className="studio__text-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Load Script
              </button>
              <button className="studio__text-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="studio__settings">
            <h3 className="studio__settings-title">Voice Settings</h3>

            {/* Sliders */}
            <div className="studio__sliders">
              <div className="slider-group">
                <div className="slider-group__header">
                  <label className="slider-group__label">Stability</label>
                  <span className="slider-group__value">{settings.stability}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.stability}
                  onChange={(e) => handleSettingChange('stability', Number(e.target.value))}
                  className="slider"
                />
                <span className="slider-group__hint">Higher values produce more consistent output</span>
              </div>

              <div className="slider-group">
                <div className="slider-group__header">
                  <label className="slider-group__label">Clarity</label>
                  <span className="slider-group__value">{settings.clarity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.clarity}
                  onChange={(e) => handleSettingChange('clarity', Number(e.target.value))}
                  className="slider"
                />
                <span className="slider-group__hint">Adjusts pronunciation precision and articulation</span>
              </div>

              <div className="slider-group">
                <div className="slider-group__header">
                  <label className="slider-group__label">Speed</label>
                  <span className="slider-group__value">{settings.speed}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={settings.speed}
                  onChange={(e) => handleSettingChange('speed', Number(e.target.value))}
                  className="slider"
                />
                <span className="slider-group__hint">Speech rate relative to normal speed</span>
              </div>

              <div className="slider-group">
                <div className="slider-group__header">
                  <label className="slider-group__label">Pitch Shift</label>
                  <span className="slider-group__value">{settings.pitch > 0 ? `+${settings.pitch}` : settings.pitch}</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={settings.pitch}
                  onChange={(e) => handleSettingChange('pitch', Number(e.target.value))}
                  className="slider slider--bipolar"
                />
                <span className="slider-group__hint">Fine-tune voice pitch in semitones</span>
              </div>
            </div>

            {/* Emotion Selection */}
            <div className="studio__section">
              <label className="studio__section-label">Emotion</label>
              <div className="emotion-grid">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    className={`emotion-btn ${settings.emotion === emotion.id ? 'emotion-btn--active' : ''}`}
                    onClick={() => handleSettingChange('emotion', emotion.id)}
                  >
                    <span className="emotion-btn__icon">{emotion.icon}</span>
                    <span className="emotion-btn__label">{emotion.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className="studio__section">
              <label className="studio__section-label">Speaking Style</label>
              <div className="style-grid">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    className={`style-btn ${settings.style === style.id ? 'style-btn--active' : ''}`}
                    onClick={() => handleSettingChange('style', style.id)}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button 
            className={`studio__generate ${isGenerating ? 'studio__generate--loading' : ''}`}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Synthesizing...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Generate Speech
              </>
            )}
          </button>

          {/* Output Preview */}
          {generatedWaveform && (
            <div className="studio__output animate-fadeInUp">
              <div className="studio__output-header">
                <h3 className="studio__output-title">Generated Output</h3>
                <div className="studio__output-actions">
                  <button className="studio__output-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play
                  </button>
                  <button className="studio__output-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download
                  </button>
                  <button className="studio__output-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 12 12 16 8 12" />
                      <line x1="12" y1="16" x2="12" y2="4" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
              <div className="studio__waveform-container">
                <WaveformVisualizer 
                  data={generatedWaveform} 
                  height={80} 
                  color="rgba(168, 85, 247, 0.8)"
                  animated={true}
                />
              </div>
              <div className="studio__output-meta">
                <span>Duration: ~{(text.length / 15).toFixed(1)}s</span>
                <span>·</span>
                <span>Voice: {selectedVoice.name}</span>
                <span>·</span>
                <span>Quality: High</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Studio
