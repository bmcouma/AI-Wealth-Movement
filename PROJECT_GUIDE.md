# Project Guide for AI Wealth Movement

## Overview
AI Wealth Movement is a Vite‑powered React frontend coupled with a Django REST Framework backend. It provides a curated catalog of AI tools, prompt templates, GIS resources, learning tracks, and a community‑driven resource submission system.

## Architecture
- **Frontend** – Typescript + React, built with Vite. State persisted in `localStorage` for saved tools, jobs, and learning progress. API calls are abstracted in `src/services/`.
- **Backend** – Django 5 + DRF, SQLite database (development) and environment‑driven configuration. Endpoints live under `/api/v1/`.
- **Data Flow** – Platform data (`tools`, `prompts`, `jobs`, `gis`, `learning`) is fetched from the backend at startup (`loadPlatformData`).
- **Styling** – Tailwind CSS utilities with a dark, glass‑morphism aesthetic.

## Getting Started
```powershell
# Clone (already done) and cd into the repo
cd $HOME\Desktop\AI-Wealth-Movement

# Frontend setup
copy .env.example .env
npm.cmd install   # uses existing node_modules if present
npm.cmd run dev   # start Vite dev server
# The VITE_API_BASE_URL variable from .env.example defines the backend API base URL.
```

```powershell
# Backend setup (Python 3.11+)
cd backend
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
# The .env file should define DEBUG, SECRET_KEY, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, DATABASE_URL as used by Django settings.
copy .env.example .env
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

## Testing
- **Frontend**: `npm.cmd test` runs Vitest unit tests located in `src/**/*.test.ts`. The current test suite reports **7 passing tests** and **0 failures**.
- **Backend**: `python manage.py test` runs Django tests (not exercised here).
- Backend test coverage is not reported here; run `python manage.py test` to see results.

## Build
```powershell
npm.cmd run build   # produces production assets in /dist
```

## Deployment Notes
- Ensure `SECRET_KEY` is set and `DEBUG=False` in `backend/.env` before production.
- Serve the `/dist` folder via any static web server (e.g., Nginx, Azure Static Web Apps).
- Configure a reverse proxy (NGINX/Apache) to forward `/api/v1/` to the Django backend.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Run `npm.cmd run lint` and `npm.cmd test` locally.
4. Submit a PR with a clear description.

## Credits
© 2023‑2026 AI Wealth Movement. All rights reserved.

**Built by Bravin M Ouma** – see the footer in `src/App.tsx` for the visual credit.
