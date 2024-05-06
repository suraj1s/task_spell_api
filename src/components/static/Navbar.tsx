import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = ({children} : {children  : React.ReactNode}) => {
    const navLinks = [
        {
            title : "Home",
            link : "/"
        },
        {
            title : "Favourites",
            link : "/favourites"
        },
        ]
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-10">
    <div className="flex sticky top-2  items-center justify-center mx-auto py-2 px-10 gap-5 border border-slate-300 rounded-3xl  w-fit  bg-slate-900 backdrop-blur-md backdrop-brightness-90 ">
        {
            Array.isArray(navLinks) && 
            navLinks.map((item , index) => (
                <NavLink to={item.link} key={index}  >
                    {item.title}
                </NavLink>
            ))
        }
    </div>
    {
        children
    }

    </div>
  )
}

export default Navbar