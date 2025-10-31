"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, ChevronDown, ChevronRight, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge, TechBadge } from '@/components/ui/badge';
import { ExperienceCard } from '@/components/animations/AnimatedCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { experiences } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ExperienceTimeline() {
  const { t } = useI18n('experience');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Building className="h-4 w-4 mr-2" />
              Experiencia Profesional
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

          <StaggerContainer className="space-y-8">
            {experiences.map((experience, index) => {
              const isExpanded = expandedItems.includes(experience.id);
              
              return (
                <StaggerItem key={experience.id}>
                  <ExperienceCard
                    delay={index * 0.1}
                    className="relative ml-12 md:ml-20"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute -left-14 md:-left-20 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />

                    {/* Experience Content */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {experience.role}
                          </h3>
                          <div className="flex items-center space-x-4 text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{experience.company}</span>
                            </div>
                            {experience.companyUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-auto p-0 text-primary hover:text-primary/80"
                              >
                                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end space-y-2">
                          <Badge variant="outline" className="whitespace-nowrap">
                            <Calendar className="h-3 w-3 mr-1" />
                            {experience.period}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {experience.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Achievements Preview */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-foreground">
                          Logros principales:
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.slice(0, isExpanded ? undefined : 2).map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              className="flex items-start space-x-2 text-sm text-muted-foreground"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: achievementIndex * 0.1 }}
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Expand/Collapse Button */}
                        {experience.achievements.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(experience.id)}
                            className="text-primary hover:text-primary/80 p-0 h-auto"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Ver menos
                              </>
                            ) : (
                              <>
                                <ChevronRight className="h-4 w-4 mr-1" />
                                Ver más logros ({experience.achievements.length - 2} más)
                              </>
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-foreground">
                          Tecnologías utilizadas:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <TechBadge key={tech} className="text-xs">
                              {tech}
                            </TechBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ExperienceCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Download CV CTA */}
        <ScrollReveal delay={0.8} className="text-center mt-16">
          <div className="bg-card rounded-xl p-8 border shadow-sm">
            <h3 className="text-xl font-bold mb-4">
              ¿Quieres conocer más detalles sobre mi experiencia?
            </h3>
            <p className="text-muted-foreground mb-6">
              Descarga mi CV completo con información detallada sobre proyectos, 
              certificaciones y referencias.
            </p>
            <Button variant="gradient" size="lg">
              <Calendar className="h-4 w-4 mr-2" />
              {t('download_cv')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}