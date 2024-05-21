import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

interface NavInterface {
  menu: boolean;
  toggleMenu: () => void;
}

const Nav: React.FC<NavInterface> = ({ menu, toggleMenu }) => {
  const location = useLocation();

  return (
    <>
      <nav
        id="nav"
        className="flex justify-around p-2 h-auto min-h-16 text-2xl"
      >
        <div className="" id="logo">
          <Link to="/Home">
            REAL-IT <FontAwesomeIcon icon={faHouse} />
          </Link>
        </div>
        <ul id="main-nav" className="flex gap-10">
          <li>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/Home"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/Home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/Listing"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/Listing"
            >
              Listing
            </Link>
          </li>
          <li>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/Agents"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/Agents"
            >
              Agents
            </Link>
          </li>
          <li>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/About"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/About"
            >
              About Us
            </Link>
          </li>
        </ul>
        <div
          onClick={toggleMenu}
          className={`flex relative top-1 flex-col gap-[8px] ${menu ? "open" : ""}`}
          id="hamburger"
        >
          <div className="bg-black w-[19px] h-[1px] line" id="line-1"></div>
          <div className="bg-black w-[19px] h-[1px] line" id="line-2"></div>
          <div className="bg-black w-[19px] h-[1px] line" id="line-3"></div>
        </div>
        <ul
          id="hamburger-nav"
          className={`flex flex-col gap-10 transition-all duration-300 ease-in-out ${
            menu ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
        >
          <li onClick={()=>toggleMenu()}>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/Home"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/Home"
            >
              Home
            </Link>
          </li>
          <li onClick={()=>toggleMenu()}>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/Listing"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/Listing"
            >
              Listing
            </Link>
          </li>
          <li onClick={()=>toggleMenu()}>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/Agents"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/Agents"
            >
              Agents
            </Link>
          </li>
          <li onClick={()=>toggleMenu()}>
            <Link
              className={`border-gray-600 pb-1 ${
                location.pathname === "/About"
                  ? "border-b-2"
                  : "hover:border-b-2"
              }`}
              to="/About"
            >
              About Us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
