import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find(p => p.id === params.slug);
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: `${project.title} | Fernando Rodriguez`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-8 border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Detalles del Proyecto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Información General</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Categoría:</strong> {project.category}</div>
                <div><strong>Estado:</strong> {project.status}</div>
                <div><strong>Año:</strong> {project.year}</div>
                {project.metrics && (
                  <div><strong>Métricas:</strong> {project.metrics}</div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {(project.demoUrl || project.githubUrl) && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <div className="flex gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    Ver Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-border rounded hover:bg-accent transition-colors"
                  >
                    Ver Código
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}