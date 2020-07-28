import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useDimensions } from './dimensions';
import { Context } from './Provider';

interface DropdownOptionProps {
  name: string;
  backgroundHeight?: number;
}

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  name,
  backgroundHeight,
  children,
}) => {
  const [lastOptionId, setLastOptionId] = useState(0);
  const [registered, setRegistered] = useState(false);

  const idRef = useRef(lastOptionId + 1);
  const id = idRef.current;

  const [optionHook, optionDimentions] = useDimensions<ClientRect | null>();

  const {
    registerOption,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && optionDimentions) {
      const WrappedContent = (): React.ReactElement => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          const contentDimensions = contentRef.current?.getBoundingClientRect();
          updateOptionProps(id, { contentDimensions });
        }, []);

        return <div ref={contentRef}>{children}</div>;
      };
    }

    if (optionDimentions) {
      registerOption({
        id,
        optionDimentions,
        optionCenterX: optionDimentions.x + optionDimentions.width / 2,
        WrappedContent,
        backgroundHeight,
      });
    }

    setRegistered(true);
  }, [
    backgroundHeight,
    children,
    id,
    optionDimentions,
    registerOption,
    registered,
    targetId,
    updateOptionProps,
  ]);

  return (
    <motion.button type="button" className="dropdown-option">
      {name}
    </motion.button>
  );
};
