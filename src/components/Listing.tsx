import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";

interface ListingProps{
    listingData : ListingInterface;
}

const Listing : React.FC<ListingProps> = ({listingData})=>{

    return(
        <>
        <div className="h-screen"></div>
        <Footer />
        </>
    );
}

export default Listing;