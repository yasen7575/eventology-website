import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Eventology | Professional Event Management",
  description: "High-performance event management. From scalable staffing to expert core execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-[#0f172a] text-slate-50 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <main className="flex-grow">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
