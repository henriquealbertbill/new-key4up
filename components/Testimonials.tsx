"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { TestimonialCard } from "@/components/ui/testimonials-columns-1";

const testimonials: readonly TestimonialCard[] = [
  {
    text: "Entregou o projeto em metade do tempo previsto. A qualidade do código é excecional e a comunicação foi impecável durante todo o processo.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "João Ferreira",
    role: "CTO, DataFlow",
  },
  {
    text: "A minha loja online triplicou as vendas após o redesign. Percebeu perfeitamente o que precisávamos sem termos de explicar tudo pormenorizadamente.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Ana Costa",
    role: "Fundadora, ModaStore",
  },
  {
    text: "Profissionalismo absoluto. Cumpriu todos os prazos e ainda sugeriu melhorias que nós nem tínhamos pensado. Voltaremos a trabalhar juntos.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Pedro Rodrigues",
    role: "CEO, TechVentures",
  },
  {
    text: "Trabalhar convosco é ter a tranquilidade de que o trabalho é bem feito. Não preciso de microgerir — reportam tudo de forma proativa.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Sofia Mendes",
    role: "Product Manager, SaaSCo",
  },
  {
    text: "Melhor investimento que fiz este ano. A app mobile que desenvolveram está a ser um sucesso na App Store com 4,8 estrelas.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Miguel Alves",
    role: "Fundador, FitApp",
  },
  {
    text: "Por fim um parceiro técnico que percebe de negócio. As sugestões têm sempre em conta o impacto no utilizador final. Excelente trabalho.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Carla Oliveira",
    role: "CMO, GrowthLab",
  },
  {
    text: "A nova área de cliente reduziu tickets de suporte em cerca de 40%. UX clara, integrações estáveis e entrega sem sobressaltos.",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Ricardo Sousa",
    role: "Head of Operations, ServiceHub",
  },
  {
    text: "Lançámos o nosso SaaS em tempo recorde. Arquitectura pensada para escalar e um acompanhamento próximo em cada sprint.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Filipe Amaral",
    role: "Co-founder, ScaleTools",
  },
  {
    text: "ROI visível em poucas semanas. Tráfego pago, landing e CRM ligados — finalmente temos números de que realmente confiamos.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80",
    name: "Mariana Lopes",
    role: "Growth Lead, RetailCo",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative my-20 scroll-mt-24 bg-background py-8 sm:my-24"
    >
      <div className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center text-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border border-figma-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-wider text-figma-muted dark:border-card-border">
              Testemunhos
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            O que dizem
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-figma-muted">
            Histórias reais de clientes satisfeitos com os projetos entregues.
          </p>
        </motion.div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
