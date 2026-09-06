import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const professionalSubmission = pgTable("professional_submission", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  surveyVersion: text("survey_version").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  consent: boolean("consent").notNull(),
  answers: jsonb("answers").notNull(),
  context: jsonb("context"),
});

export const studentSubmission = pgTable("student_submission", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  surveyVersion: text("survey_version").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  answers: jsonb("answers").notNull(),
  context: jsonb("context"),
});
