"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import "@/components/framer/styles.css"
import FramerSocialIcons from "@/components/framer-social-icons"
import WorkHistoryFramer from "@/components/framer-work-history"
import SectionTitle from "@/components/ui/SectionTitle"

const ABOUT_COPY = `Adoro transformar ideias em algo real através do design e do código. O que começou por curiosidade tornou-se profissão quando percebi como produtos bem pensados podem ser bonitos e, ao mesmo tempo, resolver problemas de verdade. Foco-me em interfaces e sistemas com um propósito claro — não só estética, mas resultados. Quer seja numa aplicação mobile ou num site, o meu objetivo é criar algo que pareça natural e simples de usar. Sou exigente com os pormenores, e é isso que faz a diferença entre bom e excelente. Essa atenção ao detalhe ajuda-me a construir relações de confiança com clientes que sabem que trato cada projeto com o mesmo cuidado que trataria o meu.`

export default function About() {
  return (
    <section
      id="sobre"
      className="border-t border-figma-border bg-card py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col gap-16 px-4 sm:px-8 lg:px-11">
        <SectionTitle
          ghostLines={["A criar experiências", "que resolvem"]}
          solidLine="problemas reais."
        />

        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex w-full min-w-0 flex-1 flex-col gap-16">
            <div className="flex w-full flex-col gap-4">
              <div className="relative aspect-[0.905] w-full max-h-[410px] overflow-visible">
                <div className="absolute inset-0 overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src="/images/henrique.jpg"
                    alt="Henrique Albert"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority={false}
                  />
                </div>
                <div className="absolute right-3 bottom-3 z-10 max-w-[calc(100%-1.5rem)] overflow-x-auto pb-1">
                  <FramerSocialIcons variant="Default" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[22px] font-medium leading-[140%] tracking-[-0.03em] text-foreground">
                  Henrique Albert
                </p>
                <p className="text-sm font-semibold leading-[112%] tracking-[-0.01em] text-figma-muted">
                  Fundador & Full-Stack Developer
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <p className="text-lg font-medium leading-[140%] tracking-[-0.02em] text-foreground">
                O meu percurso
              </p>
              <div className="flex w-full justify-start">
                <WorkHistoryFramer
                  C3wqzi1gH="Staff Product Designer"
                  ciHciAUDB="2016-2020"
                  cWbhifCIf="Mugen"
                  fY47FdliR="Axiom"
                  onWmspHut="Designer"
                  qGp7vI2z6="KYMA"
                  rrXhSebWp="2012-2024"
                  rxHhshyDG="2020-2022"
                  wrlTXIfKr="Full-Stack Designer"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-w-0 flex-[1.5] lg:max-w-none"
          >
            <p className="text-[22px] font-medium leading-[140%] tracking-[-0.03em] text-foreground">
              {ABOUT_COPY}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
