import React, { createContext, useState, useEffect } from 'react';
import { Spell } from '../../types/spell';

interface SpellContextProps {
  spells: Spell[];
  setSpells: (newSpells: Spell[]) => void;
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
  const [spells, setSpells] = useState<Spell[]>([]);
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
