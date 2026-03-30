"use client"

import { useEffect, useRef, useState } from "react"

/** Ball diameter in CSS pixels */
const BALL_SIZE_PX = 12
/** Offset from the arrow tip (browser hotspot) toward the heel of the system cursor */
const CURSOR_TAIL_OFFSET_X_PX = 14
const CURSOR_TAIL_OFFSET_Y_PX = 15
const SMOOTHING = 0.14

type Point = { readonly x: number; readonly y: number }

export default function CursorFollower() {
  const targetRef = useRef<Point>({ x: 0, y: 0 })
  const currentRef = useRef<Point>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const hasPointerRef = useRef(false)
  const ballRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const half = BALL_SIZE_PX / 2
    const ball = ballRef.current
    if (!ball) {
      return
    }

    const anchorFromEvent = (event: PointerEvent): Point => ({
      x: event.clientX + CURSOR_TAIL_OFFSET_X_PX,
      y: event.clientY + CURSOR_TAIL_OFFSET_Y_PX,
    })

    const handlePointerMove = (event: PointerEvent) => {
      const anchor = anchorFromEvent(event)
      targetRef.current = anchor
      if (!hasPointerRef.current) {
        hasPointerRef.current = true
        currentRef.current = anchor
        ball.style.transform = `translate(${anchor.x - half}px, ${anchor.y - half}px)`
        setIsVisible(true)
      }
    }

    const tick = () => {
      if (hasPointerRef.current) {
        const target = targetRef.current
        const current = currentRef.current
        const nextX = current.x + (target.x - current.x) * SMOOTHING
        const nextY = current.y + (target.y - current.y) * SMOOTHING
        currentRef.current = { x: nextX, y: nextY }
        ball.style.transform = `translate(${nextX - half}px, ${nextY - half}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={ballRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-100 hidden rounded-full bg-[#333333] pointer-fine:block dark:bg-zinc-500"
      style={{
        width: BALL_SIZE_PX,
        height: BALL_SIZE_PX,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.15s ease-out",
        willChange: "transform",
      }}
    />
  )
}
