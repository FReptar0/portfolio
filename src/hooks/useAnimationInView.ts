import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseAnimationInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  margin?: string;
}

export const useAnimationInView = (options: UseAnimationInViewOptions = {}) => {
  const ref = useRef(null);
  const {
    threshold = 0.1,
    triggerOnce = true,
    margin = "0px 0px -10% 0px"
  } = options;

  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin: margin as any
  });

  return { ref, isInView };
};