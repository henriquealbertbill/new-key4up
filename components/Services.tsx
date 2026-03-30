"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cloud,
  ShoppingCart,
  Puzzle,
  Palette,
  Shield,
} from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const services = [
  { icon: Globe, label: "Desenvolvimento Web" },
  { icon: Smartphone, label: "Aplicações Mobile" },
  { icon: Cloud, label: "Cloud & DevOps" },
  { icon: ShoppingCart, label: "E-Commerce" },
  { icon: Puzzle, label: "Integrações & APIs" },
  { icon: Palette, label: "UI/UX Design" },
  { icon: Shield, label: "Segurança & Performance" },
];

const techStack = [
  { label: "React", bg: "bg-blue-50", text: "text-blue-600" },
  { label: "Next.js", bg: "bg-gray-100", text: "text-gray-700" },
  { label: "Node.js", bg: "bg-green-50", text: "text-green-700" },
  { label: "TypeScript", bg: "bg-blue-50", text: "text-blue-700" },
  { label: "PostgreSQL", bg: "bg-sky-50", text: "text-sky-700" },
  { label: "Tailwind", bg: "bg-teal-50", text: "text-teal-700" },
  { label: "Docker", bg: "bg-blue-50", text: "text-blue-600" },
  { label: "AWS", bg: "bg-orange-50", text: "text-orange-600" },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left col */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <SectionTitle
            ghostLines={["Serviços que", "aceleram o"]}
            solidLine="teu negócio."
          />

          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              A minha stack
            </p>
            <div className="grid grid-cols-4 gap-2">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.label}
                  whileHover={{ scale: 1.05 }}
                  className={`${tech.bg} aspect-square rounded-xl flex items-center justify-center shadow-sm border border-white`}
                >
                  <span className={`text-xs font-bold ${tech.text} text-center leading-tight px-1`}>
                    {tech.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col — services list */}
        <div className="lg:col-span-3">
          {services.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-5 py-5 border-b border-gray-100 group hover:bg-gray-50/50 -mx-4 px-4 rounded-xl transition-colors duration-150"
            >
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">{service.label}</span>
              <span className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors">
                ↗
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
