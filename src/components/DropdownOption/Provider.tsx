import React, { useState, createContext, useCallback, useEffect } from 'react';

interface Item {
  id: number;
  optionDimensions: DOMRect;
  contentDimensions?: DOMRect;
  optionCenterX: number;
  WrappedContent: React.FC;
  backgroundHeight: number | undefined;
}

interface UpdateOptionProps {
  contentDimensions?: DOMRect | undefined;
  optionDimensions?: DOMRect;
  optionCenterX?: number;
}

interface DropdownContextData {
  options: Item[];
  targetId: number;
  cachedId: number;
  setCachedId: React.Dispatch<React.SetStateAction<number>>;
  setTargetId: React.Dispatch<React.SetStateAction<number>>;
  registerOption(item: Item): void;
  updateOptionProps(optionId: number, props: UpdateOptionProps): void;
  getOptionById(id: number): Item | undefined;
  deleteOptionById(id: number): void;
}

export const Context = createContext<DropdownContextData>(
  {} as DropdownContextData,
);

export const DropdownProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<Item[]>([]);
  const [targetId, setTargetId] = useState(0);
  const [cachedId, setCachedId] = useState(0);

  const registerOption = useCallback(
    ({
      id,
      optionDimensions,
      optionCenterX,
      WrappedContent,
      backgroundHeight,
    }: Item) =>
      setOptions(items => [
        ...items,
        {
          id,
          optionDimensions,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]),
    [],
  );

  const updateOptionProps = useCallback(
    (optionId, props) =>
      setOptions(items =>
        items.map(item => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }

          return item;
        }),
      ),
    [],
  );

  const getOptionById = useCallback(
    (id: number) => options.find(item => item.id === id),
    [options],
  );

  const deleteOptionById = useCallback(
    (id: number) => setOptions(items => items.filter(item => item.id !== id)),
    [],
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
        setCachedId,
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
