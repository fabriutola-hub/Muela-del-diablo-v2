import { forwardRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { historyTimeline } from '../constants/historyTimeline';

// --- Item del Timeline (Estilo Archivo Clasificado) ---
const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: "circOut" }}
      className={`relative flex items-center justify-between mb-16 md:mb-24 w-full ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col`} 
    >
      {/* Espacio vacío para layout alterno */}
      <div className="hidden md:block w-5/12" />

      {/* Punto central (Nodo Estructural) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          // Cuadrado negro con centro blanco (Estilo técnico)
          className="w-6 h-6 md:w-8 md:h-8 bg-white border-3 md:border-4 border-negro-illimani shadow-hard-sm"
        />
      </div>

      {/* Tarjeta de Contenido (.neo-card) */}
      <motion.div
        whileHover={{ scale: 1.02, rotate: isEven ? 1 : -1 }}
        className={`w-full md:w-5/12 pl-12 md:pl-0 ${
          isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"
        }`}
      >
        <div className="neo-card p-6 md:p-8 relative overflow-hidden group bg-white hover:bg-paja/20 transition-colors duration-300">
          
          {/* Número Gigante de Fondo */}
          <span className={`absolute -bottom-10 text-[8rem] font-display font-black text-gray-200 select-none z-0 group-hover:text-negro-illimani/10 transition-colors ${isEven ? '-left-6' : '-right-6'}`}>
            {index + 1}
          </span>

          <div className="relative z-10 flex flex-col h-full">
            {/* Año / Era (Etiqueta) */}
            <div className={`mb-4 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                <span className="inline-block px-3 py-1 text-sm font-mono font-bold text-white bg-negro-illimani border-2 border-transparent shadow-hard-sm">
                {item.year}
                </span>
            </div>

            {/* Título */}
            <h3 className="text-xl md:text-2xl font-display font-black uppercase leading-none mb-4 text-negro-illimani">
              {item.title}
            </h3>

            {/* Descripción */}
            <p className="text-base md:text-lg font-sans font-medium text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Componente Principal ---
const HistoryTimeline = forwardRef((props, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-arena border-b-3 border-negro-illimani overflow-hidden relative">
      
      {/* Fondo: Líneas guía (Grid técnico) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-xs font-bold font-mono tracking-widest uppercase text-negro-illimani bg-white border-2 border-negro-illimani shadow-hard-sm">
              Cronología Histórica
            </span>
            
            <div className="mb-6 md:mb-8">
              <PaintText
                text="Milenios de Historia Viva"
                className="text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter font-black uppercase"
                textColor="text-negro-illimani"
                highlightColor="bg-arcilla"
                highlightTextColor="text-white"
                bicolor={true}
                secondaryStartWord="Historia"
                animationDuration={0.6}
              />
            </div>

            <p className="max-w-2xl mx-auto text-base md:text-xl font-sans font-medium text-gray-700 leading-relaxed border-t-3 border-negro-illimani pt-4 md:pt-6">
              Un viaje a través del tiempo en Auki Kollo, donde cada estrato geológico
              y cada piedra cuenta la formación de los Andes.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Línea Base (Gris) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-300 -translate-x-1/2" />

          {/* Línea de Progreso (Negra Sólida) */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-negro-illimani origin-top -translate-x-1/2 z-10"
          />

          <div className="relative z-10 pt-10">
            {historyTimeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
          
          {/* Remate final del timeline */}
          <div className="absolute bottom-0 left-4 md:left-1/2 w-6 h-6 bg-arcilla border-4 border-negro-illimani -translate-x-1/2 translate-y-1/2 z-20" />
        </div>

      </div>
    </section>
  );
});

HistoryTimeline.displayName = 'HistoryTimeline';

export default HistoryTimeline;
