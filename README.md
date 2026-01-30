# Azfin Consulting LLC - Professional Web Platform

A modern, fully manageable web platform for Azfin Consulting LLC. The project includes a premium public website (frontend) and an AdminLTE-based management panel (backend/admin).

## Features

- Dynamic content management for posts, services, blogs, and academy content
- AdminLTE dashboard for administrators
- Request management system
- Full UI localization support
- Responsive design for mobile, tablet, and desktop
- Docker support for quick setup

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, Lucide Icons
- Backend / API: Node.js, Express
- Data Storage: JSON-based persistent storage (no database required)
- File Uploads: Multer

## Docker (Local)

From the project root:

```bash
docker-compose up -d --build
```

After startup:
- Website: `http://localhost:5001`
- Admin Panel: `http://localhost:5001/admin/login`

Note: `data.json`, `requests.json`, and `uploads/` are mounted as volumes so data persists across container restarts.

## Local (Manual)

1) Install dependencies:
```bash
npm install
```

2) Run frontend and server together:
```bash
npm run dev:all
```

3) Open in browser:
- Frontend: `http://localhost:5173`
- API Server: `http://localhost:5001`

## Folder Structure

- `/components`: Reusable UI components
- `/pages`: Page components
- `/pages/admin`: Admin pages and managers
- `/server`: Node.js Express API
- `/context`: React Context for data and auth
- `/public`: Static files
- `data.json`: Dynamic site data (JSON)

---

## Production Deployment (Portainer + Traefik)

For the Octotech server, deployment uses prebuilt images and Traefik labels (no host ports).
See `DEPLOY.md` for the exact steps, paths, and verification commands.

© 2024 Azfin Consulting. Developed by Ali Yabuz.

## Update Flow (Summary)

1) `git pull` on the server in `/datastore/azfin/app`
2) Rebuild images
3) Redeploy the Portainer stack

See `CONTRIBUTING.md` for the full steps.
