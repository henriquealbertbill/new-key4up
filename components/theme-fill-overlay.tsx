"use client"

import { useLayoutEffect, useRef, type ReactElement } from "react"
import { createPortal } from "react-dom"
import gsap from "gsap"

/** Must match `app/globals.css` page backgrounds */
const LIGHT_PAGE_BG = "#fafafa"
const DARK_PAGE_BG = "#090b10"

export type ThemeFillTarget = "dark" | "light"

type ThemeFillOverlayProps = {
  readonly cx: number
  readonly cy: number
  readonly target: ThemeFillTarget
  readonly onComplete: () => void
}

/**
 * Fixed layer *below* page content (`main` uses `z-[1]`) so the circle grows behind UI.
 * `html.dark` is toggled when the user clicks (before this tween); onComplete only clears UI state.
 */
export default function ThemeFillOverlay({
  cx,
  cy,
  target,
  onComplete,
}: ThemeFillOverlayProps): ReactElement | null {
  const overlayRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  useLayoutEffect(() => {
    const el = overlayRef.current
    if (!el) {
      return
    }
    const w = window.innerWidth
    const h = window.innerHeight
    const maxR = Math.ceil(Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) + 48)
    el.style.backgroundColor = target === "dark" ? DARK_PAGE_BG : LIGHT_PAGE_BG
    el.style.clipPath = `circle(0px at ${cx}px ${cy}px)`

    const tween = gsap.to(el, {
      clipPath: `circle(${maxR}px at ${cx}px ${cy}px)`,
      duration: 0.82,
      ease: "power2.inOut",
      onComplete: () => {
        onCompleteRef.current()
      },
    })

    return () => {
      tween.kill()
    }
  }, [cx, cy, target])

  if (typeof document === "undefined") {
    return null
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "clip-path" }}
      aria-hidden
    />,
    document.body,
  )
}
