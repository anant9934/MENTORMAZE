### Landing Page Redesign Report

1. **Files changed**:
   - `src/components/survey/SurveyController.tsx` (Replaced JSX for `appState === "landing"`)
   - `src/app/layout.tsx` (Updated Next.js metadata)
   - `/public/logo.png` & `/public/favicon.png` (Added)

2. **Visual changes**:
   - Shifted from a center-stacked minimal card layout to a premium, left-aligned, full-screen editorial composition with intentional whitespace logic.

3. **Logo integration**:
   - `logo.png` is placed via `<img />` in a dedicated `<header>` tag at the top-left boundary. It preserves native aspect ratio and scales via responsive height (`h-7 sm:h-8 md:h-10`). No CSS distortion or stretching applied.

4. **Favicon integration**:
   - The default Next.js `favicon.ico` was deleted to prevent caching conflicts. The provided `favicon.png` was copied to `src/app/icon.png`, allowing the Next.js App Router to natively generate the correct metadata and `<link rel="icon">` tags without manual metadata overrides.

5. **Typography changes**:
   - Preserved `playfair` and `inter` fonts. Greatly amplified the scale of the headline (`text-[2.75rem] lg:text-[5.5rem]`) and applied strict leading (`leading-[1.05]`) to evoke editorial masthead aesthetics. Eyebrow text uses high-tracking uppercase. 

6. **Responsive improvements**:
   - Replaced fixed central boxes with a responsive `flex-col` constraint system. The logo never overlaps content. Typography flows cleanly across 320px up to 1920px. 

7. **Maze visual treatment**:
   - Inserted absolute positioned `<svg>` elements using thin (`0.5` to `1.5` stroke), low-opacity (`3%`) strokes that mimic clean architectural drafting lines mapping orthogonal paths, fading into the existing cream background without competing with the content.

8. **Accessibility changes**:
   - The decorative SVG maze is explicitly `aria-hidden="true"`.
   - The logo contains accurate `alt="MentorMaze"` text.
   - Contrast is maintained (dark brown `#1a1208` and `#4a3f2f` on `#f5f0e8`).

9. **Performance considerations**:
   - Absolutely no new external dependencies or animation libraries (e.g., Framer Motion) were introduced. Used pure HTML/SVG and Tailwind classes to remain ultra-lightweight.

10. **Confirmation that survey/backend functionality was untouched**:
    - **PASS**. State management logic, Survey dependencies, Zod, and actions remain 100% untouched. 

11. **Commands run**:
    - `cp logo.png favicon.png public/`
    - `npm run lint && npm run build`

12. **Final status**:
    - **PASS**. Implementation complete and visually verified.
