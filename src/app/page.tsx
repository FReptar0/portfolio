import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Contact } from "@/components/sections/Contact";
import { LazySection } from "@/components/optimized/LazySection";
import { CulturalSection } from "@/components/cultural/MexicanPatterns";

export default function Home() {
  return (
    <>
      {/* Hero - Critical above-the-fold content */}
      <Hero />
      
      {/* About - Personal story with cultural context */}
      <LazySection>
        <CulturalSection pattern="subtle">
          <section id="about">
            <About />
          </section>
        </CulturalSection>
      </LazySection>
      
      {/* Skills - Business-focused technical competencies */}
      <LazySection>
        <Skills />
      </LazySection>
      
      {/* Projects - Case studies with business impact */}
      <LazySection>
        <Projects />
      </LazySection>
      
      {/* Experience Timeline - Professional journey */}
      <LazySection>
        <ExperienceTimeline />
      </LazySection>
      
      {/* Contact - Call to action */}
      <LazySection>
        <CulturalSection pattern="subtle">
          <Contact />
        </CulturalSection>
      </LazySection>
    </>
  );
}
