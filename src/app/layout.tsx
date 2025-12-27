import type { Metadata } from "next";
import { Inter, Space_Mono, Cinzel } from "next/font/google";
import "./globals.css";
// Navbar and Footer removed from here to be controlled by page state
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Eventology | Choose Your Engine",
  description: "From rising talent to elite experts. The only event platform that lets you choose your execution level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceMono.variable} ${cinzel.variable} antialiased bg-[#0f172a] text-slate-50 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <main className="flex-grow">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
