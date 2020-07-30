import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useDimensions } from './dimensions';
import { Context } from './Provider';

interface DropdownOptionProps {
  name: string;
  content: React.FC;
  backgroundHeight?: number;
}

let lastOptionId = 0;

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  name,
  backgroundHeight,
  content: Content,
}) => {
  const idRef = useRef((lastOptionId += 1));
  const id = idRef.current;

  const { hook, dimensions } = useDimensions();
  const [registered, setRegistered] = useState(false);

  const {
    registerOption,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && dimensions) {
      const WrappedContent: React.FC = () => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          const contentDimensions = contentRef.current?.getBoundingClientRect();

          updateOptionProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions: dimensions,
        optionCenterX: dimensions.x + dimensions.width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);
    } else if (registered && dimensions) {
      updateOptionProps(id, {
        optionDimensions: dimensions,
        optionCenterX: dimensions.x + dimensions.width / 2,
      });
    }
  }, [
    backgroundHeight,
    dimensions,
    id,
    registerOption,
    registered,
    updateOptionProps,
  ]);

  return (
    <motion.button type="button" className="dropdown-option" ref={hook}>
      {name}
    </motion.button>
  );
};
