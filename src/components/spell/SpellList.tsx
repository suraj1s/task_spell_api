import React, {  useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";
import { SpellContext } from "../../sotre/context/SpellContext";

const SpellList: React.FC = () => {
  const { spells } = useContext(SpellContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);



  return (
    <div className="container mx-auto p-4">
             <h2 className="text-3xl font-semibold py-4">Spell List</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {spells.map((spell) => (
          <li
            key={spell.index}
            className={`p-4  shadow-md hover:bg-slate-700  border rounded-lg ${
                favourites.some((item) => item.index === spell.index) ? "bg-slate-800" : ""
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
    </div>
  );
};

export default SpellList;
