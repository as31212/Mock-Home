import { AgentInterface } from "../interfaces/AgentInterface";

interface AgentDetailsInterface{
    currAgent: number;
    agentData: AgentInterface[] | null;
}
const AgentsDetails : React.FC<AgentDetailsInterface> = ({currAgent,agentData})=>{

    const currAgentObj = agentData ? agentData.find(el=> el.id === currAgent) : '';
    return(
        <>
        <div className="bg-[#FFFAF7]" id="outer-page">
            <div id="agent-details-page" className="min-h-screen w-8/12 pt-20 border-2 rounded-md p-5 mx-auto flex justify-around">
                <div id="right-divs-agent-details">
                <div className="flex flex-wrap justify-center items-center gap-5" id="agent-details-bio">
                    <img className=" w-52 h-52 rounded-full object-cover object-center" src={currAgentObj ? currAgentObj.img : ''} alt={currAgentObj ? `img of ${currAgentObj.name}` : ''} />
                    <div id="agent-details-bio-text">
                        <p className="font-bold">{currAgentObj ? currAgentObj.name : ''}</p>
                        <p>Real-IT Premier Agent</p>
                    </div>
                </div>
                </div>
                <div className="" id="left-divs-agent-details">
                    <div className="flex flex-col w-80 rounded-md border-2 py-3 px-4 h-[600px]" id="contact-us-div">
                        <h2 className="font-bold text-xl mb-4">Contact Us</h2>
                        <label className="font-bold mb-4" htmlFor="contact-name-input">Name</label><input className="border-2 bg-gray-100 pl-2 py-2 mb-4" type="text" name="" id="contact-name-input" />
                        <label className="font-bold mb-4" htmlFor="contact-phone-input">Phone</label><input className="border-2 bg-gray-100 pl-2 py-2 mb-4" type="text" name="" id="contact-phone-input" />
                        <label className="font-bold mb-4" htmlFor="contact-message-input">Message <span className="text-gray-400">(optional)</span></label><textarea rows={5} className="bg-gray-100 rounded-md resize-none pl-2 py-2" name="" id=""></textarea>
                        <button className="w-70 p-3 border-2 font-bold mt-5 bg-orange-400 rounded-md text-white hover:bg-white hover:text-black duration-200 ease-in-out ">Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AgentsDetails;