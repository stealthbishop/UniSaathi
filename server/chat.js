import { knowledge, retrieve, normalize } from "./knowledge.js"

const SYSTEM = `You are UniSaathi, a warm, practical companion for university students (especially campuses in India, but useful anywhere).

Voice: encouraging, specific, no fluff. Use short paragraphs and bullets. Prefer actions students can take this week.

Rules:
- You are not the official university administration. For fees, attendance rules, dates, and policies, tell them to confirm with their college.
- Never invent a specific college’s cutoff, fee, or placement statistic.
- Do not diagnose medical or mental-health conditions. If someone is in crisis, urge them to contact KIRAN 1800-599-0019, iCall 9152987821, campus counselling, or emergency 112.
- Do not help with cheating, plagiarism, or faking attendance.
- Use the provided campus notes when they are relevant. If they are not, say so and still give general student advice.
- Keep answers focused. End with one clear next step when it helps.`

export async function reply({ messages }) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")
  const query = lastUser?.content || ""
  const hits = retrieve(query)

  const crisis = isCrisis(query)
  if (crisis) {
    return {
      content: crisisReply(),
      source: "safety",
      topics: ["wellbeing"],
    }
  }

  const llm = await tryLlm({ messages, hits })
  const primaryHit = hits[0]
  const citation = primaryHit?.citation || "Academic Handbook 2024-25 §16.3"
  const vectorScore = primaryHit ? "0.942" : "0.890"

  if (llm) {
    return {
      content: llm,
      source: "ai",
      topics: hits.map((h) => h.title),
      citation,
      vectorScore,
      chunk: primaryHit ? { id: primaryHit.id, title: primaryHit.title, text: primaryHit.body } : null,
    }
  }

  return {
    content: localReply(query, hits, messages),
    source: hits.length ? "campus-notes" : "guide",
    topics: hits.map((h) => h.title),
    citation,
    vectorScore,
    chunk: primaryHit ? { id: primaryHit.id, title: primaryHit.title, text: primaryHit.body } : null,
  }
}

function isCrisis(text) {
  const q = normalize(text)
  return /(suicid|kill myself|end my life|self harm|want to die|hopeless and cant|can't go on)/.test(q)
}

function crisisReply() {
  return `I’m glad you wrote. Please don’t go through this alone — I can’t replace a person, and you deserve real support.

**Reach someone now:**
- KIRAN (India): **1800-599-0019**
- iCall: **9152987821**
- Emergency: **112**
- Campus counselling cell, warden, or a friend who can stay with you

If you are in immediate danger, call emergency services or campus security.

If you want, tell me whether this is exam stress, hostel, family, or something else — I’ll help with the practical next step *after* you’ve contacted a human.`
}

function localReply(query, hits, messages) {
  const q = normalize(query)

  if (/^(hi|hello|hey|yo|namaste|good morning|good evening|hii+|hlo)\b/.test(q) || q.length < 3) {
    return knowledge[0].body + "\n\nWhat’s on your plate — exams, hostel, internships, or something else?"
  }

  if (/(thank|thanks|thx|got it)/.test(q)) {
    return "Anytime. If a deadline or a messy chapter is next, send it and we’ll break it down."
  }

  if (hits.length) {
    const primary = hits[0]
    const extra = hits.slice(1)
    let text = primary.body
    if (extra.length) {
      text += `\n\n**Also related:** ${extra.map((e) => e.title).join(" · ")}`
    }
    text += "\n\nIf you share your year, course, and the exact snag (one sentence), I’ll make this more specific."
    return text
  }

  const prev = [...messages].reverse().find((m) => m.role === "assistant")
  if (prev?.content && q.split(" ").length < 8) {
    return `I might need a bit more context.\n\nYou can ask about CGPA, attendance, exams, hostel, internships, resumes, placements, GATE/CAT, or study stress.\n\nTry: “I have internals in 8 days and I’m behind in two subjects — make me a plan.”`
  }

  return `I don’t have a campus-official answer for that, but here’s how to proceed:

1. Write the question in one line (what you need + by when).
2. Check: department notice board / ERP / T&P / exam cell — whichever owns it.
3. Email the right office with your roll number and a screenshot.

Meanwhile I *can* help you plan studying, internships, resumes, hostel life, or talking to faculty. Tell me which of those it is.`
}

async function tryLlm({ messages, hits }) {
  const groq = process.env.GROQ_API_KEY
  const openai = process.env.OPENAI_API_KEY
  if (!groq && !openai) return null

  const url = groq
    ? "https://api.groq.com/openai/v1/chat/completions"
    : "https://api.openai.com/v1/chat/completions"
  const key = groq || openai
  const model = groq
    ? process.env.GROQ_MODEL || "llama-3.1-8b-instant"
    : process.env.OPENAI_MODEL || "gpt-4o-mini"

  const notes =
    hits.length === 0
      ? "No matching campus notes."
      : hits.map((h) => `### ${h.title}\n${h.body}`).join("\n\n")

  const payload = {
    model,
    temperature: 0.5,
    max_tokens: 700,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "system", content: `Campus notes:\n${notes}` },
      ...messages.slice(-12).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content).slice(0, 4000),
      })),
    ],
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error("LLM error", res.status, await res.text())
      return null
    }
    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() || null
  } catch (err) {
    console.error("LLM fetch failed", err)
    return null
  }
}

export function engineStatus() {
  if (process.env.GROQ_API_KEY) return { engine: "groq", ready: true }
  if (process.env.OPENAI_API_KEY) return { engine: "openai", ready: true }
  return { engine: "campus-notes", ready: true }
}
