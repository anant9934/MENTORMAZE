"use server";

import { db } from "@/db";
import { professionalSubmission } from "@/db/schema";
import { SubmissionSchema, SubmissionPayload } from "@/lib/validations";

export async function submitSurveyAction(payload: SubmissionPayload) {
  try {
    // 1. Validate payload via Zod on the Server
    const parsed = SubmissionSchema.safeParse(payload);
    
    if (!parsed.success) {
      console.error("Validation Error:", parsed.error);
      return { success: false, error: "Invalid survey submission format." };
    }

    const { id, surveyVersion, consent, answers, context } = parsed.data;

    if (!consent) {
      return { success: false, error: "Consent is strictly required." };
    }

    // 2. Insert into Neon
    await db.insert(professionalSubmission).values({
      id,
      surveyVersion,
      consent,
      answers,
      context: context || {},
    });

    return { success: true };
  } catch (error: unknown) {
    // 23505 is the PostgreSQL error code for unique_violation
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      console.log("Idempotent hit: duplicate submission avoided.");
      return { success: true }; // Treat as success for the client
    }

    console.error("Submission failed:", error);
    // Generic error to avoid leaking DB details
    return { success: false, error: "An unexpected error occurred during submission." };
  }
}
