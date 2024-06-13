import Footer from "./Footer";
import { AgentInterface } from "../interfaces/AgentInterface";
import StarRatings from "./StarRatings";
import { useEffect } from "react";

interface AgentProps {
  agentData: AgentInterface[] | null;
  changeReview: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  review: string;
  filteredAgentData: AgentInterface[] | null;
  setFilteredAgentData:(data: AgentInterface[] | null) => void;
}

const Agents: React.FC<AgentProps> = ({ agentData, review, changeReview, filteredAgentData ,setFilteredAgentData }) => {
  
  const sortReview = () => {
    // Reset to initial data
    setFilteredAgentData(agentData);

    if (review === "") {
      return;
    }

    if (agentData) {
      let filteredData = agentData.filter((el) => {
        switch (review) {
          case "5":
            return el.rating == 5;
          case "4":
            return el.rating >= 4;
          case "3":
            return el.rating >= 3;
          case "2":
            return el.rating >= 2;
          case "1":
            return el.rating >= 1;
          default:
            return true;
        }
      });
      setFilteredAgentData(filteredData);
    }
  };
  
  useEffect(()=>{
    sortReview();
  },[review])

  const agentTemplate = filteredAgentData
    ? [...filteredAgentData].map((el) => {
        return (
          <div className="bg-white h-[450px] w-[300px] rounded-xl overflow-hidden " key={el.id}>
            <img
              className=" h-2/3 rounded-t-lg w-full hover:scale-105 hover:brightness-75 duration-200 object-cover object-center"
              src={el.img}
              alt={`${el.name} image`}
            />
            <div className="p-4 flex-col flex gap-3">
              <p className="text-lg font-bold text-center">{el.name}</p>
              <div className="flex flex-row-reverse justify-center gap-2">
                <p className="inline font-semibold">{`${el.rating} review`}</p>
                <StarRatings
                  badStarAmt={5 - Math.floor(el.rating)}
                  goodStarAmt={Math.floor(el.rating)}
                />
              </div>
              <button className=" font-bold border-2 w-full p-2 rounded-lg hover:bg-black hover:text-white duration-200">
                View Profile
              </button>
            </div>
          </div>
        );
      })
    : "No Data Found";

  return (
    <>
      <div className="h-auto min-h-screen bg-[#FFFAF7] p-5  flex flex-col justify-start items-center gap-5">
        <h2 className="text-xl font-bold">Agents Near You</h2>
        <div id="agent-search" className="flex w-full items-center px-28 gap-2">
          <input
            className="flex-grow p-2 py-3 text-lg rounded-lg border-2 agent-searches"
            type="text"
            placeholder="Enter your address"
          />
          <select
            onChange={(event) => changeReview(event)}
            className="py-4 px-10 font-bold rounded-lg border-2 agent-searches text-center"
          >
            <option className="font-bold" value="">Review</option>
            <option className="font-bold" value="5">5 stars</option>
            <option className="font-bold" value="4">4+ stars</option>
            <option className="font-bold" value="3">3+ stars</option>
            <option className="font-bold" value="2">2+ stars</option>
            <option className="font-bold" value="1">1+ star</option>
          </select>
          <button className="bg-white py-4 px-10 border-2 rounded-lg hover:bg-black hover:text-white duration-150 ease-in-out inline font-bold agent-searches">
            Search
          </button>
        </div>

        <div
          className="flex flex-wrap gap-10 justify-center items-center w-[80%]"
          id="agent-container"
        >
          {agentTemplate}
        </div>
      </div>
      
    </>
  );
};

export default Agents;
