import { forwardRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import LazyVisor360 from '@/components/LazyVisor360';
import { visorItems } from '../constants/visorItems';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const VisorCard = memo(({ item, index, inView, onClick }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="neo-card relative h-[350px] md:h-[450px] flex flex-col overflow-hidden bg-white/95 backdrop-blur-sm hover:shadow-glow-cielo transition-all duration-500">
      {/* Gradient Top Bar */}
      <div className="h-1 bg-gradient-to-r from-cielo via-blue-400 to-cielo w-full absolute top-0 left-0 z-20" />

      <div className="h-[85%] w-full relative overflow-hidden border-b-3 border-negro-illimani bg-gray-100">
        {inView && (
          <img
            src={item.thumbnail}
            alt={item.caption}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0"
            loading="lazy"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-negro-illimani/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border-2 border-negro-illimani px-3 py-1.5 shadow-sm z-10">
          <span className="text-xs font-mono font-bold uppercase">🌐 Vista {index + 1}</span>
        </div>

        {/* 360 Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="bg-gradient-to-br from-cielo to-blue-600 text-white w-20 h-20 rounded-full border-3 border-white flex items-center justify-center shadow-glow-cielo transform group-hover:scale-100 transition-transform duration-300">
            <span className="text-3xl">👁️</span>
          </div>
        </motion.div>
      </div>

      <div className="h-[15%] bg-white/95 backdrop-blur-sm p-4 flex items-center justify-between group-hover:bg-cielo/10 transition-colors duration-300">
        <h3 className="text-lg font-bold font-display uppercase truncate text-negro-illimani pr-4 group-hover:gradient-text-cielo">
          {item.caption}
        </h3>
        <motion.div
          whileHover={{ x: 5 }}
          className="w-10 h-10 bg-gradient-to-br from-cielo to-blue-600 border-2 border-negro-illimani rounded-full flex items-center justify-center text-white shadow-sm"
        >
          →
        </motion.div>
      </div>
    </div>
  </motion.div>
));

VisorCard.displayName = 'VisorCard';

const Visor360Section = forwardRef(({ selectedVisor, handleOpenVisor, handleCloseVisor }, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const visor360InView = useInView(ref, inViewConfig);

  return (
    <>
      {/* Modal with Glass Effect */}
      <AnimatePresence>
        {selectedVisor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-negro-illimani/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={handleCloseVisor}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full max-w-[95vw] max-h-[85vh] relative shadow-glow-lg border-4 border-white bg-negro-illimani overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {selectedVisor && <LazyVisor360 src={selectedVisor.src} caption={selectedVisor.caption} />}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={handleCloseVisor}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-500 to-red-600 text-white border-3 border-white shadow-hard hover:shadow-glow transition-all flex items-center justify-center text-2xl font-bold"
              aria-label="Cerrar visor"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Section */}
      <section ref={ref} className="py-24 md:py-36 bg-gradient-to-b from-arena via-white to-arena border-b-3 border-negro-illimani relative overflow-hidden">
        {/* Decorative 360 Text */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
          <h1 className="text-[12rem] md:text-[18rem] font-display font-black text-cielo leading-none">360</h1>
        </div>

        {/* Gradient Orb */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-cielo/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="mb-12 md:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b-3 border-negro-illimani/20 pb-8"
          >
            <div className="max-w-3xl">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-cielo to-blue-500 text-white text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-hard-sm border-2 border-negro-illimani"
              >
                🌐 Zona Inmersiva
              </motion.span>

              <PaintText
                text="Explora como si estuvieras ahí"
                className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.9] text-negro-illimani uppercase"
                textColor="text-negro-illimani"
                highlightColor="bg-gradient-to-r from-cielo to-blue-500"
                highlightTextColor="text-white"
                bicolor={true}
                secondaryStartWord="estuvieras"
                animationDuration={0.6}
              />
            </div>

            <p className="text-base md:text-lg font-sans font-medium text-negro-illimani/70 max-w-md bg-white/50 backdrop-blur-sm p-4 border-l-4 border-cielo">
              Haz click en las tarjetas para abrir el visor panorámico. <br />
              <span className="gradient-text-cielo font-semibold">Compatible con gafas VR 🥽</span>
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visorItems.map((item, i) => (
              <VisorCard
                key={item.src + i}
                item={item}
                index={i}
                inView={visor360InView}
                onClick={() => handleOpenVisor(item)}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={visor360InView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="font-mono text-sm text-negro-illimani/50 bg-white/50 backdrop-blur-sm inline-block px-6 py-3 border border-negro-illimani/20">
              [ SYSTEM ] : Renderizado de entorno completado ✓
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
});

Visor360Section.displayName = 'Visor360Section';

export default Visor360Section;
