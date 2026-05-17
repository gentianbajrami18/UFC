# Presentation Guide

## One-Minute Pitch

This is a full-stack UFC-style event platform. The public side lets users browse events, fight cards, athletes, rankings, and tickets. The admin side manages the real data behind the experience: fighters, events, fights, seating layouts, quotes, rankings, users, and ticket-related setup.

## Recommended Demo Flow

1. Open the homepage.
   - Point out the event-focused landing experience, featured fight promotion, video section, and quote section.

2. Open `Events`.
   - Show upcoming/past event switching.
   - Open a fight card and point out main card/prelims grouping.
   - Open the ticket flow from an upcoming event.

3. Open `Athletes`.
   - Use the search/filter sidebar.
   - Open an athlete profile and show stats, vitals, and fight history.

4. Open `Rankings`.
   - Explain champions and top-ten division structure.

5. Open `Login`.
   - Click `Open admin workspace`.
   - The backend signs the user into an admin account. No username or password is needed.

6. Open `Admin`.
   - Use it as the management hub.
   - Walk through Events, Fighters, Fights, Seating, and Rankings.
   - Show that the admin controls public-facing data.

7. Open ticket checkout.
   - Select a section.
   - Select seats.
   - Explain Stripe redirect integration and ticket wallet.

## What To Say Technically

- Frontend: React, Vite, React Router loaders/actions, React Query, styled-components, responsive layouts.
- Backend: Express, MongoDB/Mongoose, JWT auth via cookies, role-based admin access, file uploads, Stripe checkout.
- Deployment: frontend builds to static assets; backend needs a hosted Node environment and MongoDB connection.
- Production config: API URL, backend Stripe key, demo admin account email, and backend CORS are environment-driven.

## What Looks Strong

- Public and admin experiences are both presentable.
- The admin panel is guided instead of hidden behind disconnected tables.
- Ticket purchase flow has a real seating map and order summary.
- Frontend has loading, empty, and error states instead of blank pages.
- SPA routing, static asset handling, and chunk splitting are configured.

## Deployment Checklist

Frontend host:

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables:
  - `VITE_API_URL=https://your-backend-url.com`

Backend host:

- Start command: `npm start`
- Environment variables:
  - `MONGO_URL`
  - `JWT_SECRET`
  - `CLIENT_ORIGIN=https://your-frontend-domain.com`
  - `DEMO_ADMIN_EMAIL=your-demo-admin-email` (optional; defaults to `demo-admin@example.com`)
  - `STRIPE_SECRET_KEY`
  - mail variables if email verification/reset is enabled

Seed/demo data:

- At least one admin user
- At least one arena
- At least one seating layout linked to that arena
- At least one upcoming event
- Fighters in the same weight class
- Fights assigned to the event
- Rankings and quotes for richer public pages

## Honest Notes

- `npm audit` currently reports dependency vulnerabilities. Review them before a production launch.
- Stripe checkout requires valid frontend and backend Stripe keys.
- If the backend sleeps on a free host, first API requests may be slow. Mention this if necessary during a live demo.
