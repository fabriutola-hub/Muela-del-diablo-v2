import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { menuItems } from '../constants/navigation'; 

const HeroSection = ({ isLoaded, menuOpen, setMenuOpen, scrollToSection, refs }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // 1. Lógica Scroll Header (OPTIMIZADA)
  // Reemplazo del listener nativo pesado por el hook optimizado de Framer Motion
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    // Solo actualizamos el estado si el valor realmente cambia
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  // 2. Efectos de Parallax (Más sutiles para mantener legibilidad)
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  // Estilos reutilizables para botones Neo-Brutalistas
  const btnPrimaryClass = "relative px-6 py-3 md:px-8 md:py-4 bg-arcilla text-white font-display font-bold text-base md:text-lg uppercase tracking-wider border-3 border-negro-illimani shadow-hard transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";
  const btnSecondaryClass = "relative px-6 py-3 md:px-8 md:py-4 bg-white text-negro-illimani font-display font-bold text-base md:text-lg uppercase tracking-wider border-3 border-negro-illimani shadow-hard transition-all hover:bg-arena hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

  return (
    <>
      {/* ================= HEADER NEO-BRUTALISTA ================= */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b-3 ${
          isScrolled || menuOpen 
            ? "bg-arena border-negro-illimani" 
            : "bg-transparent border-transparent"
        }`}
        style={{ paddingBlock: isScrolled ? '1rem' : '1.5rem' }}
      >
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex items-center justify-between relative z-50">
          
          {/* LOGO */}
          <motion.div 
            className="cursor-pointer border-3 border-transparent hover:border-negro-illimani hover:bg-white p-1 md:p-2 transition-all"
            onClick={() => {
               setMenuOpen(false);
               refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex flex-col leading-none">
              <span className={`text-xl md:text-2xl font-display font-black tracking-tighter uppercase ${isScrolled ? 'text-negro-illimani' : 'text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}>
                LA MUELA
              </span>
              <span className="text-[10px] md:text-xs font-mono font-bold text-arcilla uppercase tracking-widest bg-black px-1 mt-1 w-max">
                Del Diablo
              </span>
            </div>
          </motion.div>
          
          {/* NAVEGACIÓN DESKTOP (Estilo Toolbar) */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems && menuItems.map((item, i) => (
              <button
                key={item.name}
                onClick={() => refs && item.ref && refs[item.ref] && scrollToSection(refs[item.ref])}
                className={`text-sm font-bold font-mono uppercase hover:underline decoration-4 decoration-arcilla underline-offset-4 transition-all ${
                    isScrolled ? 'text-negro-illimani' : 'text-white drop-shadow-[1px_1px_0px_black]'
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* BOTÓN APP (Estilo Etiqueta) */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQR(true)}
                className="ml-4 px-4 py-2 bg-white text-black border-3 border-black shadow-hard-sm font-bold font-mono text-xs flex items-center gap-2 hover:bg-arcilla hover:text-white transition-colors"
            >
                APP ANDROID ↓
            </motion.button>
          </nav>

          {/* BOTÓN HAMBURGUESA (Cuadrado Sólido) */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 md:w-12 md:h-12 bg-white border-3 border-black shadow-hard-sm flex flex-col justify-center items-center gap-1.5 focus:outline-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-1 bg-black origin-center transition-all" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-1 bg-black transition-all" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-1 bg-black origin-center transition-all" />
          </button>
        </div>

        {/* MENÚ MÓVIL (Pantalla Completa Color Arena) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="md:hidden absolute top-0 left-0 right-0 h-screen bg-arena z-40 flex flex-col items-center justify-center border-b-3 border-negro-illimani"
            >
              <div className="flex flex-col gap-8 text-center">
                {menuItems && menuItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={() => {
                      setMenuOpen(false);
                      if (refs && item.ref && refs[item.ref]) scrollToSection(refs[item.ref]);
                    }}
                    className="text-4xl font-display font-black text-negro-illimani uppercase hover:text-arcilla hover:underline decoration-4 transition-all"
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                <motion.button
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   onClick={() => { setMenuOpen(false); setShowQR(true); }}
                   className={btnPrimaryClass}
                >
                   DESCARGAR APP
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================= MODAL QR (Estilo Retro OS) ================= */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-negro-illimani/50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-3 border-negro-illimani shadow-hard-xl p-0 max-w-sm w-full relative"
            >
              {/* Barra de Título Falsa */}
              <div className="bg-arcilla border-b-3 border-negro-illimani p-2 flex justify-between items-center">
                 <span className="font-mono font-bold text-white uppercase text-xs">SYSTEM_QR_V1.exe</span>
                 <button onClick={() => setShowQR(false)} className="bg-white border-2 border-black w-6 h-6 flex items-center justify-center font-bold hover:bg-black hover:text-white">×</button>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-display font-black text-negro-illimani mb-2 uppercase">¡Escanea Ya!</h3>
                <p className="text-negro-illimani font-mono text-xs mb-6 border-b-2 border-dashed border-gray-300 pb-4">Acceso directo a la experiencia móvil.</p>
                
                <div className="bg-arena border-3 border-negro-illimani p-2 mx-auto w-48 h-48 mb-6">
                  <img src="/imagenes/QRPEE.png" alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                <button 
                    onClick={() => setShowQR(false)}
                    className="w-full py-3 bg-negro-illimani text-white font-mono font-bold uppercase hover:bg-arcilla transition-colors border-2 border-transparent"
                >
                    [ Cerrar Ventana ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-negro-illimani">
        {/* Imagen de Fondo (Sin Blur, Cruda) */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 will-change-transform">
          <img
            src="/imagenes/fondo-muela-1.avif"
            alt="La Muela del Diablo"
            className="w-full h-full object-cover grayscale-[0.3] contrast-125" // Un poco desaturada y contrastada
            loading="eager"
            decoding="sync" // Es la imagen principal (LCP), debe ser sync y eager
            fetchPriority="high"
          />
          {/* Overlay de patrón de puntos o líneas (opcional) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </motion.div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="space-y-4 md:space-y-6"
          >
            {/* Etiqueta Superior */}
            <div className="inline-block bg-white border-3 border-black px-3 py-1 md:px-4 shadow-hard-sm rotate-[-2deg]">
                <p className="text-xs md:text-base font-mono font-bold text-black uppercase tracking-widest">
                📍 La Paz, Bolivia • 3.825 m.s.n.m.
                </p>
            </div>
            
            {/* Título Principal (Stroke Effect) */}
            <div className="relative py-2 md:py-4">
              <h1 className="text-[clamp(3rem,13vw,11rem)] font-display font-black leading-[0.85] tracking-tighter text-white drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[6px_6px_0px_#000]">
                LA MUELA
                {/* Texto "Del Diablo" con efecto Outline (borde negro, relleno arcilla) */}
                <span className="block text-arcilla [-webkit-text-stroke:1.5px_black] md:[-webkit-text-stroke:4px_black] paint-order-stroke fill-current">
                   DEL DIABLO
                </span>
              </h1>
            </div>
            
            {/* Descripción en Caja */}
            <div className="bg-arena border-3 border-black p-3 md:p-4 max-w-2xl mx-auto shadow-hard rotate-[1deg]">
                <p className="text-base md:text-xl font-sans font-medium text-negro-illimani leading-tight">
                Una formación rocosa que desafía al cielo. <br className="hidden md:block"/>
                La aventura comienza donde termina el asfalto.
                </p>
            </div>
            
            {/* Botones de Acción */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="flex flex-col md:flex-row gap-6 pt-8 items-center justify-center w-full"
            >
              <button 
                onClick={() => refs?.visitsRef && scrollToSection(refs.visitsRef)} 
                className={btnPrimaryClass}
              >
                Explorar Ruta
              </button>
              
              <button 
                onClick={() => window.open("https://youtu.be/rWI3CJuGtqw?si=uctoVK6EGmiFyJMp", "_blank")} 
                className={btnSecondaryClass}
              >
                ▶ Ver Video
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
