import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { menuItems } from '../constants/navigation';

const HeroSection = ({ isLoaded, menuOpen, setMenuOpen, scrollToSection, refs }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <>
      {/* Glass Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b-3 ${isScrolled || menuOpen
          ? "bg-white/80 backdrop-blur-lg border-negro-illimani shadow-lg"
          : "bg-transparent border-transparent"
          }`}
        style={{ paddingBlock: isScrolled ? '0.75rem' : '1.25rem' }}
      >
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex items-center justify-between relative z-50">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer border-3 border-transparent hover:border-negro-illimani hover:bg-white/50 backdrop-blur-sm p-1 md:p-2 transition-all rounded-lg"
            onClick={() => {
              setMenuOpen(false);
              refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex flex-col leading-none">
              <span className={`text-xl md:text-2xl font-display tracking-tighter uppercase transition-colors duration-300 ${isScrolled ? 'text-negro-illimani' : 'text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}>
                LA MUELA
              </span>
              <span className="text-[10px] md:text-xs font-accent text-arcilla uppercase tracking-widest bg-negro-illimani px-1 mt-1 w-max">
                Del Diablo
              </span>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            {menuItems && menuItems.map((item, i) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => refs && item.ref && refs[item.ref] && scrollToSection(refs[item.ref])}
                className={`text-sm font-bold font-mono uppercase relative group transition-colors duration-300 ${isScrolled ? 'text-negro-illimani' : 'text-white drop-shadow-[1px_1px_0px_black]'
                  }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-arcilla group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(217, 78, 31, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQR(true)}
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-arcilla to-orange-500 text-white border-3 border-negro-illimani shadow-hard font-bold font-mono text-xs flex items-center gap-2 hover:shadow-glow transition-all duration-300"
            >
              <span className="animate-pulse">📱</span> APP
            </motion.button>
          </nav>

          <button
            className="md:hidden relative z-50 w-11 h-11 bg-white/90 backdrop-blur-sm border-3 border-negro-illimani shadow-hard-sm flex flex-col justify-center items-center gap-1.5 focus:outline-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-negro-illimani origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-negro-illimani" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-negro-illimani origin-center" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg z-40 border-b-3 border-negro-illimani shadow-xl"
            >
              <div className="flex flex-col gap-4 p-6">
                {menuItems && menuItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      setMenuOpen(false);
                      if (refs && item.ref && refs[item.ref]) scrollToSection(refs[item.ref]);
                    }}
                    className="text-2xl font-display font-black text-negro-illimani uppercase hover:text-arcilla transition-colors text-left py-2 border-b border-gray-200"
                  >
                    {item.name}
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => { setMenuOpen(false); setShowQR(true); }}
                  className="neo-btn mt-4"
                >
                  📱 DESCARGAR APP
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* QR Modal - Glass Effect */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-negro-illimani/70 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-md border-3 border-negro-illimani shadow-hard-xl p-0 max-w-sm w-full relative overflow-hidden"
            >
              <div className="bg-gradient-to-r from-arcilla to-orange-500 border-b-3 border-negro-illimani p-3 flex justify-between items-center">
                <span className="font-mono font-bold text-white uppercase text-xs">SYSTEM_QR_V2.exe</span>
                <button onClick={() => setShowQR(false)} className="bg-white border-2 border-negro-illimani w-7 h-7 flex items-center justify-center font-bold hover:bg-negro-illimani hover:text-white transition-colors">×</button>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-display font-black text-negro-illimani mb-2 uppercase">¡Escanea Ya!</h3>
                <p className="text-negro-illimani font-mono text-xs mb-6 border-b-2 border-dashed border-gray-300 pb-4">Acceso directo a la experiencia móvil.</p>

                <div className="bg-gradient-to-br from-arena to-white border-3 border-negro-illimani p-3 mx-auto w-48 h-48 mb-6 shadow-hard-sm">
                  <img src="/imagenes/QRPEE.png" alt="QR Code" className="w-full h-full object-contain" />
                </div>

                <button
                  onClick={() => setShowQR(false)}
                  className="w-full py-3 bg-gradient-to-r from-negro-illimani to-gris-roca text-white font-mono font-bold uppercase hover:shadow-glow transition-all border-3 border-negro-illimani"
                >
                  [ Cerrar Ventana ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-negro-illimani">
        <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="absolute inset-0 will-change-transform">
          <img
            src="/imagenes/fondo-muela-1.avif"
            alt="La Muela del Diablo"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-negro-illimani via-negro-illimani/40 to-transparent" />
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Badge with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/90 backdrop-blur-sm border-3 border-negro-illimani px-4 py-2 shadow-hard rotate-[-2deg] hover:shadow-glow transition-shadow duration-300"
            >
              <p className="text-xs md:text-sm font-mono font-bold text-negro-illimani uppercase tracking-widest">
                📍 La Paz, Bolivia • 3.825 m.s.n.m.
              </p>
            </motion.div>

            <div className="relative py-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[clamp(3.5rem,14vw,12rem)] leading-[0.85] tracking-tighter"
              >
                <span className="font-display text-white drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[6px_6px_0px_#000]">
                  LA MUELA
                </span>
                <span className="block font-display gradient-text [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black] drop-shadow-[4px_4px_0px_#000]">
                  DEL DIABLO
                </span>
              </motion.h1>
            </div>

            {/* Description Box - Glass */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="bg-white/90 backdrop-blur-sm border-3 border-negro-illimani p-4 md:p-5 max-w-2xl mx-auto shadow-hard rotate-[1deg]"
            >
              <p className="text-base md:text-xl font-sans font-medium text-negro-illimani leading-snug">
                Una formación rocosa que desafía al cielo. <br className="hidden md:block" />
                <span className="gradient-text font-bold">La aventura comienza donde termina el asfalto.</span>
              </p>
            </motion.div>

            {/* CTA Buttons with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-col md:flex-row gap-5 pt-6 items-center justify-center w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(217, 78, 31, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => refs?.visitsRef && scrollToSection(refs.visitsRef)}
                className="neo-btn group overflow-hidden"
              >
                <span className="relative z-10">Explorar Ruta</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open("https://youtu.be/rWI3CJuGtqw?si=uctoVK6EGmiFyJMp", "_blank")}
                className="neo-btn-secondary group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-arcilla text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">▶</span>
                  Ver Video
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
