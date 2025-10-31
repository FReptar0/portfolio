import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border border-input text-foreground hover:bg-accent hover:text-accent-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        tech: "border-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 text-white hover:opacity-90 shadow-sm",
        skill: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        glow: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg shadow-primary/25"
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  animated?: boolean;
}

function Badge({ className, variant, size, icon, animated = false, children, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        badgeVariants({ variant, size }),
        animated && "hover:scale-105 transition-transform duration-200",
        className
      )} 
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}

// Specialized badge components
function TechBadge({ className, proficiency, children, ...props }: BadgeProps & { proficiency?: number }) {
  return (
    <Badge
      variant="tech"
      animated
      className={cn(
        "relative overflow-hidden",
        proficiency && proficiency >= 90 && "ring-2 ring-yellow-400/50",
        className
      )}
      {...props}
    >
      {children}
      {proficiency && (
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-white/30"
          style={{ width: `${proficiency}%` }}
        />
      )}
    </Badge>
  );
}

function StatusBadge({ className, status, children, ...props }: BadgeProps & { status: 'online' | 'busy' | 'away' | 'offline' }) {
  const statusVariants = {
    online: "bg-green-500",
    busy: "bg-red-500", 
    away: "bg-yellow-500",
    offline: "bg-gray-500"
  };

  return (
    <Badge
      className={cn("gap-2", className)}
      {...props}
    >
      <div className={cn("w-2 h-2 rounded-full animate-pulse", statusVariants[status])} />
      {children}
    </Badge>
  );
}

function CountBadge({ className, count, max = 99, ...props }: BadgeProps & { count: number; max?: number }) {
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return (
    <Badge
      variant="destructive"
      size="sm"
      className={cn("min-w-[1.25rem] h-5 p-0 justify-center", className)}
      {...props}
    >
      {displayCount}
    </Badge>
  );
}

export { Badge, badgeVariants, TechBadge, StatusBadge, CountBadge };