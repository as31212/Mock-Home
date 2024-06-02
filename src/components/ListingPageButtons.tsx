import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

interface ListingPageButtonsInterface{
    text: string;
}
const ListingPageButtons: React.FC<ListingPageButtonsInterface>= ({text})=>{

    // up-down toggle state
    const [upDown,setUpDown] = useState<boolean>(false);
    const toggleUpDown = ()=>{
        setUpDown(!upDown);
    }

    return(
        <button onClick={()=>toggleUpDown()} className={`border-[1px] border-gray-400 font-bold  px-10 py-4 rounded-md hover:bg-gray-100 duration-200 ease-in-out ${upDown ? 'bg-orange-200 ' : ''}`}>{text} <FaChevronDown className={`inline relative bottom-[2px] left-2 text-lg ${upDown ? 'hidden' : ''}`} /> <FaChevronUp className={`inline relative bottom-[2px] left-2 text-lg ${upDown ? '' : 'hidden'}`} /></button>
    );
}

export default ListingPageButtons;