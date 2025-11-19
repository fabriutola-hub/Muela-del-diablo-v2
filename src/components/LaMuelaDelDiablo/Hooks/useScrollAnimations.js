import { useScroll, useTransform } from 'framer-motion';

export const useScrollAnimations = () => {
  const { scrollY } = useScroll();
  
  // Hero parallax effects
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -30]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05]);

  // General fade in on scroll
  const fadeInFromBottom = useTransform(
    scrollY,
    [0, 200, 400],
    [0, 0, 1]
  );

  return {
    scrollY,
    heroOpacity,
    heroY,
    heroScale,
    fadeInFromBottom
  };
};
