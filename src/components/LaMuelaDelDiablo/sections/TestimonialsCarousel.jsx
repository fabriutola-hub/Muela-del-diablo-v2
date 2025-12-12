import { forwardRef, memo, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { testimonials } from '../constants/testimonials';

const TestimonialCard = memo(({ test }) => (
  <div className="shrink-0 w-[320px] md:w-[400px] p-2">
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="neo-card h-full bg-white/95 backdrop-blur-sm flex flex-col relative group hover:shadow-glow transition-all duration-500 p-0 overflow-hidden"
    >
      {/* Gradient Top Bar */}
      <div className="h-1.5 bg-gradient-to-r from-arcilla via-paja to-arcilla w-full" />

      <div className="px-6 py-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-5 border-b-2 border-dashed border-negro-illimani/10 pb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-negro-illimani to-gris-roca text-white border-2 border-negro-illimani flex items-center justify-center font-display font-bold text-xl shadow-hard-sm">
            {test.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold font-mono text-negro-illimani uppercase text-sm leading-tight truncate max-w-[200px]">
              {test.name}
            </h4>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-1">
              <span>📍 {test.location}</span>
              {test.verified && (
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 border border-green-300 font-bold text-[10px] rounded">✓</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {Array(5).fill(null).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`text-xl ${i < test.rating ? 'text-arcilla' : 'text-gray-200'}`}
            >
              ★
            </motion.span>
          ))}
        </div>

        <p className="font-sans font-medium text-negro-illimani text-base leading-relaxed mb-6 italic flex-grow">
          "{test.quote}"
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-[11px] font-mono text-gray-400 uppercase">
          <span>📅 {test.date || 'Reciente'}</span>
          <span className="font-bold text-green-600">TRIPADVISOR™</span>
        </div>
      </div>
    </motion.div>
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
    <section ref={ref} className="py-24 md:py-36 bg-gradient-to-b from-arena via-white to-arena border-b-3 border-negro-illimani overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-paja/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-arcilla/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            <motion.span
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-block px-5 py-2 bg-white/90 backdrop-blur-sm border-3 border-negro-illimani shadow-hard-sm text-xs font-bold font-mono text-negro-illimani uppercase tracking-widest mb-6 -rotate-2 hover:shadow-glow transition-all duration-300"
            >
              💬 Voces de Viajeros
            </motion.span>

            <PaintText
              text="Historias Auténticas"
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-none tracking-tighter uppercase"
              textColor="text-negro-illimani"
              highlightColor="bg-gradient-to-r from-paja to-green-400"
              highlightTextColor="text-white"
              bicolor={true}
              secondaryStartWord="Auténticas"
              animationDuration={0.6}
            />

            {/* Stats Boxes */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white/90 backdrop-blur-sm border-3 border-negro-illimani shadow-hard px-6 py-4 flex flex-col items-center min-w-[140px] hover:shadow-glow transition-all duration-300"
              >
                <span className="text-3xl font-display font-black gradient-text">4.5 ★</span>
                <span className="text-xs font-mono font-bold uppercase text-gray-500 mt-1">Rating Global</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-gradient-to-br from-negro-illimani to-gris-roca border-3 border-negro-illimani shadow-hard px-6 py-4 flex flex-col items-center min-w-[140px]"
              >
                <span className="text-3xl font-display font-black text-white">150+</span>
                <span className="text-xs font-mono font-bold uppercase text-gray-400 mt-1">Opiniones</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden py-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-arena via-arena/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-arena via-arena/80 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={shouldReduceMotion ? { x: 0 } : { x: [0, -2400] }}
            transition={{
              x: {
                duration: 80,
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(139, 158, 107, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            href="https://www.tripadvisor.es/Attraction_Review-g294072-d554765-Reviews-Muela_del_Diablo-La_Paz_La_Paz_Department.html"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn group inline-flex"
          >
            <span className="flex items-center gap-3">
              Leer más en TripAdvisor
              <span className="w-8 h-8 bg-paja text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">↗</span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

TestimonialsCarousel.displayName = 'TestimonialsCarousel';

export default memo(TestimonialsCarousel);
