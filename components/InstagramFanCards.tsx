"use client";

import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { designSlides, type DesignSlideData } from "@/data/design-slides";

const instrumentHint = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["italic"],
});

/** Rosa marca próximo ao Instagram (referência Framer / design system). */
const BRAND_PINK = "#E1306C";

const PROFILE_BADGE_SRC =
  "https://framerusercontent.com/images/FwGRzdHhlF5dVX3w3adwXRyFz7U.svg?width=140&height=140";

type CardId = "left" | "center" | "right";

/**
 * Índice do slide por cartão físico: à esquerda (0), centro (1), direita (2).
 * Com `rotation`, percorre todos os slides (ex.: 4 designs em 3 passos visuais).
 */
const getSlideForCardId = (
  cardId: CardId,
  rotation: number,
  slides: readonly DesignSlideData[],
): DesignSlideData => {
  const n = slides.length;
  if (n === 0) {
    throw new Error("InstagramFanCards requires at least one slide");
  }
  const slot = cardId === "left" ? 0 : cardId === "center" ? 1 : 2;
  const idx = (rotation + slot) % n;
  return slides[idx]!;
};

/** Qual cartão ocupa cada posição no leque para cada passo do carrossel (0 → 1 → 2 → 0). */
const ROTATION_MAP: readonly Record<"left" | "center" | "right", CardId>[] = [
  { left: "left", center: "center", right: "right" },
  { left: "center", center: "right", right: "left" },
  { left: "right", center: "left", right: "center" },
];

/** Geometria por posição (origem: centro do contentor; só transform + tamanho). */
const SLOT = {
  left: { x: -92, y: 14, rotation: -12, w: 200, h: 290, zIndex: 6 },
  center: { x: 0, y: 0, rotation: 0, w: 260, h: 340, zIndex: 30 },
  right: { x: 92, y: 14, rotation: 12, w: 200, h: 290, zIndex: 7 },
} as const;

type SlotKey = keyof typeof SLOT;

const slotForCard = (rotation: number, cardId: CardId): SlotKey => {
  const m = ROTATION_MAP[rotation % 3];
  const entries = Object.entries(m) as [SlotKey, CardId][];
  const found = entries.find(([, id]) => id === cardId);
  return found ? found[0] : "center";
};

const CARD_ORDER: readonly CardId[] = ["left", "center", "right"];

const CAROUSEL_INTERVAL_SEC = 3.4;
const CLICK_ADVANCE_MS = 900;
/** Durante a troca, o cartão que vem para a frente fica por cima; o que recua desce já no frame 0. */
const Z_BRING_TO_FRONT = 52;
const Z_SEND_TO_BACK = 2;

type LikeTooltipBubbleProps = {
  readonly isReducedMotion: boolean;
  readonly isPaused: boolean;
};

/** Balão de gosto no topo — oscilação lenta; pausa com o carrossel. */
const LikeTooltipBubble = ({
  isReducedMotion,
  isPaused,
}: LikeTooltipBubbleProps) => {
  const kickRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const el = kickRef.current;
      if (!el || isReducedMotion) {
        return undefined;
      }
      if (isPaused) {
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: "transform" });
        return undefined;
      }
      gsap.set(el, { transformOrigin: "50% 95%" });
      const tween = gsap.to(el, {
        y: -7,
        rotation: -5,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      return () => {
        tween.kill();
        gsap.set(el, { clearProps: "transform" });
      };
    },
    { scope: kickRef, dependencies: [isReducedMotion, isPaused] },
  );
  return (
    <div
      className="pointer-events-none absolute -top-7 left-0 right-0 z-100 flex justify-center"
      style={{ filter: "drop-shadow(0 8px 25px rgba(225, 48, 108, 0.45))" }}
      aria-hidden
    >
      <div ref={kickRef} className="will-change-transform">
        <svg
          width={70}
          height={56}
          viewBox="0 0 70 56"
          fill="none"
          className="shrink-0"
        >
          <rect x="2" y="2" width={66} height={40} rx={11} fill={BRAND_PINK} />
          <path d="M29 42L35 52L41 42" fill={BRAND_PINK} />
          <path
            d="M16 18C16 15 18.2 12.5 21.5 12.5C23.1 12.5 24.5 13.2 25.5 14.3C26.5 13.2 27.9 12.5 29.5 12.5C32.8 12.5 35 15 35 18C35 23.5 25.5 29 25.5 29C25.5 29 16 23.5 16 18Z"
            fill="white"
          />
          <text
            x={45}
            y={27}
            fill="white"
            fontSize={15}
            fontWeight={600}
            fontFamily="var(--font-inter), system-ui, sans-serif"
            textAnchor="middle"
          >
            1
          </text>
        </svg>
      </div>
    </div>
  );
};

