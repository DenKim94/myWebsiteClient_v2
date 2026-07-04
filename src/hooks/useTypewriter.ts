import { useEffect, useRef, useState } from 'react';

interface TypewriterOptions {
  /** Delay per typed character (ms). */
  type?: number;
  /** Delay per deleted character (ms). */
  del?: number;
  /** Hold duration once a word is complete (ms). */
  hold?: number;
}

type Phase = 'typing' | 'holding' | 'deleting';

/**
 * Types words one after another, holds, deletes and switches to the next word.
 * Respects `prefers-reduced-motion` (then shows the last word statically).
 * @param words Words to cycle through.
 * @param options Timing options.
 * @returns The currently visible text.
 */
export function useTypewriter(words: string[], options: TypewriterOptions = {}): string {
  const { type = 95, del = 55, hold = 1600 } = options;
  const reduce = useRef(
    typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ).current;

  const [text, setText] = useState(reduce ? (words[words.length - 1] ?? '') : '');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    if (reduce) return undefined;
    const word = words[index % words.length] ?? '';
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), type);
      } else {
        timer = setTimeout(() => setPhase('holding'), hold);
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('deleting'), hold);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(word.slice(0, text.length - 1)), del);
      } else {
        setPhase('typing');
        setIndex((v) => v + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, index, words, type, del, hold, reduce]);

  return text;
}
