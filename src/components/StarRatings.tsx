import React from 'react';
import { MdOutlineStarPurple500, MdOutlineStarBorderPurple500 } from "react-icons/md";

interface StarRatingsInterface {
    goodStarAmt: number;
    badStarAmt: number;
}

const StarRatings: React.FC<StarRatingsInterface> = ({ goodStarAmt, badStarAmt }) => {
    const stars = [];
    for (let i = 0; i < goodStarAmt; i++) {
        stars.push(<MdOutlineStarPurple500 className='inline' key={`good-${i}`} />);
    }
    for (let i = 0; i < badStarAmt; i++) {
        stars.push(<MdOutlineStarBorderPurple500 className='inline' key={`bad-${i}`} />);
    }
    return (
        <div className='inline'>
            {stars}
        </div>
    );
}

export default StarRatings;