const ProfileWithRing = () => (
  <div
    className="pointer-events-none absolute bottom-5 -right-10 z-100 flex select-none"
    style={{
      boxShadow: "0 14px 44px rgba(225, 48, 108, 0.35)",
    }}
    aria-hidden
  >
    <div
      className="relative rounded-full p-[3px]"
      style={{
        background: BRAND_PINK,
        boxShadow: "0 0 0 7px rgba(225, 48, 108, 0.2)",
      }}
    >
      <div className="size-[79px] rounded-full bg-[#151520] p-0.5">
        <div className="relative size-full overflow-hidden rounded-full">
          <Image
            src={PROFILE_BADGE_SRC}
            alt=""
            width={140}
            height={140}
            className="size-full object-cover"
          />
        </div>
      </div>
      <div className="absolute -bottom-0.5 -right-0.5">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
          <g transform="matrix(0.42 0 0 0.42 12 12)">
            <polygon
              points="5.62,-21 9.05,-15.69 15.37,-15.38 15.69,-9.06 21,-5.63 18.12,0 21,5.62 15.69,9.05 15.38,15.37 9.06,15.69 5.63,21 0,18.12 -5.62,21 -9.05,15.69 -15.37,15.38 -15.69,9.06 -21,5.63 -18.12,0 -21,-5.62 -15.69,-9.05 -15.38,-15.37 -9.06,-15.69 -5.63,-21 0,-18.12"
              fill="rgb(66, 165, 245)"
            />
            <g transform="matrix(1 0 0 1 -0.01 0.51)">
              <polygon
                points="-2.6,6.74 -9.09,0.25 -6.97,-1.87 -2.56,2.53 7,-6.74 9.09,-4.59"
                fill="white"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
);

const FloatingHeart = () => (
  <div
    className="pointer-events-none absolute bottom-6 left-[calc(50%-210px)] z-50 origin-center select-none max-[380px]:left-2 max-[380px]:scale-75"
    style={{
      filter: "drop-shadow(0 8px 25px rgba(225, 48, 108, 0.55))",
      transform: "rotate(20deg)",
    }}
    aria-hidden
  >
    <svg
      width={70}
      height={65}
      viewBox="0 0 24 24"
      fill="none"
      className="block overflow-visible"
    >
      <defs>
        <linearGradient
          id="instagramFanHeartGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(255, 107, 107)" />
          <stop offset="50%" stopColor="rgb(225, 48, 108)" />
          <stop offset="100%" stopColor="rgb(193, 53, 132)" />
        </linearGradient>
      </defs>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#instagramFanHeartGrad)"
      />
    </svg>
  </div>
);

type InstagramFanCardsProps = {
  readonly className?: string;
  /** Por omissão: projetos em `data/design-slides`. */
  readonly slides?: readonly DesignSlideData[];
};

