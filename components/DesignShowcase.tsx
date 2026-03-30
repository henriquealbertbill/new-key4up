"use client"

import Image from "next/image"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Bookmark,
  Check,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
} from "lucide-react"
import SectionTitle from "@/components/ui/SectionTitle"
import { designSlides } from "@/data/design-slides"

gsap.registerPlugin(ScrollTrigger)

/** Frame MyFeed33 (Figma Instagram Mockup Template) — proporções de referência. */
const FIGMA_FRAME_W = 390
const FIGMA_FRAME_H = 844
const STATUS_BAR_H = 48
const INTERACTION_ROW_H = 40
/** Barra superior total no Figma (status + ícones). */
const HEADER_H = STATUS_BAR_H + INTERACTION_ROW_H
/** Altura da faixa de stories (círculos 70px + legenda; evita compressão vertical). */
const STORIES_ROW_H = 94
const STORY_RING_PX = 70
const TAP_BAR_H = 80
const POST_BLOCK_H = FIGMA_FRAME_H - HEADER_H - STORIES_ROW_H - TAP_BAR_H
const POST_USER_ROW_H = 54
const POST_MEDIA_H = 390
const POST_DOTS_H = 24
const POST_ACTIONS_H = 48
const MOCK_USERNAME = "key4up"
const CAROUSEL_PAUSE_SEC = 2.45
const CAROUSEL_TWEEN_SEC = 0.62
const SHELL_MAX_W_PX = 320
/** Vermelho tipo iOS para badges de notificação (mockup Instagram). */
const NOTIFICATION_RED = "#FF3B30"
const MOCK_TAB_PROFILE_SRC =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&q=80"
/** Wordmark oficial (asset); `brightness-0 invert` para ler em fundo preto do mockup escuro. */
const INSTAGRAM_WORDMARK_SRC = "/images/projetcs/logos/instagram.png"

