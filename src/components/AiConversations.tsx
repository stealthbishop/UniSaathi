import { Bot, Sparkles, ExternalLink, ShieldCheck } from "lucide-react"
import type { MessageItem } from "../types"

interface AiConversationsProps {
  conversation: MessageItem[]
  isLoading?: boolean
  onInspectChunk: (chunk: MessageItem["chunk"], citation?: string) => void
}

export function AiConversations({
  conversation,
  isLoading = false,
  onInspectChunk,
}: AiConversationsProps) {
  // Helper to format response text with highlighted keywords matching screenshot
  function renderFormattedText(text: string) {
    const parts = text.split(
      /(\b15 calendar days\b|\b₹500 per course\b|\bmore than 5%\b|\b75% overall attendance\b|\b80% minimum attendance\b|\bMarch 5\b|\b₹200\b|\bwithin 10 days\b)/gi,
    )

    return (
      <>
        {parts.map((part, i) => {
          if (
            /(\b15 calendar days\b|\b₹500 per course\b|\bmore than 5%\b|\b75% overall attendance\b|\b80% minimum attendance\b|\bMarch 5\b|\b₹200\b|\bwithin 10 days\b)/i.test(
              part,
            )
          ) {
            return (
              <strong key={i} className="highlighted-term">
                {part}
              </strong>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </>
    )
  }

  return (
    <div className="dashboard-card ai-conversation-card">
      <div className="card-top-header">
        <div className="header-title-with-icon">
          <div className="header-icon-bubble ai-bubble">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="card-title">Recent AI Conversations & Insights</h2>
            <p className="card-subtitle">Verified grounding from institutional records</p>
          </div>
        </div>

        <div className="live-sync-badge">
          <span className="live-sync-dot" />
          <span>Live Sync Active</span>
        </div>
      </div>

      <div className="conversation-thread-container">
        {conversation.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="chat-row user-row">
                <div className="chat-avatar student-avatar">AS</div>
                <div className="chat-bubble user-bubble">
                  <p>{msg.content}</p>
                </div>
              </div>
            )
          }

          return (
            <div key={msg.id} className="chat-row assistant-row">
              <div className="chat-avatar assistant-avatar">
                <Sparkles size={16} />
              </div>

              <div className="assistant-content-wrapper">
                <div className="chat-bubble assistant-bubble">
                  <p>{renderFormattedText(msg.content)}</p>
                </div>

                {/* Grounding & Citation Card */}
                <div className="citation-reference-box">
                  <div className="citation-left">
                    <ShieldCheck size={14} className="citation-icon" />
                    <span>
                      <strong>Retrieved:</strong>{" "}
                      {msg.citation || "Academic Handbook 2024-25 §16.3"}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="inspect-chunk-btn"
                    onClick={() =>
                      onInspectChunk(
                        msg.chunk || {
                          id: "chunk-reg-16-3",
                          title: "Academic Regulations 2024-25 § 16.3 (Re-evaluation)",
                          text: msg.content,
                        },
                        msg.citation,
                      )
                    }
                  >
                    <span>Inspect Vector Chunk</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {isLoading && (
          <div className="chat-row assistant-row">
            <div className="chat-avatar assistant-avatar">
              <Sparkles size={16} />
            </div>
            <div className="assistant-content-wrapper">
              <div className="chat-bubble assistant-bubble loading-bubble">
                <div className="chat-typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="querying-text">Querying campus vector store...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
