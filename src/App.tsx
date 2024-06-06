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


  // search algo logic for listings
  // passing in data as an arg made it so where it no longer was a part of the state and was functioning as a local variable making it not update
  // then when i would attempt to reset the state, it would not reset because the arg had already been passed and was no longer a part of the state
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [savedSearchAddress,setSavedSearchAddress] = useState<string>('');
  const changeSearchAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchAddress(e.target.value);
  };

  // search function
  const searchListings = (): void => {
    if (searchAddress === '') {
      alert('Please Input Data')
      return;
    }
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    }, 1000);
    setPage(1);
    setSortedData(listingData);
    if (listingData) {
     const filteredData = [...listingData].filter(el => {
        return (
          // search functions
          (el.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
          el.city.toLowerCase().includes(searchAddress.toLowerCase()) ||
          el.state.toLowerCase().includes(searchAddress.toLowerCase()) ||
          el.zip.toLowerCase().includes(searchAddress.toLowerCase())) &&
          // filter functions
          el.bedrooms >= filter.bedrooms &&
          el.bathrooms >= filter.bathrooms &&
          el.buy_or_rent === filter.buySell 
        );
      });
      setSortedData(filteredData)
    }
  }
  
  // debug search algo
  useEffect(()=>console.log(searchAddress),[searchAddress]
  )
 

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
  const [review,setReview] = useState<string>('');
  const changeReview = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setReview(e.target.value);
  }
  useEffect(()=>{
    console.log(review);
  },[review])
  // here I am creating the state variable to house the filtered agent data state
const [filteredAgentData,setFilteredAgentData] = useState<AgentInterface[] | null>(null);
const filteredDataTransfer = ()=>{
  if(agentData){
    setFilteredAgentData([...agentData]);
  }
}
useEffect(()=>{
  filteredDataTransfer();
},[agentData])


// loading
const [loading,setLoading] = useState<boolean>(false);


// filtering use state object
const [filter,setFilter] = useState<FilterInterface>(
  {'buySell': 'Buy',
'priceRange': [0,0],
'type':'',
'bedrooms' : 0,
'bathrooms' : 0,
'sqft' : [0,0]});

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
const [activeFilter,setActiveFilter] = useState<number>(0);
// focus logic
const checkFocus = ()=>{
  switch(activeFilter){
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
      setMoreFilter(false)
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
}
useEffect(()=>{
  checkFocus()
},[activeFilter])

// max and min toggle
const [maxToggle,setMaxToggle] = useState<boolean>(false);
const [minToggle,setMinToggle] = useState<boolean>(false);

// max and min data use input retrieval variables

const [minValue,setMinValue] = useState<string>('');
const [maxValue,setMaxValue] = useState<string>('');

// how to retrieve data from a li element 
const changeMinByBtn = (e: React.MouseEvent<HTMLLIElement>) => {
  setMinValue(e.currentTarget.textContent || '');
};

const changeMaxByBtn = (e: React.MouseEvent<HTMLLIElement>) => {
  setMaxValue(e.currentTarget.textContent || '');
};

useEffect(()=>console.log(minValue,maxValue),[minValue,maxValue,filter]
)

// input min max user input 
const changeMinByInput = (e: ChangeEvent<HTMLInputElement>)=>{
  setMinValue(e.target.value);
}
const changeMaxByInput = (e:ChangeEvent<HTMLInputElement>)=>{
  setMaxValue(e.target.value);
}


  return (
    <>
      <Router>
        <Nav menu={menu} toggleMenu={toggleMenu} />
        <ScrollToTop />
        <Routes>
          <Route
            path="/Home"
            element={
              <Home
                filter={filter}
                updateFilter={updateFilter}
                listingData={listingData}
              />
            }
          />
          <Route path="/AgentsDetails" element={<AgentsDetails />} />
          <Route path="/PropertyDetailsAbout" element={<PropertyDetails />} />
          <Route path="/Agents" element={<Agents agentData={agentData} review={review} changeReview={changeReview} filteredAgentData={filteredAgentData} setFilteredAgentData={setFilteredAgentData}  />}  />
          <Route
            path="/Listing"
            element={
              <Listing
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
              />
            }
          />
          <Route path="/About" element={<About />} />
          Listing
        </Routes>
      </Router>
    </>
  );
}

export default App;
