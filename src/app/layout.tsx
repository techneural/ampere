import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const avenirLtStd = localFont({
  src: [
    {
      path: "../../public/fonts/avenirLtStd/AvenirLTStd-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenirLtStd/AvenirLTStd-Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenirLtStd/AvenirLTStd-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/avenirLtStd/AvenirLTStd-Heavy.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avenirLtStd",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ampere Labs",
  description: "Rapid Prototyping & Deployable Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${avenirLtStd.variable} antialiased flex flex-col min-h-dvh`}
      >
        <Header />
        <main className="flex-1 bg-[url('@/assets/images/bg-fixed.png')] bg-fixed bg-no-repeat bg-cover bg-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
