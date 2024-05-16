import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";

// make sure to create an interface for props and make sure that if the data mutates in type, then you must accommodate for that by adding the other possible types
// I ran into a long ts error due to the fact that i didn't add "| null" to my listingData annotation within the prop interface

interface ListingProps {
  page: number;
  numberPageSet: (page: number) => void;
  listingData: ListingInterface[] | null;
}

const Listing: React.FC<ListingProps> = ({
  page,
  numberPageSet,
  listingData,
}) => {
  const listingTemplate = listingData ? (
    [...listingData].slice(page * 6 - 6, page * 6).map((el) => {
      return (
        <div
          key={el.id}
          className="flex flex-col w-96 h-auto m-3 shadow-xl rounded-xl gap-5"
        >
          <img
            className="h-1/2 rounded-t-xl"
            src={el.image_url}
            alt={`${el.address} picture`}
          />
          <div className="flex flex-col px-10 gap-8">
            <p className="font-bold">{`${el.address},${el.city},${el.state} ${el.zip}`}</p>
            <div className="flex justify-between text-gray-400">
              <p>{`${el.bedrooms} Bed Room`}</p>
              <p>{`${el.bathrooms} Bath`}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>{`${el.square_footage} sqft`}</p>
              <p>{`${el.apt_type}`}</p>
            </div>
            <div className="flex gap-10 ">
              <button className="px-6 py-2 bg-black text-white rounded-lg">
                View Details
              </button>
              <p className="font-bold text-2xl">{`$${String(el.price).slice(
                0,
                3
              )},${String(el.price).slice(3)}`}</p>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>no data</div>
  );

  return (
    <>
      <div id="search" className="">
        <input type="text" placeholder="Enter address" />
        <select>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
        <select>
          <option value="0-100,000">less-$100,000</option>
          <option value="100,000-200,000">$100,000-$200,000</option>
          <option value="200,000-300,000">$200,000-$300,000</option>
          <option value="300,000-400,000">$300,000-$400,000</option>
          <option value="400,000-500,000">$400,000-$500,000</option>
          <option value="500,000-600,000">$500,000-$600,000</option>
          <option value="600,000-700,000">$600,000-$700,000</option>
          <option value="700,000-800,000">$700,000-$800,000</option>
          <option value="800,000-900,000">$800,000-$900,000</option>
          <option value="900,000-1,000,000">$900,000-$1,000,000</option>
          <option value="1,000,000-more">$1,000,000+</option>
        </select>
      </div>
      <div id="listing-container" className="flex flex-wrap w-1/2">
        {listingTemplate}
      </div>
      <div className="flex gap-1" id="page-buttons">
        {/* functions as pseudo compression, making an array with seven blank elements.
         you then map the elements. the underscore denotes that the element will no be used
        within the callback function.the i is index. you use the index + 1 ,due to indexes 
        starting at 0, to get the page number for each button
        */}
        {listingData ? (
          [...Array(Math.floor(Number([...listingData]?.length) / 6))].map(
            (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out ${
                  page === i + 1 ? "bg-black text-white" : "bg-white text-black"
                }`}
                onClick={() => numberPageSet(i + 1)}
                value={i + 1}
              >
                {i + 1}
              </button>
            )
          )
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Listing;
