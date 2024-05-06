import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";
import { SpellContext } from "../../sotre/context/SpellContext";
import { baseUrl } from "../../constants/api";

const SpellList: React.FC = () => {
  const { spells, setSpells } = useContext(SpellContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  useEffect(() => {
    const fetchSpells = async () => {
      const response = await fetch(`${baseUrl}/spells`);
      const data = await response.json();
      setSpells(data.results);
    };
    fetchSpells();
  }, [setSpells]);

  return (
    <div className="container mx-auto p-4">
      <Link to={"/favourites"}>
        <button
          className={`mt-2 py-1 px-2 rounded text-sm bg-blue-500 text-white`}
        >
          Favroits
        </button>
      </Link>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {spells.map((spell) => (
          <li
            key={spell.index}
            className={`p-4 rounded-md shadow-md hover:bg-gray-100 ${
                favourites.some((item) => item.index === spell.index) ? "bg-blue-100" : ""
            }`}
          >
            <Link
              to={`/spells/${spell.index}`}
              className="text-xl font-bold block mb-2"
            >
              {spell.name}
            </Link>
            <p className="text-gray-600">Level: {spell.level}</p>
            <button
              className={`mt-2 py-1 px-2 rounded text-sm ${
                favourites.some((item) => item.index === spell.index)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
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
