# PRERA — Event & Brand Collaboration Platform

PRERA connects event organizers with brands and sponsors, and provides a way for students and professionals to apply to work with the PRERA team.

## Features

- Home, About, Events, Partners and Connect pages.
- Connect page follows the PRERA black-and-gold design.
- Two separate forms: **Host an Event / Event Collaboration** and **Join PRERA / Work With Us**.
- Both forms submit to the Express API and store submissions in PostgreSQL through Prisma.
- Server-side validation, rate limiting and generated reference IDs.
- Protected admin API endpoints for reviewing and managing submissions.
- Event organizers can submit event details with a poster image.
- Admins can review pending event submissions and approve or reject them before public listing.
- Event posters support JPG, PNG and WEBP images up to 5 MB.
- Visitors can submit feedback, and admins can review, approve, reject, or delete it.
- Approved feedback is available to the public Feedback page.

## Tech stack

- Frontend: React, Vite, React Router, CSS
- Backend: Node.js, Express
- Database: PostgreSQL, Prisma ORM

## Requirements

Install Node.js (LTS) and PostgreSQL. Keep the database running while using the app.

## 1. Configure PostgreSQL and backend

```bash
cd backend
npm install
```

Create a database named `prera_db` in PostgreSQL, then copy `.env.example` to `.env` and update `DATABASE_URL` with your PostgreSQL username and password.

Example:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/prera_db?schema=public"
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_EXPIRES_IN=7d
```

Do not commit `.env`; it contains credentials.

Generate Prisma Client and sync the schema:

```bash
npx prisma generate
npx prisma db push
npm run seed
```

`npm run seed` creates or resets the admin account from `ADMIN_EMAIL` and
`ADMIN_PASSWORD` in `backend/.env`. Use a unique `JWT_SECRET` of at least 32
characters; do not use the example placeholder values.

Start the backend:

```bash
npm run dev
```

Backend health check: http://localhost:5001/api/health

## 2. Start the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env` (the default points to `http://localhost:5001/api`).

Start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173.

## 3. Test the two forms

1. Open **Let's Connect** in the navbar.
2. Select **Submit Event Details** to open the event collaboration form.
3. Fill all required fields and submit. A reference ID should appear after a successful save.
4. Go back and select **Explore Opportunities** to open the Join PRERA form.
5. Submit a valid application. It should also return a reference ID.

Submissions are stored in the PostgreSQL tables:

- `event_submissions`
- `work_applications`
- `feedback`

You can inspect them in pgAdmin under `prera_db → Schemas → public → Tables`, then right-click a table and choose **View/Edit Data → All Rows**.

## 4. Test Event Approval

1. Open the Admin page and log in.
2. Go to the Event Submissions section.
3. Review pending event submissions.
4. Approve an event to make it visible on the public Events page.
5. Reject submissions that should not be published.

## 5. Test Feedback

1. Open the Feedback page.
2. Submit a name, email, rating, and message.
3. Log in to the Admin page and review the new feedback under Feedback.
4. Approve feedback to make it visible on the public Feedback page.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend and database health |
| POST | `/api/events` | Public event proposal submission |
| POST | `/api/applications` | Public work application submission |
| POST | `/api/feedback` | Public feedback submission |
| GET | `/api/feedback/approved` | Approved public feedback |
| GET/PATCH/DELETE | `/api/events/*` | Admin-protected event management |
| GET/PATCH/DELETE | `/api/applications/*` | Admin-protected application management |
| GET/PATCH/DELETE | `/api/admin/feedback/*` | Admin-protected feedback management |
| GET/POST | `/api/admin/*` | Admin authentication and profile/dashboard management |

## GitHub workflow

From the project root:

```bash
git status
git add .
git commit -m "Complete PRERA connect forms and API integration"
git push origin main
```

Review `git status` before committing. Never commit `.env` files or `node_modules`.

## GitHub Pages frontend

The static frontend is deployed from `main` at
[https://chiragantil07.github.io/Prera_Final_Website/](https://chiragantil07.github.io/Prera_Final_Website/).
GitHub Pages does not host the Express API or PostgreSQL database, so API-backed
forms, admin features, and dynamic content need a separately hosted backend and
a configured `VITE_API_URL`.

## Project structure

```text
PRERA/
├── .github/
│   └── workflows/               # GitHub Pages deployment
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/                 # Application routes and theme state
│       ├── assets/              # Brand, event, partner, and team assets
│       ├── components/          # Shared and feature-level UI components
│       ├── features/            # Contact and partner feature modules
│       ├── Pages/               # Route-level page components
│       ├── styles/              # Global and page styles
│       └── main.jsx
├── backend/
│   ├── prisma/                  # Prisma schema and migrations
│   └── src/                     # Config, controllers, middleware, routes, utils
```

PRERA — Creating Connections. Enabling Collaborations. Building Experiences.
