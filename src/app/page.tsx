"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import JoinUs from "@/components/JoinUs";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <JoinUs />
      <Contact />
      <Footer />
    </div>
  );
}
