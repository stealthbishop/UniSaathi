# UniSaathi

A campus companion chatbot for university students: exams, CGPA, hostel, internships, placements, and study stress.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API runs on port `8787`.

Without an API key, replies come from built-in campus notes. For live AI, copy `.env.example` to `.env` and set `GROQ_API_KEY` or `OPENAI_API_KEY`, then restart.

## Scripts

- `npm run dev` — frontend + API together
- `npm run build` then `npm start` — production (serves the built app from the API)
