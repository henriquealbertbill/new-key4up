"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-white/[0.03] font-black text-[12vw] leading-none whitespace-nowrap">
          KEY4UP
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        {/* Big CTA */}
        <div className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="block text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.034em] text-[#828282]">
              Vamos criar
            </div>
            <div className="block text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.034em] text-white">
              trabalho incrível juntos.
            </div>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="mailto:geral@key4up.com"
            className="inline-flex items-center gap-2 mt-8 bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            Iniciar um projeto →
          </motion.a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Contact grid */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Email</p>
            <a
              href="mailto:geral@key4up.com"
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              geral@key4up.com
            </a>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Call</p>
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors font-medium inline-flex items-center gap-1"
            >
              Agendar agora 📅
            </a>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Redes Sociais</p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom row */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <span className="text-black font-black text-xs">K4</span>
            </div>
            <span className="text-white font-semibold text-sm">Key4up</span>
          </div>

          {/* Nav */}
          <div className="flex gap-4 flex-wrap">
            {["Trabalho", "Serviços", "Preços", "Contacto"].map((l) => (
              <Link
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex gap-4 flex-wrap md:justify-end">
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Termos de Serviço
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacidade
            </Link>
          </div>
        </div>

        <div className="pb-6 text-center">
          <p className="text-gray-600 text-xs">© 2026 Key4up. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
