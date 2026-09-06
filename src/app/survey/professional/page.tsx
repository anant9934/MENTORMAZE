import { SurveyController } from "@/components/survey/SurveyController";
import { professionalManifest } from "@/data/survey";

export default function ProfessionalSurveyPage() {
  return (
    <main className="min-h-screen">
      <SurveyController manifest={professionalManifest} />
    </main>
  );
}
