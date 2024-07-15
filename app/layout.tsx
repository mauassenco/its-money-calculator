import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "It's Money - Calculadora",
  description: "Simulador Previdência privada x INSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${inter.className} bg-black antialiased h-auto`}>
        {children}
      </body>
    </html>
  );
}
