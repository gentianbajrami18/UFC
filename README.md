# UFC Event Platform

Full-stack UFC-style event platform built with React, Vite, Express, MongoDB, Stripe checkout, and an admin dashboard.

## What It Does

- Public event browsing with upcoming and past event views
- Fight card pages with main card, prelims, and early prelims
- Athlete roster, filtering, profiles, and rankings
- Ticket checkout with seating layout selection and Stripe redirect
- User ticket wallet with downloadable ticket files
- Admin hub for events, fighters, fights, rankings, arenas, seating, quotes, referees, divisions, and users

## Local Setup

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm run dev
```

## Environment

Copy the example files and fill in real values:

- `client/.env.example`
- `server/.env.example`

Important deployment variables:

- `client`: `VITE_API_URL`
- `server`: `MONGO_URL`, `JWT_SECRET`, `CLIENT_ORIGIN`, `STRIPE_SECRET_KEY`

The admin workspace button does not require public credentials. The backend signs users into a verified admin account and creates that account on first use if it does not exist yet. Set `DEMO_ADMIN_EMAIL` only if you want to control the admin account email; otherwise it uses `demo-admin@example.com`.

## Demo Guide

See [PRESENTATION_GUIDE.md](./PRESENTATION_GUIDE.md) for the recommended walkthrough and talking points.
