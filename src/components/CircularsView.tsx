import { useState } from "react"
import { Search, Download, Calendar } from "lucide-react"
import { NOTICES } from "../data/mockData"
import type { NoticeItem } from "../types"

interface CircularsViewProps {
  onOpenNotice: (notice: NoticeItem) => void
}

export function CircularsView({ onOpenNotice }: CircularsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredNotices = NOTICES.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.snippet.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeFilter === "All") return matchSearch
    if (activeFilter === "Exam") return matchSearch && n.code.includes("EXAM")
    if (activeFilter === "Hostel") return matchSearch && n.code.includes("HOSTEL")
    if (activeFilter === "Library") return matchSearch && n.code.includes("LIB")
    return matchSearch
  })

  return (
    <div className="circulars-view-container">
      <div className="circulars-top-header">
        <div>
          <h2>University Circulars & Knowledge Repository</h2>
          <p>
            1,482 Indexed Academic Circulars, Examination Notifications & Syllabus Archives
          </p>
        </div>

        <div className="circulars-search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search circulars by code, keyword, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-chips-row">
        {["All", "Exam", "Hostel", "Library"].map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-chip ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f} Notifications
          </button>
        ))}
      </div>

      <div className="circulars-cards-grid">
        {filteredNotices.map((n) => (
          <div key={n.id} className="circular-repo-card">
            <div className="circular-card-top">
              <span className={`notice-ref-badge ${n.tagColor}`}>{n.code}</span>
              <span className="circular-date">
                <Calendar size={12} /> {n.timeAgo}
              </span>
            </div>

            <h3 className="circular-title">{n.title}</h3>
            <p className="circular-body">{n.snippet}</p>

            <div className="circular-card-footer">
              <span className="circular-issuer">{n.issuer}</span>
              <div className="circular-actions">
                <button
                  type="button"
                  className="action-btn secondary small"
                  onClick={() => onOpenNotice(n)}
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="action-btn primary small"
                  onClick={() => alert(`Downloading PDF for ${n.code}...`)}
                >
                  <Download size={13} /> PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
