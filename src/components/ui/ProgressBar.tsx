import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div 
      className={cn("w-full flex items-center gap-4", className)}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
    >
      <span className="text-label shrink-0" aria-hidden="true">
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="flex-1 h-1 bg-amber-600/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
