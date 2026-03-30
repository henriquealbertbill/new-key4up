"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ClientLogoImage = {
  readonly variant: "image";
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly useLightModeBlackBackdrop?: boolean;
};

type ClientLogoMarkWord = {
  readonly variant: "markWord";
  readonly id: string;
  readonly markSrc: string;
  readonly markWidth: number;
  readonly markHeight: number;
  readonly wordmark: string;
  readonly alt: string;
};

type ClientLogoColabore = {
  readonly variant: "colabore";
  readonly id: string;
  readonly alt: string;
};

type ClientLogo = ClientLogoImage | ClientLogoMarkWord | ClientLogoColabore;

const happyClientAvatars: readonly { readonly src: string; readonly alt: string }[] = [
  { src: "/images/peoples/renant.png", alt: "Renan" },
  { src: "/images/peoples/gabriel.png", alt: "Gabriel" },
  { src: "/images/peoples/leo.png", alt: "Leo" },
  { src: "/images/peoples/natalia.png", alt: "Natália" },
  { src: "/images/peoples/daniel.png", alt: "Daniel" },
]

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    focusable="false"
    aria-hidden
    className="size-3 shrink-0 text-foreground sm:size-3.5"
  >
    <path
      fill="currentColor"
      d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"
    />
  </svg>
);

const clientLogos: readonly ClientLogo[] = [
  {
    variant: "image",
    id: "key4play",
    src: "/images/projetcs/logos/key4play.svg",
    alt: "Key4play",
    width: 170,
    height: 51,
    useLightModeBlackBackdrop: true,
  },
  {
    variant: "image",
    id: "nuchat",
    src: "/images/projetcs/logos/nuchat.svg",
    alt: "Nuchat",
    width: 618,
    height: 286,
  },
  {
    variant: "image",
    id: "fergus",
    src: "/images/projetcs/logos/fergus.png",
    alt: "Fergus",
    width: 1007,
    height: 568,
  },
  {
    variant: "markWord",
    id: "moduza",
    markSrc: "/images/projetcs/logos/moduza-logomark.svg",
    markWidth: 433,
    markHeight: 368,
    wordmark: "moduza",
    alt: "Moduza",
  },
  {
    variant: "colabore",
    id: "colabore",
    alt: "Co.Labore",
  },
];

const renderLogoBlock = (logo: ClientLogo) => {
  if (logo.variant === "colabore") {
    return (
      <span
        className="text-base font-bold leading-none tracking-tight text-foreground sm:text-lg"
        aria-label={logo.alt}
      >
        C<span className="text-colabore-o">o</span>.Labore
      </span>
    );
  }
  if (logo.variant === "markWord") {
    return (
      <span
        className="moduza-logo moduza-logo--light inline-flex max-w-full items-center gap-2"
        aria-label={logo.alt}
      >
        <Image
          src={logo.markSrc}
          alt=""
          aria-hidden
          width={logo.markWidth}
          height={logo.markHeight}
          className="h-7 max-h-8 w-auto min-w-0 shrink-0 object-contain object-left sm:h-8"
          unoptimized
        />
        <span className="font-[family-name:var(--font-nunito),ui-sans-serif,sans-serif] text-base font-bold leading-none tracking-tight text-primary sm:text-lg">
          {logo.wordmark}
        </span>
      </span>
    );
  }
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className="h-8 w-auto object-contain sm:h-9"
      unoptimized
    />
  );
};

export default function SocialProof() {
  return (
    <section className="relative w-full border-y border-figma-border bg-background py-8">
      <div className="mx-auto flex max-w-[1080px] flex-col items-stretch gap-8 px-4 sm:flex-row sm:items-center sm:gap-8 sm:px-8 lg:px-11">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="shrink-0"
        >
          <a
            href="#depoimentos"
            className="inline-flex max-w-full items-center gap-4 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Ver testemunhos de clientes"
          >
            <div className="flex items-center">
              {happyClientAvatars.map((avatar, i) => (
                <span
                  key={avatar.src}
                  className="-ml-2.5 size-9 shrink-0 overflow-hidden rounded-full border-2 border-background bg-background first:ml-0 sm:-ml-3 sm:size-10"
                  style={{ zIndex: happyClientAvatars.length - i }}
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    width={76}
                    height={76}
                    className="size-full object-cover object-center"
                    sizes="40px"
                  />
                </span>
              ))}
            </div>
            <div className="flex min-w-0 flex-col gap-1 pr-0.5">
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-[rgb(84,84,84)] dark:text-figma-muted">
                5/5 avaliações
              </p>
            </div>
          </a>
        </motion.div>

        <div className="relative isolate min-w-0 flex-1">
          <div className="relative z-0 overflow-hidden opacity-80">
            <div className="relative z-0 flex w-max items-center gap-16 sm:gap-20 marquee-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={`${logo.id}-${i}`}
                  className={
                    logo.variant === "image" && logo.useLightModeBlackBackdrop
                      ? "shrink-0 rounded-lg bg-black px-2.5 py-1 dark:bg-transparent"
                      : "shrink-0"
                  }
                >
                  {renderLogoBlock(logo)}
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-1 w-12 bg-linear-to-r from-background from-20% to-transparent sm:w-16"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-1 w-12 bg-linear-to-l from-background from-20% to-transparent sm:w-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
