import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useLocation } from 'react-router-dom';




const Nav : React.FC = ()=>{
    const location = useLocation();

    return(
        <>
        <nav className='bg-orange-50 flex justify-around'>
        <div className='' id="logo">
            <Link to='/Home'>REAL-IT <FontAwesomeIcon icon={faHouse} /></Link>
        </div>
            <ul className='flex gap-5'>
            <li>
          <Link className={`border-gray-600 ${location.pathname === '/Home' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Home">
            Home
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 ${location.pathname === '/Listing' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Listing">
            Listing
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 ${location.pathname === '/Agents' ? 'border-b-2' : 'hover:border-b-2'}`} to="/Agents">
            Agents
          </Link>
        </li>
        <li>
          <Link className={`border-gray-600 ${location.pathname === '/About' ? 'border-b-2' : 'hover:border-b-2'}`} to="/About">
            About Us
          </Link>
        </li>
            </ul>
        </nav>
        </>
    );
}

export default Nav;