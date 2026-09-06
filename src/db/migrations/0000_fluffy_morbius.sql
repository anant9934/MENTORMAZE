CREATE TABLE "professional_submission" (
	"id" text PRIMARY KEY NOT NULL,
	"survey_version" text NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"consent" boolean NOT NULL,
	"answers" jsonb NOT NULL,
	"context" jsonb
);
--> statement-breakpoint
CREATE TABLE "student_submission" (
	"id" text PRIMARY KEY NOT NULL,
	"survey_version" text NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"answers" jsonb NOT NULL,
	"context" jsonb
);
