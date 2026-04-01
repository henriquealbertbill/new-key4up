"use client"

import type { FC } from "react"
import RawSocialIcons from "@/components/framer/social-icons"

export type FramerSocialIconsProps = {
  readonly variant?: "Default" | "Footer" | "Blog"
}

const FramerSocialIcons = RawSocialIcons as FC<FramerSocialIconsProps>

export default FramerSocialIcons
