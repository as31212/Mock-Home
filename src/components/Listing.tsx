import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { FaShower } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { IoIosPin } from "react-icons/io";
import { useEffect } from "react";

// make sure to create an interface for props and make sure that if the data mutates in type, then you must accommodate for that by adding the other possible types
// I ran into a long ts error due to the fact that i didn't add "| null" to my listingData annotation within the prop interface

interface ListingProps {
  changeSearchAddress: (e:React.ChangeEvent<HTMLInputElement>)=> void;
  searchAddress: string;
  increasePage: () => void;
  decreasePage: () => void;
  page: number;
  numberPageSet: (page: number) => void;
  listingData: ListingInterface[] | null;
  changeSort: (e:React.ChangeEvent<HTMLOptionElement>)=> void;
  sort: string;
  setListingData : (data: ListingInterface[] | null)=> void;
}

const Listing: React.FC<ListingProps> = ({
  searchAddress,
  changeSearchAddress,
  page,
  numberPageSet,
  listingData,
  increasePage,
  decreasePage,
  sort,
  changeSort,
  setListingData
}) => {
  // this will determine how listing data will be sorted, I will then pass the sorted listing data to the listing template

  
  
  useEffect(()=>{
    let sortedData = listingData;
    switch (sort) {
      case 'price-asc':
        sortedData = [...listingData].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedData = [...listingData].sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms-asc':
        sortedData = [...listingData].sort((a, b) => a.bedrooms - b.bedrooms);
        break;
      case 'bedrooms-desc':
        sortedData = [...listingData].sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'bathrooms-asc':
        sortedData = [...listingData].sort((a, b) => a.bathrooms - b.bathrooms);
        break;
      case 'bathrooms-desc':
        sortedData = [...listingData].sort((a, b) => b.bathrooms - a.bathrooms);
        break;
      case 'sqft-asc':
        sortedData = [...listingData].sort((a, b) => a.square_footage - b.square_footage);
        break;
      case 'sqft-desc':
        sortedData = [...listingData].sort((a, b) => b.square_footage - a.square_footage);
        break;
      default:
        sortedData = listingData;
    }
    setListingData(sortedData);
  },[sort])

  
  // look up

  const listingTemplate = listingData ? (
    [...listingData].slice(page * 8 - 8, page * 8).map((el) => {
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
  /* functions as pseudo compression, making an array with seven blank elements.
  you then map the elements. the underscore denotes that the element will no be used
  within the callback function.the i is index. you use the index + 1 ,due to indexes
  starting at 0, to get the page number for each button
  */
  const numberButtons = listingData ? (
    [...Array(Math.floor(Number([...listingData]?.length) / 8))].map((_, i) => (
      <a href="#nav">
        <button
          key={i + 1}
          className={`px-4 py-2 shadow-lg rounded-lg border-2 hover:border-gray-500
          ${page === i + 1 ? "border-gray-500" : "border-gray-100"} 
          ${i + 1 >= page - 2 && i + 1 <= page + 2 ? '' : 'hidden'}`}
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
      <div className="p-10 bg-orange-50">
        <div id="search" className="flex flex-wrap justify-center gap-5">
          <input
            value={searchAddress}
            onChange={()=>changeSearchAddress(event)}
            className="py-3 pl-2 pr-8 border-2 text-xl rounded-xl"
            type="text"
            placeholder="State/City/Street"
          />
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
            <option disabled selected value="price-range">Price Range</option>
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
          <option disabled selected value="type">type</option>
            <option value="family">family</option>
            <option value="single-family">single family</option>
            <option value="apartment">apartment</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
          <option disabled selected value="type">bedrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
          <option disabled selected value="type">bathrooms</option>
            <option value="any">any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select className="py-3 px-2 border-2 text-xl rounded-xl">
          <option disabled selected value="type">sqft</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            onChange={()=>changeSort(event)}
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
          <button className="bg-white py-3 px-4 border-2 text-xl rounded-xl hover:bg-black hover:text-white duration-150 ease-in-out">
            Search
          </button>
        </div>
        <div id="listing-container" className="flex flex-wrap justify-center ">
          {listingTemplate}
        </div>
        <div className="flex gap-1 justify-center" id="page-buttons">
          <a href="#nav">
            <button
              className="px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out"
              onClick={() => decreasePage()}
            >
              {"<<"}
            </button>
          </a>
          {numberButtons}
          <a href="#nav">
            <button
              className="px-4 py-2 shadow-lg rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out"
              onClick={() => increasePage()}
            >{">>"}</button>
          </a>
          <button>{listingData ? Math.floor(listingData.length / 8) : ''}</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listing;
