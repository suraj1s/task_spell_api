import React from "react";
import { FavouritesProvider } from "./sotre/context/FavouritesContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpellList from "./components/spell/SpellList";
import SpellDetails from "./components/spell/SpellDetails";
import { SpellProvider } from "./sotre/context/SpellContext";
import FavouritesSpell from "./components/spell/FavouritesSpell";
import Navbar from "./components/static/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navbar>
        <SpellList />
      </Navbar>
    ),
  },
  {
    path: "/spells/:spellIndex",
    element: (
      <Navbar>
        <SpellDetails />
      </Navbar>
    ),
  },
  {
    path: "/favourites",
    element: (
      <Navbar>
        <FavouritesSpell />
      </Navbar>
    ),
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
