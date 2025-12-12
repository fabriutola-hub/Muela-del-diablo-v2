import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FOOTER_LINKS = {
  explora: [
    { name: "Ruta de Trekking", url: "#" },
    { name: "Historia Geológica", url: "#" },
    { name: "Galería 360°", url: "#" },
    { name: "Cómo Llegar", url: "#" }
  ],
  legal: [
    { name: "Términos de Uso", url: "#" },
    { name: "Política de Privacidad", url: "#" },
    { name: "Licencia de Contenido", url: "#" }
  ],
  social: [
    { icon: "FB", label: "Facebook", url: "#" },
    { icon: "IG", label: "Instagram", url: "#" },
    { icon: "TW", label: "Twitter", url: "#" }
  ]
};

const FooterSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const contactInView = useInView(ref, inViewConfig);

  return (
    <footer ref={ref} className="bg-gradient-to-b from-negro-illimani to-black text-arena overflow-hidden relative">
      {/* Animated Marquee */}
      <div className="bg-gradient-to-r from-arcilla via-orange-500 to-arcilla py-3 overflow-hidden border-b-3 border-white/10">
        <motion.div
          className="whitespace-nowrap font-mono font-bold text-sm uppercase tracking-widest text-white flex gap-8"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="text-lg">★</span> LA PAZ - BOLIVIA
              <span className="text-lg">★</span> 3.825 M.S.N.M.
              <span className="text-lg">★</span> TURISMO DE AVENTURA
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-12 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b-2 border-white/10 pb-16 md:pb-24">
          {/* Newsletter */}
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-mono font-bold uppercase mb-6 gradient-text">
                ✉️ Mantente Conectado
              </h3>
              <p className="text-base md:text-lg font-sans text-gray-400 mb-8 max-w-md leading-relaxed">
                Recibe guías de ruta, alertas meteorológicas y noticias sobre eventos en La Muela.
              </p>

              <form className="flex flex-col md:flex-row gap-0 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="TU CORREO @"
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white px-5 py-4 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-arcilla border-2 border-white/20 md:border-r-0 placeholder:text-gray-500 w-full transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(217, 78, 31, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-arcilla to-orange-500 text-white px-8 py-4 font-bold font-display uppercase tracking-wider border-2 border-arcilla transition-all duration-300 w-full md:w-auto"
                >
                  Suscribir
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white/40 mb-8 tracking-widest border-b border-white/10 pb-2 inline-block">
              Explora
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.explora.map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 8 }}
                    href={link.url}
                    className="text-lg font-display font-bold uppercase hover:gradient-text transition-all flex items-center gap-3 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-arcilla transition-opacity">→</span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="md:col-span-3 flex flex-col justify-between h-full gap-10 md:gap-0">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-white/40 mb-8 tracking-widest border-b border-white/10 pb-2 inline-block">
                Social
              </h4>
              <div className="flex gap-4">
                {FOOTER_LINKS.social.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    className="w-14 h-14 border-2 border-white/30 flex items-center justify-center font-bold text-lg hover:bg-gradient-to-br hover:from-arcilla hover:to-orange-500 hover:border-arcilla transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <ul className="space-y-2 text-sm font-mono text-gray-500">
                {FOOTER_LINKS.legal.map(link => (
                  <li key={link.name}>
                    <a href={link.url} className="hover:text-white hover:underline decoration-arcilla decoration-2 underline-offset-4 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Typography */}
        <div className="pt-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={contactInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(4rem,20vw,22rem)] font-display font-black text-center leading-[0.75] tracking-tighter select-none pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LA MUELA
          </motion.h1>

          <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-white/5 pt-6 text-xs font-mono text-gray-600 uppercase">
            <p>© 2025 PROYECTO TURÍSTICO LA PAZ</p>
            <p className="mt-2 md:mt-0">DISEÑADO CON <span className="text-red-500">❤️</span> EN BOLIVIA</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
