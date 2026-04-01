"use client"

import gsap from "gsap"
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  createCarouselDraggable,
  type DraggableInstance,
} from "@/lib/gsap-carousel-draggable"

export type GsapHorizontalCarouselItem = Readonly<{
  id: string
  content: ReactNode
}>

export type GsapHorizontalCarouselProps = Readonly<{
  items: readonly GsapHorizontalCarouselItem[]
  className?: string
  viewportClassName?: string
  trackClassName?: string
  cardClassName?: string
  /** Tailwind gap between cards, e.g. `gap-5` */
  gapClassName?: string
}>

const nearestSnapX = (value: number, positions: readonly number[]): number => {
  if (positions.length === 0) {
    return 0
  }
  let best = positions[0]
  let minDist = Math.abs(value - best)
  for (let i = 1; i < positions.length; i += 1) {
    const p = positions[i]
    const d = Math.abs(value - p)
    if (d < minDist) {
      minDist = d
      best = p
    }
  }
  return best
}

const nearestIndex = (value: number, positions: readonly number[]): number => {
  if (positions.length === 0) {
    return 0
  }
  let bestI = 0
  let minDist = Math.abs(value - positions[0])
  for (let i = 1; i < positions.length; i += 1) {
    const d = Math.abs(value - positions[i])
    if (d < minDist) {
      minDist = d
      bestI = i
    }
  }
  return bestI
}

/**
 * Horizontal carousel with GSAP Draggable (type `x`), inertia throw, snap-to-center,
 * and depth styling on the active slide.
 */
export default function GsapHorizontalCarousel({
  items,
  className = "",
  viewportClassName = "",
  trackClassName = "",
  cardClassName = "",
  gapClassName = "gap-5",
}: GsapHorizontalCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const draggableRef = useRef<DraggableInstance | null>(null)
  const snapPositionsRef = useRef<number[]>([])
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const positionsForDragEndRef = useRef<number[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const itemsKey = items.map((item) => item.id).join("|")

  const measureSnapPositions = useCallback((): number[] => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || items.length === 0) {
      return []
    }
    const vw = viewport.clientWidth
    const cards = Array.from(track.children) as HTMLElement[]
    return cards.map((card) => {
      const center = card.offsetLeft + card.offsetWidth / 2
      return vw / 2 - center
    })
  }, [items.length])

  const syncActiveFromTrack = useCallback(() => {
    const track = trackRef.current
    if (!track) {
      return
    }
    const x = Number(gsap.getProperty(track, "x")) || 0
    const positions = snapPositionsRef.current
    if (positions.length === 0) {
      return
    }
    setActiveIndex(nearestIndex(x, positions))
  }, [])

  const animateToSnap = useCallback(
    (targetX: number) => {
      const track = trackRef.current
      if (!track) {
        return
      }
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(track, {
        x: targetX,
        duration: 0.72,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: syncActiveFromTrack,
        onComplete: syncActiveFromTrack,
      })
    },
    [syncActiveFromTrack],
  )

  const setupDraggable = useCallback(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport || items.length === 0) {
      return
    }
    draggableRef.current?.kill()
    draggableRef.current = null
    tweenRef.current?.kill()
    tweenRef.current = null
    const positions = measureSnapPositions()
    snapPositionsRef.current = positions
    positionsForDragEndRef.current = positions
    if (positions.length === 0) {
      return
    }
    const minX = Math.min(...positions)
    const maxX = Math.max(...positions)
    const rawX = Number(gsap.getProperty(track, "x"))
    const currentX = Number.isFinite(rawX) ? rawX : positions[0]
    const clamped = Math.max(minX, Math.min(maxX, currentX))
    const initialX = nearestSnapX(clamped, positions)
    gsap.set(track, { x: initialX, force3D: true })
    setActiveIndex(nearestIndex(initialX, positions))
    const d = createCarouselDraggable({
      track,
      minX,
      maxX,
      snapX: (v) => nearestSnapX(v, positions),
      handlers: {
        onPress: () => {
          tweenRef.current?.kill()
          tweenRef.current = null
        },
        onDragStart: () => {
          setIsDragging(true)
        },
        onDrag: () => {
          syncActiveFromTrack()
        },
        onThrowUpdate: () => {
          syncActiveFromTrack()
        },
        onThrowComplete: () => {
          setIsDragging(false)
          syncActiveFromTrack()
        },
        onDragEnd: (instance) => {
          if (!instance.isThrowing) {
            setIsDragging(false)
            const pos = positionsForDragEndRef.current
            const x = Number(gsap.getProperty(track, "x")) || 0
            const snapped = nearestSnapX(x, pos)
            if (Math.abs(snapped - x) > 0.5) {
              animateToSnap(snapped)
            } else {
              syncActiveFromTrack()
            }
          }
        },
      },
    })
    draggableRef.current = d
  }, [animateToSnap, items.length, measureSnapPositions, syncActiveFromTrack])

  useLayoutEffect(() => {
    setupDraggable()
    const viewport = viewportRef.current
    if (!viewport) {
      return () => {
        tweenRef.current?.kill()
        draggableRef.current?.kill()
      }
    }
    const ro = new ResizeObserver(() => {
      setupDraggable()
    })
    ro.observe(viewport)
    return () => {
      ro.disconnect()
      tweenRef.current?.kill()
      draggableRef.current?.kill()
      draggableRef.current = null
    }
  }, [setupDraggable, itemsKey])

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      <div
        ref={viewportRef}
        data-dragging={isDragging ? "true" : "false"}
        className={[
          "group relative w-full cursor-grab overflow-hidden select-none active:cursor-grabbing",
          viewportClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ touchAction: "none" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carrossel horizontal"
      >
        <div
          ref={trackRef}
          className={[
            "flex flex-row will-change-transform",
            gapClassName,
            trackClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <div
                key={item.id}
                className={[
                  "flex w-[min(85vw,280px)] shrink-0 flex-col transition-[transform,opacity,box-shadow] duration-300 ease-out md:w-[300px]",
                  "group-data-[dragging=true]:pointer-events-none",
                  isActive
                    ? "z-10 scale-100 opacity-100 hover:z-20 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]"
                    : "z-0 scale-[0.92] opacity-[0.72] hover:z-20 hover:scale-[0.97] hover:-translate-y-1 hover:opacity-90 hover:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.5)] md:hover:scale-[1.02]",
                  cardClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive ? "true" : undefined}
              >
                {item.content}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
