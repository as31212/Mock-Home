import Footer from "./Footer";
import { Link } from "react-router-dom";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { FaShower, FaBed, FaHome } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { IoIosPin } from "react-icons/io";
import { ChangeEvent, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FilterInterface } from "../interfaces/FilterInterface";
import { TiDelete } from "react-icons/ti";

interface ListingProps {
  addComma: (price: number) => string;
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
  searchListings: (data: ListingInterface[] | null) => void;
  loading: boolean;
  priceFilter: boolean;
  togglePrice: () => void;
  bedBathFilter: boolean;
  toggleBedBath: () => void;
  buyFilter: boolean;
  toggleBuy: () => void;
  moreFilter: boolean;
  toggleMore: () => void;
  listingData: ListingInterface[] | null;
  filter: FilterInterface;
  updateFilter: (property: Partial<FilterInterface>) => void;
  savedSearchAddress: string;
  setSavedSearchAddress: (searchAddress: string) => void;
  setSearchAddress: (searchAddress: string) => void;
  activeFilter: number;
  setActiveFilter: (num: number) => void;
  checkFocus: () => void;
  minToggle: boolean;
  setMinToggle: (toggle: boolean) => void;
  maxToggle: boolean;
  setMaxToggle: (toggle: boolean) => void;
  // min max input states
  minValue: string;
  changeMinByBtn: (key: number) => void;
  changeMaxByBtn: (key: number) => void;
  maxValue: string;
  changeMinByInput: (e: ChangeEvent<HTMLInputElement>) => void;
  changeMaxByInput: (e: ChangeEvent<HTMLInputElement>) => void;
  minNumbers: string[];
  maxNumbers: string[];
  setMinValue: (value: string) => void;
  setMaxValue: (value: string) => void;
  setLoading: (load: boolean) => void;
  sqftOptions: string[];
  maxSqft: string;
  minSqft: string;
  changeMaxSqft: (e: ChangeEvent<HTMLSelectElement>) => void;
  changeMinSqft: (e: ChangeEvent<HTMLSelectElement>) => void;
  setMaxSqft: (sqft: string) => void;
  setMinSqft: (sqft: string) => void;
  currListing: number;
  changeCurrListing: (elId: number) => void;
  setPriceTitle: (obj: string) => void;
  priceTitle: string;
}

