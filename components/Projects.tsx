"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";

const projects = [
  {
    title: "Key4Play",
    category: "E-commerce / Marketplace",
    gradient: "from-slate-700 via-slate-800 to-zinc-900",
  },
  {
    title: "Mugen Studio",
    category: "Design studio",
    gradient: "from-neutral-600 via-stone-800 to-neutral-900",
  },
  {
    title: "Essentia",
    category: "Ecommerce site",
    gradient: "from-emerald-800 via-teal-900 to-slate-900",
  },
  {
    title: "Axiom",
    category: "Ecommerce site",
    gradient: "from-indigo-800 via-slate-900 to-black",
  },
];

export default function Projects() {
  return (
    <section id="trabalho" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="mb-10 flex max-w-[992px] flex-col gap-6 sm:mb-14">
          <SectionTitle ghostLines={["Últimos"]} solidLine="projetos." />
          <Link
            href="#trabalho"
            className="group inline-flex w-fit items-center gap-2 text-[15px] font-medium tracking-[-0.02em] text-[#545454] transition-colors hover:text-black"
          >
            <span className="border-b border-transparent pb-0.5 group-hover:border-[#545454]">
              Ver todos os projetos
            </span>
            <span
              className="flex size-[18px] items-center justify-center rounded-full border border-[#dedede] text-xs transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              ↗
            </span>
          </Link>
        </div>

        <div className="grid max-w-[992px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative mb-4 aspect-[484/363] w-full overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-[1.02]`}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-black">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium tracking-[-0.01em] text-[#545454]">
                    {project.category}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 pt-1 text-[13px] font-medium tracking-[-0.01em] text-[#545454] opacity-0 transition-opacity group-hover:opacity-100">
                  Ver projeto
                  <span className="flex size-[18px] items-center justify-center rounded-full border border-[#dedede] text-xs">
                    ↗
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
