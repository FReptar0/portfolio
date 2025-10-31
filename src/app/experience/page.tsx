import { Metadata } from 'next';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';

export const metadata: Metadata = {
  title: 'Experiencia | Fernando Rodriguez',
  description: 'Mi trayectoria profesional como desarrollador de software, desde mis inicios hasta mi rol actual como líder técnico.',
};

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      <ExperienceTimeline />
    </div>
  );
}