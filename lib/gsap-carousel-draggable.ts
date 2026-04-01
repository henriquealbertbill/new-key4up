/* GreenSock ships types that collide on case-sensitive TS programs (draggable.d.ts vs Draggable.d.ts). */
// @ts-nocheck
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { InertiaPlugin } from "gsap/InertiaPlugin"

gsap.registerPlugin(Draggable, InertiaPlugin)

export type DraggableInstance = {
  kill: () => unknown
  readonly isThrowing: boolean
}

export type CarouselDragHandlers = Readonly<{
  onPress: () => void
  onDragStart: () => void
  onDrag: () => void
  onThrowUpdate: () => void
  onThrowComplete: () => void
  onDragEnd: (instance: DraggableInstance) => void
}>

export type CreateCarouselDraggableParams = Readonly<{
  track: HTMLElement
  minX: number
  maxX: number
  snapX: (value: number) => number
  handlers: CarouselDragHandlers
}>

export const createCarouselDraggable = ({
  track,
  minX,
  maxX,
  snapX,
  handlers,
}: CreateCarouselDraggableParams): DraggableInstance => {
  const [instance] = Draggable.create(track, {
    type: "x",
    bounds: { minX, maxX },
    edgeResistance: 0.72,
    dragResistance: 0.035,
    allowNativeTouchScrolling: false,
    cursor: "grab",
    activeCursor: "grabbing",
    zIndexBoost: false,
    snap: {
      x: (endValue: number) => snapX(endValue),
    },
    inertia: {
      x: {
        velocity: "auto",
        end: (n: number) => snapX(n),
      },
      duration: { min: 0.35, max: 1.05 },
      resistance: 380,
    },
    onPress: handlers.onPress,
    onDragStart: handlers.onDragStart,
    onDrag: handlers.onDrag,
    onThrowUpdate: handlers.onThrowUpdate,
    onThrowComplete: handlers.onThrowComplete,
    onDragEnd: function onDragEnd() {
      handlers.onDragEnd(this)
    },
  })
  return instance
}
