"use client";

import { motion } from 'framer-motion';
import { Search, Palette, Code2, Zap, ArrowRight } from 'lucide-react';
import { ProcessStepCard } from '@/components/animations/AnimatedCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { AnalysisAnimation, DesignAnimation, DevelopmentAnimation, OptimizationAnimation } from '@/components/animations/LottieContainer';
import { useI18n } from '@/hooks/useI18n';
import { processSteps } from '@/data/skills';

export function WorkProcess() {
  const { t } = useI18n('skills');

  const stepAnimations = {
    analysis: AnalysisAnimation,
    design: DesignAnimation,
    development: DevelopmentAnimation,
    optimization: OptimizationAnimation
  };

  const stepIcons = {
    analysis: Search,
    design: Palette,
    development: Code2,
    optimization: Zap
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-4 w-4 mr-2" />
              Mi Proceso
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('process.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Process Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 z-0" />
          
          {processSteps.map((step, index) => {
            const Animation = stepAnimations[step.icon as keyof typeof stepAnimations];
            const Icon = stepIcons[step.icon as keyof typeof stepIcons];
            
            return (
              <StaggerItem key={step.title}>
                <ProcessStepCard
                  step={step.order}
                  delay={index * 0.2}
                  className="relative z-10 h-full"
                >
                  {/* Animation */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 relative">
                      <Animation
                        width={96}
                        height={96}
                        className="absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow to next step */}
                  {index < processSteps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </motion.div>
                  )}
                </ProcessStepCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Process Benefits */}
        <ScrollReveal delay={0.8} className="mt-20">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 border">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">
                ¿Por qué seguir este proceso?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-4xl">🎯</div>
                  <h4 className="font-semibold">Resultados precisos</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada paso está diseñado para maximizar la calidad del resultado final
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">⚡</div>
                  <h4 className="font-semibold">Entrega eficiente</h4>
                  <p className="text-sm text-muted-foreground">
                    Metodología probada que reduce tiempos sin comprometer calidad
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">🚀</div>
                  <h4 className="font-semibold">Escalabilidad</h4>
                  <p className="text-sm text-muted-foreground">
                    Soluciones pensadas para crecer y adaptarse a futuras necesidades
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}