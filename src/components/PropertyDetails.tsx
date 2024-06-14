// src/components/PropertyDetails.tsx
import React from 'react';
import { ListingInterface } from "../interfaces/ListingsInterface";


interface PropertyDetailsInterface {
  sortedData: ListingInterface[] | null;
  currListing: number;
  addComma: (price: number) => string;
}

const PropertyDetails: React.FC<PropertyDetailsInterface> = ({
  sortedData,
  currListing,
  addComma,
}) => {
  const currObj = sortedData?.find((el) => el.id === currListing);

  return (
    <div className="h-screen flex flex-col bg-[#FFFAF7]">
      {/* images collage */}
      <div id="listing-detail-images" className="flex gap-3 mx-auto w-2/3 max-w-[1800px] max-h-[60vh] mt-10">
        <img className="rounded-xl w-2/3 h-full" src={currObj?.image_url} alt="" />
        <div className="flex gap-2 w-1/3 flex-col">
          <img className="rounded-xl w-full h-1/2" src={currObj?.image_url} alt="" />
          <img className="rounded-xl w-full h-1/2" src={currObj?.image_url} alt="" />
        </div>
      </div>
      {/* content divs */}
      <div className='flex'>
        <div className='w-2/3' id="left-divs">
          <div id="first-left-detail-div" className="border-2 bg-white">
            <h2 className="text-3xl font-bold">{currObj ? `${currObj.address},${currObj.city},${currObj.state} ${currObj.zip}` : ''}</h2>
            <div className="flex gap-5" id="month-and-total-price">
              <div className="border-2 w-52 rounded-lg h-16 p-1">
                <p className="font-semibold text-2xl">{`$${currObj ? addComma(currObj?.price) : ''}`}</p>
                <p className="text-gray-500 text-sm">Online / Cash Payment</p>
              </div>
              <div className="border-2 w-52 rounded-lg h-16 p-1">
                <p className="font-semibold text-2xl">{`$${currObj ? addComma(Math.floor(currObj?.price / 240)) : ''} / month`}</p>
                <p className="text-gray-500 text-sm">0% EMI for 5 Months</p>
              </div>
            </div>
            <div id="description">
              <h2 className="font-semibold text-lg">{`Well-constructed ${currObj?.square_footage} Sqft ${currObj?.apt_type.includes('family') ? `${currObj?.apt_type} Home` : currObj?.apt_type}`}</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam consectetur deserunt nemo quasi aspernatur earum in nisi iste, officia natus libero repellendus, expedita est sit assumenda id architecto similique autem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quasi provident alias repudiandae cupiditate omnis officiis quibusdam at tempore quis laudantium nam maxime id doloremque, dicta eveniet, expedita culpa dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolores facilis dicta fugiat accusamus molestiae rem perferendis quos laborum eius voluptatem corporis eos a inventore ad beatae blanditiis ab? Incidunt?</p>
            </div>
            <div id="map-property-details">
              <h2>Map</h2>
              
            </div>
          </div>
        </div>
        <div className='w-1/3' id='right-divs'>
          <div className='flex flex-col bg-white'>
            <h2 className="font-bold text-xl">Request for Visit</h2>
            <input placeholder='' type="text" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
