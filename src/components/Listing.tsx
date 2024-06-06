import Footer from "./Footer";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { FaShower, FaBed, FaHome } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { IoIosPin } from "react-icons/io";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FilterInterface } from "../interfaces/FilterInterface";
import { TiDelete } from "react-icons/ti";

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
  listingData: ListingInterface[] | null;
  filter: FilterInterface;
  updateFilter: (property : Partial<FilterInterface>) => void;
  savedSearchAddress: string;
  setSavedSearchAddress: (searchAddress: string) => void;
  setSearchAddress: (searchAddress: string) => void;
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
  toggleMore,
  listingData,
  filter,
  updateFilter,
  savedSearchAddress,
  setSavedSearchAddress,
  setSearchAddress
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


  // filter

  useEffect(()=>{
    if(listingData){
      const filtered = [...listingData].filter(el=>{
        return(
          el.bedrooms >= filter.bedrooms &&
          el.bathrooms >= filter.bathrooms &&
          el.buy_or_rent === filter.buySell &&
          (savedSearchAddress !== '' ? el.address.toLowerCase().includes(savedSearchAddress.toLowerCase()) ||
          el.city.toLowerCase().includes(savedSearchAddress.toLowerCase()) ||
          el.state.toLowerCase().includes(savedSearchAddress.toLowerCase()) ||
          el.zip.toLowerCase().includes(savedSearchAddress.toLowerCase()) : true )
          // finish the rest
        );
      })
    setSortedData(filtered);
    }
  },[filter,savedSearchAddress])
 
// listing cards
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
            <p className="font-bold mb-2 text-[18px] h-[50px]">
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
              <p className={`font-bold mb-2 ${el.buy_or_rent === 'Buy' ? 'text-2xl' : 'text-xl mt-2'}`}>{`$${el.buy_or_rent === 'Buy' ? el.price : `${el.price}/mo`}`}</p>
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
      <div id="listing-page" className={`p-10 bg-[#FFFAF7] flex flex-col min-h-screen ${sortedData && sortedData.length < 1  ? '' : ''}`}>
        <div id="search" className={`flex flex-wrap justify-center gap-5  ${loading ? 'hidden' : ''} `}>
          <input
            value={searchAddress}
            onChange={(event) => changeSearchAddress(event)}
            className="py-3 pl-2 pr-32 border-2 text-xl rounded-md"
            type="text"
            placeholder="State/City/Street"
          />
          {/* search filter toggle */}
          <div onClick={()=>setSavedSearchAddress('')} className={` flex gap-2 p-1 rounded-md justify-between border-2 h-[35px] w-auto relative right-[150px] top-3 bg-gray-200 font-bold text-center ${savedSearchAddress !== '' ? '' : 'hidden'}`}>{savedSearchAddress}<TiDelete className="text-xl relative top-[2px]" /></div>

          {/* Buy Sell Filter button */}
          <div>
            <div onClick={()=>toggleBuy()}>
            <button className={`border-[1px] border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${buyFilter ? 'bg-orange-200 border-orange-300 ' : ''}`}>{filter.buySell === 'Buy' ? 'Buy' : 'Rent'} <FaChevronDown className={`inline relative bottom-[2px] left-2 text-lg ${buyFilter ? 'hidden' : ''}`} /> <FaChevronUp className={`inline relative bottom-[2px] left-2 text-lg ${buyFilter ? '' : 'hidden'}`} /></button>
            </div>
            <div className={`bg-[#FFFAF7] border-2 w-72 h-52 absolute mt-1 z-10 rounded-md flex flex-col justify-center shadow-2xl  ${buyFilter ? '' : 'hidden'}`}>
              <div className="p-6 flex flex-col gap-8">
              <label onClick={()=>updateFilter({buySell:'Buy'})} className="text-xl text-gray-600 hover:text-orange-300" htmlFor="buyCheckBox">
  <input className="mr-7 scale-150 custom-radio" type="radio" name="buy-sell-radio" defaultChecked={filter.buySell === 'Buy'} id="buyCheckBox" value='Buy' />Buy
</label>

