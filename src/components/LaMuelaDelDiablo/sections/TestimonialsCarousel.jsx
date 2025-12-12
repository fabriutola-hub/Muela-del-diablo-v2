import { forwardRef, memo, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { testimonials } from '../constants/testimonials';

const TestimonialCard = memo(({ test }) => (
  <div className="shrink-0 w-[300px] md:w-[400px] p-2">
    <div className="neo-card h-full bg-white flex flex-col relative group hover:bg-paja/20 transition-colors p-0">
      <div className="h-2 bg-negro-illimani w-full mb-4" />

      <div className="px-6 pb-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4 border-b-2 border-dashed border-negro-illimani/20 pb-4">
          <div className="w-12 h-12 bg-negro-illimani text-white border-2 border-black flex items-center justify-center font-display font-bold text-xl shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            {test.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold font-mono text-negro-illimani uppercase text-sm leading-tight truncate max-w-[200px]">
              {test.name}
            </h4>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-1">
              <span>{test.location}</span>
              {test.verified && (
                <span className="bg-green-100 text-green-800 px-1 border border-green-800 font-bold text-[10px]">VERIFICADO</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-4 text-arcilla">
          {Array(5).fill(null).map((_, i) => (
            <span key={i} className={`text-xl ${i < test.rating ? 'opacity-100' : 'opacity-20 text-gray-400'}`}>
              ★
            </span>
          ))}
        </div>

        <p className="font-sans font-medium text-negro-illimani text-base leading-relaxed mb-6 italic flex-grow">
          "{test.quote}"
        </p>

        <div className="mt-auto pt-4 border-t-2 border-dashed border-negro-illimani/20 flex justify-between items-center opacity-60 font-mono text-xs">
          <span className="uppercase">FECHA: {test.date || 'RECIENTE'}</span>
          <span className="font-bold">TRIPADVISOR™</span>
        </div>
      </div>
    </div>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialsCarousel = forwardRef(({ shouldReduceMotion }, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const testimonialsInView = useInView(ref, inViewConfig);

  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    []
  );

  return (
    <section ref={ref} className="py-20 md:py-32 bg-arena border-b-3 border-negro-illimani overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        <div className="text-center mb-10 md:mb-20">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            <span className="inline-block px-3 py-1 bg-white border-3 border-negro-illimani shadow-hard-sm text-xs font-bold font-mono text-negro-illimani uppercase tracking-widest mb-4 md:mb-6 -rotate-2">
              Voces de Viajeros
            </span>

            <div className="mb-6 md:mb-10">
              <PaintText
                text="Historias Auténticas"
                className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-none tracking-tighter uppercase"
                textColor="text-negro-illimani"
                highlightColor="bg-paja"
                highlightTextColor="text-negro-illimani"
                bicolor={true}
                secondaryStartWord="Auténticas"
                animationDuration={0.6}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12">
              <div className="bg-white border-3 border-negro-illimani shadow-hard px-4 py-3 md:px-6 md:py-4 flex flex-col items-center min-w-[120px] md:min-w-[140px]">
                <span className="text-2xl md:text-3xl font-display font-black text-arcilla">4.5 ★</span>
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase text-gray-500">Rating Global</span>
              </div>
              <div className="bg-negro-illimani border-3 border-negro-illimani shadow-hard px-4 py-3 md:px-6 md:py-4 flex flex-col items-center min-w-[120px] md:min-w-[140px]">
                <span className="text-2xl md:text-3xl font-display font-black text-white">150+</span>
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase text-gray-400">Opiniones</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-arena to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-arena to-transparent z-10" />

          <motion.div
            className="flex gap-8"
            animate={shouldReduceMotion ? { x: 0 } : { x: [0, -2000] }}
            transition={{
              x: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {duplicatedTestimonials.map((test, i) => (
              <TestimonialCard key={i} test={test} />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-16">
          <a
            href="https://www.tripadvisor.es/Attraction_Review-g294072-d554765-Reviews-Muela_del_Diablo-La_Paz_La_Paz_Department.html"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn group"
          >
            Leer más en TripAdvisor
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
});

TestimonialsCarousel.displayName = 'TestimonialsCarousel';

export default memo(TestimonialsCarousel);
