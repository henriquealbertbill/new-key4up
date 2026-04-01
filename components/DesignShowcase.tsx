"use client";

import InstagramFanCards from "@/components/InstagramFanCards";
import SectionTitle from "@/components/ui/SectionTitle";

type DesignShowcaseProps = {
  readonly className?: string;
};

export default function DesignShowcase({
  className = "",
}: DesignShowcaseProps) {
  return (
    <section
      id="design"
      className={[
        "relative w-full border-y border-figma-border bg-background py-16 md:py-24",
        className,
      ].join(" ")}
      aria-labelledby="design-section-title"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-11">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="flex flex-col gap-5 lg:max-w-xl">
            <div id="design-section-title">
              <SectionTitle
                ghostLines={["No teu estilo de"]}
                solidLine="Design"
                align="left"
              />
            </div>
            <p className="text-[15px] font-medium leading-relaxed tracking-[-0.02em] text-figma-muted">
              Criamos designs que se destacam e convertem. Desde lojas online
              até apps de comunicação, cada detalhe é pensado para o sucesso.
            </p>
          </div>

          <div className="flex justify-center overflow-visible lg:justify-end">
            <div className="relative isolate flex w-full max-w-[min(100%,420px)] flex-col items-center lg:max-w-none lg:items-end">
              <InstagramFanCards className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
