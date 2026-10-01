import { Megaphone, ArrowRight } from "lucide-react"
import { NOTICES } from "../data/mockData"
import type { NoticeItem } from "../types"

interface RegistrarNoticesProps {
  onOpenNoticeModal: (notice: NoticeItem) => void
  onViewAllNotices: () => void
}

export function RegistrarNotices({
  onOpenNoticeModal,
  onViewAllNotices,
}: RegistrarNoticesProps) {
  return (
    <div className="dashboard-card registrar-notices-card">
      <div className="card-top-header">
        <div className="header-title-with-icon">
          <div className="header-icon-bubble notice-bubble">
            <Megaphone size={18} />
          </div>
          <div>
            <h2 className="card-title">Pinned Registrar Notices</h2>
          </div>
        </div>

        <button
          type="button"
          className="card-header-link"
          onClick={onViewAllNotices}
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="notices-items-stack">
        {NOTICES.map((notice) => (
          <div key={notice.id} className="notice-card-unit">
            <div className="notice-tag-header">
              <span className={`notice-ref-badge ${notice.tagColor}`}>
                {notice.code}
              </span>
              <span className="notice-timestamp">{notice.timeAgo}</span>
            </div>

            <h3
              className="notice-item-headline"
              onClick={() => onOpenNoticeModal(notice)}
            >
              {notice.title}
            </h3>

            <p className="notice-item-snippet">{notice.snippet}</p>

            <div className="notice-footer-row">
              <span className="notice-issuer-text">{notice.issuer}</span>

              <button
                type="button"
                className="notice-action-link"
                onClick={() => onOpenNoticeModal(notice)}
              >
                <span>{notice.actionLabel}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
