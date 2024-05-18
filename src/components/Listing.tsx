import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";


// make sure to create an interface for props and make sure that if the data mutates in type, then you must accommodate for that by adding the other possible types
// I ran into a long ts error due to the fact that i didn't add "| null" to my listingData annotation within the prop interface

interface ListingProps {
  increasePage: ()=>void;
  decreasePage: ()=>void;
  page: number;
  numberPageSet: (page: number) => void;
  listingData: ListingInterface[] | null;
}

const Listing: React.FC<ListingProps> = ({
  page,
  numberPageSet,
  listingData,
  increasePage,
  decreasePage
}) => {
  const listingTemplate = listingData ? (
    [...listingData].slice(page * 6 - 6, page * 6).map((el) => {
      return (
        <div
          key={el.id}
          className="flex flex-col w-96 h-auto m-3 shadow-xl rounded-xl gap-5 bg-white"
        >
          <img
            className="h-1/2 rounded-t-xl"
            src={el.image_url}
            alt={`${el.address} picture`}
          />
          <div className="flex flex-col px-10 gap-8 ">
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

  // page number buttons
 const numberButtons = listingData ? (
    [...Array(Math.floor(Number([...listingData]?.length) / 6))].map(
      (_, i) => (
        <button
          key={i + 1}
          className={`px-4 py-2 shadow-lg rounded-lg border-2 hover:border-black  ${
            page === i + 1 ? "border-black" : " border-gray-100"
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
  )

  return (
    <>
      <div className="p-10 bg-orange-50">
        <div id="search" className="flex gap-5">
          <input className="py-3 pl-2 pr-8 border-2 text-xl rounded-xl" type="text" placeholder="Enter address" />
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
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
          <button className="bg-white py-3 px-4 border-2 text-xl rounded-xl hover:bg-black hover:text-white duration-150 ease-in-out">Search</button>
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
          <button className="px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out" onClick={()=>decreasePage()}>{'<<'}</button>
          {numberButtons}
          <button className="px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out" onClick={()=>increasePage()}>Next Page</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listing;
