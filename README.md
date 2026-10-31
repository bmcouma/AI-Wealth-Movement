# AI Wealth Movement

Independent website for discovering AI tools, prompt workflows, GIS and satellite resources, learning tracks, and digital work opportunities.

## Requirements

- Node.js 20 or later
- Python 3.11 or later

## Frontend

```powershell
cd $HOME\Desktop\AI-Wealth-Movement
copy .env.example .env
npm.cmd install
npm.cmd run dev
```

The Vite app defaults to `http://127.0.0.1:8000/api/v1`. Override that with `VITE_API_BASE_URL` if the Django API is hosted elsewhere.

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

## Backend

```powershell
cd $HOME\Desktop\AI-Wealth-Movement\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

```powershell
python manage.py check
python manage.py test
```

Optional catalog seed data lives in `backend/seed_data.json`. Generate a fresh export from the frontend catalog with:

```powershell
npx --yes tsx scripts/export-platform-data.ts
```

## Configuration

- Frontend environment variables belong in the project-root `.env` file. Never commit that file.
- Django environment variables belong in `backend/.env`. Never commit that file.
- Replace `SECRET_KEY` before deploying with `DEBUG=False`.

## Local backups

Timestamped backup folders such as `backend_backup_*` and `src/App.tsx.backup_*` are local snapshots. They are ignored by Git and are not part of the published project.
