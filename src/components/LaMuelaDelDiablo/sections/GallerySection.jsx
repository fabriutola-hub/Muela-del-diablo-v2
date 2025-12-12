import { forwardRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { galleryImages } from '../constants/galleryImages';

const GalleryCard = memo(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.02, zIndex: 20 }}
    className={`${item.col} ${item.row} group relative cursor-pointer`}
  >
    <div className="neo-card w-full h-full p-0 bg-white overflow-hidden hover:shadow-glow-lg transition-all duration-500">
      <div className="relative h-full overflow-hidden">
        <img
          src={item.img}
          alt={item.alt}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-negro-illimani/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-arcilla/0 group-hover:bg-arcilla/20 transition-colors duration-300 mix-blend-overlay" />

        {/* Figure Number Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border-2 border-negro-illimani px-2 py-1 shadow-sm z-10 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono font-bold text-negro-illimani uppercase">
            FIG. {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* View Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/95 backdrop-blur-sm border-3 border-negro-illimani px-6 py-3 shadow-hard"
          >
            <span className="text-negro-illimani font-display font-bold text-lg uppercase">
              Ver Foto
            </span>
          </motion.div>
        </motion.div>

        {/* Caption Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-3 border-negro-illimani p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h4 className="text-base font-display font-bold text-negro-illimani leading-none uppercase truncate">
            {item.caption}
          </h4>
        </div>
      </div>
    </div>
  </motion.div>
));

GalleryCard.displayName = 'GalleryCard';

const GallerySection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const galleryInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-gradient-to-b from-arena to-white border-b-3 border-negro-illimani relative overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-paja/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-arcilla/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              whileHover={{ rotate: 0 }}
              className="inline-block px-5 py-2 bg-white/90 backdrop-blur-sm border-3 border-negro-illimani shadow-hard-sm font-mono text-xs font-bold uppercase tracking-widest mb-6 rotate-2 hover:shadow-glow transition-shadow duration-300"
            >
              📸 Archivo Fotográfico
            </motion.span>

            <PaintText
              text="Captura la Magia"
              className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-none tracking-tighter uppercase"
              textColor="text-negro-illimani"
              highlightColor="bg-gradient-to-r from-paja to-green-400"
              highlightTextColor="text-white"
              bicolor={true}
              secondaryStartWord="Magia"
              animationDuration={0.6}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={galleryInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-6 text-base md:text-xl font-sans font-medium text-negro-illimani/80 max-w-lg mx-auto"
            >
              Fragmentos congelados en el tiempo. <br />
              <span className="gradient-text font-semibold">Una mirada única al Auki Kollo.</span>
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
          {galleryImages.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={galleryInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(74, 144, 226, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="neo-btn-secondary group"
          >
            <span className="flex items-center gap-3">
              Explorar Galería Completa
              <span className="w-8 h-8 bg-cielo text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">→</span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
