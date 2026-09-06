import * as React from "react";
import { cn } from "@/lib/utils"; // Wait, I need to create this

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[100px] text-[0.95rem] font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 disabled:opacity-50 disabled:pointer-events-none",
          "hover:-translate-y-[2px]",
          variant === "primary"
            ? "bg-[#1a1208] text-[#f5f0e8] hover:bg-[#c8830a] shadow-sm hover:shadow-card-hover"
            : "bg-transparent border-[1.5px] border-[rgba(26,18,8,0.18)] text-[#1a1208] hover:border-[#c8830a] hover:text-[#c8830a]",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
