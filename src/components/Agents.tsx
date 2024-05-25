import Footer from "./Footer";
import { AgentInterface } from "../interfaces/AgentInterface";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import StarRatings from "./StarRatings";

interface AgentProps {
  agentData: AgentInterface[] | null;
}

const Agents: React.FC<AgentProps> = ({ agentData }) => {
  const agentTemplate = agentData
    ? [...agentData].map((el) => {
        return (
          <div className="bg-white h-[450px] w-[300px] rounded-xl " key={el.id}>
            <img className=" h-2/3 rounded-t-lg w-full" src={el.img} alt={`${el.name} image`} />
            <div className="p-4 flex-col flex gap-3">
              <p className="text-lg font-bold text-center">{el.name}</p>
              <div className="flex flex-row-reverse justify-center gap-2">
                <p className="inline font-semibold">{`${el.rating} review`}</p>
                <StarRatings
                  badStarAmt={5 - Math.floor(el.rating)}
                  goodStarAmt={Math.floor(el.rating)}
                />
              </div>
              <button className=" font-bold border-2 w-full p-2 rounded-lg hover:bg-black hover:text-white duration-200">View Profile</button>
            </div>
          </div>
        );
      })
    : "No Data Found";

  return (
    <>
      <div className="h-auto min-h-screen bg-[#FFFAF7] p-5 flex flex-col justify-center items-center gap-5">
        <h2 className="text-xl font-bold">Agents Near You</h2>
        <div id="agent-search" className="flex w-full items-center px-28 gap-2">
          <input
            className="flex-grow p-2 rounded-lg border-2"
            type="text"
            placeholder="Enter your address"
          />
          <select className="p-2 rounded-lg border-2">
            <option value="">Review</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
          <button className="bg-white py-3 px-4 border-2 text-xl rounded-xl hover:bg-black hover:text-white duration-150 ease-in-out inline">
            Search
          </button>
        </div>

        <div
          className="flex flex-wrap gap-5 justify-center items-center"
          id="agent-container"
        >
          {agentTemplate}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agents;
