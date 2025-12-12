import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, useEffect, memo } from "react";

const PaintText = memo(function PaintText({
  text,
  className,
  textColor = "text-negro-illimani",
  highlightColor = "bg-arcilla",
  highlightTextColor = "text-white",
  animationDuration = 0.6,
  staggerDelay = 0.05,
  ease = [0.25, 1, 0.5, 1],
  bicolor = false,
  secondaryStartWord = null
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const words = useMemo(() => text.split(" "), [text]);

  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  }), [shouldReduceMotion, staggerDelay]);

  const wordVariants = useMemo(() => ({
    hidden: {
      y: "110%",
      opacity: 0,
      rotate: isMobile ? 0 : 3,
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
  }), [shouldReduceMotion, animationDuration, ease, isMobile]);

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
      className={`${className} font-display leading-[0.9] tracking-tight`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
    >
      {words.map((word, index) => {
        const highlighted = isHighlighted(index);

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom mr-[0.2em] pb-[0.1em]"
          >
            <motion.span
              variants={wordVariants}
              style={{ willChange: 'transform' }}
              className={`inline-block px-1 relative ${highlighted ? `${highlightTextColor}` : textColor}`}
            >
              {highlighted && (
                <span
                  className={`absolute inset-0 ${highlightColor} -z-10 transform skew-x-[-10deg] border-2 border-black shadow-[2px_2px_0px_black]`}
                />
              )}
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
});

export default PaintText;
