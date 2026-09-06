# Decisions (Rationale)

## 1. Tailwind v4 for Styling
**Decision:** We adopted Tailwind CSS v4 and stored design tokens directly in `src/app/globals.css` using `@theme` and `@layer` directives.
**Why:** Next.js 15 template defaults to Tailwind v4, which deprecates `tailwind.config.ts` in favor of CSS variables. This ensures future compatibility and faster compiler performance.

## 2. Server Actions + Drizzle ORM
**Decision:** We utilized React Server Actions (`src/app/actions.ts`) integrated with `drizzle-orm` and `@neondatabase/serverless` for Postgres insertion.
**Why:** This pattern keeps `DATABASE_URL` strictly out of the client bundle. It reduces the need for explicit API Route (`/api/...`) boilerplates, making form submission cleaner while still maintaining type safety via Zod.

## 3. Database-backed Idempotency
**Decision:** We enforce unique submissions by generating a `sessionId` (UUID) client-side in `SurveyContext`, passing it as the primary key (`id`) to the server, and catching Postgres error `23505` (unique violation) to return `{ success: true }`.
**Why:** The requirement explicitly forbade adding Redis/KV unless absolutely necessary. Relying on the DB's native primary key constraints prevents duplicate records from browser retries or double-clicks securely and robustly without extra infrastructure overhead.

## 4. Context for State Machine
**Decision:** Multi-step routing is handled by a local state machine in `SurveyContext.tsx` rather than Next.js URL segments (e.g. `/survey/1`).
**Why:** To prevent un-submitted data from being orphaned if users copy-paste URLs or navigate via browser history unpredictably. A localized Context forces users into the intended funnel and prevents state cascade re-render errors by isolating state updates from React effects.

## 5. Dependency Cascading (Data Integrity)
**Decision:** When a parent selection is toggled, any dependent answers (e.g. "greatest impact") are automatically verified and invalid options are stripped.
**Why:** To prevent hidden invalid states where a user un-checks an option but it remains stored invisibly in a child question, which would eventually fail server validation and ruin the submission.
