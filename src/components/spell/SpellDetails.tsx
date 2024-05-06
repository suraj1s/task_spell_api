import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";
import { Spell } from "../../types/spell";
import { baseUrl } from "../../constants/api";

const SpellDetails: React.FC = () => {
  const { spellIndex } = useParams();
  const [spell, setSpell] = useState<Spell | null>(null);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  useEffect(() => {
    const fetchSpellDetails = async () => {
      const response = await fetch(`${baseUrl}/spells/${spellIndex}`);
      const data = await response.json();
      setSpell(data);
    };

    if (spellIndex) {
      fetchSpellDetails();
    }
  }, [spellIndex]);

  const isFavourited = favourites.some((item) => item.index === spellIndex);

  const handleFavouriteToggle = () => {
    if (!spell) return;
    if (isFavourited) {
      removeFromFavourites(spellIndex || "");
    } else {
      addToFavourites({
        name: spell?.name,
        level: spell?.level,
        index: spell?.index,
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      {spell ? (
        <>
          <h2>{spell.name}</h2>
          <p>Level: {spell.level}</p>
          <p className="mb-4">
            Description:{" "}
            {spell.desc ? spell.desc[0] : "No description avilable"}
          </p>
          {/* Render other spell details like casting time, components, etc. */}
          <button
            className={`py-2 px-4 rounded text-sm font-bold ${
              isFavourited ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={handleFavouriteToggle}
          >
            {isFavourited ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </>
      ) : (
        <p>Spell not found.</p>
      )}
    </div>
  );
};

export default SpellDetails;
