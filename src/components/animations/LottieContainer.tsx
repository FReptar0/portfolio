"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-pulse bg-muted rounded-lg w-full h-full" />
    </div>
  )
});

interface LottieContainerProps {
  animationData?: object;
  animationPath?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  height?: number | string;
  width?: number | string;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export function LottieContainer({
  animationData,
  animationPath = '/animations/default.json',
  className,
  loop = true,
  autoplay = true,
  speed = 1,
  height = 400,
  width = 400,
  onComplete,
  onError
}: LottieContainerProps) {
  const [animation, setAnimation] = useState<object | null>(animationData || null);
  const [isLoading, setIsLoading] = useState(!animationData);
  const [error, setError] = useState<string | null>(null);

  // Load animation from path if no data provided
  const loadAnimation = async () => {
    if (animationData) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(animationPath);
      
      if (!response.ok) {
        throw new Error(`Failed to load animation: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAnimation(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load animation';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  // Load animation on mount if path provided
  useEffect(() => {
    if (!animationData && !animation && !error) {
      loadAnimation();
    }
  }, [animationData, animationPath, animation, error]);

  if (error) {
    return (
      <div 
        className={cn("flex items-center justify-center bg-muted rounded-lg", className)}
        style={{ height, width }}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">⚠️</div>
          <div className="text-sm">Animation failed to load</div>
        </div>
      </div>
    );
  }

  if (isLoading || !animation) {
    return (
      <div 
        className={cn("flex items-center justify-center", className)}
        style={{ height, width }}
      >
        <div className="animate-pulse bg-muted rounded-lg w-full h-full" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Lottie
        animationData={animation}
        loop={loop}
        autoplay={autoplay}
        style={{ height, width }}
        onComplete={onComplete}
      />
    </div>
  );
}

// Predefined animation components for common use cases
export function CodingAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/coding.json"
      className={className}
      {...props}
    />
  );
}

export function LoadingAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/loading.json"
      height={60}
      width={60}
      className={className}
      {...props}
    />
  );
}

export function SuccessAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/success.json"
      loop={false}
      height={80}
      width={80}
      className={className}
      {...props}
    />
  );
}

export function AnalysisAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/analysis.json"
      className={className}
      {...props}
    />
  );
}

export function DesignAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/design.json"
      className={className}
      {...props}
    />
  );
}

export function DevelopmentAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/development.json"
      className={className}
      {...props}
    />
  );
}

export function OptimizationAnimation({ className, ...props }: Omit<LottieContainerProps, 'animationPath'>) {
  return (
    <LottieContainer
      animationPath="/animations/optimization.json"
      className={className}
      {...props}
    />
  );
}