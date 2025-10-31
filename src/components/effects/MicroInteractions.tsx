"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Star, TrendingUp, Users, Code } from 'lucide-react';

interface InteractiveCardProps {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<any>;
  color: 'primary' | 'accent' | 'amber' | 'turquoise';
  children?: React.ReactNode;
}

export function InteractiveCard({
  title,
  description,
  metric,
  metricLabel,
  icon: Icon,
  color,
  children
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth following
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });

  // Shine effect position
  const shineX = useSpring(useTransform(mouseX, [-200, 200], [0, 400]), {
    stiffness: 200,
    damping: 25
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/20',
    accent: 'from-accent/20 to-accent/5 border-accent/20',
    amber: 'from-amber/20 to-amber/5 border-amber/20',
    turquoise: 'from-turquoise/20 to-turquoise/5 border-turquoise/20'
  };

  const iconColors = {
    primary: 'text-primary',
    accent: 'text-accent',
    amber: 'text-amber',
    turquoise: 'text-turquoise'
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`card-mexican overflow-hidden relative bg-gradient-to-br ${colorClasses[color]} border-2 hover:shadow-xl transition-all duration-300`}>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            transform: useTransform(shineX, (x) => `translateX(${x - 200}px)`)
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${iconColors[color]} rounded-full opacity-60`}
                initial={{ 
                  x: Math.random() * 300, 
                  y: Math.random() * 200,
                  scale: 0 
                }}
                animate={{ 
                  y: -20,
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
        )}

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-3 rounded-lg bg-${color}/10`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className={`h-6 w-6 ${iconColors[color]}`} />
              </motion.div>
              <div>
                <h4 className="font-display font-semibold text-foreground">
                  {title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            
            <motion.div
              className={`${iconColors[color]} opacity-0`}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.div>
          </div>

          {/* Metric display */}
          <div className="mb-4">
            <motion.div
              className={`text-3xl font-bold ${iconColors[color]} mb-1`}
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none'
              }}
              transition={{ duration: 0.2 }}
            >
              {metric}
            </motion.div>
            <div className="text-sm text-muted-foreground">
              {metricLabel}
            </div>
          </div>

          {/* Progress bar animation */}
          <div className="mb-4">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-${color}`}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : '70%' }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
            </div>
          </div>

          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ 
  children, 
  className = "",
  onClick
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    
    // Magnetic effect within 100px radius
    if (distance < 100) {
      const strength = Math.max(0, (100 - distance) / 100);
      mouseX.set((e.clientX - centerX) * strength * 0.3);
      mouseY.set((e.clientY - centerY) * strength * 0.3);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={buttonRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ripple effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-full"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      <motion.div
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Floating Action Component
export function FloatingStats() {
  const stats = [
    {
      title: 'Proyectos Completados',
      description: 'Soluciones entregadas en producción',
      metric: '25+',
      metricLabel: 'proyectos escalables',
      icon: Code,
      color: 'primary' as const
    },
    {
      title: 'Usuarios Impactados',
      description: 'Alcance global de mis aplicaciones',
      metric: '2M+',
      metricLabel: 'usuarios activos',
      icon: Users,
      color: 'accent' as const
    },
    {
      title: 'Performance Boost',
      description: 'Mejora promedio en aplicaciones',
      metric: '40%',
      metricLabel: 'optimización promedio',
      icon: TrendingUp,
      color: 'amber' as const
    },
    {
      title: 'Client Satisfaction',
      description: 'Rating promedio de proyectos',
      metric: '4.9★',
      metricLabel: 'satisfacción cliente',
      icon: Star,
      color: 'turquoise' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          <InteractiveCard {...stat}>
            <div className="flex items-center gap-2">
              <Badge variant="tech" size="sm">
                Live Data
              </Badge>
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );
}

// Text Reveal Animation
export function TextReveal({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: string;
  className?: string;
  delay?: number;
}) {
  const letters = children.split('');

  return (
    <div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
}

// Cursor Follow Component
export function CursorFollow() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ x, y }}
    />
  );
}