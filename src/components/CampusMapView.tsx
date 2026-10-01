import { useState } from "react"
import { MapPin, Navigation, Clock, Phone, Building, Coffee, BookOpen } from "lucide-react"

interface CampusLocation {
  id: string
  name: string
  category: "Academic" | "Admin" | "Library" | "Hostel" | "Facility"
  zone: string
  hours: string
  contact: string
  description: string
}

const LOCATIONS: CampusLocation[] = [
  {
    id: "loc-1",
    name: "Administrative Block (Proctor & Registrar)",
    category: "Admin",
    zone: "Central Plaza, Sector 1",
    hours: "09:00 AM – 05:30 PM",
    contact: "Ext 101 / +91 11-2456-7890",
    description: "Proctor Office Room #204, Registrar Records, Degree Dispatches, Accounts Counter.",
  },
  {
    id: "loc-2",
    name: "Central Examination Hall & Evaluation Complex",
    category: "Academic",
    zone: "Block B, North Campus",
    hours: "08:30 AM – 06:00 PM (Exam Days)",
    contact: "Exam Controller: Ext 205",
    description: "Multi-tiered examination halls 1 to 8, CCTV surveillance cell, admit card validation.",
  },
  {
    id: "loc-3",
    name: "Dr. APJ Abdul Kalam Central Library",
    category: "Library",
    zone: "LRC Building, South Lawn",
    hours: "24x7 during Mid-Terms & Finals",
    contact: "Librarian Desk: Ext 312",
    description: "3 floors of study bays, IEEE/Springer e-library access terminal, Hall B & C reading zones.",
  },
  {
    id: "loc-4",
    name: "Campus Health Centre & OPD Emergency",
    category: "Facility",
    zone: "Sector 4, Adjacent to Hostel 3",
    hours: "08:00 AM – 08:00 PM (24x7 Ambulance)",
    contact: "Emergency speed dial: 102 / Ext 444",
    description: "Resident Medical Officer on duty, pharmacy counter, quarantine beds, ambulance bay.",
  },
  {
    id: "loc-5",
    name: "Hostel Complex & Chief Warden Office",
    category: "Hostel",
    zone: "Hostel Enclave West",
    hours: "Curfew: 10:30 PM (Biometric entry)",
    contact: "Warden Office: Ext 505",
    description: "Hostels 1–6, Central Mess Dining Halls, Laundry kiosks, Indoor Badminton court.",
  },
]

export function CampusMapView() {
  const [selectedLoc, setSelectedLoc] = useState<CampusLocation>(LOCATIONS[0])
  const [filter, setFilter] = useState<string>("All")

  const filtered = LOCATIONS.filter(
    (l) => filter === "All" || l.category === filter,
  )

  return (
    <div className="campus-map-view">
      <div className="map-view-header">
        <div>
          <h2>Interactive Campus Navigation & Facilities</h2>
          <p>Real-time operating hours, contact extensions, and indoor zones</p>
        </div>

        <div className="map-filter-pills">
          {["All", "Academic", "Admin", "Library", "Hostel", "Facility"].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                className={`map-filter-chip ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="map-main-grid">
        {/* Left Interactive Location Selector */}
        <div className="locations-list-pane">
          {filtered.map((loc) => (
            <div
              key={loc.id}
              className={`location-card-unit ${
                selectedLoc.id === loc.id ? "selected" : ""
              }`}
              onClick={() => setSelectedLoc(loc)}
            >
              <div className="loc-card-top">
                <span className="loc-title">{loc.name}</span>
                <span className="loc-badge">{loc.category}</span>
              </div>
              <p className="loc-zone">
                <MapPin size={13} /> {loc.zone}
              </p>
              <div className="loc-card-footer">
                <span>
                  <Clock size={12} /> {loc.hours}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Simulated Interactive Map Canvas */}
        <div className="map-canvas-pane">
          <div className="simulated-map-display">
            <div className="map-grid-overlay" />
            
            {/* Visual Markers */}
            <div className="map-marker-pin marker-admin" title="Admin Block">
              <Building size={16} />
              <span>Admin Block</span>
            </div>
            <div className="map-marker-pin marker-exam" title="Exam Cell">
              <BookOpen size={16} />
              <span>Exam Cell</span>
            </div>
            <div className="map-marker-pin marker-library" title="Central Library">
              <BookOpen size={16} />
              <span>Central Library</span>
            </div>
            <div className="map-marker-pin marker-hostel" title="Hostels & Mess">
              <Coffee size={16} />
              <span>Hostels & Mess</span>
            </div>

            {/* Selected Location Card Floating Box */}
            <div className="selected-location-hud">
              <div className="hud-header">
                <Navigation size={18} className="hud-nav-icon" />
                <div>
                  <h4>{selectedLoc.name}</h4>
                  <span className="hud-zone">{selectedLoc.zone}</span>
                </div>
              </div>
              <p className="hud-desc">{selectedLoc.description}</p>
              <div className="hud-meta-row">
                <span>
                  <Clock size={13} /> {selectedLoc.hours}
                </span>
                <span>
                  <Phone size={13} /> {selectedLoc.contact}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
