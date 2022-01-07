import { useEffect, useState } from 'react';

export function usePageOffset(): { pageXOffset: number; pageYOffset: number } {
  const [pageXOffset, setPageXOffset] = useState(
    globalThis?.window?.pageXOffset,
  );
  const [pageYOffset, setPageYOffset] = useState(
    globalThis?.window?.pageYOffset,
  );

  useEffect(() => {
    function handleScroll() {
      setPageXOffset(globalThis?.window?.pageXOffset);
      setPageYOffset(globalThis?.window?.pageYOffset);
    }
    globalThis?.window?.addEventListener('scroll', handleScroll);

    return () => {
      globalThis?.window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { pageXOffset, pageYOffset };
}
