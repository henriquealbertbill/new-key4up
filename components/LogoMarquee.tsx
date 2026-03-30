"use client";

const logos = [
  "Adobe",
  "Stripe",
  "Vercel",
  "Shopify",
  "Notion",
  "Linear",
  "Figma",
  "Netlify",
  "Supabase",
  "PlanetScale",
];

export default function LogoMarquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-figma-border bg-card">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Confiado por muitos
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex marquee-track gap-12">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="shrink-0 px-2 text-gray-300 font-bold text-lg tracking-wider uppercase select-none hover:text-gray-500 transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
