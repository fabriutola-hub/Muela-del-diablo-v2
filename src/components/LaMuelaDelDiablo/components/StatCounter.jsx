import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const StatCounter = memo(({ target, label, suffix, inView, delay }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="text-center min-h-[180px] flex flex-col justify-center items-center px-4"
    >
      {/* 🔥 CAMBIO 1: Números con LIMELIGHT 
         Reemplacé 'font-black' por 'font-limelight'.
      */}
      <div 
        className="font-limelight text-[clamp(3.5rem,8vw,8rem)] leading-none tracking-tighter mb-4"
        style={{
          background: 'linear-gradient(to bottom right, #dc2626, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: '#dc2626',
          display: 'inline-block'
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>

      {/* 🔥 CAMBIO 2: Label con ITALIANA
         Como es un párrafo, le aplicamos la fuente Italiana para que combine.
      */}
      <p className="font-italiana text-lg md:text-xl font-medium text-gray-600 uppercase tracking-wide px-2">
        {label}
      </p>
    </motion.div>
  );
});

StatCounter.displayName = 'StatCounter';

export default StatCounter;