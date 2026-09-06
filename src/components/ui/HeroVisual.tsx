import React from "react";
import Image from "next/image";
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
        <Image
          src="/hero-journey.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover object-center"
          draggable={false}
        />
      </div>
    </div>
  );
}
