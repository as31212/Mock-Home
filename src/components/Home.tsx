import Footer from "./Footer";
import { MdManageSearch } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FaHouseFlag } from "react-icons/fa6";
import { FaAward } from "react-icons/fa6";

const Home: React.FC = () => {
  return (
    <>
      <div id="home-page-one" className="h-screen flex flex-col lg:flex-row justify-center items-center bg-orange-50">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-auto object-cover"
            src="Home-Image-a.png"
            alt="Home page img"
          />
        </div>
        <div className="h-fit w-full lg:w-1/3 p-10 flex flex-col gap-10" id="home-text-box">
          <h2 className="text-4xl lg:text-5xl font-semibold text-center lg:text-left">
            Find the property you love
          </h2>
          <p className="text-black text-center lg:text-left">
            We help people find homes they want at an affordable price
          </p>
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col" id="search">
            <div className="flex flex-wrap gap-4 justify-center" id="buttons">
              <button className="w-5/12 shadow font-semibold px-5 py-3 rounded-lg bg-gray-300 hover:bg-black hover:text-white duration-300">
                Buy
              </button>
              <button className="w-5/12 shadow font-semibold px-5 py-3 rounded-lg bg-gray-300 hover:bg-black hover:text-white duration-300">
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
      <div id="home-page-two" className="h-screen flex flex-wrap justify-center items-center gap-5">
      <div className="min-w-96 max-w-lg bg-orange-100 rounded-2xl h-1/3 flex flex-col justify-center gap-5 p-5 ">
        <h2 className="font-bold text-2xl">Home acquisition and rental made simple</h2>
        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque pariatur, cupiditate beatae enim inventore natus aut,.</p>
        <button className="bg-black text-white w-32 py-3 rounded-lg ">Get Started</button>
      </div>
      <div className="min-w-96 max-w-lg h-1/3 flex flex-wrap gap-2">
    <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-lg p-5 gap-3"><MdManageSearch className="mx-auto text-3xl"/><h2>Search your location</h2></div>
    <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-lg p-5 gap-3"><FaHouseFlag className="mx-auto text-3xl"/>
<h2>Get your dream house</h2></div>
    <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-lg p-5 gap-3"><FiEye className="mx-auto text-3xl"/><h2>Visit appointment</h2></div>
    <div className="bg-orange-50 w-5/12 h-5/12 rounded-lg flex flex-col justify-center font-bold text-lg p-5 gap-3"><FaAward className="mx-auto text-3xl"/><h2>World class agents</h2></div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
