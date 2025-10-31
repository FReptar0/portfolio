"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Github, Star, Calendar, ArrowUpRight, Users, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { projects } from '@/data/projects';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useI18n } from '@/hooks/useI18n';

export function Projects() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'fullstack' | 'devops'>('all');
  const { t } = useI18n('projects');

  const categories = [
    { id: 'all', label: t('filter.all'), count: projects.length },
    { id: 'fullstack', label: t('filter.fullstack'), count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'devops', label: t('filter.devops'), count: projects.filter(p => p.category === 'devops').length },
    { id: 'backend', label: t('filter.backend'), count: projects.filter(p => p.category === 'backend').length },
    { id: 'frontend', label: t('filter.frontend'), count: projects.filter(p => p.category === 'frontend').length },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(p => p.featured);

  // Case study format helper
  const getCaseStudyInfo = (project: any) => {
    const caseStudies = {
      'ecommerce-platform': {
        problem: t('case_studies.ecommerce.problem'),
        solution: t('case_studies.ecommerce.solution'),
        impact: t('case_studies.ecommerce.impact')
      },
      'monitoring-system': {
        problem: t('case_studies.monitoring.problem'),
        solution: t('case_studies.monitoring.solution'),
        impact: t('case_studies.monitoring.impact')
      },
      'api-gateway': {
        problem: t('case_studies.api_gateway.problem'),
        solution: t('case_studies.api_gateway.solution'),
        impact: t('case_studies.api_gateway.impact')
      },
      'analytics-dashboard': {
        problem: t('case_studies.analytics.problem'),
        solution: t('case_studies.analytics.solution'),
        impact: t('case_studies.analytics.impact')
      }
    };
    return caseStudies[project.id as keyof typeof caseStudies] || {
      problem: t('case_studies.default.problem'),
      solution: t('case_studies.default.solution'),
      impact: t('case_studies.default.impact')
    };
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="terra" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-display-sm sm:text-display-md font-display gradient-text mb-4 sm:mb-6">
            {t('title')}
          </h2>
          <p className="text-body-base sm:text-body-lg text-muted-foreground max-w-3xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "terra" : "outline"}
              size="sm"
              onClick={() => setFilter(category.id as any)}
              className="gap-2"
            >
              {category.label}
              <Badge variant="secondary" size="sm" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Featured Projects - Bento Grid */}
        <motion.div
          className="mb-12 sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-lg sm:text-display-sm font-display text-foreground mb-6 sm:mb-8 text-center">
            {t('featured.title')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProjects.slice(0, 6).map((project, index) => {
              const caseStudy = getCaseStudyInfo(project);
              // Bento layout: different sizes for visual interest on larger screens
              const getGridClasses = (index: number) => {
                switch (index) {
                  case 0: return 'sm:col-span-2 lg:col-span-2 lg:row-span-2'; // Large featured
                  case 1: return 'sm:col-span-1 lg:col-span-1 lg:row-span-1'; // Regular
                  case 2: return 'sm:col-span-1 lg:col-span-1 lg:row-span-1'; // Regular  
                  case 3: return 'sm:col-span-2 lg:col-span-2 lg:row-span-1'; // Wide
                  case 4: return 'sm:col-span-1 lg:col-span-1 lg:row-span-1'; // Regular
                  case 5: return 'sm:col-span-1 lg:col-span-1 lg:row-span-1'; // Regular
                  default: return 'sm:col-span-1 lg:col-span-1 lg:row-span-1';
                }
              };
              const isLarge = index === 0;
              const isWide = index === 3;
              
              return (
                <motion.div
                  key={project.id}
                  className={getGridClasses(index)}
                  variants={staggerItem}
                >
                  <Card className="card-mexican h-full overflow-hidden group hover:shadow-xl transition-all duration-500">
                    
                    {/* Project Image/Preview */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-primary/90 to-accent/80 ${
                      isLarge ? 'h-40 sm:h-48' : isWide ? 'h-32' : 'h-32 sm:h-28'
                    }`}>
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white drop-shadow-lg">
                          <div className={`${isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} mb-2`}>🚀</div>
                          <div className={`${isLarge ? 'text-sm' : 'text-xs'} font-semibold text-white`}>{project.title}</div>
                        </div>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={project.status === 'completed' ? 'success' : project.status === 'in-progress' ? 'warning' : 'info'}
                          size="sm"
                        >
                          {project.status === 'completed' ? t('status.completed') : 
                           project.status === 'in-progress' ? t('status.in_progress') : t('status.planned')}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className={`${isLarge ? 'p-4 sm:p-6' : 'p-3 sm:p-4'}`}>
                      {/* Project Header */}
                      <div className={`${isLarge ? 'mb-3 sm:mb-4' : 'mb-2 sm:mb-3'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-display font-semibold text-foreground ${
                            isLarge ? 'text-lg sm:text-xl' : isWide ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                          }`}>
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span className="text-xs">{project.year}</span>
                          </div>
                        </div>
                        
                        {/* Metrics */}
                        {project.metrics && (
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant="amber" size="sm" className="gap-1">
                              <Zap className="h-3 w-3" />
                              {project.metrics}
                            </Badge>
                            {project.githubStars && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-3 w-3" />
                                {project.githubStars}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Case Study - Problem/Solution/Impact - Only show on larger screens for large cards */}
                      {isLarge && (
                        <div className="hidden lg:block mb-4 space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">{t('case_study.problem')}</span>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">
                              {caseStudy.problem}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-accent" />
                              <span className="text-sm font-semibold text-foreground">{t('case_study.solution')}</span>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">
                              {caseStudy.solution}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <ArrowUpRight className="h-4 w-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">{t('case_study.impact')}</span>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">
                              {caseStudy.impact}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Compact case study for wide cards - Only show on larger screens */}
                      {isWide && !isLarge && (
                        <div className="hidden lg:block mb-3">
                          <p className="text-sm text-muted-foreground">
                            <span className="text-primary font-medium">{t('case_study.problem')}:</span> {caseStudy.problem.substring(0, 60)}...
                          </p>
                        </div>
                      )}

                      {/* Description */}
                      <p className={`text-muted-foreground ${isLarge ? 'mb-3 sm:mb-4 text-sm sm:text-base' : 'mb-2 sm:mb-3 text-xs sm:text-sm'}`}>
                        {isLarge ? project.description.substring(0, 120) + '...' : project.description.substring(0, 80) + '...'}
                      </p>

                      {/* Technologies */}
                      <div className={`${isLarge ? 'mb-4 sm:mb-6' : 'mb-3 sm:mb-4'}`}>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, isLarge ? 4 : 3).map((tech) => (
                            <Badge key={tech} variant="tech" size="sm" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > (isLarge ? 4 : 3) && (
                            <Badge variant="outline" size="sm" className="text-xs">
                              +{project.technologies.length - (isLarge ? 4 : 3)}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className={`flex gap-2 ${isLarge ? 'gap-3' : 'gap-2'}`}>
                        {project.demoUrl && (
                          <Button variant="terra" size="sm" asChild className={`flex-1 text-xs sm:text-sm px-2 py-1 h-7 sm:h-9 sm:px-3 sm:py-2`}>
                            <Link href={project.demoUrl} target="_blank" className="flex items-center gap-1 sm:gap-2">
                              <ExternalLink className="h-3 w-3" />
                              <span className="hidden sm:inline">{t('actions.demo')}</span>
                              <span className="sm:hidden">Demo</span>
                            </Link>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild className={`flex-1 text-xs sm:text-sm px-2 py-1 h-7 sm:h-9 sm:px-3 sm:py-2`}>
                            <Link href={project.githubUrl} target="_blank" className="flex items-center gap-1 sm:gap-2">
                              <Github className="h-3 w-3" />
                              <span className="hidden sm:inline">{t('actions.code')}</span>
                              <span className="sm:hidden">Code</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
            >
              <Card className="card-mexican h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                
                {/* Project Preview */}
                <div className="relative h-28 sm:h-32 bg-gradient-to-br from-primary/90 to-accent/80 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white drop-shadow-lg">
                      <div className="text-2xl sm:text-3xl mb-2">💡</div>
                      <div className="text-xs sm:text-sm font-medium text-white">{project.title}</div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-3 sm:p-6">
                  <div className="mb-2 sm:mb-3">
                    <h4 className="font-display font-semibold text-foreground mb-2 text-sm sm:text-base">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      {project.description.substring(0, 80) + '...'}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-3 sm:mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="tech" size="sm" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" size="sm" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <Button variant="terra" size="sm" asChild className="flex-1 text-xs sm:text-sm px-2 py-1 h-7 sm:h-9 sm:px-3 sm:py-2">
                        <Link href={project.demoUrl} target="_blank" className="flex items-center gap-1 sm:gap-2">
                          <ExternalLink className="h-3 w-3" />
                          <span className="hidden sm:inline">{t('actions.demo')}</span>
                          <span className="sm:hidden">Demo</span>
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild className="flex-1 text-xs sm:text-sm px-2 py-1 h-7 sm:h-9 sm:px-3 sm:py-2">
                        <Link href={project.githubUrl} target="_blank" className="flex items-center gap-1 sm:gap-2">
                          <Github className="h-3 w-3" />
                          <span className="hidden sm:inline">{t('actions.code')}</span>
                          <span className="sm:hidden">Code</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 sm:p-8 mx-4 sm:mx-0">
            <h3 className="text-lg sm:text-display-sm font-display text-foreground mb-3 sm:mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-sm sm:text-body-lg text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  {t('cta.start_project')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/experience">
                  {t('cta.view_experience')}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}