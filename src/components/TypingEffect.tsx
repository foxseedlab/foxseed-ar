import * as React from 'react';
import { motion, useInView } from 'framer-motion';

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
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const isInView = useInView(ref, { once: false });

  React.useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isInView, text]);

  return (
    <div ref={ref} className={className}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration, delay: index * delay }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
