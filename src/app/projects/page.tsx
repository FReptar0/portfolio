import { Metadata } from 'next';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Proyectos | Fernando Rodriguez',
  description: 'Explora mi portafolio de proyectos de desarrollo de software, desde aplicaciones web hasta sistemas de microservicios.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <FeaturedProjects />
    </div>
  );
}