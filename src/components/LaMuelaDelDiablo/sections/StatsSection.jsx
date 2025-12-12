import { forwardRef, useState, memo, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Flag, ArrowUpRight } from 'lucide-react';
import StatCounter from '../components/StatCounter';

const STATS_DATA = [
  {
    target: 3650,
    label: "Altitud Media",
    suffix: "msnm",
    desc: "La metrópoli más alta del mundo.",
    icon: TrendingUp
  },
  {
    target: 10000,
    label: "Visitantes/Año",
    suffix: "+",
    desc: "Aventureros de todo el globo.",
    icon: Users
  },
  {
    target: 1950,
    label: "Primera Ascensión",
    suffix: "",
    desc: "Hito histórico registrado.",
    icon: Flag
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const StatCard = memo(({ stat, index, isHovered, onMouseEnter, onMouseLeave, statsInView }) => {
  const Icon = stat.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative border-r-0 border-l-0 md:border-r-2 border-b-2 border-negro-illimani p-6 md:p-12 cursor-default transition-colors duration-500 overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 bg-negro-illimani transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-2 h-2 bg-white" />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <Icon className={`absolute -right-4 -top-4 w-32 h-32 opacity-5 stroke-1 transition-colors duration-500 ${isHovered ? 'text-white opacity-10' : 'text-negro-illimani'}`} />

        <div className="flex justify-between items-start mb-8">
          <span className={`font-mono text-sm font-bold tracking-widest uppercase border px-2 py-1 transition-colors duration-300 ${isHovered ? 'border-white text-white' : 'border-negro-illimani text-negro-illimani'}`}>
            0{index + 1}
          </span>
          <Icon className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-arcilla' : 'text-negro-illimani'}`} />
        </div>

        <div className={`text-5xl md:text-7xl xl:text-8xl font-display font-black tracking-tighter mb-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-negro-illimani'}`}>
          <div className="flex items-baseline">
            <StatCounter
              target={stat.target}
              inView={statsInView}
              delay={index * 0.15}
            />
            <span className={`text-xl md:text-3xl ml-1 font-mono font-medium stroke-0 ${isHovered ? 'text-arcilla' : 'text-negro-illimani/60'}`}>
              {stat.suffix}
            </span>
          </div>
        </div>

        <div>
          <h3 className={`font-bold text-lg md:text-xl uppercase mb-2 transition-colors duration-300 ${isHovered ? 'text-arcilla' : 'text-negro-illimani'}`}>
            {stat.label}
          </h3>
          <p className={`font-mono text-xs md:text-sm leading-relaxed max-w-[90%] md:max-w-[80%] transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-negro-illimani/70'}`}>
            {stat.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

const StatsSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const statsInView = useInView(ref, inViewConfig);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-arcilla border-b-4 border-negro-illimani overflow-hidden">
      <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-negro-illimani" />
          <path d="M0 100 C 30 20 70 20 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-negro-illimani" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <div className="flex items-end justify-between mb-10 md:mb-16 border-b-2 border-negro-illimani pb-4">
          <div>
            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-negro-illimani/70 block mb-2">
              Datos & Métricas // 04
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-negro-illimani uppercase leading-none">
              Impacto <br />Geológico
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <ArrowUpRight className="w-12 h-12 text-negro-illimani stroke-[1.5]" />
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-l-2 border-t-2 border-negro-illimani bg-white"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          {STATS_DATA.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              statsInView={statsInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;