"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"

const cycleWords = ["criar", "desenvolver", "lançar"] as const

const menuLinks = [
  { label: "Trabalho", href: "#trabalho" },
  { label: "Design", href: "#design" },
  { label: "Serviços", href: "#servicos" },
  { label: "Preços", href: "#precos" },
  { label: "Blog", href: "#blog" },
] as const

const DribbbleGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M93.27,36.86a4,4,0,0,1,.82-7.19,103.94,103.94,0,0,1,88.66,9.95,4,4,0,0,1,1,5.87,153.32,153.32,0,0,1-41.89,37A169.43,169.43,0,0,0,93.27,36.86ZM127.58,90a153,153,0,0,0-56-46.91,3.94,3.94,0,0,0-4,.33,104.41,104.41,0,0,0-38.34,52,4,4,0,0,0,3,5.16A152.34,152.34,0,0,0,64,104,151,151,0,0,0,127.58,90Zm103.8,26.69A103.81,103.81,0,0,0,202.19,55.2a4,4,0,0,0-6,.34,169.15,169.15,0,0,1-45.69,40.4,167.73,167.73,0,0,1,13.55,29.9A167.64,167.64,0,0,1,208,120,169.35,169.35,0,0,1,227,121.07,4,4,0,0,0,231.38,116.72Zm-62.91,24.5a167.7,167.7,0,0,1,4.45,38.47,168,168,0,0,1-4.11,36.85A4,4,0,0,0,174.5,221a104.25,104.25,0,0,0,56.57-79.25,4,4,0,0,0-3.49-4.49,152.44,152.44,0,0,0-59.11,4Zm-19.64-10.45a151.76,151.76,0,0,0-12.39-27.21A167,167,0,0,1,64,120a168.4,168.4,0,0,1-34.88-3.65,4,4,0,0,0-4.81,3.56q-.31,4-.32,8.09a103.72,103.72,0,0,0,33,75.91,4,4,0,0,0,6.15-.92A169,169,0,0,1,148.83,130.77ZM75.69,213.25a4,4,0,0,0,1.52,5.48,103.88,103.88,0,0,0,68.85,11.69,3.93,3.93,0,0,0,3.06-2.65,152.6,152.6,0,0,0,7.8-48.08,151.3,151.3,0,0,0-3.74-33.46A152.94,152.94,0,0,0,75.69,213.25Z" />
  </svg>
)

const BehanceGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M92,120H64V96H92a12,12,0,0,1,0,24Zm4,16H64v32H96a16,16,0,0,0,0-32Zm80-16a24,24,0,0,0-22.62,16h45.24A24,24,0,0,0,176,120Zm64-64V200a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V56A16,16,0,0,1,32,40H224A16,16,0,0,1,240,56ZM144,88a8,8,0,0,0,8,8h48a8,8,0,0,0,0-16H152A8,8,0,0,0,144,88Zm-16,64a32,32,0,0,0-14.13-26.53A28,28,0,0,0,92,80H56a8,8,0,0,0-8,8v88a8,8,0,0,0,8,8H96A32,32,0,0,0,128,152Zm88-8a40,40,0,1,0-13.54,30,8,8,0,0,0-10.59-12,24,24,0,0,1-38.49-10H208A8,8,0,0,0,216,144Z" />
  </svg>
)

const InstagramGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinGlyph = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const socialPillClass =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % cycleWords.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion])

  const activeWord = prefersReducedMotion ? cycleWords[0] : cycleWords[wordIndex]

  return (
    <footer className="relative z-50 bg-black text-white">
      <div className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="border-b border-figma-gray/80 pb-10 pt-16 sm:pb-11 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[920px]"
          >
            <h2 className="text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.034em]">
              <span className="text-white">Vamos </span>
              <span className="relative inline-block min-w-[10.5ch] align-bottom">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeWord}
                    initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 block whitespace-nowrap text-white"
                  >
                    {activeWord}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible block whitespace-nowrap">{cycleWords[1]}</span>
              </span>
              <br />
              <span className="text-figma-gray">trabalho incrível juntos.</span>
            </h2>
          </motion.div>

          <div className="mt-10 flex flex-col gap-8 lg:mt-11 lg:flex-row lg:items-start lg:justify-between lg:gap-6 xl:gap-8">
            <div className="min-w-0 lg:max-w-[min(100%,280px)] lg:flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">
                Email
              </p>
              <a
                href="mailto:geral@key4up.com"
                className="mt-3 inline-block break-all text-[15px] font-semibold leading-snug text-white transition-colors hover:text-white/85 sm:text-base"
              >
                geral@key4up.com
              </a>
            </div>
            <div className="min-w-0 lg:max-w-[min(100%,260px)] lg:flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">
                Liga-me
              </p>
              <a
                href="#contacto"
                className="mt-3 inline-block text-[15px] font-semibold text-white transition-colors hover:text-white/85 sm:text-base"
              >
                Marcar call
              </a>
            </div>
            <div className="min-w-0 lg:flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">
                Social
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-3 text-black shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="X (Twitter)"
                >
                  <X className="size-4 shrink-0" strokeWidth={2.25} />
                  <span className="text-xs font-semibold tabular-nums">99+</span>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPillClass}
                  aria-label="Instagram"
                >
                  <InstagramGlyph className="size-4" />
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPillClass}
                  aria-label="Dribbble"
                >
                  <DribbbleGlyph className="size-4" />
                </a>
                <a
                  href="https://www.behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPillClass}
                  aria-label="Behance"
                >
                  <BehanceGlyph className="size-4" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPillClass}
                  aria-label="LinkedIn"
                >
                  <LinkedinGlyph className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-7 lg:py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-6 xl:gap-8">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">
                Menu
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-x-10 sm:gap-y-3">
                {menuLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-white transition-colors hover:text-white/75"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 lg:px-2 xl:px-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-figma-gray">
                Legal
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                <li>
                  <Link
                    href="#"
                    className="text-sm font-medium text-white transition-colors hover:text-white/75"
                  >
                    Termos de serviço
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm font-medium text-white transition-colors hover:text-white/75"
                  >
                    Política de privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <p className="text-xs font-semibold leading-none tracking-tight text-[#b8b8b8] lg:mt-1 lg:shrink-0 lg:self-start lg:text-right">
              © {new Date().getFullYear()} Key4up
            </p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none select-none overflow-hidden pb-1 pt-2"
        aria-hidden
      >
        <p
          className="text-center font-medium leading-[0.82] tracking-[-0.03em] text-white blur-[2px] mask-[linear-gradient(to_bottom,white_28%,transparent_82%)] text-[clamp(3.5rem,17vw,11.5rem)]"
        >
          KEY4UP
        </p>
      </div>
    </footer>
  )
}
