import { forwardRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
// ✅ RECUPERAMOS PaintText (Ahora que ya tiene el estilo nuevo)
import PaintText from '@/components/shared/PaintText';
import LazyVisor360 from '@/components/LazyVisor360';
import { visorItems } from '../constants/visorItems';

const Visor360Section = forwardRef(({ selectedVisor, handleOpenVisor, handleCloseVisor }, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const visor360InView = useInView(ref, inViewConfig);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "backOut" }
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

  return (
    <>
      {/* ================= MODAL 360° (Estilo Cine/Oscuro) ================= */}
      <AnimatePresence>
        {selectedVisor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-negro-illimani/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseVisor}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              // Borde blanco grueso para resaltar sobre el fondo oscuro
              className="w-full h-full max-w-[95vw] max-h-[85vh] relative shadow-hard-xl border-4 border-white bg-black overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {selectedVisor && <LazyVisor360 src={selectedVisor.src} caption={selectedVisor.caption} />}
            </motion.div>
            
            {/* Botón Cerrar (Estilo Botón Físico) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVisor}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-14 md:h-14 bg-arcilla text-white border-3 border-white shadow-hard hover:bg-red-600 hover:scale-110 transition-all flex items-center justify-center text-xl md:text-3xl font-bold font-mono"
              aria-label="Cerrar visor"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SECCIÓN PRINCIPAL ================= */}
      <section ref={ref} className="py-20 md:py-32 bg-arena border-b-3 border-negro-illimani relative overflow-hidden">
        
        {/* Elemento decorativo de fondo */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
            <h1 className="text-[10rem] md:text-[15rem] font-display font-black text-negro-illimani leading-none">360</h1>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
          
          {/* Header de Sección */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="mb-10 md:mb-20 flex flex-col md:flex-row items-end justify-between gap-6 md:gap-8 border-b-3 border-negro-illimani pb-6 md:pb-8"
          >
            <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 bg-negro-illimani text-white text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-hard-sm">
                🌐 Zona Inmersiva
                </span>
                
                {/* 🔥 ACTUALIZADO: Usamos PaintText para consistencia */}
                <div className="relative z-10">
                  <PaintText
                    text="Explora como si estuvieras ahí"
                    className="text-[clamp(2rem,6vw,5rem)] font-black leading-[0.9] text-negro-illimani uppercase"
                    textColor="text-negro-illimani"
                    highlightColor="bg-cielo" // Azul Cielo para variar
                    highlightTextColor="text-white"
                    bicolor={true}
                    secondaryStartWord="estuvieras"
                    animationDuration={0.6}
                  />
                </div>
            </div>
            
            <p className="text-base md:text-lg font-sans font-medium text-negro-illimani/80 max-w-md text-left md:text-left">
              Haz click en las tarjetas para abrir el visor panorámico. <br/>
              Compatible con gafas VR 🥽.
            </p>
          </motion.div>

          {/* Grid de Bento Cards */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visorItems.map((item, i) => (
              <motion.div
                key={item.src + i}
                variants={fadeInUp}
                // CLASE NEO-CARD
                className="neo-card relative h-[350px] md:h-[450px] flex flex-col cursor-pointer group overflow-hidden"
                onClick={() => handleOpenVisor(item)}
              >
                {/* Contenedor de Imagen */}
                <div className="h-[85%] w-full relative overflow-hidden border-b-3 border-negro-illimani bg-gray-200">
                  {visor360InView && (
                    <img
                      src={item.thumbnail}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Badge en esquina */}
                  <div className="absolute top-4 left-4 bg-white border-2 border-black px-2 py-1 shadow-hard-sm z-10">
                    <span className="text-xs font-mono font-bold uppercase">Vista {i + 1}</span>
                  </div>

                  {/* Icono Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-arcilla text-white w-16 h-16 rounded-full border-3 border-black flex items-center justify-center shadow-hard transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <span className="text-2xl">👁️</span>
                    </div>
                  </div>
                </div>

                {/* Footer de Tarjeta */}
                <div className="h-[15%] bg-white p-4 flex items-center justify-between group-hover:bg-cielo/20 transition-colors">
                  <h3 className="text-lg font-bold font-display uppercase truncate text-negro-illimani pr-4">
                    {item.caption}
                  </h3>
                  <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Nota al pie */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visor360InView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center border-t-2 border-dashed border-negro-illimani/30 pt-8"
          >
            <p className="font-mono text-sm text-negro-illimani">
             [ SYSTEM ] : Renderizado de entorno completado.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
});

Visor360Section.displayName = 'Visor360Section';

export default Visor360Section;
