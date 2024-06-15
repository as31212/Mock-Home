// src/components/PropertyDetails.tsx
import React from "react";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { AgentInterface } from "../interfaces/AgentInterface";
import { Link } from "react-router-dom";
import StarRatings from "./StarRatings";
import { FaArrowRight } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { CiMail } from "react-icons/ci";



interface PropertyDetailsInterface {
  sortedData: ListingInterface[] | null;
  currListing: number;
  addComma: (price: number) => string;
  agentData: AgentInterface[] | null;
  listingData: ListingInterface[] | null;
  changeCurrListing: (elId:number)=> void;
}

const PropertyDetails: React.FC<PropertyDetailsInterface> = ({
  sortedData,
  currListing,
  addComma,
  agentData,
  listingData,
  changeCurrListing,
}) => {
  const currObj = sortedData?.find((el) => el.id === currListing);
  const randomAgentId = agentData
    ? Math.floor(Math.random() * agentData.length)
    : 1;
  const currAgent = agentData
    ? agentData.find((el) => randomAgentId === el.id)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF7]">
      {/* images collage */}
      <div
        id="listing-detail-images"
        className="flex gap-3 mx-auto w-2/3 max-w-[1800px] max-h-[60vh] mt-10"
      >
        <img
          className="rounded-xl w-2/3 h-full max-h-[556px]"
          src={currObj?.image_url}
          alt=""
        />
        <div className="flex gap-2 w-1/3 flex-col">
          <img
            className="rounded-xl w-full h-1/2"
            src={currObj?.image_url}
            alt=""
          />
          <img
            className="rounded-xl w-full h-1/2"
            src={currObj?.image_url}
            alt=""
          />
        </div>
      </div>
      {/* content divs */}
      <div className="flex justify-center gap-5 mt-16">
        <div className=" w-6/12 flex flex-col gap-5" id="left-divs">
          <div
            id="first-left-detail-div"
            className="border-2 bg-white rounded-lg p-10 flex flex-col gap-5"
          >
            <h2 className="text-3xl font-bold">
              {currObj
                ? `${currObj.address},${currObj.city},${currObj.state} ${currObj.zip}`
                : ""}
            </h2>
            <div className="flex gap-5" id="month-and-total-price">
              <div className="border-2 w-52 rounded-lg p-1 flex flex-col gap-2">
                <p className="font-semibold text-2xl">{`$${
                  currObj ? addComma(currObj?.price) : ""
                }`}</p>
                <p className="text-gray-500 text-sm">Online / Cash Payment</p>
              </div>
              <div className="border-2 w-52 rounded-lg p-1 flex flex-col gap-2">
                <p className="font-semibold text-2xl">{`$${
                  currObj ? addComma(Math.floor(currObj?.price / 240)) : ""
                } / month`}</p>
                <p className="text-gray-500 text-sm">0% EMI for 5 Months</p>
              </div>
            </div>
            <div id="description">
              <h2 className="font-semibold text-lg">{`Well-constructed ${
                currObj?.square_footage
              } Sqft ${
                currObj?.apt_type.includes("family")
                  ? `${currObj?.apt_type} Home`
                  : currObj?.apt_type
              }`}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laboriosam consectetur deserunt nemo quasi aspernatur earum in
                nisi iste, officia natus libero repellendus, expedita est sit
                assumenda id architecto similique autem? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Incidunt quasi provident
                alias repudiandae cupiditate omnis officiis quibusdam at tempore
                quis laudantium nam maxime id doloremque, dicta eveniet,
                expedita culpa dolorem? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Doloremque, dolores facilis dicta fugiat
                accusamus molestiae rem perferendis quos laborum eius voluptatem
                corporis eos a inventore ad beatae blanditiis ab? Incidunt?
              </p>
            </div>
            <div id="map-property-details">
              <h2>Map</h2>
            </div>
          </div>
          <div
            className="border-2 rounded-lg bg-white flex flex-col gap-3 p-10"
            id="second-left-div"
          >
            <h2 className="font-bold text-xl">Agent Information</h2>
            <div className="flex gap-3" id="agent-info-listing-details">
              <img
                className="w-[100px] h-[100px] rounded-lg object-cover object-center"
                src={currAgent?.img}
                alt={`image of ${currAgent?.name}`}
              />
              <div className="flex flex-col gap-2">
              <p>{currAgent?.name}</p>
                <div>
                  <p className="flex gap-2 font-semibold">
                    <StarRatings
                      goodStarAmt={Math.floor(
                        currAgent ? currAgent?.rating : 0
                      )}
                      badStarAmt={
                        5 - Math.floor(currAgent ? currAgent?.rating : 0)
                      }
                    />
                    {`${currAgent?.rating} Review`}
                  </p>
                </div>
                <p className="text-gray-600 flex gap-2"><CiMail className="inline relative top-[5px]"/> {`${currAgent?.name.toLowerCase().replace(/\s+/g, '')}@realit.com`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/12" id="right-divs">
          <div className="flex flex-col p-5 gap-5 border-2 rounded-lg bg-white">
            <h2 className="font-bold text-2xl">Request for Visit</h2>
            <input
              className="border-2 p-3 rounded-lg"
              placeholder="Full Name"
              type="text"
              name=""
              id=""
            />
            <input
              className="border-2 p-3 rounded-lg"
              placeholder="Email Address"
              type="email"
              name=""
              id=""
            />
            <input
              className="border-2 p-3 rounded-lg"
              placeholder="Phone Number"
              type="text"
              name=""
              id=""
            />
            <input
              className="border-2 p-3 rounded-lg"
              type="date"
              name=""
              id=""
            />
            <textarea
              className="border-2 rounded-lg p-2 resize-none"
              rows={5}
              placeholder="message"
              name=""
              id=""
            ></textarea>
            <button className="p-3 border-2 rounded-lg">Send Request</button>
          </div>
        </div>
      </div>
      {/* new listings */}
      
      <div
        id="details-page-listings"
        className="flex flex-col gap-20 mt-20 p-5 h-auto min-h-[750px] justify-center"
      >
        <div
          id="details-page-listings-header"
          className="flex justify-between items-center px-[290px]"
        >
          <h2 className="font-bold text-2xl">Latest Properties</h2>
          <Link to="/Listing">
            <h2 className="font-bold text-2xl text-orange-400 hover:underline">
              Explore All{" "}
              <FaArrowRight className="inline relative bottom-[2px]" />
            </h2>
          </Link>
        </div>
        <div
          id="latest-listings-container"
          className="flex gap-12 flex-wrap justify-center items-center"
        >
          {listingData
            ? [...listingData].slice(4, 7).map((el) => {
                return (
                  <div
                    key={el.id}
                    className="flex flex-col w-96 h-[500px] pb-5 m-3 shadow-xl rounded-xl gap-5 bg-white overflow-hidden"
                  >
                    <img
                      className="h-1/2 rounded-t-xl hover:scale-105 hover:brightness-75 duration-200"
                      src={el.image_url}
                      alt={`${el.address} picture`}
                    />
                    <div className="flex flex-col px-10 gap-4 ">
                      <p className="font-bold text-[18px] h-[50px]">
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
                        
                          <a href="#nav">
                            <button onClick={()=>changeCurrListing(el.id)} className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 duration-300">
                              View Details
                            </button>
                          </a>
                     
                        <p className="font-bold text-2xl">{`$${el.price}`}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Data Found"}
        </div>
      </div>

    </div>
  );
};

export default PropertyDetails;
