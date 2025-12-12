import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useSectionRefs } from './Hooks/useSectionRefs';

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

const SectionFallback = () => (
  <div className="min-h-[50vh] bg-arena flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-arcilla border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function LaMuelaDelDiablo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedVisor, setSelectedVisor] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const refs = useSectionRefs();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const handleResize = () => {
      requestAnimationFrame(checkMobile);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadTime = isMobile ? 1500 : 2500;
    const timer = setTimeout(() => setIsLoaded(true), loadTime);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const scrollToSection = useMemo(() => (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }, []);

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
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <HeroSection
              isLoaded={isLoaded}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              scrollToSection={scrollToSection}
              refs={refs}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <StatsSection ref={refs.statsRef} />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <IntroSection
              ref={refs.introRef}
              scrollToSection={scrollToSection}
              mapRef={refs.mapRef}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ExperiencesSection ref={refs.visitsRef} />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <HistoryTimeline ref={refs.historyRef} />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <GallerySection ref={refs.galleryRef} />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Visor360Section
              ref={refs.visor360Ref}
              selectedVisor={selectedVisor}
              handleOpenVisor={handleOpenVisor}
              handleCloseVisor={handleCloseVisor}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <TestimonialsCarousel
              ref={refs.testimonialsRef}
              shouldReduceMotion={shouldReduceMotion}
            />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <MapSection ref={refs.mapRef} />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <FooterSection ref={refs.contactRef} />
          </Suspense>
        </div>
      </div>
    </>
  );
}