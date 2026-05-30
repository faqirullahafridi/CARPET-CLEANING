# FreshLux Carpet Cleaning UK

A luxury UK carpet cleaning booking platform — "Deep Cleaning. Fresh Living." Full-stack customer-facing website with animated homepage, multi-step booking flow, real-time pricing, and email confirmations.

## Run & Operate

- `pnpm --filter @workspace/freshlux run dev` — run the frontend (port 18648)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion + Wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Email: Nodemailer (SMTP)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — single source of truth for all API contracts
- `lib/db/src/schema/` — DB schema (bookings, coupons, contacts)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/lib/services-data.ts` — static pricing data
- `artifacts/api-server/src/lib/email.ts` — Nodemailer email helpers
- `artifacts/freshlux/src/` — React frontend

## Architecture decisions

- OpenAPI-first: all API contracts defined in `openapi.yaml`, never hand-written
- Static pricing data served from `services-data.ts` — no DB needed for service/item prices
- Email is fire-and-forget (non-blocking) so booking creation is never delayed by SMTP
- Minimum booking fee of £85 enforced server-side in the quote calculator
- Coupon codes stored in DB; `ON CONFLICT` prevents duplicates on re-seed

## Product

- Animated homepage with hero, service cards, stats counters, testimonials, FAQ
- Multi-step booking flow (service → location → rooms → add-ons → date/time → details → confirm)
- Real-time quote calculator with coupon support and "You Saved £XX" display
- Services, About, Contact pages
- Animated booking confirmation page with reference number
- Customer + admin email confirmations on every booking

## User preferences

- Customer-facing only — no admin panel or cleaner dashboard
- Dark Navy (#081120) + Royal Blue (#2563EB) + Cyan (#22D3EE) color palette
- Glassmorphism, floating cards, glow hover effects, Framer Motion animations
- UK pricing only (£ GBP)
- No emojis in the UI

## Gotchas

- `pnpm --filter @workspace/db run push` must be re-run after any schema change
- SMTP env vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_EMAIL`) must be set for emails to send; without them emails are logged but not sent
- Coupon codes are stored uppercase in DB — always `.toUpperCase().trim()` before querying
- After any OpenAPI spec change, run codegen before using updated types

## Active coupon codes (for testing)

- `WELCOME10` — 10% off
- `FRESHSTART` — £20 off
- `BUNDLE15` — 15% off
- `NEWCUSTOMER` — 20% off
- `SAVE25` — £25 off

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
