"use client";

import Hero from '@/components/Hero';
import CoreTeam from '@/components/CoreTeam';
import TalentPipeline from '@/components/TalentPipeline';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#020617] text-white">
        <Hero />
        <div id="core">
          <CoreTeam />
        </div>
        <div id="pipeline">
          <TalentPipeline />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
