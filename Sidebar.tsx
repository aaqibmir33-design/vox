import React from 'react'
import type { TabId } from '../types/voice'
import './Sidebar.css'

interface SidebarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  collapsed: boolean
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { id: 'studio', label: 'Studio', icon: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' },
  { id: 'voices', label: 'Voices', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { id: 'library', label: 'Library', icon: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z' },
  { id: 'settings', label: 'Settings', icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
]

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, collapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="url(#logoGrad)" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="16" r="6" fill="url(#logoGrad)"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#6366f1"/>
                <stop offset="1" stopColor="#ec4899"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        {!collapsed && <span className="sidebar__title">AURA</span>}
      </div>

      <nav className="sidebar__nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`sidebar__item ${activeTab === tab.id ? 'sidebar__item--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d={tab.icon} />
            </svg>
            {!collapsed && <span className="sidebar__label">{tab.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        {!collapsed && (
          <div className="sidebar__credits">
            <div className="sidebar__credits-label">Credits</div>
            <div className="sidebar__credits-bar">
              <div className="sidebar__credits-fill" style={{ width: '42%' }} />
            </div>
            <div className="sidebar__credits-text">847 / 2,000</div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
