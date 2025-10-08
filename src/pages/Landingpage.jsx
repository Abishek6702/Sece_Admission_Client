// Landingpage.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";

import FeatureSection from "../components/landing/FeatureSection";
// import ContactSection from "../components/landing/ContactSection";
import FooterSection from "../components/landing/FooterSection";

const Landingpage = () => {
  const scrollRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current.scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div ref={scrollRef} className="custom-scroll h-screen overflow-y-scroll">
        <Navbar scrolled={scrolled} />
        <section id="home">
          <HeroSection />
        </section>
        <section id="aboutus">
          <AboutSection />
        </section>
        <section id="features">
          <FeatureSection />
        </section>
        <FooterSection />
      </div>
    </>
  );
};

export default Landingpage;
