"use client";

import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ScrambleEffect } from '@/components/effects/TextEffects';
import { Filter } from 'lucide-react';

export function TechStack() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Filter className="h-4 w-4 mr-2" />
              Stack Tecnológico
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tecnologías y Herramientas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mi stack tecnológico para crear soluciones robustas y escalables
            </p>
          </div>
        </ScrollReveal>

        {/* Simple Skills Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB'].map((tech, index) => (
            <div key={tech} className="p-4 bg-card rounded-lg border text-center group hover:bg-accent transition-colors">
              <h4 className="font-semibold">
                <ScrambleEffect 
                  text={tech}
                  delay={index * 200}
                  speed={50}
                />
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}