import Footer from "./Footer";
import { AgentInterface} from "../interfaces/AgentInterface";

interface AgentProps{
agentData : AgentInterface | null;
}

const Agents : React.FC<AgentProps> = ({agentData})=>{

    return(
        <>
        <div className="h-screen"></div>
        <Footer />
        </>
    );
}

export default Agents;