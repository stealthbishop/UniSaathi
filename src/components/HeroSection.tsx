import { useState, type FormEvent } from "react"
import { ShieldCheck, Zap, Sparkles, Paperclip, SendHorizontal, Compass } from "lucide-react"
import { EXPLORE_PROMPTS } from "../data/mockData"

interface HeroSectionProps {
  onAsk: (question: string) => void
  isSubmitting?: boolean
}

export function HeroSection({ onAsk, isSubmitting = false }: HeroSectionProps) {
  const [question, setQuestion] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!question.trim() || isSubmitting) return
    onAsk(question)
    setQuestion("")
  }

  function handleChipClick(chipText: string) {
    if (isSubmitting) return
    onAsk(chipText)
  }

  return (
    <section className="hero-banner">
      {/* Background ambient lighting effects */}
      <div className="hero-glow-blob top-left" />
      <div className="hero-glow-blob bottom-right" />

      <div className="hero-top-badges">
        <div className="hero-glass-pill">
          <ShieldCheck size={14} className="hero-pill-icon" />
          <span>Official Registrar Citations</span>
        </div>
        <div className="hero-glass-pill">
          <Zap size={14} className="hero-pill-icon" />
          <span>Response Latency ~0.4s</span>
        </div>
        <div className="hero-glass-pill live-sem">
          <span className="live-orange-indicator" />
          <span>Spring 2025 Semester Live</span>
        </div>
      </div>

      <div className="hero-eyebrow">
        <Sparkles size={13} className="eyebrow-sparkle" />
        <span>IGNITE YOUR CAMPUS JOURNEY</span>
      </div>

      <h1 className="hero-title">
        Namaste Aarav! How can UniSaathi help you today?
      </h1>

      <p className="hero-subtitle">
        Ask any academic question, verify exam guidelines, check hostel fee deadlines,
        or locate campus facilities with authenticated institutional citations.
      </p>

      {/* Floating Prompt Bar */}
      <form className="hero-search-card" onSubmit={handleSubmit}>
        <div className="hero-input-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L3 7L12 12L21 7L12 2Z"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 17L12 22L21 17"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12L12 17L21 12"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <input
          type="text"
          className="hero-text-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="E.g., What is the minimum attendance criteria for 3rd sem lab exams?"
          disabled={isSubmitting}
        />

        <div className="hero-input-actions">
          <button
            type="button"
            className="hero-clip-btn"
            title="Attach circular or syllabus document"
            aria-label="Attach file"
          >
            <Paperclip size={17} />
          </button>

          <button
            type="submit"
            className="hero-submit-btn"
            disabled={isSubmitting || !question.trim()}
          >
            <span>{isSubmitting ? "Searching..." : "Ask Saathi"}</span>
            <SendHorizontal size={15} />
          </button>
        </div>
      </form>

      {/* Quick Explore Chips */}
      <div className="hero-explore-row">
        <div className="explore-label">
          <Compass size={14} />
          <span>EXPLORE:</span>
        </div>
        <div className="explore-chips-list">
          {EXPLORE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="explore-chip-btn"
              onClick={() => handleChipClick(prompt.query)}
              disabled={isSubmitting}
            >
              <span className="chip-emoji">{prompt.icon}</span>
              <span>{prompt.query}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
