import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";

interface PropertyDetailsInterface{
    sortedData: ListingInterface[] | null;
    currListing: number;
}
const PropertyDetails : React.FC<PropertyDetailsInterface> = ({sortedData,currListing})=>{

    const currObj = sortedData?.find(el=> el.id === currListing);

    return(
        <>
        <div className="h-screen">
            <img src={currObj?.image_url} alt="" />
            <p>{currObj?.address}</p>
        </div>
        </>
    );
}

export default PropertyDetails;