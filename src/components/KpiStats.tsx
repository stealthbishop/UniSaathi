import { GraduationCap, Bell, MessageSquare, Ticket, Zap } from "lucide-react"

interface KpiStatsProps {
  onOpenNotices?: () => void
  onOpenTickets?: () => void
}

export function KpiStats({ onOpenNotices, onOpenTickets }: KpiStatsProps) {
  return (
    <section className="kpi-grid">
      {/* 1. Academic Standing */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-label">ACADEMIC STANDING</span>
          <div className="kpi-icon-bubble blue">
            <GraduationCap size={16} />
          </div>
        </div>

        <div className="kpi-value-row">
          <span className="kpi-main-number">8.64</span>
          <span className="kpi-badge-chip cgpa">CGPA</span>
        </div>

        <div className="kpi-footer-row">
          <span className="kpi-subtext">
            <strong>87%</strong> Attendance <span className="req-note">(Req: 75%)</span>
          </span>
          <span className="status-chip green">
            <span className="bullet-dot green" /> Safe
          </span>
        </div>
      </div>

      {/* 2. Active Notices */}
      <div className="kpi-card clickable" onClick={onOpenNotices}>
        <div className="kpi-card-header">
          <span className="kpi-label">ACTIVE NOTICES</span>
          <div className="kpi-icon-bubble peach">
            <Bell size={16} />
          </div>
        </div>

        <div className="kpi-value-row">
          <span className="kpi-main-number">4</span>
          <span className="kpi-sub-text-bold">New</span>
          <span className="kpi-badge-chip orange">Today</span>
        </div>

        <div className="kpi-footer-row">
          <span className="urgent-notice-text">
            <span className="bullet-dot red" /> Urgent: Exam Form Windo...
          </span>
        </div>
      </div>

      {/* 3. AI Queries Resolved */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-label">AI QUERIES RESOLVED</span>
          <div className="kpi-icon-bubble green">
            <MessageSquare size={16} />
          </div>
        </div>

        <div className="kpi-value-row">
          <span className="kpi-main-number">28</span>
          <span className="kpi-sub-text-light">this month</span>
        </div>

        <div className="kpi-footer-row">
          <span className="kpi-saved-time">
            <Zap size={13} className="zap-icon" /> Saved ~6.5 hrs
          </span>
          <span className="status-chip green-solid">100% Verified</span>
        </div>
      </div>

      {/* 4. Support Tickets */}
      <div className="kpi-card clickable" onClick={onOpenTickets}>
        <div className="kpi-card-header">
          <span className="kpi-label">SUPPORT TICKETS</span>
          <div className="kpi-icon-bubble purple">
            <Ticket size={16} />
          </div>
        </div>

        <div className="kpi-value-row">
          <span className="kpi-main-number">1</span>
          <span className="kpi-sub-text-bold">Active</span>
          <span className="kpi-badge-chip blue">#US-849</span>
        </div>

        <div className="kpi-footer-row">
          <span className="kpi-ticket-name">Elective Credit ...</span>
          <span className="status-chip amber">In Review</span>
        </div>
      </div>
    </section>
  )
}
