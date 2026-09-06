import * as React from "react";
import { cn } from "@/lib/utils";

export interface OptionCardProps {
  id: string;
  label: string;
  type: "single" | "multiple";
  selected: boolean;
  disabled?: boolean;
  onClick: (id: string) => void;
}

export function OptionCard({
  id,
  label,
  type,
  selected,
  disabled = false,
  onClick,
}: OptionCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <div
      role={type === "single" ? "radio" : "checkbox"}
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        if (!disabled) onClick(id);
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex items-center p-4 min-h-[72px] rounded-[16px] cursor-pointer transition-all duration-200 ease-out",
        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2",
        !disabled && "hover:-translate-y-[4px] hover:shadow-card-hover",
        selected
          ? "bg-[#1a1208] border-[#1a1208] text-[#f5f0e8] shadow-card"
          : "bg-white border-amber-600/15 text-[#1a1208] hover:border-amber-600/30",
        disabled && "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
      )}
    >
      <div className="flex-1 pr-4">
        <span className="font-medium text-[15px] sm:text-[16px] leading-snug block">
          {label}
        </span>
      </div>
      
      {/* Checkbox / Radio visual indicator */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-center border transition-colors",
          type === "single" ? "rounded-full w-5 h-5" : "rounded-[4px] w-5 h-5",
          selected
            ? "bg-[#c8830a] border-[#c8830a]"
            : "bg-transparent border-black/20"
        )}
      >
        {selected && type === "multiple" && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {selected && type === "single" && (
          <div className="w-2 h-2 rounded-full bg-white" />
        )}
      </div>
    </div>
  );
}
