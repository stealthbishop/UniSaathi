import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  MapPin,
  LifeBuoy,
  BarChart3,
  Users2,
  Globe2,
  Database,
  Check,
} from "lucide-react"
import type { NavTab } from "../types"

interface SidebarProps {
  currentTab: NavTab
  onSelectTab: (tab: NavTab) => void
  isOpenMobile?: boolean
  onCloseMobile?: () => void
}

export function Sidebar({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  function handleNav(tab: NavTab) {
    onSelectTab(tab)
    if (onCloseMobile) onCloseMobile()
  }

  return (
    <>
      {isOpenMobile && (
        <div className="mobile-overlay" onClick={onCloseMobile} />
      )}
      <aside className={`sidebar ${isOpenMobile ? "mobile-open" : ""}`}>
        <div className="sidebar-scrollable-content">
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>LEARNING SPACE</span>
              <Globe2 size={13} className="section-header-icon" />
            </div>

            <nav className="sidebar-nav">
              <button
                className={`nav-item-btn ${
                  currentTab === "dashboard" ? "active" : ""
                }`}
                onClick={() => handleNav("dashboard")}
              >
                <div className="nav-item-left">
                  <LayoutDashboard size={18} />
                  <span>Dashboard Hub</span>
                </div>
                {currentTab === "dashboard" && (
                  <span className="nav-badge-active">Active</span>
                )}
              </button>

              <button
                className={`nav-item-btn ${
                  currentTab === "studio" ? "active" : ""
                }`}
                onClick={() => handleNav("studio")}
              >
                <div className="nav-item-left">
                  <Sparkles size={18} />
                  <span>AI Saathi Studio</span>
                </div>
                <span className="nav-badge-pill coral">GPT-4o</span>
              </button>

              <button
                className={`nav-item-btn ${
                  currentTab === "knowledge" ? "active" : ""
                }`}
                onClick={() => handleNav("knowledge")}
              >
                <div className="nav-item-left">
                  <BookOpen size={18} />
                  <span>Knowledge & Circulars</span>
                </div>
                <span className="nav-badge-pill gray">1.4k</span>
              </button>

              <button
                className={`nav-item-btn ${
                  currentTab === "map" ? "active" : ""
                }`}
                onClick={() => handleNav("map")}
              >
                <div className="nav-item-left">
                  <MapPin size={18} />
                  <span>Interactive Campus Map</span>
                </div>
                <span className="nav-badge-check">
                  <Check size={11} strokeWidth={3} />
                </span>
              </button>

              <button
                className={`nav-item-btn ${
                  currentTab === "helpdesk" ? "active" : ""
                }`}
                onClick={() => handleNav("helpdesk")}
              >
                <div className="nav-item-left">
                  <LifeBuoy size={18} />
                  <span>Helpdesk & Tickets</span>
                </div>
                <span className="nav-badge-red-dot" />
              </button>
            </nav>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>INSIGHTS & LAB</span>
            </div>

            <nav className="sidebar-nav">
              <button
                className={`nav-item-btn ${
                  currentTab === "analytics" ? "active" : ""
                }`}
                onClick={() => handleNav("analytics")}
              >
                <div className="nav-item-left">
                  <BarChart3 size={18} />
                  <span>Vector Analytics</span>
                </div>
              </button>

              <button
                className={`nav-item-btn ${
                  currentTab === "clubs" ? "active" : ""
                }`}
                onClick={() => handleNav("clubs")}
              >
                <div className="nav-item-left">
                  <Users2 size={18} />
                  <span>Study Clubs & Collab</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-telemetry-box">
            <div className="telemetry-top-row">
              <div className="telemetry-title-group">
                <Database size={15} className="telemetry-icon" />
                <span>Vector Index Health</span>
              </div>
              <span className="health-score-pill">99.4%</span>
            </div>
            <div className="telemetry-bottom-row">
              <span className="corpus-label">Indexed Corpus</span>
              <span className="corpus-count">
                <span className="corpus-green-dot" /> 1,420 items
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
