import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Chatbot from '@/components/shared/Chatbot';
// 👇 Asegúrate de que la carpeta se llame exactamente 'Hooks' (con mayúscula) o 'hooks' en tu proyecto
import { useSectionRefs } from './Hooks/useSectionRefs';

// Lazy load secciones
const HeroSection = lazy(() => import('./sections/HeroSection'));
const StatsSection = lazy(() => import('./sections/StatsSection'));
const IntroSection = lazy(() => import('./sections/IntroSection'));
const ExperiencesSection = lazy(() => import('./sections/ExperiencesSection'));
const HistoryTimeline = lazy(() => import('./sections/HistoryTimeline'));
const GallerySection = lazy(() => import('./sections/GallerySection'));
const Visor360Section = lazy(() => import('./sections/Visor360Section'));
const TestimonialsCarousel = lazy(() => import('./sections/TestimonialsCarousel'));
const MapSection = lazy(() => import('./sections/MapSection'));
const FooterSection = lazy(() => import('./sections/FooterSection'));

export default function LaMuelaDelDiablo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedVisor, setSelectedVisor] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  
  const refs = useSectionRefs();

  useEffect(() => {
    // Timer para simular carga o esperar animaciones iniciales
    const timer = setTimeout(() => setIsLoaded(true), 8450);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const handleOpenVisor = (item) => {
    setSelectedVisor(item);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseVisor = () => {
    setSelectedVisor(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen />}
      </AnimatePresence>

      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <div className="bg-black text-white">
          
          {/* Suspense maneja la carga perezosa de los componentes */}
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <HeroSection 
              isLoaded={isLoaded}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              scrollToSection={scrollToSection}
              refs={refs}
            />
            
            <StatsSection ref={refs.statsRef} />
            
            <IntroSection 
              ref={refs.introRef}
              scrollToSection={scrollToSection}
              mapRef={refs.mapRef}
            />
            
            {/* Asegúrate de que useSectionRefs devuelva 'visitsRef'. Si da error, verifica el nombre en el hook */}
            <ExperiencesSection ref={refs.visitsRef} />
            
            <HistoryTimeline ref={refs.historyRef} />
            
            <GallerySection ref={refs.galleryRef} />
            
            <Visor360Section 
              ref={refs.visor360Ref}
              selectedVisor={selectedVisor}
              handleOpenVisor={handleOpenVisor}
              handleCloseVisor={handleCloseVisor}
            />
            
            <TestimonialsCarousel 
              ref={refs.testimonialsRef}
              shouldReduceMotion={shouldReduceMotion}
            />
            
            <MapSection ref={refs.mapRef} />
            
            <FooterSection ref={refs.contactRef} />
          </Suspense>
          
          <Chatbot />
        </div>
      </div>
    </>
  );
}