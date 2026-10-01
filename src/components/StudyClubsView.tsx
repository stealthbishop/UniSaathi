import { Users, BookOpen, Laptop, Trophy, Plus } from "lucide-react"

const CLUBS = [
  {
    id: "club-1",
    name: "CSE Algorithmic Problem Solving (LeetCode / DSA)",
    category: "Coding & Competitive",
    members: 142,
    activeTopic: "Dynamic Programming on Trees & Graphs",
    icon: Laptop,
    badge: "Active Sprints",
  },
  {
    id: "club-2",
    name: "GATE CSE 2026 Focus Circle",
    category: "Higher Studies",
    members: 89,
    activeTopic: "Theory of Computation & Compiler Design",
    icon: BookOpen,
    badge: "Daily Mock Tests",
  },
  {
    id: "club-3",
    name: "AI & Vector Search Lab Collab",
    category: "Research & Projects",
    members: 64,
    activeTopic: "Building Local RAG with Llama 3 & Qdrant",
    icon: Trophy,
    badge: "Hackathon Team Open",
  },
]

export function StudyClubsView() {
  return (
    <div className="study-clubs-view">
      <div className="clubs-top-bar">
        <div>
          <h2>Study Clubs & Peer Collaboration</h2>
          <p>Connect with branch peers, share class notes, and form project teams</p>
        </div>

        <button
          type="button"
          className="action-btn primary"
          onClick={() => alert("Creating a new study group room...")}
        >
          <Plus size={16} />
          <span>Create New Study Room</span>
        </button>
      </div>

      <div className="clubs-grid">
        {CLUBS.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.id} className="club-card-unit">
              <div className="club-card-header">
                <div className="club-icon-wrap">
                  <Icon size={18} />
                </div>
                <span className="club-badge-tag">{c.badge}</span>
              </div>

              <h3 className="club-name">{c.name}</h3>
              <p className="club-category">{c.category}</p>

              <div className="club-active-topic">
                <strong>Current Focus:</strong> {c.activeTopic}
              </div>

              <div className="club-card-footer">
                <span className="members-count">
                  <Users size={14} /> {c.members} Active Students
                </span>
                <button
                  type="button"
                  className="action-btn secondary small"
                  onClick={() => alert(`Joined ${c.name}!`)}
                >
                  Join Room
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
