import React, { createContext, useState, useEffect } from 'react';
import { ISpellType } from '../../types';

interface SpellContextProps {
  spells: ISpellType[];
  setSpells: (newSpells: ISpellType[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SpellContext = createContext<SpellContextProps>({
  spells: [],
  setSpells: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const SpellProvider = ({ children } : {children : React.ReactNode}) => {
  const [spells, setSpells] = useState<ISpellType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSpells = async () => {
      setIsLoading(true);
      const response = await fetch('/api/spells');
      const data = await response.json();
      setSpells(data.results);
      setIsLoading(false);
    };

    fetchSpells();
  }, []);

  return (
    <SpellContext.Provider
      value={{ spells, setSpells, isLoading, setIsLoading }}
    >
      {children}
    </SpellContext.Provider>
  );
};

export { SpellContext, SpellProvider };
