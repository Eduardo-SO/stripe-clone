import { useState, useCallback, useLayoutEffect } from 'react';

const getDimensions = (element: Element): ClientRect =>
  element.getBoundingClientRect();

export const useDimensions = (
  responsive = true,
): (Element | ClientRect | ((e: Element) => void) | null)[] => {
  const [dimensions, setDimensions] = useState<ClientRect | null>(null);
  const [element, setElement] = useState<Element | null>(null);

  const hook = useCallback((e: Element) => setElement(e), []);

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

  return [hook, dimensions, element];
};
