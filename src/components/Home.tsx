import Footer from "./Footer";
import { Link } from "react-router-dom";
import { MdManageSearch } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FaHouseFlag } from "react-icons/fa6";
import { FaAward } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdAddHome } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";
import { LuSmilePlus } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";

interface HomeInterface{
  rentBuy: boolean;
  falseRentBuy: ()=> void;
  trueRentBuy: ()=> void;
}

const Home: React.FC<HomeInterface> = ({rentBuy, falseRentBuy, trueRentBuy}) => {
  return (
    <>
      <div
        id="home-page-one"
        className="h-auto min-h-screen flex flex-col lg:flex-row justify-center items-center bg-orange-50"
      >
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-auto object-cover"
            src="Home-Image-a.png"
            alt="Home page img"
          />
        </div>
        <div
          className="h-fit w-full lg:w-1/3 p-10 flex flex-col gap-10"
          id="home-text-box"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-center lg:text-left">
            Find the perfect property you love
          </h2>
          <p className="text-black text-center lg:text-left">
            We help people find homes they want at an affordable price
          </p>
          <div
            className="bg-white p-8 rounded-lg shadow-lg flex flex-col"
            id="search"
          >
            <div className="flex flex-wrap gap-4 justify-center" id="buttons">
              <button onClick={()=>falseRentBuy()} className={`w-5/12 shadow font-semibold px-5 py-3 rounded-lg hover:bg-black hover:text-white duration-150 ${rentBuy ? 'bg-gray-300' : 'bg-black text-white'}`}>
                Buy
              </button>
              <button onClick={()=>trueRentBuy()} className={`w-5/12 shadow font-semibold px-5 py-3 rounded-lg hover:bg-black hover:text-white duration-150 ${rentBuy ? 'bg-black text-white' : 'bg-gray-300'}`}>
                Rent
              </button>
            </div>
            <div className="flex flex-col p-5 gap-4" id="inputs">
              <input
                type="text"
                placeholder="State/City/Street"
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-gray-500"
              />
              <select className="border-2 text-gray-500 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-gray-500">
                <option disabled selected value="property-type">
                  Property Type
                </option>
                <option className="text-black" value="type-1">
                  Type 1
                </option>
                <option value="type-2">Type 2</option>
                <option value="type-3">Type 3</option>
              </select>
              <select className="border-2 text-gray-500 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-gray-500">
                <option disabled selected value="price-range">
                  Price Range
                </option>
                <option value="range-1">Range 1</option>
                <option value="range-2">Range 2</option>
                <option value="range-3">Range 3</option>
              </select>
              <button className="shadow font-semibold px-20 py-3 rounded-lg bg-black text-white hover:bg-gray-800 duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="home-page-two"
        className="py-20 flex justify-center items-center p-5 gap-5"
      >
        <div className="page-2-large-div h-[500px] w-1/2 bg-orange-200 rounded-2xl flex flex-col justify-center gap-5 p-5 ">
          <h2 className="font-bold text-2xl">
            Home acquisition and rental made simple
          </h2>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            pariatur, cupiditate beatae enim inventore natus aut,.
          </p>
          <Link to="/Listing">
            <button className="mt-16 bg-black text-white w-32 py-3 rounded-lg hover:bg-gray-800 duration-300 ">
              Get Started
            </button>
          </Link>
        </div>
        <div className="page-2-large-div min-w-96 h-[500px] w-1/3 flex flex-wrap gap-2">
          <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-center text-3xl p-5 gap-3 home-2-box">
            <MdManageSearch className="mx-auto text-3xl text-orange-400" />
            <h2>Search your location</h2>
          </div>
          <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-center text-3xl p-5 gap-3 home-2-box">
            <FaHouseFlag className="mx-auto text-3xl text-orange-400" />
            <h2>Get your dream house</h2>
          </div>
          <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-center text-3xl p-5 gap-3 home-2-box">
            <FiEye className="mx-auto text-3xl text-orange-400" />
            <h2>Detailed Walk-Throughs</h2>
          </div>
          <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-center text-3xl p-5 gap-3 home-2-box">
            <FaAward className="mx-auto text-3xl text-orange-400" />
            <h2>World class agents</h2>
          </div>
        </div>
      </div>
      <div
        id="home-page-three"
        className="h-auto flex gap-5 justify-center bg-[#FFFAF7]"
      >
        <div className="w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
          <div className="circle-icon-wrap bg-white rounded-full shadow-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
            <RiMoneyDollarCircleLine className=" text-orange-400 text-7xl scale-[200%]" />
          </div>
          <h2 className="font-bold text-4xl">$204.2M</h2>
          <div className="text-wrapper text-center">
            <p className="text-[#4C788D] font-semibold text-2xl">
              From in-site
            </p>
            <p className="text-[#4C788D] font-semibold text-2xl">
              property transactions
            </p>
          </div>
        </div>
        <div className="w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
          <div className="circle-icon-wrap bg-white rounded-full shadow-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
            <MdAddHome className=" text-orange-400 text-7xl scale-[200%]" />
          </div>
          <h2 className="font-bold text-4xl">30K+</h2>
          <div className="text-wrapper text-center">
            <p className="text-[#4C788D] font-semibold text-2xl">Properties</p>
            <p className="text-[#4C788D] font-semibold text-2xl">
              to choose from
            </p>
          </div>
        </div>
        <div className="w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
          <div className="circle-icon-wrap bg-white rounded-full shadow-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
            <FaFireAlt className=" text-orange-400 text-7xl scale-[150%]" />
          </div>
          <h2 className="font-bold text-4xl">700+</h2>
          <div className="text-wrapper text-center">
            <p className="text-[#4C788D] font-semibold text-2xl">Daily</p>
            <p className="text-[#4C788D] font-semibold text-2xl">
              property transactions
            </p>
          </div>
        </div>
        <div className="w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
          <div className="circle-icon-wrap bg-white rounded-full shadow-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
            <LuSmilePlus className=" text-orange-400 text-7xl scale-[200%]" />
          </div>
          <h2 className="font-bold text-4xl">10,000+</h2>
          <div className="text-wrapper text-center">
            <p className="text-[#4C788D] font-semibold text-2xl">
              Regular Clients
            </p>
          </div>
        </div>
      </div>

      {/* page 4 */}
      <div id="home-page-four" className="flex flex-wrap p-5 justify-center items-center min-h-screen h-auto bg-orange-50">
        <div className="text-page-4 w-[45vw] flex flex-col gap-5 justify-center ">
          <h2 className="text-4xl font-bold">Find Agents That Work For You</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore est
            inventore tempore quos cum ipsa modi nam ad numquam cumque adipisci,
            quis deleniti autem incidunt facere aut! Soluta, unde quae?
          </p>
          <Link to="/Agents">
            <button className="mt-16 bg-black text-white w-32 py-3 rounded-lg hover:bg-gray-800 duration-300">
              Get Started
            </button>
          </Link>
        </div>
        <div className="w-auto min-w-96 flex flex-col flex-wrap gap-3 h-[500px]">
          <img className="w-80 images-home-page-4 h-[180px] rounded-lg" src="https://www.legalzoom.com/sites/lz.com/files/inline-images/man-woman-look-over-documents-with-agent.jpg" alt="agent talking to clients" />
          <img id="img-div-home-page-4" className="w-80 h-[300px] rounded-lg" src="https://www.thestaffingstream.com/wp-content/uploads/2015/07/ThinkstockPhotos-465328301.jpg" alt="agent handing over keys" />
          <img className="w-80 images-home-page-4 h-[300px] rounded-lg" src="https://lirp.cdn-website.com/28156074/dms3rep/multi/opt/01+-+True+Homes+-+Huntley+-+R02-3x2-1920w.jpg" alt="home" />
          <img className="w-80 images-home-page-4 h-[180px] rounded-lg" src="https://www.thespruce.com/thmb/S1aye-s9z6VRA58-V8oRLSQwKCc=/5100x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPR-luxury-kitchens-5211364-hero-688d716970544978bc12abdf17ce6f83.jpg" alt="kitchen" />
        </div>
      </div>
{/* page 5 */}
      <div id="home-page-five" className="flex gap-10 flex-row-reverse flex-wrap p-5 justify-center items-center min-h-screen h-auto pb-10">
  <div className="text-page-5 w-full lg:w-[45vw] flex flex-col gap-5 justify-center">
    <h2 className="text-4xl font-bold">Top rated online realty service</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore est
      inventore tempore quos cum ipsa modi nam ad numquam cumque adipisci,
      quis deleniti autem incidunt facere aut! Soluta, unde quae?
    </p>
    <p className="flex gap-3 font-bold"><FaRegCheckCircle  className=" relative top-[2px] inline text-xl" /> Find excellent deals </p>
    <p className="flex gap-3 font-bold"><FaRegCheckCircle  className=" relative top-[2px] inline text-xl" /> Friendly host & Fast support </p>
    <p className="flex gap-3 font-bold"><FaRegCheckCircle  className=" relative top-[2px] inline text-xl" /> Secure payment system </p>
    <Link to="/Agents">
      <button className="mt-16 bg-black text-white w-32 py-3 rounded-lg hover:bg-gray-800 duration-300">
        Get Started
      </button>
    </Link>
  </div>
  <div className="relative">
    <img className="relative top-0 rounded-lg max-w-[900px] min-w-[300px] w-[70%] mx-auto" src="https://images.squarespace-cdn.com/content/v1/58420910f5e23112c08b8068/1486010598453-1F2QJGVXDTZLGMI8IM1V/1423PalomaAve_5492.jpg?format=2500w" alt="home-page-4" />
    <div id="colored-shadow" className="bg-orange-400 max-w-[900px] min-w-[300px]  w-[70%] h-[100%] absolute top-[12%] left-[20%] z-[-1] rounded-lg mx-auto"></div>
  </div>
</div>



      <Footer />
    </>
  );
};

export default Home;
