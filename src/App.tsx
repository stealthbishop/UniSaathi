import { useState, useEffect } from "react"
import { TopNav } from "./components/TopNav"
import { Sidebar } from "./components/Sidebar"
import { HeroSection } from "./components/HeroSection"
import { KpiStats } from "./components/KpiStats"
import { AiConversations } from "./components/AiConversations"
import { DeadlinesCard } from "./components/DeadlinesCard"
import { QuickShortcuts } from "./components/QuickShortcuts"
import { RegistrarNotices } from "./components/RegistrarNotices"
import { CampusHelpline } from "./components/CampusHelpline"
import { TelemetryCard } from "./components/TelemetryCard"
import {
  VectorChunkModal,
  NoticeModal,
  GradeSheetModal,
  BonafideModal,
  WifiKeyModal,
  SosModal,
  RaiseTicketModal,
  BaseModal,
} from "./components/Modals"
import { CommandPalette } from "./components/CommandPalette"
import { AiStudioView } from "./components/AiStudioView"
import { CampusMapView } from "./components/CampusMapView"
import { CircularsView } from "./components/CircularsView"
import { TicketsView } from "./components/TicketsView"
import { AnalyticsView } from "./components/AnalyticsView"
import { StudyClubsView } from "./components/StudyClubsView"

