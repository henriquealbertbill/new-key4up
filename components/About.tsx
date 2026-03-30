"use client";

import { motion } from "framer-motion";
import { Mail, Plus } from "lucide-react";

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
    <section
      id="sobre"
      className="border-y border-figma-border bg-card py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        {/* Heading */}
        <div className="mb-14 max-w-[760px] text-left sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.034em]"
          >
            <span className="text-figma-gray">A criar experiências</span>
            <br />
            <span className="text-foreground">
              que resolvem problemas reais.
            </span>
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left — details + history */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="rounded-2xl border border-figma-border bg-background p-4 shadow-[0px_0.6px_0.6px_-1.1px_rgba(0,0,0,0.16),0px_2.3px_2.3px_-2.2px_rgba(0,0,0,0.13),0px_10px_10px_-3.3px_rgba(0,0,0,0.06)] dark:border-card-border dark:bg-card dark:shadow-none">
              {/* Photo */}
              <div className="relative mx-auto aspect-3/4 w-full max-w-[260px] overflow-hidden rounded-2xl bg-linear-to-br from-zinc-800 via-zinc-900 to-black lg:max-w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.2),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.15),transparent_40%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="select-none text-8xl font-black text-white/10">
                    BS
                  </div>
                </div>
                {/* Social badges overlay */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {socialLinks.map((s, index) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 + index * 0.06,
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-md transition-colors hover:bg-black/70"
                      aria-label={s.label}
                    >
                      <s.icon className="h-3.5 w-3.5 text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="mt-4 text-center lg:text-left">
                <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                  Henrique Albert
                </p>
                <p className="text-sm text-figma-muted">
                  Founder & Full-Stack Developer
                </p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-figma-gray">
                O meu percurso
              </p>
              <div className="flex flex-col gap-2.5">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="flex items-center justify-between rounded-2xl border border-figma-border bg-background px-4 py-3 shadow-[0px_0.6px_0.6px_-1.1px_rgba(0,0,0,0.16),0px_2.3px_2.3px_-2.2px_rgba(0,0,0,0.13),0px_10px_10px_-3.3px_rgba(0,0,0,0.06)] dark:border-card-border dark:bg-card dark:shadow-none"
                  >
                    <div>
                      <span className="text-sm font-semibold text-foreground">
                        {exp.company}
                      </span>
                      <span className="ml-2 text-xs text-figma-muted">
                        {exp.role}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-figma-muted">
                      {exp.period}
                    </span>
                  </motion.div>
                ))}
              </div>
              <button
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-figma-border bg-background px-3 py-1.5 text-sm text-figma-muted shadow-[0px_0.6px_0.6px_-1.1px_rgba(0,0,0,0.16),0px_2.3px_2.3px_-2.2px_rgba(0,0,0,0.13),0px_10px_10px_-3.3px_rgba(0,0,0,0.06)] transition-colors hover:text-foreground dark:border-card-border dark:bg-card dark:shadow-none"
                type="button"
                aria-label="Ver todo o percurso"
              >
                <Plus className="h-4 w-4" /> Ver tudo
              </button>
            </div>
          </motion.div>

          {/* Right — philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-6 lg:col-span-3"
          >
            <div className="rounded-2xl border border-figma-border bg-background p-6 shadow-[0px_0.6px_0.6px_-1.1px_rgba(0,0,0,0.16),0px_2.3px_2.3px_-2.2px_rgba(0,0,0,0.13),0px_10px_10px_-3.3px_rgba(0,0,0,0.06)] dark:border-card-border dark:bg-card dark:shadow-none sm:p-7">
              <p className="text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-2xl">
                Sou o único por trás da Key4up - e isso é uma vantagem para ti.
              </p>
              <p className="mt-5 text-base leading-relaxed text-figma-muted">
                <strong className="font-semibold text-foreground">
                  Transformo ideias em produtos digitais reais
                </strong>{" "}
                e foco-me em resultados de negócio, não em entregas vazias. Não
                tens camadas de comunicação: falas diretamente com quem pensa,
                desenha e desenvolve.
              </p>
              <p className="mt-4 text-base leading-relaxed text-figma-muted">
                O meu objetivo é criar experiências que vendem, convertem e
                escalam, mantendo a execução simples para ti. Cada detalhe é
                desenhado para resolver um problema real, com clareza,
                performance e consistência.
              </p>
              <p className="mt-4 text-base leading-relaxed text-figma-muted">
                Trabalho com visão de parceiro - trato cada projeto como se
                fosse parte da minha própria empresa e acompanho o crescimento
                para além do lançamento.
              </p>
              <div className="pt-6">
                <svg
                  viewBox="0 0 200 60"
                  className="h-12 w-auto text-zinc-800 dark:text-figma-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10,40 C20,10 40,50 55,30 C65,15 70,45 80,35 C90,25 95,45 110,30 C125,15 130,50 145,35 C155,25 160,45 175,35 C180,32 185,38 190,35" />
                  <path d="M10,50 L60,50" />
                </svg>
                <p className="mt-1 text-xs text-figma-muted">
                  Henrique Albert, Founder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
