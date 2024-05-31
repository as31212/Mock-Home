import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { FaShower, FaBed, FaHome } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { IoIosPin } from "react-icons/io";
import { useEffect } from "react";
import { RiLoader3Fill } from "react-icons/ri";
import { FiLoader } from "react-icons/fi";

interface ListingProps {
  changeSearchAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchAddress: string;
  increasePage: () => void;
  decreasePage: () => void;
  page: number;
  numberPageSet: (page: number) => void;
  sortedData: ListingInterface[] | null;
  changeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sort: string;
  setSortedData: (data: ListingInterface[] | null) => void;
  searchListings: (data : ListingInterface[] | null) => void;
  loading: boolean;
}

const Listing: React.FC<ListingProps> = ({
  searchAddress,
  changeSearchAddress,
  page,
  numberPageSet,
  sortedData,
  increasePage,
  decreasePage,
  sort,
  changeSort,
  setSortedData,
  searchListings,
  loading
}) => {
  useEffect(() => {
    if (sortedData) {
      let sorting = [...sortedData]; // Create a copy of the data
      switch (sort) {
        case "price-asc":
          sorting.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sorting.sort((a, b) => b.price - a.price);
          break;
        case "bedrooms-asc":
          sorting.sort((a, b) => a.bedrooms - b.bedrooms);
          break;
        case "bedrooms-desc":
          sorting.sort((a, b) => b.bedrooms - a.bedrooms);
          break;
        case "bathrooms-asc":
          sorting.sort((a, b) => a.bathrooms - b.bathrooms);
          break;
        case "bathrooms-desc":
          sorting.sort((a, b) => b.bathrooms - a.bathrooms);
          break;
        case "sqft-asc":
          sorting.sort((a, b) => a.square_footage - b.square_footage);
          break;
        case "sqft-desc":
          sorting.sort((a, b) => b.square_footage - a.square_footage);
          break;
        default:
          sorting = sortedData;
      }
      setSortedData(sorting);
    }
  }, [sort, sortedData, setSortedData]);

  const listingTemplate = sortedData ? (
    sortedData.slice(page * 8 - 8, page * 8).map((el) => {
      return (
        <div
          key={el.id}
          className="flex flex-col w-96 h-[500px] pb-5 m-3 shadow-xl rounded-xl gap-5 bg-white"
        >
          <img
            className="h-1/2 rounded-t-xl"
            src={el.image_url}
            alt={`${el.address} picture`}
          />
          <div className="flex flex-col px-10 gap-4 ">
            <p className="font-bold text-[18px]">
              <IoIosPin className="inline relative top-[-2px] left-[-3px] text-xl" />
              {`${el.address},${el.city},${el.state} ${el.zip}`}
            </p>
            <div className="flex justify-between text-gray-400">
              <p className="flex gap-1">
                <FaBed className="relative top-[4px] inline" />
                {`${el.bedrooms} Bed Room`}
              </p>
              <p className="flex gap-1">
                <FaShower className="relative top-[4px] inline" />
                {`${el.bathrooms} Bath`}
              </p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p className="flex gap-1">
                <PiCirclesFourFill className="relative top-[4px] inline" />
                {`${el.square_footage} sqft`}
              </p>
              <p className="flex gap-1">
                <FaHome className="relative top-[4px] inline" />
                {`${el.apt_type}`}
              </p>
            </div>
            <div className="flex gap-10 ">
              <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 duration-300">
                View Details
              </button>
              <p className="font-bold text-2xl">{`$${el.price}`}</p>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>no data</div>
  );

  const numberButtons = sortedData ? (
    [...Array(Math.ceil(sortedData.length / 8))].map((_, i) => (
      <a href="#nav" key={i}>
        <button
          className={`px-4 py-2 mx-1 shadow-lg rounded-lg border-2 hover:border-gray-500
          ${page === i + 1 ? "border-gray-500" : "border-gray-100"} 
          ${i + 1 >= page - 2 && i + 1 <= page + 2 ? "" : "hidden"}`}
          onClick={() => numberPageSet(i + 1)}
          value={i + 1}
        >
          {i + 1}
        </button>
      </a>
    ))
  ) : (
    <div></div>
  );

  return (
    <>
      <div id="listing-page" className={`p-10 bg-[#FFFAF7] flex min-h-screen ${sortedData < 1 && sortedData ? 'flex-col' : ''}`}>
        <div id="search" className={`flex flex-wrap justify-center gap-5  ${loading ? 'hidden' : ''} ${sortedData < 1 && sortedData ? '' : 'h-40 w-72'}`}>
          <input
            value={searchAddress}
            onChange={(event) => changeSearchAddress(event)}
            className="py-3 pl-2 pr-8 border-2 text-xl rounded-xl"
            type="text"
            placeholder="State/City/Street"
          />
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option disabled selected value="price-range">
              Price Range
            </option>
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
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option disabled selected value="type">
              type
            </option>
            <option value="family">family</option>
            <option value="single-family">single family</option>
            <option value="apartment">apartment</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option disabled selected value="type">
              bedrooms
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option disabled selected value="type">
              bathrooms
            </option>
            <option value="any">any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option disabled selected value="type">
              sqft
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            onChange={changeSort}
            className="py-3 px-2 border-2 text-xl rounded-xl"
          >
            <option disabled selected value="">
              Sort
            </option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="bedrooms-asc">Bedrooms: Low to High</option>
            <option value="bedrooms-desc">Bedrooms: High to Low</option>
            <option value="bathrooms-asc">Bathrooms: Low to High</option>
            <option value="bathrooms-desc">Bathrooms: High to Low</option>
            <option value="sqft-asc">Square Footage: Low to High</option>
            <option value="sqft-desc">Square Footage: High to Low</option>
          </select>
          <button onClick={sortedData ? ()=> searchListings([...sortedData]): ()=>{console.log('no data');
          }} className="bg-white py-3 px-4 border-2 text-xl rounded-xl hover:bg-black hover:text-white duration-150 ease-in-out">
            Search
          </button>
        </div>
        <FiLoader className={`m-10 text-5xl mx-auto ${loading ? 'spin' : 'hidden'}`} />
        <div id="buttons-listings">
          <div id="listing-container" className={`flex min-h-screen flex-wrap justify-center ${loading ? 'hidden' : ''}`}>
            {sortedData?.length > 1 && sortedData?.length ? listingTemplate :<img className="mx-auto mt-20 h-[80%]" src="noResultsOrange.png" alt="man looking for something" />}
          </div>
          <div className={`flex justify-center ${loading ? 'hidden' : ''} ${sortedData?.length > 1 && sortedData? '' : 'hidden'}`} id="page-buttons">
          <a href="#nav">
            <button
              className="px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out"
              onClick={decreasePage}
            >
              {"<<"}
            </button>
          </a>
          {numberButtons}
          <button className="px-4 py-2 shadow-lg rounded-lg bg-gray-300 mx-1">...</button>
          <button className="px-4 py-2 shadow-lg rounded-lg bg-gray-300 mx-1">{sortedData ? Math.ceil(sortedData.length / 8) : ""}</button>
          <a href="#nav">
            <button
              className="px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out"
              onClick={increasePage}
            >
              {">>"}
            </button>
          </a>
        </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default Listing;
