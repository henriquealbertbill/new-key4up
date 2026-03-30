"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const faqs = [
  {
    q: "Quanto tempo demora um projeto típico?",
    a: "Depende do âmbito, mas um website simples leva 1–2 semanas; uma web app ou e-commerce entre 3–6 semanas. Com o plano mensal, trabalhas em ciclos contínuos de entrega.",
  },
  {
    q: "Trabalhas com o meu design existente?",
    a: "Sim. Se já tens um design no Figma ou noutro formato, implemento fielmente. Se ainda não tens design, incluo UI/UX no processo com base nos teus objetivos e branding.",
  },
  {
    q: "O que torna o teu processo único?",
    a: "Trabalhas diretamente comigo em todas as fases — sem middlemen, sem equipa rotativa. Isso significa que conheço o contexto do teu negócio de cor e nunca perdes tempo a explicar coisas.",
  },
  {
    q: "Ofereces suporte após a entrega?",
    a: "Sim. Todo o trabalho inclui 30 dias de suporte pós-lançamento para correção de bugs. Para suporte contínuo, temos o plano mensal que garante disponibilidade permanente.",
  },
  {
    q: "Como geres confidencialidade e propriedade intelectual?",
    a: "Assino NDA antes de qualquer projeto. Todo o código e assets produzidos são 100% teus. Nunca incluo o teu trabalho no meu portefólio sem permissão explícita.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Accordion */}
        <div className="lg:col-span-3">
          <SectionTitle ghostLines={["Perguntas"]} solidLine="frequentes." className="mb-10" />

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-gray-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono text-gray-300 pt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-gray-900 text-base">{faq.q}</span>
                  </div>
                  <div className="shrink-0">
                    {open === i ? (
                      <Minus className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pl-10 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 flex flex-col justify-center"
        >
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-black text-2xl">
              B
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Ainda com dúvidas?</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Agenda uma call de descoberta gratuita de 30 minutos. Fica a saber como trabalho e
                como posso ajudar o teu negócio.
              </p>
            </div>

            <a
              href="#contacto"
              className="w-full inline-flex items-center justify-center gap-2 bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition-colors text-sm"
            >
              Agendar agora 📅
            </a>

            <p className="text-xs text-gray-400">Sem compromissos. 100% gratuita.</p>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
