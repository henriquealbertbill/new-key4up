"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectCards } from "@/data/project-cards";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stack offsets (px) relative to hero anchor; tuned for fanned deck over hero right.
 */
type StackConfig = Readonly<{
  ox: number;
  oy: number;
  baseScale: number;
  r: number;
  z: number;
}>;

/** Extra pull toward the hero copy (left); subtracted from hr.right anchor. */
const HERO_STACK_PULL_LEFT_PX = 180;

/** Nudge the hero stack slightly down (px) for initial deck only via anchorY. */
const HERO_STACK_NUDGE_DOWN_PX = 60;

const STACK_LAYOUT: readonly StackConfig[] = [
  { ox: -88, oy: -82, baseScale: 0.78, r: -5.6, z: 4 },
  { ox: -42, oy: -46, baseScale: 0.76, r: 4.2, z: 3 },
  { ox: -102, oy: -6, baseScale: 0.74, r: -3.2, z: 2 },
  { ox: -56, oy: 30, baseScale: 0.72, r: 3.4, z: 1 },
];

const easeIo = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/** Card block height from thumbnail aspect + footer row — avoids stack drift when cell height changes (fixed vs in-flow). */
const estimateCardBlockHeightPx = (cellWidthPx: number): number => {
  const thumbRatio = 363 / 484;
  const estMetaRowPx = 72;
  return cellWidthPx * thumbRatio + estMetaRowPx;
};

const CARD_COUNT = projectCards.length;

const MIN_PROGRESS_SNAP = 0.002;

/** Show title/category row from halfway through the hero→grid scroll (desktop only). */
const CARD_CAPTION_VISIBLE_FROM_PROGRESS = 0.5;

