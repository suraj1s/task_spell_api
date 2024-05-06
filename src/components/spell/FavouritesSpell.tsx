import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";
import { SpellContext } from "../../sotre/context/SpellContext";
import { ISpellType } from "../../types";

const FavouritesSpell: React.FC = () => {
  const { spells } = useContext(SpellContext);
  const [filteredSpell, setFilteredSpell] = useState<ISpellType[]>([]);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  useEffect(() => {
    console.log(favourites, spells);
    const temp = spells.filter((spell: ISpellType) =>
      favourites.some((item) => item.index === spell.index)
    );
    setFilteredSpell(temp);
  }, [favourites, spells]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold py-4">Favourites</h2>
      {filteredSpell.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {" "}
          {filteredSpell.map((spell) => (
            <li
              key={spell.index}
              className={`p-4 rounded-md shadow-md hover:bg-slate-700 ${
                favourites.some((item) => item.index === spell.index)
                  ? "bg-slate-800"
                  : ""
              }`}
            >
              <Link
                to={`/spells/${spell.index}`}
                className="text-xl font-bold block mb-2"
              >
                {spell.name}
              </Link>
              <p className="text-slate-400">Level: {spell.level}</p>
              <button
                className={`mt-2 py-1 px-2 rounded text-sm ${
                  favourites.some((item) => item.index === spell.index)
                    ? "bg-blue-500 text-slate-200"
                    : "bg-slate-600"
                }`}
                onClick={() =>
                  favourites.some((item) => item.index === spell.index)
                    ? removeFromFavourites(spell.index)
                    : addToFavourites({
                        name: spell?.name,
                        level: spell?.level,
                        index: spell?.index,
                      })
                }
              >
                {favourites.some((item) => item.index === spell.index)
                  ? "Remove from Favourites"
                  : "Add to Favourites"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorited spells yet.</p>
      )}
    </div>
  );
};

export default FavouritesSpell;
