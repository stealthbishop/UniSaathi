import { ShieldAlert, Building2, Laptop2 } from "lucide-react"

interface CampusHelplineProps {
  onCallProctor: () => void
  onSosCall: () => void
  onRaiseTicket: () => void
}

export function CampusHelpline({
  onCallProctor,
  onSosCall,
  onRaiseTicket,
}: CampusHelplineProps) {
  return (
    <div className="dashboard-card helpline-card">
      <div className="card-top-header">
        <div className="header-title-with-icon">
          <div className="header-icon-bubble helpline-bubble">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h2 className="card-title">Campus Helpline & Escalation</h2>
          </div>
        </div>
      </div>

      <div className="helpline-list-stack">
        {/* Proctor Office */}
        <div className="helpline-item-row">
          <div className="helpline-icon-box blue">
            <Building2 size={18} />
          </div>

          <div className="helpline-info-col">
            <h3 className="helpline-name">Student Proctor Office</h3>
            <p className="helpline-meta">Room #204, Administrative Block</p>
          </div>

          <button
            type="button"
            className="helpline-action-btn soft-purple"
            onClick={onCallProctor}
          >
            Call Direct
          </button>
        </div>

        {/* Anti-Ragging & Safety Cell */}
        <div className="helpline-item-row emergency-row">
          <div className="helpline-icon-box red">
            <ShieldAlert size={18} />
          </div>

          <div className="helpline-info-col">
            <h3 className="helpline-name">Anti-Ragging & Safety Cell</h3>
            <p className="helpline-meta highlight-red">
              24x7 Toll-Free: 1800-180-5522
            </p>
          </div>

          <button
            type="button"
            className="helpline-action-btn sos-red"
            onClick={onSosCall}
          >
            SOS Call
          </button>
        </div>

        {/* IT Services & ERP Helpdesk */}
        <div className="helpline-item-row">
          <div className="helpline-icon-box gray">
            <Laptop2 size={18} />
          </div>

          <div className="helpline-info-col">
            <h3 className="helpline-name">IT Services & ERP Helpdesk</h3>
            <p className="helpline-meta">LMS, Portal & Credential Support</p>
          </div>

          <button
            type="button"
            className="helpline-action-btn soft-gray"
            onClick={onRaiseTicket}
          >
            Raise Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
