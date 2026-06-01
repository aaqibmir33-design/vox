import React from 'react'
import './Header.css'

interface HeaderProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarCollapsed }) => {
  return (
    <header className="header">
      <div className="header__left">
        <button 
          className="header__menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarCollapsed ? (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            ) : (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            )}
          </svg>
        </button>
        <div className="header__search">
          <svg className="header__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input 
            type="text" 
            placeholder="Search voices, clips, projects..." 
            className="header__search-input"
          />
        </div>
      </div>

      <div className="header__right">
        <button className="header__action-btn" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="header__badge">3</span>
        </button>

        <button className="header__action-btn" aria-label="Help">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>

        <div className="header__profile">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" 
            alt="Profile" 
            className="header__avatar"
          />
          <div className="header__profile-info">
            <span className="header__profile-name">Alex Chen</span>
            <span className="header__profile-role">Pro Plan</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
