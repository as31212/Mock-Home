import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useLocation } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";

interface NavInterface{
  menu: boolean;
  toggleMenu: ()=> void;
}

const Nav : React.FC<NavInterface> = ({menu,toggleMenu})=>{
    
    const location = useLocation();

    return(
        <>
        <nav className='flex justify-around p-2 h-auto min-h-16 text-2xl'>
        <div className='' id="logo">
            <Link to='/Home'>REAL-IT <FontAwesomeIcon icon={faHouse} /></Link>
        </div>
            <ul id='main-nav' className='flex gap-10'>
            <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/Home' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Home">
            Home
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/Listing' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Listing">
            Listing
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/Agents' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Agents">
            Agents
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/About' ? 'border-b-2' : 'hover:border-b-2'}`} to="/About">
            About Us
          </Link>
        </li>
            </ul>
            <CiMenuBurger onClick={()=>toggleMenu()} id='hamburger' />
            <ul id='hamburger-nav' className={`flex flex-col gap-10 ${menu ? '' : 'hidden'}`}>
            <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/Home' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Home">
            Home
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/Listing' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Listing">
            Listing
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/Agents' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Agents">
            Agents
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 pb-1 ${location.pathname === '/About' ? 'border-b-2' : 'hover:border-b-2'}`} to="/About">
            About Us
          </Link>
        </li>
            </ul>
        </nav>
        </>
    );
}

export default Nav;