import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Estimator from "@/components/sections/Estimator";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";
import SpecialsBanner from "@/components/sections/SpecialsBanner";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <SpecialsBanner />
      <Services />
      <Estimator />
      <Gallery />
      <Reviews />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      {/* Netlify forms need a static HTML form present at build time */}
      <form
        name="quote"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value="quote" />
        <input name="bot-field" />
        <input name="name" />
        <input name="phone" />
        <input name="email" />
        <input name="address" />
        <input name="sqft" />
        <input name="service" />
        <input name="timing" />
        <textarea name="message" />
      </form>
    </>
  );
}
