"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-amber-600 transition-transform duration-200 ease-out hidden sm:flex items-center justify-center"
        style={{
          width: "36px",
          height: "36px",
          transform: `translate(${position.x - 18}px, ${position.y - 18}px) scale(${
            isHovering ? 1.6 : 1
          })`,
          backgroundColor: isHovering ? "rgba(200, 131, 10, 0.1)" : "transparent",
        }}
      >
        {/* Inner Dot */}
        <div
          className="rounded-full bg-amber-600 transition-transform duration-200"
          style={{
            width: "5px",
            height: "5px",
            transform: `scale(${isHovering ? 0 : 1})`,
          }}
        />
      </div>
    </>
  );
}
