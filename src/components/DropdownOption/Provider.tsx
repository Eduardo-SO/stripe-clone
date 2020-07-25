import React, { useState, createContext, useCallback, useEffect } from 'react';

interface Item {
  id: number;
  optionDimensions: number;
  optionCenterX: number;
  WrappedContent: number;
  backgroundHeight: number;
}

export const Context = createContext({});

export const DropdownProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<Item[]>([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCachedId] = useState(null);

  const registerOption = useCallback(
    ({
      id,
      optionDimensions,
      optionCenterX,
      WrappedContent,
      backgroundHeight,
    }) => {
      setOptions(items => [
        ...items,
        {
          id,
          optionDimensions,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]);
    },
    [setOptions],
  );

  const updateOptionProps = useCallback(
    (optionId, props) => {
      setOptions(items =>
        items.map(item => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }

          return item;
        }),
      );
    },
    [setOptions],
  );

  const getOptionById = useCallback(
    id => options.find(item => item.id === id),
    [options],
  );

  const deleteOptionById = useCallback(
    id => setOptions(items => items.filter(item => item.id !== id)),
    [setOptions],
  );

  useEffect(() => {
    if (targetId !== null) setCachedId(targetId);
  }, [targetId]);

  return (
    <Context.Provider
      value={{
        registerOption,
        updateOptionProps,
        getOptionById,
        deleteOptionById,
      }}
    >
      {children}
    </Context.Provider>
  );
};
