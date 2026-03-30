import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
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
    <html lang="pt" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
