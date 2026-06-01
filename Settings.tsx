import React, { useState } from 'react'
import './Settings.css'

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('sk-aura-xxxxxxxxxxxxxxxx')
  const [showApiKey, setShowApiKey] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('https://api.example.com/webhooks/voice')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    jobComplete: true,
    usageAlerts: true,
  })
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('en')

  return (
    <div className="settings animate-fadeIn">
      <div className="settings__header">
        <h1 className="settings__title">Settings</h1>
        <p className="settings__subtitle">Manage your account, API keys, and preferences</p>
      </div>

      <div className="settings__grid">
        {/* Account Section */}
        <div className="settings__section">
          <div className="settings__section-header">
            <div className="settings__section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h2 className="settings__section-title">Account</h2>
              <p className="settings__section-desc">Manage your profile and subscription</p>
            </div>
          </div>

          <div className="settings__field">
            <label className="settings__label">Display Name</label>
            <input type="text" defaultValue="Alex Chen" className="settings__input" />
          </div>

          <div className="settings__field">
            <label className="settings__label">Email</label>
            <input type="email" defaultValue="alex@example.com" className="settings__input" />
          </div>

          <div className="settings__field">
            <label className="settings__label">Plan</label>
            <div className="settings__plan">
              <div className="settings__plan-badge">Pro</div>
              <span className="settings__plan-text">2,000 credits / month</span>
              <button className="settings__plan-btn">Upgrade</button>
            </div>
          </div>
        </div>

        {/* API Section */}
        <div className="settings__section">
          <div className="settings__section-header">
            <div className="settings__section-icon settings__section-icon--api">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <div>
              <h2 className="settings__section-title">API & Integration</h2>
              <p className="settings__section-desc">Configure API access and webhooks</p>
            </div>
          </div>

          <div className="settings__field">
            <label className="settings__label">API Key</label>
            <div className="settings__api-key">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="settings__input settings__input--api"
                readOnly
              />
              <button
                className="settings__api-key-btn"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
              <button className="settings__api-key-btn settings__api-key-btn--primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>

          <div className="settings__field">
            <label className="settings__label">Webhook URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="settings__input"
              placeholder="https://your-domain.com/webhook"
            />
          </div>

          <div className="settings__field">
            <label className="settings__label">Rate Limit</label>
            <div className="settings__rate-limit">
              <span className="settings__rate-value">100</span>
              <span className="settings__rate-unit">requests / minute</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings__section">
          <div className="settings__section-header">
            <div className="settings__section-icon settings__section-icon--notif">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            <div>
              <h2 className="settings__section-title">Notifications</h2>
              <p className="settings__section-desc">Choose how you want to be notified</p>
            </div>
          </div>

          <div className="settings__toggle-list">
            <label className="settings__toggle">
              <div className="settings__toggle-info">
                <span className="settings__toggle-label">Email Notifications</span>
                <span className="settings__toggle-desc">Receive updates via email</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                className="settings__toggle-input"
              />
              <span className="settings__toggle-slider"></span>
            </label>

            <label className="settings__toggle">
              <div className="settings__toggle-info">
                <span className="settings__toggle-label">Push Notifications</span>
                <span className="settings__toggle-desc">Browser push notifications</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                className="settings__toggle-input"
              />
              <span className="settings__toggle-slider"></span>
            </label>

            <label className="settings__toggle">
              <div className="settings__toggle-info">
                <span className="settings__toggle-label">Job Completion</span>
                <span className="settings__toggle-desc">Alert when voice cloning completes</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.jobComplete}
                onChange={(e) => setNotifications(prev => ({ ...prev, jobComplete: e.target.checked }))}
                className="settings__toggle-input"
              />
              <span className="settings__toggle-slider"></span>
            </label>

            <label className="settings__toggle">
              <div className="settings__toggle-info">
                <span className="settings__toggle-label">Usage Alerts</span>
                <span className="settings__toggle-desc">Warn when approaching credit limits</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.usageAlerts}
                onChange={(e) => setNotifications(prev => ({ ...prev, usageAlerts: e.target.checked }))}
                className="settings__toggle-input"
              />
              <span className="settings__toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="settings__section">
          <div className="settings__section-header">
            <div className="settings__section-icon settings__section-icon--theme">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <div>
              <h2 className="settings__section-title">Appearance</h2>
              <p className="settings__section-desc">Customize your interface</p>
            </div>
          </div>

          <div className="settings__field">
            <label className="settings__label">Theme</label>
            <div className="settings__theme-options">
              <button
                className={`settings__theme-btn ${theme === 'dark' ? 'settings__theme-btn--active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                Dark
              </button>
              <button
                className={`settings__theme-btn ${theme === 'light' ? 'settings__theme-btn--active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Light
              </button>
              <button
                className={`settings__theme-btn ${theme === 'auto' ? 'settings__theme-btn--active' : ''}`}
                onClick={() => setTheme('auto')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Auto
              </button>
            </div>
          </div>

          <div className="settings__field">
            <label className="settings__label">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="settings__select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="settings__footer">
        <button className="settings__save-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Settings
