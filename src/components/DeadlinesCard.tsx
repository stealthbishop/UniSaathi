import { Calendar, ArrowRight, Download, CreditCard, Folder } from "lucide-react"
import { DEADLINES } from "../data/mockData"

interface DeadlinesCardProps {
  onOpenCalendar: () => void
  onActionClick: (title: string, actionType: string) => void
}

export function DeadlinesCard({
  onOpenCalendar,
  onActionClick,
}: DeadlinesCardProps) {
  return (
    <div className="dashboard-card deadlines-card">
      <div className="card-top-header">
        <div className="header-title-with-icon">
          <div className="header-icon-bubble calendar-bubble">
            <Calendar size={18} />
          </div>
          <div>
            <h2 className="card-title">Upcoming Deadlines & Milestones</h2>
          </div>
        </div>

        <button
          type="button"
          className="card-header-link"
          onClick={onOpenCalendar}
        >
          <span>Full Calendar</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="deadlines-list">
        {DEADLINES.map((dl) => (
          <div key={dl.id} className="deadline-item-row">
            <div className={`date-badge-box ${dl.color}`}>
              <span className="date-month">{dl.month}</span>
              <span className="date-day">{dl.day}</span>
            </div>

            <div className="deadline-info-col">
              <div className="deadline-title-line">
                <h3 className="deadline-title">{dl.title}</h3>
                <span className={`dept-pill-tag ${dl.deptColor}`}>
                  {dl.dept}
                </span>
              </div>
              <p className="deadline-desc">{dl.desc}</p>
            </div>

            <div className="deadline-action-col">
              <button
                type="button"
                className="deadline-action-btn"
                title={`Action for ${dl.title}`}
                onClick={() => onActionClick(dl.title, dl.actionType)}
                aria-label={dl.title}
              >
                {dl.actionType === "download" && <Download size={16} />}
                {dl.actionType === "pay" && <CreditCard size={16} />}
                {dl.actionType === "folder" && <Folder size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
