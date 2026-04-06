import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

// Implementing the modern Exo font
const exo = Exo({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-exo'
});

export const metadata: Metadata = {
  title: "ResumeMatch | JobEasy",
  description: "AI-Powered Matching for serious job seekers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${exo.className} bg-[#04070d] text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}