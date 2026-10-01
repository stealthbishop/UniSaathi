export type NavTab =
  | "dashboard"
  | "studio"
  | "knowledge"
  | "map"
  | "helpdesk"
  | "analytics"
  | "clubs"

export interface MessageItem {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  citation?: string
  vectorScore?: string
  chunk?: {
    id: string
    title: string
    text: string
  }
}

export interface NoticeItem {
  id: string
  code: string
  tagColor: "purple" | "red" | "green"
  title: string
  snippet: string
  issuer: string
  timeAgo: string
  actionLabel: string
  actionType: "pdf" | "details"
  fullContent?: string
}

export interface DeadlineItem {
  id: string
  month: string
  day: string
  color: "blue" | "orange" | "purple"
  title: string
  dept: string
  deptColor: "purple" | "orange" | "blue"
  desc: string
  actionType: "download" | "pay" | "folder"
}

export interface ShortcutItem {
  id: string
  title: string
  subtitle: string
  category: "grade" | "bonafide" | "wifi" | "health"
  iconBg: string
  iconColor: string
}

export interface TicketItem {
  id: string
  subject: string
  category: string
  status: "In Review" | "Resolved" | "Open"
  createdDate: string
  updatedAgo: string
}
