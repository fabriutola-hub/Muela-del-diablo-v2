import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FooterSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const contactInView = useInView(ref, inViewConfig);

  const footerLinks = {
    experiences: ["Trekking", "Cultura", "Fotografía"],
    info: ["FAQ", "Blog", "Seguridad", "Contacto"],
    social: [
      { icon: "📘", label: "Facebook", url: "#" },
      { icon: "📷", label: "Instagram", url: "#" },
      { icon: "🐦", label: "Twitter", url: "#" }
    ]
  };

  return (
    <footer ref={ref} className="py-20 bg-black border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="text-3xl font-black mb-4">LA MUELA</div>
            <p className="text-white/60 leading-relaxed">
              Descubre el ícono geológico de Bolivia.
            </p>
          </motion.div>
          
          {/* Experiencias */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">
              Experiencias
            </h3>
            <ul className="space-y-3">
              {footerLinks.experiences.map(item => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a 
                    href="#" 
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Información */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">
              Información
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map(item => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a 
                    href="#" 
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">
              Síguenos
            </h3>
            <div className="flex gap-4">
              {footerLinks.social.map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.url}
                  aria-label={social.label}
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="pt-8 border-t border-white/10 text-center text-white/40 text-sm"
        >
          © 2025 La Muela del Diablo. Diseñado con ❤️ en Bolivia.
        </motion.div>
      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
