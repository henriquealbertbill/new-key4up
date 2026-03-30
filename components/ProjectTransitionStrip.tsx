"use client";

/**
 * Full-bleed transition band between projects and featured quote (~300px).
 * Mirrors Figma node 1:2296 (stacked masked layers + progressive blur) using CSS only.
 */
export default function ProjectTransitionStrip() {
  return (
    <section
      aria-hidden
      className="relative h-[300px] w-full overflow-hidden bg-[#fafafa]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#f3f3f3] to-[#fafafa]" />
        <div
          className="absolute -left-[8%] top-[18%] h-[64%] w-[42%] rounded-[48px] bg-white/80 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)] backdrop-blur-[2px]"
        />
        <div
          className="absolute left-[22%] top-[8%] h-[72%] w-[38%] rounded-[40px] bg-[#ececec]/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] backdrop-blur-[3px]"
        />
        <div
          className="absolute right-[12%] top-[22%] h-[58%] w-[36%] rounded-[44px] bg-white/70 shadow-[0_28px_90px_-28px_rgba(0,0,0,0.14)] backdrop-blur-[4px]"
        />
        <div
          className="absolute -right-[6%] bottom-[10%] h-[48%] w-[34%] rounded-[36px] bg-[#e8e8e8]/85 backdrop-blur-[6px]"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-[#dedede]/80" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#dedede]/80" />
      </div>
    </section>
  );
}
