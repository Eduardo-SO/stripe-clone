import { useState, useCallback, useLayoutEffect } from 'react';

interface Dimensions {
  hook(e: HTMLButtonElement): void;
  dimensions: DOMRect | undefined;
  element: HTMLButtonElement | undefined;
}

const getDimensions = (element: HTMLElement): DOMRect =>
  element.getBoundingClientRect();

export const useDimensions = (responsive = true): Dimensions => {
  const [dimensions, setDimensions] = useState<DOMRect>();
  const [element, setElement] = useState<HTMLButtonElement>();

  const hook = useCallback((e: HTMLButtonElement) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimensions = (): void => {
        window.requestAnimationFrame(() => {
          return setDimensions(getDimensions(element));
        });
      };

      updateDimensions();

      if (responsive) {
        console.log('oasjnd');
        window.addEventListener('resize', updateDimensions);

        return () => {
          window.removeEventListener('resize', updateDimensions);
        };
      }
    }

    return undefined;
  }, [element, hook, responsive]);

  return { hook, dimensions, element };
};
