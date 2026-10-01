import "dotenv/config"
import cors from "cors"
import express from "express"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { engineStatus, reply } from "./chat.js"

const app = express()
const port = Number(process.env.PORT) || 8787
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, "..", "dist")

app.use(cors())
app.use(express.json({ limit: "1mb" }))

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ...engineStatus(), name: "UniSaathi" })
})

app.post("/api/chat", async (req, res) => {
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : []
  const cleaned = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-16)

  if (!cleaned.length || cleaned.at(-1)?.role !== "user") {
    return res.status(400).json({ error: "Send a user message." })
  }

  try {
    const result = await reply({ messages: cleaned })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "UniSaathi hit a snag. Try again in a moment." })
  }
})

if (fs.existsSync(path.join(dist, "index.html"))) {
  app.use(express.static(dist))
  app.use((_req, res) => {
    res.sendFile(path.join(dist, "index.html"))
  })
}

app.listen(port, () => {
  console.log(`UniSaathi API on http://localhost:${port}`)
})
