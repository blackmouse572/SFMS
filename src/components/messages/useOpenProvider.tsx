import React, { createContext, ReactNode, useContext, useState } from 'react';

interface OpenContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const OpenContext = createContext<OpenContextProps | undefined>(undefined);

export const OpenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <OpenContext.Provider value={{ isOpen, setIsOpen }}>{children}</OpenContext.Provider>;
};

export const useOpen = (): OpenContextProps => {
  const context = useContext(OpenContext)!;

  return context;
};
