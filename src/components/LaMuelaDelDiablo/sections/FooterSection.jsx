import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FooterSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const contactInView = useInView(ref, inViewConfig);

  const footerLinks = {
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

  return (
    <footer ref={ref} className="bg-negro-illimani text-arena border-t-3 border-negro-illimani overflow-hidden relative">
      
      {/* Decoración superior: Marquee (Texto en movimiento) */}
      <div className="bg-arcilla py-3 overflow-hidden border-b-3 border-white/20">
        <motion.div 
          className="whitespace-nowrap font-mono font-bold text-sm uppercase tracking-widest text-white flex gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i}>★ LA PAZ - BOLIVIA ★ 3.825 M.S.N.M. ★ TURISMO DE AVENTURA ★</span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-20 pb-8">
        
        {/* Grid Principal */}
        <div className="grid md:grid-cols-12 gap-12 border-b-3 border-white/20 pb-20">
          
          {/* Columna 1: Branding y Newsletter (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-mono font-bold uppercase mb-6 text-arcilla">
                Mantente Conectado
              </h3>
              <p className="text-lg font-sans text-gray-400 mb-8 max-w-md">
                Recibe guías de ruta, alertas meteorológicas y noticias sobre eventos en La Muela.
              </p>
              
              {/* Newsletter Input Neo-Brutalista */}
              <form className="flex gap-0 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="TU CORREO @" 
                  className="flex-1 bg-white text-negro-illimani px-6 py-4 font-mono font-bold focus:outline-none border-3 border-white border-r-0 placeholder:text-gray-500"
                />
                <button className="bg-arcilla text-white px-8 py-4 font-bold font-display uppercase tracking-wider border-3 border-white hover:bg-orange-600 transition-colors">
                  Suscribir
                </button>
              </form>
            </motion.div>
          </div>

          {/* Columna 2: Enlaces (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-mono font-bold uppercase text-white/50 mb-8 tracking-widest border-b border-white/20 pb-2 inline-block">
              Explora
            </h4>
            <ul className="space-y-4">
              {footerLinks.explora.map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-xl font-display font-bold uppercase hover:text-arcilla hover:ml-2 transition-all flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 text-arcilla">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Social y Legal (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between h-full">
            <div>
              <h4 className="text-sm font-mono font-bold uppercase text-white/50 mb-8 tracking-widest border-b border-white/20 pb-2 inline-block">
                Social
              </h4>
              <div className="flex gap-4">
                {footerLinks.social.map((social) => (
                  <a 
                    key={social.label} 
                    href={social.url}
                    className="w-12 h-12 border-2 border-white flex items-center justify-center font-bold hover:bg-white hover:text-negro-illimani transition-colors rounded-none"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-12 md:mt-0">
               <ul className="space-y-2 text-sm font-mono text-gray-500">
                  {footerLinks.legal.map(link => (
                    <li key={link.name}>
                      <a href={link.url} className="hover:text-white hover:underline decoration-arcilla decoration-2 underline-offset-4">
                        {link.name}
                      </a>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>

        {/* Footer Inferior: Typography Gigante */}
        <div className="pt-8">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={contactInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-[clamp(4rem,18vw,20rem)] font-display font-black text-center leading-[0.75] tracking-tighter text-white select-none opacity-10 md:opacity-20 pointer-events-none"
          >
            LA MUELA
          </motion.h1>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-white/10 pt-4 text-xs font-mono text-gray-600 uppercase">
            <p>© 2025 PROYECTO TURÍSTICO LA PAZ</p>
            <p>DISEÑADO CON ❤️ EN BOLIVIA</p>
          </div>
        </div>

      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
