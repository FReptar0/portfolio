"use client";

import { Suspense } from 'react';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { PerformanceMonitor, CriticalCSS, ResourceHints } from '@/components/optimized/LazySection';
import { MexicanGradientBg, InteractiveMexicanElement } from '@/components/cultural/MexicanPatterns';
import { CursorFollow } from '@/components/effects/MicroInteractions';

interface Stage3LayoutProps {
  children: React.ReactNode;
}

export function Stage3Layout({ children }: Stage3LayoutProps) {
  return (
    <PerformanceMonitor>
      {/* Critical CSS and Resource Hints */}
      <CriticalCSS />
      <ResourceHints />
      
      {/* Mexican Cultural Background */}
      <MexicanGradientBg />
      
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Advanced UX Components */}
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
      
      {/* Cultural Integration */}
      
      {/* Cursor Enhancement (desktop only) */}
      <div className="hidden lg:block">
        <CursorFollow />
      </div>
    </PerformanceMonitor>
  );
}