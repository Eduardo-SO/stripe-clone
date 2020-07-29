import { useState, useCallback, useLayoutEffect } from 'react';

interface Dimensions {
  hook(e: HTMLButtonElement): void;
  dimensions: DOMRect | undefined;
  element: HTMLButtonElement | undefined;
}

const getDimensions = (element: Element): DOMRect =>
  element.getBoundingClientRect();

export const useDimensions = (responsive = true): Dimensions => {
  const [dimensions, setDimensions] = useState<DOMRect>();
  const [element, setElement] = useState<HTMLButtonElement | undefined>();

  const hook = useCallback((e: HTMLButtonElement) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimensions = (): void => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      };

      updateDimensions();

      if (responsive) {
        window.addEventListener('resize', updateDimensions);

        window.removeEventListener('resize', updateDimensions);
      }
    }
  }, [element, responsive]);

  return { hook, dimensions, element };
};
