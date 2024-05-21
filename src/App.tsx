import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useActionData } from "react-router-dom";
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

function App() {

  // fetch listings

  const [listingData,setListingData] = useState<ListingInterface[] | null>(null);
 
  const fetchListings = async()=>{
    try{const res = await fetch('/JsonFiles/ListingsInfo.json');
    const data = await res.json();
    console.log(data);
    setListingData(data);}
    catch(error){
      console.error(`Error Woah: ${error}`); 
    }
  }

  useEffect(()=>{
    fetchListings()
  },[])

  // fetch Agents
  const [agentData,setAgentData] = useState<AgentInterface[] | null>(null);
 
  const fetchAgents = async()=>{
    try{const res = await fetch('/JsonFiles/AgentInfo.json');
    const data = await res.json();
    console.log(data);
    setAgentData(data);}
    catch(error){
      console.error(`Error Woah: ${error}`); 
    }
  }

  useEffect(()=>{
    fetchAgents();
  },[])

  // hamburger menu toggle logic
  const [menu,setMenu] = useState<boolean>(false);
  const toggleMenu = ():void =>{
    setMenu(!menu);
  }


  // pagination logic
  const [page,setPage] = useState<number>(1);
  const numberPageSet = (page : number) : void => {
    setPage(page);
  }
  const increasePage = ():void=>{
    if(page === Math.floor((Number(listingData?.length) / 8))){
      return;
    }
    setPage(page + 1);
  }
  const decreasePage = ():void=>{
    if(page === 1){
      return
    }
    setPage(page - 1);
  }
  // debug
  useEffect(()=>{
    console.log(page);
    
  },[page])


  //Buy and rent toggle on home page false === buy && true === rent
  const [rentBuy,setRentBuy] = useState<boolean>(false);
  const falseRentBuy = ():void =>{
    setRentBuy(false);
  }
  const trueRentBuy = ():void =>{
    setRentBuy(true);
  } 

  // search algo logic
  const [searchAddress,setSearchAddress] = useState<string>('');
  const changeSearchAddress = (e:React.ChangeEvent<HTMLInputElement>):void =>{
    
    setSearchAddress(e.target.value);
  }
  useEffect(()=>console.log(searchAddress),[searchAddress]
  )



  return (
    <>
      <Router>
        <Nav menu={menu} toggleMenu={toggleMenu} />
        <ScrollToTop />
        <Routes>
          <Route path="/Home" element={<Home rentBuy={rentBuy} falseRentBuy={falseRentBuy} trueRentBuy={trueRentBuy} />} />
          <Route path="/AgentsDetails" element={<AgentsDetails />} />
          <Route path="/PropertyDetailsAbout" element={<PropertyDetails />} />
          <Route path="/Agents" element={<Agents agentData={agentData} />} />
          <Route path="/Listing" element={<Listing changeSearchAddress={changeSearchAddress} searchAddress={searchAddress} decreasePage={decreasePage} increasePage={increasePage} page={page} numberPageSet={numberPageSet} listingData={listingData} />} />
          <Route path="/About" element={<About />} />
          Listing
        </Routes>
      </Router>
    </>
  );
}

export default App;
