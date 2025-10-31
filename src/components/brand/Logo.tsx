"use client";

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function Logo({ className = "", size = 'md', animated = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
    }
  };

  const containerTransition = {
    duration: 0.6,
    ease: "easeOut" as const,
    staggerChildren: 0.1,
  };

  const pathVariants = {
    initial: {
      pathLength: 0,
      opacity: 0,
    },
    animate: {
      pathLength: 1,
      opacity: 1,
    }
  };

  const geometricVariants = {
    initial: {
      scale: 0,
      rotate: -180,
    },
    animate: {
      scale: 1,
      rotate: 0,
    }
  };

  const pathTransition = {
    duration: 1.2,
    ease: "easeInOut" as const
  };

  const pathTransitionDelayed = {
    duration: 1.2,
    ease: "easeInOut" as const,
    delay: 0.2
  };

  const geometricTransition = {
    duration: 0.8,
    ease: "easeOut" as const,
    delay: 0.3
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      variants={animated ? logoVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      transition={animated ? containerTransition : undefined}
      whileHover={animated ? { scale: 1.05 } : undefined}
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Modern hexagonal base with Mexican influence */}
        <motion.path
          d="M40 8 L60 23 L60 57 L40 72 L20 57 L20 23 Z"
          fill="url(#modernGradient)"
          stroke="url(#borderGradient)"
          strokeWidth="2"
          variants={animated ? geometricVariants : undefined}
        />
        
        {/* Inner geometric pattern - Aztec-inspired */}
        <motion.g
          variants={animated ? pathVariants : undefined}
          opacity="0.7"
        >
          {/* Central diamond */}
          <path
            d="M40 18 L52 30 L40 42 L28 30 Z"
            fill="var(--primary-foreground)"
            opacity="0.9"
          />
          
          {/* Stepped pyramid elements */}
          <path
            d="M40 22 L48 30 L40 38 L32 30 Z"
            fill="var(--background)"
            opacity="0.8"
          />
          
          <path
            d="M40 26 L44 30 L40 34 L36 30 Z"
            fill="var(--primary-foreground)"
            opacity="0.9"
          />
        </motion.g>
        
        {/* Modern FR monogram */}
        <motion.g
          variants={animated ? pathVariants : undefined}
          transition={animated ? pathTransition : undefined}
        >
          {/* Letter F - Clean, modern design */}
          <path
            d="M25 45 L25 65 M25 45 L37 45 M25 54 L34 54"
            stroke="var(--primary-foreground)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Letter R - Geometric, professional */}
          <path
            d="M43 45 L43 65 M43 45 L53 45 C56 45 58 47 58 50 C58 53 56 55 53 55 L43 55 M50 55 L58 65"
            stroke="var(--primary-foreground)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
        
        {/* Decorative Mexican geometric accents */}
        <motion.g
          variants={animated ? geometricVariants : undefined}
          transition={animated ? geometricTransition : undefined}
          opacity="0.8"
        >
          {/* Corner triangular patterns */}
          <path
            d="M15 15 L20 15 L17.5 20 Z"
            fill="var(--amber)"
          />
          <path
            d="M65 15 L60 15 L62.5 20 Z"
            fill="var(--turquoise)"
          />
          <path
            d="M15 65 L20 65 L17.5 60 Z"
            fill="var(--coral)"
          />
          <path
            d="M65 65 L60 65 L62.5 60 Z"
            fill="var(--accent)"
          />
          
          {/* Central connecting lines */}
          <path
            d="M40 12 L40 18"
            stroke="var(--primary-foreground)"
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="M40 42 L40 45"
            stroke="var(--primary-foreground)"
            strokeWidth="2"
            opacity="0.6"
          />
        </motion.g>
        
        {/* Subtle code-inspired dots */}
        <motion.g
          variants={animated ? {
            initial: { opacity: 0, scale: 0 },
            animate: { 
              opacity: 1, 
              scale: 1,
              transition: { delay: 1.2, duration: 0.5, staggerChildren: 0.1 }
            }
          } : undefined}
        >
          <circle cx="22" cy="25" r="1" fill="var(--amber)" opacity="0.6" />
          <circle cx="58" cy="25" r="1" fill="var(--turquoise)" opacity="0.6" />
          <circle cx="22" cy="55" r="1" fill="var(--coral)" opacity="0.6" />
          <circle cx="58" cy="55" r="1" fill="var(--accent)" opacity="0.6" />
        </motion.g>
        
        {/* Gradient and filter definitions */}
        <defs>
          <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" opacity="0.9" />
            <stop offset="30%" stopColor="var(--accent)" opacity="0.7" />
            <stop offset="70%" stopColor="var(--primary)" opacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" opacity="0.9" />
          </linearGradient>
          
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="50%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          
          <filter id="modernGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feFlood floodColor="var(--primary)" floodOpacity="0.3"/>
            <feComposite in2="offset-blur" operator="in"/>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Hover glow effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full blur-md opacity-0"
          style={{ backgroundColor: 'var(--primary)' }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

export function LogoText({ className = "", size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo size={size} />
      <motion.span 
        className={`font-display font-bold gradient-text ${textSizes[size]}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Fernando Rodriguez
      </motion.span>
    </div>
  );
}

export function LogoMark({ className = "", size = 'sm' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <motion.div 
      className={`flex items-center space-x-2 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Logo size={size} animated={false} />
      <span className="font-display font-semibold text-foreground">FR</span>
    </motion.div>
  );
}