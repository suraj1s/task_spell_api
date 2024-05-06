import React, { createContext, useState, useEffect } from "react";

interface IFavorites  {
  name : string  
  level : number
  index : string
}

interface FavouritesContextProps {
  favourites: IFavorites[];
  setFavourites: (newFavourites: IFavorites[]) => void;
  addToFavourites: (spellIndex: IFavorites) => void;
  removeFromFavourites: (spellIndex: string) => void;
}

const FavouritesContext = createContext<FavouritesContextProps>({
  favourites: [],
  setFavourites: () => {},
  addToFavourites: () => {},
  removeFromFavourites: () => {},
});

const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<IFavorites[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourite_spells");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const addToFavourites = (spellIndex: IFavorites) => {
    setFavourites([...favourites, spellIndex]);
    localStorage.setItem(
      "favourite_spells",
      JSON.stringify([...favourites, spellIndex])
    );
  };

  const removeFromFavourites = (spellIndex: string) => {
    setFavourites(favourites.filter((item) => item.index !== spellIndex));
    localStorage.setItem(
      "favourite_spells",
      JSON.stringify(favourites.filter((item) => item.index !== spellIndex))
    );
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        setFavourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesContext, FavouritesProvider };
