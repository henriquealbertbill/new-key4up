"use client";

import { motion } from "framer-motion";

const avatars = [
  { initials: "A", className: "bg-rose-400" },
  { initials: "J", className: "bg-sky-500" },
  { initials: "S", className: "bg-amber-400" },
  { initials: "P", className: "bg-emerald-500" },
  { initials: "M", className: "bg-violet-500" },
];

const logoRow = [
  "Codecraft",
  "Frequencii",
  "Kintsugi",
  "Northwind",
  "PixelForge",
  "DataLane",
];

export default function SocialProof() {
  return (
    <section className="relative w-full border-y border-[#dedede] bg-[#fafafa] py-8">
      <div className="mx-auto flex max-w-[1080px] flex-col items-stretch gap-8 px-4 sm:flex-row sm:items-center sm:gap-8 sm:px-8 lg:px-11">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex items-center pl-2">
            {avatars.map((a, i) => (
              <span
                key={a.initials}
                className={`-ml-2 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-[#fafafa] text-[10px] font-bold text-white shadow-[0_0_0_2px_#fafafa] first:ml-0 ${a.className}`}
                style={{ zIndex: 5 - i }}
                aria-hidden
              >
                {a.initials}
              </span>
            ))}
          </div>
          <div className="flex min-w-0 flex-col gap-1 pl-1">
            <div className="flex gap-0.5 text-[12px] leading-none text-amber-500" aria-hidden>
              {"★★★★★".split("").map((s, j) => (
                <span key={j}>{s}</span>
              ))}
            </div>
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#545454]">
              99+ clientes felizes
            </p>
          </div>
        </motion.div>

        <div className="min-w-0 flex-1 overflow-hidden opacity-70">
          <div className="flex gap-16 marquee-track whitespace-nowrap">
            {[...logoRow, ...logoRow].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#828282]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
