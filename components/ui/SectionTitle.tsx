"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  ghostLines: string[];
  solidLine: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function SectionTitle({
  ghostLines,
  solidLine,
  className = "",
  align = "left",
}: SectionTitleProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={`${alignClass} ${className}`}>
      {ghostLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="block text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-figma-gray"
        >
          {line}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.55,
          delay: ghostLines.length * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="block text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.034em] text-foreground"
      >
        {solidLine}
      </motion.div>
    </div>
  );
}
