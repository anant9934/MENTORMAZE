"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { SurveyManifest } from "@/data/survey";

export type Answers = Record<string, string[]>;
export type Contexts = Record<string, string>;

interface SurveyContextType {
  currentScreenIndex: number;
  answers: Answers;
  contexts: Contexts;
  setAnswer: (fieldId: string, value: string[]) => void;
  toggleAnswer: (fieldId: string, value: string, max?: number) => void;
  setContext: (screenId: string, value: string) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  setScreenIndex: (index: number) => void;
  isCurrentScreenValid: boolean;
  validationErrors: Record<string, string>;
  isComplete: boolean;
  sessionId: string;
  manifest: SurveyManifest;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children, manifest }: { children: React.ReactNode, manifest: SurveyManifest }) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contexts, setContexts] = useState<Contexts>({});
  const [isComplete, setIsComplete] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const currentScreen = manifest.config[currentScreenIndex];

  // Specific rule for Q6: if "none" is selected, clear other options.
  const handleAnswerChange = useCallback((fieldId: string, value: string[]) => {
    setAnswers(prev => {
      let newValue = value;
      // Hardcoded rule for Q6 "I did not have significant project experience"
      if (manifest.surveyType === 'professional' && fieldId === "project_type") {
        if (value.includes("none") && value[value.length - 1] === "none") {
          newValue = ["none"];
        } else if (value.includes("none") && value.length > 1) {
          newValue = value.filter(v => v !== "none");
        }
      }
      // Cascade removal to derived fields
      const derivedFields = manifest.config
        .flatMap(s => s.fields)
        .filter(f => f.derivesFromId === fieldId);
      
      const newAnswers = { ...prev, [fieldId]: newValue };

      derivedFields.forEach(dField => {
        const currentDerived = newAnswers[dField.id] || [];
        const filteredDerived = currentDerived.filter(ans => newValue.includes(ans));
        if (currentDerived.length !== filteredDerived.length) {
          newAnswers[dField.id] = filteredDerived;
        }
      });

      return newAnswers;
    });
  }, [manifest]);

  const setAnswer = useCallback((fieldId: string, value: string[]) => {
    handleAnswerChange(fieldId, value);
  }, [handleAnswerChange]);

  const toggleAnswer = useCallback((fieldId: string, value: string, max = 1) => {
    setAnswers(prev => {
      const current = prev[fieldId] || [];
      let next: string[];

      if (max === 1) {
        next = [value];
      } else {
        if (current.includes(value)) {
          next = current.filter(v => v !== value);
        } else {
          if (current.length < max) {
            next = [...current, value];
          } else {
            next = current; // Max reached
          }
        }
      }

      // Hardcoded rule for Q6 again
      if (manifest.surveyType === 'professional' && fieldId === "project_type") {
        if (value === "none" && !current.includes("none")) {
          next = ["none"];
        } else if (next.includes("none") && value !== "none") {
          next = next.filter(v => v !== "none");
        }
      }

      // Cascade removal to derived fields
      const derivedFields = manifest.config
        .flatMap(s => s.fields)
        .filter(f => f.derivesFromId === fieldId);
      
      const newAnswers = { ...prev, [fieldId]: next };

      derivedFields.forEach(dField => {
        const currentDerived = newAnswers[dField.id] || [];
        const filteredDerived = currentDerived.filter(ans => next.includes(ans));
        if (currentDerived.length !== filteredDerived.length) {
          newAnswers[dField.id] = filteredDerived;
        }
      });

      return newAnswers;
    });
  }, [manifest]);

  const setContext = useCallback((screenId: string, value: string) => {
    setContexts(prev => ({ ...prev, [screenId]: value }));
  }, []);

  // Validation Logic
  const { isValid, errors } = useMemo(() => {
    if (!currentScreen) return { isValid: true, errors: {} };
    const newErrors: Record<string, string> = {};
    let valid = true;

    currentScreen.fields.forEach(field => {
      const fieldAnswers = answers[field.id] || [];
      const min = field.min || 0;
      const max = field.max;
      
      // If it's the "value_factor" in Q6, but "none" was selected in "project_type"
      if (manifest.surveyType === 'professional' && field.id === "value_factor" && (answers["project_type"] || []).includes("none")) {
        // Skip validation
        return;
      }

      if (fieldAnswers.length < min) {
        valid = false;
        newErrors[field.id] = `Please select at least ${min} option${min > 1 ? 's' : ''}.`;
      }

      // Add max length validation for textarea
      if (field.type === 'textarea' && max) {
        const text = fieldAnswers[0] || "";
        if (text.length > max) {
          valid = false;
          newErrors[field.id] = `Maximum ${max} characters allowed.`;
        }
      }
      
      // Check derived fields (like "greatest_impact")
      if (field.derivesFromId) {
        const parentAnswers = answers[field.derivesFromId] || [];
        const isDerivedValid = fieldAnswers.every(ans => parentAnswers.includes(ans));
        if (!isDerivedValid) {
          valid = false;
          newErrors[field.id] = "Selected option is no longer valid. Please re-select.";
        }
      }
    });

    return { isValid: valid, errors: newErrors };
  }, [currentScreen, answers, manifest.surveyType]);

  const nextScreen = useCallback(() => {
    if (isValid) {
      if (currentScreenIndex < manifest.config.length - 1) {
        setCurrentScreenIndex(prev => prev + 1);
        window.scrollTo(0,0);
      } else {
        setIsComplete(true);
        window.scrollTo(0,0);
      }
    }
  }, [isValid, currentScreenIndex, manifest]);

  const prevScreen = useCallback(() => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex(prev => prev - 1);
      window.scrollTo(0,0);
    }
  }, [currentScreenIndex]);

  return (
    <SurveyContext.Provider value={{
      currentScreenIndex,
      answers,
      contexts,
      setAnswer,
      toggleAnswer,
      setContext,
      nextScreen,
      prevScreen,
      setScreenIndex: setCurrentScreenIndex,
      isCurrentScreenValid: isValid,
      validationErrors: errors,
      isComplete,
      sessionId,
      manifest
    }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
}
