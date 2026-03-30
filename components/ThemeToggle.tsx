"use client"

import { useCallback, useRef, useState, useEffect, type KeyboardEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Moon, Sun } from "lucide-react"
import ThemeFillOverlay from "@/components/theme-fill-overlay"
import type { ThemeFillTarget } from "@/components/theme-fill-overlay"

const THEME_STORAGE_KEY = "key4up-theme"

const KNOB_TRAVEL_PX = 24
const KNOB_DURATION = 0.52
const ICON_DURATION = 0.42

type ThemeMode = "light" | "dark"

type FillState = Readonly<{
  key: number
  cx: number
  cy: number
  target: ThemeFillTarget
}>

const readInitialDark = (): boolean => {
  if (typeof document === "undefined") {
    return false
  }
  return document.documentElement.classList.contains("dark")
}

const applyThemeToDocument = (mode: ThemeMode): void => {
  const root = document.documentElement
  if (mode === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    /* ignore quota / private mode */
  }
}

export default function ThemeToggle() {
  const rootRef = useRef<HTMLButtonElement>(null)
  const knobRef = useRef<HTMLSpanElement>(null)
  const sunRef = useRef<HTMLSpanElement>(null)
  const moonRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotionRef = useRef(false)
  const toggleTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [fill, setFill] = useState<FillState | null>(null)

  useEffect(() => {
    setMounted(true)
    setIsDark(readInitialDark())
    prefersReducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  useGSAP(
    () => {
      const knob = knobRef.current
      if (!knob || !mounted) {
        return
      }
      const dark = readInitialDark()
      gsap.set(knob, { x: dark ? KNOB_TRAVEL_PX : 0 })
      const sun = sunRef.current
      const moon = moonRef.current
      if (sun) {
        gsap.set(sun, {
          scale: dark ? 0.62 : 1,
          opacity: dark ? 0.35 : 1,
          rotation: dark ? 72 : 0,
        })
      }
      if (moon) {
        gsap.set(moon, {
          scale: dark ? 1 : 0.62,
          opacity: dark ? 1 : 0.35,
          rotation: dark ? 0 : -72,
        })
      }
    },
    { scope: rootRef, dependencies: [mounted] },
  )

  const runToggleAnimation = useCallback((willBeDark: boolean): void => {
    const knob = knobRef.current
    const sun = sunRef.current
    const moon = moonRef.current
    const btn = rootRef.current
    if (!knob || !sun || !moon || !btn) {
      return
    }
    toggleTimelineRef.current?.kill()
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        toggleTimelineRef.current = null
      },
    })
    toggleTimelineRef.current = tl
    tl.to(knob, {
      x: willBeDark ? KNOB_TRAVEL_PX : 0,
      duration: KNOB_DURATION,
      ease: "back.out(1.42)",
    })
    tl.to(
      sun,
      {
        scale: willBeDark ? 0.62 : 1,
        opacity: willBeDark ? 0.38 : 1,
        rotation: willBeDark ? 96 : 0,
        duration: ICON_DURATION,
        ease: "power2.inOut",
      },
      0,
    )
    tl.to(
      moon,
      {
        scale: willBeDark ? 1 : 0.62,
        opacity: willBeDark ? 1 : 0.38,
        rotation: willBeDark ? 0 : -96,
        duration: ICON_DURATION,
        ease: "power2.inOut",
      },
      0,
    )
    tl.to(
      btn,
      {
        scale: 0.94,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
      0,
    )
  }, [])

  const handleFillFinished = useCallback((): void => {
    setFill(null)
  }, [])

  const handleClick = (): void => {
    if (fill !== null) {
      return
    }
    const willBeDark = !readInitialDark()
    if (prefersReducedMotionRef.current) {
      applyThemeToDocument(willBeDark ? "dark" : "light")
      setIsDark(willBeDark)
      const knob = knobRef.current
      const sun = sunRef.current
      const moon = moonRef.current
      if (knob) {
        gsap.set(knob, { x: willBeDark ? KNOB_TRAVEL_PX : 0 })
      }
      if (sun) {
        gsap.set(sun, { scale: willBeDark ? 0.62 : 1, opacity: willBeDark ? 0.38 : 1, rotation: 0 })
      }
      if (moon) {
        gsap.set(moon, { scale: willBeDark ? 1 : 0.62, opacity: willBeDark ? 1 : 0.38, rotation: 0 })
      }
      return
    }
    const btn = rootRef.current
    applyThemeToDocument(willBeDark ? "dark" : "light")
    setIsDark(willBeDark)
    if (!btn) {
      return
    }
    const r = btn.getBoundingClientRect()
    const target: ThemeFillTarget = willBeDark ? "dark" : "light"
    setFill({
      key: Date.now(),
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
      target,
    })
    runToggleAnimation(willBeDark)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  if (!mounted) {
    return (
      <span
        className="inline-block h-8 w-14 shrink-0 rounded-full bg-zinc-200/70 ring-1 ring-zinc-300/60"
        aria-hidden
      />
    )
  }

  return (
    <>
      <button
        ref={rootRef}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-busy={fill !== null}
        aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={[
          "relative h-8 w-14 shrink-0 rounded-full border border-zinc-300/80 bg-zinc-200/90 shadow-inner outline-none backdrop-blur-sm transition-[border-color,background-color,opacity] duration-300 focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-slate-500/80 dark:bg-slate-700/95",
          fill !== null ? "pointer-events-none opacity-95" : "",
        ].join(" ")}
      >
        <span
          ref={sunRef}
          className="pointer-events-none absolute left-1.5 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-amber-500"
          aria-hidden
        >
          <Sun className="size-3.5" strokeWidth={2.25} />
        </span>
        <span
          ref={moonRef}
          className="pointer-events-none absolute right-1.5 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-slate-200 dark:text-slate-100"
          aria-hidden
        >
          <Moon className="size-3.5" strokeWidth={2.25} />
        </span>
        <span
          ref={knobRef}
          className="pointer-events-none absolute left-1 top-1 inline-block size-6 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] will-change-transform dark:bg-slate-200"
          aria-hidden
        />
      </button>
      {fill ? (
        <ThemeFillOverlay
          key={fill.key}
          cx={fill.cx}
          cy={fill.cy}
          target={fill.target}
          onComplete={handleFillFinished}
        />
      ) : null}
    </>
  )
}
