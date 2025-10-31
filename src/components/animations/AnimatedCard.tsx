"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { cardHover, fadeInUp, scaleIn } from '@/lib/animations';

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'scale' | 'fade';
  delay?: number;
  className?: string;
  hoverScale?: number;
  clickScale?: number;
  disableHover?: boolean;
}

export function AnimatedCard({
  children,
  variant = 'hover',
  delay = 0,
  className,
  hoverScale = 1.02,
  clickScale = 0.98,
  disableHover = false,
  ...props
}: AnimatedCardProps) {
  const getVariants = () => {
    switch (variant) {
      case 'scale':
        return scaleIn;
      case 'fade':
        return fadeInUp;
      case 'hover':
      case 'default':
      default:
        return cardHover;
    }
  };

  const getInitialState = () => {
    switch (variant) {
      case 'scale':
        return "hidden";
      case 'fade':
        return "hidden";
      case 'hover':
      case 'default':
      default:
        return "rest";
    }
  };

  const getAnimateState = () => {
    switch (variant) {
      case 'scale':
        return "visible";
      case 'fade':
        return "visible";
      case 'hover':
      case 'default':
      default:
        return "rest";
    }
  };

  const getHoverState = () => {
    if (disableHover || variant === 'scale' || variant === 'fade') {
      return undefined;
    }
    return "hover";
  };

  const getTapState = () => {
    if (disableHover || variant === 'scale' || variant === 'fade') {
      return undefined;
    }
    return "press";
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg transition-colors",
        className
      )}
      variants={getVariants()}
      initial={getInitialState()}
      animate={getAnimateState()}
      whileHover={getHoverState()}
      whileTap={getTapState()}
      transition={{
        duration: 0.3,
        delay,
        ease: "easeOut"
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Specialized animated card variants
export function ProjectCard({
  children,
  className,
  featured = false,
  ...props
}: AnimatedCardProps & { featured?: boolean }) {
  return (
    <AnimatedCard
      variant="hover"
      className={cn(
        "group relative overflow-hidden border bg-card text-card-foreground shadow-lg cursor-pointer",
        featured && "ring-2 ring-primary/20",
        className
      )}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </AnimatedCard>
  );
}

export function SkillCard({
  children,
  className,
  proficiency = 0,
  ...props
}: AnimatedCardProps & { proficiency?: number }) {
  return (
    <AnimatedCard
      variant="hover"
      className={cn(
        "relative p-6 border bg-card text-card-foreground shadow-sm cursor-pointer overflow-hidden",
        proficiency > 90 && "ring-2 ring-yellow-400/30",
        className
      )}
      whileHover={{
        y: -4,
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      {proficiency > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/70"
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      )}
    </AnimatedCard>
  );
}

export function ExperienceCard({
  children,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <AnimatedCard
      variant="fade"
      className={cn(
        "relative p-6 ml-6 border-l-4 border-primary bg-card text-card-foreground shadow-sm",
        "before:absolute before:-left-3 before:top-8 before:w-6 before:h-6 before:bg-primary before:rounded-full before:border-4 before:border-background",
        className
      )}
      whileHover={{
        x: 4,
        borderColor: "hsl(var(--primary))",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
      {...props}
    >
      {children}
    </AnimatedCard>
  );
}

export function ProcessStepCard({
  children,
  className,
  step = 1,
  isActive = false,
  ...props
}: AnimatedCardProps & { step?: number; isActive?: boolean }) {
  return (
    <AnimatedCard
      variant="scale"
      className={cn(
        "relative p-8 text-center border bg-card text-card-foreground shadow-lg",
        isActive && "ring-2 ring-primary shadow-primary/20",
        className
      )}
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      {...props}
    >
      <motion.div
        className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {step}
      </motion.div>
      {children}
    </AnimatedCard>
  );
}

export function GlassCard({
  children,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <AnimatedCard
      variant="hover"
      className={cn(
        "glass backdrop-blur-md border border-white/20 text-white",
        className
      )}
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.15)"
      }}
      {...props}
    >
      {children}
    </AnimatedCard>
  );
}