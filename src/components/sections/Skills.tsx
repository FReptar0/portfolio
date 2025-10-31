"use client";

import { motion } from 'framer-motion';
import { Badge, TechBadge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { skillCategories } from '@/data/skills';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function Skills() {
  // Business impact metrics for each category
  const businessImpact = {
    'Frontend': {
      metric: '99.9%',
      description: 'Uptime en aplicaciones React',
      icon: '🎨'
    },
    'Backend': {
      metric: '10M+',
      description: 'Requests procesados/día',
      icon: '⚡'
    },
    'DevOps': {
      metric: '85%',
      description: 'Reducción en deployment time',
      icon: '🚀'
    },
    'Arquitectura': {
      metric: '40%',
      description: 'Mejora en performance',
      icon: '🏗️'
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="terra" className="mb-4">
            Competencias Técnicas
          </Badge>
          <h2 className="text-display-md font-display gradient-text mb-6">
            Stack Tecnológico con Impacto de Negocio
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Más de 5 años transformando tecnologías en soluciones que escalan, con expertise probado 
            en arquitecturas que manejan millones de usuarios y equipos de alto rendimiento.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              variants={staggerItem}
            >
              <Card className="card-mexican h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl font-display text-foreground flex items-center gap-3">
                      <span className="text-2xl">
                        {businessImpact[category.name as keyof typeof businessImpact]?.icon}
                      </span>
                      {category.name}
                    </CardTitle>
                    <Badge variant="amber" size="sm">
                      {category.skills.length} skills
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground mb-4">
                    {category.description}
                  </CardDescription>
                  
                  {/* Business Impact */}
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary">
                      {businessImpact[category.name as keyof typeof businessImpact]?.metric}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {businessImpact[category.name as keyof typeof businessImpact]?.description}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <TechBadge proficiency={skill.proficiency}>
                              {skill.name}
                            </TechBadge>
                            <span className="text-xs text-muted-foreground">
                              {skill.years} años
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {skill.proficiency}%
                          </span>
                        </div>
                        
                        {/* Proficiency Bar */}
                        <motion.div
                          className="w-full bg-muted rounded-full h-2 overflow-hidden"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3
                          }}
                        >
                          <motion.div
                            className="h-full bg-gradient-terra"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ 
                              duration: 1, 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                              ease: "easeOut"
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Journey Timeline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-display-sm font-display text-foreground mb-4">
              Trayectoria de Aprendizaje Continuo
            </h3>
            <p className="text-body-lg text-muted-foreground">
              Evolución constante adaptándose a las necesidades del mercado global tech
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-terra opacity-30" />

            <div className="space-y-8">
              {[
                {
                  year: '2019-2020',
                  title: 'Fundamentos Sólidos',
                  skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
                  description: 'Establecimiento de bases técnicas y primeros proyectos profesionales'
                },
                {
                  year: '2021-2022', 
                  title: 'Escalamiento y Arquitectura',
                  skills: ['TypeScript', 'AWS', 'Docker', 'Microservicios'],
                  description: 'Enfoque en sistemas distribuidos y arquitecturas escalables'
                },
                {
                  year: '2023-2024',
                  title: 'Liderazgo Técnico',
                  skills: ['Kubernetes', 'System Design', 'Team Leadership', 'Performance'],
                  description: 'Dirección de equipos y optimización de sistemas de alto volumen'
                },
                {
                  year: '2025',
                  title: 'Innovación y AI',
                  skills: ['AI Integration', 'Edge Computing', 'Advanced Patterns', 'Mentoring'],
                  description: 'Explorando fronteras tecnológicas y mentoría de nuevos talentos'
                }
              ].map((period, index) => (
                <motion.div
                  key={period.year}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="card-mexican p-6 border border-primary/20">
                      <div className="mb-3">
                        <Badge variant="turquoise" className="mb-2">
                          {period.year}
                        </Badge>
                        <h4 className="text-lg font-display text-foreground">
                          {period.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {period.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {period.skills.map((skill) => (
                          <Badge key={skill} variant="tech" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}