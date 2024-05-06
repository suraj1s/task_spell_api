import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";
import { Spell } from "../../types/spell";
import { SpellContext } from "../../sotre/context/SpellContext";

const FavouritesSpell: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const { spells } = useContext(SpellContext);
  const [filteredSpell, setFilteredSpell] = useState<Spell[]>([]);

  useEffect(() => {
    console.log(favourites, spells);
    const temp = spells.filter((spell: Spell) =>
    favourites.some((item) => item.index === spell.index)
    );
    setFilteredSpell(temp);
  }, [favourites, spells]);

  return (
    <div className="container mx-auto px-4">
      <h2>Favourites</h2>
      {filteredSpell.length > 0 ? (
        <ul>
          {filteredSpell.map((spell) => (
            <li key={spell.index}>
              <Link to={`/spells/${spell.index}`}>{spell.name}</Link> (Level:{" "}
              {spell.level})
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
