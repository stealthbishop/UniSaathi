import { useState } from "react"
import { Search, Flame, Bell, ChevronDown, CheckCircle2, Shield, Calendar, Sparkles } from "lucide-react"

interface TopNavProps {
  onSearchClick: () => void
  onOpenNotifications: () => void
  onOpenProfile: () => void
  streakCount?: number
  onToggleSidebar?: () => void
}

export function TopNav({
  onSearchClick,
  streakCount = 5,
  onToggleSidebar,
}: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <header className="topnav">
      <div className="topnav-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className="brand-logo-group">
          <div className="brand-badge-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7L12 12L21 7L12 2Z"
                fill="#4f46e5"
                stroke="#4338ca"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 17L12 22L21 17"
                stroke="#6366f1"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12L12 17L21 12"
                stroke="#4f46e5"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="brand-title">UniSaathi</span>
        </div>

        <div className="brand-tags">
          <span className="tag-ai-version">
            <span className="pulsing-green-dot" /> Campus AI v2.4
          </span>
          <span className="tag-rag-live">RAG Live</span>
        </div>
      </div>

      <div className="topnav-center">
        <div className="global-search-pill" onClick={onSearchClick}>
          <Search size={16} className="search-icon" />
          <span className="search-placeholder">
            Search anything (exams, clubs, hostels, regulations)...
          </span>
          <kbd className="search-shortcut">⌘K</kbd>
        </div>
      </div>

      <div className="topnav-right">
        <div className="streak-pill" title="You have logged in 5 days in a row!">
          <Flame size={15} className="flame-icon" />
          <span>{streakCount} Day Streak</span>
        </div>

        <div className="relative-container">
          <button
            className="icon-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge-dot" />
          </button>

          {showNotifications && (
            <div className="popover-dropdown notifications-dropdown">
              <div className="popover-header">
                <strong>Notifications</strong>
                <span className="unread-count">2 new</span>
              </div>
              <div className="notification-items-list">
                <div className="notification-item unread">
                  <div className="notif-icon-wrap exam-color">
                    <Calendar size={14} />
                  </div>
                  <div className="notif-content">
                    <p className="notif-title">CIA-1 Schedule Rescheduled</p>
                    <span className="notif-time">10:30 AM • Examination Cell</span>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notif-icon-wrap ticket-color">
                    <Shield size={14} />
                  </div>
                  <div className="notif-content">
                    <p className="notif-title">Ticket #US-849 Assigned to Proctor</p>
                    <span className="notif-time">Yesterday • Academic Helpdesk</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notif-icon-wrap verified-color">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="notif-content">
                    <p className="notif-title">Bonafide Certificate Verified</p>
                    <span className="notif-time">3 days ago • Registrar Portal</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative-container">
          <div
            className="user-profile-badge"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="avatar-wrapper">
              <img
                src="/aarav-avatar.jpg"
                alt="Aarav Sharma"
                className="user-avatar-img"
                onError={(e) => {
                  // Fallback if image fails
                  const target = e.currentTarget
                  target.style.display = "none"
                  target.parentElement!.innerHTML =
                    '<div class="avatar-fallback">AS</div>'
                }}
              />
              <span className="pro-chip">Pro</span>
            </div>
            <div className="user-info-text">
              <span className="user-name">Aarav Sharma</span>
              <span className="user-meta">B.Tech CSE • Year 3</span>
            </div>
            <ChevronDown size={14} className="user-chevron" />
          </div>

          {showProfileMenu && (
            <div className="popover-dropdown profile-dropdown">
              <div className="profile-card-header">
                <strong>Aarav Sharma</strong>
                <span className="profile-roll">Roll No: 22CSE084</span>
                <span className="profile-dept">
                  Department of Computer Science & Engineering
                </span>
              </div>
              <div className="dropdown-divider" />
              <div className="profile-meta-stats">
                <div>
                  <span className="meta-label">CGPA</span>
                  <span className="meta-val">8.64</span>
                </div>
                <div>
                  <span className="meta-label">Attendance</span>
                  <span className="meta-val green">87%</span>
                </div>
                <div>
                  <span className="meta-label">Semester</span>
                  <span className="meta-val">VI</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <button
                className="dropdown-link-btn"
                onClick={() => setShowProfileMenu(false)}
              >
                <Sparkles size={14} /> Student Profile & Bio
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
