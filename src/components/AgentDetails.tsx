import { AgentInterface } from "../interfaces/AgentInterface";

interface AgentDetailsInterface{
    currAgent: number;
    agentData: AgentInterface[] | null;
}
const AgentsDetails : React.FC<AgentDetailsInterface> = ({currAgent,agentData})=>{

    const currAgentObj = agentData ? agentData.find(el=> el.id === currAgent) : '';
    return(
        <>
        <div className="h-screen">
            <img className="" src={currAgentObj ? currAgentObj.img : ''} alt="" />
        </div>
        </>
    );
}

export default AgentsDetails;