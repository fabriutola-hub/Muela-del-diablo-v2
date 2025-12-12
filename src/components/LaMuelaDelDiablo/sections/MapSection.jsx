import { forwardRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import LazyMapaInteractivo from '@/components/LazyMapaInteractivo';

const TransportIcon = memo(({ type }) => {
  const icons = {
    bus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    minibus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    taxi: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tour: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 13l6-6 6 6M5 13V5a2 2 0 012-2h6a2 2 0 012 2v8" />
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
    bgIcon: "bg-cielo"
  },
  {
    type: "minibus",
    title: "Línea 288 (Directo)",
    description: "Llega hasta Urb. El Pedregal, inicio de ruta.",
    detail: "Frecuencia Alta",
    bgIcon: "bg-paja"
  },
  {
    type: "taxi",
    title: "Taxi / Radiomóvil",
    description: "Desde Calacoto hasta la base del cerro.",
    detail: "~20 Bs • Rápido",
    bgIcon: "bg-arcilla"
  },
  {
    type: "tour",
    title: "Tour Organizado",
    description: "Salidas plaza San Francisco con guía.",
    detail: "80-150 Bs",
    bgIcon: "bg-negro-illimani"
  }
];

const TransportCard = memo(({ item, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="neo-card p-0 flex overflow-hidden group cursor-default hover:translate-x-2"
  >
    <div className={`w-3 ${item.bgIcon} border-r-2 border-negro-illimani`} />

    <div className="p-5 flex-1 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-display font-bold text-lg uppercase text-negro-illimani leading-none">
          {item.title}
        </h4>
        <div className="text-negro-illimani">
          <TransportIcon type={item.type} />
        </div>
      </div>

      <p className="text-sm font-sans font-medium text-gray-600 mb-3 leading-tight">
        {item.description}
      </p>

      <span className="inline-block px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono font-bold uppercase tracking-wide text-negro-illimani">
        {item.detail}
      </span>
    </div>
  </motion.div>
));

TransportCard.displayName = 'TransportCard';

const MapSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const mapInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white border-b-3 border-negro-illimani relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-negro-illimani text-white text-xs font-mono font-bold uppercase tracking-widest mb-4 md:mb-6 shadow-hard-sm">
              Coordenadas & Acceso
            </span>

            <div className="mb-6 md:mb-8">
              <PaintText
                text="Ruta de Exploración"
                className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9]"
                textColor="text-negro-illimani"
                highlightColor="bg-paja"
                highlightTextColor="text-negro-illimani"
                bicolor={true}
                secondaryStartWord="Exploración"
                animationDuration={0.6}
              />
            </div>

            <div className="inline-block bg-arena border-2 border-negro-illimani px-4 py-2 md:px-6 md:py-3 shadow-hard-sm rotate-1">
              <p className="text-base md:text-lg font-mono font-bold text-negro-illimani">
                📍 Mallasa • 3,825 m.s.n.m.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4 mb-6 border-b-3 border-negro-illimani pb-2">
              <div className="w-4 h-4 bg-arcilla border-2 border-black" />
              <h3 className="text-xl font-display font-bold uppercase text-negro-illimani">
                Cómo Llegar
              </h3>
            </div>

            {TRANSPORT_OPTIONS.map((item, i) => (
              <TransportCard key={i} item={item} index={i} inView={mapInView} />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={mapInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 bg-yellow-300 border-3 border-negro-illimani shadow-hard-sm flex gap-4 items-start"
            >
              <span className="text-2xl">⚠️</span>
              <p className="text-xs font-mono font-bold text-negro-illimani uppercase leading-tight">
                Advertencia: Ruta de dificultad media. Llevar agua y calzado adecuado.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-8 h-[400px] md:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-full bg-white border-3 border-negro-illimani shadow-hard relative group overflow-hidden">
              <div className="absolute top-0 left-0 z-20 bg-white border-b-3 border-r-3 border-negro-illimani px-4 py-2">
                <span className="font-mono font-bold text-xs uppercase text-negro-illimani">
                  VISTA SATELITAL v.2.0
                </span>
              </div>

              <div className="w-full h-full transition-all duration-500">
                {mapInView && <LazyMapaInteractivo />}
              </div>

              <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                <div className="bg-white border-2 border-black px-2 py-1 shadow-hard-sm text-[10px] font-bold">
                  LAT: -16.541
                </div>
                <div className="bg-white border-2 border-black px-2 py-1 shadow-hard-sm text-[10px] font-bold">
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
