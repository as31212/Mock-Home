import { ListingInterface } from "../interfaces/ListingsInterface";

const ListingCards : React.FC = (listingData, rangeMin, rangeMax)=>{
    interface ListingCardInterface{
        listingData: ListingInterface [];
        rangeMin: number;
        rangeMax: number;
    }

    const list = [...listingData].slice(rangeMin,rangeMax).map(el=>{
            <div
          key={el.id}
          className="flex flex-col w-96 h-auto m-3 shadow-xl rounded-xl gap-5 bg-white"
        >
          <img
            className="h-1/2 rounded-t-xl"
            src={el.image_url}
            alt={`${el.address} picture`}
          />
          <div className="flex flex-col px-10 gap-8 ">
            <p className="font-bold">{`${el.address},${el.city},${el.state} ${el.zip}`}</p>
            <div className="flex justify-between text-gray-400">
              <p>{`${el.bedrooms} Bed Room`}</p>
              <p>{`${el.bathrooms} Bath`}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>{`${el.square_footage} sqft`}</p>
              <p>{`${el.apt_type}`}</p>
            </div>
            <div className="flex gap-10 ">
              <button className="px-6 py-2 bg-black text-white rounded-lg">
                View Details
              </button>
              <p className="font-bold text-2xl">{`$${String(el.price).slice(
                0,
                3
              )},${String(el.price).slice(3)}`}</p>
            </div>
          </div>
        </div>
    })

    return(
        <>
         
        </>
    );
}

export default ListingCards;