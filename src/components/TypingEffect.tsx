import * as React from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  text: string;
  duration: number;
  delay: number;
};

export function TypingEffect({
  text = 'Typing Effect',
  duration = 0.2,
  delay = 0.1,
}: Props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration, delay: index * delay }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
