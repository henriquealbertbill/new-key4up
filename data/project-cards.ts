export type ProjectCardData = Readonly<{
  title: string
  category: string
  /** Caminho sob `public/` (ex.: `/images/projetcs/key4play/home.png`). */
  imageSrc: string
  /** Legenda curta para leitores de ecrã. */
  imageAlt: string
}>

export const projectCards: readonly ProjectCardData[] = [
  {
    title: "Key4Play",
    category: "E-commerce / Marketplace",
    imageSrc: "/images/projetcs/key4play/home.png",
    imageAlt: "Página inicial do projeto Key4Play",
  },
  {
    title: "Moduza",
    category: "Produto digital",
    imageSrc: "/images/projetcs/moduza/home.png",
    imageAlt: "Página inicial do projeto Moduza",
  },
  {
    title: "Nuchat",
    category: "SaaS / Comunicação",
    imageSrc: "/images/projetcs/nuchat/home.png",
    imageAlt: "Página inicial do projeto Nuchat",
  },
  {
    title: "Fergus Açaí",
    category: "Marca / Food service",
    imageSrc: "/images/projetcs/fergus/home.png",
    imageAlt: "Website Fergus Açaí — página inicial",
  },
]
