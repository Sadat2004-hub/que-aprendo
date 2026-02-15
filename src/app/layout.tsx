import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "queaprendo | Marketplace Educativo en Oaxaca",
  description: "Encuentra los mejores cursos, talleres y escuelas en Oaxaca. Aprende de expertos locales en gastronomía, arte, tecnología y más.",
  keywords: "cursos oaxaca, talleres oaxaca, aprender hoy, educación oaxaca, escuelas oaxaca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
