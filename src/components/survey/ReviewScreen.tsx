"use client";

import React from "react";
import { useSurvey } from "@/lib/SurveyContext";
import { Button } from "@/components/ui/Button";

interface ReviewScreenProps {
  onEdit: (screenIndex: number) => void;
  onContinue: () => void;
}

export function ReviewScreen({ onEdit, onContinue }: ReviewScreenProps) {
  const { answers, contexts, manifest } = useSurvey();

  return (
    <div className="w-full max-w-[700px] mx-auto min-h-screen py-12 px-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl sm:text-4xl font-medium mb-10 leading-tight">
        Review your responses
      </h2>

      <div className="flex-1 flex flex-col gap-10 pb-10">
        {manifest.config.map((screen, index) => {
          return (
            <div key={screen.id} className="p-6 sm:p-8 rounded-2xl bg-white border border-amber-600/15 shadow-sm relative group">
              <h3 className="text-lg font-medium text-[#1a1208] mb-6 pr-16">{screen.title}</h3>
              
              <div className="flex flex-col gap-5">
                {screen.fields.map(field => {
                  const fieldAnswers = answers[field.id] || [];
                  if (fieldAnswers.length === 0) return null;
                  
                  // Handle derived options fetching properly
                  let options = field.options || [];
                  if (field.derivesFromId) {
                     const parentField = screen.fields.find(f => f.id === field.derivesFromId);
                     const parentAnswers = answers[field.derivesFromId] || [];
                     options = parentAnswers.map(ansId => {
                        const opt = parentField?.options?.find(o => o.id === ansId);
                        return opt || { id: ansId, label: ansId };
                     });
                  }

                  const displayValues = fieldAnswers.map(ansId => {
                     const opt = options.find(o => o.id === ansId);
                     return opt ? opt.label : ansId;
                  });

                  if (displayValues.length === 0) return null;

                  return (
                    <div key={field.id} className="flex flex-col gap-1.5">
                      <span className="text-label text-amber-600/80">{field.label.replace(" — Select one:", "").replace(" (Select one from selected options)", "").replace(" (Select up to 3)", "")}</span>
                      {field.type === "ranking" ? (
                        <ol className="list-decimal pl-5 text-[#4a3f2f] text-sm sm:text-base space-y-1">
                          {displayValues.map((val, i) => (
                            <li key={i}>{val}</li>
                          ))}
                        </ol>
                      ) : (
                        <ul className="text-[#4a3f2f] text-sm sm:text-base">
                          {displayValues.map((val, i) => (
                            <li key={i} className="flex items-start before:content-['•'] before:mr-2 before:text-amber-600">
                              {val}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

                {contexts[screen.id] && (
                  <div className="flex flex-col gap-1.5 mt-2 bg-amber-600/5 p-4 rounded-xl">
                    <span className="text-label text-amber-600/80">Added Context</span>
                    <p className="text-[#4a3f2f] text-sm italic whitespace-pre-wrap break-words">{contexts[screen.id]}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => onEdit(index)}
                className="absolute top-6 right-6 text-sm font-medium text-amber-600 hover:underline px-3 py-1.5 bg-amber-600/10 rounded-full transition-colors hover:bg-amber-600/20"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-12 sticky bottom-0 sm:bottom-6 z-10 pb-6 sm:pb-0">
        <div className="flex items-center justify-end bg-white/90 backdrop-blur-md p-4 sm:p-5 -mx-4 sm:mx-0 rounded-t-3xl sm:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.03)] sm:shadow-sm border-t sm:border border-amber-600/10">
          <Button 
            variant="primary" 
            onClick={onContinue}
            className="px-10 h-12 w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
