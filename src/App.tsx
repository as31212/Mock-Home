import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Listing from "./components/Listing";
import Agents from "./components/Agents";
import About from "./components/About";
import PropertyDetails from "./components/PropertyDetails";
import AgentsDetails from "./components/AgentDetails";
import Home from "./components/Home";
import { ListingInterface } from "./interfaces/ListingsInterface";
import { AgentInterface } from "./interfaces/AgentInterface";

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

  // pagination logic
  const [page,setPage] = useState<number>(1);
  const numberPageSet = (page : number) : void => {
    setPage(page);
  }
  const increasePage = ():void=>{
    if(page === Math.floor((Number(listingData?.length) / 6))){
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
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/AgentsDetails" element={<AgentsDetails />} />
          <Route path="/PropertyDetailsAbout" element={<PropertyDetails />} />
          <Route path="/Agents" element={<Agents agentData={agentData} />} />
          <Route path="/Listing" element={<Listing decreasePage={decreasePage} increasePage={increasePage} page={page} numberPageSet={numberPageSet} listingData={listingData} />} />
          <Route path="/About" element={<About />} />
          Listing
        </Routes>
      </Router>
    </>
  );
}

export default App;
