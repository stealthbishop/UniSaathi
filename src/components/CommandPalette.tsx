import { useState, useEffect } from "react"
import { Search, X, BookOpen, Calendar, HelpCircle, FileText, ArrowRight } from "lucide-react"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSelectAction: (actionText: string) => void
}

const SEARCH_ITEMS = [
  {
    category: "Academic Regulations",
    title: "Rules for re-evaluating end-sem examination papers",
    query: "What are the rules for re-evaluating end-sem papers?",
    icon: BookOpen,
  },
  {
    category: "Deadlines & Fees",
    title: "Mid-Semester exam fee payment deadline and late fees",
    query: "When is mid-sem exam fee due?",
    icon: Calendar,
  },
  {
    category: "Attendance",
    title: "Minimum attendance criteria for 3rd sem lab exams",
    query: "Attendance criteria for 3rd sem",
    icon: HelpCircle,
  },
  {
    category: "Hostel & Housing",
    title: "Procedure for hostel room change and mutual swaps",
    query: "Procedure for hostel room change",
    icon: FileText,
  },
  {
    category: "Documents",
    title: "Download Semester Grade Sheet (Unofficial Transcript)",
    query: "Semester Grade Sheet",
    icon: FileText,
  },
  {
    category: "Documents",
    title: "Generate Registrar Verified Bonafide Certificate",
    query: "Bonafide Certificate",
    icon: FileText,
  },
]

export function CommandPalette({
  isOpen,
  onClose,
  onSelectAction,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) {
          onClose()
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette-box" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input-wrap">
          <Search size={18} className="palette-search-icon" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, regulation, or campus query..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="palette-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="palette-results-list">
          {filtered.length === 0 ? (
            <div className="palette-empty-state">
              No direct matches found. Press enter to ask UniSaathi directly.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="palette-result-item"
                  onClick={() => {
                    onSelectAction(item.query)
                    onClose()
                  }}
                >
                  <div className="item-icon-col">
                    <Icon size={16} />
                  </div>
                  <div className="item-text-col">
                    <span className="item-title">{item.title}</span>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <ArrowRight size={14} className="item-arrow" />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
