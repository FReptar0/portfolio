"use client";

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight, 
  scaleIn,
  staggerContainer,
  staggerItem
} from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  as?: keyof typeof motion;
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  as = 'div'
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin: "0px 0px -10% 0px"
  });

  const getVariants = () => {
    switch (variant) {
      case 'fadeDown':
        return fadeInDown;
      case 'fadeLeft':
        return fadeInLeft;
      case 'fadeRight':
        return fadeInRight;
      case 'scale':
        return scaleIn;
      case 'stagger':
        return staggerContainer;
      case 'fadeUp':
      default:
        return fadeInUp;
    }
  };

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        staggerChildren: variant === 'stagger' ? staggerChildren : undefined,
        delayChildren: variant === 'stagger' ? delayChildren : undefined
      }}
    >
      {children}
    </MotionComponent>
  );
}

// Specialized scroll reveal components
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: Omit<ScrollRevealProps, 'variant'> & { staggerDelay?: number }) {
  return (
    <ScrollReveal
      variant="stagger"
      staggerChildren={staggerDelay}
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: Omit<ScrollRevealProps, 'variant'>) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInSection({
  children,
  direction = 'up',
  className,
  ...props
}: Omit<ScrollRevealProps, 'variant'> & { direction?: 'up' | 'down' | 'left' | 'right' }) {
  const variantMap = {
    up: 'fadeUp',
    down: 'fadeDown',
    left: 'fadeLeft',
    right: 'fadeRight'
  } as const;

  return (
    <ScrollReveal
      variant={variantMap[direction]}
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}

export function ScaleInSection({
  children,
  className,
  ...props
}: Omit<ScrollRevealProps, 'variant'>) {
  return (
    <ScrollReveal
      variant="scale"
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}

// Advanced scroll reveal with custom animations
interface ParallaxScrollProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  offset = 50,
  className
}: ParallaxScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: isInView ? 0 : offset
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animations
export function TextReveal({
  children,
  className,
  wordDelay = 0.1,
  ...props
}: Omit<ScrollRevealProps, 'variant'> & { wordDelay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  if (typeof children !== 'string') {
    return (
      <ScrollReveal className={className} {...props}>
        {children}
      </ScrollReveal>
    );
  }

  const words = children.split(' ');

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: index * wordDelay,
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Number counter animation
interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
  decimals = 0
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration,
          ease: "easeOut"
        }}
      >
        {isInView && `${prefix}${end.toFixed(decimals)}${suffix}`}
      </motion.span>
    </motion.span>
  );
}