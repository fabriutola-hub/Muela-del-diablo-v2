import { forwardRef, memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { historyTimeline } from '../constants/historyTimeline';

const TimelineItem = memo(({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center justify-between mb-20 md:mb-28 w-full ${isEven ? "md:flex-row-reverse" : "md:flex-row"} flex-col`}
    >
      <div className="hidden md:block w-5/12" />

      {/* Timeline Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          whileHover={{ scale: 1.3, rotate: 45 }}
          className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-arcilla to-orange-500 border-3 border-negro-illimani shadow-hard-sm cursor-pointer"
        />
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className={`w-full md:w-5/12 pl-14 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}
      >
        <div className="neo-card p-0 relative overflow-hidden group bg-white/95 backdrop-blur-sm hover:shadow-glow transition-all duration-500">
          {/* Gradient Top Bar */}
          <div className="h-1 bg-gradient-to-r from-arcilla via-orange-400 to-paja w-full" />

          <div className="p-6 md:p-8">
            {/* Number Background */}
            <span className={`absolute -bottom-8 text-[7rem] font-display font-black text-gray-100/50 select-none z-0 group-hover:text-arcilla/10 transition-colors duration-500 ${isEven ? '-left-4' : '-right-4'}`}>
              {index + 1}
            </span>

            <div className="relative z-10">
              {/* Year Badge */}
              <div className={`mb-5 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-2 text-sm font-mono font-bold text-white bg-gradient-to-r from-negro-illimani to-gris-roca border-2 border-negro-illimani shadow-hard-sm"
                >
                  {item.year}
                </motion.span>
              </div>

              <h3 className="text-xl md:text-2xl font-display font-black uppercase leading-none mb-4 text-negro-illimani group-hover:gradient-text transition-all duration-300">
                {item.title}
              </h3>

              <p className="text-base md:text-lg font-sans font-medium text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const HistoryTimeline = forwardRef((props, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-gradient-to-b from-arena via-white to-arena border-b-3 border-negro-illimani overflow-hidden relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#D94E1F08_1px,transparent_1px),linear-gradient(to_bottom,#D94E1F08_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-4 py-2 mb-6 text-xs font-bold font-mono tracking-widest uppercase text-white bg-gradient-to-r from-negro-illimani to-gris-roca border-2 border-negro-illimani shadow-hard-sm"
            >
              ⏳ Cronología Histórica
            </motion.span>

            <PaintText
              text="Milenios de Historia Viva"
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter font-black uppercase"
              textColor="text-negro-illimani"
              highlightColor="bg-gradient-to-r from-arcilla to-red-500"
              highlightTextColor="text-white"
              bicolor={true}
              secondaryStartWord="Historia"
              animationDuration={0.6}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-base md:text-xl font-sans font-medium text-gray-600 leading-relaxed mt-8 border-t-3 border-negro-illimani/20 pt-8"
            >
              Un viaje a través del tiempo en Auki Kollo, donde cada estrato geológico
              cuenta la <span className="gradient-text font-bold">formación de los Andes</span>.
            </motion.p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Base Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2" />

          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-arcilla via-orange-400 to-paja origin-top -translate-x-1/2 z-10"
          />

          <div className="relative z-10 pt-10">
            {historyTimeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-4 md:left-1/2 w-8 h-8 bg-gradient-to-br from-arcilla to-orange-500 border-4 border-negro-illimani -translate-x-1/2 translate-y-1/2 z-20 rotate-45 shadow-hard-sm"
          />
        </div>
      </div>
    </section>
  );
});

HistoryTimeline.displayName = 'HistoryTimeline';

export default HistoryTimeline;
