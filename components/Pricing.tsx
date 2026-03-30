"use client"

import { motion } from "framer-motion"
import {
  Check,
  FileText,
  HandCoins,
  MessageSquare,
  RefreshCw,
  Zap,
} from "lucide-react"

const steps = [
  {
    icon: RefreshCw,
    title: "Subscreve",
    desc: "Subscreve via Stripe e começa a pedir pelo nosso quadro partilhado.",
  },
  {
    icon: MessageSquare,
    title: "Pedido",
    desc: "Pede qualquer serviço que ofereço: web, produto digital, integrações e mais.",
  },
  {
    icon: HandCoins,
    title: "Recebes",
    desc: "Recebes entregas com ritmo acordado — em média 48–72h por pedido simples.",
  },
]

const subscriptionFeatures = [
  "Sem contratos nem compromissos longos",
  "Várias marcas ou produtos",
  "Turnaround médio de 48–72h",
  "Pausa ou cancela quando quiseres",
  "Pedidos ilimitados em fila",
  "Desenvolvimento web & integrações",
]

const projectFeatures = [
  "Scope claramente definido",
  "3 rondas de revisão",
  "Timeline fixa com marcos",
  "Updates em cada marco",
]

const cardLift = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-48px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
} as const

export default function Pricing() {
  return (
    <section id="precos" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        {/* Heading + intro */}
        <div className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <motion.h2
            {...cardLift}
            className="max-w-[640px] text-left text-[clamp(2.25rem,5.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.034em]"
          >
            <span className="text-figma-gray">
              Preços simples.
              <br />
            </span>
            <span className="text-foreground">Projetos que se destacam.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[380px] text-[15px] leading-relaxed lg:pt-2 lg:text-right"
          >
            <strong className="font-semibold text-foreground">Preços claros, sem surpresas.</strong>
            <span className="text-figma-muted">
              {" "}
              Escolhe subscrição mensal ou um único projeto com orçamento fechado.
            </span>
          </motion.p>
        </div>

        {/* How it works */}
        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 lg:mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <step.icon className="h-6 w-6 shrink-0 text-foreground" strokeWidth={2} aria-hidden />
                <p className="text-base font-semibold text-foreground">{step.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-figma-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Subscription area: promo + card */}
        <div className="mb-6 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: dark promo */}
          <div className="flex flex-col gap-6">
            <motion.div
              {...cardLift}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-[0px_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0px_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0px_10px_10px_-3.75px_rgba(0,0,0,0.06)] sm:p-7 lg:rotate-[1.25deg]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex rounded-full border border-[#f0f0f0] bg-white/95 px-3 py-1.5 text-xs font-semibold text-black backdrop-blur-sm dark:bg-white">
                  Pausa ou cancela quando quiseres
                </span>
              </div>
              <div className="pointer-events-none absolute -right-4 top-1/2 size-36 -translate-y-1/2 opacity-90 sm:size-44">
                <div className="flex size-full items-center justify-center rounded-full bg-linear-to-br from-zinc-600/40 to-zinc-900/80 blur-[1px]">
                  <Zap
                    className="size-24 text-zinc-400/90 sm:size-28"
                    strokeWidth={1.15}
                    aria-hidden
                  />
                </div>
              </div>
              <p className="relative z-1 mt-16 max-w-[85%] text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">
                <span className="text-[#b8b8b8]">Serviços em subscrição </span>
                <span className="text-white">para marcas que avançam rápido.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-figma-border bg-card px-3.5 py-2 shadow-[0px_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0px_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0px_10px_10px_-3.75px_rgba(0,0,0,0.06)] dark:border-card-border dark:shadow-none"
            >
              <span className="relative flex size-2.5 shrink-0">
                <span className="online-status-pulse absolute size-2.5 rounded-full bg-figma-green/30" aria-hidden />
                <span className="relative size-2.5 rounded-full bg-figma-green" aria-hidden />
              </span>
              <span className="text-xs font-semibold text-foreground">Vagas disponíveis</span>
            </motion.div>

            <div>
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                Contrata hoje
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-figma-muted sm:text-[15px]">
                Sem mark-up de agência — trabalhas diretamente com a equipa que executa o trabalho.
              </p>
            </div>
          </div>

          {/* Right: subscription card */}
          <motion.div
            {...cardLift}
            transition={{ ...cardLift.transition, delay: 0.08 }}
            className="flex flex-col rounded-3xl border border-figma-border bg-card p-6 shadow-[0px_0.6px_0.6px_-1.25px_rgba(0,0,0,0.12),0px_2.3px_2.3px_-2.5px_rgba(0,0,0,0.1),0px_10px_10px_-3.75px_rgba(0,0,0,0.08)] sm:p-8 dark:border-card-border dark:shadow-none"
          >
            <div>
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                Desenvolvimento contínuo
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-figma-muted sm:text-[15px]">
                <span className="text-figma-gray">
                  Uma taxa mensal previsível para pedidos de desenvolvimento em fila.
                </span>{" "}
                <span>Ideal para produtos e marcas com necessidade contínua.</span>
              </p>
            </div>

            <div className="my-6 h-px w-full bg-figma-border" />

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
                €3.500
              </span>
              <span className="text-sm font-medium text-figma-muted">/ mês</span>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {subscriptionFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-figma-gray" strokeWidth={2.5} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-figma-border pt-6 dark:border-card-border">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-foreground bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.35),0px_2px_8px_-2px_rgba(0,0,0,0.35)] transition-opacity hover:opacity-95 dark:border-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.85)]"
              >
                <Zap className="size-4 opacity-90" aria-hidden />
                Começar agora
              </a>
              <span className="text-xs font-medium tracking-wide text-figma-muted">
                Pagamentos seguros via <span className="font-semibold text-foreground">Stripe</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Single project — full width dark */}
        <motion.div
          {...cardLift}
          transition={{ ...cardLift.transition, delay: 0.12 }}
          className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="max-w-xl lg:shrink-0">
            <h3 className="text-xl font-bold text-white sm:text-2xl">Projeto único</h3>
            <p className="mt-2 text-sm leading-relaxed text-white sm:text-[15px]">
              <span className="text-white">Scope completo para uma entrega pontual.</span>{" "}
              <span className="text-[#b8b8b8]">Ideal para lançamentos, migrações ou módulos isolados.</span>
            </p>
          </div>

          <ul className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-md">
            {projectFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                <Check className="size-4 shrink-0 text-[#f0f0f0]" strokeWidth={2.5} aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#dedede] bg-[#fafafa] px-5 py-2.5 text-sm font-semibold text-black shadow-[0px_0.6px_0.6px_-1px_rgba(0,0,0,0.12),0px_6px_16px_-6px_rgba(0,0,0,0.12)] transition-colors hover:bg-white lg:self-center"
          >
            <FileText className="size-4" aria-hidden />
            Pedir orçamento
          </a>
        </motion.div>
      </div>
    </section>
  )
}