<label onClick={()=>updateFilter({buySell:'rent'})} className="text-xl text-gray-600 hover:text-orange-300" htmlFor="rentCheckBox">
  <input defaultChecked={filter.buySell === 'rent'} className="mr-7 scale-150 custom-radio" type="radio" name="buy-sell-radio" id="rentCheckBox" value='Buy' />Rent
</label>

              </div>
              <div className="p-5"><button onClick={()=>toggleBuy()} className="border-2 w-full bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out">Apply</button></div>
            </div>
          </div>

        {/* Price filter button */}
          <div>
            <div onClick={()=>togglePrice()}>
            <button className={`border-[1px] border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${priceFilter ? 'bg-orange-200 border-orange-300 ' : ''}`}>Price <FaChevronDown className={`inline relative bottom-[2px] left-2 text-lg ${priceFilter ? 'hidden' : ''}`} /> <FaChevronUp className={`inline relative bottom-[2px] left-2 text-lg ${priceFilter ? '' : 'hidden'}`} /></button>
            </div>
            <div className={`bg-[#FFFAF7] border-2 w-[500px] h-60 absolute mt-1 z-10 rounded-md shadow-2xl ${priceFilter ? '' : 'hidden'}`}>
              <div className="w-full bg-gray-300 text-gray-500 font-bold"><p className="ml-2">Price Range</p></div>
              <div className="flex justify-center gap-8 p-5" id="min-max-filter">
                <div id="min">
                  <p className="font-bold mb-2">Minimum</p>
                  <input className="text-xl w-40 pl-1 py-3 rounded-md border-[2px] " type="text" placeholder="No Min" />
                </div>
                <p className="relative top-[40px] text-2xl">-</p>
                <div id="max">
                  <p className="font-bold mb-2">Maximum</p>
                  <input className="text-xl w-40 pl-1 py-3 rounded-md border-[2px] " type="text" placeholder="No Max" />
                </div>
              </div>
              <div className="p-5"><button onClick={()=>togglePrice()} className="border-2 w-full bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out">Apply</button></div>
            </div>
          </div>

        {/* Bed Bath Filter button */}
          <div>
            <div onClick={()=>toggleBedBath()}>
            <button className={`border-[1px] border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${bedBathFilter ? 'bg-orange-200 border-orange-300 ' : ''}`}>Bed & Bath <FaChevronDown className={`inline relative bottom-[2px] left-2 text-lg ${bedBathFilter ? 'hidden' : ''}`} /> <FaChevronUp className={`inline relative bottom-[2px] left-2 text-lg ${bedBathFilter ? '' : 'hidden'}`} /></button>
            </div>
            <div className={`bg-[#FFFAF7] w-[400px] h-[410px] flex flex-col gap-10 absolute mt-1 z-10 rounded-md shadow-2xl ${bedBathFilter ? '' : 'hidden'}`}>
              <div id="bedroom-filter-section">
                <div className="bg-gray-300 text-gray-500 font-bold w-full"><p className="ml-4">Number of Bedrooms</p></div>
                <div className="px-7 py-4">
                  <p className="font-bold text-gray-700">Bedrooms</p>
                  <button onClick={()=>updateFilter({bedrooms:0})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bedrooms === 0 ? 'bg-orange-300' : '' }`}>Any</button>
                  <button onClick={()=>updateFilter({bedrooms:1})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bedrooms === 1 ? 'bg-orange-300' : ''}`}>1+</button>
                  <button onClick={()=>updateFilter({bedrooms:2})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bedrooms === 2 ? 'bg-orange-300' : ''}`}>2+</button>
                  <button onClick={()=>updateFilter({bedrooms:3})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bedrooms === 3 ? 'bg-orange-300' : ''}`}>3+</button>
                  <button onClick={()=>updateFilter({bedrooms:4})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bedrooms === 4 ? 'bg-orange-300' : ''}`}>4+</button>
                  <button onClick={()=>updateFilter({bedrooms:5})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bedrooms === 5 ? 'bg-orange-300' : ''}`}>5+</button>
                </div>
              </div>
              <div id="bathroom-filter-section">
              <div className="bg-gray-300 text-gray-500 font-bold w-full"><p className="ml-4">Number of Bathrooms</p></div>
                <div className="px-7 py-4">
                  <p className="font-bold text-gray-700">Bathrooms</p>
                  <button onClick={()=>updateFilter({bathrooms:0})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bathrooms === 0 ? 'bg-orange-300' : ''}`}>Any</button>
                  <button onClick={()=>updateFilter({bathrooms:1})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bathrooms === 1 ? 'bg-orange-300' : ''}`}>1+</button>
                  <button onClick={()=>updateFilter({bathrooms:2})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bathrooms === 2 ? 'bg-orange-300' : ''}`}>2+</button>
                  <button onClick={()=>updateFilter({bathrooms:3})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bathrooms === 3 ? 'bg-orange-300' : ''}`}>3+</button>
                  <button onClick={()=>updateFilter({bathrooms:4})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bathrooms === 4 ? 'bg-orange-300' : ''}`}>4+</button>
                  <button onClick={()=>updateFilter({bathrooms:5})} className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${filter.bathrooms === 5 ? 'bg-orange-300' : ''}`}>5+</button>
                </div>
              </div>
              <div className="p-5"><button onClick={()=>toggleBedBath()} className="border-2 w-full bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out">Apply</button></div>
            </div>
          </div>
         
         {/* More Filter button */}
          <div>
            <div onClick={()=>toggleMore()}>
            <button className={`border-[1px] border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${moreFilter ? 'bg-orange-200 border-orange-300 ' : ''}`}>More <FaChevronDown className={`inline relative bottom-[2px] left-2 text-lg ${moreFilter ? 'hidden' : ''}`} /> <FaChevronUp className={`inline relative bottom-[2px] left-2 text-lg ${moreFilter ? '' : 'hidden'}`} /></button>
            </div>
            <div className={`bg-[#FFFAF7] w-[600px] h-[300px] absolute mt-1 z-10 rounded-md shadow-2xl ${moreFilter ? '' : 'hidden'}`}>
              <div className="bg-gray-300 text-gray-500 font-bold w-full"><p className="ml-4">More Filters</p></div>
              <div className="flex flex-col gap-5" id="extra-filters">
                <div id="sqft-filter">
                  <p className="font-bold text-gray-700 px-5">Square Feet</p>
                  <div className="flex gap-10 justify-between px-5" id="sqft-min-max">
                    <select className="text-gray-700 w-2/3 text-lg py-2 border-[1px]" name="" id="">
                      <option value="No-Min">No Min</option>
                    </select>
                    <select className="text-gray-700 w-2/3 text-lg py-2 border-[1px]" name="" id="">
                      <option value="No-Max">No Max</option>
                    </select>
                  </div>
                </div>
                <div id="home-type">
                  <p className="font-bold text-gray-700 px-5">Home-Type</p>
                  <div className="px-5 flex flex-col gap-5" id="home-type-checks">
                    <label className="text-lg" htmlFor="apt-check"><input className="mr-3 scale-150" type="checkbox" id="apt-check" />Apartment</label>
                    <label className="text-lg" htmlFor="family-check"><input className="mr-3 scale-150" type="checkbox" id="family-check" />Family</label>
                    <label className="text-lg" htmlFor="single-family-check"><input className="mr-3 scale-150" type="checkbox" id="single-family-check" />Single Family</label>
                  </div>
                </div>
              </div>
            </div>
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
          <button onClick={sortedData ? ()=> {setSavedSearchAddress(searchAddress); searchListings([...sortedData]);
          setSearchAddress('');
           }: ()=>{console.log('no data');
          }} className="bg-orange-300 text-white font-bold py-3 px-14 border-2 text-xl rounded-md hover:bg-white hover:text-black duration-200 ease-in-out">
            Search
          </button>
        </div>
        <FiLoader className={`m-10 text-5xl mx-auto ${loading ? 'spin' : 'hidden'}`} />
        <div id="buttons-listings">
          <div id="listing-container" className={`flex min-h-screen flex-wrap justify-center my-10 ${loading ? 'hidden' : ''}`}>
            {sortedData?.length && sortedData?.length > 1 ? listingTemplate :<img className="mx-auto mt-20 h-[80%]" src="noResultsOrange.png" alt="man looking for something" />}
          </div>
          <div className={`flex justify-center ${loading ? 'hidden' : ''} ${sortedData?.length && sortedData?.length > 1 ? '' : 'hidden'}`} id="page-buttons">
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
