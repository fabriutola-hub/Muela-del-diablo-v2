import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { experiences } from '../constants/experiences';

// --- Subcomponente: Tarjeta Neo-Brutalista ---
const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "circOut" }}
      // CLASE NEO-CARD: Fondo blanco, borde negro, sombra dura
      className="neo-card group relative w-full h-full p-8 flex flex-col justify-between overflow-hidden hover:bg-arena transition-colors duration-300"
    >
      {/* Decoración: Número de fondo gigante */}
      <div className="absolute -right-4 -top-6 text-[8rem] font-display font-black text-gray-100 z-0 select-none group-hover:text-white transition-colors">
        {index + 1}
      </div>

      <div className="relative z-10">
        {/* Header de la tarjeta: Icono y Etiqueta */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 bg-arcilla border-3 border-negro-illimani shadow-hard-sm flex items-center justify-center text-3xl text-white group-hover:scale-110 transition-transform duration-200">
            {exp.icon}
          </div>
          <span className="font-mono text-xs font-bold uppercase border-2 border-black px-2 py-1 bg-white">
            Actividad 0{index + 1}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-display font-black uppercase leading-none mb-4 text-negro-illimani group-hover:text-arcilla transition-colors">
          {exp.title}
        </h3>

        {/* Descripción */}
        <p className="text-base font-sans font-medium text-gray-600 leading-relaxed mb-8 border-l-2 border-gray-300 pl-4 group-hover:border-negro-illimani transition-colors">
          {exp.desc}
        </p>
      </div>

      {/* Footer / CTA */}
      <div className="relative z-10 pt-6 border-t-3 border-negro-illimani/10 group-hover:border-negro-illimani transition-colors">
        <button className="w-full flex items-center justify-between text-sm font-bold font-mono uppercase tracking-wider text-negro-illimani group/btn">
          <span>Ver Detalles</span>
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center border-2 border-transparent group-hover/btn:bg-arcilla group-hover/btn:border-black transition-all">
            →
          </div>
        </button>
      </div>
    </motion.div>
  );
};

// --- Componente Principal ---
const ExperiencesSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const sectionInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-32 bg-white border-b-3 border-negro-illimani relative overflow-hidden">
      
      {/* Fondo Decorativo: Patrón de Puntos (Dot Grid) */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05]" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header de Sección */}
        <div className="grid md:grid-cols-2 gap-12 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-paja border-3 border-negro-illimani shadow-hard-sm text-xs font-bold font-mono text-negro-illimani uppercase tracking-widest mb-6">
              Nuestras Actividades
            </span>
            
            <div className="relative">
                <PaintText
                text="Vive la Aventura"
                className="text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-[0.9]"
                textColor="text-negro-illimani"
                highlightColor="bg-cielo" // Azul Cielo para contrastar con el naranja
                highlightTextColor="text-white"
                bicolor={true}
                secondaryStartWord="Aventura"
                animationDuration={0.6}
                />
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl font-sans font-medium text-gray-600 border-l-4 border-negro-illimani pl-6 max-w-md ml-auto"
          >
            Sumérgete en experiencias diseñadas para conectar tu espíritu con la naturaleza milenaria de Auki Kollo.
          </motion.p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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