<!-- UniSaathi | campus support · AI · student-first design -->

<div align="center">

# 🎓 UniSaathi

### Your campus. Your questions. One helpful companion.

**A student-focused campus assistant for finding university information, navigating campus resources, and getting answers to everyday academic questions.**

<br />

[Explore the repository](https://github.com/stealthbishop/UniSaathi) · [Report a bug](https://github.com/stealthbishop/UniSaathi/issues) · [Request a feature](https://github.com/stealthbishop/UniSaathi/issues)

<br />

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge-Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/API-Express-111827?style=flat-square&logo=express&logoColor=white)

</div>

---

## 🌱 About UniSaathi

University life comes with a lot of questions: exam rules, grades, hostel information, campus services, notices, deadlines, and where to find the right office. **UniSaathi** is a campus companion concept designed to bring these resources together in one student-friendly interface.

The repository includes a React + TypeScript dashboard and a Node.js/Express API for campus Q&A. The chat service can use configured Groq or OpenAI-compatible models and can fall back to built-in campus knowledge when no provider key is configured.

> **Project status:** In development. The dashboard includes demonstration content, and some views may use mock data. Verify important university policies with official university sources.

## ✨ Explore the experience

- **Campus Q&A** — ask questions about university life and get answers through the chat API.
- **Knowledge-grounded responses** — responses can include supporting citation and source-chunk information when returned by the server.
- **Academic dashboard** — quick access to grade-sheet information, deadlines, and campus notices.
- **Campus map view** — a dedicated view for campus navigation concepts.
- **Circulars and notices** — a space to browse registrar notices and university updates.
- **Student support tools** — UI flows for campus helplines, SOS information, and raising a ticket.
- **AI Studio** — a dedicated area for exploring the assistant and its knowledge context.
- **Command palette** — use `Ctrl + K` or `Cmd + K` to open quick navigation.
- **Responsive navigation** — sidebar and mobile menu patterns for moving between sections.

Some dashboard numbers, notices, and example conversations are sample UI content rather than live university data.

## 🎨 Design direction

UniSaathi aims for a clean, focused, student-first interface with clear hierarchy, readable cards, and quick access to high-priority information. The visual system can be evolved consistently across the dashboard, chat, map, notices, and support flows.

## 🧰 Technology stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, TypeScript |
| Build tool | Vite |
| Styling | CSS |
| Icons | Lucide React |
| Backend API | Node.js, Express 5 |
| Configuration | dotenv |
| AI provider options | Groq or OpenAI-compatible API |
| Fallback knowledge | Built-in campus notes |

## 🗂️ Project structure

```text
UniSaathi/
├── src/
│   ├── components/      # Dashboard, chat, map, notices and support UI
│   ├── data/            # Initial/demo UI data
│   ├── App.tsx           # Main application and view state
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── types.ts           # Shared TypeScript types
├── server/
│   ├── index.js           # Express API and static production serving
│   ├── chat.js            # Chat provider and reply handling
│   └── knowledge.js       # Built-in campus knowledge
├── .env.example           # Example environment configuration
├── render.yaml            # Render deployment configuration
├── package.json           # Scripts and dependencies
└── README.md
```

## 🚀 Run locally

### Requirements

- Node.js compatible with the Vite version used by the project
- npm
- Optional: a Groq or OpenAI API key for live model responses

### 1. Install dependencies

From the repository root:

```bash
npm install
```

### 2. Configure optional AI access

Copy `.env.example` to `.env` and add the provider key you want to use.

**Groq**
```env
PORT=8787
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
```

**Or OpenAI**
```env
PORT=8787
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

You only need to configure the provider you intend to use. Without a key, the app is designed to fall back to built-in campus notes. Never commit your real `.env` file or API keys.

### 3. Start the app

```bash
npm run dev
```

The development script starts the Express API and Vite frontend together. Vite usually prints the frontend URL (commonly `http://localhost:5173`); the API defaults to `http://localhost:8787`.

### 4. Create a production build

```bash
npm run build
npm start
```

The build script runs TypeScript project checks and builds the frontend. The Express server serves the built frontend from `dist` when that directory exists.

## 📡 API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health and AI engine status |
| `POST` | `/api/chat` | Submit a conversation and receive an assistant response |

### Chat request example

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Where can I find information about exam rules?"
    }
  ]
}
```

The chat endpoint accepts user and assistant messages and limits the conversation history it processes. See `server/index.js` and `server/chat.js` for the current implementation details.

## ☁️ Deployment

A Render service configuration is included in `render.yaml`. It uses `npm install && npm run build` as the build command and `npm start` to launch the server. Configure any required AI provider keys in the deployment platform's environment settings rather than committing them to source control.

After deployment, check the `/api/health` endpoint to confirm the server is responding. A successful health response does not by itself guarantee that an external AI provider is configured or available.

## 🛡️ Responsible use

- Treat AI responses as guidance, not as a replacement for official university rules or staff advice.
- Confirm exam dates, eligibility, fees, grades, and other high-impact information through official university channels.
- Keep API keys and private configuration out of Git.
- Avoid entering passwords, student IDs, financial details, or other sensitive personal information into the chat.

## 🗺️ Roadmap

- [ ] Connect campus notices, deadlines, and map information to trusted, maintained data sources.
- [ ] Add automated tests for API validation and chat fallback behavior.
- [ ] Improve error handling, loading states, and accessibility.
- [ ] Expand citations so students can easily verify answers against official sources.
- [ ] Add clear data freshness indicators to campus information.
- [ ] Review deployment security, rate limiting, and provider failure handling.

## 🤝 Contributing

Suggestions and bug reports are welcome.

1. Open an [issue](https://github.com/stealthbishop/UniSaathi/issues) with context and steps to reproduce.
2. Create a focused branch for your change.
3. Test the affected functionality.
4. Submit a pull request describing what changed.

---

<div align="center">

**UniSaathi** · Making campus life a little easier, one question at a time.

<sub>Built with React, TypeScript, Node.js, and a student-first mindset.</sub>

</div>
