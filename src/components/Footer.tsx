import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface FooterInterface{
    activeFilter: number;
}

const Footer : React.FC<FooterInterface> = ({activeFilter})=>{

    return(
        <>
        <footer className={`justify-around flex h-auto min-h-20 p-5 bg-black text-white text-md ${activeFilter !== 0 ? 'no-footer' : ''}`}>
        <div className='flex hover:text-orange-400 duration-150 ease-in-out' id="logo">
            <Link to='/'>REAL-IT <FontAwesomeIcon icon={faHouse} /></Link>
        </div>
        <p>Copyright @{new Date().getFullYear()} - All Rights Reserved</p>
        <div className="flex gap-10 text-2xl" id="social-media-icons">
        <i className="fa-brands fa-linkedin hover:text-orange-400 duration-150 ease-in-out"></i>
        <i className="fa-brands fa-twitter hover:text-orange-400 duration-150 ease-in-out"></i>
        <i className="fa-brands fa-facebook hover:text-orange-400 duration-150 ease-in-out"></i>
        <i className="fa-brands fa-instagram hover:text-orange-400 duration-150 ease-in-out"></i>
        </div>

        </footer>
        </>
    );
}
export default Footer;