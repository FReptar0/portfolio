"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ArrowDown, Github, Linkedin, Twitter, Mail, Code, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodingAnimation } from '@/components/animations/LottieContainer';
import { FadeInSection } from '@/components/animations/ScrollReveal';
import { TypewriterEffect, DecryptEffect, BackspaceTypeEffect } from '@/components/effects/TextEffects';
import { SkillsNetwork } from '@/components/animations/SkillsNetwork';
import { useI18n } from '@/hooks/useI18n';
import { SOCIAL_LINKS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function Hero() {
  const { t } = useI18n('hero');

  const dynamicWords = [
    'Arquitecto de Soluciones',
    'Líder Técnico',
    'Full-Stack Developer',
    'DevOps Engineer'
  ];

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  };

  const stats = [
    { icon: Code, value: '5+', label: t('stats.years') },
    { icon: Zap, value: '20+', label: t('stats.projects') },
    { icon: Users, value: '3', label: t('stats.teams') }
  ];


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl floating-blob"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl floating-blob"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.div variants={staggerItem}>
              <motion.p 
                className="text-primary font-medium text-lg mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t('greeting')}
              </motion.p>
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <TypewriterEffect 
                  text="Fernando Rodriguez"
                  className="gradient-text"
                  delay={500}
                  speed={100}
                />
              </motion.h1>
            </motion.div>

            {/* Title */}
            <motion.div variants={staggerItem}>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                <DecryptEffect 
                  text="Ingeniero de Software Full-Stack"
                  delay={1000}
                />
              </h2>
              <div className="h-12 flex items-center">
                <BackspaceTypeEffect
                  texts={dynamicWords}
                  className="text-xl text-primary font-medium"
                  typeSpeed={120}
                  backspaceSpeed={80}
                  pauseTime={2000}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
              variants={staggerItem}
            >
              {t('description')}
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-6"
              variants={staggerItem}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
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
                  {t('cta_primary')}
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
                {t('cta_secondary')}
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

          {/* Right Content - Skills Network */}
          <FadeInSection direction="right" className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Skills Network Visualization */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <SkillsNetwork 
                  size={500} 
                  className="max-w-lg h-auto"
                />
              </motion.div>

              {/* Central coding animation (smaller) */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CodingAnimation
                  className="w-32 h-32 opacity-60"
                  height={128}
                  width={128}
                />
              </motion.div>
            </div>
          </FadeInSection>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-muted-foreground">{t('scroll_indicator')}</span>
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