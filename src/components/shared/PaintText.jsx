import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export default function PaintText({
  text,
  className,
  paintedColor = "rgb(55, 65, 81)",
  unpaintedColor = "rgba(55, 65, 81, 0.2)",
  animationDuration = 0.8, // Un poco más lento para apreciar la elegancia
  staggerDelay = 0.04,
  ease = [0.33, 1, 0.68, 1], // Curva "Cubic Bezier" suave y moderna
  bicolor = false,
  secondaryColor = "#e63946",
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

  // Variantes de la PALABRA (La animación principal)
  const wordVariants = useMemo(() => ({
    hidden: {
      y: "120%", // Empieza totalmente fuera de la vista (abajo)
      rotateX: 40, // Inclinado hacia atrás
      opacity: 0,
      backgroundSize: "0% 100%", // Pintura vacía
    },
    visible: {
      y: "0%",
      rotateX: 0,
      opacity: 1,
      backgroundSize: "100% 100%", // Pintura llena
      transition: {
        // Animación de posición y rotación (El "Pop")
        y: {
          duration: shouldReduceMotion ? 0 : animationDuration,
          ease: ease,
        },
        rotateX: {
          duration: shouldReduceMotion ? 0 : animationDuration,
          ease: ease,
        },
        opacity: { duration: 0.4 }, // Aparece rápido
        // Animación de la pintura (El "Fill") - Ligeramente retrasada para efecto visual
        backgroundSize: {
          duration: animationDuration * 0.8,
          delay: 0.1,
          ease: "easeOut",
        },
      },
    },
  }), [shouldReduceMotion, animationDuration, ease]);

  // Lógica de color (Mantenemos tu lógica intacta)
  const getWordColor = (index) => {
    if (!bicolor) return paintedColor;
    
    if (secondaryStartWord) {
      const startIndex = words.findIndex(word => 
        word.toLowerCase().includes(secondaryStartWord.toLowerCase())
      );
      return (startIndex !== -1 && index >= startIndex) ? secondaryColor : paintedColor;
    }
    
    const midPoint = Math.floor(words.length / 2);
    return index >= midPoint ? secondaryColor : paintedColor;
  };

  return (
    <motion.h2 // Cambiado a h2 o div según semántica, permite mejor SEO
      className={`${className} leading-tight tracking-tight`} // Tracking tight se ve más moderno
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
      style={{ perspective: "1000px" }} // Necesario para el efecto 3D
    >
      {words.map((word, index) => {
        const wordColor = getWordColor(index);
        
        return (
          // WRAPPER: Crea la máscara de recorte (El secreto del look "Agency")
          <span 
            key={`${word}-${index}`} 
            style={{ 
              display: "inline-block", 
              overflow: "hidden", 
              verticalAlign: "bottom",
              marginRight: "0.25em",
              paddingBottom: "0.1em" // Evita cortar letras como g, j, p
            }}
          >
            <motion.span
              variants={wordVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.2 } 
              }}
              style={{
                display: "inline-block",
                color: unpaintedColor,
                // El degradado ahora soporta un ligero brillo en el borde
                backgroundImage: `linear-gradient(to right, ${wordColor}, ${wordColor})`,
                backgroundPosition: "0 0",
                backgroundRepeat: "no-repeat",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                willChange: "transform, background-size", // Optimización GPU
                transformOrigin: "bottom center", // Rotación desde la base
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
}