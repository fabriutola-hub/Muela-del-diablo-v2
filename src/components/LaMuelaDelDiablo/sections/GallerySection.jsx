import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { galleryImages } from '../constants/galleryImages';

// --- Subcomponente: Tarjeta de Galería (Estilo Diapositiva / Polaroid) ---
const GalleryCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "backOut" }}
      // Aplicamos clases de grid (col/row span) y estilo base
      className={`${item.col} ${item.row} group relative perspective-1000 z-0 hover:z-20`}
    >
      <div 
        // CLASE NEO-CARD: La base del estilo
        className="neo-card w-full h-full p-3 bg-white flex flex-col hover:-rotate-1 transition-transform duration-300"
      >
        {/* Contenedor de Imagen (Marco interno negro) */}
        <div className="relative flex-grow overflow-hidden border-2 border-negro-illimani bg-gray-200">
          <img
            src={item.img}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
            loading="lazy"
            decoding="async"
          />
          
          {/* Overlay de "Ver más" (Solo aparece en hover) */}
          <div className="absolute inset-0 bg-arcilla/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-white font-display font-black text-3xl uppercase tracking-tighter drop-shadow-[4px_4px_0px_black]">
              Ver Foto
            </span>
          </div>
        </div>

        {/* Pie de Foto (Estilo Etiqueta) */}
        <div className="mt-3 flex justify-between items-end">
          <div>
            <span className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">
              FIG. {index + 1}
            </span>
            <h4 className="text-lg font-display font-bold text-negro-illimani leading-none uppercase">
              {item.caption}
            </h4>
          </div>
          
          {/* Icono decorativo */}
          <div className="w-6 h-6 border-2 border-black flex items-center justify-center bg-paja group-hover:bg-arcilla transition-colors">
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Componente Principal ---
const GallerySection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-100px", amount: 0.1 };
  const galleryInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-32 bg-arena border-b-3 border-negro-illimani relative overflow-hidden">
      
      {/* Fondo Decorativo: Ruido sutil y líneas */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-multiply" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-white border-2 border-black shadow-hard-sm font-mono text-xs font-bold uppercase tracking-widest mb-6 rotate-2">
              Archivo Fotográfico
            </span>
            
            <div className="mb-6">
              <PaintText
                text="Captura la Magia"
                className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-none tracking-tighter uppercase"
                textColor="text-negro-illimani"
                highlightColor="bg-paja" // Verde Paja para variar la paleta
                highlightTextColor="text-negro-illimani"
                bicolor={true}
                secondaryStartWord="Magia"
                animationDuration={0.6}
              />
            </div>

            <p className="mt-4 text-xl font-sans font-medium text-negro-illimani max-w-lg mx-auto bg-white/50 p-2 border-l-4 border-arcilla">
              Fragmentos congelados en el tiempo. <br/>
              Una mirada única al Auki Kollo.
            </p>
          </motion.div>
        </div>

        {/* Grid Masonry (Layout Irregular) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px] w-full p-4">
          {galleryImages.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Botón final de "Cargar más" o "Ver todo" (Opcional) */}
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