const Listing: React.FC<ListingProps> = ({
  priceTitle,
  setPriceTitle,
  addComma,
  currListing,
  changeCurrListing,
  setMaxValue,
  setMinValue,
  minValue,
  changeMinByBtn,
  changeMaxByBtn,
  maxValue,
  changeMinByInput,
  changeMaxByInput,
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
  setSearchAddress,
  setActiveFilter,
  activeFilter,
  checkFocus,
  setMaxToggle,
  setMinToggle,
  minToggle,
  maxToggle,
  minNumbers,
  maxNumbers,
  setLoading,
  sqftOptions,
  changeMaxSqft,
  changeMinSqft,
  maxSqft,
  minSqft,
  setMaxSqft,
  setMinSqft,
}) => {
  // parsing logic for max and min
  const parseListNumbers = (str: string): number => {
    if (str === "No Min") {
      return 0;
    }
    // I have altered the way that any num and no max are handled so that the function that determines which li elements are displayed can act as intended
    if (str === "No Max" || str === "Any Number") {
      return 1000000000000;
    }
    if (str.includes("M")) {
      str = str.replace("M", "");
      const parts = str.split(".");
      if (parts.length === 2) {
        // If there are two parts, handle up to two decimal places
        const millions = Number(parts[0]) * 1000000;
        const decimals = Number(parts[1].padEnd(2, "0")) * 10000;
        return millions + decimals;
      } else {
        // If there is no decimal part
        return Number(parts[0]) * 1000000;
      }
    }
    return Number(str.replace(/,/g, ""));
  };

  const minNumber = [...minNumbers].map((el, index) => {
    return (
      <li
        onClick={() => changeMinByBtn(index)}
        className={`text-lg hover:bg-orange-200 p-3 ${
          parseListNumbers(maxValue) < parseListNumbers(el) && maxValue !== ""
            ? "hidden"
            : ""
        }`}
        key={index}
      >{`$${el}`}</li>
    );
  });

  const maxNumber = [...maxNumbers].map((el, index) => {
    return (
      <li
        onClick={() => changeMaxByBtn(index)}
        className={`text-lg hover:bg-orange-200 p-3 ${
          parseListNumbers(minValue) > parseListNumbers(el) &&
          minValue !== "" &&
          !el.includes("Any")
            ? "hidden"
            : ""
        }`}
        key={index}
      >{`${el.includes("Any") ? "" : "$"}${el}`}</li>
    );
  });

  // load when sorted data mutates

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [sortedData]);

  // sort
  //BUG ASSOCTED WITH SORTED DATA INTERFERING WITH THE OTHER USE EFFECT THAT USE SORTED DATA DEPENDECY

  // filter

  useEffect(() => {
    if (listingData) {
      const filtered = [...listingData].filter((el) => {
        return (
          // bedrooms && bathrooms
          el.bedrooms >= filter.bedrooms &&
          el.bathrooms >= filter.bathrooms &&
          el.buy_or_rent === filter.buySell &&
          // price range
          (filter.priceRange[0] === 0
            ? true
            : el.price >= filter.priceRange[0]) &&
          (filter.priceRange[1] === 0
            ? true
            : el.price <= filter.priceRange[1]) &&
          // Home type
          el.square_footage >= filter.sqft[0] &&
          (filter.sqft[1] !== 0 ? el.square_footage <= filter.sqft[1] : true) &&
          ((filter.type[0] && el.apt_type === "apartment") ||
            (filter.type[1] && el.apt_type === "family") ||
            (filter.type[2] && el.apt_type === "single family")) &&
          // search
          (savedSearchAddress !== ""
            ? el.address
                .toLowerCase()
                .includes(savedSearchAddress.toLowerCase()) ||
              el.city
                .toLowerCase()
                .includes(savedSearchAddress.toLowerCase()) ||
              el.state
                .toLowerCase()
                .includes(savedSearchAddress.toLowerCase()) ||
              el.zip.toLowerCase().includes(savedSearchAddress.toLowerCase())
            : true)
          // finish the rest
        );
      });

      // sorting bug test
      if (sortedData) {
        let sorting = [...filtered]; // Create a copy of the data
        switch (sort) {
          case "":
            sorting.sort((a, b) => a.id - b.id);
            break;
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
        return;
      }
      setSortedData(filtered);
      return;
      // sorting bug test
    }
  }, [filter, savedSearchAddress, sort]);

  // debug currlisting

  useEffect(() => {
    console.log(currListing);
  }, [currListing]);

  // listing cards
  const listingTemplate = sortedData ? (
    sortedData.slice(page * 8 - 8, page * 8).map((el) => {
      return (
        <div
          key={el.id}
          className="flex flex-col w-96 h-[500px] pb-5 m-3 shadow-xl rounded-xl gap-5 bg-white overflow-hidden"
        >
          <img
            className="h-1/2 rounded-t-xl  hover:scale-105 hover:brightness-75 duration-200 object-cover object-center"
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
              <Link
                onClick={() => changeCurrListing(el.id)}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 duration-300"
                to="/PropertyDetails"
              >
                <button className="">Details</button>
              </Link>
              <p
                className={`font-bold mb-2 ${
                  el.buy_or_rent === "Buy" ? "text-2xl" : "text-xl mt-2"
                }`}
              >{`$${
                el.buy_or_rent === "Buy"
                  ? addComma(el.price)
                  : `${addComma(el.price)}/mo`
              }`}</p>
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

  // parsing nums for price name logic

  const filterPriceNameLogic = (num: string): string | void => {
    if (num.includes("M")) {
      return num;
    }

    const cleanedNum = num.replace(/\D/g, "").replace(/^0+/, "");
    if (cleanedNum === "") {
      return "0";
    }
    if (isNaN(Number(cleanedNum))) {
      return num;
    }

    const numLength = cleanedNum.length;
    let formattedNum = "";

    switch (true) {
      case numLength <= 3:
        formattedNum = cleanedNum;
        break;
      case numLength <= 6:
        formattedNum =
          (parseInt(cleanedNum) / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        break;
      case numLength <= 9:
        formattedNum =
          (parseInt(cleanedNum) / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
        break;
      default:
        formattedNum =
          (parseInt(cleanedNum) / 1000000000).toFixed(1).replace(/\.0$/, "") +
          "B";
        break;
    }

    return formattedNum;
  };

  // price name logic
  const priceTitleLogic = () => {
    let price = "Price";
    if (
      (minValue.length <= 1 && maxValue.length <= 1) ||
      (maxValue === "Any Number" && minValue === "0")
    ) {
      // if they are '' or 0
      price = "Price";
    } else if (
      (minValue.length > 1 && maxValue.length <= 1) ||
      maxValue === "Any Number"
    ) {
      // if min is something and max is nothing
      price = `$${filterPriceNameLogic(minValue)}+`;
    } else if (minValue.length <= 1 && maxValue.length > 1) {
      // if min is nothing and max is something
      price = `Up to $${filterPriceNameLogic(maxValue)}`;
    } else if (minValue.length > 1 && maxValue.length > 1) {
      price = `$${filterPriceNameLogic(minValue)} - $${filterPriceNameLogic(
        maxValue
      )}`;
    }
    setPriceTitle(price);
  };

  useEffect(() => {
    priceTitleLogic();
  }, [sortedData]);

  // sqft mapped options

  const sqftMinMapped = sqftOptions.map((el, index) => {
    return (
      <option
        className={`${
          parseListNumbers(el) > parseListNumbers(maxSqft) &&
          maxSqft !== 'No Max'
            ? "hidden"
            : ""
        }`}
        key={index}
        value={el}
      >
        {el}
      </option>
    );
  });

  // test
useEffect(()=>{
  console.log(minSqft,maxSqft);
  
},[minSqft,maxSqft])
  // test

  const sqftMaxMapped = [...sqftOptions].map((el, index) => {
    return (
      <option
        className={`${
          parseListNumbers(el) < parseListNumbers(minSqft) &&
          minSqft !== 'No Min'
            ? "hidden"
            : ""
        }`}
        key={index}
        value={el}
      >
        {el}
      </option>
    );
  });

  return (
    <>
      <div
        id="listing-page"
        className={`p-10 bg-[#FFFAF7] flex flex-col min-h-screen ${
          activeFilter !== 0 ? "short-page" : ""
        }`}
      >
        <div
          id="listing-page-search"
          className={`flex flex-wrap justify-center gap-5  `}
        >
          <div className="relative w-full max-w-md">
            <div className="relative w-full flex items-center">
              <input
                onFocus={() => setActiveFilter(0)}
                value={searchAddress}
                onChange={(event) => changeSearchAddress(event)}
                className=" py-3 pl-2 pr-32 border-2 text-xl rounded-md relative w-full focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-300"
                type="text"
                placeholder="State/City/Street"
              />
              <div
                id="delete-saved-search"
                className={`absolute flex gap-2 p-1 rounded-md justify-between border-2 h-[35px] w-auto bg-gray-200 font-bold text-center top-2 left-[440px] transform -translate-x-full ${
                  savedSearchAddress !== "" ? "" : "hidden"
                }`}
              >
                {savedSearchAddress}
                <TiDelete
                  onClick={() => setSavedSearchAddress("")}
                  className="text-xl relative top-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Buy Sell Filter button  1*/}
          <div>
            <div
              onClick={() => {
                toggleBuy();
                setActiveFilter(1);
              }}
            >
              <button
                className={`border-[1px] width-max-out-mq border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${
                  buyFilter ? "bg-orange-200 border-orange-300 " : ""
                }`}
              >
                {filter.buySell === "Buy" ? "Buy" : "Rent"}{" "}
                <FaChevronDown
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    buyFilter ? "hidden" : ""
                  } `}
                />{" "}
                <FaChevronUp
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    buyFilter ? "" : "hidden"
                  }`}
                />
              </button>
            </div>
            <div
              className={`bg-[#FFFAF7] border-2 w-72 h-52 absolute mt-1 z-10 rounded-md flex flex-col justify-center shadow-2xl filters-buy  ${
                buyFilter ? "" : "hidden"
              }`}
            >
              <div className="p-6 flex flex-col gap-8">
                <label
                  onClick={() => updateFilter({ buySell: "Buy" })}
                  className="text-xl text-gray-600 hover:text-orange-300"
                  htmlFor="buyCheckBox"
                >
                  <input
                    className="mr-7 scale-150 custom-radio"
                    type="radio"
                    name="buy-sell-radio"
                    defaultChecked={filter.buySell === "Buy"}
                    id="buyCheckBox"
                    value="Buy"
                    checked={filter.buySell === "Buy"}
                  />
                  Buy
                </label>

                <label
                  onClick={() => updateFilter({ buySell: "rent" })}
                  className="text-xl text-gray-600 hover:text-orange-300"
                  htmlFor="rentCheckBox"
                >
                  <input
                    defaultChecked={filter.buySell === "rent"}
                    className="mr-7 scale-150 custom-radio"
                    type="radio"
                    name="buy-sell-radio"
                    id="rentCheckBox"
                    value="Buy"
                    checked={filter.buySell === "rent"}
                  />
                  Rent
                </label>
              </div>
              <div className="p-5">
                <button
                  onClick={() => {
                    toggleBuy();
                    setActiveFilter(0);
                  }}
                  className="border-2 w-full bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Price filter button 2*/}
          <div>
            <div
              onClick={() => {
                togglePrice();
                setActiveFilter(2);
              }}
            >
              <button
                className={`border-[1px] width-max-out-mq border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${
                  priceFilter ? "bg-orange-200 border-orange-300 " : ""
                }`}
              >
                {priceTitle}
                <FaChevronDown
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    priceFilter ? "hidden" : ""
                  }`}
                />
                <FaChevronUp
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    priceFilter ? "" : "hidden"
                  }`}
                />
              </button>
            </div>
            <div
              className={`bg-[#FFFAF7] border-2 w-[500px] h-64 absolute mt-1 z-10 rounded-md shadow-2xl filters-price ${
                priceFilter ? "" : "hidden"
              }`}
            >
              <div className="w-full bg-gray-300 text-gray-500 font-bold">
                <p className="ml-2">Price Range</p>
              </div>
              <div
                className="flex justify-center gap-8 p-5"
                id="min-max-filter"
              >
                <div id="min">
                  <p className="font-bold mb-2">Minimum</p>
                  <input
                    value={minValue}
                    onChange={(event) => changeMinByInput(event)}
                    onBlur={() => {
                      setTimeout(() => {
                        setMinToggle(false);
                      }, 100);
                    }}
                    onFocus={() => setMinToggle(true)}
                    className="text-xl w-40 pl-1 py-3 rounded-md border-[2px] hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    type="text"
                    placeholder="No Min"
                  />
                  <ul
                    className={`overflow-y-scroll h-[200px] bg-white rounded-lg shadow-xl absolute z-20 w-40 ${
                      minToggle ? "" : "hidden"
                    }`}
                  >
                    {minNumber}
                  </ul>
                </div>
                <p className="relative top-[40px] text-2xl">-</p>
                <div id="max">
                  <p className="font-bold mb-2">Maximum</p>
                  <input
                    value={maxValue}
                    onChange={(event) => changeMaxByInput(event)}
                    onBlur={() => {
                      setTimeout(() => {
                        setMaxToggle(false);
                      }, 100);
                    }}
                    onFocus={() => setMaxToggle(true)}
                    className={`text-xl w-40 pl-1 py-3 rounded-md border-[2px] hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300`}
                    type="text"
                    placeholder="No Max"
                  />
                  <ul
                    className={`overflow-y-scroll h-[200px] bg-white rounded-lg shadow-xl absolute z-20 w-40 ${
                      maxToggle ? "" : "hidden"
                    }`}
                  >
                    {maxNumber}
                  </ul>
                </div>
              </div>
              <div className="p-5">
                <button
                  onClick={() => {
                    togglePrice();
                    setActiveFilter(0);
                    updateFilter({
                      priceRange: [
                        parseListNumbers(minValue),
                        parseListNumbers(maxValue),
                      ],
                    });
                  }}
                  className="border-2 w-full bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Bed Bath Filter button 3*/}
          <div>
            <div
              onClick={() => {
                toggleBedBath();
                setActiveFilter(3);
              }}
            >
              <button
                className={`border-[1px] border-gray-400 width-max-out-mq font-bold px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${
                  bedBathFilter ? "bg-orange-200 border-orange-300 " : ""
                }`}
              >
                {`${
                  filter.bathrooms > 0 || filter.bedrooms > 0
                    ? `bd+${filter.bedrooms}, ba+${filter.bathrooms} `
                    : "Beds & Baths"
                }`}
                <FaChevronDown
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    bedBathFilter ? "hidden" : ""
                  }`}
                />
                <FaChevronUp
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    bedBathFilter ? "" : "hidden"
                  }`}
                />
              </button>
            </div>
            <div
              className={`bg-[#FFFAF7] w-[400px] h-[410px] flex flex-col gap-10 absolute mt-1 z-10 rounded-md shadow-2xl filters-bath ${
                bedBathFilter ? "" : "hidden"
              }`}
            >
              <div id="bedroom-filter-section">
                <div className="bg-gray-300 text-gray-500 font-bold w-full">
                  <p className="ml-4">Number of Bedrooms</p>
                </div>
                <div className="px-7 py-4">
                  <p className="font-bold text-gray-700">Bedrooms</p>
                  <button
                    onClick={() => updateFilter({ bedrooms: 0 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bedrooms === 0 ? "bg-orange-300" : ""
                    }`}
                  >
                    Any
                  </button>
                  <button
                    onClick={() => updateFilter({ bedrooms: 1 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bedrooms === 1 ? "bg-orange-300" : ""
                    }`}
                  >
                    1+
                  </button>
                  <button
                    onClick={() => updateFilter({ bedrooms: 2 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bedrooms === 2 ? "bg-orange-300" : ""
                    }`}
                  >
                    2+
                  </button>
                  <button
                    onClick={() => updateFilter({ bedrooms: 3 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bedrooms === 3 ? "bg-orange-300" : ""
                    }`}
                  >
                    3+
                  </button>
                  <button
                    onClick={() => updateFilter({ bedrooms: 4 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bedrooms === 4 ? "bg-orange-300" : ""
                    }`}
                  >
                    4+
                  </button>
                  <button
                    onClick={() => updateFilter({ bedrooms: 5 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bedrooms === 5 ? "bg-orange-300" : ""
                    }`}
                  >
                    5+
                  </button>
                </div>
              </div>
              <div id="bathroom-filter-section">
                <div className="bg-gray-300 text-gray-500 font-bold w-full">
                  <p className="ml-4">Number of Bathrooms</p>
                </div>
                <div className="px-7 py-4">
                  <p className="font-bold text-gray-700">Bathrooms</p>
                  <button
                    onClick={() => updateFilter({ bathrooms: 0 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bathrooms === 0 ? "bg-orange-300" : ""
                    }`}
                  >
                    Any
                  </button>
                  <button
                    onClick={() => updateFilter({ bathrooms: 1 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bathrooms === 1 ? "bg-orange-300" : ""
                    }`}
                  >
                    1+
                  </button>
                  <button
                    onClick={() => updateFilter({ bathrooms: 2 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bathrooms === 2 ? "bg-orange-300" : ""
                    }`}
                  >
                    2+
                  </button>
                  <button
                    onClick={() => updateFilter({ bathrooms: 3 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bathrooms === 3 ? "bg-orange-300" : ""
                    }`}
                  >
                    3+
                  </button>
                  <button
                    onClick={() => updateFilter({ bathrooms: 4 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bathrooms === 4 ? "bg-orange-300" : ""
                    }`}
                  >
                    4+
                  </button>
                  <button
                    onClick={() => updateFilter({ bathrooms: 5 })}
                    className={`w-14 py-2 font-bold text-gray-700 border-2 border-gray-400 rounded-sm hover:bg-gray-200 ${
                      filter.bathrooms === 5 ? "bg-orange-300" : ""
                    }`}
                  >
                    5+
                  </button>
                </div>
              </div>
              <div className="p-5">
                <button
                  onClick={() => {
                    toggleBedBath();
                    setActiveFilter(0);
                  }}
                  className="border-2 w-full bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* More Filter button 4*/}
          <div>
            <div
              onClick={() => {
                toggleMore();
                setActiveFilter(4);
              }}
            >
              <button
                className={`border-[1px] width-max-out-mq border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 hover:border-gray-400 duration-200 ease-in-out ${
                  moreFilter ? "bg-orange-200 border-orange-300 " : ""
                }`}
              >
                More{" "}
                <FaChevronDown
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    moreFilter ? "hidden" : ""
                  }`}
                />{" "}
                <FaChevronUp
                  className={`inline relative bottom-[2px] left-2 text-lg ${
                    moreFilter ? "" : "hidden"
                  }`}
                />
              </button>
            </div>
            <div
              className={`bg-[#FFFAF7] w-[600px] h-[350px] absolute mt-1 z-10 rounded-md shadow-2xl filters-more ${
                moreFilter ? "" : "hidden"
              }`}
            >
              <div className="bg-gray-300 text-gray-500 font-bold w-full">
                <p className="ml-4">More Filters</p>
              </div>
              <div className="flex flex-col gap-5" id="extra-filters">
                <div id="sqft-filter">
                  <p className="font-bold text-gray-700 px-5">Square Feet</p>
                  <div
                    className="flex gap-10 justify-between px-5"
                    id="sqft-min-max"
                  >
                    <select
                      className="text-gray-700 w-2/3 text-lg py-2 border-[1px]"
                      onChange={(event) => changeMinSqft(event)}
                      name=""
                      id=""
                    >
                      <option
                        selected={minSqft === 'No Min'? true : false}
                        value="No Min"
                      >
                        No Min
                      </option>
                      {sqftMinMapped}
                    </select>
                    <select
                      className="text-gray-700 w-2/3 text-lg py-2 border-[1px]"
                      onChange={(event) => changeMaxSqft(event)}
                      name=""
                      id=""
                    >
                      {sqftMaxMapped}
                      <option
                        selected={maxSqft === 'No Max' ? true : false}
                        value="No Max"
                      >
                        No Max
                      </option>
                    </select>
                  </div>
                </div>
                <div id="home-type">
                  <p className="font-bold text-gray-700 px-5">Home-Type</p>
                  <div
                    className="px-5 flex flex-col gap-5"
                    id="home-type-checks"
                  >
                    <label className="text-lg" htmlFor="apt-check">
                      <input
                        className="mr-3 scale-150"
                        type="checkbox"
                        id="apt-check"
                        checked={filter.type[0] ? true : false}
                        onChange={() =>
                          updateFilter({
                            type: [
                              !filter.type[0],
                              filter.type[1],
                              filter.type[2],
                            ],
                          })
                        }
                      />
                      Apartment
                    </label>
                    <label className="text-lg" htmlFor="family-check">
                      <input
                        className="mr-3 scale-150"
                        type="checkbox"
                        id="family-check"
                        checked={filter.type[1] ? true : false}
                        onChange={() =>
                          updateFilter({
                            type: [
                              filter.type[0],
                              !filter.type[1],
                              filter.type[2],
                            ],
                          })
                        }
                      />
                      Family
                    </label>
                    <label className="text-lg" htmlFor="single-family-check">
                      <input
                        className="mr-3 scale-150"
                        type="checkbox"
                        id="single-family-check"
                        checked={filter.type[2] ? true : false}
                        onChange={() =>
                          updateFilter({
                            type: [
                              filter.type[0],
                              filter.type[1],
                              !filter.type[2],
                            ],
                          })
                        }
                      />
                      Single Family
                    </label>
                  </div>
                </div>
              </div>
              <div id="more-filter-buttons" className="px-5 mt-8">
                <button
                  onClick={() => {
                    updateFilter({
                      buySell: "Buy",
                      priceRange: [0, 0],
                      type: [true, true, true],
                      bedrooms: 0,
                      bathrooms: 0,
                      sqft: [0, 0],
                    });
                    setMaxValue("");
                    setMinValue("");
                    setMaxSqft("No Max");
                    setMinSqft("No Min");
                    setActiveFilter(0);
                  }}
                  className=" w-1/2  text-orange-400 font-bold rounded-md py-2 hover:underline duration-200 ease-in-out"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => {
                    toggleMore();
                    setActiveFilter(0);
                    updateFilter({
                      sqft: [
                        parseListNumbers(minSqft),
                        parseListNumbers(maxSqft),
                      ],
                    });
                  }}
                  className="border-2 w-1/2 bg-orange-300 text-white font-bold rounded-md py-2 hover:brightness-75 duration-200 ease-in-out"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <select
            onChange={changeSort}
            className="py-3 px-2 border-[1px] border-gray-400 text-lg rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={() => setActiveFilter(0)}
          >
            <option selected value="">
              Homes For You
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
          <button
            id="listing-search-btn"
            onClick={
              sortedData
                ? () => {
                    if (searchAddress !== "") {
                      setSavedSearchAddress(searchAddress);
                    }
                    searchListings([...sortedData]);
                    setSearchAddress("");
                  }
                : () => {
                    console.log("no data");
                  }
            }
            className="bg-orange-300 text-white font-bold py-3 px-14 border-2 text-xl rounded-md hover:bg-white hover:text-black duration-200 ease-in-out"
          >
            Search
          </button>
        </div>
        <FiLoader
          className={`m-10 text-5xl mx-auto ${loading ? "spin" : "hidden"}`}
        />
        <div id="buttons-listings">
          <div
            id="listing-container"
            className={`flex min-h-screen flex-wrap justify-center my-10 ${
              loading ? "hidden" : ""
            }`}
          >
            {sortedData?.length && sortedData?.length > 1 ? (
              listingTemplate
            ) : (
              <img
                className="mx-auto mt-20 h-[80%]"
                src="noResultsOrange.png"
                alt="man looking for something"
              />
            )}
          </div>
          <div
            className={`flex justify-center ${loading ? "hidden" : ""} ${
              sortedData?.length && sortedData?.length > 1 ? "" : "hidden"
            }`}
            id="listing-page-buttons"
          >
            {page <= 1 ? (
              <button className="px-4 py-2 border-2 shadow-lg rounded-lg hover:border-orange-300 duration-150 ease-in-out">
                {"<<"}
              </button>
            ) : (
              <a href="#nav">
                <button
                  className="px-4 py-2 border-2 shadow-lg rounded-lg hover:border-orange-300 duration-150 ease-in-out"
                  onClick={decreasePage}
                >
                  {"<<"}
                </button>
              </a>
            )}
            {numberButtons}

            <button className="px-4 py-2 shadow-lg rounded-lg bg-gray-300 mx-1">
              ...
            </button>
            <button className="px-4 py-2 shadow-lg rounded-lg bg-gray-300 mx-1">
              {sortedData ? Math.ceil(sortedData.length / 8) : ""}
            </button>
            {sortedData && sortedData?.length / 8 <= page ? (
              <button className="px-4 py-2 border-2 shadow-lg rounded-lg hover:border-orange-300 duration-150 ease-in-out">
                {">>"}
              </button>
            ) : (
              <a href="#nav">
                <button
                  className="px-4 py-2 border-2 shadow-lg rounded-lg hover:border-orange-300 duration-150 ease-in-out"
                  onClick={increasePage}
                >
                  {">>"}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
