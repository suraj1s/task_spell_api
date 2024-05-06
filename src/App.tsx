import React from "react";
import { FavouritesProvider } from "./sotre/context/FavouritesContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpellList from "./components/spell/SpellList";
import SpellDetails from "./components/spell/SpellDetails";
import { SpellProvider } from "./sotre/context/SpellContext";
import FavouritesSpell from "./components/spell/FavouritesSpell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpellList />,
  },
  {
    path: "/spells/:spellIndex",
    element: <SpellDetails />,
  },
  {
    path: "/favourites",
    element: <FavouritesSpell />,
  },
]);

const App: React.FC = () => {
  return (
    <SpellProvider>
      <FavouritesProvider>
        <RouterProvider router={router} />
      </FavouritesProvider>
    </SpellProvider>
  );
};

export default App;