import { INITIAL_CONVERSATION } from "./data/mockData"
import type { NavTab, MessageItem, NoticeItem } from "./types"
import "./App.css"

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("dashboard")
  const [conversation, setConversation] = useState<MessageItem[]>(INITIAL_CONVERSATION)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Modals state
  const [showChunkModal, setShowChunkModal] = useState(false)
  const [selectedChunk, setSelectedChunk] = useState<MessageItem["chunk"] | undefined>(
    INITIAL_CONVERSATION[1]?.chunk,
  )
  const [selectedCitation, setSelectedCitation] = useState<string | undefined>(
    INITIAL_CONVERSATION[1]?.citation,
  )

  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null)
  const [showGradeSheet, setShowGradeSheet] = useState(false)
  const [showBonafide, setShowBonafide] = useState(false)
  const [showWifiKey, setShowWifiKey] = useState(false)
  const [showSos, setShowSos] = useState(false)
  const [showRaiseTicket, setShowRaiseTicket] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  // Global keyboard shortcut for Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowCommandPalette((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Send question to backend API with fallback
  async function handleAskQuestion(queryText: string) {
    const trimmed = queryText.trim()
    if (!trimmed || isSubmitting) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const userMessage: MessageItem = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: timeStr,
    }

    const updatedThread = [...conversation, userMessage]
    setConversation(updatedThread)
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedThread.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) throw new Error("Server response was not ok")
      const data = await res.json()

      const assistantMessage: MessageItem = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content:
          data.content ||
          "As per university guidelines, please consult the examination and registrar office for authenticated clarification.",
        timestamp: timeStr,
        citation: data.citation || "Retrieved: Academic Regulations Handbook 2024-25",
        vectorScore: data.vectorScore || "0.942",
        chunk: data.chunk || {
          id: "chunk-auto",
          title: data.topics?.[0] || "University Academic Regulation",
          text: data.content,
        },
      }

      setConversation((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.warn("Using offline knowledge grounding fallback:", err)
      // Intelligent fallback grounded in campus rules
      let answer =
        "As per university examination regulations, re-evaluation applications must be submitted via the student portal within 15 calendar days of mark sheet publication. A non-refundable scrutiny charge of ₹500 per course applies. Marks will be amended if the re-calculated score diverges by more than 5%."
      let citation = "Retrieved: Academic Handbook 2024-25 §16.3"

      const q = trimmed.toLowerCase()
      if (q.includes("mid-sem exam fee") || q.includes("fee due")) {
        answer =
          "Mid-Semester examination fee payment window closes on March 5 without late fine. An additional late fee penalty of ₹200 applies until March 10. Check the Student Accounts Portal under Exam Clearance."
        citation = "Retrieved: Examination Cell Circular #UNI/2025/EXAM-104"
      } else if (q.includes("attendance") || q.includes("3rd sem")) {
        answer =
          "A mandatory minimum of 75% overall attendance is required, with a strict 80% minimum attendance in practical lab sessions. Students below 75% in lab sessions will not be issued digital hall tickets without approved medical condonation."
        citation = "Retrieved: Academic Regulations Manual Sec 4.2"
      } else if (q.includes("hostel")) {
        answer =
          "Hostel room change requests can be initiated through the Chief Warden Portal during the designated transfer window (within 10 days of semester commencement). Mutual room swaps require written consent from both roommates."
        citation = "Retrieved: Hostel & Residence Manual 2024-25 Rule 8"
      }

      const fallbackAssistantMessage: MessageItem = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: answer,
        timestamp: timeStr,
        citation: citation,
        vectorScore: "0.942",
        chunk: {
          id: "chunk-reg-fallback",
          title: "Official Campus Policy & Regulation Manual",
          text: answer,
        },
      }

      setConversation((prev) => [...prev, fallbackAssistantMessage])
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleInspectChunk(
    chunk?: MessageItem["chunk"],
    citation?: string,
  ) {
    setSelectedChunk(chunk)
    setSelectedCitation(citation)
    setShowChunkModal(true)
  }

  function handleShortcutClick(category: string, title: string) {
    if (category === "grade") setShowGradeSheet(true)
    else if (category === "bonafide") setShowBonafide(true)
    else if (category === "wifi") setShowWifiKey(true)
    else if (category === "health") {
      alert("Campus Health Centre OPD is open 08:00 AM - 08:00 PM. Emergency Ambulance 24x7: Call Ext 444.")
    } else {
      alert(`Opening ${title}...`)
    }
  }

  function handleDeadlineAction(title: string, actionType: string) {
    if (actionType === "download") {
      alert(`Downloading digital admit card for ${title}...`)
    } else if (actionType === "pay") {
      alert("Redirecting to Student ERP Fee Gateway with 0% transaction fee...")
    } else if (actionType === "folder") {
      alert("Opening Mini Project Milestone 1 submission repository...")
    }
  }

  return (
    <div className="unisaathi-app-layout">
      {/* Top Navigation Bar */}
      <TopNav
        onSearchClick={() => setShowCommandPalette(true)}
        onOpenNotifications={() => {}}
        onOpenProfile={() => {}}
        onToggleSidebar={() => setMobileMenuOpen((prev) => !prev)}
      />

      <div className="app-body-container">
        {/* Left Docked Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="main-viewport">
          {currentTab === "dashboard" && (
            <div className="dashboard-content-flow">
              {/* Deep Indigo Hero Card with Floating Prompt */}
              <HeroSection
                onAsk={handleAskQuestion}
                isSubmitting={isSubmitting}
              />

              {/* 4 Metric / KPI Cards */}
              <KpiStats
                onOpenNotices={() => setCurrentTab("knowledge")}
                onOpenTickets={() => setCurrentTab("helpdesk")}
              />

              {/* Two Column Grid */}
              <div className="dashboard-two-column-layout">
                {/* Left Column */}
                <div className="dashboard-col left-col">
                  {/* Recent AI Conversations & Grounded Insights */}
                  <AiConversations
                    conversation={conversation}
                    isLoading={isSubmitting}
                    onInspectChunk={handleInspectChunk}
                  />

                  {/* Upcoming Deadlines & Milestones */}
                  <DeadlinesCard
                    onOpenCalendar={() => setShowCalendarModal(true)}
                    onActionClick={handleDeadlineAction}
                  />

                  {/* Campus Quick Shortcuts */}
                  <QuickShortcuts onShortcutClick={handleShortcutClick} />
                </div>

                {/* Right Column */}
                <div className="dashboard-col right-col">
                  {/* Pinned Registrar Notices */}
                  <RegistrarNotices
                    onOpenNoticeModal={(notice) => setActiveNotice(notice)}
                    onViewAllNotices={() => setCurrentTab("knowledge")}
                  />

                  {/* Campus Helpline & Escalation */}
                  <CampusHelpline
                    onCallProctor={() => {
                      alert("Connecting to Student Proctor Office Room #204: +91 11-2456-7890 (Ext 101)")
                    }}
                    onSosCall={() => setShowSos(true)}
                    onRaiseTicket={() => setShowRaiseTicket(true)}
                  />

                  {/* Knowledge Base Telemetry */}
                  <TelemetryCard />
                </div>
              </div>
            </div>
          )}

          {currentTab === "studio" && (
            <AiStudioView
              conversation={conversation}
              onSendMessage={handleAskQuestion}
              isBusy={isSubmitting}
              onInspectChunk={handleInspectChunk}
            />
          )}

          {currentTab === "knowledge" && (
            <CircularsView
              onOpenNotice={(notice) => setActiveNotice(notice)}
            />
          )}

          {currentTab === "map" && <CampusMapView />}

          {currentTab === "helpdesk" && (
            <TicketsView onOpenRaiseModal={() => setShowRaiseTicket(true)} />
          )}

          {currentTab === "analytics" && <AnalyticsView />}

          {currentTab === "clubs" && <StudyClubsView />}
        </main>
      </div>

      {/* Interactive Modals */}
      <VectorChunkModal
        isOpen={showChunkModal}
        onClose={() => setShowChunkModal(false)}
        chunk={selectedChunk}
        citation={selectedCitation}
      />

      <NoticeModal
        isOpen={!!activeNotice}
        onClose={() => setActiveNotice(null)}
        notice={activeNotice}
      />

      <GradeSheetModal
        isOpen={showGradeSheet}
        onClose={() => setShowGradeSheet(false)}
      />

      <BonafideModal
        isOpen={showBonafide}
        onClose={() => setShowBonafide(false)}
      />

      <WifiKeyModal
        isOpen={showWifiKey}
        onClose={() => setShowWifiKey(false)}
      />

      <SosModal isOpen={showSos} onClose={() => setShowSos(false)} />

      <RaiseTicketModal
        isOpen={showRaiseTicket}
        onClose={() => setShowRaiseTicket(false)}
      />

      {/* Full Academic Calendar Modal */}
      <BaseModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        title="Spring 2025 Semester Academic Calendar"
      >
        <div className="academic-calendar-view">
          <div className="calendar-month-block">
            <h4>February 2025</h4>
            <div className="calendar-event-row">
              <span className="cal-day blue">Feb 25</span>
              <div>
                <strong>24x7 Library Reading Hall Active</strong>
                <p>Ground floor study bays operational round the clock</p>
              </div>
            </div>
            <div className="calendar-event-row">
              <span className="cal-day blue">Feb 28</span>
              <div>
                <strong>Mid-Semester Hall Ticket Release</strong>
                <p>Admit card biometric validation on ERP portal</p>
              </div>
            </div>
          </div>

          <div className="calendar-month-block">
            <h4>March 2025</h4>
            <div className="calendar-event-row">
              <span className="cal-day orange">Mar 05</span>
              <div>
                <strong>Fee Installment #2 Due (Without Late Fee)</strong>
                <p>Semester tuition and hostel fee clearance window</p>
              </div>
            </div>
            <div className="calendar-event-row">
              <span className="cal-day purple">Mar 12</span>
              <div>
                <strong>Mini Project Milestone 1 Review</strong>
                <p>CSE Department internal presentation & architecture viva</p>
              </div>
            </div>
            <div className="calendar-event-row">
              <span className="cal-day purple">Mar 18</span>
              <div>
                <strong>Rescheduled CIA-1 Examination Starts</strong>
                <p>Subject wise continuous internal assessments commence</p>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>

      {/* Global Command Search Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectAction={(query) => {
          if (query === "Semester Grade Sheet") {
            setShowGradeSheet(true)
          } else if (query === "Bonafide Certificate") {
            setShowBonafide(true)
          } else {
            handleAskQuestion(query)
          }
        }}
      />
    </div>
  )
}
