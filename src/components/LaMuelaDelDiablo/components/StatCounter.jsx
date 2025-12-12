import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const StatCounter = memo(({ target, inView, delay }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const duration = 1000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCount(Math.floor(target * easeOut));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
    </span>
  );
});

StatCounter.displayName = 'StatCounter';

export default StatCounter;