import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Projects from "@/components/Projects";
import ProjectTransitionStrip from "@/components/ProjectTransitionStrip";
import FeaturedTestimonial from "@/components/FeaturedTestimonial";
import Services from "@/components/Services";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#fafafa] overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <Projects />
      <ProjectTransitionStrip />
      <FeaturedTestimonial />
      <Services />
      <About />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Blog />
      <Footer />
    </main>
  );
}
