# Printflow

Frontend for a print shop order management system. Built with React, TypeScript, Tailwind CSS, Shadcn UI, and Axios.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Demo login:** `ana@printflow.local` / `printflow123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run Vitest unit tests |
| `npm run preview` | Preview production build |

## Mock mode

Set `VITE_USE_MOCK=true` in `.env` to use JSON mock data (default for frontend-only demos). Set `VITE_USE_MOCK=false` and `VITE_API_URL` when the Nest.js API is available.

## Documentation

| Language | Links |
|----------|-------|
| English | [Architecture](docs/en/ARCHITECTURE.md) · [API](docs/en/API.md) · [Getting started](docs/en/GETTING_STARTED.md) |
| Português | [Arquitetura](docs/ptbr/ARQUITETURA.md) · [API](docs/ptbr/API.md) · [Primeiros passos](docs/ptbr/PRIMEIROS_PASSOS.md) |

Full index: [docs/README.md](docs/README.md)

## Features

- Login with email/password and password visibility toggle
- Orders screen with cards, status updates, and final value editing
- Sales dashboard for 1, 3, and 7 day periods
- Sidebar navigation and logout
- Light/dark theme toggle
- Auto-refresh orders every 15 seconds without page reload
