import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useSpring, useTransform, animate } from "framer-motion";

export default function LoadingScreen() {
  // Lógica del Progreso
  const count = useSpring(0, { stiffness: 30, damping: 20 });
  const roundedCount = useTransform(count, (latest) => Math.round(latest));
  const widthProgress = useTransform(count, [0, 100], ["0%", "100%"]);

  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = useMemo(() => [
    "INICIANDO MOTOR...",
    "CARGANDO TEXTURAS...",
    "CALIBRANDO ALTITUD...",
    "BIENVENIDO A LA PAZ"
  ], []);

  useEffect(() => {
    // Animación de 0 a 100 en 5 segundos
    const controls = animate(count, 100, { duration: 5, ease: "easeInOut" });
    
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev < phases.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => {
      controls.stop();
      clearInterval(phaseInterval);
    };
  }, [count, phases.length]);

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[999] bg-arena flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      
      {/* Contenedor Principal */}
      <div className="w-full max-w-4xl px-6 md:px-12 flex flex-col items-start relative z-10">
        
        {/* Header Técnico */}
        <div className="w-full flex justify-between items-end border-b-3 border-negro-illimani pb-2 mb-4">
            <span className="font-mono font-bold text-xs md:text-sm uppercase tracking-widest text-negro-illimani">
                La Muela del Diablo v2.0
            </span>
            <span className="font-mono font-bold text-xs md:text-sm text-arcilla">
                EST. 3825 MSNM
            </span>
        </div>

        {/* Contador Gigante (CORREGIDO) */}
        <div className="relative w-full flex items-baseline justify-start">
            {/* 1. El número animado AISLADO en su propio motion.span */}
            <motion.span className="block text-[20vw] md:text-[15rem] font-display font-black text-negro-illimani leading-[0.8] tracking-tighter select-none">
                {roundedCount}
            </motion.span>
            
            {/* 2. El símbolo de porcentaje SEPARADO */}
            <span className="text-4xl md:text-6xl text-transparent text-stroke-black ml-2 -translate-y-4 md:-translate-y-8">
                %
            </span>
        </div>

        {/* Barra de Progreso Masiva */}
        <div className="w-full h-8 md:h-12 border-3 border-negro-illimani mt-6 p-1 bg-white shadow-hard">
            <motion.div 
                className="h-full bg-arcilla"
                style={{ width: widthProgress }}
            />
        </div>

        {/* Footer de Carga */}
        <div className="w-full flex justify-between items-start mt-6 font-mono text-xs md:text-sm font-bold text-negro-illimani uppercase tracking-wider">
            <div className="flex flex-col">
                <span className="text-gray-500 mb-1">STATUS:</span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentPhase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-negro-illimani bg-paja/20 px-2"
                    >
                        {phases[currentPhase]}
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="text-right flex flex-col">
                <span className="text-gray-500 mb-1">UBICACIÓN:</span>
                <span>ZONA SUR, LA PAZ</span>
            </div>
        </div>

      </div>

      {/* Decoración de Fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#000000_2px,transparent_2px),linear-gradient(to_bottom,#000000_2px,transparent_2px)] bg-[size:6rem_6rem]" />

    </motion.div>
  );
}