import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";

// Lazy load below-the-fold components to reduce initial bundle size and improve TTI
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const JoinUs = dynamic(() => import("@/components/JoinUs"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <JoinUs />
      <Contact />
    </>
  );
}
