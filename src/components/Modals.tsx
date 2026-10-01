import { useState } from "react"
import {
  X,
  ShieldCheck,
  Download,
  Copy,
  Check,
  QrCode,
  Wifi,
  PhoneCall,
  AlertTriangle,
  Layers,
  FileCheck2,
} from "lucide-react"
import type { NoticeItem, MessageItem } from "../types"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function BaseModal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar">
          <h3 className="modal-title">{title}</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-scroll-body">{children}</div>
      </div>
    </div>
  )
}

// 1. Vector Chunk Inspector Modal
export function VectorChunkModal({
  isOpen,
  onClose,
  chunk,
  citation,
}: {
  isOpen: boolean
  onClose: () => void
  chunk?: MessageItem["chunk"]
  citation?: string
}) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const chunkId = chunk?.id || "chunk-reg-16-3"
  const chunkTitle =
    chunk?.title || "Academic Regulations 2024-25 § 16.3 (Re-evaluation)"
  const chunkText =
    chunk?.text ||
    "Clause 16.3: A candidate who has appeared in any End-Semester Examination may apply for re-evaluation of theory answer scripts within 15 calendar days from the official date of mark sheet declaration. Application fee: ₹500/- per subject non-refundable. Re-evaluation is conducted by an independent external evaluator. If the difference in marks is > 5% of maximum marks, the revised score will be awarded in the official transcript."

  function handleCopy() {
    navigator.clipboard.writeText(chunkText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Vector Embeddings Chunk Inspector">
      <div className="vector-inspector-content">
        <div className="inspector-meta-grid">
          <div className="inspector-meta-item">
            <span className="meta-k">Source Document</span>
            <span className="meta-v">
              {citation?.replace("Retrieved: ", "") || "Academic Handbook 2024-25 §16.3"}
            </span>
          </div>
          <div className="inspector-meta-item">
            <span className="meta-k">Chunk ID</span>
            <span className="meta-v mono">{chunkId}</span>
          </div>
          <div className="inspector-meta-item">
            <span className="meta-k">Cosine Similarity</span>
            <span className="meta-v green-bold">0.942 (Strong Grounding)</span>
          </div>
          <div className="inspector-meta-item">
            <span className="meta-k">Embedding Model</span>
            <span className="meta-v mono">text-embedding-3-small</span>
          </div>
        </div>

        <div className="chunk-text-box">
          <div className="chunk-box-header">
            <div className="chunk-title-group">
              <Layers size={14} className="chunk-icon" />
              <span>{chunkTitle}</span>
            </div>
            <button
              type="button"
              className="copy-chunk-btn"
              onClick={handleCopy}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy Raw Chunk"}</span>
            </button>
          </div>
          <pre className="chunk-preformatted">{chunkText}</pre>
        </div>

        <div className="inspector-verified-banner">
          <ShieldCheck size={18} className="shield-icon" />
          <div>
            <strong>Digitally Verified by Office of the Registrar</strong>
            <p>
              This chunk is actively synced with the University Academic Senate
              Resolution #AS-2024/92.
            </p>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

// 2. Official Notice Viewer Modal
export function NoticeModal({
  isOpen,
  onClose,
  notice,
}: {
  isOpen: boolean
  onClose: () => void
  notice: NoticeItem | null
}) {
  if (!isOpen || !notice) return null

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={notice.code}>
      <div className="notice-modal-view">
        <div className="notice-header-band">
          <span className={`notice-ref-badge ${notice.tagColor}`}>
            {notice.code}
          </span>
          <span className="notice-date-text">{notice.timeAgo}</span>
        </div>

        <h2 className="notice-modal-heading">{notice.title}</h2>
        <div className="notice-modal-issuer">
          <strong>{notice.issuer}</strong>
        </div>

        <div className="notice-official-paper">
          <p className="notice-formal-body">
            {notice.fullContent || notice.snippet}
          </p>
        </div>

        <div className="notice-modal-actions">
          <button
            type="button"
            className="action-btn primary"
            onClick={() => {
              alert(`Downloading official PDF for ${notice.code}...`)
            }}
          >
            <Download size={15} />
            <span>Download Official Signed PDF</span>
          </button>
          <button type="button" className="action-btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

// 3. Semester Grade Sheet Modal
export function GradeSheetModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Digital Grade Sheet (Unofficial Transcript)">
      <div className="grade-sheet-container">
        <div className="transcript-header">
          <div className="college-crest-title">
            <h3>CENTRAL INSTITUTE OF TECHNOLOGY</h3>
            <p>Office of the Controller of Examinations</p>
          </div>
          <div className="transcript-student-meta">
            <div>
              <strong>Student:</strong> Aarav Sharma
            </div>
            <div>
              <strong>Roll No:</strong> 22CSE084
            </div>
            <div>
              <strong>Programme:</strong> B.Tech Computer Science & Engg
            </div>
            <div>
              <strong>Current CGPA:</strong> <span className="highlight-cgpa">8.64</span>
            </div>
          </div>
        </div>

        <table className="transcript-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credits</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS301</td>
              <td>Design & Analysis of Algorithms</td>
              <td>4</td>
              <td><span className="grade-pill high">A+</span></td>
              <td>Passed</td>
            </tr>
            <tr>
              <td>CS302</td>
              <td>Database Management Systems</td>
              <td>4</td>
              <td><span className="grade-pill high">O</span></td>
              <td>Passed</td>
            </tr>
            <tr>
              <td>CS303</td>
              <td>Operating Systems & Kernel Dev</td>
              <td>4</td>
              <td><span className="grade-pill mid">A</span></td>
              <td>Passed</td>
            </tr>
            <tr>
              <td>CS304</td>
              <td>Artificial Intelligence & RAG</td>
              <td>3</td>
              <td><span className="grade-pill high">O</span></td>
              <td>Passed</td>
            </tr>
            <tr>
              <td>CS305P</td>
              <td>Algorithms Lab</td>
              <td>2</td>
              <td><span className="grade-pill high">O</span></td>
              <td>Passed</td>
            </tr>
          </tbody>
        </table>

        <div className="transcript-footer">
          <div className="qr-box">
            <QrCode size={40} />
            <span>Scan to verify digital signature</span>
          </div>
          <button
            type="button"
            className="action-btn primary"
            onClick={() => alert("Downloading Digitally Signed Grade Sheet PDF...")}
          >
            <Download size={15} /> Download Signed PDF
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

// 4. Bonafide Certificate Modal
export function BonafideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Bonafide Certificate Generator">
      <div className="bonafide-container">
        <div className="bonafide-paper">
          <div className="bonafide-crest">
            <h4>OFFICE OF THE REGISTRAR</h4>
            <span>CENTRAL INSTITUTE OF TECHNOLOGY</span>
          </div>

          <div className="bonafide-seal-ref">
            <span>Ref: CIT/REG/BONA/2025/1192</span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>

          <h3 className="bonafide-title">BONAFIDE STUDENT CERTIFICATE</h3>

          <p className="bonafide-body-text">
            This is to certify that <strong>Aarav Sharma</strong>, Roll Number{" "}
            <strong>22CSE084</strong>, Son/Daughter of Mr. Rajesh Sharma, is a
            bonafide regular student of this Institute pursuing Bachelor of
            Technology in <strong>Computer Science & Engineering</strong>, currently
            enrolled in <strong>Semester VI (Year 3)</strong> for the Academic Year
            2024–2025.
          </p>

          <p className="bonafide-body-text">
            His/Her general conduct, character, and institutional discipline have
            been found to be <strong>EXEMPLARY</strong>. This certificate is issued
            upon student request for internship verification, passport/visa, and
            bank loan procedures.
          </p>

          <div className="bonafide-signature-row">
            <div className="registrar-seal">
              <FileCheck2 size={36} className="seal-icon" />
              <span>Digital Watermark Verified</span>
            </div>
            <div className="registrar-sign">
              <div className="sig-line">Dr. P. K. Srivastava</div>
              <span>Registrar & Academic Dean</span>
            </div>
          </div>
        </div>

        <div className="modal-actions-right">
          <button
            type="button"
            className="action-btn primary"
            onClick={() => alert("Downloading Authenticated Bonafide PDF...")}
          >
            <Download size={15} />
            <span>Download Authenticated PDF</span>
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

// 5. WiFi & Eduroam Credentials Modal
export function WifiKeyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [passphrase, setPassphrase] = useState("aarav.cit@2025-wifi")

  if (!isOpen) return null

  function handleReset() {
    const newPass = `aarav-${Math.random().toString(36).slice(2, 8)}-cit`
    setPassphrase(newPass)
    alert("New WPA2 Enterprise key generated! Connecting in 30 seconds.")
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Wi-Fi & Eduroam Enterprise Portal">
      <div className="wifi-modal-content">
        <div className="wifi-status-card">
          <Wifi size={24} className="wifi-icon active" />
          <div>
            <strong>Campus 5GHz & Eduroam Global Network</strong>
            <p>Access Granted: High-Speed Tier (300 Mbps)</p>
          </div>
        </div>

        <div className="cred-box">
          <label>WPA2 Enterprise Identity / Username</label>
          <div className="cred-input-wrap">
            <input type="text" readOnly value="22cse084@campus.edu.in" />
          </div>

          <label>Enterprise Passphrase Key</label>
          <div className="cred-input-wrap">
            <input type="text" readOnly value={passphrase} />
            <button
              type="button"
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(passphrase)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="wifi-modal-buttons">
          <button
            type="button"
            className="action-btn secondary"
            onClick={handleReset}
          >
            Reset WPA2 Key
          </button>
          <button type="button" className="action-btn primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

// 6. SOS Emergency Modal
export function SosModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Campus Emergency & SOS Speed Dial">
      <div className="sos-modal-content">
        <div className="sos-banner-alert">
          <AlertTriangle size={24} />
          <div>
            <strong>24x7 Zero-Tolerance Anti-Ragging & Campus Safety</strong>
            <p>Any distress call is immediately routed with GPS priority dispatch.</p>
          </div>
        </div>

        <div className="sos-numbers-list">
          <div className="sos-contact-item critical">
            <div>
              <strong>National Anti-Ragging Toll-Free</strong>
              <span>Ministry of Education 24x7</span>
            </div>
            <a href="tel:18001805522" className="sos-dial-btn">
              <PhoneCall size={14} /> 1800-180-5522
            </a>
          </div>

          <div className="sos-contact-item">
            <div>
              <strong>Chief Security Officer (Campus Control)</strong>
              <span>Main Gate & Patrol Vehicles</span>
            </div>
            <a href="tel:01124567890" className="sos-dial-btn blue">
              <PhoneCall size={14} /> +91 11-2456-7890
            </a>
          </div>

          <div className="sos-contact-item">
            <div>
              <strong>Campus Ambulance & OPD Emergency</strong>
              <span>Health Centre Sector 4</span>
            </div>
            <a href="tel:102" className="sos-dial-btn green">
              <PhoneCall size={14} /> Dial 102 / Ext 444
            </a>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

// 7. Raise Ticket Modal
export function RaiseTicketModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [subject, setSubject] = useState("")
  const [dept, setDept] = useState("Academic Records")
  const [desc, setDesc] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      alert("Ticket #US-850 created successfully! Assigned to Helpdesk.")
    }, 1200)
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Raise Support Ticket">
      <form className="raise-ticket-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Department / Category</label>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="Academic Records">Academic Records & Electives</option>
            <option value="Examination Cell">Examination Cell & Admit Card</option>
            <option value="Hostel & Mess">Hostel & Mess Facilities</option>
            <option value="IT & ERP">IT Services & Student ERP Portal</option>
          </select>
        </div>

        <div className="form-field">
          <label>Subject / Snag Summary</label>
          <input
            type="text"
            required
            placeholder="E.g., Elective course mapping not updating in portal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Description & Evidence Details</label>
          <textarea
            rows={4}
            required
            placeholder="Explain the issue clearly with course code or room number..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="modal-actions-right">
          <button type="button" className="action-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="action-btn primary"
            disabled={submitted || !subject.trim()}
          >
            {submitted ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </BaseModal>
  )
}
