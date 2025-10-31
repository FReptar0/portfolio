"use client";

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

// Intersection Observer Hook for performance
function useIntersectionObserver(
  elementRef: React.RefObject<HTMLElement | null>,
  threshold = 0.1,
  triggerOnce = true
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else {
          if (!triggerOnce) {
            setIsIntersecting(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce]);

  return hasTriggered || isIntersecting;
}

// Lazy Section Component
export function LazySection({
  children,
  fallback,
  threshold = 0.1,
  triggerOnce = true,
  className = ""
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, threshold, triggerOnce);

  const defaultFallback = (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {isVisible ? children : (fallback || defaultFallback)}
      </motion.div>
    </div>
  );
}

// Optimized Image Component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isVisible = useIntersectionObserver(imgRef, 0.1, true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  // Generate placeholder blur
  const generateBlurPlaceholder = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const placeholderSrc = blurDataURL || (width && height ? generateBlurPlaceholder(width, height) : '');

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loading/Blur Placeholder */}
      {(isLoading || !isVisible) && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse"
          style={{
            backgroundImage: placeholderSrc ? `url(${placeholderSrc})` : undefined,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Actual Image */}
      {(isVisible || priority) && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: isError ? 0 : (isLoading ? 0 : 1),
            scale: 1
          }}
          transition={{ duration: 0.3 }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">Error loading image</div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && isVisible && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}

// Progressive Enhancement Hook
export function useProgressiveEnhancement() {
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    // Check for performance capabilities
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    const hasRequestIdleCallback = 'requestIdleCallback' in window;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
      } catch {
        return false;
      }
    })();

    // Check device performance
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && 
      (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');

    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2;

    // Enable enhancements based on capabilities
    const shouldEnhance = hasIntersectionObserver && 
                         hasRequestIdleCallback && 
                         hasWebGL && 
                         !isSlowConnection && 
                         !isLowEndDevice && 
                         !hasLimitedMemory;

    setIsEnhanced(shouldEnhance);
  }, []);

  return isEnhanced;
}

// Performance Monitor Component
export function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    connectionSpeed: 'unknown'
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    // Start FPS monitoring
    requestAnimationFrame(measureFPS);

    // Memory monitoring
    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        setMetrics(prev => ({ ...prev, memoryUsage: Math.round(usage) }));
      }
    };

    const memoryInterval = setInterval(updateMemory, 5000);

    // Connection monitoring
    const connection = (navigator as any).connection;
    if (connection) {
      setMetrics(prev => ({ 
        ...prev, 
        connectionSpeed: connection.effectiveType || 'unknown' 
      }));

      const updateConnection = () => {
        setMetrics(prev => ({ 
          ...prev, 
          connectionSpeed: connection.effectiveType || 'unknown' 
        }));
      };

      connection.addEventListener('change', updateConnection);

      return () => {
        clearInterval(memoryInterval);
        connection.removeEventListener('change', updateConnection);
      };
    }

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  // Show performance warning for low-end devices
  const showWarning = metrics.fps > 0 && metrics.fps < 30;

  return (
    <>
      {children}
      
      {/* Development Performance Overlay */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
          <div>FPS: {metrics.fps}</div>
          <div>Memory: {metrics.memoryUsage}%</div>
          <div>Connection: {metrics.connectionSpeed}</div>
          {showWarning && (
            <div className="text-yellow-400">⚠️ Low FPS</div>
          )}
        </div>
      )}
    </>
  );
}

// Lazy loaded components
export const LazyCodePlayground = lazy(() => 
  import('../interactive/CodePlayground').then(module => ({ 
    default: module.CodePlayground 
  }))
);

export const LazyMicroInteractions = lazy(() => 
  import('../effects/MicroInteractions').then(module => ({ 
    default: module.FloatingStats 
  }))
);

// Critical CSS inlining (for above-the-fold content)
export function CriticalCSS() {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalStyles = `
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .text-display-xl {
        font-size: 4.209rem;
        line-height: 0.9;
        letter-spacing: -0.025em;
      }
      
      .gradient-text {
        background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

// Resource Hints Component
export function ResourceHints() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      { href: '/fonts/inter-display.woff2', as: 'font', type: 'font/woff2' },
      { href: '/images/hero-bg.webp', as: 'image' }
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // DNS prefetch for external resources
    const dnsPrefetch = [
      'https://api.github.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}