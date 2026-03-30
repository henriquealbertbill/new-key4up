"use client";

import { motion } from "framer-motion";

export default function FeaturedTestimonial() {
  return (
    <section className="relative w-full border-y border-figma-border bg-background py-16 md:py-20">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[992px] rounded-3xl border border-card-border bg-card px-6 py-10 shadow-[0px_10px_40px_-20px_rgba(0,0,0,0.12)] md:px-10 md:py-12 dark:shadow-[0px_12px_48px_-16px_rgba(0,0,0,0.45)]"
        >
          <blockquote className="mx-auto max-w-[780px] text-center">
            <p className="text-[clamp(1.25rem,2.8vw,1.75rem)] font-medium leading-[1.35] tracking-[-0.02em] text-foreground">
              &ldquo;Trabalhar com a Key4up foi como ter um parceiro técnico que percebeu a nossa visão e
              trouxe-a à vida de formas que nem imaginávamos.&rdquo;
            </p>
          </blockquote>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="size-[38px] overflow-hidden rounded-full bg-gradient-to-br from-gray-600 to-gray-900 ring-2 ring-background" />
            <div className="text-center">
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">Maria Santos</p>
              <p className="mt-1 text-[13px] font-medium tracking-[-0.01em] text-figma-muted">
                CEO, TechStartup Lisboa
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
