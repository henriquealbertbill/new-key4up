"use client"

import type { FC } from "react"
import RawWorkHistory, {
  type FramerWorkHistoryControlProps,
} from "@/components/framer/work-history"

export type FramerWorkHistoryProps = FramerWorkHistoryControlProps

const FramerWorkHistory = RawWorkHistory as FC<FramerWorkHistoryProps>

export default FramerWorkHistory
