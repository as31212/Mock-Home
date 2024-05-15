import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";

const Listing : React.FC<ListingInterface | null> = ({listingData})=>{

    return(
        <>
        <div className="h-screen"></div>
        <Footer />
        </>
    );
}

export default Listing;