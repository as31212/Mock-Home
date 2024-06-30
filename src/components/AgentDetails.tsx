import { AgentInterface } from "../interfaces/AgentInterface";
import StarRatings from "./StarRatings";
import { ListingInterface } from "../interfaces/ListingsInterface";
import { FaShower } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { Link } from "react-router-dom";

interface AgentDetailsInterface {
  currAgent: number;
  agentData: AgentInterface[] | null;
  listingData: ListingInterface[] | null;
  changeCurrListing: (elId: number) => void;
  addComma: (price:number) => void;
}
const AgentsDetails: React.FC<AgentDetailsInterface> = ({
  currAgent,
  agentData,
  listingData,
  changeCurrListing,
  addComma,
}) => {
  const currAgentObj = agentData
    ? agentData.find((el) => el.id === currAgent)
    : "";

  const mappedSales = currAgentObj
    ? currAgentObj.saleHistory.map((el) => {
        return (
          <div key={el.id}>
            <div className="flex gap-5 py-2">
              <p className="w-1/4">{el.address}</p>
              <p className="w-1/4">{el.dateOfSale}</p>
              <p className="w-1/4">{el.closingPrice}</p>
              <p className="w-1/4">{el.represented}</p>
            </div>
            <hr className="border-orange-400" />
          </div>
        );
      })
    : "";

  return (
    <>
      <div className="bg-[#FFFAF7]" id="outer-page">
        <div
          id="agent-details-page"
          className="min-h-screen w-8/12 pt-20 rounded-md p-5 mx-auto flex justify-around"
        >
          <div className="flex flex-col gap-5 items-start" id="left-divs-agent-details">
            <div
              className="flex flex-wrap justify-center p-5 rounded-md border-black items-center gap-5"
              id="agent-details-bio"
            >
              <img
                className=" w-52 h-52 rounded-full object-cover object-center"
                src={currAgentObj ? currAgentObj.img : ""}
                alt={currAgentObj ? `img of ${currAgentObj.name}` : ""}
              />
              <div className="flex flex-col gap-2" id="agent-details-bio-text">
                <p className="font-bold">
                  {currAgentObj ? currAgentObj.name : ""}
                </p>
                <p>Real-IT Premier Agent</p>
                <p className="flex gap-2 text-orange-400 font-bold">
                  <StarRatings
                    goodStarAmt={currAgentObj ? currAgentObj.rating : 1}
                    badStarAmt={currAgentObj ? 5 - currAgentObj.rating : 1}
                  />
                  {`${currAgentObj ? currAgentObj.rating : ""} Star Rating`}
                </p>
              </div>
            </div>
            <div className="p-5 w-full" id="agent-sale-history">
                <h2 className="font-bold text-xl mb-5">Recent Sales</h2>
              <div className="flex gap-5 font-bold border-b-2 py-2 px-4 bg-orange-400 text-white rounded-lg">
                <p className="w-1/4">Address</p>
                <p className="w-1/4">Date Of Sale</p>
                <p className="w-1/4">Closing Price</p>
                <p className="w-1/4">Represented</p>
              </div>
              <div className="p-4 h-40 overflow-y-scroll border-x-2 border-b-2 border-t-0 rounded-lg" id="mapped-sales">{mappedSales}</div>
            </div>
            
            <div className="" id="agent-listings">
                {/* listings */}
                <div
        id="agent-listings"
        className="flex flex-col h-auto min-h-[750px] "
      >
        <h2 className="p-4 font-bold text-xl">For Sale</h2>
        <div
          id="agent-details-listings-container"
          className="flex flex-wrap justify-center"
        >
          {listingData
          // ensured that listings will always be from the state of origin for agents and also ensures that the listings will be homes and not apts
            ? [...listingData].filter(el=>el.state === currAgentObj.state && el.buy_or_rent === 'Buy').slice(1, 3).map((el) => {
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
                        <Link
                          onClick={() => changeCurrListing(el.id)}
                          to="/PropertyDetails"
                        >
                          <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 duration-300">
                            Details
                          </button>
                        </Link>
                        <p className="font-bold text-2xl">{`$${addComma(el.price)}`}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Data Found"}
        </div>
      </div>
{/* Listings */}
            </div>
          </div>
          <div className="flex flex-col gap-5" id="right-divs-agent-details">
            <div
              className="flex flex-col w-80 rounded-md border-2 py-5 px-4"
              id="contact-us-div"
            >
              <h2 className="font-bold text-xl mb-4">Contact Us</h2>
              <label className="font-bold mb-4" htmlFor="contact-name-input">
                Name
              </label>
              <input
                className="border-2 bg-gray-100 pl-2 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-300"
                type="text"
                name=""
                id="contact-name-input"
              />
              <label className="font-bold mb-4" htmlFor="contact-phone-input">
                Phone
              </label>
              <input
                className="border-2 bg-gray-100 pl-2 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-300 "
                type="text"
                name=""
                id="contact-phone-input"
              />
              <label className="font-bold mb-4" htmlFor="contact-message-input">
                Message <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={5}
                className="bg-gray-100 border-2 rounded-md resize-none pl-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-300"
                name=""
                id=""
              ></textarea>
              <button className="w-70 p-3 border-2 font-bold mt-5 bg-orange-400 rounded-md text-white hover:bg-white hover:text-black duration-200 ease-in-out ">
                Contact Us
              </button>
            </div>
            <div
              className="flex flex-col gap-9 w-80 h-[590px] rounded-md border-2 p-5"
              id="agent-schedule"
            >
              <h2 className="font-bold text-xl mb-4">Agent Schedule</h2>
              <p>
                <span className="font-bold">Monday: </span>
                {currAgentObj ? currAgentObj.availability.Monday : ""}
              </p>
              <p>
                <span className="font-bold">Tuesday: </span>
                {currAgentObj ? currAgentObj.availability.Tuesday : ""}
              </p>
              <p>
                <span className="font-bold">Wednesday: </span>
                {currAgentObj ? currAgentObj.availability.Wednesday : ""}
              </p>
              <p>
                <span className="font-bold">Thursday: </span>
                {currAgentObj ? currAgentObj.availability.Thursday : ""}
              </p>
              <p>
                <span className="font-bold">Friday: </span>
                {currAgentObj ? currAgentObj.availability.Friday : ""}
              </p>
              <p>
                <span className="font-bold">Saturday: </span>
                {currAgentObj ? currAgentObj.availability.Saturday : ""}
              </p>
              <p>
                <span className="font-bold">Sunday: </span>
                {currAgentObj ? currAgentObj.availability.Sunday : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentsDetails;
