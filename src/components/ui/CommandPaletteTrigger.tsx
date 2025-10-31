"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommandPaletteTriggerProps {
  className?: string;
}

export function CommandPaletteTrigger({ className = "" }: CommandPaletteTriggerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    // Dispatch custom event to open command palette
    window.dispatchEvent(new CustomEvent('openCommandPalette'));
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        className={`w-48 justify-start gap-3 text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50 border-border/40 hover:border-border ${className}`}
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Search...</span>
        <span className="ml-auto text-xs opacity-60">⌘K</span>
      </Button>
    </motion.div>
  );
}