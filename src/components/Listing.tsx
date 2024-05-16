import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";

// make sure to create an interface for props and make sure that if the data mutates in type, then you must accommodate for that by adding the other possible types
// I ran into a long ts error due to the fact that i didn't add "| null" to my listingData annotation within the prop interface

interface ListingProps {
  listingData: ListingInterface[] | null;
}

const Listing: React.FC<ListingProps> = ({ listingData }) => {
  const listingTemplate = listingData ? (
    [...listingData].map((el) => {
      return (
        <div className="">
          <p>{`the state is ${el.state}`}</p>
        </div>
      );
    })
  ) : (
    <div>no data</div>
  );

  return (
    <>
      <div className="h-screen">{listingTemplate}</div>
      <Footer />
    </>
  );
};

export default Listing;
