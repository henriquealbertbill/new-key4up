"use client";

import { useState, useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

const SCROLL_COMPACT_PX = 48;

/** Delta mínimo (px) no scroll suavizado para considerar direção; evita oscilação da mola */
const SCROLL_DIRECTION_THRESHOLD_PX = 2;

/** Suaviza o valor do scroll para a navbar reagir com inércia em vez de saltar no limiar */
const scrollSpringConfig = {
  stiffness: 72,
  damping: 32,
  mass: 0.45,
  restDelta: 0.05,
} as const;

const AVATAR_SRC =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face&auto=format&q=80";

/**
 * Framer "Nav Default" — data-framer-name inline:
 * border 1px #d9d9d9, backdrop-filter blur(5px), background rgba(255,255,255,0.5), border-radius 32px
 */
/** overflow-hidden: a borda da pill acompanha o layout ao encolher */
const framerNavShell =
  "overflow-hidden rounded-[32px] border border-[#d9d9d9] bg-white/50 backdrop-blur-[5px]";

/**
 * Framer botão Contact: border #dedede, bg #fafafa, radius 24px, box-shadow em camadas
 */
const framerContactShadow =
  "shadow-[0px_0.597px_0.597px_-0.9375px_rgba(0,0,0,0.07),0px_1.811px_1.811px_-1.875px_rgba(0,0,0,0.07),0px_4.787px_4.787px_-2.8125px_rgba(0,0,0,0.06),0px_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const contactButtonClass = [
  "inline-flex items-center justify-center rounded-[24px] border border-[#dedede] bg-[#fafafa] px-4 py-2 text-[13px] font-medium leading-none tracking-[-0.02em] text-black transition-colors hover:bg-[#f5f5f5]",
  framerContactShadow,
].join(" ");

const layoutTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 44,
  mass: 1,
};

const easeOutNav = [0.16, 1, 0.3, 1] as const;

