// whenever the location pathname changes
// it the page will scroll to the top automatically
// look at app.tsx routes for the rest of the code

import { useLocation } from "react-router-dom"
import { useEffect } from "react";

const ScrollToTop : React.FC = ()=>{
    const location = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
        
    },[location.pathname])

    return null;
};

export default ScrollToTop;