import { ChangeEvent, ReactHTMLElement, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useActionData,
} from "react-router-dom";
import Nav from "./components/Nav";
import Listing from "./components/Listing";
import Agents from "./components/Agents";
import About from "./components/About";
import PropertyDetails from "./components/PropertyDetails";
import AgentsDetails from "./components/AgentDetails";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { ListingInterface } from "./interfaces/ListingsInterface";
import { AgentInterface } from "./interfaces/AgentInterface";
import ScrollToTop from "./ScrollToTop";
import { FilterInterface } from "./interfaces/FilterInterface";
import { faL } from "@fortawesome/free-solid-svg-icons";

function App() {
  // fetch listings

  const [listingData, setListingData] = useState<ListingInterface[] | null>(
    null
  );

  const fetchListings = async () => {
    try {
      const res = await fetch("/JsonFiles/ListingsInfo.json");
      const data = await res.json();
      console.log(data);
      setListingData(data);
    } catch (error) {
      console.error(`Error Woah: ${error}`);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // fetch Agents
  const [agentData, setAgentData] = useState<AgentInterface[] | null>(null);

  const fetchAgents = async () => {
    try {
      const res = await fetch("/JsonFiles/AgentInfo.json");
      const data = await res.json();
      console.log(data);
      setAgentData(data);
    } catch (error) {
      console.error(`Error Woah: ${error}`);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // hamburger menu toggle logic
  const [menu, setMenu] = useState<boolean>(false);
  const toggleMenu = (): void => {
    setMenu(!menu);
  };

  // pagination logic
  const [page, setPage] = useState<number>(1);
  const numberPageSet = (page: number): void => {
    setPage(page);
  };
  const increasePage = (): void => {
    if (page === Math.floor(Number(listingData?.length) / 8)) {
      return;
    }
    setPage(page + 1);
  };
  const decreasePage = (): void => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  // state abbreviations for search algo

  const stateAbbreviations = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  };
  

  // search algo logic for listings
  // passing in data as an arg made it so where it no longer was a part of the state and was functioning as a local variable making it not update
  // then when i would attempt to reset the state, it would not reset because the arg had already been passed and was no longer a part of the state
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [savedSearchAddress, setSavedSearchAddress] = useState<string>("");
  const changeSearchAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchAddress(e.target.value);
  };

  // search function
  const searchListings = (): void => {
    if (searchAddress === "") {
      alert("Please Input Data");
      return;
    }
    setSavedSearchAddress(searchAddress);
    setSearchAddress("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setPage(1);
    setSortedData(listingData);
    if (listingData) {
      const filteredData = [...listingData].filter((el) => {
        return (
          // search functions
          (el.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
            el.city.toLowerCase().includes(searchAddress.toLowerCase()) ||
            (el.state.toLowerCase().includes(stateAbbreviations[searchAddress]?.toLowerCase() || searchAddress.toLowerCase())) ||  
            el.state.toLowerCase().includes(searchAddress.toLowerCase()) ||
            el.zip.toLowerCase().includes(searchAddress.toLowerCase())) &&
          // filter functions
          el.bedrooms >= filter.bedrooms &&
          el.bathrooms >= filter.bathrooms &&
          el.buy_or_rent === filter.buySell
        );
      });
      setSortedData(filteredData);
    }
  };

  // debug search algo
  useEffect(() => console.log(searchAddress), [searchAddress]);

  // sorting
  const [sort, setSort] = useState<string>("");
  const changeSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSort(e.target.value);
  };
  // declare sortedData variable and fetch data
  const [sortedData, setSortedData] = useState<ListingInterface[] | null>(null);
  const fetchSortedListings = () => {
    if (listingData) {
      setSortedData([...listingData]);
    }
  };
  useEffect(() => {
    fetchSortedListings();
  }, [listingData]);

  // review agent sort logic
  const [review, setReview] = useState<string>("");
  const changeReview = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReview(e.target.value);
  };
  useEffect(() => {
    console.log(review);
  }, [review]);
  // here I am creating the state variable to house the filtered agent data state
  const [filteredAgentData, setFilteredAgentData] = useState<
    AgentInterface[] | null
  >(null);
  const filteredDataTransfer = () => {
    if (agentData) {
      setFilteredAgentData([...agentData]);
    }
  };
  useEffect(() => {
    filteredDataTransfer();
  }, [agentData]);

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // filtering use state object
  const [filter, setFilter] = useState<FilterInterface>({
    buySell: "Buy",
    priceRange: [0, 0],
    type: [true, true, true],
    bedrooms: 0,
    bathrooms: 0,
    sqft: [0, 0],
  });

  const updateFilter = (newProperty: Partial<FilterInterface>) => {
    // prev filter is just the previous state of the object
    setFilter((prevFilter) => ({
      // here you are creating a copy of the object using the ... operator
      // you then add the new property to the object
      // but because the property already exist within the object
      // it will just be overwritten
      ...prevFilter,
      ...newProperty,
    }));
  };

  // page reset when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  // filter toggles
  const [bedBathFilter, setBedBathFilter] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<boolean>(false);
  const [buyFilter, setBuyFilter] = useState<boolean>(false);
  const [moreFilter, setMoreFilter] = useState<boolean>(false);

  // Toggle functions
  const toggleBedBath = () => {
    setBedBathFilter(!bedBathFilter);
  };

  const togglePrice = () => {
    setPriceFilter(!priceFilter);
  };

  const toggleBuy = () => {
    setBuyFilter(!buyFilter);
  };

  const toggleMore = () => {
    setMoreFilter(!moreFilter);
  };

  // toggle active filter
  const [activeFilter, setActiveFilter] = useState<number>(0);
  // focus logic
  const checkFocus = () => {
    switch (activeFilter) {
      case 0:
        setBedBathFilter(false);
        setPriceFilter(false);
        setBuyFilter(false);
        setMoreFilter(false);
        break;
      case 1:
        setBedBathFilter(false);
        setPriceFilter(false);
        setMoreFilter(false);

        break;
      case 2:
        setBedBathFilter(false);

        setBuyFilter(false);
        setMoreFilter(false);
        break;
      case 3:
        setMoreFilter(false);
        setPriceFilter(false);
        setBuyFilter(false);

        break;
      case 4:
        setBedBathFilter(false);
        setPriceFilter(false);
        setBuyFilter(false);

        break;
      case 5:
        setBedBathFilter(false);
        setPriceFilter(false);
        setBuyFilter(false);
        setMoreFilter(false);
        break;
      case 6:
        setBedBathFilter(false);
        setPriceFilter(false);
        setBuyFilter(false);
        setMoreFilter(false);
        break;
    }
  };
  useEffect(() => {
    checkFocus();
  }, [activeFilter]);

  // max and min toggle
  const [maxToggle, setMaxToggle] = useState<boolean>(false);
  const [minToggle, setMinToggle] = useState<boolean>(false);

  // maxNums minNums array

  const minNumbers = [
    "0",
    "50,000",
    "100,000",
    "150,000",
    "200,000",
    "250,000",
    "300,000",
    "350,000",
    "400,000",
    "450,000",
    "500,000",
    "550,000",
    "600,000",
    "650,000",
    "700,000",
    "750,000",
    "800,000",
    "850,000",
    "900,000",
    "950,000",
    "1M",
    "1.25M",
    "1.5M",
    "1.75M",
    "2M",
    "2.25M",
    "2.5M",
    "2.75M",
    "3M",
    "3.25M",
    "3.5M",
    "3.75M",
    "4M",
    "4.25M",
    "4.5M",
    "4.75M",
    "5M",
    "5.25M",
    "5.5M",
    "5.75M",
    "6M",
    "7M",
    "8M",
    "9M",
    "10M",
    "11M",
    "12M",
    "13M",
    "14M",
    "15M",
    "16M",
    "17M",
    "18M",
  ];

  const maxNumbers = [
    "0",
    "50,000",
    "100,000",
    "150,000",
    "200,000",
    "250,000",
    "300,000",
    "350,000",
    "400,000",
    "450,000",
    "500,000",
    "550,000",
    "600,000",
    "650,000",
    "700,000",
    "750,000",
    "800,000",
    "850,000",
    "900,000",
    "950,000",
    "1M",
    "1.25M",
    "1.5M",
    "1.75M",
    "2M",
    "2.25M",
    "2.5M",
    "2.75M",
    "3M",
    "3.25M",
    "3.5M",
    "3.75M",
    "4M",
    "4.25M",
    "4.5M",
    "4.75M",
    "5M",
    "5.25M",
    "5.5M",
    "5.75M",
    "6M",
    "7M",
    "8M",
    "9M",
    "10M",
    "11M",
    "12M",
    "13M",
    "14M",
    "15M",
    "16M",
    "17M",
    "18M",
    "Any Number",
  ];

  useEffect(() => console.log(filter.sqft), [filter]);

  // Sqft min and max lists for select options

  const sqftOptions = [
    "500",
    "750",
    "1,000",
    "1,250",
    "1,500",
    "1,750",
    "2,000",
    "2,250",
    "2,500",
    "2,750",
    "3,000",
    "3,500",
    "4,000",
    "5,000",
    "7,500",
  ];

  // max and min data use input retrieval variables

  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");

  // how to retrieve data from a li element
  const changeMinByBtn = (key: number) => {
    setMinValue(minNumbers[key]);
  };

  useEffect(() => console.log(minValue, maxValue), [minValue, maxValue]);

  useEffect(() => console.log(filter.priceRange), [filter]);

  const changeMaxByBtn = (key: number) => {
    setMaxValue(maxNumbers[key]);
  };

  // input min max user input
  const changeMinByInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMinValue(e.target.value);
  };
  const changeMaxByInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.target.value);
  };

  // min and max sqft state and retireve use input function

  const [minSqft, setMinSqft] = useState<string>("0");
  const [maxSqft, setMaxSqft] = useState<string>("0");
  const changeMaxSqft = (e: ChangeEvent<HTMLSelectElement>) => {
    setMaxSqft(e.target.value);
  };
  const changeMinSqft = (e: ChangeEvent<HTMLSelectElement>) => {
    setMinSqft(e.target.value);
  };

  return (
    <>
      <Router>
        <Nav menu={menu} activeFilter={activeFilter} toggleMenu={toggleMenu} />
        <ScrollToTop />
        <Routes>
          <Route
            path="/Home"
            element={
              <Home
                filter={filter}
                updateFilter={updateFilter}
                listingData={listingData}
                searchListings={searchListings}
                searchAddress={searchAddress}
                changeSearchAddress={changeSearchAddress}
              />
            }
          />
          <Route path="/AgentsDetails" element={<AgentsDetails />} />
          <Route path="/PropertyDetailsAbout" element={<PropertyDetails />} />
          <Route
            path="/Agents"
            element={
              <Agents
                agentData={agentData}
                review={review}
                changeReview={changeReview}
                filteredAgentData={filteredAgentData}
                setFilteredAgentData={setFilteredAgentData}
              />
            }
          />
          <Route
            path="/Listing"
            element={
              <Listing
                setMaxSqft={setMaxSqft}
                setMinSqft={setMinSqft}
                changeMinSqft={changeMinSqft}
                changeMaxSqft={changeMaxSqft}
                minSqft={minSqft}
                maxSqft={maxSqft}
                setLoading={setLoading}
                setMinValue={setMinValue}
                setMaxValue={setMaxValue}
                minNumbers={minNumbers}
                maxNumbers={maxNumbers}
                changeMaxByInput={changeMaxByInput}
                changeMinByInput={changeMinByInput}
                changeMaxByBtn={changeMaxByBtn}
                maxValue={maxValue}
                changeMinByBtn={changeMinByBtn}
                minValue={minValue}
                changeSearchAddress={changeSearchAddress}
                searchAddress={searchAddress}
                decreasePage={decreasePage}
                increasePage={increasePage}
                page={page}
                numberPageSet={numberPageSet}
                sortedData={sortedData}
                changeSort={changeSort}
                sort={sort}
                setSortedData={setSortedData}
                searchListings={searchListings}
                loading={loading}
                priceFilter={priceFilter}
                buyFilter={buyFilter}
                bedBathFilter={bedBathFilter}
                moreFilter={moreFilter}
                togglePrice={togglePrice}
                toggleBedBath={toggleBedBath}
                toggleMore={toggleMore}
                toggleBuy={toggleBuy}
                listingData={listingData}
                filter={filter}
                updateFilter={updateFilter}
                savedSearchAddress={savedSearchAddress}
                setSavedSearchAddress={setSavedSearchAddress}
                setSearchAddress={setSearchAddress}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                checkFocus={checkFocus}
                maxToggle={maxToggle}
                setMaxToggle={setMaxToggle}
                minToggle={minToggle}
                setMinToggle={setMinToggle}
                sqftOptions={sqftOptions}
              />
            }
          />
          <Route path="/About" element={<About />} />
          Listing
        </Routes>
        <Footer activeFilter={activeFilter} />
      </Router>
    </>
  );
}

export default App;
