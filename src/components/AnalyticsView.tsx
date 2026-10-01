import { Database, Shield, Zap } from "lucide-react"

export function AnalyticsView() {
  return (
    <div className="analytics-view-container">
      <div className="analytics-header">
        <div>
          <h2>Vector Analytics & Retrieval Metrics</h2>
          <p>Real-time RAG pipeline grounding verification & query telemetry</p>
        </div>
      </div>

      <div className="analytics-stat-cards">
        <div className="stat-metric-card">
          <div className="metric-top">
            <span className="metric-label">Vector Index Health</span>
            <Database size={16} className="text-purple" />
          </div>
          <div className="metric-num">99.4%</div>
          <span className="metric-sub green">Optimal chunk density</span>
        </div>

        <div className="stat-metric-card">
          <div className="metric-top">
            <span className="metric-label">P95 Response Latency</span>
            <Zap size={16} className="text-orange" />
          </div>
          <div className="metric-num">0.42s</div>
          <span className="metric-sub green">Fast semantic lookup</span>
        </div>

        <div className="stat-metric-card">
          <div className="metric-top">
            <span className="metric-label">Grounding Accuracy</span>
            <Shield size={16} className="text-blue" />
          </div>
          <div className="metric-num">100%</div>
          <span className="metric-sub green">Registrar certified citations</span>
        </div>
      </div>

      <div className="analytics-charts-grid">
        <div className="chart-box">
          <h3>Query Categories (Last 30 Days)</h3>
          <div className="bar-stat-group">
            <div className="bar-row">
              <span className="bar-label">Examination & Re-eval</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "42%" }} />
              </div>
              <span className="bar-pct">42%</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Attendance & Detentions</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "28%" }} />
              </div>
              <span className="bar-pct">28%</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Hostel & Mess Rebates</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "18%" }} />
              </div>
              <span className="bar-pct">18%</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Internships & Placements</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "12%" }} />
              </div>
              <span className="bar-pct">12%</span>
            </div>
          </div>
        </div>

        <div className="chart-box">
          <h3>Vector Embedding Chunks Synced</h3>
          <div className="corpus-summary-list">
            <div className="corpus-row">
              <span>Academic Regulations Handbook (UG)</span>
              <strong>342 Chunks</strong>
            </div>
            <div className="corpus-row">
              <span>Examination Cell Directives & Circulars</span>
              <strong>510 Chunks</strong>
            </div>
            <div className="corpus-row">
              <span>Hostel Resident Manual & Curfew Rules</span>
              <strong>280 Chunks</strong>
            </div>
            <div className="corpus-row">
              <span>Department Curricula & Syllabus PDFs</span>
              <strong>350 Chunks</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
