"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ArrowDown, Github, Linkedin, Twitter, Mail, Terminal, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TypewriterEffect } from '@/components/effects/TextEffects';
import { useI18n } from '@/hooks/useI18n';
import { SOCIAL_LINKS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function Hero() {
  const { t } = useI18n('hero');

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  };

  // Terminal-style intro animation
  const terminalLines = [
    "$ whoami",
    "fernando@mx:~$ Ingeniero de Software Full-Stack",
    "$ cat experience.txt", 
    "5+ años transformando ideas en código",
    "$ ls skills/",
    "React  Node.js  AWS  TypeScript  Docker",
    "$ location",
    "Cuernavaca, México 🇲🇽 • Estándares globales"
  ];


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mexican-pattern">
      {/* Subtle background gradient - single accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-terra opacity-10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Simplified, Bold */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Location Badge */}
            <motion.div variants={staggerItem}>
              <Badge variant="terra" className="mb-6 gap-2">
                <MapPin className="h-3 w-3" />
                Cuernavaca, México 🇲🇽
              </Badge>
            </motion.div>

            {/* Main Headline - Powerful & Simple */}
            <motion.div variants={staggerItem}>
              <h1 className="text-display-xl font-display gradient-text mb-6">
                <TypewriterEffect 
                  text="Fernando Rodriguez"
                  delay={300}
                  speed={80}
                />
              </h1>
              <h2 className="text-display-sm text-foreground mb-6">
                Ingeniero de Software Full-Stack
              </h2>
            </motion.div>

            {/* Value Proposition - Clear & Direct */}
            <motion.div variants={staggerItem}>
              <p className="text-body-xl text-muted-foreground leading-relaxed mb-6">
                <span className="text-primary font-semibold">Mexicano</span> que transforma ideas complejas en 
                <span className="text-accent font-semibold"> soluciones escalables</span> con 
                <span className="text-primary font-semibold"> estándares globales</span>.
              </p>
              <p className="text-body-lg text-muted-foreground">
                5+ años liderando equipos, optimizando arquitecturas y entregando productos que impactan millones de usuarios.
              </p>
            </motion.div>

            {/* Core Tech Stack - Simplified */}
            <motion.div variants={staggerItem}>
              <div className="flex flex-wrap gap-2 mb-8">
                {['React', 'Node.js', 'AWS', 'TypeScript', 'Docker'].map((tech) => (
                  <Badge key={tech} variant="tech" size="lg">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons - Focused */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={staggerItem}
            >
              <Button 
                variant="gradient" 
                size="lg" 
                asChild
                className="group"
              >
                <Link href="/projects" className="flex items-center">
                  Ver mis proyectos
                  <motion.span
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group"
              >
                <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                Descargar CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              variants={staggerItem}
            >
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${key} profile`}
                        className="flex items-center justify-center"
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Terminal-style Intro */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="card-mexican p-6 bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">fernando@mx:~</span>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={`${
                      line.startsWith('$') 
                        ? 'text-primary font-semibold' 
                        : line.includes('fernando@mx')
                        ? 'text-accent'
                        : 'text-muted-foreground'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1 + (index * 0.3)
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
                
                {/* Blinking cursor */}
                <motion.span
                  className="inline-block w-2 h-4 bg-primary ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    delay: 1 + (terminalLines.length * 0.3)
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-muted-foreground">Descubre más</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-5 w-5 text-primary" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}