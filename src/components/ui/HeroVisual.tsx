import React from "react";
import { cn } from "@/lib/utils";

export function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full select-none overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to left, black 70%, transparent 100%), linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%), linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img
          src="/hero-journey.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>
    </div>
  );
}
