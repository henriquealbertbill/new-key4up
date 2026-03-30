"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Anchor no Hero — a barra só aparece depois deste botão sair da vista */
const HERO_PRIMARY_CTA_ID = "hero-primary-cta";
const PAST_CTA_EDGE_PX = 8;

const easeOut = [0.16, 1, 0.3, 1] as const;

const DUR_OPEN = 0.52;
const DUR_CLOSE = 0.44;
const STAGGER_LABELS = 0.05;

/** Largura mínima para três círculos + texto; caixa fixa no hover */
const CTA_WIDTH_CLASS = "w-[min(500px,calc(100vw-1.5rem))]";
const INTRO_COL_PX = 204;

const CIRCLE_PX = 52;
const PILL_PAD_OPEN = 12;
const PILL_GAP_OPEN = 8;
const LABEL_MAX_WIDE = 240;

const ctaShellClass =
  "box-border shrink-0 overflow-hidden rounded-[48px] border border-neutral-200/95 bg-white/[0.86] px-5 py-3.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.14)] backdrop-blur-2xl backdrop-saturate-150 dark:border-figma-border dark:bg-card/[0.92] dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] dark:backdrop-blur-2xl";

const pillLayoutClass =
  "box-border inline-flex h-[52px] min-h-[52px] cursor-pointer items-center overflow-hidden rounded-[26px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

const blackPillClass = [
  pillLayoutClass,
  "justify-center border border-black bg-black text-white shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.4),0px_0.74px_0.74px_-0.75px_rgba(0,0,0,0.15),0px_2px_2px_-1.5px_rgba(0,0,0,0.14),0px_4.4px_4.4px_-2.25px_rgba(0,0,0,0.13),0px_9.8px_9.8px_-3px_rgba(0,0,0,0.11),0px_25px_25px_-3.75px_rgba(0,0,0,0.05),0px_0px_0px_1px_rgb(130,130,130)]",
].join(" ");

const whatsappPillClass = [
  pillLayoutClass,
  "justify-center border border-[#128C7E] bg-[#25D366] text-white shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.35),0px_0.74px_0.74px_-0.75px_rgba(0,0,0,0.12),0px_2px_2px_-1.5px_rgba(0,0,0,0.1),0px_4.4px_4.4px_-2.25px_rgba(0,0,0,0.08),0px_9.8px_9.8px_-3px_rgba(0,0,0,0.06),0px_25px_25px_-3.75px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(18,140,126,0.6)]",
].join(" ");

const whitePillClass = [
  pillLayoutClass,
  "justify-center border border-neutral-300/90 bg-[#fafafa] text-foreground shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.4),0px_0.74px_0.74px_-0.75px_rgba(0,0,0,0.07),0px_2px_2px_-1.5px_rgba(0,0,0,0.07),0px_4.4px_4.4px_-2.25px_rgba(0,0,0,0.07),0px_9.8px_9.8px_-3px_rgba(0,0,0,0.06),0px_25px_25px_-3.75px_rgba(0,0,0,0.03),0px_0px_0px_1px_rgb(240,240,240)] dark:border-figma-border dark:bg-card",
].join(" ");

const introBlockClass = `shrink-0 overflow-hidden will-change-[width,opacity,transform]`;
const labelClass =
  "min-w-0 max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold tracking-[-0.02em] will-change-[opacity,transform,max-width]";

const CAL_PROFILE_URL =
  `https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME ?? "henrique-albert"}` as const;

/** E.164 sem + (ex.: 351912345678). Definir em .env: NEXT_PUBLIC_WHATSAPP_E164 */
const buildWhatsAppHref = (): string => {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "";
  const digits = raw.replace(/\D/g, "");
  const text = encodeURIComponent("Olá! Vim pelo site da Key4up.");
  if (digits.length >= 9) {
    return `https://wa.me/${digits}?text=${text}`;
  }
  return `https://wa.me/?text=${text}`;
};