const navLinks: { label: string; href: string }[] = [
  { label: "Trabalho", href: "#trabalho" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#sobre" },
  { label: "Preços", href: "#precos" },
  { label: "Blog", href: "#blog" },
];

type NavTypingDotsProps = {
  readonly isReducedMotion: boolean;
};

/**
 * Três pontos (indicador tipo “typing”): escala maior, movimento e opacidade mais suaves.
 */
const NavTypingDots = ({ isReducedMotion }: NavTypingDotsProps) => (
  <span className="flex h-5 items-center gap-1" aria-hidden>
    {[0, 1, 2].map((index) => (
      <motion.span
        key={index}
        className={[
          "size-[6px] shrink-0 rounded-full",
          index === 2 ? "bg-[#575757]" : "bg-figma-gray",
        ].join(" ")}
        initial={false}
        animate={
          isReducedMotion
            ? { y: 0, opacity: 0.88 }
            : {
                y: [0, -2.25, 0],
                opacity: [0.52, 0.98, 0.52],
              }
        }
        transition={
          isReducedMotion
            ? { duration: 0 }
            : {
                duration: 1.05,
                repeat: Infinity,
                repeatType: "loop",
                ease: [0.33, 0, 0.25, 1],
                delay: index * 0.17,
                times: [0, 0.5, 1],
              }
        }
      />
    ))}
  </span>
);

const navBarSize = "min-h-[52px] px-2.5 py-2";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  /**
   * Nav expandida fora do topo: scroll para cima (abaixo do limiar) ou clique nos pontos;
   * scroll para baixo ou voltar ao topo repõe.
   */
  const [userExpandedNav, setUserExpandedNav] = useState(false);
  const prevSmoothScrollRef = useRef<number | null>(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const smoothScrollY = useSpring(scrollY, scrollSpringConfig);

  const displayCompact = isCompact && !userExpandedNav;

  useMotionValueEvent(smoothScrollY, "change", (latest) => {
    const prev = prevSmoothScrollRef.current;
    prevSmoothScrollRef.current = latest;
    const next = latest > SCROLL_COMPACT_PX;
    setIsCompact((prevCompact) => (prevCompact !== next ? next : prevCompact));
    setUserExpandedNav((expanded) => {
      if (latest <= SCROLL_COMPACT_PX) {
        return false;
      }
      if (prev === null) {
        return expanded;
      }
      if (latest > prev + SCROLL_DIRECTION_THRESHOLD_PX) {
        return false;
      }
      if (latest < prev - SCROLL_DIRECTION_THRESHOLD_PX) {
        return true;
      }
      return expanded;
    });
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [isCompact, userExpandedNav]);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleKeyDownToggle = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleMenu();
    }
  };

  const handleExpandNavFromCompact = () => {
    setUserExpandedNav(true);
  };

  const handleNavBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    if (!displayCompact) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    handleExpandNavFromCompact();
  };

  const handleKeyDownExpandDots = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleExpandNavFromCompact();
    }
  };

  const avatarPx = 34;
  const stagger = prefersReducedMotion ? 0 : 0.032;
  const baseDur = prefersReducedMotion ? 0.12 : 0.48;

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <motion.nav
        layout
        layoutRoot
        aria-label="Principal"
        transition={{ ...layoutTransition, layout: layoutTransition }}
        onClick={handleNavBackgroundClick}
        className={[
          "mx-auto flex min-w-0 flex-nowrap items-center",
          framerNavShell,
          navBarSize,
          displayCompact
            ? "w-fit max-w-[min(100%,28rem)] cursor-pointer gap-2"
            : "w-full max-w-[calc(100vw-2rem)] justify-between lg:w-fit lg:max-w-none",
        ].join(" ")}
      >
        <motion.div layout="position" className="min-w-0 shrink-0">
          <Link
            href="/"
            className={[
              "flex min-w-0 items-center gap-2.5 rounded-[32px] py-0.5 pl-1",
              displayCompact ? "pr-1.5" : "pr-2 sm:pr-8 lg:pr-10",
            ].join(" ")}
          >
            <span className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-black/6">
              <Image
                src={AVATAR_SRC}
                alt="Key4up"
                width={64}
                height={64}
                className="object-cover"
                style={{ width: avatarPx, height: avatarPx }}
                sizes="34px"
                priority
              />
            </span>
            <span className="hidden min-w-0 sm:flex">
              <span className="truncate text-[15px] font-medium tracking-[-0.02em] text-black">Key4up</span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          layout
          className="hidden min-w-0 flex-1 items-center justify-center overflow-hidden lg:min-w-0 lg:flex"
          initial={false}
          animate={
            displayCompact
              ? {
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.94,
                  filter: prefersReducedMotion ? "blur(0px)" : "blur(6px)",
                  maxWidth: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  pointerEvents: "none",
                }
              : {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  maxWidth: 1600,
                  pointerEvents: "auto",
                }
          }
          transition={{
            layout: layoutTransition,
            duration: baseDur,
            ease: easeOutNav,
            opacity: { duration: baseDur * 0.92 },
            filter: { duration: baseDur * 1.05 },
            scale: { duration: baseDur },
            maxWidth: { duration: baseDur, ease: easeOutNav },
          }}
        >
          <div className="flex shrink-0 items-center gap-8 px-4">
            {navLinks.map((link, index) => (
              <motion.span
                key={link.href}
                className="inline-flex shrink-0"
                initial={false}
                animate={
                  displayCompact
                    ? {
                        opacity: 0,
                        y: prefersReducedMotion ? 0 : -6,
                      }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: baseDur,
                  delay: displayCompact
                    ? (navLinks.length - 1 - index) * stagger
                    : index * stagger * 0.6,
                  ease: easeOutNav,
                }}
              >
                <Link
                  href={link.href}
                  tabIndex={displayCompact ? -1 : undefined}
                  aria-hidden={displayCompact}
                  className="shrink-0 text-[14px] font-medium tracking-[-0.02em] text-black transition-opacity hover:opacity-60"
                >
                  {link.label}
                </Link>
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout="position"
          className="flex shrink-0 items-center gap-2 pr-0.5"
        >
          <motion.div
            layout
            initial={false}
            animate={
              displayCompact
                ? {
                    opacity: 0,
                    scale: prefersReducedMotion ? 1 : 0.92,
                    x: prefersReducedMotion ? 0 : 6,
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }
            }
            transition={{
              layout: layoutTransition,
              duration: baseDur,
              delay: displayCompact ? stagger * 2 : 0,
              ease: easeOutNav,
            }}
            className={[
              "hidden overflow-hidden sm:block",
              displayCompact ? "pointer-events-none max-w-0 min-w-0 px-0" : "min-w-0",
            ].join(" ")}
            style={{ pointerEvents: displayCompact ? "none" : "auto" }}
          >
            <Link
              href="#contacto"
              tabIndex={displayCompact ? -1 : undefined}
              className={`inline-flex ${contactButtonClass} h-full min-h-[36px]`}
            >
              Contacto
            </Link>
          </motion.div>

          <div
            className={[
              "relative flex shrink-0 items-center justify-center",
              displayCompact ? "size-10" : "size-10 lg:size-0 lg:min-h-0 lg:min-w-0 lg:overflow-hidden",
            ].join(" ")}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {displayCompact ? (
                <motion.button
                  key="dots"
                  type="button"
                  aria-label="Expandir navegação completa"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandNavFromCompact();
                  }}
                  onKeyDown={handleKeyDownExpandDots}
                  initial={{ opacity: 0, scale: 0.82, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
                  transition={{
                    duration: prefersReducedMotion ? 0.12 : 0.38,
                    ease: easeOutNav,
                    delay: prefersReducedMotion ? 0 : 0.08,
                  }}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full text-black outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <span className="sr-only">Expandir navegação</span>
                  <NavTypingDots isReducedMotion={Boolean(prefersReducedMotion)} />
                </motion.button>
              ) : (
                <motion.div
                  key="burger"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.34, ease: easeOutNav }}
                  className="absolute inset-0 flex items-center justify-center lg:hidden"
                >
                  <button
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    onClick={handleToggleMenu}
                    onKeyDown={handleKeyDownToggle}
                    className="flex size-10 items-center justify-center rounded-full text-black"
                  >
                    <span className="sr-only">Menu</span>
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      {menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.nav>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className={[
            "absolute left-4 right-4 top-[calc(100%+10px)] rounded-[24px] border border-[#d9d9d9] bg-white/50 p-3 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] backdrop-blur-[5px]",
            displayCompact ? "" : "lg:hidden",
          ].join(" ")}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[14px] font-medium tracking-[-0.02em] text-black transition-colors hover:bg-black/4"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className={`mt-2 text-center ${contactButtonClass}`}
            >
              Contacto
            </Link>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
