import React from 'react';

interface DropdownOptionProps {
  name: string;
  content?: React.ReactNode;
}

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  name,
  content: Content,
}) => {
  return (
    <button type="button" className="dropdown-option">
      {name}
    </button>
  );
};