const EnvelopeIcon = ({ className }: { readonly className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden
  >
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
  </svg>
);

const WhatsAppGlyph = ({ className }: { readonly className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CalendarIcon = ({ className }: { readonly className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden
  >
    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z" />
  </svg>
);

const shouldShowFloatingCta = (): boolean => {
  const el = document.getElementById(HERO_PRIMARY_CTA_ID);
  if (!el) {
    return false;
  }
  const rect = el.getBoundingClientRect();
  return rect.bottom <= PAST_CTA_EDGE_PX;
};

const pillIdleProps = {
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: CIRCLE_PX,
  width: CIRCLE_PX,
  minWidth: CIRCLE_PX,
  height: CIRCLE_PX,
  paddingLeft: 0,
  paddingRight: 0,
  gap: 0,
  justifyContent: "center",
} as const;

const pillOpenProps = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  minWidth: 0,
  width: "auto",
  height: CIRCLE_PX,
  paddingLeft: PILL_PAD_OPEN,
  paddingRight: PILL_PAD_OPEN,
  gap: PILL_GAP_OPEN,
  justifyContent: "flex-start",
} as const;

export default function HeroScrollCTA() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const buttonsRowRef = useRef<HTMLDivElement | null>(null);
  const pillBlackRef = useRef<HTMLAnchorElement | null>(null);
  const pillWaRef = useRef<HTMLAnchorElement | null>(null);
  const pillWhiteRef = useRef<HTMLAnchorElement | null>(null);
  const labelContactRef = useRef<HTMLSpanElement | null>(null);
  const labelWaRef = useRef<HTMLSpanElement | null>(null);
  const labelCalendarRef = useRef<HTMLSpanElement | null>(null);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);

  const handleScrollOrResize = useCallback(() => {
    setShowFloatingCta(shouldShowFloatingCta());
  }, []);

  useEffect(() => {
    handleScrollOrResize();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [handleScrollOrResize]);

  const LABEL_Y_IDLE = -7;

  const killHoverTween = () => {
    if (hoverTlRef.current) {
      hoverTlRef.current.kill();
      hoverTlRef.current = null;
    }
    const intro = introRef.current;
    const b = pillBlackRef.current;
    const wa = pillWaRef.current;
    const w = pillWhiteRef.current;
    const lc = labelContactRef.current;
    const lwa = labelWaRef.current;
    const lk = labelCalendarRef.current;
    const row = buttonsRowRef.current;
    const targets: gsap.TweenTarget[] = [
      intro,
      b,
      wa,
      w,
      lc,
      lwa,
      lk,
      row,
    ].filter(Boolean) as Element[];
    if (targets.length > 0) {
      gsap.killTweensOf(targets);
    }
  };

  const applyOpenStateInstant = () => {
    const intro = introRef.current;
    const b = pillBlackRef.current;
    const wa = pillWaRef.current;
    const w = pillWhiteRef.current;
    const lc = labelContactRef.current;
    const lwa = labelWaRef.current;
    const lk = labelCalendarRef.current;
    const row = buttonsRowRef.current;
    if (!intro || !b || !wa || !w || !lc || !lwa || !lk || !row) {
      return;
    }
    gsap.set(intro, {
      width: 0,
      opacity: 0,
      y: -4,
      pointerEvents: "none",
      marginRight: 0,
      paddingRight: 0,
    });
    gsap.set(row, { justifyContent: "flex-start" });
    gsap.set(b, pillOpenProps);
    gsap.set(wa, pillOpenProps);
    gsap.set(w, pillOpenProps);
    gsap.set(lc, { maxWidth: LABEL_MAX_WIDE, opacity: 1, y: 0 });
    gsap.set(lwa, { maxWidth: LABEL_MAX_WIDE, opacity: 1, y: 0 });
    gsap.set(lk, { maxWidth: LABEL_MAX_WIDE, opacity: 1, y: 0 });
  };

  const applyClosedStateInstant = () => {
    const intro = introRef.current;
    const b = pillBlackRef.current;
    const wa = pillWaRef.current;
    const w = pillWhiteRef.current;
    const lc = labelContactRef.current;
    const lwa = labelWaRef.current;
    const lk = labelCalendarRef.current;
    const row = buttonsRowRef.current;
    if (!intro || !b || !wa || !w || !lc || !lwa || !lk || !row) {
      return;
    }
    gsap.set(intro, {
      width: INTRO_COL_PX,
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      marginRight: "",
      paddingRight: "",
    });
    intro.style.removeProperty("opacity");
    intro.style.removeProperty("transform");
    gsap.set(row, { justifyContent: "flex-end" });
    gsap.set(b, pillIdleProps);
    gsap.set(wa, pillIdleProps);
    gsap.set(w, pillIdleProps);
    gsap.set(lc, { maxWidth: 0, opacity: 0, y: LABEL_Y_IDLE });
    gsap.set(lwa, { maxWidth: 0, opacity: 0, y: LABEL_Y_IDLE });
    gsap.set(lk, { maxWidth: 0, opacity: 0, y: LABEL_Y_IDLE });
  };

  const playOpen = () => {
    const intro = introRef.current;
    const b = pillBlackRef.current;
    const wa = pillWaRef.current;
    const w = pillWhiteRef.current;
    const lc = labelContactRef.current;
    const lwa = labelWaRef.current;
    const lk = labelCalendarRef.current;
    const row = buttonsRowRef.current;
    if (!navRef.current || !intro || !b || !wa || !w || !lc || !lwa || !lk || !row) {
      return;
    }
    killHoverTween();
    if (reducedMotion) {
      applyOpenStateInstant();
      return;
    }
    gsap.set(intro, { width: INTRO_COL_PX });
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        hoverTlRef.current = null;
      },
    });
    hoverTlRef.current = tl;
    tl.set(intro, { pointerEvents: "none" }, 0);
    tl.to(
      row,
      { justifyContent: "flex-start", duration: 0.32, ease: "power2.out" },
      0,
    );
    tl.to(
      intro,
      {
        width: 0,
        opacity: 0,
        y: -4,
        marginRight: 0,
        paddingRight: 0,
        duration: DUR_OPEN * 0.72,
        ease: "power2.out",
      },
      0,
    );
    tl.to(
      b,
      { ...pillOpenProps, duration: DUR_OPEN * 0.95, ease: "power3.out" },
      0.05,
    );
    tl.to(
      wa,
      { ...pillOpenProps, duration: DUR_OPEN * 0.95, ease: "power3.out" },
      0.07,
    );
    tl.to(
      w,
      { ...pillOpenProps, duration: DUR_OPEN * 0.95, ease: "power3.out" },
      0.09,
    );
    tl.to(
      lc,
      {
        maxWidth: LABEL_MAX_WIDE,
        opacity: 1,
        y: 0,
        duration: DUR_OPEN * 0.88,
        ease: "power3.out",
      },
      0.12,
    );
    tl.to(
      lwa,
      {
        maxWidth: LABEL_MAX_WIDE,
        opacity: 1,
        y: 0,
        duration: DUR_OPEN * 0.88,
        ease: "power3.out",
      },
      0.12 + STAGGER_LABELS,
    );
    tl.to(
      lk,
      {
        maxWidth: LABEL_MAX_WIDE,
        opacity: 1,
        y: 0,
        duration: DUR_OPEN * 0.88,
        ease: "power3.out",
      },
      0.12 + STAGGER_LABELS * 2,
    );
  };

  const playClose = () => {
    const intro = introRef.current;
    const b = pillBlackRef.current;
    const wa = pillWaRef.current;
    const w = pillWhiteRef.current;
    const lc = labelContactRef.current;
    const lwa = labelWaRef.current;
    const lk = labelCalendarRef.current;
    const row = buttonsRowRef.current;
    if (!intro || !b || !wa || !w || !lc || !lwa || !lk || !row) {
      return;
    }
    killHoverTween();
    if (reducedMotion) {
      applyClosedStateInstant();
      return;
    }
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        gsap.set(intro, { pointerEvents: "auto" });
        intro.style.removeProperty("opacity");
        intro.style.removeProperty("transform");
        hoverTlRef.current = null;
      },
    });
    hoverTlRef.current = tl;
    tl.to(
      [lk, lwa, lc],
      {
        maxWidth: 0,
        opacity: 0,
        y: LABEL_Y_IDLE,
        duration: DUR_CLOSE * 0.68,
        ease: "power2.in",
        stagger: STAGGER_LABELS * 0.45,
      },
      0,
    );
    tl.to(
      w,
      { ...pillIdleProps, duration: DUR_CLOSE * 0.88, ease: "power2.inOut" },
      0.06,
    );
    tl.to(
      wa,
      { ...pillIdleProps, duration: DUR_CLOSE * 0.88, ease: "power2.inOut" },
      0.07,
    );
    tl.to(
      b,
      { ...pillIdleProps, duration: DUR_CLOSE * 0.88, ease: "power2.inOut" },
      0.08,
    );
    tl.to(
      row,
      {
        justifyContent: "flex-end",
        duration: DUR_CLOSE * 0.6,
        ease: "power2.inOut",
      },
      0.08,
    );
    tl.to(
      intro,
      {
        width: INTRO_COL_PX,
        opacity: 1,
        y: 0,
        marginRight: "",
        paddingRight: "",
        duration: DUR_CLOSE * 0.85,
        ease: "power3.out",
      },
      0.14,
    );
  };

  useGSAP(
    () => {
      if (!showFloatingCta) {
        return;
      }
      const nav = navRef.current;
      const intro = introRef.current;
      const b = pillBlackRef.current;
      const wa = pillWaRef.current;
      const w = pillWhiteRef.current;
      const lc = labelContactRef.current;
      const lwa = labelWaRef.current;
      const lk = labelCalendarRef.current;
      const row = buttonsRowRef.current;
      if (!nav || !intro || !b || !wa || !w || !lc || !lwa || !lk || !row) {
        return;
      }
      gsap.set(intro, {
        width: INTRO_COL_PX,
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        overflow: "hidden",
      });
      gsap.set(row, { justifyContent: "flex-end" });
      gsap.set(b, pillIdleProps);
      gsap.set(wa, pillIdleProps);
      gsap.set(w, pillIdleProps);
      gsap.set(lc, { maxWidth: 0, opacity: 0, y: LABEL_Y_IDLE });
      gsap.set(lwa, { maxWidth: 0, opacity: 0, y: LABEL_Y_IDLE });
      gsap.set(lk, { maxWidth: 0, opacity: 0, y: LABEL_Y_IDLE });

      const onEnter = () => {
        playOpen();
      };
      const onLeave = (ev: PointerEvent) => {
        const next = ev.relatedTarget as Node | null;
        if (next && nav.contains(next)) {
          return;
        }
        playClose();
      };
      const onFocusIn = () => {
        playOpen();
      };
      const onFocusOut = (ev: FocusEvent) => {
        const next = ev.relatedTarget as Node | null;
        if (next && nav.contains(next)) {
          return;
        }
        playClose();
      };

      nav.addEventListener("pointerenter", onEnter);
      nav.addEventListener("pointerleave", onLeave);
      nav.addEventListener("focusin", onFocusIn);
      nav.addEventListener("focusout", onFocusOut);

      return () => {
        nav.removeEventListener("pointerenter", onEnter);
        nav.removeEventListener("pointerleave", onLeave);
        nav.removeEventListener("focusin", onFocusIn);
        nav.removeEventListener("focusout", onFocusOut);
        killHoverTween();
        gsap.set(intro, { pointerEvents: "auto" });
        intro.style.removeProperty("opacity");
        intro.style.removeProperty("transform");
        intro.style.removeProperty("width");
        gsap.set(row, { clearProps: "justifyContent" });
        gsap.set([lc, lwa, lk], { clearProps: "maxWidth,opacity,transform" });
        gsap.set([b, wa, w], {
          clearProps:
            "flexGrow,flexShrink,flexBasis,width,minWidth,height,paddingLeft,paddingRight,gap,justifyContent",
        });
      };
    },
    { dependencies: [showFloatingCta, reducedMotion], scope: navRef },
  );

  const whatsappHref = buildWhatsAppHref();

  return (
    <AnimatePresence>
      {showFloatingCta ? (
        <motion.div
          key="hero-cta"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.38, ease: easeOut }}
          className={`pointer-events-none fixed bottom-6 left-1/2 z-40 ${CTA_WIDTH_CLASS} max-w-[calc(100vw-1.5rem)] shrink-0 -translate-x-1/2 px-3`}
          style={{ willChange: "transform, opacity" }}
        >
          <nav
            ref={navRef}
            aria-label="Contacto rápido"
            className={`pointer-events-auto box-border flex h-[68px] max-w-full flex-nowrap items-center gap-3.5 overflow-hidden ${CTA_WIDTH_CLASS} ${ctaShellClass}`}
          >
            <div
              ref={introRef}
              className={`${introBlockClass} flex min-w-0 flex-col justify-center pr-1`}
            >
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                Fale comigo
              </p>
              <p className="mt-1 text-[13px] font-medium leading-snug tracking-[-0.01em] text-figma-muted">
                Entre em contato
              </p>
            </div>

            <div
              ref={buttonsRowRef}
              className="relative z-10 flex min-h-0 min-w-0 flex-1 items-center justify-end gap-2.5"
            >
              <a
                ref={pillBlackRef}
                href="mailto:geral@key4up.com"
                className={blackPillClass}
                aria-label="Abrir email para contacto"
              >
                <EnvelopeIcon className="size-[24px] shrink-0 text-white" />
                <span
                  ref={labelContactRef}
                  className={`${labelClass} text-white`}
                >
                  Contacto
                </span>
              </a>
              <a
                ref={pillWaRef}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={whatsappPillClass}
                aria-label="WhatsApp (abre num novo separador)"
              >
                <WhatsAppGlyph className="size-[24px] shrink-0 text-white" />
                <span ref={labelWaRef} className={`${labelClass} text-white`}>
                  WhatsApp
                </span>
              </a>
              <a
                ref={pillWhiteRef}
                href={CAL_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={whitePillClass}
                aria-label="Agendar uma call (abre num novo separador)"
              >
                <CalendarIcon className="size-[24px] shrink-0 text-foreground" />
                <span ref={labelCalendarRef} className={labelClass}>
                  Agendar call
                </span>
              </a>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
