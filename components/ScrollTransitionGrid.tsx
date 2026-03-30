"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ─── Card dimensions ──────────────────────────────────────────────────────────
const CW  = 280;   // card width  (px)
const CH  = 200;   // card height (px)
const GAP = 20;    // grid gap    (px)

// Half-steps used to place cards in the 2×2 grid
const hx = CW / 2 + GAP / 2;  // 150
const hy = CH / 2 + GAP / 2;  // 110

// Grid center is offset +80px right of viewport center so the left text
// column never overlaps the cards even at 1024px viewports.
const GCX = 80;

// ── Final positions: 2×2 grid ─────────────────────────────────────────────────
//   Coordinates are relative to the viewport center (0,0).
const GRID: [number, number][] = [
  [GCX - hx, -hy],   // top-left
  [GCX + hx, -hy],   // top-right
  [GCX - hx,  hy],   // bottom-left
  [GCX + hx,  hy],   // bottom-right
];

// ── Initial positions: stacked on right side ───────────────────────────────────
//   All clustered ~220px further right than the grid center.
//   Scale < 1 makes them appear "behind" the viewport plane.
const STACK = [
  { x: GCX + 218, y: -82, s: 0.62, r: -2.5, z: 4 },
  { x: GCX + 246, y: -24, s: 0.60, r:  3.0, z: 3 },
  { x: GCX + 215, y:  33, s: 0.58, r: -1.8, z: 2 },
  { x: GCX + 236, y:  84, s: 0.56, r:  2.2, z: 1 },
];

// ── Card content data ─────────────────────────────────────────────────────────
const CARDS = [
  { color: "from-slate-700  to-slate-900",   label: "Dashboard SaaS",  cat: "SaaS / Web App"   },
  { color: "from-emerald-600 to-teal-700",   label: "Loja Online",     cat: "E-Commerce"       },
  { color: "from-violet-600  to-purple-800", label: "App Mobile",      cat: "iOS & Android"    },
  { color: "from-orange-500  to-rose-600",   label: "Plataforma B2B",  cat: "Web App / B2B"    },
] as const;

// ─── EaseInOut helper (avoids importing from framer-motion internals) ─────────
const easeIO = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// ─── Single animated card ─────────────────────────────────────────────────────
interface CardProps {
  card:     (typeof CARDS)[number];
  progress: MotionValue<number>;            // eased 0 → 1
  start:    (typeof STACK)[number];
  end:      [number, number];
}

function AnimCard({ card, progress, start, end }: CardProps) {
  const x      = useTransform(progress, [0, 1], [start.x, end[0]]);
  const y      = useTransform(progress, [0, 1], [start.y, end[1]]);
  const scale  = useTransform(progress, [0, 1], [start.s, 1]);
  const rotate = useTransform(progress, [0, 1], [start.r, 0]);

  return (
    <motion.div
      style={{
        position:   "absolute",
        width:      CW,
        height:     CH,
        left:       "50%",
        top:        "50%",
        marginLeft: -(CW / 2),
        marginTop:  -(CH / 2),
        x, y, scale, rotate,
        zIndex:     start.z,
        willChange: "transform",
      }}
      className="rounded-2xl overflow-hidden cursor-pointer"
      // Shadow deepens on hover without touching the transform chain
      whileHover={{
        boxShadow: "0 32px 64px rgba(0,0,0,0.28)",
        transition: { duration: 0.25 },
      }}
      initial={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}
    >
      {/* ── Placeholder thumbnail — replace with next/image ───────────────── */}
      <div className={`w-full h-full bg-gradient-to-br ${card.color} relative select-none`}>
        {/* Browser chrome */}
        <div className="absolute inset-x-0 top-0 h-7 bg-black/25 flex items-center px-3 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/70"    />
          <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
          <span className="w-2 h-2 rounded-full bg-green-400/70"  />
          <div className="mx-auto h-3 w-24 rounded-full bg-white/20" />
        </div>

        {/* Skeleton UI */}
        <div className="absolute inset-0 top-7 p-4 flex flex-col gap-2">
          <div className="h-2.5 w-3/4 rounded bg-white/20" />
          <div className="h-2.5 w-1/2 rounded bg-white/15" />
          <div className="mt-1.5 grid grid-cols-3 gap-1.5 flex-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg bg-white/10" />
            ))}
          </div>
        </div>

        {/* Footer label */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] font-semibold leading-tight text-white/90">{card.label}</p>
          <p className="text-[10px] mt-0.5 text-white/40">{card.cat}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ScrollTransitionGrid() {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress over the full 300vh container
  const { scrollYProgress: raw } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Cards transition between scroll positions 0.15 → 0.75, then apply easing
  const cardRaw     = useTransform(raw, [0.15, 0.75], [0, 1], { clamp: true });
  const cardEased   = useTransform(cardRaw, easeIO);

  // Hero text: in at 0, out by 0.20
  const heroOpacity = useTransform(raw, [0,    0.20], [1, 0]);
  const heroSlide   = useTransform(raw, [0,    0.20], [0, -24]);

  // Grid label: in at 0.70, fully visible by 0.88
  const gridOpacity = useTransform(raw, [0.70, 0.88], [0, 1]);
  const gridSlide   = useTransform(raw, [0.70, 0.88], [20, 0]);

  // Scroll hint fades out immediately
  const hintOpacity = useTransform(raw, [0, 0.07], [1, 0]);

  return (
    <div ref={ref} style={{ height: "300vh" }} className="relative">
      {/* ── Sticky viewport ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f5f3]">

        {/* ── Hero text column ────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroSlide }}
          className="pointer-events-none absolute left-10 top-1/2 z-20 w-72 -translate-y-1/2 lg:left-20"
        >
          {/* Available badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-green-500" />
            </span>
            Disponível para projetos
          </span>

          <h1 className="text-5xl font-black leading-none tracking-tight lg:text-6xl">
            <span className="mb-1 block text-gray-300">Software que</span>
            <span className="block text-gray-900">entrega.</span>
          </h1>

          <p className="mt-5 max-w-[220px] text-sm leading-relaxed text-gray-500">
            Projetos reais construídos com tecnologia moderna e foco em resultados.
          </p>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="mt-8 flex items-center gap-2 text-sm text-gray-400"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
            Scroll para explorar
          </motion.div>
        </motion.div>

        {/* ── Animated cards ──────────────────────────────────────────────── */}
        {CARDS.map((card, i) => (
          <AnimCard
            key={card.label}
            card={card}
            progress={cardEased}
            start={STACK[i]}
            end={GRID[i]}
          />
        ))}

        {/* ── Grid label column (same slot as hero text) ───────────────────── */}
        <motion.div
          style={{ opacity: gridOpacity, y: gridSlide }}
          className="pointer-events-none absolute left-10 top-1/2 z-20 w-72 -translate-y-1/2 lg:left-20"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Últimos projetos
          </p>

          <h2 className="text-5xl font-black leading-none tracking-tight lg:text-6xl">
            <span className="mb-1 block text-gray-300">Trabalho</span>
            <span className="block text-gray-900">selecionado.</span>
          </h2>

          {/* Re-enable pointer events only on the link */}
          <a
            href="#trabalho"
            className="pointer-events-auto mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 underline underline-offset-4 transition-colors hover:text-gray-500"
          >
            Ver todos os projetos ↗
          </a>
        </motion.div>

        {/* ── Hero depth dots (fade with hero text) ───────────────────────── */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-10 z-20 flex flex-col gap-1.5 lg:right-20"
        >
          {STACK.map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-gray-400" />
          ))}
        </motion.div>

      </div>
    </div>
  );
}
