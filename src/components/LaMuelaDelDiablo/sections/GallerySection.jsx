import { forwardRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { galleryImages } from '../constants/galleryImages';

const GalleryCard = memo(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.05, duration: 0.4, ease: "backOut" }}
    className={`${item.col} ${item.row} group relative perspective-1000 z-0 hover:z-20`}
  >
    <div className="neo-card w-full h-full p-3 bg-white flex flex-col hover:-rotate-1 transition-transform duration-300">
      <div className="relative flex-grow overflow-hidden border-2 border-negro-illimani bg-gray-200">
        <img
          src={item.img}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-arcilla/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white font-display font-black text-3xl uppercase tracking-tighter drop-shadow-[4px_4px_0px_black]">
            Ver Foto
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-end">
        <div>
          <span className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">
            FIG. {index + 1}
          </span>
          <h4 className="text-lg font-display font-bold text-negro-illimani leading-none uppercase">
            {item.caption}
          </h4>
        </div>

        <div className="w-6 h-6 border-2 border-black flex items-center justify-center bg-paja group-hover:bg-arcilla transition-colors">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
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
    <section ref={ref} className="py-20 md:py-32 bg-arena border-b-3 border-negro-illimani relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-white border-2 border-black shadow-hard-sm font-mono text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 rotate-2">
              Archivo Fotográfico
            </span>

            <div className="mb-4 md:mb-6">
              <PaintText
                text="Captura la Magia"
                className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-none tracking-tighter uppercase"
                textColor="text-negro-illimani"
                highlightColor="bg-paja"
                highlightTextColor="text-negro-illimani"
                bicolor={true}
                secondaryStartWord="Magia"
                animationDuration={0.6}
              />
            </div>

            <p className="mt-2 md:mt-4 text-base md:text-xl font-sans font-medium text-negro-illimani max-w-lg mx-auto bg-white/50 p-2 border-l-4 border-arcilla">
              Fragmentos congelados en el tiempo. <br />
              Una mirada única al Auki Kollo.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px] w-full p-0 md:p-4">
          {galleryImages.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="neo-btn-secondary">
            Explorar Galería Completa
          </button>
        </div>
      </div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
