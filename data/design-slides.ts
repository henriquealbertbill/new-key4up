export type DesignSlideData = Readonly<{
  /** Caminho sob `public/` (ex.: `/images/projetcs/key4play/home.png`). */
  imageSrc: string
  imageAlt: string
  /** Legenda curta no mockup (bloco de texto do post). */
  caption: string
  /** Texto de gostos (ex.: "1.2 mil gostos"). */
  likesLabel: string
  /** Hashtags opcionais (sem #; o componente prefixa). */
  hashtags: readonly string[]
}>

export const designSlides: readonly DesignSlideData[] = [
  {
    imageSrc: "/images/projetcs/key4play/home.png",
    imageAlt: "Design Key4Play — página inicial",
    caption: "Marketplace com foco em conversão e clareza de marca.",
    likesLabel: "1.4 mil gostos",
    hashtags: ["key4play", "ecommerce", "ui"],
  },
  {
    imageSrc: "/images/projetcs/moduza/home.png",
    imageAlt: "Design Moduza — página inicial",
    caption: "Produto digital com hierarquia visual e ritmo consistente.",
    likesLabel: "982 gostos",
    hashtags: ["moduza", "product", "design"],
  },
  {
    imageSrc: "/images/projetcs/nuchat/home.png",
    imageAlt: "Design Nuchat — página inicial",
    caption: "SaaS de comunicação com onboarding claro.",
    likesLabel: "2.1 mil gostos",
    hashtags: ["nuchat", "saas", "ux"],
  },
  {
    imageSrc: "/images/projetcs/fergus/home.png",
    imageAlt: "Design Fergus Açaí — página inicial",
    caption: "Marca food service com identidade forte no digital.",
    likesLabel: "756 gostos",
    hashtags: ["fergus", "brand", "food"],
  },
]
