import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import CursorFollower from "@/components/CursorFollower";
import ThemeInitScript from "@/components/theme-init-script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Key4up — Software que entrega resultados",
  description:
    "Desenvolvimento focado em crescimento, não apenas em código. Crio tudo o que o teu negócio precisa para atrair clientes e converter.",
  keywords: ["software house", "desenvolvimento web", "next.js", "aplicações mobile", "Key4up"],
  openGraph: {
    title: "Key4up — Software que entrega resultados",
    description: "Desenvolvimento focado em crescimento, não apenas em código.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${nunito.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeInitScript />
        <span className="page-frame-rail page-frame-rail--left" aria-hidden />
        <span className="page-frame-rail page-frame-rail--right" aria-hidden />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
