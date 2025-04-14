import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(options: IntersectionObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin 
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}