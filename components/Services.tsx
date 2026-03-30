"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Layers,
  Cloud,
  ShoppingCart,
  Target,
  GitBranch,
  Puzzle,
  Palette,
} from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const services = [
  { icon: Globe, label: "Desenvolvimento Web & Sistemas" },
  { icon: Layers, label: "Aplicações SaaS & Plataformas" },
  { icon: ShoppingCart, label: "E-commerce & Marketplaces" },
  { icon: Target, label: "Tráfego Pago & Aquisição" },
  { icon: GitBranch, label: "Funis & Otimização de Conversão" },
  { icon: Puzzle, label: "Integrações, Automação & IA" },
  { icon: Palette, label: "UI/UX & Design Estratégico" },
  { icon: Cloud, label: "Cloud, Performance & Segurança" },
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Tailwind",
  "Docker",
  "AWS",
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left col */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <SectionTitle ghostLines={["Serviços que", "aceleram o"]} solidLine="teu negócio." />
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-figma-gray">
                A minha stack
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className="group relative flex aspect-square items-center justify-center rounded-xl border border-figma-border bg-white shadow-[0px_0.6px_0.6px_-1px_rgba(0,0,0,0.09),0px_1.8px_1.8px_-1.5px_rgba(0,0,0,0.08),0px_5px_5px_-2.4px_rgba(0,0,0,0.06),0px_15px_15px_-3.5px_rgba(0,0,0,0.04)] transition-transform dark:border-card-border dark:bg-card dark:shadow-none"
                  >
                    <span className="text-center text-[11px] font-bold leading-tight text-foreground sm:text-xs">
                      {tech}
                    </span>
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — services list */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-2.5">
              {services.map((service, i) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 rounded-2xl border border-figma-border bg-white px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50/70 hover:shadow-[0px_0.6px_0.6px_-1px_rgba(0,0,0,0.09),0px_2px_2px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-3px_rgba(0,0,0,0.08),0px_20px_20px_-4px_rgba(0,0,0,0.06)] dark:border-card-border dark:bg-card dark:hover:bg-card-border/30 dark:hover:shadow-none"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl border border-figma-gray/45 bg-black shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.4),0px_0.74px_0.74px_-0.75px_rgba(0,0,0,0.33),0px_2px_2px_-1.5px_rgba(0,0,0,0.32),0px_4.4px_4.4px_-2.25px_rgba(0,0,0,0.3),0px_9.8px_9.8px_-3px_rgba(0,0,0,0.25),0px_25px_25px_-3.75px_rgba(0,0,0,0.11)] transition-transform duration-200 group-hover:scale-105 dark:border-zinc-500 dark:bg-zinc-100 dark:shadow-none">
                    <service.icon className="h-5 w-5 text-white dark:text-zinc-900" />
                  </div>
                  <span className="text-[1.04rem] font-semibold tracking-[-0.015em] text-foreground sm:text-[1.08rem]">
                    {service.label}
                  </span>
                  <span className="ml-auto text-xl text-gray-300 transition-colors group-hover:text-gray-500 dark:text-figma-border dark:group-hover:text-figma-muted">
                    ↗
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
