import { Variants } from "framer-motion";

// Basic animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Text animations
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const letterSpacing: Variants = {
  hidden: { letterSpacing: "0.1em", opacity: 0 },
  visible: { 
    letterSpacing: "0em", 
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

// Card animations
export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const cardPress: Variants = {
  rest: { scale: 1 },
  press: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Complex animations
export const floatingAnimation: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.68, -0.55, 0.265, 1.55] // Bounce easing
    }
  }
};

// Navigation animations
export const navSlideIn: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    x: "100%",
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      duration: 0.3, 
      ease: "easeOut",
      height: { duration: 0.4 }
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeIn" 
    }
  }
};

// Page transitions
export const pageTransition: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Scroll-triggered animations
export const scrollTrigger: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Terminal animations
export const terminalLine: Variants = {
  hidden: { opacity: 0, width: 0 },
  visible: { 
    opacity: 1, 
    width: "100%",
    transition: { duration: 1, ease: "easeOut" }
  }
};

export const cursorBlink: Variants = {
  animate: {
    opacity: [1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Progress bar animations
export const progressBar: Variants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  }
};

// Custom easing curves
export const customEasing = {
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};

// Utility function for custom delays
export const withDelay = (variants: Variants, delay: number): Variants => {
  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay
      }
    }
  };
};

// Utility function for custom duration
export const withDuration = (variants: Variants, duration: number): Variants => {
  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        duration
      }
    }
  };
};