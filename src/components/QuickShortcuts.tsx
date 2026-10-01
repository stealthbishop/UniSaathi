import { Rocket, FileText, Award, Wifi, HeartPulse } from "lucide-react"
import { SHORTCUTS } from "../data/mockData"

interface QuickShortcutsProps {
  onShortcutClick: (category: string, title: string) => void
}

export function QuickShortcuts({ onShortcutClick }: QuickShortcutsProps) {
  function renderIcon(category: string) {
    switch (category) {
      case "grade":
        return <FileText size={18} />
      case "bonafide":
        return <Award size={18} />
      case "wifi":
        return <Wifi size={18} />
      case "health":
        return <HeartPulse size={18} />
      default:
        return <FileText size={18} />
    }
  }

  return (
    <div className="dashboard-card shortcuts-card">
      <div className="card-top-header">
        <div className="header-title-with-icon">
          <div className="header-icon-bubble rocket-bubble">
            <Rocket size={18} />
          </div>
          <div>
            <h2 className="card-title">Campus Quick Shortcuts</h2>
            <p className="card-subtitle">Frequently accessed actions</p>
          </div>
        </div>
      </div>

      <div className="shortcuts-grid">
        {SHORTCUTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="shortcut-card-item"
            onClick={() => onShortcutClick(item.category, item.title)}
          >
            <div
              className="shortcut-icon-box"
              style={{
                backgroundColor: item.iconBg,
                color: item.iconColor,
              }}
            >
              {renderIcon(item.category)}
            </div>

            <div className="shortcut-text-col">
              <h3 className="shortcut-item-title">{item.title}</h3>
              <p className="shortcut-item-desc">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
