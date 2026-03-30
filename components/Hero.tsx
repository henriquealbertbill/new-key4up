"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="flex w-full flex-col items-center pt-[120px] md:pt-[132px]">
      <div className="flex w-full max-w-[1080px] flex-col gap-8 px-4 pb-16 sm:px-8 lg:px-11">
        <div className="flex w-full max-w-[992px] flex-col gap-6">
          <motion.div {...fadeUp(0.08)} className="flex flex-col items-start">
            <div className="relative flex h-[30px] items-center gap-2 rounded-full border border-[#f0f0f0] bg-white pl-2 pr-4 shadow-[0px_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0px_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0px_10px_10px_-3.75px_rgba(0,0,0,0.06)]">
              <span className="relative flex size-4 shrink-0 items-center justify-center">
                <span className="absolute size-4 rounded-full bg-[#12b33f]/25" aria-hidden />
                <span className="relative size-2 rounded-full bg-[#12b33f]" aria-hidden />
              </span>
              <span className="text-[11.3px] font-semibold tracking-[-0.01em] text-black">
                Disponível para novos projetos
              </span>
            </div>
          </motion.div>

          <div className="flex w-full max-w-[496px] flex-col gap-6">
            <motion.div {...fadeUp(0.14)} className="flex flex-col gap-0">
              <h1 className="flex flex-wrap items-baseline gap-x-[0.28em] font-medium leading-[1.02] tracking-[-0.032em] text-[#828282] text-[clamp(2.75rem,7.2vw,4.31rem)]">
                <span>Software</span>
                <span>que</span>
              </h1>
              <h1 className="mt-0 flex flex-wrap items-baseline gap-x-[0.28em] font-medium leading-[1.02] tracking-[-0.032em] text-black text-[clamp(2.75rem,7.2vw,4.31rem)]">
                <span>entrega</span>
                <span>resultados.</span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="max-w-[390px]">
              <p className="text-[16.9px] font-semibold leading-[25.2px] tracking-[-0.022em] text-black">
                Desenvolvimento que impulsiona o crescimento, não só código.
                <span className="font-medium text-[#545454]">
                  {" "}
                  Crio o que a tua marca precisa para atrair clientes e converter.
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div {...fadeUp(0.26)} className="flex flex-col items-start">
          <a
            href="#contacto"
            className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-3xl border border-[#545454] bg-black py-2 pl-2 pr-4 text-left shadow-[0px_0.74px_0.74px_-0.75px_rgba(0,0,0,0.33),0px_2px_2px_-1.5px_rgba(0,0,0,0.32),0px_4.4px_4.4px_-2.25px_rgba(0,0,0,0.3),0px_9.8px_9.8px_-3px_rgba(0,0,0,0.25),0px_25px_25px_-3.75px_rgba(0,0,0,0.11),0px_0px_0px_1px_#545454] transition-opacity hover:opacity-95"
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.4)]"
              aria-hidden
            />
            <span className="relative flex size-7 shrink-0 items-center justify-center">
              <span className="absolute left-0 top-1/2 flex size-3.5 -translate-y-1/2 items-center justify-center">
                <span className="h-2 w-2.5 bg-white" aria-hidden />
                <span className="absolute h-2.5 w-0.5 bg-white" aria-hidden />
              </span>
              <span className="absolute left-0 flex size-7 items-center justify-center rounded-full bg-white">
                <span className="text-[11.3px] font-semibold tracking-[-0.01em] text-black">Tu</span>
              </span>
              <span className="z-[1] flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-900 ring-2 ring-black">
                <span className="text-[10px] font-bold text-white">K4</span>
              </span>
            </span>
            <span className="relative text-[13.3px] font-semibold tracking-[-0.01em] text-white">
              Agenda uma call comigo
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