/** Início ativo — casa preenchida (como no app). */
const HomeFilledIcon = ({ className }: { readonly className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width={26} height={26} aria-hidden>
    <path
      fill="currentColor"
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"
    />
  </svg>
)

/** Ícone Reels: retângulo arredondado com play (estilo Instagram). */
const ReelsOutlineIcon = ({ className }: { readonly className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect x="3" y="5" width="18" height="14" rx="3.5" stroke="currentColor" strokeWidth="1.75" />
    <path
      fill="currentColor"
      stroke="none"
      d="M11 9.5l4.5 2.5-4.5 2.5V9.5z"
    />
  </svg>
)

/** Barras de rede (altura crescente; a mais alta em cinza, como no iOS). */
const IosCellularIcon = ({ className }: { readonly className?: string }) => (
  <svg className={className} width={19} height={12} viewBox="0 0 19 12" aria-hidden>
    <rect x="0" y="9" width="3" height="3" rx="0.6" fill="white" />
    <rect x="5" y="6" width="3" height="6" rx="0.6" fill="white" />
    <rect x="10" y="3" width="3" height="9" rx="0.6" fill="white" />
    <rect x="15" y="0" width="3" height="12" rx="0.6" fill="#6b6b6b" />
  </svg>
)

const IosWifiIcon = ({ className }: { readonly className?: string }) => (
  <svg className={className} width={17} height={12} viewBox="0 0 17 12" fill="none" aria-hidden>
    <path
      d="M8.5 2.5c2.8 0 5.4 1.1 7.3 2.9l-.9.9A9.2 9.2 0 0 0 8.5 4 9.2 9.2 0 0 0 2.1 6.3l-.9-.9A10.7 10.7 0 0 1 8.5 2.5z"
      fill="white"
    />
    <path
      d="M8.5 5.2a6.8 6.8 0 0 1 4.8 2l-.8.8a5.7 5.7 0 0 0-8 0l-.8-.8a6.8 6.8 0 0 1 4.8-2z"
      fill="white"
    />
    <path d="M8.5 8a4.2 4.2 0 0 1 3 1.2l-.7.7a3.2 3.2 0 0 0-4.6 0l-.7-.7A4.2 4.2 0 0 1 8.5 8z" fill="white" />
    <circle cx="8.5" cy="11" r="1.1" fill="white" />
  </svg>
)

type IosBatteryIconProps = {
  readonly percent: number | null
  readonly className?: string
}

const IosBatteryIcon = ({ percent, className = "" }: IosBatteryIconProps) => {
  const safe = percent === null || Number.isNaN(percent) ? null : Math.min(100, Math.max(0, Math.round(percent)))
  const fillRatio = safe === null ? 0.62 : safe / 100
  const label = safe === null ? "–" : String(safe)
  return (
    <div className={["relative inline-flex h-[13px] w-[28px] items-center", className].join(" ")} aria-hidden>
      <svg width={28} height={13} viewBox="0 0 28 13" className="shrink-0">
        <rect x="0.5" y="1.5" width="22" height="10" rx="2.5" stroke="white" strokeWidth={1} fill="rgba(0,0,0,0.35)" opacity={0.95} />
        <rect x="24" y="4.5" width="2.5" height="4" rx="0.8" fill="white" opacity={0.9} />
        <rect
          x="2"
          y="3"
          width={Math.max(0.5, 18 * fillRatio)}
          height="7"
          rx="1.2"
          fill="white"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 right-[5px] flex items-center justify-center text-[7.5px] font-bold tabular-nums leading-none tracking-tight text-black drop-shadow-[0_0_1px_rgba(255,255,255,0.85)]">
        {label}
      </span>
    </div>
  )
}

const formatStatusTime = (): string => {
  const d = new Date()
  return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit", hour12: false })
}

type StoryPlaceholder = Readonly<{
  label: string
  /** Primeiro item: avatar + botão + como no app. */
  variant: "own" | "story"
  imageSrc: string
  imageAlt: string
}>

const storyPlaceholders: readonly StoryPlaceholder[] = [
  {
    label: "Seu story",
    variant: "own",
    imageSrc: MOCK_TAB_PROFILE_SRC,
    imageAlt: "O teu story",
  },
  {
    label: "key4play",
    variant: "story",
    imageSrc: "/images/projetcs/key4play/home.png",
    imageAlt: "Story key4play",
  },
  {
    label: "moduza",
    variant: "story",
    imageSrc: "/images/projetcs/moduza/home.png",
    imageAlt: "Story moduza",
  },
  {
    label: "nuchat",
    variant: "story",
    imageSrc: "/images/projetcs/nuchat/home.png",
    imageAlt: "Story nuchat",
  },
  {
    label: "fergus",
    variant: "story",
    imageSrc: "/images/projetcs/fergus/home.png",
    imageAlt: "Story fergus",
  },
]

/** Anel em gradiente + “folga” preta + foto — círculo perfeito (70×70). */
const StoryGradientRing = ({
  imageSrc,
  imageAlt,
}: {
  readonly imageSrc: string
  readonly imageAlt: string
}) => (
  <div
    className="box-border shrink-0 rounded-full bg-linear-to-tr from-[#feda75] from-[-5%] via-[#fa7e1e] via-40% to-[#d62976] to-105% p-[2.5px]"
    style={{ width: STORY_RING_PX, height: STORY_RING_PX }}
  >
    <div className="box-border size-full rounded-full bg-black p-[2px]">
      <div className="relative size-full overflow-hidden rounded-full">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="70px" />
      </div>
    </div>
  </div>
)

/** “Seu story”: avatar circular + botão + branco (sem anel gradiente). */
const StoryOwnRing = ({
  imageSrc,
  imageAlt,
}: {
  readonly imageSrc: string
  readonly imageAlt: string
}) => (
  <div className="relative shrink-0" style={{ width: STORY_RING_PX, height: STORY_RING_PX }}>
    <div className="relative size-full overflow-hidden rounded-full border border-white/25">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="70px" />
    </div>
    <div
      className="absolute bottom-0 right-0 flex size-[22px] items-center justify-center rounded-full border-2 border-black bg-white"
      aria-hidden
    >
      <Plus className="size-3 text-black" strokeWidth={3} />
    </div>
  </div>
)

type DesignShowcaseProps = {
  readonly className?: string
}

export default function DesignShowcase({ className = "" }: DesignShowcaseProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [shellWidthPx, setShellWidthPx] = useState(SHELL_MAX_W_PX)
  const [clockLabel, setClockLabel] = useState("--:--")
  const [batteryPercent, setBatteryPercent] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const slideCount = designSlides.length
  const activeSlide = designSlides[activeIndex] ?? designSlides[0]

  const scale = shellWidthPx / FIGMA_FRAME_W

  useLayoutEffect(() => {
    const shell = shellRef.current
    if (!shell) {
      return undefined
    }
    const measure = () => {
      setShellWidthPx(shell.clientWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(shell)
    return () => {
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      setClockLabel(formatStatusTime())
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    type BatteryManagerLike = EventTarget & {
      level: number
      addEventListener(type: "levelchange", fn: () => void): void
      removeEventListener(type: "levelchange", fn: () => void): void
    }
    const nav = navigator as Navigator & { getBattery?: () => Promise<BatteryManagerLike> }
    if (typeof nav.getBattery !== "function") {
      return undefined
    }
    let bat: BatteryManagerLike | null = null
    const onLevel = () => {
      if (bat) {
        setBatteryPercent(Math.round(bat.level * 100))
      }
    }
    nav
      .getBattery!()
      .then((b) => {
        bat = b
        onLevel()
        b.addEventListener("levelchange", onLevel)
      })
      .catch(() => {
        setBatteryPercent(null)
      })
    return () => {
      if (bat) {
        bat.removeEventListener("levelchange", onLevel)
      }
    }
  }, [])

  const buildTimeline = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || slideCount < 2 || prefersReducedMotion) {
      return null
    }
    timelineRef.current?.kill()
    const widthPx = viewport.getBoundingClientRect().width
    if (widthPx <= 0) {
      return null
    }
    gsap.set(track, { x: 0 })
    const tl = gsap.timeline({ repeat: -1 })
    tl.call(() => {
      setActiveIndex(0)
    })
    tl.to({}, { duration: CAROUSEL_PAUSE_SEC })
    for (let i = 1; i < slideCount; i += 1) {
      const index = i
      tl.to(track, {
        x: -index * widthPx,
        duration: CAROUSEL_TWEEN_SEC,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveIndex(index)
        },
      })
      tl.to({}, { duration: CAROUSEL_PAUSE_SEC })
    }
    tl.to(track, {
      x: 0,
      duration: CAROUSEL_TWEEN_SEC,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveIndex(0)
      },
    })
    tl.to({}, { duration: CAROUSEL_PAUSE_SEC })
    timelineRef.current = tl
    return tl
  }, [prefersReducedMotion, slideCount])

  useGSAP(
    () => {
      if (slideCount < 2 || prefersReducedMotion) {
        return undefined
      }
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!viewport || !track) {
        return undefined
      }
      const tl = buildTimeline()
      const handleResize = () => {
        buildTimeline()
      }
      const ro = new ResizeObserver(handleResize)
      ro.observe(viewport)
      return () => {
        ro.disconnect()
        tl?.kill()
        timelineRef.current?.kill()
        gsap.set(track, { clearProps: "x" })
      }
    },
    { scope: sectionRef, dependencies: [buildTimeline, prefersReducedMotion, slideCount, shellWidthPx] },
  )

  return (
    <section
      ref={sectionRef}
      id="design"
      className={[
        "relative w-full border-y border-figma-border bg-background py-16 md:py-24",
        className,
      ].join(" ")}
      aria-labelledby="design-section-title"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="flex flex-col gap-5 lg:max-w-xl">
            <div id="design-section-title">
              <SectionTitle
                ghostLines={["No teu", "estilo de"]}
                solidLine="Design"
                align="left"
              />
            </div>
            <p className="text-[15px] font-medium leading-relaxed tracking-[-0.02em] text-figma-muted">
              Uma pré-visualização em formato de feed — os mesmos projetos, pensados para destacar no ecrã e
              na conversão.
            </p>
          </div>

          <div className="flex justify-center overflow-visible lg:justify-end">
            <div className="relative isolate flex w-full max-w-[min(100%,380px)] flex-col items-center lg:max-w-none lg:items-end">
              {/* Invólucro: proporção exata do frame MyFeed33 (390×844). */}
              <div
                ref={shellRef}
                className="relative z-10 w-full max-w-[320px] overflow-hidden rounded-4xl border border-neutral-800/90 bg-black shadow-[0_24px_56px_-20px_rgba(0,0,0,0.35)] dark:border-white/10"
                style={{ aspectRatio: `${FIGMA_FRAME_W} / ${FIGMA_FRAME_H}` }}
              >
              {/* Canvas Figma em px; escala para a largura disponível (mantém proporções). */}
              <div
                className="absolute left-0 top-0 flex w-[390px] flex-col bg-black origin-top-left will-change-transform"
                style={{
                  height: FIGMA_FRAME_H,
                  transform: `scale(${scale})`,
                }}
              >
                <header className="flex w-[390px] shrink-0 flex-col border-b border-white/10">
                  <div
                    className="flex w-full items-center justify-between px-4 text-[15px] font-semibold leading-none text-white"
                    style={{ height: STATUS_BAR_H }}
                  >
                    <time className="tabular-nums tracking-tight" dateTime={new Date().toISOString()} suppressHydrationWarning>
                      {clockLabel}
                    </time>
                    <div className="flex items-center gap-[5px]" aria-hidden="true">
                      <IosCellularIcon />
                      <IosWifiIcon />
                      <IosBatteryIcon percent={batteryPercent} />
                    </div>
                  </div>
                  <div
                    className="flex w-full items-center justify-between px-2"
                    style={{ height: INTERACTION_ROW_H }}
                  >
                    <button
                      type="button"
                      className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Criar publicação"
                    >
                      <Plus className="size-[26px]" strokeWidth={2} />
                    </button>
                    <div className="pointer-events-none flex flex-1 justify-center px-2">
                      <Image
                        src={INSTAGRAM_WORDMARK_SRC}
                        alt="Instagram"
                        width={240}
                        height={72}
                        className="h-[28px] w-auto max-w-[min(200px,46vw)] object-contain brightness-0 invert"
                        priority
                      />
                    </div>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Atividade"
                      >
                        <Heart className="size-[26px]" strokeWidth={1.75} />
                      </button>
                      <span
                        className="absolute right-1.5 top-1 size-2 rounded-full ring-2 ring-black"
                        style={{ backgroundColor: NOTIFICATION_RED }}
                        aria-hidden
                      />
                    </div>
                  </div>
                </header>

                <div
                  className="flex shrink-0 items-center gap-3 overflow-x-auto border-b border-white/10 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  style={{ height: STORIES_ROW_H }}
                  role="region"
                  aria-label="Stories"
                >
                  {storyPlaceholders.map((story) => (
                    <div
                      key={story.label}
                      className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                    >
                      {story.variant === "own" ? (
                        <StoryOwnRing imageSrc={story.imageSrc} imageAlt={story.imageAlt} />
                      ) : (
                        <StoryGradientRing imageSrc={story.imageSrc} imageAlt={story.imageAlt} />
                      )}
                      <span className="w-full truncate text-center text-[11px] font-normal leading-tight text-white/80">
                        {story.label}
                      </span>
                    </div>
                  ))}
                </div>

                <article
                  className="flex w-[390px] shrink-0 flex-col overflow-hidden border-b border-white/10"
                  style={{ height: POST_BLOCK_H }}
                >
                  <div
                    className="flex shrink-0 items-center justify-between px-3"
                    style={{ height: POST_USER_ROW_H }}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className="shrink-0 rounded-full bg-linear-to-br from-figma-green to-[#0a5c2e] ring-2 ring-white/15"
                        style={{ width: 32, height: 32 }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="truncate text-[13px] font-semibold text-white">{MOCK_USERNAME}</span>
                          <span
                            className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#3897f0]"
                            aria-label="Conta verificada"
                            title="Verificado"
                          >
                            <Check className="size-2.5 text-white" strokeWidth={3} aria-hidden />
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-full p-1 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Mais opções"
                    >
                      <MoreHorizontal className="size-5" />
                    </button>
                  </div>

                  <div
                    ref={viewportRef}
                    className="relative shrink-0 overflow-hidden bg-black"
                    style={{ width: FIGMA_FRAME_W, height: POST_MEDIA_H }}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Destaques de design"
                  >
                    <div ref={trackRef} className="flex h-full w-full will-change-transform">
                      {designSlides.map((slide, index) => (
                        <div
                          key={slide.imageSrc}
                          className="relative h-full shrink-0"
                          style={{ width: FIGMA_FRAME_W }}
                          aria-hidden={index !== activeIndex}
                          data-slide-index={index}
                        >
                          <Image
                            src={slide.imageSrc}
                            alt={slide.imageAlt}
                            fill
                            className="object-cover object-top"
                            sizes="390px"
                            priority={index === 0}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex shrink-0 items-center justify-center gap-1.5"
                    style={{ height: POST_DOTS_H }}
                    role="tablist"
                    aria-label="Slide do carrossel"
                  >
                    {designSlides.map((_, index) => (
                      <span
                        key={`dot-${index}`}
                        role="tab"
                        aria-selected={index === activeIndex}
                        className={[
                          "h-1.5 rounded-full transition-all duration-300",
                          index === activeIndex ? "w-2 bg-[#3897f0]" : "w-1.5 bg-white/35",
                        ].join(" ")}
                      />
                    ))}
                  </div>

                  <div
                    className="flex shrink-0 items-center justify-between px-3"
                    style={{ height: POST_ACTIONS_H }}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="text-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Gostar"
                      >
                        <Heart className="size-6" strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        className="text-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Comentar"
                      >
                        <MessageCircle className="size-6" strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        className="text-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Partilhar"
                      >
                        <Send className="size-6" strokeWidth={1.75} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Guardar"
                    >
                      <Bookmark className="size-6" strokeWidth={1.75} />
                    </button>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-2 pt-0.5">
                    <p className="text-[13px] font-semibold text-white">{activeSlide.likesLabel}</p>
                    <p
                      className="mt-1 text-[13px] leading-snug text-white/90"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <span className="font-semibold text-white">{MOCK_USERNAME}</span>{" "}
                      <span className="font-normal">{activeSlide.caption}</span>
                    </p>
                    <p className="mt-1 text-[13px] text-[#E1306C]">
                      {activeSlide.hashtags.map((tag) => (
                        <span key={tag} className="mr-2">
                          #{tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>

                <nav
                  className="grid w-[390px] shrink-0 grid-cols-5 items-center border-t border-white/10 bg-black px-1"
                  style={{ height: TAP_BAR_H }}
                  aria-label="Navegação principal do mockup"
                >
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Início"
                      aria-current="page"
                    >
                      <HomeFilledIcon className="size-[26px] text-white" />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Pesquisar"
                    >
                      <Search className="size-[26px]" strokeWidth={1.75} />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Reels"
                    >
                      <ReelsOutlineIcon className="size-[26px] text-white" />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative inline-flex">
                      <button
                        type="button"
                        className="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Mensagens diretas"
                      >
                        <Send className="size-[26px]" strokeWidth={1.75} />
                      </button>
                      <span
                        className="absolute bottom-1 right-1 size-[7px] rounded-full ring-2 ring-black"
                        style={{ backgroundColor: NOTIFICATION_RED }}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative inline-flex">
                      <button
                        type="button"
                        className="relative size-[26px] overflow-hidden rounded-full ring-1 ring-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Perfil"
                      >
                        <Image
                          src={MOCK_TAB_PROFILE_SRC}
                          alt=""
                          width={26}
                          height={26}
                          className="size-full object-cover"
                        />
                      </button>
                      <span
                        className="absolute -bottom-0.5 -right-0.5 size-[7px] rounded-full ring-2 ring-black"
                        style={{ backgroundColor: NOTIFICATION_RED }}
                        aria-hidden
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
