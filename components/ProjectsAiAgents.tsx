"use client";

import { motion } from "framer-motion";
import WhatsAppDemoConversation from "@/components/WhatsAppDemoConversation";

export default function ProjectsAiAgents() {
  return (
    <section
      id="agentes-ia"
      className="relative z-10 border-t border-figma-border bg-background py-16 sm:py-20"
      aria-labelledby="agentes-ia-heading"
    >
      <div className="relative z-0 mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <p className="mb-3 inline-flex items-center rounded-full border border-figma-border bg-background px-3 py-1 text-[12px] font-medium tracking-[-0.02em] text-figma-muted">
              Agentes de IA
            </p>
            <h2
              id="agentes-ia-heading"
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.034em] text-foreground"
            >
              <span className="text-figma-gray">Criamos e treinamos </span>
              <span className="text-foreground">o agente para o seu comércio.</span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed tracking-[-0.02em] text-figma-muted">
              Desenhamos o fluxo de conversa, ligamos ao seu catálogo e políticas de
              entrega, e afinamos respostas para soar como a sua marca — no WhatsApp ou
              no canal que escolher. O resultado é um assistente que responde em
              segundos, 24/7, sem perder o tom do seu negócio.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] font-medium tracking-[-0.01em] text-foreground">
              <li className="flex gap-2">
                <span className="text-figma-green" aria-hidden>
                  ✓
                </span>
                <span>Integração com produtos, stock e horários reais</span>
              </li>
              <li className="flex gap-2">
                <span className="text-figma-green" aria-hidden>
                  ✓
                </span>
                <span>Treino com o seu vocabulário e regras de atendimento</span>
              </li>
              <li className="flex gap-2">
                <span className="text-figma-green" aria-hidden>
                  ✓
                </span>
                <span>Handoff suave para a sua equipa quando precisar</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full min-h-0 max-w-[min(100%,480px)] sm:max-w-[min(100%,520px)] lg:mx-0 lg:max-w-none"
          >
            <WhatsAppDemoConversation />
            <p className="mt-3 text-center text-[12px] tracking-[-0.01em] text-figma-muted lg:text-left">
              Exemplo ilustrativo — não é uma conversa real.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
