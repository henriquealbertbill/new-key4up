"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const steps = [
  { icon: "📋", title: "Contacta", desc: "Descreve o teu projeto" },
  { icon: "🤝", title: "Proposta", desc: "Recebe orçamento em 24h" },
  { icon: "🚀", title: "Entrega", desc: "Lançamento dentro do prazo" },
];

const monthlyFeatures = [
  "Sem contratos",
  "Pause quando quiser",
  "Pedidos ilimitados",
  "Entrega em 48–72h",
  "Múltiplos projetos",
];

const projectFeatures = [
  "Scope definido",
  "Timeline fixo",
  "3 rondas de revisão",
  "Milestone updates",
];

export default function Pricing() {
  return (
    <section id="precos" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
      <SectionTitle
        ghostLines={["Preços simples.", "Design que"]}
        solidLine="se destaca."
        className="mb-12"
      />

      {/* Steps */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
          >
            <span className="text-2xl">{step.icon}</span>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{step.title}</div>
              <div className="text-xs text-gray-500">{step.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto hidden sm:block" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Cards row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Dark card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0f0f0f] rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
        >
          {/* Badge */}
          <span className="inline-flex self-start bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full">
            Pause or cancel anytime
          </span>

          {/* Abstract illustration */}
          <div className="h-32 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-1.5 p-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Slots */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm text-gray-400">2 slots disponíveis</span>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl mb-2">Contrata hoje</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Trabalha diretamente com o developer, sem intermediários.
            </p>
          </div>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col gap-5"
        >
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-1">Desenvolvimento Contínuo</h3>
            <p className="text-gray-500 text-sm">
              Taxa mensal flat para pedidos ilimitados de desenvolvimento.
            </p>
          </div>

          <div>
            <div className="text-5xl font-black text-gray-900 tracking-tight">€3.500</div>
            <div className="text-gray-400 text-sm">por mês</div>
          </div>

          <ul className="flex flex-col gap-2.5">
            {monthlyFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition-colors text-sm"
          >
            Começar agora <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Single project card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#0f0f0f] rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
      >
        <div className="flex-1">
          <h3 className="text-white font-bold text-xl mb-2">Projeto Único</h3>
          <p className="text-gray-400 text-sm">
            Desenvolvimento completo para qualquer escopo de projeto.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {projectFeatures.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="shrink-0 inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-100 transition-colors text-sm"
        >
          Pedir orçamento <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
      </div>
    </section>
  );
}
