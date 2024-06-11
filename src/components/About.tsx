import Footer from "./Footer";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdAddHome } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";
import { LuSmilePlus } from "react-icons/lu";
import { PiNumberCircleOneBold } from "react-icons/pi";
import { PiNumberCircleTwoBold } from "react-icons/pi";
import { PiNumberCircleThreeBold } from "react-icons/pi";


const About : React.FC = ()=>{

    return(
        <>
        <div className="h-auto">
            {/* page 1 */}
            <div id="about-1" className=" min-h-screen p-10 h-auto flex flex-col gap-5 items-center justify-center py-10">
                <h2 className="text-5xl font-bold text-center">Reimagining real estate</h2>
                <div className="max-w-[600px]">
                    <p className="text-gray-500 text-center mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consectetur veniam excepturi debitis tenetur. Reprehenderit tenetur sequi vel repellat quis. Molestiae qui nihil a blanditiis, commodi ipsum illo magni perspiciatis!</p>
                </div>
                <img className="w-4/5 max-w-[1000px] min-w-[400px]" src="about-collage.png" alt="collage of pictures" />
            </div>
            {/* icons */}
            <div
        id="about-page-two"
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

      {/* page 3 note from our founder */}
      <div className="min-h-screen h-auto flex flex-col gap-20" id="about-page-three">
            <div className="flex flex-wrap justify-center py-10 gap-40" id="about-page-three-picture-and-list">
                <div id="about-text-img-three" className="flex flex-col gap-10">
            <div id="about-page-three-header" className=" flex flex-col gap-5">
                <h2 className="font-bold text-4xl">A note from our founders.</h2>
                <p className="text-gray-500 w-[400px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus consequatur nemo repellendus molestias sed odio quae ab dolores!</p>
            </div>
                    <ol className="relative left-10 flex-col flex gap-3">
                        <li className="font-bold text-xl relative right-8"><PiNumberCircleOneBold className="inline text-3xl relative bottom-[2px] right-5" />Founded in 2001</li>
                        <p className=" text-gray-500 max-w-[400px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum magni debitis quasi corrupti, dolor possimus dolorum sint quisquam laudantium temporibus eligendi deserunt perspiciatis placeat ullam exercitationem ea? Voluptatem, sunt dolores?</p>
                        <li className="font-bold text-xl relative right-8"><PiNumberCircleTwoBold className="inline text-3xl relative bottom-[2px] right-5" />Equal Opportunity Housing</li>
                        <p className=" text-gray-500 max-w-[400px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum magni debitis quasi corrupti, dolor possimus dolorum sint quisquam laudantium temporibus eligendi deserunt perspiciatis placeat ullam exercitationem ea? Voluptatem, sunt dolores?</p>
                        <li className="font-bold text-xl relative right-8"><PiNumberCircleThreeBold className="inline text-3xl relative bottom-[2px] right-5" />Donation Division</li>
                        <p className=" text-gray-500 max-w-[400px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum magni debitis quasi corrupti, dolor possimus dolorum sint quisquam laudantium temporibus eligendi deserunt perspiciatis placeat ullam exercitationem ea? Voluptatem, sunt dolores?</p>
                    </ol>
                </div>
                <img className="max-w-[700px] w-auto max-h-[700px] my-auto rounded-xl " src="https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_wkaciBt.jpg?resize=1024%2C683&ssl=1" alt="image of ceo of real it" />
            </div>

            
           <div className="flex flex-wrap justify-center items-center gap-40 bg-[#FFFAF7] py-10">
            <img className="max-w-[600px] rounded-xl" src="https://images.adsttc.com/media/images/5e66/5e5e/b357/65bd/db00/0025/large_jpg/10.jpg?1583767123" alt="" />
            <div className="w-96 flex flex-col gap-5">
                <h2 className="text-4xl font-bold">Our vision is simple</h2>
                <p className="text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam rerum sequi quis iure atque inventore, accusantium incidunt suscipit quod odio quo aperiam veniam quae nesciunt! Doloribus consectetur tempora suscipit odit?</p>
                
                <p className="font-bold">Ahmad Searcy</p>
                <p className="text-gray-500 relative right-2">- CEO at Real-IT</p>
            </div>
           </div>
        
      </div>
        </div>
        
        </>
    );
}

export default About;