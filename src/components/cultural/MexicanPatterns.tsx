"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Aztec-inspired geometric patterns
export function AztecPattern({ 
  className = "",
  animate = true,
  opacity = 0.1 
}: { 
  className?: string;
  animate?: boolean;
  opacity?: number;
}) {
  return (
    <motion.svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity, scale: 1 } : undefined}
      transition={animate ? { duration: 2, ease: "easeOut" } : undefined}
    >
      {/* Central pattern */}
      <motion.g
        initial={animate ? { rotate: 0 } : undefined}
        animate={animate ? { rotate: 360 } : undefined}
        transition={animate ? { duration: 120, repeat: Infinity, ease: "linear" } : undefined}
      >
        {/* Main geometric shapes */}
        <path
          d="M200 50 L350 200 L200 350 L50 200 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Inner patterns */}
        <path
          d="M200 100 L300 200 L200 300 L100 200 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Corner decorations */}
        {[0, 90, 180, 270].map((rotation, index) => (
          <g key={index} transform={`rotate(${rotation} 200 200)`}>
            <path
              d="M200 60 L220 80 L200 100 L180 80 Z"
              fill="currentColor"
            />
            <circle cx="200" cy="70" r="3" fill="currentColor" />
          </g>
        ))}
        
        {/* Radiating lines */}
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * 45) * (Math.PI / 180);
          const x1 = 200 + Math.cos(angle) * 80;
          const y1 = 200 + Math.sin(angle) * 80;
          const x2 = 200 + Math.cos(angle) * 120;
          const y2 = 200 + Math.sin(angle) * 120;
          
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}
      </motion.g>
    </motion.svg>
  );
}

// Talavera-inspired tile pattern
export function TalavieraPattern({ 
  className = "",
  tileSize = 60,
  rows = 6,
  cols = 6 
}: {
  className?: string;
  tileSize?: number;
  rows?: number;
  cols?: number;
}) {
  const patterns = [
    // Pattern 1: Flower
    <g key="flower">
      <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <circle
          key={i}
          cx={30 + Math.cos(angle * Math.PI / 180) * 12}
          cy={30 + Math.sin(angle * Math.PI / 180) * 12}
          r="3"
          fill="currentColor"
        />
      ))}
    </g>,
    
    // Pattern 2: Star
    <g key="star">
      <polygon
        points="30,10 35,25 50,25 38,35 43,50 30,40 17,50 22,35 10,25 25,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.4" />
    </g>,
    
    // Pattern 3: Geometric
    <g key="geometric">
      <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15 L45 45 M45 15 L15 45" stroke="currentColor" strokeWidth="1" />
      <circle cx="30" cy="30" r="4" fill="currentColor" />
    </g>,
    
    // Pattern 4: Leaves
    <g key="leaves">
      <path
        d="M20 30 Q25 20 30 30 Q35 20 40 30 Q35 40 30 30 Q25 40 20 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
    </g>
  ];

  return (
    <svg
      className={`${className}`}
      width={cols * tileSize}
      height={rows * tileSize}
      viewBox={`0 0 ${cols * tileSize} ${rows * tileSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const patternIndex = (row + col) % patterns.length;
          return (
            <g
              key={`${row}-${col}`}
              transform={`translate(${col * tileSize}, ${row * tileSize})`}
            >
              <rect
                width={tileSize}
                height={tileSize}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.2"
              />
              {patterns[patternIndex]}
            </g>
          );
        })
      )}
    </svg>
  );
}

// Mexican color-inspired gradient background
export function MexicanGradientBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, oklch(0.72 0.20 35) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, oklch(0.60 0.18 140) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, oklch(0.80 0.18 70) 0%, transparent 70%)
          `
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              oklch(0.72 0.20 35) 20px,
              oklch(0.72 0.20 35) 22px
            )
          `
        }}
      />
    </div>
  );
}

// Cultural section decorator
export function CulturalDecorator({ 
  position = 'top-left',
  size = 'medium',
  pattern = 'aztec'
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'small' | 'medium' | 'large';
  pattern?: 'aztec' | 'talavera';
}) {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  const sizes = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  return (
    <div className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none overflow-hidden`}>
      <div className="text-primary/20">
        {pattern === 'aztec' ? (
          <AztecPattern animate={false} opacity={0.3} />
        ) : (
          <TalavieraPattern rows={2} cols={2} />
        )}
      </div>
    </div>
  );
}

// Mexican flag colors animation
export function MexicanPrideIndicator() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-4 right-4 z-30 flex items-center gap-2"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <motion.div
        className="flex rounded-lg overflow-hidden border border-border shadow-lg"
        whileHover={{ scale: 1.05 }}
      >
        {/* Green stripe */}
        <motion.div
          className="w-2 h-8 bg-green-600"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
        {/* White stripe */}
        <motion.div
          className="w-2 h-8 bg-white"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
        {/* Red stripe */}
        <motion.div
          className="w-2 h-8 bg-red-600"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />
      </motion.div>
      
      <motion.span
        className="text-xs font-medium text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🇲🇽 MX
      </motion.span>
    </motion.div>
  );
}

// Interactive cultural element
export function InteractiveMexicanElement() {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const mexicanPhrases = [
    "¡Órale!",
    "¡Qué padre!",
    "¡Está padrísimo!",
    "¡Chido!",
    "¡Excelente!"
  ];

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <motion.div
      className="fixed bottom-20 right-6 z-30"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4 }}
    >
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-12 h-12 bg-gradient-terra rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">🌵</span>
        
        {/* Tooltip */}
        {isHovered && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span className="text-sm font-medium">
              {clickCount > 0 ? mexicanPhrases[clickCount % mexicanPhrases.length] : "Click para sorpresa mexicana"}
            </span>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </motion.div>
        )}

        {/* Click effect */}
        {clickCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            key={clickCount}
          />
        )}
      </motion.button>
    </motion.div>
  );
}

// Mexican cultural context for sections
export function CulturalSection({ 
  children,
  pattern = 'subtle',
  decorator = true 
}: {
  children: React.ReactNode;
  pattern?: 'subtle' | 'prominent';
  decorator?: boolean;
}) {
  return (
    <div className="relative">
      {/* Background pattern */}
      {pattern === 'prominent' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <TalavieraPattern rows={10} cols={20} />
        </div>
      )}
      
      {/* Decorative corners */}
      {decorator && (
        <>
          <CulturalDecorator position="top-left" pattern="aztec" size="small" />
          <CulturalDecorator position="bottom-right" pattern="talavera" size="small" />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}