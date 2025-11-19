import { forwardRef } from 'react';
import { useInView } from 'framer-motion';
import StatCounter from '../components/StatCounter';

const StatsSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const statsInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-32 bg-white text-black overflow-visible">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <StatCounter 
            target={3650} 
            label="Metros de Altura" 
            suffix="m" 
            inView={statsInView} 
            delay={0} 
          />
          <StatCounter 
            target={10000} 
            label="Visitantes Anuales" 
            suffix="+" 
            inView={statsInView} 
            delay={0.05} 
          />
          <StatCounter 
            target={1950} 
            label="Primera Ascensión" 
            suffix="" 
            inView={statsInView} 
            delay={0.1} 
          />
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
