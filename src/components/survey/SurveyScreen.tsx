"use client";

import React, { useState } from "react";
import { useSurvey } from "@/lib/SurveyContext";
import { surveyConfig } from "@/data/survey";
import { OptionCard } from "@/components/ui/OptionCard";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TextArea } from "@/components/ui/TextArea";

export function SurveyScreenView() {
  const {
    currentScreenIndex,
    answers,
    contexts,
    toggleAnswer,
    setContext,
    nextScreen,
    prevScreen,
    isCurrentScreenValid,
    validationErrors,
  } = useSurvey();

  const [isContextOpen, setIsContextOpen] = useState(false);

  const screen = surveyConfig[currentScreenIndex];
  
  const [prevScreenId, setPrevScreenId] = useState(screen.id);
  if (screen.id !== prevScreenId) {
    setPrevScreenId(screen.id);
    setIsContextOpen(!!contexts[screen.id]);
  }

  return (
    <div className="w-full max-w-[600px] mx-auto min-h-screen py-12 px-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProgressBar current={currentScreenIndex + 1} total={surveyConfig.length} className="mb-10" />
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-10 leading-tight">
        {screen.title}
      </h2>

      <div className="flex-1 flex flex-col gap-10">
        {screen.fields.map(field => {
          const fieldAnswers = answers[field.id] || [];
          const error = validationErrors[field.id];
          
          let options = field.options || [];
          
          // Derived options logic
          if (field.derivesFromId) {
            const parentField = screen.fields.find(f => f.id === field.derivesFromId);
            const parentAnswers = answers[field.derivesFromId] || [];
            options = parentAnswers.map((ansId: string) => {
              const opt = parentField?.options?.find(o => o.id === ansId);
              return opt || { id: ansId, label: ansId };
            });
            
            if (options.length === 0) return null; // Don't show if parent has no answers
          }

          // Special logic to disable Q6 sub-questions if "none" is selected
          const isQ6ValueFactor = field.id === "value_factor";
          const isQ6NoneSelected = (answers["project_type"] || []).includes("none");
          if (isQ6ValueFactor && isQ6NoneSelected) {
             return null;
          }

          return (
            <div key={field.id} className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-label">{field.label}</span>
                {error && <span className="text-red-600 text-sm">{error}</span>}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map(opt => (
                  <OptionCard
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    type={field.type === "multiple" ? "multiple" : "single"}
                    selected={fieldAnswers.includes(opt.id)}
                    onClick={(id) => toggleAnswer(field.id, id, field.max)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {screen.hasContext && (
        <div className="mt-10 pt-10 border-t border-amber-600/10">
          {!isContextOpen ? (
            <button 
              onClick={() => setIsContextOpen(true)}
              className="text-[#c8830a] font-medium text-sm flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-md"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add context
            </button>
          ) : (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-sm font-medium text-[#8a7a66]">{screen.contextPrompt}</span>
              <TextArea
                value={contexts[screen.id] || ""}
                onValueChange={(val) => setContext(screen.id, val)}
                placeholder="Optional · Add anything that gives useful context to your answer."
                maxLength={800}
              />
            </div>
          )}
        </div>
      )}

      <div className="mt-12 flex items-center justify-between sticky bottom-6 bg-white/80 backdrop-blur-md p-4 -mx-4 rounded-2xl shadow-sm border border-amber-600/10 z-10">
        <Button 
          variant="ghost" 
          onClick={prevScreen} 
          disabled={currentScreenIndex === 0}
          className="px-6 h-12"
        >
          Back
        </Button>
        <Button 
          variant="primary" 
          onClick={nextScreen}
          disabled={!isCurrentScreenValid}
          className="px-10 h-12"
        >
          {currentScreenIndex === surveyConfig.length - 1 ? "Review" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
