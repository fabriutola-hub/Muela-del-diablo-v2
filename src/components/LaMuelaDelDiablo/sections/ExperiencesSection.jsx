import { forwardRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { experiences } from '../constants/experiences';

const ExperienceCard = memo(({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="group relative w-full h-full"
  >
    <div className="neo-card p-0 flex flex-col h-full overflow-hidden bg-white/95 backdrop-blur-sm hover:shadow-glow transition-all duration-500">
      {/* Gradient Top Bar */}
      <div className="h-1.5 bg-gradient-to-r from-arcilla via-orange-400 to-arcilla w-full" />

      <div className="p-8 flex flex-col h-full relative">
        {/* Number Background */}
        <div className="absolute -right-4 -top-6 text-[8rem] font-display font-black text-gray-100/50 z-0 select-none group-hover:text-arcilla/10 transition-colors duration-500">
          {index + 1}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-arcilla to-orange-500 border-3 border-negro-illimani shadow-hard-sm flex items-center justify-center text-3xl text-white"
            >
              {exp.icon}
            </motion.div>
            <span className="font-mono text-xs font-bold uppercase border-2 border-negro-illimani px-3 py-1.5 bg-white/80 backdrop-blur-sm shadow-sm">
              Actividad 0{index + 1}
            </span>
          </div>

          <h3 className="text-2xl font-display font-black uppercase leading-none mb-4 text-negro-illimani group-hover:gradient-text transition-all duration-300">
            {exp.title}
          </h3>

          <p className="text-base font-sans font-medium text-gray-600 leading-relaxed mb-8 border-l-3 border-gray-200 pl-4 group-hover:border-arcilla transition-colors duration-300">
            {exp.desc}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-6 border-t-2 border-gray-100 group-hover:border-arcilla/30 transition-colors duration-300">
          <button className="w-full flex items-center justify-between text-sm font-bold font-mono uppercase tracking-wider text-negro-illimani group/btn">
            <span className="group-hover/btn:text-arcilla transition-colors">Ver Detalles</span>
            <motion.div
              whileHover={{ x: 5 }}
              className="w-10 h-10 bg-gradient-to-br from-negro-illimani to-gris-roca text-white flex items-center justify-center border-2 border-negro-illimani group-hover/btn:from-arcilla group-hover/btn:to-orange-500 transition-all duration-300 shadow-sm"
            >
              →
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  </motion.div>
));

ExperienceCard.displayName = 'ExperienceCard';

const ExperiencesSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const sectionInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-gradient-to-b from-white to-arena border-b-3 border-negro-illimani relative overflow-hidden">
      {/* Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D94E1F_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03]" />

      {/* Gradient Orb */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-arcilla/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-cielo/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-paja to-green-500 border-3 border-negro-illimani shadow-hard-sm text-xs font-bold font-mono text-white uppercase tracking-widest mb-6 cursor-default"
            >
              ✦ Nuestras Actividades
            </motion.span>

            <PaintText
              text="Vive la Aventura"
              className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.9]"
              textColor="text-negro-illimani"
              highlightColor="bg-gradient-to-r from-cielo to-blue-400"
              highlightTextColor="text-white"
              bicolor={true}
              secondaryStartWord="Aventura"
              animationDuration={0.6}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl font-sans font-medium text-gray-600 border-l-4 border-negro-illimani pl-6 max-w-md md:ml-auto bg-white/50 backdrop-blur-sm py-4"
          >
            Sumérgete en experiencias diseñadas para conectar tu espíritu con la naturaleza milenaria de <span className="font-bold gradient-text">Auki Kollo</span>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});

ExperiencesSection.displayName = 'ExperiencesSection';

export default ExperiencesSection;