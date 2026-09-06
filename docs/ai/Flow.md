# Flow (Traceability)

## 1. State Machine Navigation
1. **Landing:** Initial render of `SurveyController`. AppState: `"landing"`. User clicks "Share Your Experience".
2. **Survey Loop:** AppState transitions to `"survey"`. `SurveyScreenView` is rendered.
   - `SurveyContext` mounts, generates `sessionId`, initializes `currentScreenIndex = 0`.
   - User inputs answers via `toggleAnswer`. State is recorded in `answers` (Record<string, string[]>).
   - Validation dynamically checks boundaries (min/max/derived logic) via `isCurrentScreenValid`.
   - "Continue" increments `currentScreenIndex`.
   - Loop completes when Q10 is finalized and `nextScreen` is called. Sets `isComplete = true`.
3. **Review:** AppState transitions to `"review"`. User can see human-readable translations of their answers. They can click "Edit" to return to `survey` state or click "Confirm & Continue".
4. **Consent:** AppState transitions to `"consent"`. User must explicitly check the consent box.
5. **Submission Payload Assembly:** `handleSubmit` is fired in `SurveyController`, combining `sessionId`, `surveyVersion`, `consent`, `answers`, and `contexts`.
6. **Server Action:** Data is passed to `submitSurveyAction` in `src/app/actions.ts`.

## 2. Server Processing
1. **Zod Validation:** `SubmissionSchema.safeParse` strictly validates the object structure, explicit consent, length bounds, and dependent logic contradictions (e.g., cannot select "none" with another project).
2. **Drizzle Execution:** Validated data is injected into the Postgres Neon database.
3. **Idempotency Check:** If `db.insert` throws error `23505` (primary key conflict on `sessionId`), the server traps the error and returns `{ success: true }`.
4. **Success:** Client receives true boolean, setting AppState to `"success"`.
