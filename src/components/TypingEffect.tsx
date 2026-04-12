import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  duration: number;
  delay: number;
  className?: string;
};

export function TypingEffect({
  text = 'Typing Effect',
  duration = 0.2,
  delay = 0.1,
  className,
}: Props) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(ref, { once: false });
  const characters = Array.from(text);
  const characterCounts = new Map<string, number>();

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={className}>
      {characters.map((letter, index) => {
        const count = (characterCounts.get(letter) ?? 0) + 1;
        const key = `${text}-${letter}-${count}`;
        characterCounts.set(letter, count);

        return (
          <motion.span
            key={key}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration, delay: index * delay }}
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
}
