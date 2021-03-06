import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

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
    registered,
    registerOption,
    deleteOptionById,
    updateOptionProps,
  ]);

  useEffect(() => deleteOptionById(id), [deleteOptionById, id]);

  const handleOpen = useCallback(() => {
    !isMobile && setTargetId(id);
  }, [id, isMobile, setTargetId]);

  const handleClose = useCallback(() => {
    !isMobile && setTargetId(0);
  }, [isMobile, setTargetId]);

  const handleTouch = useCallback(() => setIsMobile(true), []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      return targetId === id ? handleClose() : handleOpen();
    },
    [handleClose, handleOpen, id, targetId],
  );

  return (
    <motion.button
      type="button"
      className="dropdown-option"
      ref={hook}
      onMouseDown={handleClick}
      onHoverStart={handleOpen}
      onHoverEnd={handleClose}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  );
};