export default function InstagramFanCards({
  className = "",
  slides = designSlides,
}: InstagramFanCardsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const prevRotationRef = useRef(0);
  const didMountRef = useRef(false);
  const cardElsRef = useRef<Partial<Record<CardId, HTMLDivElement | null>>>({});
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const stackPulseRef = useRef<HTMLDivElement | null>(null);
  const pressTweenRef = useRef<gsap.core.Tween | null>(null);
  const lastAdvanceRef = useRef(0);

  const setCardRef = useCallback((id: CardId) => {
    return (node: HTMLDivElement | null) => {
      cardElsRef.current[id] = node;
    };
  }, []);

  const applySlotInstant = useCallback((r: number) => {
    CARD_ORDER.forEach((cardId) => {
      const el = cardElsRef.current[cardId];
      if (!el) {
        return;
      }
      const slot = slotForCard(r, cardId);
      const t = SLOT[slot];
      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        x: t.x,
        y: t.y,
        rotation: t.rotation,
        width: t.w,
        height: t.h,
        zIndex: t.zIndex,
        scale: 1,
        z: 0,
        opacity: 1,
        force3D: true,
      });
    });
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        applySlotInstant(rotation);
        return undefined;
      }
      const prev = prevRotationRef.current;
      const isStep = didMountRef.current && prev !== rotation;
      didMountRef.current = true;
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      const enteringCenterId = ROTATION_MAP[rotation % 3].center;
      const prevCenterId = ROTATION_MAP[prev % 3].center;
      const hasEntrance = isStep && enteringCenterId !== prevCenterId;
      if (hasEntrance) {
        const enterEl = cardElsRef.current[enteringCenterId];
        const exitEl = cardElsRef.current[prevCenterId];
        if (enterEl) {
          tl.set(enterEl, { zIndex: Z_BRING_TO_FRONT }, 0);
        }
        if (exitEl && prevCenterId !== enteringCenterId) {
          tl.set(exitEl, { zIndex: Z_SEND_TO_BACK }, 0);
        }
      }
      CARD_ORDER.forEach((cardId) => {
        const el = cardElsRef.current[cardId];
        if (!el) {
          return;
        }
        gsap.killTweensOf(el);
        const slot = slotForCard(rotation, cardId);
        const t = SLOT[slot];
        const fromSlotKey = slotForCard(prev, cardId);
        const fromT = SLOT[fromSlotKey];
        const isExitingCenter =
          hasEntrance && cardId === prevCenterId && cardId !== enteringCenterId;
        if (hasEntrance && cardId === enteringCenterId) {
          tl.fromTo(
            el,
            {
              xPercent: -50,
              yPercent: -50,
              x: fromT.x * 0.68,
              y: fromT.y + 42,
              z: -220,
              scale: 0.72,
              rotation: fromT.rotation * 0.55,
              opacity: 0.68,
              width: fromT.w,
              height: fromT.h,
              zIndex: Z_BRING_TO_FRONT,
              force3D: true,
            },
            {
              xPercent: -50,
              yPercent: -50,
              x: t.x,
              y: t.y,
              z: 0,
              scale: 1,
              rotation: t.rotation,
              opacity: 1,
              width: t.w,
              height: t.h,
              zIndex: t.zIndex,
              duration: 1.02,
              ease: "power4.out",
            },
            0.06,
          );
        } else if (isExitingCenter) {
          tl.to(
            el,
            {
              xPercent: -50,
              yPercent: -50,
              x: t.x,
              y: t.y,
              z: 0,
              scale: 1,
              rotation: t.rotation,
              opacity: 1,
              width: t.w,
              height: t.h,
              zIndex: t.zIndex,
              duration: 0.92,
              ease: "power3.inOut",
            },
            0,
          );
        } else {
          tl.to(
            el,
            {
              xPercent: -50,
              yPercent: -50,
              x: t.x,
              y: t.y,
              z: 0,
              scale: 1,
              rotation: t.rotation,
              opacity: 1,
              width: t.w,
              height: t.h,
              zIndex: t.zIndex,
              duration: isStep ? 0.88 : 0,
              ease: isStep ? "power3.out" : "none",
            },
            isStep ? 0.04 : 0,
          );
        }
      });
      prevRotationRef.current = rotation;
      return () => {
        tl.kill();
      };
    },
    { dependencies: [rotation, prefersReducedMotion, applySlotInstant] },
  );

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }
    const schedule = () => {
      delayedCallRef.current?.kill();
      delayedCallRef.current = gsap.delayedCall(CAROUSEL_INTERVAL_SEC, () => {
        if (isPausedRef.current) {
          schedule();
          return;
        }
        setRotation((r) => (r + 1) % 3);
        schedule();
      });
    };
    schedule();
    return () => {
      delayedCallRef.current?.kill();
      delayedCallRef.current = null;
    };
  }, [prefersReducedMotion]);

  const handlePointerEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const releasePress = useCallback(() => {
    const wrap = stackPulseRef.current;
    if (!wrap || prefersReducedMotion) {
      return;
    }
    pressTweenRef.current?.kill();
    pressTweenRef.current = gsap.to(wrap, {
      scale: 1,
      duration: 0.42,
      ease: "back.out(1.35)",
      overwrite: true,
    });
  }, [prefersReducedMotion]);

  const handleStackPointerDown = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      const wrap = stackPulseRef.current;
      if (!wrap || prefersReducedMotion) {
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
      pressTweenRef.current?.kill();
      pressTweenRef.current = gsap.to(wrap, {
        scale: 0.94,
        duration: 0.11,
        ease: "power2.out",
        overwrite: true,
      });
    },
    [prefersReducedMotion],
  );

  const handleStackPointerUp = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      releasePress();
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [releasePress],
  );

  const handleStackClick = useCallback(() => {
    const now = Date.now();
    if (now - lastAdvanceRef.current < CLICK_ADVANCE_MS) {
      return;
    }
    lastAdvanceRef.current = now;
    setRotation((r) => (r + 1) % 3);
  }, []);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      className={[
        "relative mt-10 flex w-full max-w-[min(100%,420px)] flex-col items-center bg-transparent lg:max-w-none",
        className,
      ].join(" ")}
    >
      <div
        className="relative isolate h-[min(52vw,380px)] w-full min-h-[320px] max-w-[400px] select-none sm:h-[400px]"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        role="region"
        aria-label="Carrossel de cartões. Clica para avançar. Pausa ao passar o cursor."
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          <div
            className="relative h-[340px] w-[260px] max-w-full scale-[0.88] overflow-visible sm:scale-95"
            style={{ perspective: 1100 }}
          >
            <div
              ref={stackPulseRef}
              className="relative size-full origin-center will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="relative size-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {CARD_ORDER.map((cardId) => {
                  const card = getSlideForCardId(cardId, rotation, slides);
                  const commonClass =
                    "pointer-events-none absolute left-1/2 top-1/2 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] will-change-transform dark:border-white/10 dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)]";
                  return (
                    <div
                      key={cardId}
                      ref={setCardRef(cardId)}
                      className={commonClass}
                      style={{ transformStyle: "preserve-3d" }}
                      aria-hidden={slotForCard(rotation, cardId) !== "center"}
                    >
                      <CardInner
                        card={card}
                        showCaption={slotForCard(rotation, cardId) === "center"}
                      />
                    </div>
                  );
                })}
              </div>
              <LikeTooltipBubble
                isReducedMotion={Boolean(prefersReducedMotion)}
                isPaused={isPaused}
              />
              <ProfileWithRing />
              <FloatingHeart />
              <button
                type="button"
                className="absolute inset-0 z-[70] cursor-pointer rounded-[28px] border-0 bg-transparent"
                aria-label="Mostrar o cartão seguinte"
                onClick={handleStackClick}
                onPointerDown={handleStackPointerDown}
                onPointerUp={handleStackPointerUp}
                onPointerCancel={releasePress}
                onPointerLeave={releasePress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CardInner = ({
  card,
  showCaption,
}: {
  readonly card: DesignSlideData;
  readonly showCaption: boolean;
}) => (
  <>
    <div className="relative size-full overflow-hidden">
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 200px, 260px"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent"
        aria-hidden
      />
    </div>
    {showCaption ? (
      <div
        className="pointer-events-none absolute bottom-5 left-5 right-5 font-medium text-[14px] leading-snug text-white"
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        <span className="block line-clamp-3">{card.caption}</span>
        <span className="mt-1 block text-[12px] font-normal text-white/85">
          {card.likesLabel}
        </span>
      </div>
    ) : null}
  </>
);
