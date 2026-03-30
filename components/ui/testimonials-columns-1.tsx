"use client"

import Image from "next/image"
import React from "react"
import { motion } from "motion/react"

export type TestimonialCard = {
  readonly text: string
  readonly image: string
  readonly name: string
  readonly role: string
}

type TestimonialsColumnProps = {
  readonly className?: string
  readonly testimonials: readonly TestimonialCard[]
  readonly duration?: number
}

export const TestimonialsColumn = (props: TestimonialsColumnProps) => {
  const duration = props.duration ?? 10
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 bg-background pb-6"
      >
        {Array.from({ length: 2 }, (_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {props.testimonials.map((item, i) => (
              <div
                key={`${dupIndex}-${item.name}-${i}`}
                className="w-full max-w-xs rounded-3xl border border-figma-border bg-card p-8 shadow-[0px_0.6px_0.6px_-1px_rgba(0,0,0,0.12),0px_10px_24px_-8px_rgba(0,0,0,0.1)] dark:border-card-border dark:shadow-none"
              >
                <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">{item.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col">
                    <div className="truncate font-medium leading-5 tracking-tight text-foreground">
                      {item.name}
                    </div>
                    <div className="truncate leading-5 tracking-tight text-figma-muted">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
