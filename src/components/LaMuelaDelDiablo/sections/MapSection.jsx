import { forwardRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import LazyMapaInteractivo from '@/components/LazyMapaInteractivo';

const TransportIcon = memo(({ type }) => {
  const icons = {
    bus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    minibus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    taxi: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tour: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 13l6-6 6 6M5 13V5a2 2 0 012-2h6a2 2 0 012 2v8" />
      </svg>
    )
  };
  return icons[type] || icons.bus;
});

TransportIcon.displayName = 'TransportIcon';

const TRANSPORT_OPTIONS = [
  {
    type: "bus",
    title: "Público - San Francisco",
    description: "Minibús hacia 'El Pedregal' o 'Los Pinos'.",
    detail: "2.40 Bs • 40 min",
    gradient: "from-cielo to-blue-400"
  },
  {
    type: "minibus",
    title: "Línea 288 (Directo)",
    description: "Llega hasta Urb. El Pedregal, inicio de ruta.",
    detail: "Frecuencia Alta",
    gradient: "from-paja to-green-400"
  },
  {
    type: "taxi",
    title: "Taxi / Radiomóvil",
    description: "Desde Calacoto hasta la base del cerro.",
    detail: "~20 Bs • Rápido",
    gradient: "from-arcilla to-orange-400"
  },
  {
    type: "tour",
    title: "Tour Organizado",
    description: "Salidas plaza San Francisco con guía.",
    detail: "80-150 Bs",
    gradient: "from-negro-illimani to-gris-roca"
  }
];

const TransportCard = memo(({ item, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ x: 8, scale: 1.02 }}
    className="group cursor-default"
  >
    <div className="neo-card p-0 flex overflow-hidden bg-white/95 backdrop-blur-sm hover:shadow-glow transition-all duration-500">
      {/* Gradient Side Bar */}
      <div className={`w-2 bg-gradient-to-b ${item.gradient} border-r-2 border-negro-illimani`} />

      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-display font-bold text-lg uppercase text-negro-illimani leading-none group-hover:gradient-text transition-all duration-300">
            {item.title}
          </h4>
          <motion.div
            whileHover={{ rotate: 20 }}
            className={`text-white p-2 rounded bg-gradient-to-br ${item.gradient} shadow-sm`}
          >
            <TransportIcon type={item.type} />
          </motion.div>
        </div>

        <p className="text-sm font-sans font-medium text-gray-600 mb-4 leading-snug">
          {item.description}
        </p>

        <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm border-2 border-negro-illimani/30 text-[11px] font-mono font-bold uppercase tracking-wide text-negro-illimani shadow-sm">
          {item.detail}
        </span>
      </div>
    </div>
  </motion.div>
));

TransportCard.displayName = 'TransportCard';

const MapSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const mapInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-gradient-to-b from-white via-arena/50 to-white border-b-3 border-negro-illimani relative overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cielo/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-paja/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-negro-illimani to-gris-roca text-white text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-hard-sm border-2 border-negro-illimani"
            >
              🗺️ Coordenadas & Acceso
            </motion.span>

            <PaintText
              text="Ruta de Exploración"
              className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9]"
              textColor="text-negro-illimani"
              highlightColor="bg-gradient-to-r from-paja to-green-400"
              highlightTextColor="text-white"
              bicolor={true}
              secondaryStartWord="Exploración"
              animationDuration={0.6}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mapInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-block bg-white/90 backdrop-blur-sm border-3 border-negro-illimani px-6 py-3 shadow-hard-sm rotate-1 mt-6 hover:shadow-glow transition-shadow duration-300"
            >
              <p className="text-base md:text-lg font-mono font-bold text-negro-illimani">
                📍 Mallasa • <span className="gradient-text">3,825 m.s.n.m.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-4 mb-6 border-b-3 border-negro-illimani pb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-arcilla to-orange-400 border-2 border-negro-illimani rotate-45" />
              <h3 className="text-xl font-display font-bold uppercase text-negro-illimani">
                Cómo Llegar
              </h3>
            </div>

            {TRANSPORT_OPTIONS.map((item, i) => (
              <TransportCard key={i} item={item} index={i} inView={mapInView} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 p-5 bg-gradient-to-br from-yellow-300 to-yellow-400 border-3 border-negro-illimani shadow-hard-sm flex gap-4 items-start"
            >
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-xs font-mono font-bold text-negro-illimani uppercase leading-tight">
                  Advertencia: Ruta de dificultad media.
                </p>
                <p className="text-xs font-mono text-negro-illimani/70 mt-1">
                  Llevar agua y calzado adecuado.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-8 h-[400px] md:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-full bg-white/95 backdrop-blur-sm border-3 border-negro-illimani shadow-hard-xl relative overflow-hidden">
              {/* Map Header */}
              <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-negro-illimani to-gris-roca border-b-3 border-r-3 border-negro-illimani px-5 py-2.5">
                <span className="font-mono font-bold text-xs uppercase text-white">
                  🛰️ VISTA SATELITAL v3.0
                </span>
              </div>

              <div className="w-full h-full">
                {mapInView && <LazyMapaInteractivo />}
              </div>

              {/* Coordinates */}
              <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                <div className="bg-white/95 backdrop-blur-sm border-2 border-negro-illimani px-3 py-1.5 shadow-sm text-[11px] font-mono font-bold">
                  LAT: -16.541
                </div>
                <div className="bg-white/95 backdrop-blur-sm border-2 border-negro-illimani px-3 py-1.5 shadow-sm text-[11px] font-mono font-bold">
                  LNG: -68.092
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

MapSection.displayName = 'MapSection';

export default MapSection;
