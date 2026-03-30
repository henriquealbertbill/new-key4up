"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const TYPING_PHRASES: readonly string[] = [
  "softwares que vendem.",
  "tráfego que converte.",
  "e-commerces que escalam.",
  "marcas que crescem.",
];

const TYPING_PHRASE_FOR_LAYOUT = TYPING_PHRASES.reduce(
  (longest: string, phrase: string) =>
    phrase.length > longest.length ? phrase : longest,
);

const TYPING_SPEED_MS = 52;
const DELETING_SPEED_MS = 38;
const PAUSE_AT_FULL_MS = 2400;
const PAUSE_BETWEEN_MS = 480;

const useTypingRotate = (phrases: readonly string[]) => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let timeoutId: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText === phrase) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AT_FULL_MS);
    } else if (isDeleting && displayText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, PAUSE_BETWEEN_MS);
    } else if (isDeleting) {
      timeoutId = setTimeout(() => {
        setDisplayText((t) => t.slice(0, -1));
      }, DELETING_SPEED_MS);
    } else {
      timeoutId = setTimeout(() => {
        setDisplayText(phrase.slice(0, displayText.length + 1));
      }, TYPING_SPEED_MS);
    }
    return () => clearTimeout(timeoutId);
  }, [displayText, phraseIndex, isDeleting, phrases]);
  return displayText;
};

export default function Hero() {
  const typedLine = useTypingRotate(TYPING_PHRASES);
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center pt-[120px] md:pt-[132px]"
    >
      <div
        id="inicio"
        className="flex w-full max-w-[1080px] flex-col gap-8 px-4 pb-16 sm:px-8 lg:px-11"
      >
        <div className="flex w-full max-w-[992px] flex-col gap-6">
          <motion.div {...fadeUp(0.08)} className="flex flex-col items-start">
            <div className="relative flex h-[30px] items-center gap-2 rounded-full border border-card-border bg-card pl-2 pr-4 shadow-[0px_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0px_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0px_10px_10px_-3.75px_rgba(0,0,0,0.06)] dark:shadow-[0px_2px_12px_-4px_rgba(0,0,0,0.5)]">
              <span className="relative flex size-4 shrink-0 items-center justify-center">
                <span
                  className="online-status-pulse absolute size-4 rounded-full bg-figma-green/25"
                  aria-hidden
                />
                <span
                  className="relative size-2 rounded-full bg-figma-green shadow-[0_0_0_1px_rgba(18,179,63,0.35)]"
                  aria-hidden
                />
              </span>
              <span className="text-[11.3px] font-semibold tracking-[-0.01em] text-foreground">
                Disponível para novos projetos
              </span>
            </div>
          </motion.div>

          <div className="flex w-full max-w-[496px] flex-col gap-6">
            <motion.div {...fadeUp(0.14)} className="flex flex-col gap-0">
              <h1 className="font-medium leading-[1.02] tracking-[-0.032em] text-figma-gray text-[clamp(2.75rem,7.2vw,4.31rem)]">
                Nós criamos...
              </h1>
              <h1
                className="mt-0 grid w-full font-medium leading-[1.02] tracking-[-0.032em] text-foreground text-[clamp(2.75rem,7.2vw,4.31rem)] [&>span]:col-start-1 [&>span]:row-start-1"
                aria-live="polite"
                aria-label={typedLine}
              >
                <span className="invisible select-none" aria-hidden>
                  {TYPING_PHRASE_FOR_LAYOUT}
                </span>
                <span className="min-w-0">
                  <span className="inline align-baseline">{typedLine}</span>
                  <span
                    className="typing-cursor ml-[0.08em] inline-block h-[0.72em] w-[3px] translate-y-[0.06em] bg-foreground align-baseline animate-pulse max-sm:h-[0.68em]"
                    aria-hidden
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="max-w-[390px]">
              <p className="text-[16.9px] font-semibold leading-[25.2px] tracking-[-0.022em] text-foreground">
                Desenvolvimento que impulsiona o crescimento, não só código.
                <span className="font-medium text-figma-muted">
                  {" "}
                  Criamos soluções completas, do software ao marketing para
                  atrair clientes, gerar valor e converter de verdade.
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div {...fadeUp(0.26)} className="flex flex-col items-start">
          <a
            id="hero-primary-cta"
            href="#contacto"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-3xl border border-figma-muted bg-black py-2 pl-2 pr-4 text-left shadow-[0px_0.74px_0.74px_-0.75px_rgba(0,0,0,0.33),0px_2px_2px_-1.5px_rgba(0,0,0,0.32),0px_4.4px_4.4px_-2.25px_rgba(0,0,0,0.3),0px_9.8px_9.8px_-3px_rgba(0,0,0,0.25),0px_25px_25px_-3.75px_rgba(0,0,0,0.11),0px_0px_0px_1px_var(--figma-muted)] transition-[transform,opacity] duration-300 hover:scale-[1.03] hover:opacity-95 dark:border-zinc-500 dark:bg-zinc-100 dark:shadow-none dark:[box-shadow:0_0_0_1px_rgba(228,228,231,0.35)]"
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.4)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.85)]"
              aria-hidden
            />
            <span className="relative flex h-8 shrink-0 items-center">
              <span className="relative z-20 flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gray-600 to-gray-900 ring-2 ring-black transition-transform duration-300 group-hover:scale-105 dark:ring-zinc-300">
                <span className="text-[10px] font-bold text-white">K4</span>
              </span>
              <span className="ml-1 inline-flex max-w-0 items-center overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[70px] group-hover:opacity-100">
                <span
                  className="mr-1 shrink-0 translate-y-px text-base font-semibold leading-none text-white dark:text-zinc-900"
                  aria-hidden
                >
                  +
                </span>
                <span className="flex h-8 shrink-0 items-center justify-center rounded-full bg-white px-2.5 text-[10.5px] font-semibold tracking-[-0.01em] text-black dark:bg-zinc-900 dark:text-zinc-100">
                  You
                </span>
              </span>
            </span>
            <span className="relative text-[13.3px] font-semibold tracking-[-0.01em] text-white dark:text-zinc-900">
              Agenda uma call comigo
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
