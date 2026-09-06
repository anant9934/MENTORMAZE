"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ConsentScreenProps {
  onSubmit: (consent: boolean) => void;
  isSubmitting: boolean;
  onBack: () => void;
  error?: string | null;
}

export function ConsentScreen({ onSubmit, isSubmitting, onBack, error }: ConsentScreenProps) {
  const [consent, setConsent] = useState(false);

  return (
    <div className="w-full max-w-[600px] mx-auto min-h-screen py-12 px-6 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-amber-600/15 shadow-card relative">
        <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-[#1a1208]">
          Final Step: Consent
        </h2>
        
        <p className="text-[#4a3f2f] mb-8 text-[15px] sm:text-base leading-relaxed">
          Your professional experience is incredibly valuable. Before we record your response, we need your permission to use this data to help future CSE students.
        </p>

        <label className="flex items-start gap-4 p-5 rounded-2xl border border-amber-600/20 bg-amber-600/5 cursor-pointer hover:bg-amber-600/10 transition-colors group">
          <div className="pt-1 relative flex items-center justify-center shrink-0">
            <input 
              type="checkbox"
              className="peer sr-only"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={isSubmitting}
            />
            <div className="w-6 h-6 border-2 border-amber-600 rounded-md bg-white peer-checked:bg-amber-600 transition-colors flex items-center justify-center">
              {consent && (
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <span className="text-[14px] sm:text-[15px] text-[#1a1208] font-medium leading-snug group-hover:text-amber-700 transition-colors">
            By submitting this survey, I agree that MentorMaze may store and use my responses for research, product development, and the development of CSE placement mentorship systems.
          </span>
        </label>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-medium animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <div className="mt-10 flex items-center gap-4 pt-8 border-t border-amber-600/10">
          <Button 
            variant="ghost" 
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 h-12"
          >
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onSubmit(consent)}
            disabled={!consent || isSubmitting}
            className="flex-1 h-12"
          >
            {isSubmitting ? "Submitting..." : "Submit Experience"}
          </Button>
        </div>
      </div>
    </div>
  );
}
