import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, maxLength = 500, value, onValueChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);

    const [currentLength, setCurrentLength] = React.useState(
      value ? value.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (val.length <= maxLength) {
        setCurrentLength(val.length);
        if (onValueChange) {
          onValueChange(val);
        }
        if (props.onChange) {
          props.onChange(e);
        }
        
        // Auto-resize
        if (internalRef.current) {
          internalRef.current.style.height = "auto";
          internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
        }
      }
    };

    // Auto-resize on mount if there's initial value
    React.useEffect(() => {
      if (internalRef.current && value) {
        internalRef.current.style.height = "auto";
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [value]);

    return (
      <div className="relative w-full">
        <textarea
          ref={internalRef}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            "w-full min-h-[100px] resize-none rounded-[16px] bg-white border border-amber-600/20 p-4 pb-8 text-[#1a1208] text-[15px] sm:text-[16px] leading-relaxed transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:border-transparent",
            "placeholder:text-[#8a7a66]",
            className
          )}
          {...props}
        />
        <div
          className={cn(
            "absolute bottom-3 right-4 text-[0.75rem] font-medium transition-colors",
            currentLength >= maxLength ? "text-red-600" : "text-[#8a7a66]"
          )}
        >
          {currentLength} / {maxLength}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