const snapScrollProgress = (progress: number): number => {
  const clamped = gsap.utils.clamp(0, 1, progress);
  if (clamped <= MIN_PROGRESS_SNAP) {
    return 0;
  }
  if (clamped >= 1 - MIN_PROGRESS_SNAP) {
    return 1;
  }
  return clamped;
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: CARD_COUNT }, () => null),
  );
  const articleRefs = useRef<(HTMLElement | null)[]>(
    Array.from({ length: CARD_COUNT }, () => null),
  );
  const captionRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: CARD_COUNT }, () => null),
  );

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return () => undefined;
      }
      const sectionEl = sectionRef.current;
      const heroEl = document.getElementById("inicio");
      if (!sectionEl || !heroEl) {
        return () => undefined;
      }
      const heroAnchorRef = { anchorX: 0, anchorY: 0, hasValue: false };
      const primeHeroAnchor = (): void => {
        const hero = document.getElementById("inicio");
        if (!hero) {
          return;
        }
        const hr = hero.getBoundingClientRect();
        heroAnchorRef.anchorX = hr.right - 64 - HERO_STACK_PULL_LEFT_PX;
        heroAnchorRef.anchorY =
          hr.top + hr.height * 0.4 + HERO_STACK_NUDGE_DOWN_PX;
        heroAnchorRef.hasValue = true;
      };
      primeHeroAnchor();
      /**
       * After scrolling past `onLeave`, cards use normal document flow (clearProps).
       * While `releasedPastEnd` is true and progress is still ~1, we must NOT call
       * gsap.set — otherwise onUpdate immediately re-applies fixed positioning and
       * breaks the layout; scrolling back to the hero then leaves stale transforms.
       */
      let releasedPastEnd = false;
      const clearAnimatedState = (): void => {
        for (let i = 0; i < CARD_COUNT; i++) {
          const el = articleRefs.current[i];
          const cap = captionRefs.current[i];
          if (el) {
            gsap.set(el, { clearProps: "all" });
          }
          if (cap) {
            gsap.set(cap, { clearProps: "all" });
          }
        }
      };
      const setCaptionsForProgress = (pr: number, showInFlow: boolean): void => {
        const show =
          showInFlow || pr >= CARD_CAPTION_VISIBLE_FROM_PROGRESS;
        for (let i = 0; i < CARD_COUNT; i++) {
          const cap = captionRefs.current[i];
          if (!cap) {
            continue;
          }
          gsap.set(cap, {
            autoAlpha: show ? 1 : 0,
            pointerEvents: show ? "auto" : "none",
          });
        }
      };
      const updateCards = (progress: number): void => {
        const pr = snapScrollProgress(progress);
        if (releasedPastEnd && pr >= 1 - MIN_PROGRESS_SNAP) {
          setCaptionsForProgress(1, true);
          return;
        }
        if (releasedPastEnd && pr < 1 - MIN_PROGRESS_SNAP) {
          releasedPastEnd = false;
        }
        primeHeroAnchor();
        if (!heroAnchorRef.hasValue) {
          return;
        }
        const anchorX = heroAnchorRef.anchorX;
        const anchorY = heroAnchorRef.anchorY;
        const p = easeIo(pr);
        const showCaption = pr >= CARD_CAPTION_VISIBLE_FROM_PROGRESS;
        for (let i = 0; i < CARD_COUNT; i++) {
          const el = articleRefs.current[i];
          const cell = cellRefs.current[i];
          if (!el || !cell) {
            continue;
          }
          const cr = cell.getBoundingClientRect();
          const cw = Math.max(cr.width, 320);
          const blockH = estimateCardBlockHeightPx(cw);
          const stack = STACK_LAYOUT[i];
          const stackLeft = anchorX + stack.ox - cw * 0.5;
          const stackTop = anchorY + stack.oy - blockH * 0.45;
          const scale = 1 + (stack.baseScale - 1) * (1 - p);
          const rot = stack.r * (1 - p);
          gsap.set(el, {
            position: "fixed",
            left: cr.left,
            top: cr.top,
            width: cw,
            boxSizing: "border-box",
            x: (stackLeft - cr.left) * (1 - p),
            y: (stackTop - cr.top) * (1 - p),
            scale,
            rotation: rot,
            zIndex: 24 + stack.z,
            transformOrigin: "50% 45%",
            force3D: true,
            pointerEvents: "auto",
          });
          const cap = captionRefs.current[i];
          if (cap) {
            gsap.set(cap, {
              autoAlpha: showCaption ? 1 : 0,
              pointerEvents: showCaption ? "auto" : "none",
            });
          }
        }
      };
      const st = ScrollTrigger.create({
        trigger: heroEl,
        start: "top top",
        endTrigger: sectionEl,
        end: "center center",
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          primeHeroAnchor();
        },
        onUpdate: (self) => {
          updateCards(self.progress);
        },
        onLeave: () => {
          releasedPastEnd = true;
          clearAnimatedState();
        },
        onEnterBack: (self) => {
          if (snapScrollProgress(self.progress) < 1 - MIN_PROGRESS_SNAP) {
            releasedPastEnd = false;
          }
          requestAnimationFrame(() => {
            updateCards(self.progress);
          });
        },
      });
      const syncScrollLayout = (): void => {
        primeHeroAnchor();
        ScrollTrigger.refresh();
        updateCards(st.progress);
      };
      /**
       * With start: "top top", progress stays 0 until the hero meets the scroller start —
       * onUpdate may not run every tick while the user scrolls in that phase, so fixed
       * cards would lag the hero then jump when progress becomes &gt; 0. Sync on scroll.
       */
      let scrollRafId = 0;
      const handleWindowScroll = (): void => {
        cancelAnimationFrame(scrollRafId);
        scrollRafId = requestAnimationFrame(() => {
          ScrollTrigger.update();
          updateCards(st.progress);
        });
      };
      window.addEventListener("scroll", handleWindowScroll, { passive: true });
      updateCards(st.progress);
      requestAnimationFrame(() => {
        requestAnimationFrame(syncScrollLayout);
      });
      const handleWindowLoad = (): void => {
        syncScrollLayout();
      };
      window.addEventListener("load", handleWindowLoad);
      const handleFontsReady = (): void => {
        syncScrollLayout();
      };
      void document.fonts.ready.then(handleFontsReady);
      let resizeDebounceId = 0;
      const scheduleLayoutSyncDebounced = (): void => {
        window.clearTimeout(resizeDebounceId);
        resizeDebounceId = window.setTimeout(syncScrollLayout, 48);
      };
      const heroResizeObserver = new ResizeObserver(
        scheduleLayoutSyncDebounced,
      );
      heroResizeObserver.observe(heroEl);
      const heroSectionWrapper = heroEl.closest("section");
      if (heroSectionWrapper) {
        heroResizeObserver.observe(heroSectionWrapper);
      }
      heroResizeObserver.observe(sectionEl);
      const visualViewport = window.visualViewport;
      if (visualViewport) {
        visualViewport.addEventListener("resize", scheduleLayoutSyncDebounced);
        visualViewport.addEventListener("scroll", scheduleLayoutSyncDebounced);
      }
      const postIntroSyncMs = [650, 1200] as const;
      const introTimeoutIds: number[] = postIntroSyncMs.map((ms) =>
        window.setTimeout(syncScrollLayout, ms),
      );
      return () => {
        cancelAnimationFrame(scrollRafId);
        window.removeEventListener("scroll", handleWindowScroll);
        window.removeEventListener("load", handleWindowLoad);
        window.clearTimeout(resizeDebounceId);
        introTimeoutIds.forEach((id) => {
          window.clearTimeout(id);
        });
        heroResizeObserver.disconnect();
        if (visualViewport) {
          visualViewport.removeEventListener(
            "resize",
            scheduleLayoutSyncDebounced,
          );
          visualViewport.removeEventListener(
            "scroll",
            scheduleLayoutSyncDebounced,
          );
        }
        st.kill();
        clearAnimatedState();
      };
    });
    return () => {
      mm.revert();
    };
  });

  const assignCellRef =
    (index: number) =>
    (el: HTMLDivElement | null): void => {
      cellRefs.current[index] = el;
    };

  const assignArticleRef =
    (index: number) =>
    (el: HTMLElement | null): void => {
      articleRefs.current[index] = el;
    };

  const assignCaptionRef =
    (index: number) =>
    (el: HTMLDivElement | null): void => {
      captionRefs.current[index] = el;
    };

  return (
    <section
      id="trabalho"
      ref={sectionRef}
      className="relative z-10 pt-10 pb-24 sm:pt-12 sm:pb-28"
    >
      <div className="relative z-0 mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="mb-10 flex max-w-[992px] flex-col gap-4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.034em] sm:text-[clamp(2.25rem,5.5vw,4rem)]"
          >
            <span className="text-figma-gray">Últimos </span>
            <span className="text-foreground">projetos.</span>
          </motion.div>
          <Link
            href="#trabalho"
            className="group inline-flex w-fit shrink-0 items-center gap-2 self-start text-[15px] font-medium tracking-[-0.02em] text-figma-muted transition-colors hover:text-foreground sm:self-auto"
          >
            <span className="border-b border-transparent pb-0.5 group-hover:border-figma-muted">
              Ver todos os projetos
            </span>
            <span
              className="flex size-[18px] items-center justify-center rounded-full border border-figma-border text-xs transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              ↗
            </span>
          </Link>
        </div>

        <div className="grid max-w-[992px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
          {projectCards.map((project, i) => (
            <div
              key={project.title}
              ref={assignCellRef(i)}
              className="relative w-full lg:min-h-[448px]"
            >
              <article
                ref={assignArticleRef(i)}
                className="project-card-reveal group cursor-pointer"
                style={
                  {
                    animationDelay: `${i * 60}ms`,
                  } as CSSProperties
                }
              >
                <div className="relative mb-4 aspect-[484/363] w-full overflow-hidden rounded-2xl bg-figma-gallery">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 496px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={i < 2}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </div>
                <div
                  ref={assignCaptionRef(i)}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-[13px] font-medium tracking-[-0.01em] text-figma-muted">
                      {project.category}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 pt-1 text-[13px] font-medium tracking-[-0.01em] text-figma-muted opacity-0 transition-opacity group-hover:opacity-100">
                    Ver projeto
                    <span className="flex size-[18px] items-center justify-center rounded-full border border-figma-border text-xs">
                      ↗
                    </span>
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[992px] justify-center sm:mt-12">
          <Link
            href="#trabalho"
            className="inline-flex items-center justify-center rounded-full border border-foreground bg-background px-8 py-3 text-base font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background dark:border-foreground dark:hover:bg-foreground dark:hover:text-background"
          >
            Todos os projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
