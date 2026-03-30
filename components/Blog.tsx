"use client";

import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";

const posts = [
  {
    title: "Como escolher a stack certa para o teu projeto em 2025",
    excerpt:
      "Uma análise honesta das tecnologias disponíveis e como decidir qual a melhor para o teu caso específico, sem hype.",
    date: "15 Mar 2026",
    author: "Bruno Silva",
    category: "Tecnologia",
    color: "from-blue-600 to-indigo-700",
    large: true,
  },
  {
    title: "Por que 90% dos sites falham na conversão",
    date: "8 Mar 2026",
    author: "Bruno Silva",
    category: "Growth",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Next.js 14 vs Remix: qual escolher em 2025",
    date: "1 Mar 2026",
    author: "Bruno Silva",
    category: "Dev",
    color: "from-gray-700 to-gray-900",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle ghostLines={["Do meu blog,", "insights que"]} solidLine="importam." />
        <a
          href="#"
          className="mb-2 shrink-0 text-[14px] font-medium tracking-[-0.02em] text-[#545454] underline-offset-4 transition-colors hover:text-black hover:underline"
        >
          Ver todos ↗
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {/* Large card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group overflow-hidden rounded-2xl border border-[#f0f0f0] bg-white shadow-sm"
        >
          <div
            className={`h-48 md:h-64 bg-gradient-to-br ${posts[0].color} transition-transform duration-500 group-hover:scale-[1.02] relative overflow-hidden`}
          >
            <div className="absolute top-4 left-4">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {posts[0].category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-gray-600 transition-colors">
              {posts[0].title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{posts[0].excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{posts[0].date}</span>
              <span>·</span>
              <span>{posts[0].author}</span>
            </div>
          </div>
        </motion.article>

        {/* 2 small cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(1).map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-2xl border border-[#f0f0f0] bg-white shadow-sm"
            >
              <div
                className={`h-36 bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-[1.03] relative overflow-hidden`}
              >
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-base mb-3 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
