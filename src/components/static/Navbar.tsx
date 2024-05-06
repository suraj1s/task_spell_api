import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FavouritesContext } from "../../sotre/context/FavouritesContext";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Favourites",
      link: "/favourites",
    },
  ];

  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-10">
      <div className="flex sticky top-2  items-center justify-center mx-auto py-2 px-10 gap-5 border border-slate-300 rounded-3xl  w-fit  bg-slate-900 backdrop-blur-md backdrop-brightness-90 ">
        {Array.isArray(navLinks) &&
          navLinks.map((item, index) => (
            <div className="relative" key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-slate-50"
                    : " font-medium text-slate-300"
                }
              >
                {item.title}
                {item.title === "Favourites" && (
                  <p className="absolute top-4 -right-4 text-[12px] bg-red-500 text-slate-300 rounded-full size-4 flex items-center justify-center ">
                    {favourites.length}
                  </p>
                )}
              </NavLink>
            </div>
          ))}
      </div>
      {children}
    </div>
  );
};

export default Navbar;
