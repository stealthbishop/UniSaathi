import { Plus, CheckCircle, Clock } from "lucide-react"
import { TICKETS } from "../data/mockData"

interface TicketsViewProps {
  onOpenRaiseModal: () => void
}

export function TicketsView({ onOpenRaiseModal }: TicketsViewProps) {
  return (
    <div className="tickets-view-container">
      <div className="tickets-header-row">
        <div>
          <h2>Helpdesk & Support Grievances</h2>
          <p>Track academic disputes, elective mappings, and facility service requests</p>
        </div>

        <button
          type="button"
          className="action-btn primary"
          onClick={onOpenRaiseModal}
        >
          <Plus size={16} />
          <span>Raise New Ticket</span>
        </button>
      </div>

      <div className="tickets-list-wrapper">
        {TICKETS.map((t) => (
          <div key={t.id} className="ticket-full-card">
            <div className="ticket-card-header">
              <div className="ticket-id-tag">
                <span className="mono-id">{t.id}</span>
                <span className="ticket-cat">{t.category}</span>
              </div>
              <span
                className={`ticket-status-pill ${
                  t.status === "In Review" ? "review" : "resolved"
                }`}
              >
                {t.status === "In Review" ? (
                  <Clock size={12} />
                ) : (
                  <CheckCircle size={12} />
                )}
                {t.status}
              </span>
            </div>

            <h3 className="ticket-subject">{t.subject}</h3>

            <div className="ticket-meta-footer">
              <span>Created: {t.createdDate}</span>
              <span>Updated: {t.updatedAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
