"use client";

import { motion } from 'framer-motion';
import { MapPin, Heart, Lightbulb, Users, Globe, Code, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function About() {
  const journeyMilestones = [
    {
      year: '2019',
      title: 'Primeros Pasos en Tech',
      location: 'Cuernavaca, México',
      description: 'Comenzé mi viaje autodidacta aprendiendo JavaScript y React. Mi primer proyecto fue una app para el negocio familiar.',
      icon: Code,
      achievement: 'Primera aplicación en producción',
      color: 'amber'
    },
    {
      year: '2020',
      title: 'Primer Trabajo Remoto',
      location: 'Remote • Startup Internacional',
      description: 'Me uní a una startup como desarrollador junior. Aprendí sobre trabajo en equipo global y metodologías ágiles.',
      icon: Globe,
      achievement: 'Colaboración con equipos de 5 países',
      color: 'turquoise'
    },
    {
      year: '2021',
      title: 'Liderazgo Técnico Emergente',
      location: 'Remote • Scale-up Europea',
      description: 'Lideré la migración de una arquitectura monolítica a microservicios, mejorando el performance en 40%.',
      icon: Users,
      achievement: 'Primer proyecto de arquitectura',
      color: 'coral'
    },
    {
      year: '2022',
      title: 'Senior Full-Stack Engineer',
      location: 'Remote • Empresa Fortune 500',
      description: 'Diseñé y desarrollé sistemas que manejan millones de transacciones. Mentoré a 3 desarrolladores junior.',
      icon: Lightbulb,
      achievement: 'Sistemas de alto volumen',
      color: 'terra'
    },
    {
      year: '2023-2024',
      title: 'Líder Técnico & Arquitecto',
      location: 'Remote • Multiple Projects',
      description: 'Actualmente liderando equipos distribuidos y diseñando arquitecturas cloud-native escalables.',
      icon: Award,
      achievement: 'Liderazgo de equipos globales',
      color: 'primary'
    }
  ];

  const personalValues = [
    {
      icon: Heart,
      title: 'Pasión por la Excelencia',
      description: 'Cada línea de código es una oportunidad de crear algo extraordinario que impacte positivamente.'
    },
    {
      icon: Users,
      title: 'Colaboración Global',
      description: 'He trabajado con equipos de 15+ países, valorando la diversidad como motor de innovación.'
    },
    {
      icon: Lightbulb,
      title: 'Aprendizaje Continuo',
      description: 'La tecnología evoluciona rápido. Me mantengo actualizado y adapto nuevas herramientas constantemente.'
    },
    {
      icon: Globe,
      title: 'Mentalidad Global',
      description: 'Orgulloso de mis raíces mexicanas, construyo soluciones con estándares internacionales.'
    }
  ];

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
          <Badge variant="terra" className="mb-4 gap-2">
            <MapPin className="h-3 w-3" />
            Mi Historia
          </Badge>
          <h2 className="text-display-md font-display gradient-text mb-6">
            De Cuernavaca al Mundo Tech Global
          </h2>
          <p className="text-body-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Soy un <span className="text-primary font-semibold">ingeniero de software mexicano</span> que 
            ha transformado la pasión por la tecnología en una carrera global. Mi viaje comenzó en 
            <span className="text-accent font-semibold"> Cuernavaca</span> y me ha llevado a colaborar 
            con equipos de todo el mundo, siempre llevando conmigo los valores de 
            <span className="text-primary font-semibold"> excelencia, humildad y determinación</span>.
          </p>
        </motion.div>

        {/* Personal Introduction */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Photo placeholder and personal info */}
          <div className="space-y-6">
            <Card className="card-mexican overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-primary/90 to-accent/80 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white drop-shadow-lg">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <div className="text-lg font-bold text-white">Fernando Rodriguez</div>
                    <div className="text-sm text-white/90 font-medium">Cuernavaca, México 🇲🇽</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Cuernavaca, Morelos, México</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-accent" />
                    <span className="text-foreground">Colaboración remota global</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span className="text-foreground">5+ años transformando ideas en código</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal story */}
          <div className="space-y-6">
            <h3 className="text-display-sm font-display text-foreground">
              ¿Por qué desarrollo software?
            </h3>
            <div className="space-y-4 text-body-lg text-muted-foreground leading-relaxed">
              <p>
                Mi historia en tecnología comenzó por curiosidad. Viendo cómo las aplicaciones 
                podían resolver problemas reales, decidí aprender a programar de forma autodidacta. 
                Lo que comenzó como un hobby se convirtió en una pasión que me llevó a trabajar 
                con empresas de todo el mundo.
              </p>
              <p>
                <span className="text-primary font-semibold">Desde México para el mundo</span>, 
                he tenido la oportunidad de liderar equipos distribuidos, diseñar arquitecturas 
                que escalan a millones de usuarios, y mentorar a otros desarrolladores en su 
                crecimiento profesional.
              </p>
              <p>
                Creo firmemente que la <span className="text-accent font-semibold">diversidad 
                cultural enriquece la innovación</span>. Mi perspectiva mexicana, combinada con 
                estándares globales, me permite crear soluciones únicas que trascienden fronteras.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-12">
            <h3 className="text-display-sm font-display text-foreground mb-4">
              Mi Viaje Profesional
            </h3>
            <p className="text-body-lg text-muted-foreground">
              Cada etapa ha sido un escalón hacia la excelencia técnica y liderazgo
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-terra opacity-30" />

            <div className="space-y-12">
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  variants={staggerItem}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="card-mexican p-6 border border-primary/20">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={milestone.color as any} className="gap-1">
                            <milestone.icon className="h-3 w-3" />
                            {milestone.year}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{milestone.location}</span>
                        </div>
                        <h4 className="text-lg font-display text-foreground mb-2">
                          {milestone.title}
                        </h4>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {milestone.description}
                      </p>
                      
                      <Badge variant="tech" size="sm" className="gap-1">
                        <Award className="h-3 w-3" />
                        {milestone.achievement}
                      </Badge>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10 flex items-center justify-center">
                    <milestone.icon className="h-3 w-3 text-primary-foreground" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Personal Values */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="md:col-span-2 lg:col-span-4 text-center mb-8">
            <h3 className="text-display-sm font-display text-foreground mb-4">
              Valores que me Guían
            </h3>
            <p className="text-body-lg text-muted-foreground">
              Principios que definen mi enfoque profesional y personal
            </p>
          </div>

          {personalValues.map((value, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
            >
              <Card className="card-mexican p-6 text-center h-full hover:shadow-lg transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground">
                    {value.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mexican Pride Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🇲🇽</div>
            <h3 className="text-display-sm font-display text-foreground mb-4">
              Orgullosamente Mexicano
            </h3>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Llevo conmigo la <span className="text-primary font-semibold">creatividad</span>, 
              <span className="text-accent font-semibold"> perseverancia</span> y 
              <span className="text-primary font-semibold"> calidez humana</span> de mi cultura mexicana. 
              Estos valores, combinados con estándares técnicos globales, me permiten aportar una 
              perspectiva única en cada proyecto que desarrollo.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Creatividad', 'Perseverancia', 'Colaboración', 'Innovación', 'Excelencia'].map((trait) => (
                <Badge key={trait} variant="terra" size="lg">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}