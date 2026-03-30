"use client";

import { motion } from "framer-motion";
import { Mail, Plus } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const experiences = [
  { company: "Key4up", role: "Founder & Developer", period: "2020–presente" },
  { company: "Freelancer", role: "Full-Stack Developer", period: "2018–2020" },
  { company: "AgênciaXYZ", role: "Frontend Developer", period: "2016–2018" },
];

const socialLinks = [
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:geral@key4up.com" },
];

export default function About() {
  return (
    <section id="sobre" className="border-y border-[#dedede] bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        {/* Title */}
        <div className="text-center mb-16">
          <SectionTitle
            ghostLines={["A criar experiências", "que resolvem"]}
            solidLine="problemas reais."
            align="center"
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — photo + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-900 max-w-xs mx-auto lg:max-w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/10 font-black text-8xl">B</div>
              </div>
              {/* Social badges overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    aria-label={s.label}
                  >
                    <s.icon className="w-3.5 h-3.5 text-gray-800" />
                  </a>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="text-center lg:text-left">
              <div className="font-bold text-gray-900 text-lg">Bruno Silva</div>
              <div className="text-sm text-gray-500">Founder & Full-Stack Developer</div>
            </div>

            {/* Experience */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                O meu percurso
              </p>
              <div className="flex flex-col gap-2">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm"
                  >
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{exp.company}</span>
                      <span className="text-xs text-gray-400 ml-2">{exp.role}</span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{exp.period}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Plus className="w-4 h-4" /> Ver tudo
              </button>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 flex flex-col justify-center gap-6"
          >
            <p className="text-2xl font-semibold text-gray-900 leading-snug">
              Sou o único por trás da Key4up — e isso é uma vantagem para ti.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Não tens um gestor de conta, um designer separado ou um dev que nunca veste o projeto.
              Tens{" "}
              <strong className="text-gray-900">
                uma pessoa que conhece o teu negócio de ponta a ponta
              </strong>{" "}
              e entrega com a{" "}
              <strong className="text-gray-900">
                mesma exigência de uma agência, mas sem a burocracia.
              </strong>
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Comecei a programar por paixão e transformei isso numa carreira focada em criar
              produtos digitais que realmente funcionam. Cada projeto é tratado como se fosse meu
              próprio negócio.
            </p>

            {/* Signature SVG */}
            <div className="pt-2">
              <svg
                viewBox="0 0 200 60"
                className="h-12 w-auto text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10,40 C20,10 40,50 55,30 C65,15 70,45 80,35 C90,25 95,45 110,30 C125,15 130,50 145,35 C155,25 160,45 175,35 C180,32 185,38 190,35" />
                <path d="M10,50 L60,50" />
              </svg>
              <p className="text-xs text-gray-400 mt-1">Bruno Silva, Founder</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
