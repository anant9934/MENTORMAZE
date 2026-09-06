import { SurveyController } from "@/components/survey/SurveyController";
import { studentManifest } from "@/data/survey";

export default function StudentSurveyPage() {
  return (
    <main className="min-h-screen">
      <SurveyController manifest={studentManifest} />
    </main>
  );
}
