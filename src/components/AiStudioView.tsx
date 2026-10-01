import { useState, useRef, useEffect, type FormEvent } from "react"
import {
  Sparkles,
  SendHorizontal,
  ShieldCheck,
  Layers,
} from "lucide-react"
import type { MessageItem } from "../types"

interface AiStudioViewProps {
  conversation: MessageItem[]
  onSendMessage: (text: string) => void
  isBusy: boolean
  onInspectChunk: (chunk: MessageItem["chunk"], citation?: string) => void
}

export function AiStudioView({
  conversation,
  onSendMessage,
  isBusy,
  onInspectChunk,
}: AiStudioViewProps) {
  const [input, setInput] = useState("")
  const [model, setModel] = useState("gpt-4o")
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, isBusy])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || isBusy) return
    onSendMessage(input)
    setInput("")
  }

  const QUICK_PROMPTS = [
    "What is the grace mark policy for end-sem theory subjects?",
    "Can a 3rd year student apply for an off-campus semester internship?",
    "What are the mess rebate rules during college sports events?",
    "How do I apply for official transcripts for foreign university applications?",
  ]

  return (
    <div className="studio-container">
      {/* Studio Header */}
      <div className="studio-topbar">
        <div className="studio-title-group">
          <div className="studio-badge-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <h2>AI Saathi Studio</h2>
            <p>Grounding conversational AI with University Knowledge Base</p>
          </div>
        </div>

        <div className="studio-controls-row">
          <div className="model-selector-group">
            <label htmlFor="model-select">Model Engine:</label>
            <select
              id="model-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="model-select-dropdown"
            >
              <option value="gpt-4o">GPT-4o (Verified Registrar Citations)</option>
              <option value="llama-3.1">Groq Llama 3.1 8B Instant (~0.3s)</option>
              <option value="campus-notes">Campus Notes Vector Grounding</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="studio-chat-viewport">
        <div className="studio-messages-list">
          {conversation.map((msg) => (
            <div
              key={msg.id}
              className={`studio-message-row ${
                msg.role === "user" ? "user-side" : "assistant-side"
              }`}
            >
              <div className="studio-msg-avatar">
                {msg.role === "user" ? (
                  <div className="student-badge">AS</div>
                ) : (
                  <div className="assistant-badge">
                    <Sparkles size={15} />
                  </div>
                )}
              </div>

              <div className="studio-msg-body">
                <div className="studio-sender-label">
                  {msg.role === "user" ? "Aarav Sharma" : "UniSaathi Campus AI"}
                  <span className="studio-msg-time">{msg.timestamp}</span>
                </div>

                <div className="studio-msg-content">
                  <p>{msg.content}</p>
                </div>

                {msg.role === "assistant" && msg.citation && (
                  <div className="studio-citation-tag">
                    <ShieldCheck size={13} className="citation-icon" />
                    <span>
                      <strong>Retrieved:</strong> {msg.citation}
                    </span>
                    <button
                      type="button"
                      className="studio-inspect-btn"
                      onClick={() => onInspectChunk(msg.chunk, msg.citation)}
                    >
                      <Layers size={12} />
                      <span>Inspect Vector Chunk</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isBusy && (
            <div className="studio-message-row assistant-side">
              <div className="studio-msg-avatar">
                <div className="assistant-badge">
                  <Sparkles size={15} />
                </div>
              </div>
              <div className="studio-msg-body">
                <div className="studio-typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="studio-prompts-bar">
        <span>Try asking:</span>
        <div className="studio-quick-chips">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              className="studio-prompt-chip"
              onClick={() => onSendMessage(prompt)}
              disabled={isBusy}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Composer */}
      <form className="studio-composer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="studio-text-input"
          placeholder="Ask any academic question, verify circulars, exam dates, or college rules..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isBusy}
        />
        <button
          type="submit"
          className="studio-send-btn"
          disabled={isBusy || !input.trim()}
        >
          <span>Send</span>
          <SendHorizontal size={16} />
        </button>
      </form>
    </div>
  )
}
