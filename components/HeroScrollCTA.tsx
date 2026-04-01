"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import "@/components/framer/styles.css"
import BottomContactNavFramer from "@/components/framer-bottom-contact-nav"

/** Anchor no Hero — a barra só aparece depois deste botão sair da vista */
const HERO_PRIMARY_CTA_ID = "hero-primary-cta"
const PAST_CTA_EDGE_PX = 8

const easeOut = [0.16, 1, 0.3, 1] as const

const CAL_PROFILE_URL =
  `https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME ?? "henrique-albert"}` as const

/** E.164 sem + (ex.: 351912345678). Definir em .env: NEXT_PUBLIC_WHATSAPP_E164 */
const buildWhatsAppHref = (): string => {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? ""
  const digits = raw.replace(/\D/g, "")
  const text = encodeURIComponent("Olá! Vim pelo site da Key4up.")
  if (digits.length >= 9) {
    return `https://wa.me/${digits}?text=${text}`
  }
  return `https://wa.me/?text=${text}`
}

const shouldShowFloatingCta = (): boolean => {
  const el = document.getElementById(HERO_PRIMARY_CTA_ID)
  if (!el) {
    return false
  }
  const rect = el.getBoundingClientRect()
  return rect.bottom <= PAST_CTA_EDGE_PX
}

export default function HeroScrollCTA() {
  const [showFloatingCta, setShowFloatingCta] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleScrollOrResize = useCallback(() => {
    setShowFloatingCta(shouldShowFloatingCta())
  }, [])

  useEffect(() => {
    handleScrollOrResize()
    window.addEventListener("scroll", handleScrollOrResize, { passive: true })
    window.addEventListener("resize", handleScrollOrResize)
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize)
      window.removeEventListener("resize", handleScrollOrResize)
    }
  }, [handleScrollOrResize])

  const handleContactForm = async () => {
    window.location.href = "mailto:geral@key4up.com"
  }

  return (
    <AnimatePresence>
      {showFloatingCta ? (
        <motion.div
          key="hero-cta"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.38, ease: easeOut }}
          className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] shrink-0 -translate-x-1/2 justify-center px-3"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="pointer-events-auto [&_nav]:max-w-[min(500px,calc(100vw-1.5rem))]">
            <BottomContactNavFramer.Responsive
              S36CzfaRp={handleContactForm}
              T2eKpjYwE={CAL_PROFILE_URL}
              whatsappHref={buildWhatsAppHref()}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
