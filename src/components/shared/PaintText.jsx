import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export default function PaintText({
  text,
  className,
  // Colores por defecto de tu paleta Neo-Brutalista
  textColor = "text-negro-illimani", // Color base (Negro)
  highlightColor = "bg-arcilla",     // Color del resaltado (Naranja/Arcilla)
  highlightTextColor = "text-white", // Color del texto cuando está resaltado
  animationDuration = 0.6, 
  staggerDelay = 0.05,
  ease = [0.25, 1, 0.5, 1], // Curva más "rápida" y técnica
  bicolor = false,
  secondaryStartWord = null
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  // Variantes del contenedor (Orquestador)
  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  }), [shouldReduceMotion, staggerDelay]);

  // Variantes de la PALABRA (Bloque sólido)
  const wordVariants = useMemo(() => ({
    hidden: {
      y: "110%", // Escondido justo debajo
      opacity: 0,
      rotate: 3, // Ligeramente rotado para dar sensación de "papel desordenado" al entrar
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: {
        y: {
          duration: shouldReduceMotion ? 0 : animationDuration,
          ease: ease,
        },
        rotate: {
          duration: animationDuration,
          ease: "easeOut",
        },
        opacity: { duration: 0.2 }
      },
    },
  }), [shouldReduceMotion, animationDuration, ease]);

  // Lógica para decidir si una palabra lleva "Resaltador" (Highlighter)
  const isHighlighted = (index) => {
    if (!bicolor) return false;
    
    if (secondaryStartWord) {
      const startIndex = words.findIndex(word => 
        word.toLowerCase().includes(secondaryStartWord.toLowerCase())
      );
      return startIndex !== -1 && index >= startIndex;
    }
    
    const midPoint = Math.floor(words.length / 2);
    return index >= midPoint;
  };

  return (
    <motion.h2 
      className={`${className} font-display leading-[0.9] tracking-tight`} // Forzamos font-display
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
    >
      {words.map((word, index) => {
        const highlighted = isHighlighted(index);
        
        return (
          // MÁSCARA DE RECORTE (Clipping Mask)
          <span 
            key={`${word}-${index}`} 
            className="inline-block overflow-hidden align-bottom mr-[0.2em] pb-[0.1em]"
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block px-1 relative ${highlighted ? `${highlightTextColor}` : textColor}`}
            >
              {/* CAPA DE RESALTADO (Highlighter) - Solo aparece si highlighted es true */}
              {highlighted && (
                <span 
                  className={`absolute inset-0 ${highlightColor} -z-10 transform skew-x-[-10deg] border-2 border-black shadow-[2px_2px_0px_black]`}
                ></span>
              )}
              
              {/* PALABRA */}
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
}