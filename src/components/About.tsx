import { Link } from "react-router-dom";
import Article from "./Article";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdAddHome } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";
import { LuSmilePlus } from "react-icons/lu";
import { PiNumberCircleOneBold } from "react-icons/pi";
import { PiNumberCircleTwoBold } from "react-icons/pi";
import { PiNumberCircleThreeBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TeamDataInterface } from "../interfaces/TeamDataInterface";

const About: React.FC = () => {
  // fetch team member info

  const [teamData, setTeamData] = useState<TeamDataInterface[] | null>([]);

  const fetchTeamData = async () => {
    try {
      const res = await fetch(`/JsonFiles/TeamMemberInfo.json`);
      const data = await res.json();
      setTeamData(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // mapped team data cards
  const teamDataCards = teamData?.map((el, index) => {
    return (
      <div className=" w-full sm:w-[350px] h-[400px] flex flex-col gap-6" key={index}>
        <img
          className="rounded-xl w-full h-[310px] object-cover object-center "
          src={el.img}
          alt={`image of ${el.name}`}
        />
        <div className="">
          <p className="font-bold text-lg">{el.name}</p>
          <p className="text-gray-500 text-lg">{el.job_title}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div id="about-us-page" className="h-auto">
        {/* page 1 */}
        <div
          id="about-1"
          className="min-h-screen p-10 h-auto flex flex-col gap-5 items-center justify-center py-20"
        >
          <h2 className="text-5xl font-bold text-center">
            Reimagining Real Estate
          </h2>
          <div className="max-w-[600px]">
            <p className="text-gray-500 text-center mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              consectetur veniam excepturi debitis tenetur. Reprehenderit
              tenetur sequi vel repellat quis. Molestiae qui nihil a blanditiis,
              commodi ipsum illo magni perspiciatis!
            </p>
          </div>
          <img
            className="w-full max-w-[1000px] min-w-[300px]"
            src="about-collage-fr.png"
            alt="collage of pictures"
          />
        </div>
        {/* icons */}
        <div
          id="about-page-two"
          className="h-auto flex flex-wrap gap-5 justify-center bg-[#FFFAF7] p-5"
        >
          <div className="w-full sm:w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
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
          <div className="w-full sm:w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
            <div className="circle-icon-wrap bg-white rounded-full shadow-2xl p-5 w-[60px] h-[60px] flex justify-center items-center">
              <MdAddHome className=" text-orange-400 text-7xl scale-[200%]" />
            </div>
            <h2 className="font-bold text-4xl">30K+</h2>
            <div className="text-wrapper text-center">
              <p className="text-[#4C788D] font-semibold text-2xl">
                Properties
              </p>
              <p className="text-[#4C788D] font-semibold text-2xl">
                to choose from
              </p>
            </div>
          </div>
          <div className="w-full sm:w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
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
          <div className="w-full sm:w-[400px] h-fit p-10 flex flex-col gap-5 justify-center items-center">
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
        <div
          className="h-auto flex flex-col gap-20 px-4"
          id="about-page-three"
        >
          <div
            className="flex flex-wrap justify-center items-center pt-20 gap-20"
            id="about-page-three-picture-and-list"
          >
            <div id="about-text-img-three" className="flex flex-col gap-10 max-w-lg">
              <div
                id="about-page-three-header"
                className="flex flex-col gap-5"
              >
                <h2 className="font-bold text-4xl">
                  A note from our founders.
                </h2>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Natus consequatur nemo repellendus molestias sed odio quae ab
                  dolores!
                </p>
              </div>
              <ol className="flex-col flex gap-3">
                <li className="font-bold text-xl">
                  <PiNumberCircleOneBold className="inline text-3xl relative bottom-[2px] right-5" />
                  Founded in 2001
                </li>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  magni debitis quasi corrupti, dolor possimus dolorum sint
                  quisquam laudantium temporibus eligendi deserunt perspiciatis
                  placeat ullam exercitationem ea? Voluptatem, sunt dolores?
                </p>
                <li className="font-bold text-xl">
                  <PiNumberCircleTwoBold className="inline text-3xl relative bottom-[2px] right-5" />
                  Equal Opportunity Housing
                </li>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  magni debitis quasi corrupti, dolor possimus dolorum sint
                  quisquam laudantium temporibus eligendi deserunt perspiciatis
                  placeat ullam exercitationem ea? Voluptatem, sunt dolores?
                </p>
                <li className="font-bold text-xl">
                  <PiNumberCircleThreeBold className="inline text-3xl relative bottom-[2px] right-5" />
                  Donation Division
                </li>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  magni debitis quasi corrupti, dolor possimus dolorum sint
                  quisquam laudantium temporibus eligendi deserunt perspiciatis
                  placeat ullam exercitationem ea? Voluptatem, sunt dolores?
                </p>
              </ol>
            </div>
            <img
              className="max-w-[600px] w-full h-auto rounded-xl px-5"
              src="https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_wkaciBt.jpg?resize=1024%2C683&ssl=1"
              alt="image of ceo of real it"
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 bg-[#FFFAF7] min-h-screen h-auto py-20">
            <img className="max-w-[650px] w-[80%] rounded-lg" src="https://images.adsttc.com/media/images/5e66/5e5e/b357/65bd/db00/0025/large_jpg/10.jpg?1583767123" alt="" />
            <div className="w-96 flex flex-col gap-5">
              <h2 className="text-4xl font-bold">Our vision is simple</h2>
              <p className="text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam rerum sequi quis iure atque inventore, accusantium
                incidunt suscipit quod odio quo aperiam veniam quae nesciunt!
                Doloribus consectetur tempora suscipit odit?
              </p>

              <p className="font-bold">Ahmad Searcy</p>
              <p className="text-gray-500 relative right-2">- CEO at Real-IT</p>
            </div>
          </div>
        </div>
        {/* real it team members */}
        <div className="mb-20">
          <h2 className="font-bold text-4xl text-center m-20">Real-IT Team Members</h2>
          <div id="team-cards-container" className="flex flex-wrap justify-center gap-10 px-20">{teamDataCards}</div>
        </div>
        {/* real it news */}
        <div className="bg-[#1A1A1A] flex flex-col min-h-screen text-white font-bold items-center px-10 py-10">
          <div className="flex justify-around items-center flex-wrap w-full ">
            <h2 className="text-3xl">News & Blogs</h2>
            <Link className=" text-orange-400 text-2xl hover:cursor-pointer hover:underline" to='/Blog'>
              <p >Explore All <FaArrowRight className="inline relative bottom-[1px]" /></p>
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-20" id="article-container">
            <Article title="9 Easy-to-Ambitious DIY Projects to Improve Your Home" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw-lCMSCTF5DK0ImCKQgamQC3Os5JeUriCYw&s" />
            <Article title="What You Can Do to Turn a Rental Into a Home" img="https://static.wixstatic.com/media/bf8702_b09748a16a2540c595aa74c2ead3c4f1~mv2.jpg/v1/fill/w_801,h_553,al_c,q_85,enc_auto/bf8702_b09748a16a2540c595aa74c2ead3c4f1~mv2.jpg" />
            <Article title="Home Hunting 101: Skills You Need to Find the Home For You" img="https://res.akamaized.net/domain/image/fetch/t_web/https://static.domain.com.au/domainblog/uploads/2015/01/02000000/surviving-house-hunting-partner.jpg" />
          </div>
          <div className="w-2/3 min-w-80 h-auto min-h-[300px] flex flex-col gap-8 items-center bg-white opacity-80 rounded-xl p-5" id="news-subscription">
            <h2 className="font-bold text-black text-2xl">For Recent Update, News.</h2>
            <p className="text-black font-normal text-center w-[80%]">This helps keep you up to date on all the latest housing trends offered within the Real-IT blog</p>
            <div className="flex gap-2 w-full justify-center" id="email-input">
              <input className=" text-black font-normal border-[2px] rounded-lg w-[50%] pr-8 pl-4 py-2 bg-opacity-100" placeholder="Enter your Email" type="text" name="" id="" />
              <button className="bg-black text-white opacity-100 py-2 px-4 rounded-lg font-semibold">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
