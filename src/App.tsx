import { useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Listing from "./components/Listing";
import Agents from "./components/Agents";
import About from "./components/About";
import PropertyDetails from "./components/PropertyDetails";
import AgentsDetails from "./components/AgentDetails";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/AgentsDetails" element={<AgentsDetails />} />
          <Route path="/PropertyDetailsAbout" element={<PropertyDetails />} />
          <Route path="/Agents" element={<Agents />} />
          <Route path="/Listing" element={<Listing />} />
          <Route path="/About" element={<About />} />
          Listing
        </Routes>
      </Router>
    </>
  );
}

export default App;
