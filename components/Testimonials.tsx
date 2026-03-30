"use client";

import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";

const testimonials = [
  {
    text: "Entregou o projeto em metade do tempo previsto. A qualidade do código é excepcional e a comunicação foi impecável durante todo o processo.",
    highlight: "metade do tempo previsto",
    name: "João Ferreira",
    role: "CTO, DataFlow",
    avatar: "J",
    color: "bg-blue-400",
  },
  {
    text: "A minha loja online triplicou as vendas após o redesign. O Bruno entendeu perfeitamente o que precisava sem que eu precisasse explicar muito.",
    highlight: "triplicou as vendas",
    name: "Ana Costa",
    role: "Founder, ModaStore",
    avatar: "A",
    color: "bg-pink-400",
  },
  {
    text: "Profissionalismo absoluto. Cumpriu todos os prazos e ainda sugeriu melhorias que eu nem tinha pensado. Definitivamente vou trabalhar novamente.",
    highlight: "Profissionalismo absoluto",
    name: "Pedro Rodrigues",
    role: "CEO, TechVentures",
    avatar: "P",
    color: "bg-green-400",
  },
  {
    text: "Trabalhar com o Bruno é ter a tranquilidade de que o trabalho vai ser bem feito. Não preciso de microgerir nada — ele reporta tudo proativamente.",
    highlight: "tranquilidade de que o trabalho vai ser bem feito",
    name: "Sofia Mendes",
    role: "Product Manager, SaaSCo",
    avatar: "S",
    color: "bg-orange-400",
  },
  {
    text: "Melhor investimento que fiz este ano. A app mobile que desenvolveu está a ser um sucesso total na App Store com 4.8 estrelas.",
    highlight: "Melhor investimento que fiz este ano",
    name: "Miguel Alves",
    role: "Founder, FitApp",
    avatar: "M",
    color: "bg-purple-400",
  },
  {
    text: "Finalmente um developer que percebe de negócio. As suas sugestões técnicas sempre têm em conta o impacto no utilizador final. Excelente trabalho.",
    highlight: "percebe de negócio",
    name: "Carla Oliveira",
    role: "CMO, GrowthLab",
    avatar: "C",
    color: "bg-teal-400",
  },
];

function highlightText(text: string, highlight: string) {
  const parts = text.split(highlight);
  return (
    <>
      {parts[0]}
      <strong className="text-gray-900">{highlight}</strong>
      {parts[1]}
    </>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle ghostLines={["O que"]} solidLine="dizem." />
        <p className="max-w-xs text-[15px] font-medium leading-relaxed tracking-[-0.02em] text-[#545454]">
          Histórias reais de clientes satisfeitos com os projetos entregues.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 rounded-2xl border border-[#f0f0f0] bg-white p-6 shadow-sm"
          >
            <div className="text-gray-200 text-4xl font-serif leading-none">&ldquo;</div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              {highlightText(t.text, t.highlight)}
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
              <div
                className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
              >
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
              <div className="ml-auto flex gap-0.5 text-yellow-400 text-xs">★★★★★</div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
