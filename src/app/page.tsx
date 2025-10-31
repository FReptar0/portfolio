import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
// import { WorkProcess } from "@/components/sections/WorkProcess";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <FeaturedProjects />
      <ExperienceTimeline />
      {/* <WorkProcess /> */}
      <Contact />
    </>
  );
}
