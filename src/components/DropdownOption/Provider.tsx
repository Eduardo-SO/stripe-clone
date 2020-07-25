import React, { useState, createContext, useCallback, useEffect } from 'react';

interface Item {
  id: number;
  optionDimensions: number;
  optionCenterX: number;
  WrappedContent: number;
  backgroundHeight: number;
}

interface DropdownContextData {
  options: Item[];
  targetId: number | null;
  cachedId: number | null;
  setTargetId: React.Dispatch<React.SetStateAction<null>>;
  registerOption(item: Item): void;
  updateOptionProps(optionId: number, props: any): void;
  getOptionById(id: number): Item | undefined;
  deleteOptionById(id: number): void;
}

export const Context = createContext<DropdownContextData>(
  {} as DropdownContextData,
);

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
        options,
        targetId,
        cachedId,
        setTargetId,
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
