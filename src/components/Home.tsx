import Footer from "./Footer";

const Home : React.FC = ()=>{

    return(
        <>
        <div className="h-screen flex flex-row-reverse justify-center items-center bg-orange-50">
            <div className="w-1/2"><img className="w-full" src="Home-Image-a.png" alt="Home page img" /></div>
            <div className=" h-fit w-1/3 p-10 flex flex-col gap-10" id="home-text-box">
                <h2 className="text-5xl font-semibold">Find the property you love</h2>
                <p className="text-gray-500">We help people find homes they want at an affordable price</p>
                <div className="bg-white p-10 rounded-lg shadow flex flex-col" id="search">
                    <div className="flex gap-4 justify-center" id="buttons">
                        <button className="shadow font-semibold px-20 py-2 rounded-lg bg-gray-300 hover:bg-black hover:text-white duration-200">Buy</button>
                        <button className="shadow font-semibold px-20 py-2 rounded-lg bg-gray-300 hover:bg-black hover:text-white duration-200">Rent</button>
                    </div>
                    <div className="flex flex-col p-5 gap-3" id="inputs">
                        <input type="text" placeholder="City/Street" className=" border-2  border-gray-300 p-2 rounded-xl" />
                        <select className="border-2 text-gray-400  border-gray-300 p-2 rounded-xl">
                            <option   disabled selected value="property-type">Property Type</option>
                            <option className="text-black" value="type-1">type-1</option>
                            <option value="type-2">type-2</option>
                            <option value="type-3">type-3</option>
                        </select>
                        <select className="border-2 text-gray-400  border-gray-300 p-2 rounded-xl">
                            <option className="text-gray-400"  disabled selected value="price-range">Price Range</option>
                            <option value="type-1">type-1</option>
                            <option value="type-2">type-2</option>
                            <option value="type-3">type-3</option>
                        </select>
                         <button className="shadow font-semibold px-20 py-2 rounded-lg bg-black text-white ">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
export default Home;