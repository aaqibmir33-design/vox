import React, { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Studio from './components/Studio'
import VoiceLibrary from './components/VoiceLibrary'
import AudioLibrary from './components/AudioLibrary'
import Settings from './components/Settings'
import Header from './components/Header'
import type { TabId } from './types/voice'
import './styles/app.css'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'studio':
        return <Studio />
      case 'voices':
        return <VoiceLibrary />
      case 'library':
        return <AudioLibrary />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        collapsed={sidebarCollapsed}
      />
      <main className={`app__main ${sidebarCollapsed ? 'app__main--expanded' : ''}`}>
        <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        <div className="app__content">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
