# Architecture (Big Picture)

## Tech Stack
- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS variable token system)
- **Database:** Neon Postgres (Serverless driver)
- **ORM:** Drizzle ORM
- **Validation:** Zod

## Data Model & Configuration
- **`src/data/survey.ts`**: The canonical source of truth for the survey. It exports an array of `SurveyScreen` objects containing `SurveyField` configurations. The entire application (validation, UI rendering, logic) relies on this singular definition.
- **`src/db/schema.ts`**: Defines the `professional_submission` table.
  - `id`: Unique UUID per submission, provided by the client `sessionId`.
  - `surveyVersion`: Tracks the iteration of the survey (`1.0` currently).
  - `answers`: JSONB storing raw `Record<string, string[]>`.
  - `context`: JSONB storing raw `Record<string, string>`.

## System Boundaries
- **Client (Browser)**
  - UI components (`src/components/ui/`)
  - State machine & Context (`src/lib/SurveyContext.tsx`)
  - Controller view logic (`src/components/survey/SurveyController.tsx`)
- **Server (Node/Edge)**
  - Zod validation engine (`src/lib/validations.ts`)
  - Server Actions (`src/app/actions.ts`)
  - Drizzle ORM execution to DB
