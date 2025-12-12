import { forwardRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Flag, ArrowUpRight } from 'lucide-react';
import StatCounter from '../components/StatCounter';

const STATS_DATA = [
  {
    target: 3650,
    label: "Altitud Media",
    suffix: "msnm",
    desc: "La metrópoli más alta del mundo.",
    icon: TrendingUp,
    gradient: "from-arcilla to-orange-400"
  },
  {
    target: 10000,
    label: "Visitantes/Año",
    suffix: "+",
    desc: "Aventureros de todo el globo.",
    icon: Users,
    gradient: "from-cielo to-blue-400"
  },
  {
    target: 1950,
    label: "Primera Ascensión",
    suffix: "",
    desc: "Hito histórico registrado.",
    icon: Flag,
    gradient: "from-paja to-green-400"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const StatCard = memo(({ stat, index, isHovered, onMouseEnter, onMouseLeave, statsInView }) => {
  const Icon = stat.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative border-r-0 border-l-0 md:border-r-3 border-b-3 border-negro-illimani p-8 md:p-12 cursor-default overflow-hidden bg-white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Gradient Fill Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0`} />

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />

      {/* Corner Decoration */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <div className="w-3 h-3 bg-white border-2 border-white/50 rotate-45" />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <Icon className={`absolute -right-4 -top-4 w-32 h-32 opacity-5 stroke-1 transition-all duration-500 ${isHovered ? 'text-white opacity-20 scale-110' : 'text-negro-illimani'}`} />

        <div className="flex justify-between items-start mb-8">
          <span className={`font-mono text-sm font-bold tracking-widest uppercase border-2 px-3 py-1.5 transition-all duration-300 ${isHovered ? 'border-white text-white bg-white/10 backdrop-blur-sm' : 'border-negro-illimani text-negro-illimani'}`}>
            0{index + 1}
          </span>
          <motion.div
            animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-7 h-7 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-arcilla'}`} />
          </motion.div>
        </div>

        <div className={`text-5xl md:text-7xl xl:text-8xl font-display font-black tracking-tighter mb-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-negro-illimani'}`}>
          <div className="flex items-baseline">
            <StatCounter
              target={stat.target}
              inView={statsInView}
              delay={index * 0.15}
            />
            <span className={`text-xl md:text-3xl ml-2 font-mono font-medium transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-negro-illimani/50'}`}>
              {stat.suffix}
            </span>
          </div>
        </div>

        <div>
          <h3 className={`font-bold text-lg md:text-xl uppercase mb-2 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-negro-illimani'}`}>
            {stat.label}
          </h3>
          <p className={`font-mono text-xs md:text-sm leading-relaxed max-w-[90%] transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-negro-illimani/60'}`}>
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
    <section ref={ref} className="relative py-24 md:py-36 bg-gradient-to-br from-arcilla via-arcilla to-orange-600 border-b-4 border-negro-illimani overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Decorative SVG */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="white" strokeWidth="0.3" />
          <path d="M0 100 C 30 20 70 20 100 100 Z" fill="none" stroke="white" strokeWidth="0.3" />
          <path d="M0 100 C 40 40 60 40 100 100 Z" fill="none" stroke="white" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 border-b-2 border-white/30 pb-6"
        >
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/70 block mb-3">
              Datos & Métricas // 04
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-none drop-shadow-lg">
              Impacto <br />Geológico
            </h2>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden md:block"
          >
            <ArrowUpRight className="w-14 h-14 text-white stroke-[1.5]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-l-3 border-t-3 border-negro-illimani shadow-hard-xl"
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