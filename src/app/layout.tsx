import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bellas Glamour | Agencia de Modelos Premium",
  description: "Bellas Glamour - La agencia de modelos más exclusiva. Descubre talento excepcional para tus proyectos de moda, publicidad y eventos.",
  keywords: ["agencia de modelos", "modelos premium", "fashion", "moda", "Bellas Glamour", "modeling agency"],
  authors: [{ name: "Bellas Glamour" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Bellas Glamour | Agencia de Modelos Premium",
    description: "La agencia de modelos más exclusiva. Descubre talento excepcional.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellas Glamour | Agencia de Modelos Premium",
    description: "La agencia de modelos más exclusiva.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${lato.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
