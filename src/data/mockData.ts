import type { NoticeItem, DeadlineItem, ShortcutItem, TicketItem, MessageItem } from "../types"

export const INITIAL_CONVERSATION: MessageItem[] = [
  {
    id: "init-1",
    role: "user",
    content: "What are the rules for re-evaluating end-sem papers?",
    timestamp: "10:42 AM",
  },
  {
    id: "init-2",
    role: "assistant",
    content:
      "As per university examination regulations, re-evaluation applications must be submitted via the student portal within 15 calendar days of mark sheet publication. A non-refundable scrutiny charge of ₹500 per course applies. Marks will be amended if the re-calculated score diverges by more than 5%.",
    timestamp: "10:42 AM",
    citation: "Retrieved: Academic Handbook 2024-25 §16.3",
    vectorScore: "0.942",
    chunk: {
      id: "chunk-reg-16-3",
      title: "Academic Regulations 2024-25 § 16.3 (Re-evaluation)",
      text: "Clause 16.3: A candidate who has appeared in any End-Semester Examination may apply for re-evaluation of theory answer scripts within 15 calendar days from the official date of mark sheet declaration. Application fee: ₹500/- per subject non-refundable. Re-evaluation is conducted by an independent external evaluator. If the difference in marks is > 5% of maximum marks, the revised score will be awarded in the official transcript.",
    },
  },
]

export const NOTICES: NoticeItem[] = [
  {
    id: "notice-1",
    code: "#UNI/2025/EXAM-104",
    tagColor: "purple",
    timeAgo: "Today, 10:30 AM",
    title: "Revision of Internal Assessment Schedule for B.Tech Semester IV & VI",
    snippet:
      "Due to the upcoming State University Sports Meet, the first continuous internal assessment (CIA-1) will be rescheduled from March 10 to March 18. Detailed subject-wise slots are attached.",
    issuer: "Issued by: Examination Cell",
    actionLabel: "PDF Document 📥",
    actionType: "pdf",
    fullContent: `UNIVERSITY EXAMINATION CELL
CIRCULAR NO: #UNI/2025/EXAM-104
Date: Spring Semester 2025

SUBJECT: Rescheduling of Continuous Internal Assessment 1 (CIA-1) for B.Tech Semester IV & VI

1. In view of the inter-university sports tournament and state athletic meet, the continuous internal evaluation CIA-1 stands rescheduled to commence on March 18, 2025.
2. Faculty members are requested to upload question banks on the ERP portal by March 12, 2025.
3. Students representing the university will be provided special compensatory test windows.`,
  },
  {
    id: "notice-2",
    code: "#UNI/2025/HOSTEL-42",
    tagColor: "red",
    timeAgo: "Yesterday",
    title: "Annual Sports Week Mess Rebate Instructions",
    snippet:
      "Hostellers participating in inter-university games may log in to apply for special mess fee waivers via the hostel portal before March 3.",
    issuer: "Chief Warden Office",
    actionLabel: "View Details →",
    actionType: "details",
    fullContent: `CHIEF WARDEN OFFICE
CIRCULAR REF: #UNI/2025/HOSTEL-42

SUBJECT: Mess Rebate Policy During Sports Week 2025

All hostel residents who will be away on official sports representation or certified leave for more than 4 consecutive days can claim a daily mess rebate of ₹180/day.
- Applications must be countersigned by the Sports Director.
- Submit hard copies or verify digital tokens in the Chief Warden portal before March 3.`,
  },
  {
    id: "notice-3",
    code: "#UNI/2025/LIB-19",
    tagColor: "green",
    timeAgo: "Feb 20, 2025",
    title: "24x7 Reading Hall Access During Mid-Terms",
    snippet:
      "Central Library Ground Floor reading zone remains functional round the clock with active Wi-Fi and cafeteria kiosk access starting Feb 25.",
    issuer: "Central Library Desk",
    actionLabel: "View Details →",
    actionType: "details",
    fullContent: `CENTRAL LIBRARY & LEARNING RESOURCE CENTER
CIRCULAR: #UNI/2025/LIB-19

SUBJECT: Extended Night Hours & Reading Hall Access for Mid-Semester Examinations

Starting Feb 25 through the conclusion of Mid-Term exams:
- Ground floor silent study bays will remain open 24x7.
- High-speed Eduroam APs have been boosted in Hall B and Hall C.
- Security checkpoints will require biometric ID cards for entry between 10:00 PM and 6:00 AM.
- Overnight coffee machine and snack kiosks in Block C courtyard will remain active.`,
  },
]

export const DEADLINES: DeadlineItem[] = [
  {
    id: "dl-1",
    month: "FEB",
    day: "28",
    color: "blue",
    title: "Mid-Semester Hall Ticket Rel...",
    dept: "Examination Cell",
    deptColor: "purple",
    desc: "Download digital admit card verified with biometric barcode",
    actionType: "download",
  },
  {
    id: "dl-2",
    month: "MAR",
    day: "05",
    color: "orange",
    title: "Fee Installment #2 Without Lat...",
    dept: "Accounts Dept",
    deptColor: "orange",
    desc: "Applicable for hostel accommodation & semester tuition",
    actionType: "pay",
  },
  {
    id: "dl-3",
    month: "MAR",
    day: "12",
    color: "purple",
    title: "Mini Project Milestone 1 Review",
    dept: "CSE Dept",
    deptColor: "blue",
    desc: "Submission of system design architecture & vector pipeline",
    actionType: "folder",
  },
]

export const SHORTCUTS: ShortcutItem[] = [
  {
    id: "sc-1",
    title: "Semester Grade Sheet",
    subtitle: "Instant digitally-signed transcript PDF",
    category: "grade",
    iconBg: "#eff6ff",
    iconColor: "#2563eb",
  },
  {
    id: "sc-2",
    title: "Bonafide Certificate",
    subtitle: "Generated with registrar QR watermark",
    category: "bonafide",
    iconBg: "#ecfdf5",
    iconColor: "#059669",
  },
  {
    id: "sc-3",
    title: "Wi-Fi & Eduroam Key",
    subtitle: "Reset WPA2 enterprise credentials",
    category: "wifi",
    iconBg: "#fff7ed",
    iconColor: "#ea580c",
  },
  {
    id: "sc-4",
    title: "Health Centre OPD",
    subtitle: "08:00 AM - 08:00 PM (24x7 Emergency)",
    category: "health",
    iconBg: "#fef2f2",
    iconColor: "#dc2626",
  },
]

export const TICKETS: TicketItem[] = [
  {
    id: "#US-849",
    subject: "Elective Credit Revision & Course Mapping",
    category: "Academic Records",
    status: "In Review",
    createdDate: "Feb 24, 2025",
    updatedAgo: "4 hours ago",
  },
  {
    id: "#US-812",
    subject: "Mess Card RFID Sync Issue in Hostel 5",
    category: "Hostel & Facilities",
    status: "Resolved",
    createdDate: "Feb 10, 2025",
    updatedAgo: "Resolved Feb 12",
  },
]

export const EXPLORE_PROMPTS = [
  {
    icon: "📚",
    query: "When is mid-sem exam fee due?",
  },
  {
    icon: "⚡",
    query: "Attendance criteria for 3rd sem",
  },
  {
    icon: "📋",
    query: "Procedure for hostel room change",
  },
]
