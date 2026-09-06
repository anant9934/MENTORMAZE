"use client";

import React, { useState } from "react";
import { SurveyProvider, useSurvey } from "@/lib/SurveyContext";
import { SurveyScreenView } from "@/components/survey/SurveyScreen";
import { ReviewScreen } from "@/components/survey/ReviewScreen";
import { ConsentScreen } from "@/components/survey/ConsentScreen";
import { submitSurveyAction } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/ui/HeroVisual";

type AppState = "landing" | "survey" | "review" | "consent" | "success";

function SurveyControllerInner() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { isComplete, answers, contexts, sessionId } = useSurvey();

  const handleStart = () => {
    setAppState("survey");
  };

  const handleConfirmReview = () => {
    setAppState("consent");
  };

  const handleSubmit = async (consent: boolean) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      id: sessionId,
      surveyVersion: "1.0",
      consent,
      answers,
      context: contexts,
    };

    const result = await submitSurveyAction(payload);
    setIsSubmitting(false);

    if (result.success) {
      setAppState("success");
    } else {
      setSubmitError(result.error || "Submission failed. Please try again.");
    }
  };

  if (appState === "landing") {
    return (
      <div className="min-h-screen relative flex flex-col animate-in fade-in duration-1000 bg-[#fbf9f6] overflow-hidden">
        
        {/* Header */}
        <header className="relative z-20 flex justify-between items-start px-5 sm:px-8 md:px-12 pt-5 sm:pt-8 md:pt-10 pb-2 w-full max-w-[1600px] mx-auto">
          <img 
            src="/logo.png" 
            alt="MentorMaze" 
            className="h-10 sm:h-12 md:h-14 object-contain object-left" 
          />
          <div className="hidden md:flex items-center gap-4 mt-1">
            <p className="text-[9px] lg:text-[10px] font-bold tracking-[0.2em] text-[#8a7a66] uppercase">
              REAL PEOPLE. REAL INSIGHTS. BRIGHTER FUTURES.
            </p>
            <div className="w-12 h-[1px] bg-[#8a7a66]/40"></div>
          </div>
        </header>

        {/* Main Hero Section — fixed height on desktop to prevent page scroll */}
        <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch w-full max-w-[1600px] mx-auto min-h-0">
          
          {/* Left Content */}
          <div className="relative w-full lg:w-[45%] flex flex-col justify-center px-5 sm:px-8 md:px-12 py-6 lg:py-8 z-20 shrink-0">
            
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-amber-600 mb-4 sm:mb-5 uppercase">
              AI + HUMAN CSE PLACEMENT MENTORSHIP
            </p>
            
            <div className="relative mb-5 sm:mb-6">
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-serif text-[#1a1208] leading-[1.08] tracking-tight">
                Learn from<br className="hidden sm:block" />{" "}people who<br className="hidden sm:block" />{" "}already made<br />
                <span className="relative inline-block mt-1 sm:mt-0">
                  the journey.
                  <svg className="absolute -bottom-1 left-0 w-[105%] h-3 text-amber-500" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0 10 Q 100 20 200 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </div>
            
            <p className="text-sm sm:text-base text-[#4a3f2f] max-w-[400px] mb-6 sm:mb-8 leading-relaxed">
              Real technical-career experiences from professionals can help the next generation of CSE students understand what actually matters — what to learn, how to prepare, and what companies really evaluate.
            </p>
            
            <div className="flex items-center gap-5 mb-8 sm:mb-10">
              <Button onClick={handleStart} className="px-6 sm:px-8 h-12 sm:h-14 rounded-full bg-[#1a1208] hover:bg-[#2a2218] text-white text-sm sm:text-base transition-transform hover:scale-[1.02] shadow-xl shadow-black/5">
                Share Your Experience <span className="ml-2 font-serif text-lg sm:text-xl leading-none">&rarr;</span>
              </Button>
              <div className="hidden sm:flex h-10 w-[1px] bg-black/10"></div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-medium text-[#4a3f2f]">3–5 minutes</span>
                <span className="text-xs text-[#8a7a66]">10 questions</span>
              </div>
            </div>

            {/* Value Markers */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1a1208]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-wider text-[#1a1208]">REAL</span>
                  <span className="text-[9px] font-bold tracking-wider text-[#1a1208]">EXPERIENCES</span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-black/10 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-wider text-[#1a1208]">REAL</span>
                  <span className="text-[9px] font-bold tracking-wider text-[#1a1208]">INSIGHT</span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-black/10 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1a1208]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-wider text-[#1a1208]">REAL</span>
                  <span className="text-[9px] font-bold tracking-wider text-[#1a1208]">IMPACT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual — Mobile uses aspect ratio to frame student/path cleanly, Desktop fills height naturally */}
          <div className="w-full lg:w-[55%] relative aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-auto lg:min-h-[500px] z-0 shrink-0 lg:shrink">
            <HeroVisual className="absolute inset-0 w-full h-full" />
          </div>

        </main>

        {/* Bottom Editorial Strip */}
        <footer className="relative z-20 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between border-t border-black/5 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 shrink-0">
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.12em] text-[#1a1208] uppercase leading-relaxed">
              BUILT BY<br className="hidden md:block"/>
              <span className="md:hidden"> REAL PROFESSIONALS </span>
              <span className="hidden md:inline">REAL PROFESSIONALS<br/></span>
              FOR THE NEXT GENERATION
            </p>
            <div className="w-16 h-[1px] bg-black/5 hidden lg:block"></div>
          </div>
          
          <div className="flex-1 max-w-[300px] md:max-w-none">
            <p className="font-serif text-[#1a1208] text-base sm:text-lg italic leading-tight">
              &quot;The best advice comes from<br className="hidden sm:block"/>people who have lived it.&quot;
            </p>
            <p className="text-[10px] text-[#8a7a66] mt-2 font-semibold tracking-wider uppercase">— MentorMaze</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-16 h-[1px] bg-black/10 hidden md:block"></div>
            <p className="text-[10px] font-bold tracking-widest text-[#1a1208]">01 / 01</p>
          </div>
        </footer>

      </div>
    );
  }

  if (appState === "survey" && !isComplete) {
    return <SurveyScreenView />;
  }

  if (appState === "review" || (isComplete && appState === "survey")) {
    return <ReviewScreen onEdit={() => setAppState("survey")} onContinue={handleConfirmReview} />;
  }

  if (appState === "consent") {
    return (
      <ConsentScreen 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
        onBack={() => setAppState("review")} 
        error={submitError} 
      />
    );
  }

  if (appState === "success") {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center bg-[#fbf9f6] animate-in fade-in duration-1000 overflow-hidden">
        
        {/* Subtle Background Architectural Lines */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]" aria-hidden="true">
          <svg className="w-[150%] h-[150%] max-w-4xl" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.1" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl w-full flex flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-150">
          
          {/* Success Indicator - Subtle Animated Checkmark */}
          <div className="mb-10 sm:mb-12 relative flex items-center justify-center">
            {/* Very faint background circle */}
            <div className="w-14 h-14 rounded-full border border-amber-500/20 absolute"></div>
            {/* Animated Check */}
            <svg 
              className="w-6 h-6 text-amber-600 animate-draw-check" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.5 12.75l6 6 9-13.5" 
              />
            </svg>
            <style>{`
              @keyframes draw-check {
                to { stroke-dashoffset: 0; }
              }
              .animate-draw-check path {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: draw-check 1.2s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                animation-delay: 0.3s;
              }
              @media (prefers-reduced-motion: reduce) {
                .animate-draw-check path {
                  animation: none;
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </div>

          <h2 className="text-[clamp(2rem,6vw,4rem)] font-serif text-[#1a1208] mb-6 sm:mb-8 leading-[1.05] tracking-tight text-center">
            YOUR EXPERIENCE<br/>MATTERS.
          </h2>
          
          <p className="text-lg sm:text-xl text-[#1a1208] font-medium mb-4">
            Thank you for sharing your journey.
          </p>
          
          <p className="text-base sm:text-lg text-[#4a3f2f] leading-relaxed mb-12 sm:mb-16 max-w-lg">
            The lessons you learned, the challenges you faced, and the choices you made can help future CSE students find a clearer path.
          </p>

          <div className="w-16 h-[1px] bg-black/10 mb-8 sm:mb-10"></div>

          <div className="flex flex-col items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#1a1208] uppercase mb-12 sm:mb-16">
            <span>REAL EXPERIENCES</span>
            <span className="text-[#8a7a66]">REAL INSIGHTS</span>
            <span className="text-amber-700">CLEARER PATHS</span>
          </div>

          <Button onClick={() => window.location.reload()} className="px-10 h-12 rounded-full bg-[#1a1208] hover:bg-[#2a2218] text-white text-sm transition-transform hover:scale-[1.02] shadow-sm">
            Done <span className="ml-2 font-serif text-lg leading-none">&rarr;</span>
          </Button>

        </div>

        {/* Footer Brand Logo */}
        <footer className="absolute bottom-8 sm:bottom-12 w-full flex flex-col items-center justify-center opacity-80">
          <img src="/logo.png" alt="MentorMaze" className="h-5 sm:h-6 object-contain mb-3" />
          <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-[#8a7a66] uppercase">
            AI + HUMAN CSE PLACEMENT MENTORSHIP
          </p>
        </footer>

      </div>
    );
  }

  return null;
}

export function SurveyController() {
  return (
    <SurveyProvider>
      <SurveyControllerInner />
    </SurveyProvider>
  );
}
