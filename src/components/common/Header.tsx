import React from "react";
import NavLink from "./NavLink";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink
          title="Rick and Morty"
          link={"/"}
          className="text-xl font-bold"
        />
        <nav>
          <NavLink title="Home" link={"/"} />
          <NavLink title="Dashboard" link={"/dashboard"} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
