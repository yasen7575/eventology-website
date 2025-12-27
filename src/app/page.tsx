"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import JoinUs from "@/components/JoinUs";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export type ThemeMode = "community" | "elite";

export default function Home() {
  const [mode, setMode] = useState<ThemeMode>("community");

  // Update body class for global theme variables
  useEffect(() => {
    document.body.className = `theme-${mode}`;
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "community" ? "elite" : "community"));
  };

  return (
    <div className={`min-h-screen transition-colors duration-700`}>
      <Navbar mode={mode} />
      <Hero mode={mode} toggleMode={toggleMode} />
      <About mode={mode} />
      <Services mode={mode} />
      <JoinUs key={mode} mode={mode} />
      <Contact mode={mode} />
      <Footer mode={mode} />
    </div>
  );
}
