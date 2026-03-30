import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroScrollCTA from "@/components/HeroScrollCTA";
import SocialProof from "@/components/SocialProof";
import Projects from "@/components/Projects";
import ProjectsAiAgents from "@/components/ProjectsAiAgents";
import DesignShowcase from "@/components/DesignShowcase";
import ProjectTransitionStrip from "@/components/ProjectTransitionStrip";
import FeaturedTestimonial from "@/components/FeaturedTestimonial";
import Services from "@/components/Services";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative z-[1] min-h-[100dvh] overflow-x-hidden bg-transparent">
        <Navbar />
        <HeroScrollCTA />
        <Hero />
        <SocialProof />
        <Projects />
        <ProjectsAiAgents />
        <DesignShowcase />
        {/* <ProjectTransitionStrip /> */}
        <FeaturedTestimonial />
        <Services />
        <About />
        {/* <Pricing /> */}
        <Testimonials />
        <FAQ />
        {/* <Blog /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
