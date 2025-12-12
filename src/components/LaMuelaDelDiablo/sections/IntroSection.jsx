import { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center } from '@react-three/drei';
import PaintText from '@/components/shared/PaintText';
import IntroModel from './IntroModel';

const IntroSection = forwardRef(function IntroSection(
  { scrollToSection, mapRef },
  ref
) {
  const modelContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const inViewConfig = { once: true, margin: '-50px', amount: 0.1 };
  const introInView = useInView(ref, inViewConfig);
  const modelInView = useInView(modelContainerRef, { margin: "0px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={ref} className="py-24 md:py-36 bg-arena border-b-3 border-negro-illimani overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={introInView ? 'visible' : 'hidden'}
            className="flex flex-col items-start"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={introInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block px-4 py-2 bg-negro-illimani text-white font-mono font-bold uppercase tracking-widest mb-8 shadow-hard-sm border-3 border-negro-illimani"
            >
              ✦ Descubre
            </motion.span>

            <div className="mb-8 md:mb-12 relative z-10">
              <PaintText
                text="Un Ícono Geológico"
                className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.9] tracking-tight uppercase"
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
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-5 text-base md:text-xl text-negro-illimani font-sans font-medium leading-relaxed max-w-xl border-l-4 border-arcilla pl-5 md:pl-7"
            >
              <p>
                La Muela del Diablo es una formación rocosa de{' '}
                <span className="font-bold bg-white px-2 py-0.5 border-2 border-negro-illimani">3,650 metros</span>{' '}
                que domina el horizonte de La Paz. Su silueta inconfundible ha inspirado
                leyendas durante siglos.
              </p>
              <p className="text-negro-illimani/80">
                Visible desde toda la ciudad, este monumento natural es el destino
                perfecto para aventureros que buscan conectar con la naturaleza y la
                cultura andina.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(mapRef)}
                className="neo-btn group"
              >
                Cómo Llegar
                <svg
                  className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Model Container */}
          <motion.div
            ref={modelContainerRef}
            initial={{ opacity: 0, x: 30 }}
            animate={introInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] lg:h-[700px] w-full"
          >
            <div className="absolute inset-0 bg-white border-3 border-negro-illimani shadow-hard-xl overflow-hidden">
              <div className="absolute top-0 left-0 bg-negro-illimani text-white px-4 py-2 font-mono text-xs z-10 border-b-3 border-r-3 border-negro-illimani">
                FIG. 01: VISTA AÉREA 3D
              </div>

              <div className="absolute top-0 right-0 bg-arcilla text-white px-3 py-1 font-mono text-[10px] z-10 border-b-2 border-l-2 border-negro-illimani">
                INTERACTIVO
              </div>

              <Canvas
                camera={{
                  position: [0, 2, 9],
                  fov: 45,
                  near: 0.1,
                  far: 2000
                }}
                dpr={isMobile ? [1, 1] : [1, 1.5]}
                frameloop={modelInView ? "always" : "never"}
                shadows={!isMobile}
                performance={{ min: 0.5 }}
                gl={{
                  alpha: true,
                  antialias: !isMobile,
                  preserveDrawingBuffer: false,
                  powerPreference: "high-performance",
                  stencil: false,
                  depth: true
                }}
              >
                <ambientLight intensity={1.2} />
                <directionalLight
                  intensity={2.5}
                  position={[5, 10, 5]}
                  castShadow={!isMobile}
                  shadow-mapSize={[512, 512]}
                  shadow-bias={-0.0001}
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
                  autoRotate={modelInView}
                  autoRotateSpeed={1.0}
                  enablePan={false}
                  enableZoom={false}
                  enableRotate={true}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                  makeDefault
                />
              </Canvas>

              <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="bg-white border-2 border-negro-illimani px-3 py-1.5 text-xs font-mono font-bold uppercase text-negro-illimani shadow-hard-sm">
                  ⟳ Arrastra para girar
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;
