import { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center } from '@react-three/drei';
import PaintText from '@/components/shared/PaintText';
// Asegúrate de que la ruta de importación sea correcta según tu estructura
import IntroModel from './IntroModel'; 

const IntroSection = forwardRef(function IntroSection(
  { scrollToSection, mapRef },
  ref
) {
  const modelContainerRef = useRef(null);

  // 1. Detección de dispositivo móvil para optimización
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // Throttle simple para resize
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configuración para animaciones de TEXTO (se ejecuta una vez)
  const inViewConfig = { once: true, margin: '-50px', amount: 0.1 };
  const introInView = useInView(ref, inViewConfig);

  // 2. Configuración para RENDERIZADO 3D (se actualiza constantemente)
  // Esto permite pausar el Canvas cuando no se ve
  const modelInView = useInView(modelContainerRef, { margin: "100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'circOut' },
    },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-arena border-b-3 border-negro-illimani overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          
          {/*Columna de Texto */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={introInView ? 'visible' : 'hidden'}
            className="flex flex-col items-start"
          >
            {/* Badge Estilo Etiqueta */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={introInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block px-3 py-1 bg-negro-illimani text-white font-mono font-bold uppercase tracking-widest mb-8 shadow-hard-sm border-2 border-transparent"
            >
              Descubre
            </motion.span>

            <div className="mb-6 md:mb-10 relative z-10">
              <PaintText
                text="Un Ícono Geológico"
                className="text-[clamp(2.5rem,7vw,7rem)] font-black leading-[0.9] tracking-tight uppercase"
                // Colores Neo-Brutalistas
                textColor="text-negro-illimani"
                highlightColor="bg-arcilla" 
                highlightTextColor="text-white"
                bicolor={true}
                secondaryStartWord="Geológico"
                animationDuration={0.6}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-4 md:space-y-6 text-base md:text-xl text-negro-illimani font-sans font-medium leading-relaxed max-w-xl border-l-3 border-arcilla pl-4 md:pl-6"
            >
              <p>
                La Muela del Diablo es una formación rocosa de <span className="font-bold bg-white px-1 border-2 border-black">3,650 metros</span> que
                domina el horizonte de La Paz. Su silueta inconfundible ha inspirado
                leyendas durante siglos.
              </p>
              <p>
                Visible desde toda la ciudad, este monumento natural es el destino
                perfecto para aventureros que buscan conectar con la naturaleza y la
                cultura andina.
              </p>
            </motion.div>

            {/* Botón Neo-Brutalista */}
            <div className="mt-12">
                <button
                onClick={() => scrollToSection(mapRef)}
                className="neo-btn group"
                >
                Cómo Llegar
                <svg
                    className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="square" // Bordes rectos en iconos
                    strokeLinejoin="miter"
                    strokeWidth={3}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
                </button>
            </div>
          </motion.div>

          {/* Columna Modelo 3D - Estilo "Caja de Exhibición" */}
          <motion.div
            ref={modelContainerRef}
            initial={{ opacity: 0, x: 20 }}
            animate={introInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            // Caja blanca con borde grueso y sombra dura
            className="relative h-[400px] md:h-[600px] lg:h-[700px] w-full bg-white border-3 border-negro-illimani shadow-hard overflow-hidden"
          >
            {/* Decoración de esquina */}
            <div className="absolute top-0 left-0 bg-negro-illimani text-white px-2 py-1 font-mono text-xs z-10 border-b-3 border-r-3 border-white">
                FIG. 01: VISTA AÉREA
            </div>

            <Canvas
              camera={{ 
                position: [0, 2, 9],
                fov: 45,
                near: 0.1,
                far: 2000
              }}
              // OPTIMIZACIÓN 3: Ajustes de renderizado
              dpr={isMobile ? [1, 1] : [1, 1.5]} // Menor resolución en móvil
              frameloop={modelInView ? "always" : "never"} // Pausa render si no se ve
              shadows={!isMobile} // Sin sombras en móvil
              gl={{ 
                alpha: true, 
                antialias: !isMobile, // Sin antialias en móvil
                preserveDrawingBuffer: true,
                powerPreference: "high-performance"
              }}
            >
              <ambientLight intensity={1.2} />
              
              {/* OPTIMIZACIÓN 4: Luces condicionales */}
              <directionalLight 
                intensity={2.5} 
                position={[5, 10, 5]} 
                castShadow={!isMobile} 
                shadow-mapSize={[512, 512]} // Mapa de sombras más pequeño
              />
              <directionalLight intensity={1} position={[-5, 5, -5]} color="#D94E1F" />

              <Bounds fit clip observe margin={0.5}>
                <Center>
                  <group rotation={[0, -Math.PI * 0.4, 0]}>
                    <IntroModel />
                  </group>
                </Center>
              </Bounds>

              <OrbitControls
                autoRotate={modelInView} // Solo rotar si se está viendo
                autoRotateSpeed={1.0}
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                makeDefault
              />
            </Canvas>
            
            {/* Overlay de interacción */}
            <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="bg-white/80 border-2 border-black px-2 py-1 text-xs font-mono font-bold uppercase text-black">
                    ⟳ Arrastra para girar
                </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;
