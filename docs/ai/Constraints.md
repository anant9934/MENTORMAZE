# Constraints (Boundaries)

1. **Design System Adherence:** The UI/UX documented in `mentormatrix_ui_ux_reference.md` is strictly sacred. No new colors, border-radii, typography, or interaction patterns are allowed unless specifically requested.
2. **Server Actions Safety:** The `DATABASE_URL` and Neon Postgres connection string must never leak to the client. Ensure all Drizzle calls execute purely on the server via `use server`.
3. **No Unnecessary Infrastructure:** Use database-native solutions (e.g. Postgres unique constraints for idempotency) over complex enterprise solutions (like Redis or KV) unless traffic scaling mandates it.
4. **Independent Audit Rules:** Any automated checks must trace data flows from end to end instead of relying on theoretical assumptions or file-level inspections.
5. **Context Continuity:** Maintain documentation files in `docs/ai/` to enforce project retention between sessions.
