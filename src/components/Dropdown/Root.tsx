import React, { useContext, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Context } from './Provider';

import { DropdownSection } from './Section';

interface DropdownArrowProps {
  isFirstInteraction: boolean;
}

export const DropdownRoot: React.FC = () => {
  const { options, cachedId, targetId, getOptionById } = useContext(Context);

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  let [x, width, height] = [0, 0, 0];

  if (cachedOption) {
    const { optionCenterX, contentDimensions } = cachedOption;

    width = contentDimensions?.width || 0;
    height = contentDimensions?.height || 0;
    x = optionCenterX - width / 2;
  }

  const [hovering, setHovering] = useState(false);
  const isActive = targetId !== 0 || hovering;

  const [hasInteracted, setHasInteracted] = useState(false);

  const isFirstInteraction = isActive && !hasInteracted;

  if (isFirstInteraction) {
    setTimeout(() => {
      if (!hasInteracted) setHasInteracted(true);
    }, 15);
  }

  useEffect(() => {
    if (isActive) return;

    const timeout = setTimeout(() => setHasInteracted(false), 0.2 * 1000 * 0.9);

    clearTimeout(timeout);
  }, [isActive]);

  return (
    <div style={{ perspective: 2000 }}>
      <motion.div
        className="dropdown-root"
        animate={{
          opacity: isActive ? 1 : 0,
          rotateX: isActive ? 0 : -15,
        }}
        transition={{
          opacity: { duration: 0.2, delay: 0.05 },
          rotateX: { duration: 0.2, delay: 0.05 },
        }}
      >
        <motion.div
          className="dropdown-container"
          animate={{
            x,
            width,
            height,
            pointerEvents: isActive ? 'unset' : 'none',
          }}
          transition={{
            ease: 'easeOut',
            x: { duration: isFirstInteraction ? 0 : 0.2 },
            width: { duration: isFirstInteraction ? 0 : 0.2 * 0.93 },
            height: { duration: isFirstInteraction ? 0 : 0.2 * 0.93 },
            pointerEvents: { delay: 0.05 },
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
        >
          <DropdownBackground />
          <motion.div
            animate={{
              x: -x,
            }}
            transition={{
              x: { duration: isFirstInteraction ? 0 : undefined },
            }}
          >
            {options.map(item => (
              <DropdownSection key={item.id} option={item} />
            ))}
          </motion.div>
        </motion.div>
        <DropdownArrow isFirstInteraction={isFirstInteraction} />
      </motion.div>
    </div>
  );
};

const DropdownArrow: React.FC<DropdownArrowProps> = ({
  isFirstInteraction,
}) => {
  const { cachedId, getOptionById } = useContext(Context);

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  const x = cachedOption ? cachedOption.optionCenterX : 0;

  return (
    <motion.div
      className="dropdown-arrow"
      initial={{
        opacity: 0,
      }}
      animate={{
        x,
        pointerEvents: 'none',
        opacity: x > 0 ? 1 : 0,
      }}
      transition={{
        ease: 'easeOut',
        x: { duration: isFirstInteraction ? 0 : 0.2 },
      }}
    />
  );
};

const DropdownBackground: React.FC = () => {
  const { cachedId, getOptionById } = useContext(Context);

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  const backgroundHeight = cachedOption?.backgroundHeight || 0;

  return (
    <motion.div
      className="dropdown-background"
      animate={{
        height: backgroundHeight,
      }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
    />
  );
};
