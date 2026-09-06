import { z } from "zod";
import { SurveyManifest } from "@/data/survey";

// Dynamic Zod schema builder based on SurveyManifest
export const createSubmissionSchema = (manifest: SurveyManifest) => {
  return z.object({
    id: z.string().uuid(),
    surveyVersion: z.string().min(1),
    consent: z.boolean().optional(),
    answers: z.record(z.string(), z.array(z.string())),
    context: z.record(z.string(), z.string()).optional(),
  }).refine(data => {
    
    // Hardcoded logic for professional survey Q6: Cannot select "none" with other project types
    if (manifest.surveyType === 'professional') {
      const projectType = data.answers["project_type"] || [];
      if (projectType.includes("none") && projectType.length > 1) {
        return false;
      }
    }

    // Deep validation against config
    for (const screen of manifest.config) {
      for (const field of screen.fields) {
        const fieldAnswers = data.answers[field.id] || [];
        const min = field.min || 0;
        const max = field.max;

        // Skip professional Q6 value_factor if "none" is selected for project_type
        if (manifest.surveyType === 'professional' && field.id === "value_factor" && (data.answers["project_type"] || []).includes("none")) {
          continue;
        }

        if (fieldAnswers.length < min) {
          return false;
        }
        
        if (max && fieldAnswers.length > max) {
          return false;
        }

        if (field.derivesFromId) {
          const parentAnswers = data.answers[field.derivesFromId] || [];
          const isDerivedValid = fieldAnswers.every((ans: string) => parentAnswers.includes(ans));
          if (!isDerivedValid) return false;
        } else if (field.options) {
          const validIds = field.options.map(o => o.id);
          const hasInvalidIds = fieldAnswers.some((ans: string) => !validIds.includes(ans));
          if (hasInvalidIds) return false;
        } else if (field.type === 'textarea') {
          // If it's a textarea, validate length if max is provided
          const text = fieldAnswers[0] || "";
          if (max && text.length > max) {
            return false;
          }
        }
      }
    }
    return true;
  }, {
    message: "Invalid survey submission structure based on current configuration.",
  });
};

export type SubmissionPayload = z.infer<ReturnType<typeof createSubmissionSchema>>;
