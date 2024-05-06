import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Spell } from "../../types/spell";
import { baseUrl } from "../../constants/api";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";

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
      <h2 className="text-3xl font-semibold py-4">Spell Details</h2>

      {spell ? (
        <div className="flex flex-col sm:flex-row gap-10 ">
          <div className=" border rounded-lg p-5 h-fit w-full sm:w-fit">
            <h3 className="text-2xl font-bold mb-2">{spell.name}</h3>
            <p>Level: {spell.level}</p>
            <p>School: {spell.school.name}</p>
            <p>Casting Time: {spell.casting_time}</p>
            <p>Range: {spell.range}</p>
            {spell.components && (
              <p>Components: {spell.components.join(", ")}</p>
            )}
            {spell.ritual && <p>Ritual: Yes</p>}
            {spell.duration && <p>Duration: {spell.duration}</p>}
            {spell.concentration && <p>Concentration: Yes</p>}
            <div>
              <div className="mb-4">
                <p>Classes:</p>
                <ul className="list-disc pl-4">
                  {spell.classes &&
                    spell.classes.map((klass) => (
                      <li key={klass.index}>{klass.name}</li>
                    ))}
                </ul>
              </div>
              {spell.subclasses && (
                <div className="mb-4">
                  <p>Subclasses:</p>
                  <ul className="list-disc pl-4">
                    {spell.subclasses.map((subclass) => (
                      <li key={subclass.index}>{subclass.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

            <div>
          <div className="max-w-3xl border rounded-lg p-5 h-fit w-fit">
              <p>Description:</p>
              <ul>
                {spell.desc &&
                  spell.desc.map((descItem, index) => (
                    <li key={index} className="mb-2">
                      {descItem}
                    </li>
                  ))}
              </ul>
            </div>
          <button
            className={`py-2 px-4 rounded text-sm font-bold my-8 ${
              isFavourited ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={handleFavouriteToggle}
          >
            {isFavourited ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Spell not found.</p>
      )}
    </div>
  );
};

export default SpellDetails;
