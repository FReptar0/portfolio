"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, TrendingUp, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge, TechBadge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/animations/AnimatedCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { TypewriterEffect } from '@/components/effects/TextEffects';
import { useI18n } from '@/hooks/useI18n';
import { projects } from '@/data/projects';
import { PROJECT_CATEGORIES } from '@/lib/constants';
import { cn, parseGitHubStars } from '@/lib/utils';

type ProjectFilter = 'all' | 'frontend' | 'backend' | 'fullstack' | 'devops';

export function FeaturedProjects() {
  const { t } = useI18n('projects');
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');

  const featuredProjects = projects.filter(project => project.featured);
  const filteredProjects = selectedFilter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === selectedFilter);

  const categoryColors = {
    frontend: 'from-blue-500 to-blue-600',
    backend: 'from-green-500 to-green-600',
    fullstack: 'from-purple-500 to-purple-600',
    devops: 'from-orange-500 to-orange-600'
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Star className="h-4 w-4 mr-2" />
              Proyectos Destacados
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <TypewriterEffect 
                text="Proyectos que Marcan la Diferencia"
                delay={300}
                speed={80}
                cursor={false}
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Project Filter */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className="transition-all duration-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              {t('filter.all')}
            </Button>
            {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
              <Button
                key={key}
                variant={selectedFilter === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(value as ProjectFilter)}
                className="transition-all duration-200"
              >
                {t(`filter.${value}`)}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <StaggerContainer 
          className="space-y-12"
          key={selectedFilter} // Force re-render when filter changes
          triggerOnce={false} // Allow re-triggering
        >
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron proyectos para el filtro seleccionado.</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
            <StaggerItem key={`${selectedFilter}-${project.id}`}>
              <ProjectCard
                featured={project.featured}
                delay={index * 0.1}
                className={cn(
                  "group relative overflow-hidden",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div className={cn(
                  "flex flex-col lg:flex-row min-h-[400px]",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}>
                  {/* Project Image */}
                  <div className="relative lg:w-1/2 overflow-hidden">
                    <div className="aspect-video lg:aspect-auto lg:h-full relative bg-gradient-to-br from-muted to-muted/50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-muted-foreground/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Floating tech badges */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            className="absolute"
                            style={{
                              top: `${20 + techIndex * 15}%`,
                              left: `${15 + techIndex * 20}%`,
                            }}
                            animate={{
                              y: [0, -10, 0],
                              rotate: [0, 5, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: techIndex * 0.5
                            }}
                          >
                            <TechBadge className="shadow-lg">
                              {tech}
                            </TechBadge>
                          </motion.div>
                        ))}
                      </div>

                      {/* Overlay gradient */}
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-60",
                        categoryColors[project.category]
                      )} />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center space-y-6">
                    {/* Category and Status */}
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="secondary"
                        className="capitalize"
                      >
                        {project.category}
                      </Badge>
                      <Badge 
                        variant={project.status === 'completed' ? 'success' : 'warning'}
                        className="capitalize"
                      >
                        {project.status === 'completed' ? 'Completado' : 'En progreso'}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-medium">{project.metrics}</span>
                        </div>
                        {project.githubStars && (
                          <div className="flex items-center space-x-2 text-yellow-600">
                            <Star className="h-4 w-4" />
                            <span className="font-medium">{project.githubStars} stars</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {project.demoUrl && (
                        <Button asChild className="group">
                          <Link href={project.demoUrl} target="_blank" className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            Ver Demo
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" asChild className="group">
                          <Link href={project.githubUrl} target="_blank" className="flex items-center">
                            <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                            Ver Código
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" asChild className="group">
                        <Link href={`/projects/${project.id}`} className="flex items-center">
                          Ver Detalles
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  initial={false}
                />
              </ProjectCard>
            </StaggerItem>
            ))
          )}
        </StaggerContainer>

        {/* View All Projects CTA */}
        <ScrollReveal delay={0.6} className="text-center mt-16">
          <div className="bg-muted/30 rounded-xl p-8 border">
            <h3 className="text-xl font-semibold mb-4">
              ¿Quieres ver más proyectos?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explora mi portafolio completo con más de 20 proyectos desarrollados
            </p>
            <Button variant="gradient" size="lg" asChild>
              <Link href="/projects" className="flex items-center">
                {t('view_all')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}