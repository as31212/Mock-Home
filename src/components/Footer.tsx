import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Footer : React.FC = ()=>{

    return(
        <>
        <footer className="flex justify-around h-20 p-5 bg-black text-white text-md">
        <div className='flex' id="logo">
            <Link to='/Home'>REAL-IT <FontAwesomeIcon icon={faHouse} /></Link>
        </div>
        <p>Copyright @{new Date().getFullYear()} - All Rights Reserved</p>
        <div className="flex gap-10 text-2xl" id="social-media-icons">
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-instagram"></i>
        </div>

        </footer>
        </>
    );
}
export default Footer;