import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Routes from "@/components/Routes"; // Replace Pricing with Routes
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Benefits />

        <Section
          id="routes" // Update the ID if needed
          title="Frequently Travelled Routes"
          description="Explore our most popular routes."
        >
          <Routes /> {/* Replace <Pricing /> with <Routes /> */}
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have travelled with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
        <Analytics />
      </Container>
    </>
  );
};

export default HomePage;
