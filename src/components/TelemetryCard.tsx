import { Database } from "lucide-react"

export function TelemetryCard() {
  return (
    <div className="dashboard-card telemetry-card">
      <div className="telemetry-card-header">
        <div className="telemetry-header-title">
          <Database size={15} className="telemetry-icon-dark" />
          <span>KNOWLEDGE BASE TELEMETRY</span>
        </div>
        <span className="telemetry-live-dot" />
      </div>

      <div className="telemetry-metrics-stack">
        <div className="telemetry-stat-row">
          <span className="telemetry-label">Vector Store Refresh:</span>
          <span className="telemetry-val highlight-purple">18 minutes ago</span>
        </div>

        <div className="telemetry-stat-row">
          <span className="telemetry-label">Indexed Academic Corpus:</span>
          <span className="telemetry-val bold-dark">
            1,482 PDF Circulars & Syllabi
          </span>
        </div>
      </div>
    </div>
  )
}
