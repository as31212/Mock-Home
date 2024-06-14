import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";

interface PropertyDetailsInterface {
  sortedData: ListingInterface[] | null;
  currListing: number;
}
const PropertyDetails: React.FC<PropertyDetailsInterface> = ({
  sortedData,
  currListing,
}) => {
  const currObj = sortedData?.find((el) => el.id === currListing);

  return (
    <>
      <div className="h-screen flex flex-col bg-[#FFFAF7]">
        {/* images collage */}
        <div id="listing-detail-images" className="flex gap-3 mx-auto w-2/3 max-w-[1800px]  mt-10">
          <img className=" rounded-xl w-2/3 h-full" src={currObj?.image_url} alt="" />
          <div className="flex gap-2 w-1/3 flex-col">
            <img className="rounded-xl w-full h-1/2" src={currObj?.image_url} alt="" />
            <img className="rounded-xl w-full h-1/2" src={currObj?.image_url} alt="" />
          </div>
        </div>
        {/*content divs  */}
        <div>
            <div id="left-divs">
                <div>
                    <h2>{currObj ? `${currObj.address},${currObj.city},${currObj.state} ${currObj.zip}` : ''}</h2>
                    <div></div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
