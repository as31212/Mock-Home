import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { FaShower, FaBed, FaHome } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { IoIosPin } from "react-icons/io";
import { useEffect } from "react";
import { RiLoader3Fill } from "react-icons/ri";
import { FiLoader } from "react-icons/fi";
import ListingPageButtons from "./ListingPageButtons";

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
  priceFilter: boolean;
  togglePrice: ()=> void;
  bedBathFilter: boolean;
  toggleBedBath: ()=> void;
  buyFilter: boolean;
  toggleBuy: ()=> void;
  moreFilter: boolean;
  toggleMore: ()=> void;
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
  loading,
  priceFilter,
  togglePrice,
  bedBathFilter,
  toggleBedBath,
  buyFilter,
  toggleBuy,
  moreFilter,
  toggleMore
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
          className="flex flex-col w-96 h-[500px] pb-5 m-3 shadow-xl rounded-xl gap-5 bg-white overflow-hidden"
        >
          <img
            className="h-1/2 rounded-t-xl  hover:scale-105 hover:brightness-75 duration-200"
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
          className={`px-4 py-2 mx-1 shadow-lg rounded-lg border-2 hover:border-orange-400
          ${page === i + 1 ? "border-orange-400" : "border-gray-100"} 
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
      <div id="listing-page" className={`p-10 bg-[#FFFAF7] flex flex-col min-h-screen ${sortedData < 1 && sortedData ? '' : ''}`}>
        <div id="search" className={`flex flex-wrap justify-center gap-5  ${loading ? 'hidden' : ''} `}>
          <input
            value={searchAddress}
            onChange={(event) => changeSearchAddress(event)}
            className="py-3 pl-2 pr-32 border-2 text-xl rounded-md"
            type="text"
            placeholder="State/City/Street"
          />
          <div>
            <div onClick={()=>toggleBuy()}>
              <ListingPageButtons text="Buy" />
            </div>
            <div className={` bg-black w-72 h-52 absolute mt-1 z-10 rounded-md  ${buyFilter ? '' : 'hidden'}`}>Hello</div>
          </div>
          <div>
            <div onClick={()=>toggleBedBath()}>
              <ListingPageButtons text="Bed & Baths" />
            </div>
            <div className={`bg-black w-72 h-52 absolute mt-1 z-10 rounded-md ${bedBathFilter ? '' : 'hidden'}`}></div>
          </div>
          <div>
            <div onClick={()=>togglePrice()}>
              <ListingPageButtons text="Price" />
            </div>
            <div className={`bg-black w-72 h-52 absolute mt-1 z-10 rounded-md ${priceFilter ? '' : 'hidden'}`}></div>
          </div>
          <div>
            <div onClick={()=>toggleMore()}>
              <ListingPageButtons text="More" />
            </div>
            <div className={`bg-black w-72 h-52 absolute mt-1 z-10 rounded-md ${moreFilter ? '' : 'hidden'}`}></div>
          </div>
          <select
            onChange={changeSort}
            className="py-3 px-2 border-2 text-xl rounded-md"
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
          }} className="bg-white font-bold py-3 px-14 border-2 text-xl rounded-md hover:bg-orange-300 hover:text-white duration-150 ease-in-out">
            Search
          </button>
        </div>
        <FiLoader className={`m-10 text-5xl mx-auto ${loading ? 'spin' : 'hidden'}`} />
        <div id="buttons-listings">
          <div id="listing-container" className={`flex min-h-screen flex-wrap justify-center my-10 ${loading ? 'hidden' : ''}`}>
            {sortedData?.length > 1 && sortedData?.length ? listingTemplate :<img className="mx-auto mt-20 h-[80%]" src="noResultsOrange.png" alt="man looking for something" />}
          </div>
          <div className={`flex justify-center ${loading ? 'hidden' : ''} ${sortedData?.length > 1 && sortedData? '' : 'hidden'}`} id="page-buttons">
          <a href="#nav">
            <button
              className="px-4 py-2 border-2 shadow-lg rounded-lg hover:border-orange-300 duration-150 ease-in-out"
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
              className="px-4 py-2 border-2 shadow-lg rounded-lg hover:border-orange-300 duration-150 ease-in-out"
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
